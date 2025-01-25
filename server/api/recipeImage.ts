const keys = ["og:image", 'twitter:image:src', 'twitter:image'] // keys which may reference a website's image url

export default defineEventHandler(async (event) => {
	try {
		let url = getQuery(event).url?.toString()

		if (!url) {
			throw new Error(`No url found. url[${url}]`)
		}

		if (!url.startsWith('https://')) {
			url = 'https://' + url
		}

		const res: Response = await fetch(url + '', {
			headers: {
				'Connection': 'keep-alive',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept': '*/*',
				'User-Agent': 'RezeptApp/0.0.1',
			}
		})
		const html: string = await res.text()
		const imageUrl = findMetaImageUrl(html, keys)

		const test = html.includes('property="og:image"')

		if (!imageUrl) {
			throw new Error(`No image found for website:${url}`)
		}
	
		return {
			imageUrl: imageUrl
		}
	} catch(e) {
		return {
			imageUrl: 'nothing.jpg'
		}
	}
})

function findMetaImageUrl(html: string, keys: string[]): string {
	// Escape the keys for safe usage in a regex pattern
	const keysPattern = keys.map(key => key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')
	// Regex to match <meta> tags with attributes in any order
	const regex = new RegExp(
		`<meta\\s+([^>]*)(?:name|property)=["'](${keysPattern})["']([^>]*)(?:content)=["']([^"']+)["']|` +
		`<meta\\s+([^>]*)(?:content)=["']([^"']+)["']([^>]*)(?:name|property)=["'](${keysPattern})["']`,
		'gi'
	)

	// Execute the regex and return the first matching `content` value
	let match: RegExpExecArray | null
	while ((match = regex.exec(html)) !== null) {
		// Match groups are designed to account for any attribute order
		const content = match[4] || match[6]
		if (content) {
			return content // Return the first matching content value
		}
	}

	return ''
}