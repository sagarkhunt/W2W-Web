<template>
	<div></div>
</template>
<script>
import { useSwal } from '@/components/sweetalert';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
	name: 'WorkDetails',

	// components
	components: {},

	setup() {
		// sweetalert
		const Swal = useSwal();
		const store = useStore(); // use state
		const route = useRoute();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			const quickPayType = route.query.type;
			if (quickPayType == 'invoice') {
				const payload = {
					invoiceId: route.query.invoiceId,
					status: route.query.status,
				};
				store.dispatch('auth/acceptInvoiceQuickpayVerify', payload).then(res => {
					Swal.fire({
						title: res.data.message,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes',
					}).then(result => {
						if (result.isConfirmed) {
							window.location.href = '/';
						}
					});
				});
			} else {
				const payload = {
					invoiceId: route.query.invoiceId,
					status: route.query.status,
				};
				store.dispatch('auth/acceptTeamInvoiceQuickpayVerify', payload).then(res => {
					Swal.fire({
						title: res.data.message,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes',
					}).then(result => {
						if (result.isConfirmed) {
							window.location.href = '/';
						}
					});
				});
			}
		});

		return {};
	},
};
</script>

<style lang="scss" scoped>
.maintenance {
	height: 100vh;
	background: gray;
}
</style>
