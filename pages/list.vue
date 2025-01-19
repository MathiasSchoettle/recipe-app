<template>
	<div class="w-full p-5 flex flex-col gap-4">
		<UInput
			icon="i-lucide-search"
			size="xl"
			color="white"
			:trailing="false"
			placeholder="Search..."
		/>

		<UDivider icon="i-lucide-align-justify" :ui="{ icon: {base: 'text-neutral-500'}}" size="xs"/>

		<template v-for="i in 5">
			<NuxtLink :to="'recipe-' + i">
				<RecipeCard/>
			</NuxtLink>
		</template>
	</div>
</template>