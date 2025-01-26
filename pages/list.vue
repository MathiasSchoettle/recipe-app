<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes'

const store = useRecipeStore();

</script>

<template>
	<div class="w-full h-full flex flex-col">

		<div class="bg-neutral-800 flex flex-col gap-2 p-5 shadow-lg shadow-black/10 z-50">
			<UInput
			icon="i-lucide-search"
			size="xl"
			color="white"
			:trailing="false"
			placeholder="Search..."
			/>
		</div>

		<div class="overflow-scroll h-full flex flex-col gap-3 p-5 pt-3">
			<div v-if="store.hasData" v-for="recipe in store.recipes">
				<NuxtLink :to="'recipe-' + recipe.id">
					<RecipeCard :recipe="recipe"/>
				</NuxtLink>
			</div>
			<div v-else>
				<div class="w-full flex justify-center">
					<UIcon name="i-lucide-loader" class="animate-spin size-10 text-neutral-500"/>
				</div>
			</div>
		</div>

	</div>
</template>