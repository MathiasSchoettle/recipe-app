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
		new Promise(resolve => setTimeout(resolve, 1000))
			.then(() => {
				recipes.value = [
					{
						id: 0,
						title: 'Kartoffelgratin',
						ingredients: ['Kartoffeln', 'Sahne', 'Parmesan', 'Milch', 'Muskatnuss', 'Salz', 'Pfeffer'],
						image: 'https://img.chefkoch-cdn.de/rezepte/837601188560864/bilder/971685/crop-960x540/kartoffelgratin.jpg',
						time: 1800,
					},
					{
						id: 1,
						title: 'Spaghetti Bolognese',
						ingredients: ['Spaghetti', 'Hackfleisch', 'Tomaten', 'Karotten'],
						image: 'https://images.eatsmarter.de/sites/default/files/styles/facebook/public/spaghetti-bolognese-original-59303.jpg',
						time: 2400,
					},
					{
						id: 2,
						title: 'Tiramisu',
						ingredients: ['Mascarpone', 'Eier', 'Puderzucker', 'Ladyfingers', 'Kakaopulver'],
						image: 'https://img.chefkoch-cdn.de/rezepte/264171102553424/bilder/1518856/crop-960x540/tiramisu.jpg',
						time: 5400,
					},
				]
			});
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
		recipes.value.push({
			id: recipes.value.at(-1)?.id ?? 0,
			...data
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
