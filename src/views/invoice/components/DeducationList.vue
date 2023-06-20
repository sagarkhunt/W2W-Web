<template>
	<div class="deducation__list pt-3">
		<!-- invoice list Seeker -->
		<div class="row">
			<!-- header -->
			<div class="payment-pill-header py-3 text-left">
				<h5 class="title-lg">{{ t('invoiceList.invoiceData.deductionList') }}</h5>
			</div>

			<!-- Deductions List -->
			<div class="overflow-auto">
				<div class="row m-0">
					<div class="col-12 px-0">
						<div v-if="deducationList.length > 0">
							<div class="deducation-box d-md-flex justify-content-between align-items-start p-4">
								<div>
									<h5 class="text-white mb-2">{{ t('invoiceList.leInvoice.addInvoice.deductions') }}</h5>
									<p class="fn15 mb-md-0 mb-2">{{ t('invoiceList.leInvoice.addInvoice.dedDesc') }}</p>
								</div>
								<div class="poduct-wrapper">
									<div v-for="(row, index) in deducationList || []" :key="index">
										<div class="mb-1 d-flex justify-content-between">
											<p class="product-name">{{ row.deduction_notes || '-' }}({{ Number(row.total_parts - row.deducted_parts) }} {{ t('invoiceList.leInvoice.addInvoice.left') }})</p>
											<p class="product-price">€ {{ row.parts_amount.toFixed(2) || 0 }}</p>
										</div>
									</div>
									<div class="mb-1 d-flex justify-content-sm-between justify-content-end gap-sm-0 gap-1 pt-3">
										<p class="product-name text-sm-start text-end">{{ t('workDetails.total') }}</p>
										<p class="product-price">€ {{ deductionTotal }}</p>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="text-center p-4 no-data-border">{{ t('common.noDataAvailable') }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- invoice list Seeker End -->
	</div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';

import { useField, useForm } from 'vee-validate';
// import moment from 'moment';

export default {
	name: 'deducationList',

	components: {},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const tableIndex = ref(0);
		const invoiceId = ref(null);
		const isRevisionNoteModal = ref(false);

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// form schema validation
		const profileSchema = yup.object({
			date_range: yup.date().nullable(),
			staus: yup.string().nullable(),
		});

		// form validation intialize
		const { meta: formMeta } = useForm({
			validationSchema: profileSchema,
		});

		// form fields

		const dateRangeSelect = reactive(
			useField('date_range', undefined, {
				initialValue: {
					range: {
						start: new Date(2020, 0, 1),
						end: new Date(2020, 0, 5),
					},
				},
			}),
		);
		const invoiceStaus = reactive(useField('status', undefined, { initialValue: '' }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			fetchDeducationList();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// invoice list seeker
		const deducationList = computed(() => store.getters['invoice/getSeekerDeducationList']);
		// total invoice count
		const totalInvoiceCount = computed(() => store.state.invoice.totalDeducation);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);
		const deductionTotal = computed(() => {
			const subTotal = deducationList.value.reduce((acc, item) => {
				const total = item.parts_amount;
				acc += total || 0;
				return acc;
			}, 0);
			return subTotal.toFixed(2) || 0;
		});
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch logged users invoices
		const fetchDeducationList = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};

			store.dispatch('invoice/getDeducationList', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchDeducationList();
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchDeducationList();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			page.value = 1;
			search.value = searchKey;
			fetchDeducationList();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchDeducationList();
		};
		/**
		 * Watch
		 * *******************************************************************
		 *
		 */

		// date range is filter
		return {
			// refs
			maxItemsPerPage,
			dateFormat,
			currencyConverture,
			t,
			tableIndex,
			invoiceId,
			isRevisionNoteModal,
			dateRangeSelect,
			formMeta,
			invoiceStaus,
			deductionTotal,
			// computed
			deducationList,
			totalInvoiceCount,
			userTypeInfo,
			// methods
			handleChangePage,
			handleSort,
			updateSearchQuery,
			changePerPageMaxItems,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.tbl-status {
	span {
		&.sts-wait {
			color: $colorWait;
		}

		&.sts-approve {
			color: $colorApprove;
		}
	}

	img {
		width: 40px;
		height: 40px;
		object-fit: cover;
	}
}

.table td,
.table th {
	vertical-align: middle;
}

.expand-table {
	th {
		width: 10%;
	}

	td {
		width: 20%;
	}
}

.data__table .table__data {
	overflow: auto !important;
}

.bg-orange {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #fca556 !important;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: #fff;
	}

	@media (max-width: 576px) {
		width: 35px;
		height: 35px;
		line-height: 35px;
	}
}

.bg-green {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #13d63a !important;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: #fff;
	}
}

.select-date-range {
	.w-70 {
		@media (max-width: 768px) {
			width: 100%;
		}
	}
}

.statwusFilter-label {
	margin-bottom: 0.1rem;
}

.radius-full {
	border-radius: 50px !important;
}

.payment-pill-header {
	.title-lg {
		color: #a0a4a9;
	}
}

.deducation-box {
	background-color: #000;
	border-radius: 5px;
	color: #fff;

	h5 {
		font-size: 18px;
		font-weight: 600;
	}

	.poduct-wrapper {
		font-size: 15px;
		font-weight: 500;

		.product-name {
			min-width: 150px;
		}

		.product-price {
			padding-left: 10px;
			min-width: 80px;
			text-align: end;
		}
	}
}

.fn15 {
	font-size: 15px;
}
.no-data-border {
	border-bottom: 1px solid #ccc;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	border-top: 1px solid #ccc;
	border-radius: 15px;
}
</style>
<style lang="scss">
</style>
