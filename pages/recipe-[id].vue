<script setup lang="ts">

definePageMeta({
	layout: 'custom',
})

</script>

<template>
	<div class="px-2">
		<UCard>
			<template #header>
				Recipe {{ $route.params.id }}
			</template>

			<Placeholder class="h-56" />

			<template #footer>
				<Placeholder class="h-16"/>
			</template>
		</UCard>
	</div>
</template>