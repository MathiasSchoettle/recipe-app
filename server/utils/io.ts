import * as path from 'node:path'
import * as fs from 'node:fs'
import os from 'node:os'
import type { Recipe } from '@/stores/recipes'

export async function get_existing_recipes() {
	const filePath = path.join(os.tmpdir(), 'recipes.json')
	let all_obj = { data: <Recipe[]> [] }
	let curr_id = 0
	if (fs.existsSync(filePath)) {
		const content = await fs.promises.readFile(filePath, 'utf-8')
		all_obj = JSON.parse(content)
		curr_id = all_obj.data.at(-1)?.id ?? 0
	}
	return { recipes: all_obj, id: curr_id, filePath: filePath}
}
