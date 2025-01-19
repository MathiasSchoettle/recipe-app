<script setup lang="ts">

import { LazyUProgress, RecipeCard } from '#components';
import { _backgroundImage, _backgroundPosition } from '#tailwind-config/theme';
import type { Recipe } from '@/stores/recipes'

const props = defineProps<{
	recipe: Recipe
}>()

const styles = {
	backgroundImage: `url('${props.recipe.image}')`,
	backgroundSize: 'cover',
	backgroundPosition: 'center'
}

function formatDuration(seconds: number): string {
	// Calculate hours, minutes, and remaining seconds
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	// Build the formatted string
	const parts: string[] = [];
	if (hours > 0) {
		parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
	}
	if (minutes > 0 || hours === 0) { // Always show minutes if hours are 0
		parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
	}

	const result = parts.join(' ')

	console.log(result);

	return result
}

const timeString = computed(() => {
	return formatDuration(props.recipe.time)
})

</script>

<template>
	<div class="w-full bg-neutral-800 rounded-md flex gap-5 p-2 overflow-hidden border border-neutral-700 shadow-lg cursor-pointer">

		<div :style="styles" class="shadow-lg rounded-lg size-28 min-w-28"></div>

		<div  class="flex-1 h-fill flex gap-1.5 pt-1 flex-col">
			<div class="font-bold">{{ recipe.title }}</div>

			<div class="flex gap-1 flex-wrap h-11 overflow-hidden">
				<UBadge v-for="ingredient in recipe.ingredients" class="w-fit h-5" color="gray" size="xs" variant="solid">
					{{ ingredient }}
				</UBadge>
			</div>
			
			<div class="flex gap-1 h-6 items-center text-neutral-400 pl-0.5">
				<UIcon name="i-lucide-clock" class="size-3"/>
				<div class="text-xs">
					{{ timeString }}
				</div>
			</div>
		</div>
	</div>
</template>