<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({ layout: 'custom'} )

const store = useRecipeStore()

type FormData = {
	title: string
	ingredients: string[]
	website: string
	image: string
	minutes: string
}

const state = reactive<FormData>({
	title: '',
	ingredients: [],
	website: '',
	image: '',
	minutes: '',
})
const hasMetaData = ref(false)

const route = useRoute()
onMounted(() => {
	const query = route.query
	state.title = query.title as string
	state.website = query.website as string
	state.image = query.image as string
	hasMetaData.value = true
})

const newIngredient = ref('')
const formRef = useTemplateRef('form');

function validate(state: FormData): FormError[] {
	const errors: FormError[] = []

	if (!state.title) errors.push({ path: 'title', message: 'Required'})
	if (state.ingredients.length <= 0) errors.push({ path: 'ingredients', message: 'Required' })
	if (!state.minutes || Number(state.minutes) <= 0) errors.push({ path: 'minutes', message: 'Required' })

	return errors
}

function onSubmit(event: FormSubmitEvent<FormData>) {
	const data = {
		...event.data,
		minutes: Number(event.data.minutes)
	}
	console.log(data);
	store.addRecipe(data)
	navigateTo('../list')
}

function addIngredient() {
	state.ingredients.push(newIngredient.value)
	newIngredient.value = ''
	formRef.value?.validate('ingredients')
}

function removeIngredient(ingredient: string) {
	state.ingredients.splice(state.ingredients.indexOf(ingredient), 1)
}

const formattedTime = computed(() => {
	const minutes = Number(state.minutes)

	if (Number.isNaN(minutes) || minutes <= 0) {
		return ''
	}

	return formatMinutes(minutes)
})

</script>

<template>
	<div class="p-5">
		<UForm ref="form" :validate="validate" :state="state" @submit="onSubmit" class="space-y-5" autocomplete="off">
			<UFormGroup label="Title" name="title">
				<UInput size="xl" v-model="state.title"/>
			</UFormGroup>

			<UFormGroup label="Cooking Time" name="minutes" required>
				<UInput size="xl" v-model="state.minutes" maxlength="5" inputmode="numeric">
					<template #trailing>
						<span class="text-gray-500 text-xs">
							{{ formattedTime }}
						</span>
					</template>
				</UInput>
			</UFormGroup>

			<div class="space-y-2">
				<UFormGroup label="Ingredients" name="ingredients" required>
					<UInput size="xl" v-model="newIngredient" @keypress.enter.prevent="addIngredient" enterkeyhint="go"></UInput>
				</UFormGroup>
				<div class="flex gap-1 flex-wrap">
					<UBadge v-for="ingredient in state.ingredients" @click="() => removeIngredient(ingredient)" class="w-fit cursor-pointer" color="gray" size="md" variant="solid">
						<UIcon name="i-lucide-x"/>
						<span>{{ ingredient }}</span>
					</UBadge>
				</div>
			</div>

			<UButton type="submit">Submit</UButton>
		</UForm>
	</div>
</template>