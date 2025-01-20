<script setup lang="ts">

const items = [
	{
		label: '',
		icon: 'i-lucide-list',
	},
	{
		label: '',
		icon: 'i-lucide-cooking-pot',
	}
	,
	{
		label: '',
		icon: 'i-lucide-settings',
	}
]

const ui = {
	wrapper: 'relative space-y-0 shadow-xl border-t border-neutral-700',
	container: 'h-0 w-full',
	list: {
		base: 'shadow-lg',
		height: 'h-16',
		rounded: 'rounded-none',
		padding: 'py-2 px-2.5',
		tab: {
			height: 'h-12',
		}
	}
}

const paths = ['/list', '/recommendation', '/settings']

function onChange(index: number) {
	navigateTo(paths[index])
}

const route = useRoute()

const selected = computed(() => {
	return paths.indexOf(route.fullPath);
})

</script>

<template>
	<div class="h-dvh flex flex-col bg-neutral-900 relative">

		<div class="h-[calc(100dvh-4rem)] overflow-scroll">
			<slot/>
		</div>

		<div class="absolute bottom-[5rem] right-[1rem] z-50">
			<UButton :ui="{ rounded: 'rounded-full' }" size="xl" icon="i-lucide-plus" square color="gray" @click="navigateTo('/add-recipe')"/>
		</div>

		<UTabs :model-value="selected" :items="items" :ui="ui" @change="onChange">
			<template #icon="{ item, selected }">
				<UIcon :name="item.icon" class="h-6 w-6" :class="[selected && 'text-primary-500 dark:text-primary-400']" />
			</template>
		</UTabs>
	</div>
</template>