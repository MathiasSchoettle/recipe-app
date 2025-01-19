<script setup lang="ts">

// TODO set default item on page load, depending on route

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
};

function onChange(index: Number) {
	switch (index) {
		case 0:
			navigateTo("/list")
			break
		case 1:
			navigateTo("/recommendation")
			break
		case 2:
			navigateTo("/settings")
			break
	}
}

</script>

<template>
	<div class="h-dvh flex flex-col bg-neutral-900">

		<div class="h-[calc(100dvh-4rem)] overflow-scroll">
			<slot/>
		</div>

		<UTabs :items="items" :ui="ui" @change="onChange">
			<template #icon="{ item, selected }">
				<UIcon :name="item.icon" class="h-6 w-6" :class="[selected && 'text-primary-500 dark:text-primary-400']" />
			</template>
		</UTabs>
	</div>
</template>