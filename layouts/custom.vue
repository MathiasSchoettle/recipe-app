<template>
	<div class="h-dvh flex flex-col bg-neutral-900">
		<div class="h-16 w-full flex items-center px-2 gap-10">
			<UButton @click.prevent="$router.back()" icon="i-lucide-chevron-left" square variant="ghost" size="xl" color="black"/>
		</div>

		<div>
			<slot/>
		</div>
	</div>
</template>