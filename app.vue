<script setup lang="ts">
	const isOpen = ref(false)
</script>

<template>
	<UContainer>
		<div class="w-full h-screen flex justify-center items-center">
			<UButton color="blue" label="Open" @click="isOpen = true" />
			<UModal v-model="isOpen" :transition="false">
				<div class="p-4">
					<UCard>
						<template #header>
							<div class="flex items-center justify-between">
								<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
									Modal
								</h3>
								<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
							</div>
						</template>

						<Placeholder class="h-32" />

						<template #footer>
							<div class="flex items-center justify-end gap-2">
								<UButton @click="isOpen = false" color="gray">Accept</UButton>
								<UButton @click="isOpen = false" color="red">Close</UButton>
							</div>
						</template>
					</UCard>
				</div>
			</UModal>
		</div>
	</UContainer>
</template>
