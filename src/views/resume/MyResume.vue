<template>
	<div class="resume__list card-space">
		<!-- Uploaded Resume List -->
		<uploaded-resumes />

		<!-- profile data -->
		<profile-data />

		<!-- *resume request -->
		<resume-request />

		<!-- my experieces list -->
		<my-experiences />

		<!-- my educations -->
		<my-educations />
	</div>
</template>

<script>
import UploadedResumes from '@/views/resume/components/UploadedResumes.vue';
import ProfileData from '@/views/resume/components/ProfileData.vue';
import MyExperiences from '@/views/resume/components/MyExperiences.vue';
import MyEducations from '@/views/resume/components/MyEducations.vue';
import ResumeRequest from '@/views/resume/components/ResumeRequest.vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'ResumeList',

	components: {
		UploadedResumes,
		ProfileData,
		MyExperiences,
		MyEducations,
		ResumeRequest,
	},
	setup() {
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.myResumes')} - Way2Work`;
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
</style>
