import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
	let data = await get_existing_recipes()
	let all_recipes = data.recipes
	const body = await readBody(event)
	let id = body.id
	all_recipes.data = all_recipes.data.filter(r => r.id !== id)
	fs.promises.writeFile(data.filePath, JSON.stringify(all_recipes))
	return id
})
