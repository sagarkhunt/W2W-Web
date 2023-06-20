<template>
	<div class="document__list card-space">
		<!-- My Document List -->
		<my-documents />

		<!-- Default Document List -->
		<default-documents />

		<!-- Contract File -->
		<contract-file />

		<!-- E-Contract File -->
		<e-contract />

		<!-- pay-slips -->
		<pay-slip />
	</div>
</template>

<script>
import MyDocuments from '@/views/document/components/MyDocuments.vue';
import DefaultDocuments from '@/views/document/components/DefaultDocuments.vue';
import ContractFile from '@/views/document/components/ContractFile.vue';
import EContract from '@/views/document/components/EContract.vue';
import PaySlip from '@/views/document/components/PaySlips.vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'DocumentList',

	components: {
		MyDocuments,
		DefaultDocuments,
		ContractFile,
		EContract,
		PaySlip,
	},
	setup() {
		const { t } = useI18n({ useScope: 'global' });

		document.title = `${t('sidebar.myDocuments')} - Way2Work`;

		return {};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
</style>