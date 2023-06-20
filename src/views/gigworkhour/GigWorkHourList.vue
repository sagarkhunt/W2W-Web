<template>
	<div class="gigworkhour__list card-space">
		<!-- gig-work-hour-list -->
		<gig-work-hour />
	</div>
</template>

<script>
import GigWorkHour from '@/views/gigworkhour/components/GigWorkHour.vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'GigWorkHourList',

	components: {
		GigWorkHour,
	},
	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.gigWorkHour')} - Way2Work`;
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
</style>
