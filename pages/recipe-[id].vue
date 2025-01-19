<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes'
 
const store = useRecipeStore();
const route = useRoute();
const recipe = store.getRecipe(Number(route.params.id));

definePageMeta({
	layout: 'custom',
})

</script>

<template>
	<div class="px-2">
		<UCard>
			<template #header>
				<div>
					{{ recipe?.title }}
				</div>
			</template>

			<Placeholder class="h-56" />

			<template #footer>
				<Placeholder class="h-16"/>
			</template>
		</UCard>
	</div>
</template>