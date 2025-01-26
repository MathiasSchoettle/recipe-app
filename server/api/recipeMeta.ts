import type { H3Event } from 'h3'
import { HTMLElement, parse } from "node-html-parser";

export type RecipeMetaData = {
	title: string
	description: string
	imageURL: string
	hasImage: boolean
}

type RecipeMetaDataRequest = {
	query: { url: string }
}

const emptyMetaData: RecipeMetaData = {
	title: '',
	description: '',
	imageURL: '',
	hasImage: false,
}

export default defineEventHandler<RecipeMetaDataRequest>(async (event) => {
	try {
		const url = getPageURL(event)
		const html = await getHtml(url)
		const metaTags = parse(html).getElementsByTagName('meta')

		return metaDataFromTags(metaTags)
	} catch(e) {
		// console.log(e)
		return emptyMetaData
	}
})

// iterate through meta tags and extract relevant data
function metaDataFromTags(metaTags: HTMLElement[]): RecipeMetaData {

	const result = { ...emptyMetaData }

	function getValue(tag: HTMLElement, attribute: string | undefined, identifiers: string[]): string | undefined {

		if (!attribute) return undefined

		if (identifiers.includes(attribute)) {
			return tag.getAttribute('content')
		}
	}

	for (const tag of metaTags) {
		const attribute = tag.getAttribute('property') ?? tag.getAttribute('name')

		result.imageURL = getValue(tag, attribute, ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src']) ?? result.imageURL
		result.title = getValue(tag, attribute, ['og:title', 'twitter:title']) ?? result.title
		result.description = getValue(tag, attribute, ['og:description', 'twitter:description']) ?? result.description
	}

	result.hasImage = !!result.imageURL

	return result
}


// get url from query params and append https:// if necessary
function getPageURL(event: H3Event<RecipeMetaDataRequest>): string {
	let url = getQuery(event).url

	if (!url.startsWith('https://')) {
		url = 'https://' + url
	}

	return url
}

// fetch html content from given url
async function getHtml(url: string): Promise<string> {
	const response = await fetch(url, {
		headers: {
			'Connection': 'keep-alive',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept': '*/*',
			'User-Agent': 'RezeptApp/0.0.1',
		}
	})

	if (!response.ok) {
		throw new Error(`Error while fetching content. Status:${response.status}`)
	}

	return await response.text();
}