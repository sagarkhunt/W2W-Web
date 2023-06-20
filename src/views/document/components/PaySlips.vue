<template>
	<div class="pay_slip">
		<div class="table-header">
			<div class="payment-pill-header">
				<div class="pph-left">
					<h5 class="title-lg">
						{{ t('fieldList.paySlipDetails') }}
					</h5>
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
						<p class="d-inline-block head">{{ t('common.Showing') }}</p>
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
			:data="paySlipList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalInvoiceCount"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			class="large-table searchbar_table"
			@sort="handleSort"
		>
			<template #header>
				<div class="select__limit">
					<div>
						<label class="tbl_label">{{ t('common.Rows') }}</label>
						<div class="dropdown ml-0">
							<a
								class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
								href="#"
								id="navbarDropdownPaySlip"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{ t('common.Showing') }}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownPaySlipAria">
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
				<new-tb-th sort-key="created_at">{{ t('common.createdOn') }}</new-tb-th>
				<new-tb-th sort-key="invoice_number">{{ t('invoiceList.invoiceId') }}</new-tb-th>
				<new-tb-th sort-key="payment_type">{{ t('fieldList.paymentType') }}</new-tb-th>
				<new-tb-th sort-key="payment_date">{{ t('fieldList.paymentDate') }}</new-tb-th>
				<new-tb-th sort-key="amount_paid">{{ t('fieldList.paymentAmount') }}</new-tb-th>
				<new-tb-th sort-key="deduction_amount">{{ t('fieldList.deductionAmount') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
					<new-tb-td>{{ tr.invoice_number }}</new-tb-td>
					<new-tb-td>{{ tr.payment_type }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.payment_date) }}</new-tb-td>
					<new-tb-td>€ {{ tr.amount_paid }}</new-tb-td>
					<new-tb-td>€ {{ tr.deduction_amount }}</new-tb-td>
					<new-tb-td>
						<div class="d-flex align-items-center justify-content-center">
							<span v-if="tr.payslip_file_path">
								<ToolTip :title="t('toolTip.viewPaySlipFile')">
									<button class="tbl-action grey-edit" @click="viewSeekerPaySlip(tr.payslip_file_path)">
										<FontAwesomeIcon :icon="viewFile" style="text-align: 'center'" />
									</button>
								</ToolTip>
							</span>
							<span v-else>
								<ToolTip :title="t('toolTip.noFileFound')">
									<button class="tbl-action grey-edit-grey">
										<FontAwesomeIcon :icon="viewFile" style="text-align: 'center'" />
									</button>
								</ToolTip>
							</span>
							<ToolTip :title="t('toolTip.viewPaySlip')">
								<button class="tbl-action grey-edit ml-2" @click="viewSeekerPaysleepDetail(tr.id)">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
							<ToolTip :title="t('toolTip.deletePaySlip')">
								<button class="tbl-action red-close ml-2" @click="deleteSeekerPaySlip(tr.id)">
									<FontAwesomeIcon :icon="deleteIcon" />
								</button>
							</ToolTip>
						</div>
					</new-tb-td>
				</new-tb-tr>
			</template>
		</new-data-table>

		<div>
			<new-data-table
				:data="paySlipList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInvoiceCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table"
			>
				<template #header>
					<div class="select__limit desktop_table_header d-flex align-items-center">
						<span>{{ t('common.Showing') }}</span>
						<div class="dropdown mx-2">
							<a
								class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
								href="#"
								id="navbarDropdownEContract"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{{ maxItemsPerPage }}
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownEContractAria">
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
				</template>
				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div>
											{{ dateFormat(tr.created_at) }}
										</div>

										<div>
											{{ tr.amount_paid }}
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
										<new-tb-th>{{ t('fieldList.createdBy') }}</new-tb-th>

										<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.paymentType') }}</new-tb-th>

										<new-tb-td>{{ tr.payment_type }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.paymentDate') }}</new-tb-th>
										<new-tb-td>{{ dateFormat(tr.payment_date) }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.paymentAmount') }}</new-tb-th>

										<new-tb-td>{{ tr.amount_paid }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.deductionAmount') }}</new-tb-th>

										<new-tb-td>{{ tr.deduction_amount }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>

										<new-tb-td>
											<div class="d-flex align-items-center justify-content-start">
												<span v-if="tr.payslip_file_path">
													<ToolTip :title="t('toolTip.viewPaySlipFile')">
														<button class="tbl-action grey-edit" @click="viewSeekerPaySlip(tr.payslip_file_path)">
															<FontAwesomeIcon :icon="viewFile" style="text-align: 'center'" />
														</button>
													</ToolTip>
												</span>
												<span v-else>
													<ToolTip :title="t('toolTip.noFileFound')">
														<button class="tbl-action grey-edit-grey">
															<FontAwesomeIcon :icon="viewFile" style="text-align: 'center'" />
														</button>
													</ToolTip>
												</span>
												<ToolTip :title="t('toolTip.viewPaySlip')">
													<button class="tbl-action grey-edit ml-2" @click="viewSeekerPaysleepDetail(tr.id)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</button>
												</ToolTip>

												<ToolTip :title="t('toolTip.deletePaySlip')">
													<button class="tbl-action red-close ml-2" @click="deleteSeekerPaySlip(tr.id)">
														<FontAwesomeIcon :icon="deleteIcon" />
													</button>
												</ToolTip>
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
	<!-- open image modal -->

	<Suspense v-if="showDocumentImageModal.value">
		<template #default>
			<open-image-modal v-model:isModalShow="showDocumentImageModal" :imageLink="imageLink" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { dateFormat } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faTimes, faEye, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../../components/sweetalert';
import { currencyConverture } from '@/utils/mixins';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { useRouter } from 'vue-router';

const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'PaySlip',

	components: {
		// Slider,
		FontAwesomeIcon,
		OpenImageModal,
		DefaultLoader,
	},

	setup() {
		//ref
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const tableIndex = ref(0);
		const isDocImgModal = ref(false);
		const imageLink = ref(null);

		// icon
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const deleteIcon = faTimes;
		const viewIcon = faEye;
		const viewFile = faFileInvoice;

		//global store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		// sweet alert
		const Swal = useSwal();

		// global router
		const router = useRouter();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch logged users invoices
			fetchPaySlip();
			//yearly income
			fetchYearlyIncome();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// show upload my document model
		const showDocumentImageModal = computed({
			get() {
				return isDocImgModal;
			},
			set(val) {
				isDocImgModal.value = val;
			},
		});
		// invoice list
		const paySlipList = computed(() => store.getters['document/getPaySlipList']);

		//yearly income in progress bar
		const yearlyIncome = computed(() => store.getters['document/getYearlyIncome']);
		// total invoice count
		const totalInvoiceCount = computed(() => store.state.invoice.totalPaySlip);

		const paySlipValue = computed(() => store.state.document.earnedPercentage);

		const styeValue = computed(() => {
			return 'width:' + paySlipValue.value || 0 + '%';
		});
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current users document type
		const fetchPaySlip = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};
			await store.dispatch('document/getPaySlipList', payload);
		};
		//fetch yearly income
		const fetchYearlyIncome = async () => {
			await store.dispatch('document/getYearlyIncome');
		};
		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchPaySlip();
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchPaySlip();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchPaySlip();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchPaySlip();
		};
		// view document
		const viewSeekerPaySlip = link => {
			const checkExtenation = link
				.split(/[#?]/)[0]
				.split('.')
				.pop()
				.trim();
			if (checkExtenation == 'pdf' || checkExtenation == 'docx') {
				window.open(link);
			} else {
				imageLink.value = link;
				showDocumentImageModal.value = true;
				isDocImgModal.value = true;
			}
		};

		// delete my document
		const deleteSeekerPaySlip = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete', {
					field: 'conformationMessage.paySlip',
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('document/deleteJobseekerPaySlip', id).then(() => {
						fetchPaySlip();
					});
				}
			});
		};

		//view seeker invoice details
		const viewSeekerPaysleepDetail = id => {
			router.push({
				name: 'ViewSeekerPaySleepDetail',
				params: { id: id },
			});
		};

		return {
			// translate function
			t,

			// ref
			maxItemsPerPage,
			paySlipValue,
			dateFormat,
			tableIndex,
			currencyConverture,
			imageLink,

			// icon
			arrowDown,
			arrowUp,
			deleteIcon,
			viewIcon,
			viewFile,

			// computed
			paySlipList,
			totalInvoiceCount,
			yearlyIncome,
			showDocumentImageModal,
			isDocImgModal,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			openTable,
			styeValue,
			viewSeekerPaySlip,
			deleteSeekerPaySlip,
			handleSort,
			viewSeekerPaysleepDetail,
		};
	},
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.pay_slip {
	margin-bottom: 10px;
	margin-top: 40px;

	table {
		tr {
			td {
				&.text-yellow {
					color: $colorWait;
				}
			}
		}
	}

	.table th {
		padding: 0.5rem;
	}

	.table thead th {
		border-bottom: transparent;
	}

	table td {
		border-right: 1px solid #dee2e6;
	}
}
</style>

<style lang="scss">
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.tax-limit-progress {
	border-radius: 1rem;
	position: relative;
	z-index: 3;
	align-items: flex-end;
	background-color: #dcdfe3;
	height: 2rem;
	box-shadow: 0px 2px 2px #fff;

	.tax-limit-bar {
		background-color: #d11d25 !important;
	}

	span {
		color: $colorWhite;
		line-height: 30px;
		z-index: 99;
		font-size: 18px;
	}

	.progress-text {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
}

.multiselect-input {
	border: 1px solid #e2e2e2;
}

.slider-connects {
	height: 40px;
}

.slider-handle {
	display: none;
}

[disabled] .slider-connect {
	background: #e1001d;
}

.slider-horizontal {
	height: 40px;
}

.pay_slip {
	.data__table {
		.table__header {
			@media (max-width: 768px) {
			}
		}
	}
	.expand-table {
		th {
			width: 16% !important;
		}

		td {
			width: 50% !important;
		}
	}
}
</style>
