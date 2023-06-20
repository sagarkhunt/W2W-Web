<template>
	<div class="dash-table">
		<div class="row" v-if="userTypeInfo == 'jobseeker'">
			<div class="table-header mb-lg-0 mb-sm-2 mt-lg-5 mt-4">
				<div class="payment-pill-header">
					<div class="pph-left">
						<h5 class="title-lg">{{ t('commonDashboard.InsuranceService') }}</h5>
					</div>
				</div>
				<div class="select__limit mobile_table_header">
					<div class="dropdown ml-0">
						<a
							class="
								dropdown-toggle
								btn-common btn-gray-border
								tbl-drop
							"
							href="#"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<p class="d-inline-block head">{{t('common.Showing')}}</p>
							<span class="ml-2">{{ maxItemsPerPage }}</span>
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li @click="changePerPageMaxItems(5)">
								<span class="dropdown-item tbl-drop-link">
									5
								</span>
							</li>
							<li @click="changePerPageMaxItems(10)">
								<span class="dropdown-item tbl-drop-link">
									10
								</span>
							</li>
							<li @click="changePerPageMaxItems(15)">
								<span class="dropdown-item tbl-drop-link">
									15
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<new-data-table
				:data="insuranceData"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInsurance"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="large-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{t('common.Rows')}}</label>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{t('common.Showing')}}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
									<li @click="changePerPageMaxItems(5)">
										<span class="dropdown-item tbl-drop-link">
											5
										</span>
									</li>
									<li @click="changePerPageMaxItems(10)">
										<span class="dropdown-item tbl-drop-link">
											10
										</span>
									</li>
									<li @click="changePerPageMaxItems(15)">
										<span class="dropdown-item tbl-drop-link">
											15
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</template>

				<template #thead>
					<new-tb-th>{{ t('commonDashboard.InsuranceName') }}</new-tb-th>
					<new-tb-th>{{ t('commonDashboard.InsuranceNumber') }}</new-tb-th>
					<new-tb-th>{{ t('fieldList.email') }}</new-tb-th>
					<new-tb-th>{{ t('commonDashboard.Website') }}</new-tb-th>
					<new-tb-th>{{ t('commonDashboard.Package') }}</new-tb-th>
					<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ tr.insurance_name || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.insurance_number || '-' }}</new-tb-td>
						<new-tb-td
							><a class="text-dark text-decoration-underline fw-bold">{{ tr.insurance_email || '-' }}</a></new-tb-td
						>
						<new-tb-td
							><a class="text-decoration-underline fw-bold text-blue">{{ tr.insurance_website || '-' }}</a></new-tb-td
						>
						<new-tb-td>{{ tr.insurance_packages || '-' }}</new-tb-td>
						<new-tb-td>
							<div class="tbl-status" v-if="!tr.applied">
								<div @click="insuranceApplied(tr.id)" class="sts-approve">
									<span>
										<FontAwesomeIcon :icon="approveIcon" />
										{{ t('commonDashboard.Apply') }}
									</span>
								</div>
							</div>
							<div class="tbl-status" v-else>
								<div class="sts-wait-balck">
									<span>
										<FontAwesomeIcon :icon="clockIcon" />
										{{ t('common.applied') }}
									</span>
								</div>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>

			<div>
				<new-data-table
					:data="insuranceData"
					sst
					pagination
					search
					@search="updateSearchQuery"
					:total="totalInsurance"
					:max-items="maxItemsPerPage"
					@change-page="handleChangePage"
					class="responsive-table searchbar_table"
				>
					<template #header>
						<div class="select__limit desktop_table_header">
							<div>
								<label class="tbl_label">{{t('common.Rows')}}</label>
								<div class="dropdown ml-0">
									<a
										class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
										href="#"
										id="navbarDropdown"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<p class="d-inline-block head">{{t('common.Showing')}}</p>
										<span class="ml-2">{{ maxItemsPerPage }}</span>
									</a>
									<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
										<li @click="changePerPageMaxItems(5)">
											<span class="dropdown-item tbl-drop-link">
												5
											</span>
										</li>
										<li @click="changePerPageMaxItems(10)">
											<span class="dropdown-item tbl-drop-link">
												10
											</span>
										</li>
										<li @click="changePerPageMaxItems(15)">
											<span class="dropdown-item tbl-drop-link">
												15
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</template>

					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
							<div>
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
									<div class="d-flex">
										<div>
											<div>
												{{ tr.insurance_number || '-' }}
											</div>
											<div>
												{{ tr.insurance_email || '-' }}
											</div>
										</div>
									</div>

									<div>
										<a>
											<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== i" class="arrowIcon" />
										</a>

										<a>
											<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === i" class="arrowIcon" />
										</a>
									</div>
								</div>

								<div class="border-padding">
									<div v-if="i == tableIndex" class="table-border">
										<new-tb-tr>
											<new-tb-th>{{ t('commonDashboard.InsuranceName') }}</new-tb-th>
											<new-tb-td>{{ tr.insurance_name || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('commonDashboard.Website') }}</new-tb-th>

											<new-tb-td
												><a class="text-decoration-underline fw-bold text-blue">{{ tr.insurance_website || '-' }}</a></new-tb-td
											>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('commonDashboard.Package') }}</new-tb-th>

											<new-tb-td>{{ tr.insurance_packages || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>

											<new-tb-td>
												<div class="tbl-status" v-if="!tr.applied">
													<button @click="insuranceApplied(tr.id)">
														<span class="sts-approve d-block">
															<FontAwesomeIcon :icon="approveIcon" />
															{{ t('commonDashboard.Apply') }}
														</span>
													</button>
												</div>
												<div class="tbl-status" v-else>
													<span class="sts-wait-balck d-block">
														<FontAwesomeIcon :icon="clockIcon" />
														{{ t('common.applied') }}
													</span>
												</div>
											</new-tb-td>
										</new-tb-tr>
									</div>
								</div>
							</div>
						</new-tb-tr>
					</template>
				</new-data-table>
			</div>
		</div>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faChevronDown, faChevronUp, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'InsuranceData',

	// components
	components: {
		FontAwesomeIcon,
	},

	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		//ref
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const tableIndex = ref(0);

		// icon
		const approveIcon = faThumbsUp;
		const clockIcon = faCheck;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore(); // use state

		// Dashboard and user profile
		const insuranceData = computed(() => store.state.dashboard.InsuranceData);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch logged users invoices
			if (userTypeInfo.value == 'jobseeker') {
				fetchInsurances();
			}
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// total invoice count company
		const totalInsurance = computed(() => store.state.dashboard.totalInsurance);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchInsurances();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchInsurances();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchInsurances();
		};
		// fetch insurance services
		const fetchInsurances = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
			};
			store.dispatch('dashboard/getInsurances', payload);
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		//insurance status update
		const insuranceApplied = id => {
			const payload = {
				insuranceId: id,
			};
			store.dispatch('dashboard/updateInsurancesStatus', payload).then(() => {
				fetchInsurances();
			});
		};

		return {
			// icon
			approveIcon,
			clockIcon,
			arrowDown,
			arrowUp,

			insuranceData,

			// refs
			maxItemsPerPage,
			tableIndex,

			// User Tyep
			userTypeInfo,

			// computed
			totalInsurance,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			insuranceApplied,
			openTable,
			t,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.dash-table {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	padding: 30px 15px;

	.payment-pill-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.invoice__row {
		.text-blue {
			color: #295fb9;
		}

		.sts-wait-balck {
			color: #fff;
			background-color: #000;
			padding: 12px 0px;
			border-radius: 50px;
			white-space: nowrap;
			font-size: 14px;
			min-width: 100px;
			width: 100%;
			text-align: center;

			@media (max-width: 1024px) {
				padding: 9px 10px;
				max-width: 120px;
			}

			@media (max-width: 425px) {
				padding: 5px 12px;
			}
		}
	}

	.title-lg {
		color: #a0a4a9;
	}

	@media (max-width: 468px) {
		.dash-table {
			.title-lg {
				text-align: center;
			}
		}
	}
}

.expand-table {
	th {
		width: 14%;
	}

	td {
		width: 50%;
	}
}
</style>

<style lang="scss">
.select__limit {
	align-items: end;
	@media (max-width: 575px) {
		display: block;
	}
}
</style>
