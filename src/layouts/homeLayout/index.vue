<template>
	<div>
		<!-- top navbar -->

		<!-- router -->
		<router-view />

		<!-- footer -->
		<Footer />
	</div>
	<!-- <template>
		
	</template> -->
</template>

<script>
import Footer from '@/layouts/homeLayout/components/Footer.vue';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default {
	name: 'MainHomePage',
	components: {
		Footer,
	},
	setup() {
		const route = useRoute();
		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
		});
		return {
			route,
		};
	},
};
</script>
