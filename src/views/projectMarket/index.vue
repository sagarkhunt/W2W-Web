<template>
	<section class="project_market_wrapper">
		<div>
			<top-navbar />
			<!-- projectMarket page Start-->
			<project-Market />
			<!-- projectMarket page nd-->
		</div>
	</section>
</template>
<script>
import TopNavbar from '@/layouts/homeLayout/components/TopNavbar.vue';
import ProjectMarket from '@/views/projectMarket/components/ProjectMarket.vue';
export default {
	name: 'Project Market',
	components: {
		TopNavbar,
		ProjectMarket,
	},
};
</script>

<style lang="scss" scoped>
.project_market_wrapper {
	.bar-button {
		display: none !important;
	}
}
</style>
