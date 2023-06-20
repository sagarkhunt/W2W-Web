<template>
	<div class="econtract__list">
		<!-- e-contract-list -->
		<e-contract />
	</div>
</template>

<script>
import EContract from '@/views/econtract/components/EContract.vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'EContractList',

	components: {
		EContract,
	},
	setup(){
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.eContract')} - Way2Work`;
	}
};
</script>


