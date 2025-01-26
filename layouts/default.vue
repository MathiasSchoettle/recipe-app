<script setup lang="ts">
import TabButton from '~/components/tabs/TabButton.vue';
import AddButton from '~/components/tabs/AddButton.vue';
const paths = ['list', 'recommendation', 'settings', 'settings']

const tabId = ref(0)

function tabClick(id: number) {
	tabId.value = id
	navigateTo(paths[id])
}

</script>

<template>
	<div class="h-dvh flex flex-col bg-neutral-800 relative overflow-hidden">
		<div class="h-[calc(100dvh-5rem)] w-full overflow-hidden absolute top-0 bg-neutral-900 rounded-b-xl border-b-[1px] border-neutral-700">
			<slot/>
		</div>

		<div class="w-full h-[5rem] bg-neutral-800 flex items-center justify-center p-3 absolute bottom-0 left-0">
			<div class="h-full w-full flex justify-center gap-5">
				<TabButton :id="0" :current="tabId" icon="i-lucide-list" @click="tabClick"/>
				<TabButton :id="1" :current="tabId" icon="i-lucide-cooking-pot" @click="tabClick"/>

				<AddButton/>

				<TabButton :id="2" :current="tabId" icon="i-lucide-carrot" @click="tabClick"/>
				<TabButton :id="3" :current="tabId" icon="i-lucide-settings" @click="tabClick"/>
			</div>
		</div>
	</div>
</template>