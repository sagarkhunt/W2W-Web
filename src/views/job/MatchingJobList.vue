<template>
	<find-job-list />
</template>

<script>
import FindJobList from '@/views/job/components/FindJobList';
import { useI18n } from 'vue-i18n';

export default {
	name: 'FindJob',

	components: {
		FindJobList,
	},
	setup(){
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.jobMatching')} - Way2Work`;
	}
};
</script>

