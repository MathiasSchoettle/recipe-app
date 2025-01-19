<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes'

const store = useRecipeStore();

</script>

<template>
	<div class="w-full p-5 flex flex-col gap-4">
		<UInput
			icon="i-lucide-search"
			size="xl"
			color="white"
			:trailing="false"
			placeholder="Search..."
		/>

		<UDivider icon="i-lucide-align-justify" :ui="{ icon: {base: 'text-neutral-500'}}" size="xs"/>

		<template v-if="store.hasData" v-for="recipe in store.recipes">
			<NuxtLink :to="'recipe-' + recipe.id">
				<RecipeCard :recipe="recipe"/>
			</NuxtLink>
		</template>
		<div v-else>
			<div class="w-full flex justify-center">
				<UIcon name="i-lucide-loader" class="animate-spin size-10 text-neutral-500"/>
			</div>
		</div>
	</div>
</template>