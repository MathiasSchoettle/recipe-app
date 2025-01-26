<script setup lang="ts">
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

const timeString = computed(() => {
	return formatMinutes(props.recipe.minutes)
})

</script>

<template>
	<div class="w-full bg-neutral-800 rounded-md flex gap-5 p-1.5 border border-neutral-700 shadow-lg cursor-pointer">

		<div :style="styles" class="shadow-md shadow-black/10 rounded-lg size-28 min-w-28 bg-neutral-500"></div>

		<div  class="flex-1 h-fill flex gap-1.5 pt-1 flex-col overflow-hidden">
			<div class="font-bold whitespace-nowrap text-ellipsis overflow-hidden">
				{{ recipe.title }}
			</div>

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