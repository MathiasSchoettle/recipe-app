<script setup lang="ts">

const ui = {
	rounded: 'rounded-full',
	trigger: 'h-full shadow-lg shadow-black/10 rounded-full',
	wrapper: 'h-full aspect-[1] flex justify-center items-center',
	overlay: {
		background: 'bg-gray-800/85'
	},
}

</script>

<template>
	<UPopover :ui="ui" :popper="{ offsetDistance: 30, placement: 'top' }" overlay>
		<div class="bg-primary-600 border border-primary-500 text-neutral-100 h-full rounded-full flex justify-center items-center" style="aspect-ratio: 1;">
			<UIcon name="i-lucide-plus" class="size-10"/>
		</div>
		<template #panel="{close}">
			<div class="flex flex-col-reverse gap-2 p-1.5">

				<button @click="close" class="text-neutral-400 focus:bg-neutral-800 size-14 rounded-full flex items-center justify-center">
					<UIcon name="i-lucide-chevron-down" class="size-7"/>
				</button>

				<button class="text-neutral-400 size-14 rounded-full flex items-center justify-center">
					<UIcon name="i-lucide-clipboard-list" class="size-7"/>
				</button>

				<button class="text-neutral-400 size-14 rounded-full flex items-center justify-center">
					<UIcon name="i-lucide-plus" class="size-7"/>
				</button>
			</div>
		</template>
	</UPopover>
</template>