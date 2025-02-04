export interface Recipe {
	id: number
	title: string
	ingredients: string[]
	image: string
	time: number
}

export const useRecipeStore = defineStore('recipeStore', () => {
	const recipes = ref<Recipe[]>([])

	function getData() {
		$fetch("/api/recipes", {
			method: 'GET',
		}).then((data) => {
			recipes.value = data.data
		}).catch((err) => {
			console.error(err)
		})
	}

	const hasData = computed(() => recipes.value.length > 0);

	const getRecipe = computed(() => (
		(id: number): Recipe | undefined => recipes.value.find((recipe) => recipe.id === id)
	))

	interface Data {
		title: string
		ingredients: string[]
		image: string
		time: number
	}

	function addRecipe(data: Data) {
		$fetch("/api/recipe", {
			method: 'POST',
			body: {
				data: data
			}
		}).then((data) => {
			recipes.value.push(
				data
			)
		}).catch((err) => {
			console.error(err)
		})
	}

	function removeRecipe(recipe_id: number) {
		$fetch("/api/recipe", {
			method: 'DELETE',
			body: {
				id: recipe_id
			}
		}).then((id) => {
			recipes.value = recipes.value.filter(
				r => r.id !== id
			)
		}).catch((err) => {
			console.error(err)
		})
	}

	getData();

	return {
		recipes,
		getRecipe,
		hasData,
		addRecipe,
		removeRecipe
	}
})
