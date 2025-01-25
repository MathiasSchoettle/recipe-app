<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useDebounceFn } from '@vueuse/core'
import { onWatcherCleanup } from 'vue';

definePageMeta({
	layout: 'custom',
})

const state = reactive({
	title: undefined,
	ingredients: <string[]>[],
	website: undefined,
	time: undefined,
})

const newIngredient = ref('');
const formRef = useTemplateRef('form');

const image = ref('')

function validate(state: any): FormError[] {
	const errors = []

	if (!state.title) errors.push({ path: 'title', message: 'Required' })
	if (!state.website) errors.push({ path: 'website', message: 'Required' })
	if (state.ingredients.length <= 0) errors.push({ path: 'ingredients', message: 'Required' })
	if (!state.time) errors.push({ path: 'time', message: 'Required' })

	return errors
}

const loadingImage = ref(false)

const debounced = useDebounceFn((controller) => {
	if (!state.website) {
		image.value = ''
		return
	}

	loadingImage.value = true

	$fetch('/api/recipeImage', {
		query: {
			url: state.website
		},
		signal: controller.signal
	})
	.then((res) => {
		image.value = res.imageUrl
		loadingImage.value = false
	})
}, 500)

watch(() => state.website, () => {
	const controller = new AbortController()
	debounced(controller)

	onWatcherCleanup(() => {
		controller.abort()
		loadingImage.value = false
	})
})

const store = useRecipeStore()
const router = useRouter()

async function onSubmit(event: FormSubmitEvent<any>) {
	store.addRecipe(event.data)
	router.back()
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

		<div class="w-full h-52 flex justify-center items-center border border-neutral-600 shadow-md rounded-md mb-3" :class="loadingImage ? 'opacity-50' : 'opacity-100'" :style="{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}">
			<UIcon v-if="loadingImage" name="i-lucide-loader-circle" class="size-8 animate-spin"/>
			<UIcon v-if="!loadingImage && !image" name="i-lucide-image" class="size-20 text-neutral-800"/>
		</div>

		<UForm ref="form" :validate="validate" :state="state" @submit="onSubmit" class="space-y-2">
			<UFormGroup label="Title" name="title">
				<UInput v-model="state.title" placeholder="Title" />
			</UFormGroup>

			<UFormGroup label="Website" name="website">
				<UInput v-model="state.website" placeholder="www.website.com" autocomplete="off"/>
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