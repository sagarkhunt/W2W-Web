<template>
	<!-- loader -->
	<loader />
	<router-view />
	<maintance-mode-check />
</template>

<script>
import Loader from '@/components/loader/Loader.vue'; // Loader
import { provideToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { defineAsyncComponent, ref } from '@vue/runtime-core';
const MaintanceModeCheck = defineAsyncComponent(async () => {
	return import('@/views/authentication/components/MaintanceModeCheck.vue' /* webpackChunkName:"TaxCardInformation" */);
});
export default {
	name: 'App',

	components: {
		Loader,
		MaintanceModeCheck,
	},

	setup() {
		provideToast({ maxToasts: 200 });
	},
};
</script>
