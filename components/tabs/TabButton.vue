<script setup lang="ts">

const props = defineProps<{
	icon: string
	id: number
	current: number
}>()

defineEmits<{
	(e: 'click', id: number): void
}>()

const selected = computed(() => props.id === props.current)

</script>

<template>
	<div @click="$emit('click', id)" class="h-full flex justify-center items-center cursor-pointer transition duration-150" :class='selected ? "text-neutral-100" : "text-neutral-600"' style="aspect-ratio: 1;">
		<UIcon :name="icon" class="size-7"/>
	</div>
</template>