<template>
	<div class="document__list card-space container-lg pt-4">
		<div class="main-card position-relative">
			<div class="row">
				<div class="col-xl-6 col-lg-12 col-md-12 col-12">
					<div class="pph-wrapper d-flex flex-column">
						<div class="d-flex justify-content-between">
							<div class="logo-fi mb-4">
								<img src="@/assets/images/way2work-logo.png" alt="img" class="img-fluid" />
							</div>
							<div class="d-flex align-items-center justify-content-end mobile-pdf-view" @click="paySlipDetailPdf()">
								<button class="btn-common btn-red py-2">{{ t('invoiceList.leInvoice.viewInvoice.pdf') }}</button>
							</div>
						</div>
						<div class="pph-left-box d-flex justify-content-between flex-column me-xl-3">
							<div>
								<div class="mb-3">
									<h5 class="title-lg">{{ t('viewSeekerPay.invoice_recipient') }}</h5>
									
								</div>
								<div>
									<div class="position-relative">
										<div class="company-text">
											<p class="company-titel">{{ t('fieldList.companyName') }} :</p>
											<p class="company-value">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.invoice_company && seekerPaySleepDetail.invoice.invoice_company.company_name }}
											</p>
										</div>
										<div class="company-text">
											<p class="company-titel">{{ t('fieldList.email') }} :</p>
											<p class="company-value">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.invoice_company && seekerPaySleepDetail.invoice.invoice_company.company_email }}
											</p>
										</div>
										<div class="company-text">
											<p class="company-titel">{{ t('fieldList.phone') }} :</p>
											<p class="company-value">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.invoice_company && seekerPaySleepDetail.invoice.invoice_company.mobile }}
											</p>
										</div>
										<div class="company-text">
											<p class="company-titel">{{ t('projectMarketPage.address') }} :</p>
											<p class="company-value">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.invoice_company && seekerPaySleepDetail.invoice.invoice_company.address }}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-3">
								<h4 class="extrabold fn18 mb-1">
									{{ t('viewSeekerPay.sent_by') }}
								</h4>
								<p class="head-title">{{ t('invoiceList.leInvoice.viewInvoice.way2_work_oy') }}</p>
								<p class="head-title">
									{{ seekerPaySleepDetail.w2wCompanyDetails }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-6 col-md-12 col-12">
					<div class="red-wrapper">
						<div class="align-items-center justify-content-end desktop-view pb-3" @click="paySlipDetailPdf()">
							<button class="btn-common btn-red py-2">{{ t('invoiceList.leInvoice.viewInvoice.pdf') }}</button>
						</div>
						<div class="red-box ms-xl-3 mt-xl-0 mt-3">
							<div class="row justify-content-between mb-2">
								<div class="col-5">
									<h5 class="extrabold text-white fn18 d-inline">
										{{ t('viewSeekerPay.salary_breakdown') }}
									</h5>
									<div class="max-w-160 d-flex align-items-center justify-content-between">
										<span class="fn16 company-value">{{ t('viewSeekerPay.user_id') }}</span>
										<span class="fn16 company-value">{{ seekerPaySleepDetail.seeker && seekerPaySleepDetail.seeker.user && seekerPaySleepDetail.seeker.user.id }}</span>
									</div>
								</div>
								<div class="col-5">
									<h5 class="extrabold text-white fn18">{{ t('fieldList.paymentDate') }}</h5>
									<span class="company-value">{{ dateFormat(seekerPaySleepDetail.payment_date) }}</span>
								</div>
							</div>
							<div class="z-3 position-relative">
								<div class="company-text">
									<p class="company-titel">{{ t('common.reference') }} :</p>
									<p class="company-value">
										{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.ref_number }}
									</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.startDate') }} :</p>
									<p class="company-value">{{ dateFormat(seekerPaySleepDetail.created_at) }}</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('viewSeekerPay.bank_account') }} :</p>
									<p class="company-value">
										{{ seekerPaySleepDetail.seeker && seekerPaySleepDetail.seeker.account_number }}
									</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.ssn') }} :</p>
									<p class="company-value">
										{{ seekerPaySleepDetail.seeker && seekerPaySleepDetail.seeker.ssn }}
									</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('viewSeekerPay.payment_terms') }} :</p>
									<p class="company-value">
										{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.payment_terms }}
									</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.yearlyIncome') }} :</p>
									<p class="company-value">
										{{ seekerPaySleepDetail.seeker && seekerPaySleepDetail.seeker.yearly_income.toFixed(2) }}
									</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('viewSeekerPay.taxPercentage') }} :</p>
									<p class="company-value">{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.tax }}%</p>
								</div>
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.vat') }} :</p>
									<p class="company-value">{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.vat }}%</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-5 summary-table">
			<new-data-table :data="seekerPaySleepDetail.seekerInvoiceDetail || []" class="large-table table-borderless">
				<template #thead>
					<new-tb-th>{{ t('job.salaryType') }}</new-tb-th>
					<new-tb-th>{{ t('viewSeekerPay.timespan') }}</new-tb-th>
					<new-tb-th>{{ t('workDetails.Amount') }}</new-tb-th>
					<new-tb-th>{{ t('viewSeekerPay.a_price') }}</new-tb-th>
					<new-tb-th class="text-end">{{ t('invoiceList.leInvoice.viewInvoice.total') }}</new-tb-th>
				</template>
				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td> {{ tr.salary_type || '-' }}</new-tb-td>
						<new-tb-td> {{ tr.timespan || '-' }}</new-tb-td>
						<new-tb-td> {{ tr.amount || 0.0 }}</new-tb-td>
						<new-tb-td> {{ Number(tr.aPrice).toFixed(2) || 0.0 }}</new-tb-td>
						<new-tb-td class="text-end"> {{ tr.total || 0.0 }}</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>
			<div>
				<new-data-table :data="seekerPaySleepDetail.seekerInvoiceDetail || []" class="responsive-table mt-4">
					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div>
											{{ tr.salary_type || '-' }}
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
										<new-tb-th>{{ t('job.salaryType') }}</new-tb-th>
										<new-tb-td>{{ tr.salary_type }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('viewSeekerPay.timespan') }}</new-tb-th>
										<new-tb-td>{{ tr.timespan }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('workDetails.Amount') }}</new-tb-th>
										<new-tb-td>{{ tr.amount || 0 }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('viewSeekerPay.a_price') }}</new-tb-th>
										<new-tb-td>{{ Number(tr.aPrice).toFixed(2) || 0 }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.total') }}</new-tb-th>
										<new-tb-td>{{ tr.total || 0 }}</new-tb-td>
									</new-tb-tr>
								</div>
							</div>
						</new-tb-tr>
					</template>
				</new-data-table>
			</div>
			<div class="row my-3">
				<div class="col-8 text-end extrabold">{{ t('invoiceList.leInvoice.addInvoice.withholdingTax') }}</div>
				<div class="col-4 text-end">- {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.tax_amount.toFixed(2) }}</div>
			</div>
			<div class="row mb-2">
				<div class="col-8 text-end extrabold">{{ t('invoiceList.willBePaid') }}</div>
				<div class="col-4 text-end">
					<span class="extrabold mr-2">{{ t('viewSeekerPay.eur') }}</span
					>{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.sub_total.toFixed(2) }}
				</div>
			</div>
		</div>
		<div class="mt-4 overflow-auto payslip-desktop">
			<table class="table table-borderless table-head">
				<thead>
					<tr>
						<th class="w2">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</th>
						<th class="w20 text-left">{{ t('common.description') }}</th>
						<th class="w15 text-end">{{ t('viewSeekerPay.pay_period') }}</th>
						<th class="w20 text-end">
							{{ t('viewSeekerPay.from_the_beginning_of_the_year') }}
						</th>
					</tr>
				</thead>
			</table>
			<div class="my-4">
				<table class="table table-borderless table-text-bold table-radius">
					<tbody class="total-box text-white">
						<tr>
							<td class="p-0">
								<table class="table m-0 table-radius">
									<tbody class="total-box">
										<tr>
											<td rowspan="6" class="w5 pt-3 text-white">
												<div class="save-icon">
													<img src="~@/assets/images/save-icon.png" alt="" class="img-fluid" />
												</div>
											</td>
											<td class="w20 pt-3 text-white">
												{{ t('viewSeekerPay.total_wages') }}
											</td>
											<td class="w15 pt-3 text-white text-end">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.gross_salary.toFixed(2) }}
											</td>
											<td class="w20 pt-3 text-white text-end">
												{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_gross_salary.toFixed(2) }}
											</td>
										</tr>
										<tr>
											<td class="py-1 text-white">{{ t('viewSeekerPay.salary') }}</td>
											<td class="py-1 text-white text-end">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.gross_salary.toFixed(2) }}
											</td>
											<td class="py-1 text-white text-end">
												{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_gross_salary.toFixed(2) }}
											</td>
										</tr>
										<tr>
											<td class="py-1 text-white">{{ t('viewSeekerPay.tax_free_compensations') }}</td>
											<td class="py-1 text-white text-end">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.compensation_amount.toFixed(2) }}
											</td>
											<td class="py-1 text-white text-end">
												{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_compensation.toFixed(2) }}
											</td>
										</tr>
										<tr>
											<td class="py-1 text-white">{{ t('invoiceList.leInvoice.addInvoice.withholdingTax') }}</td>
											<td class="py-1 text-white text-end">- {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.tax_amount.toFixed(2) }}</td>
											<td class="py-1 text-white text-end">- {{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_tax_amount.toFixed(2) }}</td>
										</tr>
										<tr>
											<td class="py-1 text-white">{{ t('viewSeekerPay.other_deducations_payment') }} (-/+)</td>
											<td class="py-1 text-white text-end">- {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.deduction.toFixed(2) }}</td>
											<td class="py-1 text-white text-end">- {{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_deduction.toFixed(2) }}</td>
										</tr>
										<tr>
											<td class="text-white p-3">{{ t('viewSeekerPay.payments') }}</td>
											<td class="text-white p-3 text-end">
												{{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.sub_total.toFixed(2) }}
											</td>
											<td class="text-white p-3 text-end">
												{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_payment.toFixed(2) }}
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="payslip_table mt-4">
			<div class="payslip_table-head mb-3">
				<div class="row">
					<div class="col-lg-1">
						<div class="mobile_save_icon">
							<span>{{ t('invoiceList.leInvoice.addInvoice.summary') }}</span>
						</div>
					</div>
					<div class="col-lg-11 col-12 ps-md-0 px-2">
						<div class="row m-0">
							<div class="col-sm-6 col-12">
								<span>{{ t('common.description') }}</span>
							</div>
							<div class="col-sm-2 col-6">
								<span>{{ t('viewSeekerPay.pay_period') }}</span>
							</div>
							<div class="col-sm-4 col-6 pe-1">
								<span>{{ t('viewSeekerPay.from_the_beginning_of_the_year') }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="payslip_table_body">
				<div class="row">
					<div class="col-lg-1">
						<div class="mobile_save_icon save-icon">
							<img src="~@/assets/images/save-icon.png" alt="" class="img-fluid" />
						</div>
					</div>
					<div class="col-lg-11">
						<div class="row mx-sm-0">
							<div class="col-sm-6 col-12">
								<span>{{ t('viewSeekerPay.total_wages') }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.gross_salary.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_gross_salary.toFixed(2) }}</span>
								</div>
							</div>
						</div>
						<div class="row mx-sm-0 mt-1">
							<div class="col-sm-6 col-12">
								<span>{{ t('viewSeekerPay.salary') }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.gross_salary.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_gross_salary.toFixed(2) }}</span>
								</div>
							</div>
						</div>
						<div class="row mx-sm-0 mt-1">
							<div class="col-sm-6 col-12">
								<span>{{ t('viewSeekerPay.tax_free_compensations') }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.compensation_amount.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_compensation.toFixed(2) }}</span>
								</div>
							</div>
						</div>
						<div class="row mx-sm-0 mt-1">
							<div class="col-sm-6 col-12">
								<span>{{ t('invoiceList.leInvoice.addInvoice.withholdingTax') }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.tax_amount.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_tax_amount.toFixed(2) }}</span>
								</div>
							</div>
						</div>
						<div class="row mx-sm-0 mt-1">
							<div class="col-sm-6 col-12">
								<span>{{ t('viewSeekerPay.other_deducations_payment') }} (-/+)</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.deduction.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_deduction.toFixed(2) }}</span>
								</div>
							</div>
						</div>
						<div class="row mx-sm-0 mt-1">
							<div class="col-sm-6 col-12">
								<span> {{ t('viewSeekerPay.payments') }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<span>€ {{ seekerPaySleepDetail.invoice && seekerPaySleepDetail.invoice.sub_total.toFixed(2) }}</span>
							</div>
							<div class="col-sm-3 col-6">
								<div class="text-end">
									<span>{{ seekerPaySleepDetail.allPaidTotal && seekerPaySleepDetail.allPaidTotal.total_payment.toFixed(2) }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { dateFormat } from '@/utils/mixins';
import { async } from 'q';
export default {
	name: 'ViewSeekerPaySleepDetail',

	components: {
		FontAwesomeIcon,
	},
	setup() {
		// global router
		const route = useRoute();
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const tableIndex = ref(0);
		// icons
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// gloal store
		const store = useStore();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */

		onMounted(() => {
			store.dispatch('document/getPaySlipDetails', route.params.id);
		});

		/**
		 * Method Properties
		 * *******************************************************************
		 */
		// table open
		const openTable = index => {
			// showTable.value = !showTable.value
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// download payslip
		const paySlipDetailPdf = async () => {
			await store.dispatch('document/paySlipDetailsDownload', route.params.id).then(res => {
				downLoadFile(res.data);
			});
		};
		const downLoadFile = async data => {
			try {
				const userName = seekerPaySleepDetail.value?.seeker?.user?.full_name ?? '';
				const referenceNumber = seekerPaySleepDetail.value?.invoice?.ref_number ?? '';
				const paymentDate = seekerPaySleepDetail.value?.payment_date ?? '';
				const url = await URL.createObjectURL(data);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${userName}-${referenceNumber}-${dateFormat(paymentDate)}.pdf`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			} catch (err) {
				console.log({ err });
			}
		};

		/**
		 * computed Properties
		 * *******************************************************************
		 */

		const seekerPaySleepDetail = computed(() => store.getters['document/getPaySleepDetails']);

		return {
			t,
			//ref
			tableIndex,

			dateFormat,

			// methods
			openTable,
			paySlipDetailPdf,

			//icons
			arrowDown,
			arrowUp,

			//Computed
			seekerPaySleepDetail,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.document__list {
	.logo-fi {
		max-width: 200px;
		width: 100%;
	}
	.head-title {
		font-size: 15px;
		color: black;
	}

	.extrabold {
		font-weight: 600 !important;
	}

	.fn18 {
		font-size: 18px;
	}

	.mobile-pdf-view {
		display: none !important;

		@media (max-width: 1200px) {
			display: block !important;
		}
	}

	.pph-left-box {
		padding: 22px;
		border-radius: 25px;
		height: 100%;
		background-color: #f9f9f9;
		overflow: hidden;
		box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
	}

	.company-text {
		display: flex;
		align-items: center;
		margin-bottom: 6px;

		.company-titel {
			flex-basis: 250px;
			max-width: 250px;
			min-width: 100px;
			font-size: 16px;
			font-weight: 600;
		}
	}

	.red-box {
		background-color: #ff4b57;
		color: #fff;
		border-radius: 25px;
		box-shadow: 1px 1px 10px 2px rgba(204, 204, 204, 0.55);
		padding: 22px;
		position: relative;
		overflow: hidden;
		height: calc(100% - 59px);

		@media (max-width: 1200px) {
			height: 100%;
		}

		&::after {
			background-position: bottom right;
			content: '';
			background-image: url('~@/assets/images/invoice-red-box-puzzle.svg');
			background-size: contain;
			position: absolute;
			bottom: 0px;
			right: 0px;
			width: 330px;
			height: 330px;
			background-repeat: no-repeat;

			@media (max-width: 768px) {
				opacity: 0.8;
			}

			@media (max-width: 576px) {
				right: -40px;
				width: 200px;
			}
		}

		&::before {
			background-position: bottom right;
			content: '';
			background-image: url('~@/assets/images/payment-img.png');
			background-size: contain;
			position: absolute;
			bottom: 20px;
			right: 20px;
			width: 150px;
			height: 160px;
			background-repeat: no-repeat;
			z-index: 1;
			@media (max-width: 576px) {
				width: 90px;
			}
		}
	}

	.main-card::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		height: 30px;
		width: 30px;
		background-image: url('~@/assets/images/left-right-arrow.svg');
		background-size: contain;
		background-repeat: no-repeat;
		opacity: 0.5;

		@media (max-width: 1199px) {
			display: none;
		}
	}

	.large-table {
		table {
			th {
				&:first-child {
					border-bottom-left-radius: 10px;
					border-top-left-radius: 10px;
				}
				&:last-child {
					border-bottom-right-radius: 10px;
					border-top-right-radius: 10px;
				}
				border-right: transparent;
			}

			td {
				border-right: transparent;
				padding: 10px;
			}
		}
	}
}

.pph-wrapper,
.red-wrapper {
	height: 100%;
}

.desktop-view {
	display: flex !important;

	@media (max-width: 1200px) {
		display: none !important;
	}
}

.w2 {
	width: 2%;
}
.w5 {
	width: 5.2%;
}
.w20 {
	width: 20%;
}
.w15 {
	width: 15%;
}
.max-w-160 {
	max-width: 160px;
}
.z-3 {
	z-index: 3;
}

.vs-table-text {
	justify-content: end !important;
}
.total-box {
	padding: 1.5rem;
	background-color: #ff4b57;
}


.table-head {
	th {
		&:first-child {
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
		}
		&:last-child {
			border-bottom-right-radius: 10px;
			border-top-right-radius: 10px;
		}
	}
}

.table {
	&.table-radius {
		tbody {
			tr {
				td {
					&:first-child {
						border-top-left-radius: 20px;
						border-bottom-left-radius: 20px;
					}
					&:last-child {
						border-top-right-radius: 20px;
						border-bottom-right-radius: 20px;
					}
				}
			}
		}
	}
}

table {
	th {
		font-size: 16px;
		font-weight: 400;
		color: #fff;
		overflow: hidden;
		background: #000 !important;
		@media (max-width: 1440px) {
			font-size: 15px;
		}
	}
}

.expand-table {
	border-bottom: 10px solid #fff;
	th {
		width: 10%;
	}
}

.payslip-desktop {
	@media (max-width: 1024px) {
		display: none;
	}
}

.payslip_table {
	display: none;
	@media (max-width: 1024px) {
		display: block;
	}
	.payslip_table-head {
		border-radius: 10px;
		background-color: #000;
		color: #fff;
		padding: 0.75rem;
		font-size: 15px;

		@media (max-width: 992px) {
			font-size: 12px;
		}
		@media (max-width: 768px) {
			font-size: 13px;
		}

		@media (max-width: 600px) {
			display: none;
		}
	}
	.payslip_table_body {
		border-radius: 15px;
		background-color: #ff4b57;
		font-size: 15px;
		color: #fff;
		padding: 0.5rem;
		@media (max-width: 768px) {
			font-size: 14px;
		}
		@media (max-width: 575px) {
			padding: 1rem;
		}
		span,
		p {
			padding: 0.35rem 0;
			display: block;
			@media (max-width: 575px) {
				padding: 0.2rem 0;
			}
		}
	}
	.mobile_save_icon {
		@media (max-width: 991px) {
			display: none;
		}
	}
}
</style>
<style lang="scss">
.summary-table {
	.data__table {
		.table__data {
			border: 1px solid transparent !important;
		}
	}
}

.table-borderless {
	tbody {
		tr {
			border-bottom: transparent;
		}
	}
}
.red-tabel {
	.data__table {
		.table__data {
			.table {
				tbody {
					background-color: #ff4b57;
					color: #fff;
					border-radius: 20px;
					tr {
						&:first-child {
							border-bottom-left-radius: 10px;
							border-top-left-radius: 10px;
						}
						&:last-child {
							border-bottom-right-radius: 10px;
							border-top-right-radius: 10px;
						}
						border-right: transparent;
					}
				}
			}
		}
	}
}

.save-icon {
	height: 40px;
	width: 40px;
	margin: 0 auto;
}
</style>
