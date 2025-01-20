<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({
	layout: 'custom',
})

const state = reactive({
	title: undefined,
	ingredients: <string[]>[],
	image: undefined,
	time: undefined
})

const text = ref('test')

const newIngredient = ref('');
const formRef = useTemplateRef('form');

function validate(state: any): FormError[] {
	const errors = []

	if (!state.title) errors.push({ path: 'title', message: 'Required' })
	if (!state.image) errors.push({ path: 'image', message: 'Required' })
	if (state.ingredients.length <= 0) errors.push({ path: 'ingredients', message: 'Required' })
	if (!state.time) errors.push({ path: 'time', message: 'Required' })

	return errors
}

const store = useRecipeStore()
const router = useRouter()

async function onSubmit(event: FormSubmitEvent<any>) {
	store.addRecipe(event.data)
	router.back()

	text.value = JSON.stringify(event)
}

function addRecipe() {
	state.ingredients.push(newIngredient.value);
	newIngredient.value = '';
	formRef.value?.validate('ingredients');
}

function removeIngredient(ingredient: string) {
	state.ingredients.splice(state.ingredients.indexOf(ingredient), 1);
}

</script>

<template>
	<div class="p-5">

		<span class="text-white font-bold text-xl">{{ text }}</span>

		<UForm ref="form" :validate="validate" :state="state" @submit="onSubmit" class="space-y-2">
			<UFormGroup label="Title" name="title">
				<UInput v-model="state.title" placeholder="Title" />
			</UFormGroup>

			<UFormGroup label="Image-Link" name="image">
				<UInput v-model="state.image" placeholder="website.com/image.png"/>
			</UFormGroup>

			<UFormGroup label="Ingredients" name="ingredients">
				<UInput v-model="newIngredient" @keypress.enter.prevent="addRecipe" enterkeyhint="go"></UInput>
			</UFormGroup>

			<div class="flex gap-1 flex-wrap mt-2">
				<UBadge v-for="ingredient in state.ingredients" @click="() => removeIngredient(ingredient)" class="w-fit" color="gray" size="sm" variant="solid">
					<UIcon name="i-lucide-x"/>
					<span>{{ ingredient }}</span>
				</UBadge>
			</div>

			<UFormGroup label="Duration" name="time">
				<UInput v-model="state.time" type="number" enterkeyhint="next"></UInput>
			</UFormGroup>

			<UButton type="submit">
				Submit
			</UButton>
		</UForm>
	</div>
</template>