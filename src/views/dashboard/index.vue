<template>
	<div class="dash__pill">
		<div class="d-sm-block d-flex flex-sm-row flex-column">
			<!-- dashboard work stats information -->
			<dashboard-work-stats />

			<!-- user information -->
			<user-information />
		</div>

		<!-- insurance data -->
		<insurance-data />

		<!-- received documents -->
		<received-documents />
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';

import DashboardWorkStats from '@/views/dashboard/components/WorkStats.vue';
import UserInformation from '@/views/dashboard/components/UserInformation.vue';
import InsuranceData from '@/views/dashboard/components/InsuranceData.vue';
import ReceivedDocuments from '@/views/dashboard/components/ReceivedDocuments.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
	components: {
		DashboardWorkStats,
		UserInformation,
		InsuranceData,
		ReceivedDocuments,
	},

	setup() {

		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.dashboard')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch dashboard
			if (userTypeInfo.value == 'jobseeker') {
				fetchReviceDocuments();
			}
			fetchDashboard();
			fetchJobseeker();
		});

		// Dashboard and user profile
		const userInfo = computed(() => store.state.dashboard.DashboardWorkStats);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch logged users invoices
		const fetchDashboard = () => {
			store.dispatch('dashboard/getDashboardLists');
		};

		// fetch logged users invoices
		const fetchJobseeker = () => {
			store.dispatch('dashboard/fetchJobseeker');
		};

		// fetch received documents
		let fetchReviceDocuments = () => {
			store.dispatch('dashboard/getReceiveDocuments');
		};

		return {
			t,
			userInfo,
			userTypeInfo,
		};
	},
};
</script>

<style lang="scss" scoped>
.dash-pill {
	width: 100%;
}
</style>
