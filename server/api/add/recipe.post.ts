import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
    let data = await get_existing_recipes()
    let all_recipes = data.recipes
    const body = await readBody(event)
    let obj = body.data
    obj.id = data.id + 1
    all_recipes.data.push(obj)
    fs.promises.writeFile(data.filePath, JSON.stringify(all_recipes))
    return obj
})
