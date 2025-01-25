export default defineEventHandler(async (event) => {
    let data = await get_existing_recipes()
	return data.recipes
})

