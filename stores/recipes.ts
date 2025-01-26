export interface Recipe {
	id: number
	title: string
	ingredients: string[]
	image: string
	minutes: number
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
		website: string
		image: string
		minutes: number
	}

	function addRecipe(data: Data) {
		$fetch("/api/add/recipe", {
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

	getData();

	return {
		recipes,
		getRecipe,
		hasData,
		addRecipe
	}
})
