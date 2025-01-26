<script setup lang="ts">
import type { FormError} from '#ui/types'
import { onWatcherCleanup } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { RecipeMetaData } from '~/server/api/recipeMeta';

definePageMeta({ layout: 'custom'})

type FormData = {
	website: string
}

const state = reactive<FormData>({
	website: '',
})
const metaData = ref<RecipeMetaData>({
	title: '',
	description: '',
	imageURL: '',
	hasImage: false,
})
const loadingImage = ref(false)

watch(() => state.website, () => {
	const controller = new AbortController()
	debounced(controller)

	onWatcherCleanup(() => {
		controller.abort()
		loadingImage.value = false
	})
})

const debounced = useDebounceFn((controller) => {
	if (!state.website) {
		metaData.value = {
			title: '',
			description: '',
			imageURL: '',
			hasImage: false,
		}
		return
	}

	loadingImage.value = true

	$fetch('/api/recipeMeta', {
		query: {
			url: state.website
		},
		signal: controller.signal,
	})
	.then((result) => {
		console.log(JSON.stringify(result, null, ' '))
		metaData.value = result
		loadingImage.value = false
	})
	.catch(() => {})
})

const imageStyle = computed(() => {
	return {
		backgroundImage: `url(${metaData.value.imageURL})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}
})

const showIcon = computed(() => !metaData.value.hasImage && !loadingImage.value)

function validate(event: FormData): FormError[] {
	const errors: FormError[] = []

	if (!state.website) errors.push({ path: 'website', message: 'Required'} )

	return errors
}

function submit() {
	const query = {
		website: state.website,
		image: metaData.value.imageURL,
		title: metaData.value.title,
	}

	navigateTo({
		path: 'recipe',
		query: query,
	})
}

</script>

<template>
	<div class="p-5">
		<UForm :validate="validate" :state="state" @submit="submit" class="space-y-4" autocomplete="off">
			<UFormGroup label="Website" name="website" required>
				<UInput size="xl" v-model="state.website"/>
			</UFormGroup>

			<div :style="imageStyle" class="w-full aspect-[16/9] border border-neutral-600 rounded-md text-neutral-700 flex items-center justify-center">
				<UIcon v-if="showIcon" name="i-lucide-image" class="size-12"/>
				<UIcon v-else-if="loadingImage" name="i-lucide-loader" class="size-12 animate-spin"/>
			</div>

			<UButton type="submit" label="Submit"></UButton>
		</UForm>
	</div>
</template>