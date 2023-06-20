<template>
	<div>
		<vue3-html2pdf
			:enable-download="true"
			:preview-modal="false"
			:filename="`${singleInformationInvoice.invoice_number}`"
			:manual-pagination="true"
			pdf-format="a4"
			pdf-orientation="portrait"
			@hasGenerated="hasGenerated($event)"
			ref="pdf"
		>
			<template v-slot:pdf-content>
				<section>
					<div class="document__list card-space container-lg pt-4">
						<div>
							<div class="justify-content-center mb-xl-4 mb-sm-0 mb-4" style="display: flex; display: -webkit-box;">
								<div class="mb-xl-0 mb-3" style="width: 48%;">
									<div class="pph-wrapper">
										<div class="logo-fi pb-3">
											<img src="@/assets/images/way2work-logo.png" alt="img" class="img-fluid" />
										</div>

										<div class="pph-left-box">
											<h3 class="title-head">{{ t('fieldList.recipientDetails') }}</h3>
											<div class="company-content">
												<!-- company name -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.name') }}:</p>
													<p class="company-value">
														{{ (singleInformationInvoice.company && singleInformationInvoice.company.company_name) || '-' }}
													</p>
												</div>

												<!-- company email -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.email') }}:</p>
													<p class="company-value">
														{{ singleInformationInvoice.company && singleInformationInvoice.company.company_email }}
													</p>
												</div>

												<!-- company phone -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.phone') }}:</p>
													<p class="company-value">
														{{ singleInformationInvoice.company && singleInformationInvoice.company.mobile }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.residence') }}:</p>
													<p class="company-value">
														{{
															singleInformationInvoice.company &&
																singleInformationInvoice.company.companyCountry &&
																singleInformationInvoice.company.companyCountry.country_name
														}}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.city') }}:</p>
													<p class="company-value">
														{{
															(singleInformationInvoice.company &&
																singleInformationInvoice.company.companyCity &&
																singleInformationInvoice.company.companyCity.city_name) ||
																'-'
														}}
													</p>
												</div>

												<!-- company address -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.address') }}:</p>
													<p class="company-value">
														{{ singleInformationInvoice.company && singleInformationInvoice.company.address }}
													</p>
												</div>
											</div>

											<div class="company-content">
												<!-- zipCode -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
													<p class="company-value">
														{{ (singleInformationInvoice.company && singleInformationInvoice.company.zip_code) || '-' }}
													</p>
												</div>

												<!-- employer y tunnus -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
													<p class="company-value">
														{{ (singleInformationInvoice.company && singleInformationInvoice.company.reg_number) || '-' }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
													<p class="company-value">
														{{ (singleInformationInvoice.company && singleInformationInvoice.company.operator_code) || '-' }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
													<p class="company-value">
														{{ (singleInformationInvoice.company && singleInformationInvoice.company.vat_number) || '-' }}
													</p>
												</div>
												<!-- </div> -->
											</div>
										</div>
									</div>
								</div>

								<div class="mb-xl-0 mb-3 ms-4" style="width: 48%;">
									<div class="red-wrapper  ">
										<div class="pb-4">
											<h5 class="title-head">
												{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }} {{t('invoiceList.leInvoice.viewInvoice.invoice')}}
											</h5>
										</div>

										<div class="red-box">
											<div class="d-flex justify-content-between">
												<div class="mb-2">
													<h5 class="title-lg">{{ t('invoiceList.invoiceDate') }}</h5>
													<p class="text-md-fw">
														{{ dateFormat(singleInformationInvoice.created_at) }}
													</p>
												</div>

												<div v-if="singleInformationInvoice.mark_as_wrong">
													<div class="tbl-status">
														<span class="sts-wait d-flex align-items-center justify-content-center">
															<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
														</span>
													</div>
												</div>
											</div>
											<div>
												<div class="mb-2">
													<h5 class="title-lg mb-1">{{ t('fieldList.invoice_number') }}</h5>
													<p class="text-md-fw">
														{{ singleInformationInvoice.invoice_number }}
													</p>
												</div>

												<div class="mb-2">
													<h5 class="title-lg mb-1">{{ t('fieldList.reference_number') }}</h5>
													<p class="text-md-fw">
														{{ singleInformationInvoice?.ref_number || 'Not assigned yet' }}
													</p>
												</div>

												<div class="mb-2">
													<h5 class="title-lg mb-1">{{ t('fieldList.due_date') }}</h5>
													<p class="text-md-fw">
														{{ dateFormat(singleInformationInvoice.due_date || '-') }}
													</p>
												</div>

												<div class="mb-2">
													<h5 class="title-lg mb-1">
														{{ t('invoiceList.leInvoice.viewInvoice.latePaymentinterest') }}
													</h5>
													<p class="text-md-fw">{{ singleInformationInvoice?.panelty_interest || 0 }}%</p>
												</div>

												<div class="mb-2" v-if="singleInformationInvoice.company && singleInformationInvoice.company.reg_number">
													<h5 class="title-lg mb-1">{{ t('invoiceList.leInvoice.viewInvoice.companyID') }}</h5>
													<p class="text-md-fw">
														{{ singleInformationInvoice.company && singleInformationInvoice.company.reg_number }}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-if="singleInformationInvoice.under_review">
								<div class="pph-left mb-3">
									<h5 class="title-head">{{ t('invoiceList.leInvoice.viewInvoice.revisionNote') }}</h5>
								</div>

								<div class="overflow-auto">
									<div class="bottom-header d-flex align-items-center justify-content-between mb-4">
										<div class="d-flex align-items-center">
											<p class="text-white">{{ singleInformationInvoice.admin_revision_note ?? '' }}</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class="mb-3">
									<h5 class="title-head">{{ t('workDetails.workDetails') }}</h5>
								</div>
								<new-data-table :data="singleInformationInvoice.worked_hours || []" sst class="large-table detail-table">
									<template #thead>
										<new-tb-th class="w-30">{{ t('invoiceList.leInvoice.viewInvoice.invoiceDetails') }}</new-tb-th>
										<new-tb-th>{{ t('fieldList.date') }}</new-tb-th>
										<new-tb-th>{{ t('workDetails.value') }}</new-tb-th>
										<new-tb-th class="text-center">{{ t('workDetails.quantity') }}</new-tb-th>
										<new-tb-th class="text-center">{{ t('invoiceList.leInvoice.addInvoice.vat') }}%</new-tb-th>
										<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.noVat') }}</new-tb-th>
										<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}</new-tb-th>
										<new-tb-th>{{ t('workDetails.total') }}</new-tb-th>
									</template>
									<template #data="scopedData" ref="tableBody">
										<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
											<new-tb-td>{{ tr.description || '-' }}</new-tb-td>

											<new-tb-td>{{ tr.date == null ? '-' : dateFormat(tr.date) }}</new-tb-td>

											<new-tb-td>€ {{ singleInformationInvoice.mark_as_wrong ? -tr.contract_value : tr.contract_value || '-' }}</new-tb-td>

											<new-tb-td class="text-center">{{ singleInformationInvoice.mark_as_wrong ? -tr.total_work : tr.total_work || '-' }}</new-tb-td>

											<new-tb-td class="text-center">{{ singleInformationInvoice.vat || '-' }} </new-tb-td>

											<new-tb-td>€ {{ singleInformationInvoice.mark_as_wrong ? -(tr.contract_value * tr.total_work) : tr.contract_value * tr.total_work }}</new-tb-td>

											<new-tb-td
												>€
												{{
													singleInformationInvoice.mark_as_wrong
														? -((tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100)
														: (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100
												}}</new-tb-td
											>
											<new-tb-td
												>€
												{{
													singleInformationInvoice.mark_as_wrong
														? -(tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100)
														: tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100
												}}</new-tb-td
											>
										</new-tb-tr>
									</template>
								</new-data-table>

								<div class="overflow-auto">
									<div class="bottom-header d-flex align-items-center justify-content-between mb-4">
										<div class="pph-left">
											<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
										</div>
										<div class="d-flex align-items-center ml-md-auto">
											<div class="mr-5 text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.grossAmount') }}</p>
												<p class="text-sm-fw">
													€
													{{
														singleInformationInvoice.mark_as_wrong
															? -Number(singleInformationInvoice.gross_salary).toFixed(2)
															: Number(singleInformationInvoice.gross_salary).toFixed(2) || '-'
													}}
												</p>
											</div>

											<div class="mr-5 text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.withholdingTax') }}</p>
												<p class="text-sm-fw">
													€
													{{
														singleInformationInvoice.mark_as_wrong
															? -Number(singleInformationInvoice.tax_amount).toFixed(2)
															: Number(singleInformationInvoice.tax_amount).toFixed(2) || 0.0
													}}
												</p>
											</div>

											<div class="mr-5 text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
												<p class="text-sm-fw">
													€
													{{
														singleInformationInvoice.mark_as_wrong
															? -Number(singleInformationInvoice.compensation_amount).toFixed(2)
															: Number(singleInformationInvoice.compensation_amount).toFixed(2) || '-'
													}}
												</p>
											</div>

											<div class="text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.willpaid') }}</p>
												<p class="text-sm-fw">
													€
													{{
														singleInformationInvoice.mark_as_wrong
															? -Number(singleInformationInvoice.sub_total).toFixed(2)
															: Number(singleInformationInvoice.sub_total).toFixed(2) || '-'
													}}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div class="overflow-auto">
									<div class="bottom-header d-flex align-items-center justify-content-between mb-4">
										<div class="pph-left">
											<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.recipient') }}</h5>
										</div>
										<div class="d-flex align-items-center ml-md-auto">
											<div class="mr-5 text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.invoiceTotal') }}</p>
												<p class="text-sm-fw">
													€
													{{
														singleInformationInvoice.mark_as_wrong
															? -Number(singleInformationInvoice.company_pay_amount ?? 0).toFixed(2)
															: Number(singleInformationInvoice.company_pay_amount ?? 0).toFixed(2) || 0.0
													}}
												</p>
											</div>

											<div class="mr-5 text-white">
												<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.VATAmount') }}</p>
												<p class="text-sm-fw">
													€ {{ singleInformationInvoice.mark_as_wrong ? -singleInformationInvoice.vat_amount : singleInformationInvoice.vat_amount || 0 }}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div class="mb-3">
									<h5 class="title-head">{{ t('invoiceList.invoiceData.attachmentsList') }}</h5>
								</div>

								<new-data-table :data="singleInformationInvoice.invoice_files || []" sst class="large-table detail-table attachment-table">
									<template #thead>
										<new-tb-th class="w-50">{{ t('invoiceList.invoiceData.attachmentDescription') }}</new-tb-th>
										<new-tb-th class="w-30">{{ t('invoiceList.invoiceData.attachmentDate') }}</new-tb-th>
										<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
									</template>

									<template #data="scopedData" ref="tableBody">
										<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
											<new-tb-td>{{ tr.purchase_place || '-' }}</new-tb-td>
											<new-tb-td>{{ dateFormat(tr.purchase_date) }}</new-tb-td>
											<new-tb-td>
												<div class="d-flex align-items-center">
													<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</button>
												</div>
											</new-tb-td>
										</new-tb-tr>
									</template>
								</new-data-table>
							</div>

							<div class="page-break"></div>

							<div class="position-relative">
								<div class="overflow-auto" :class="!singleInformationInvoice.approved ? 'blur-overlay' : 'no-blur-overlay'">
									<h4 class="text-center mt-5"></h4>

									<div class="viewinvoicetable">
										<div class="d-flex">
											<div style="width:18%; border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2 text-start">
												<p>
													{{ t('invoiceList.leInvoice.viewInvoice.saajan_tilinumero') }}
												</p>
												<p>{{ t('invoiceList.leInvoice.viewInvoice.recipient_bank_number') }}</p>
											</div>
											<div style="width:33%; border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2">
												<p>{{ t('invoiceList.leInvoice.viewInvoice.iban') }}</p>
												<p class="ml-2">{{ singleInformationInvoice.iban }}</p>
											</div>
											<div style="width:55%; border-bottom:2px solid #000;" class="p-2">
												<p>{{ t('invoiceList.leInvoice.viewInvoice.bic') }}</p>
												<p class="ml-2">{{ t('invoiceList.leInvoice.viewInvoice.bank_bic') }} : {{ singleInformationInvoice.bic }}</p>
											</div>
										</div>

										<div class="d-flex">
											<div style="width:18%;height: 223px; border-right:2px solid #000;" class="p-2">
												<div class="ml-auto text-start">
													{{ t('invoiceList.leInvoice.viewInvoice.maksajan_nimi') }}
												</div>
												<div class="text-start">
													{{ t('invoiceList.leInvoice.viewInvoice.payer_name') }}
												</div>
											</div>

											<div class="d-flex flex-column justify-content-between p-2" style="width:33%; border-right:2px solid #000;">
												<div class="p-2">
													<p>
														{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }}
													</p>
												</div>
											</div>
											<div style="width:55%;" class="d-flex align-items-end">
												<div style="width:100%;border-top:2px solid #000;" class="d-flex">
													<div style="width:35%; " class="p-2">
														{{ t('invoiceList.leInvoice.viewInvoice.vitenumero_reference_number') }}
													</div>
												</div>
											</div>
										</div>

										<div style="border-top:2px solid #000;">
											<div class="d-flex">
												<div class="p-2 text-end" style=" width:19.5%;border-right:2px solid #000; border-bottom:2px solid #000;"></div>
												<div class="p-2" style=" width:36%;border-right:2px solid #000; border-bottom:2px solid #000;"></div>
												<div class="p-2 d-flex" style="width:28%; border-bottom:2px solid #000;">
													<div style="width:45%;">
														{{ t('invoiceList.leInvoice.viewInvoice.erapaiva_due_date') }}
													</div>
													<div class="d-flex align-items-center">
														{{ dateFormat(singleInformationInvoice.due_date) }}
													</div>
												</div>
												<div class="p-2 d-flex" style="width:32%; border-bottom:2px solid #000;">
													<div style="width:13%;">{{ t('invoiceList.leInvoice.viewInvoice.euro') }}</div>
													<div class="d-flex ml-3 align-items-center">
														€ {{ singleInformationInvoice.mark_as_wrong ? -singleInformationInvoice.sub_total : singleInformationInvoice.sub_total }}
													</div>
												</div>
											</div>
										</div>

										<div class="d-flex align-items-center my-3" style="height:72px;">
											<div class="barcode-text">
												<p class="d-flex align-items-center justify-content-center">
													{{ t('invoiceList.leInvoice.viewInvoice.barcode_here') }}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</template>
		</vue3-html2pdf>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Vue3Html2pdf from 'vue3-html2pdf';
import { dateFormat } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faEdit, faInfo, faLongArrowAltLeft, faLongArrowAltRight, faEye } from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'InvoiceViewPdf',

	props: {
		singleInformationInvoice: Object,
	},

	components: {
		Vue3Html2pdf,
		FontAwesomeIcon,
	},
	created() {
		this.$nextTick(() => {
			this.$refs.pdf.generatePdf();
			this.$emit('downloaded');
		});
	},
	setup() {
		//use useI18n
		const { t } = useI18n({ useScope: 'global' });
		const infoIcon = faInfo;
		const editIcon = faEdit;
		const leftArrowIcon = faLongArrowAltLeft;
		const rightArrowIcon = faLongArrowAltRight;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const downIcon = faChevronDown;
		const upIcon = faChevronUp;
		const viewIcon = faEye;

		return {
			t,
			dateFormat,

			// icon
			infoIcon,
			editIcon,
			leftArrowIcon,
			rightArrowIcon,
			arrowDown,
			arrowUp,
			downIcon,
			upIcon,
			viewIcon,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.document__list {
	.attachment-table {
		.border-table {
			background-color: red;
		}
	}

	.logo-fi {
		width: 200px;
		height: 55px;
	}

	.arrow-width {
		img {
			width: 50px;
		}
	}

	.grey-box {
		background-color: #f6f6f6;
		border-radius: 20px;

		.grey-col-p {
			padding: 20px;

			&::after {
				content: '';
				background-image: url('~@/assets/images/myResumesImg.svg');
				background-repeat: no-repeat;
				background-size: contain;
				width: 150px;
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		.bg-black {
			background-color: rgb(77, 22, 22);
			border-radius: 50px;
			padding: 20px;

			.info-icon {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.piggi-wrap {
				width: 100px;
				height: 100px;
				position: absolute;
				right: -12px;
				bottom: 15px;
			}
		}
	}

	.red-box {
		background-color: #ff4b57;
		color: #fff;
		border-radius: 25px;
		box-shadow: 1px 1px 10px 2px rgba(204, 204, 204, 0.55);
		padding: 22px;
		position: relative;
		height: calc(100% - 55px);

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
		}
	}

	.red-puzzle {
		background-color: #ff4b57;
		border-radius: 20px;
		padding: 50px;
		width: calc(100% - 50px);

		&::after {
			content: '';
			background-image: url('~@/assets/images/invoice-puzzle.png');
			background-size: contain;
			position: absolute;
			bottom: 0;
			right: 0;
			transform: translate(-30px, 0);
			width: 110px;
			height: 200px;
			background-repeat: no-repeat;
			z-index: 1;
		}

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translate(40px, -50%);
			width: 50px;
			height: 50px;
			background-color: #ff4b57;
			border-radius: 50px;
		}
	}

	.red-2-puzzle {
		background-color: #ff4b57;
		border-radius: 20px;
		padding: 50px;
		height: 100%;
		width: calc(100% - 50px);
	}

	.address-text {
		max-width: 200px;
	}

	.info-icon {
		width: 30px;
		height: 30px;
		border-radius: 50px;
		background-color: #fff;
	}

	.pph-left-box {
		padding: 19px;
		border-radius: 25px;
		background-color: #f9f9f9;
		height: calc(100% - 61px);
		overflow: hidden;
		box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);

		.company-content {
			padding: 10px 0;

			.company-text {
				display: flex;
				display: -webkit-box;
				margin-bottom: 5px;
				.company-titel {
					flex-basis: 160px;
					font-size: 12px;
					color: #858a90;
				}
				.company-value {
					font-size: 12px;
					margin-bottom: 5px;
					font-weight: 500;
					color: #626262;
					min-width: 320px;
				}
			}
		}

		.company-sub-content {
			padding: 19px;
			border-radius: 20px;
			background-color: #f2f2f2;
		}
	}
}

.title-sm {
	font-size: 13px;
}

.verticle-text {
	transform: rotate(-90deg);
	position: absolute;
	top: 0;
	left: 0px;
	width: 126px;
	height: 100%;
	font-size: 10px;
	text-align: center;
	font-weight: 500;
}

.red-box-common {
	.prof-bg-puzzle {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		display: block;

		img {
			width: 100%;
			height: 100%;
		}
	}

	p,
	span,
	div {
		z-index: 1;
		position: relative;
	}

	.invoice-content {
		max-width: 250px;
		width: 100%;
	}

	.invoice-value {
		max-width: 120px;
		width: 100%;
	}
}

.bottom-header {
	background-color: $coloRed;
	padding: 10px;
	border-radius: 5px;
}

.max-w-300 {
	max-width: 300px;
}
.table-text {
	max-width: 67px;
}

.barcode-text {
	max-width: 800px;
	width: 100%;
}

.blur-overlay {
	filter: blur(3px);
	cursor: not-allowed;
	user-select: none;
}

.no-blur-overlay {
	filter: blur(0px);
}

.border-dash {
	border-bottom: 2px dashed rgb(26, 21, 21);
	line-height: 45px;
	position: relative;

	&:after {
		content: '';
		background-image: url('~@/assets/images/scissors.svg');
		background-size: contain;
		height: 30px;
		width: 30px;
		position: absolute;
		top: -14px;
		left: 0;
		background-repeat: no-repeat;
		transform: rotate(90deg);
	}
}

.large-table {
	table {
		tr {
			th {
				padding: 14px 7px;
				font-size: 10px;
				font-weight: 600;

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
				padding: 14px 7px;
			}
		}

		tbody {
			font-size: 10px !important;
		}
	}
}

.viewinvoicetable {
	color: #000;
	font-weight: 500;
	font-size: 11px;
	border: 2px solid #000;
}

.tbl-status {
	.sts-wait {
		background-color: #000;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		color: #fff;
		padding: 10px 20px;
		border-radius: 50px;
		z-index: 1;
		position: relative;
	}
}

.title-lg {
	font-size: 12px;
	font-weight: 600;
}

.text-md-fw {
	font-size: 12px;
	font-weight: 500;
}

.text-sm-fw {
	font-size: 12px;
	font-weight: 500;
}

.title-head {
	font-size: 22px;
	font-weight: 500;
}

.pph-wrapper,
.red-wrapper {
	height: 100%;
}

.pph-left {
	h5 {
		font-size: 16px;
	}
}
</style>
<style lang="scss">
.document__list {
	.data__table {
		&.detail-table {
			.table__data {
				min-height: auto !important;
				height: 100%;

				table {
					tbody {
						font-size: 10px;
					}
				}
			}
		}
	}
}

.page-break {
	page-break-after: always;
}
</style>
