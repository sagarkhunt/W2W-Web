<template>
	<div>
		<vue3-html2pdf
			:enable-download="true"
			:preview-modal="false"
			:filename="`${singleInformationTeamInvoice.invoice_number}`"
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
							<div class=" justify-content-center mb-xl-4 mb-sm-0 mb-4" style="display: flex; display: -webkit-box;">
								<div class="mb-xl-0 mb-3" style="width: 48%;">
									<div class="pph-wrapper">
										<div class="logo-fi pb-3">
											<img src="@/assets/images/way2work-logo.png" alt="img" class="img-fluid" />
										</div>
										<div class="pph-left-box">
											<h4 class="font-semibold pb-3">{{ t('fieldList.recipientDetails') }}</h4>
											<div class="pph-left-content">
												<div class="company-content">
													<!-- company name -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.name') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.company_name) || '-' }}
														</p>
													</div>

													<!-- company email -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.email') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.company_email) || '-' }}
														</p>
													</div>

													<!-- company phone -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.phone') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.mobile) || '-' }}
														</p>
													</div>

													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.residence') }}:</p>
														<p class="company-value">
															{{
																singleInformationTeamInvoice.company &&
																	singleInformationTeamInvoice.company.companyCountry &&
																	singleInformationTeamInvoice.company.companyCountry.country_name
															}}
														</p>
													</div>

													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.city') }}:</p>
														<p class="company-value">
															{{
																(singleInformationTeamInvoice.company &&
																	singleInformationTeamInvoice.company.companyCity &&
																	singleInformationTeamInvoice.company.companyCity.city_name) ||
																	'-'
															}}
														</p>
													</div>

													<!-- company address -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.address') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.address) || '-' }}
														</p>
													</div>
												</div>

												<!-- <div class="company-content company-sub-content"> -->
												<div class="company-content">
													<!-- employer ssn -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.zip_code) || '-' }}
														</p>
													</div>

													<!-- employer y tunnus -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.reg_number) || '-' }}
														</p>
													</div>
													<!-- </div> -->

													<!-- Operator code no. -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.operator_code) || '-' }}
														</p>
													</div>

													<!-- Vat no. -->
													<div class="company-text">
														<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
														<p class="company-value">
															{{ (singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.vat_number) || '-' }}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="mb-xl-0 mb-3 ms-4" style="width: 48%;">
									<div class="red-wrapper">
										<div class="pb-4">
											<h4 class="title-head text-gray">
												{{
													singleInformationTeamInvoice.created_by &&
														singleInformationTeamInvoice.created_by.seeker &&
														singleInformationTeamInvoice.created_by.seeker.user &&
														singleInformationTeamInvoice.created_by.seeker.user.full_name
												}}
												{{ t('invoiceList.leInvoice.viewInvoice.invoice') }}
											</h4>
										</div>

										<div class="red-box">
											<div class="d-flex justify-content-between">
												<div class="mb-2">
													<h5 class="title-lg text-white mb-1">{{ t('invoiceList.invoiceDate') }}</h5>
													<p class="text-md-fw text-light">
														{{ dateFormat(singleInformationTeamInvoice.created_at) }}
													</p>
												</div>

												<div v-if="singleInformationTeamInvoice.mark_as_wrong">
													<div class="tbl-status">
														<span class="sts-wait d-flex align-items-center justify-content-center">
															<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
														</span>
													</div>
												</div>
											</div>

											<div class="mb-2">
												<p class="text-white mb-1 title-lg">{{ t('fieldList.invoice_number') }}</p>
												<p class="text-light text-md-fw ">
													{{ singleInformationTeamInvoice.invoice_number }}
												</p>
											</div>

											<div class="mb-2">
												<p class="text-white mb-1 title-lg">{{ t('fieldList.reference_number') }}</p>
												<p class="text-light text-md-fw ">
													{{ singleInformationTeamInvoice.ref_number }}
												</p>
											</div>

											<div class="mb-2">
												<p class="text-white mb-1 title-lg">{{ t('fieldList.due_date') }}</p>
												<p class="text-light text-md-fw ">
													{{ dateFormat(singleInformationTeamInvoice.due_date) }}
												</p>
											</div>

											<div class="mb-2">
												<p class="text-white mb-1 title-lg">
													{{ t('invoiceList.leInvoice.viewInvoice.latePaymentinterest') }}
												</p>
												<p class="text-light text-md-fw ">
													{{ singleInformationTeamInvoice.panelty_interest }}
												</p>
											</div>

											<div class="mb-2" v-if="singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.reg_number">
												<p class="text-white mb-1 title-lg">{{ t('invoiceList.leInvoice.viewInvoice.companyID') }}</p>
												<p class="text-light text-md-fw ">
													{{ singleInformationTeamInvoice.company && singleInformationTeamInvoice.company.reg_number }}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div class="bg-white pb-3">
									<div class="employer-details flex justify-between items-center">
										<div class="pph-left">
											<h4 class="font-semibold">{{ t('invoiceList.leInvoice.viewInvoice.seekerWHList') }}</h4>
										</div>
									</div>
									<div class="daily-Work-Details bg-white">
										<div class="daily-work-row pt-3">
											<div class="daily-work-col">
												<!-- paymentsharing head -->
												<div class="details-head text-center flex items-center text-white">
													<div class="member-name px-2">
														<p class="details-head-text text-start font-bold">{{ t('invoiceList.leInvoice.viewInvoice.seekerName') }}</p>
													</div>

													<div class="role-member px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.Role') }}</p>
													</div>

													<div class="email-address px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.emailAddress') }}</p>
													</div>

													<div class="share-value px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.Share') }}</p>
													</div>

													<div class="Tax-value px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.viewInvoice.taxPercentage') }}</p>
													</div>

													<div class="allowances px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.Allowances') }}</p>
													</div>
													<div class="payment px-2">
														<p class="details-head-text font-bold">{{ t('invoiceList.willBePaid') }}</p>
													</div>
												</div>

												<!-- paymentsharing list - row -->
												<div v-for="(item, index) in singleInformationTeamInvoice.invoice_seekers || []" :key="index">
													<div
														class="details-content text-center"
														v-if="[singleInformationTeamInvoice?.created_by?.seeker?.id, item.seeker.id].includes(userDetail?.jobSeeker?.id)"
													>
														<div class="member-name text-start">
															<div class="flex items-center">
																<p class="ml-2">{{ item.seeker.user.full_name }}</p>
															</div>
														</div>

														<div class="role-member flex items-center justify-center">
															<div class="w-30 h-30">
																<img
																	:title="singleInformationTeamInvoice?.created_by?.seeker?.id === item.seeker?.id ? 'Leader' : 'Member'"
																	:src="
																		require(`@/assets/images/${
																			singleInformationTeamInvoice?.created_by?.seeker?.id === item.seeker?.id ? 'leader-icon.svg' : 'member-icon.svg'
																		}`)
																	"
																	class="w-100 h-100"
																	alt="err"
																/>
															</div>
														</div>

														<div class="email-address text-center">
															<div>
																<p class="text-break">{{ item?.seeker?.user?.email }}</p>
															</div>
														</div>

														<div class="share-value ml-xl-0 ml-3 text-center">
															<p>€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item?.shared_amount.toFixed(2)) :item?.shared_amount.toFixed(2) }}</p>
														</div>

														<div class="Tax-value text-center">
															<p>{{ singleInformationTeamInvoice.mark_as_wrong ? -(item?.tax) : item?.tax }}%</p>
														</div>

														<div class="allowances text-center">
															<p>€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item?.compensation_amount.toFixed(2)): item?.compensation_amount.toFixed(2) }}</p>
														</div>

														<div class="payment text-center">
															<div>
																<p class="text-red">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(Number(item.seeker_company_pay).toFixed(2)) : Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
															</div>
														</div>
													</div>

													<!-- paymentsharing row expand -->
													<div class="opne-toggle p-3 table-color">
														<!-- daily work hour list - column name -->
														<div class="details-head text-center text-white">
															<div class="product-no">
																<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.viewInvoice.invoiceDetails') }}</p>
															</div>
															<div class="team-member">
																<p class="details-head-text font-bold">{{ t('fieldList.date') }}</p>
															</div>
															<div class="discription">
																<p class="details-head-text font-bold">{{ t('workDetails.value') }}</p>
															</div>
															<div class="contract-type">
																<p class="details-head-text font-bold">{{ t('workDetails.quantity') }}</p>
															</div>
															<div class="contract-type">
																<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.addInvoice.vat') }}%</p>
															</div>
															<div class="contract-type">
																<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.viewInvoice.noVat') }}</p>
															</div>
															<div class="contract-type">
																<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.addInvoice.vat') }}</p>
															</div>
															<div class="quantity">
																<p class="details-head-text font-bold">{{ t('workDetails.total') }}</p>
															</div>
														</div>
														<div class="text-black text-sm overflow-hidden">
															<div v-for="(itemRaw, index) in item.workHours || []" :key="index">
																<div class="row no-gutters border-box">
																	<div class="details-content">
																		<!-- serial no. -->
																		<div class="product-width">
																			<div class="product-1 text-center">
																				<p class="inpult-area">{{ itemRaw.description }}</p>
																			</div>
																		</div>

																		<!-- description -->
																		<div class="work-width text-center">
																			<p>{{ dateFormat(itemRaw.date) }}</p>
																		</div>

																		<!-- description -->
																		<div class="work-width text-center">
																			<p>€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(itemRaw.contract_value) : itemRaw.contract_value || '-' }}</p>
																		</div>

																		<!-- contract type -->
																		<div class="hours-width me-2 text-center">
																			<p>{{ singleInformationTeamInvoice.mark_as_wrong ? -(itemRaw.total_work) : itemRaw.total_work || '-' }}</p>
																		</div>
																		<!-- vat % -->
																		<div class="hours-width me-2 text-center">
																			<p>{{ singleInformationTeamInvoice.vat || '-' }}</p>
																		</div>
																		<!-- no vat -->
																		<div class="hours-width me-2 text-center">
																			<p>€{{ singleInformationTeamInvoice.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work) : itemRaw.contract_value * itemRaw.total_work || '-' }}</p>
																		</div>
																		<!-- vat -->
																		<div class="hours-width me-2 text-center">
																			<p>€ {{ singleInformationTeamInvoice.mark_as_wrong ? -((itemRaw.contract_value * itemRaw.total_work * singleInformationTeamInvoice.vat) / 100) : (itemRaw.contract_value * itemRaw.total_work * singleInformationTeamInvoice.vat) / 100 }}</p>
																		</div>
																		<!-- contract value -->
																		<div class="contractvalue-width text-center">
																			<p>
																				€
																				{{
																					singleInformationTeamInvoice.mark_as_wrong ? -(
																					itemRaw.contract_value * itemRaw.total_work +
																						(itemRaw.contract_value * itemRaw.total_work * singleInformationTeamInvoice.vat) / 100) : 
																					itemRaw.contract_value * itemRaw.total_work +
																						(itemRaw.contract_value * itemRaw.total_work * singleInformationTeamInvoice.vat) / 100
																				}}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
															<div class="ml-auto total rounded-3 p-3 mt-3 me-3">
																<div class="total">
																	<div class="total-excl d-flex justify-content-between w-full pb-3">
																		<p class="text-total">{{ t('invoiceList.leInvoice.viewInvoice.totalExclVat') }}</p>
																		<p class="text-prize text-black font-semibold">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item.tax) : item.tax || 0 }}</p>
																	</div>
																	<div class="total-excl d-flex justify-content-between w-full pb-3">
																		<p class="text-total">{{ t('workDetails.totalCompensation') }}</p>
																		<p class="text-prize text-black font-semibold">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item.compensation_amount.toFixed(2)) : item.compensation_amount.toFixed(2) || 0 }}</p>
																	</div>
																	<div class="total-excl border-top-bottom d-flex justify-content-between font-semibold text-right text-lg py-2">
																		<p class="text-black text-total">{{ t('workDetails.total') }}</p>
																		<p class="total-prize text-total">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item.sub_total.toFixed(2)) :item.sub_total.toFixed(2) || '0' }}</p>
																	</div>
																</div>
															</div>
														</div>

														<div class="overflow-auto">
															<div class="bottom-header d-flex align-items-center justify-content-between my-3">
																<div class="pph-left">
																	<h5 class="text-white fn16">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
																</div>
																<div class="d-flex align-items-center ml-md-auto">
																	<div class="mr-5 text-white">
																		<p class="text-sm-fw ">{{ t('invoiceList.leInvoice.addInvoice.grossAmount') }}</p>
																		<p class="text-sm-fw ">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0) :item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0 }}</p>
																	</div>

																	<div class="mr-5 text-white">
																		<p class="text-sm-fw ">{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}</p>
																		<p class="text-sm-fw ">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0) :item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0 }}</p>
																	</div>

																	<div class="mr-5 text-white">
																		<p class="text-sm-fw ">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
																		<p class="text-sm-fw ">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(Number(item.compensation_amount).toFixed(2)) :Number(item.compensation_amount).toFixed(2) || 0 }}</p>
																		
																	</div>

																	<div class="text-white">
																		<p class="text-sm-fw ">{{ t('invoiceList.leInvoice.addInvoice.willpaid') }}</p>
																		<p class="text-sm-fw ">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(Number(item.seeker_company_pay).toFixed(2)) :Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
																		
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="page-break"></div>
								<div>
									<h4 class="font-bold mt-4 Title">{{ t('invoiceList.invoiceData.attachmentsList') }}</h4>
								</div>

								<div id="table-loading" class="overflow-auto">
									<table class="w-full table-auto mt-3 table-height" style="height: fit-content">
										<thead class="w-full">
											<tr class="bg-black text-white text-md w-full">
												<th class="w-30">{{ t('invoiceList.leInvoice.viewInvoice.placeOfPurchase') }}</th>
												<th>{{ t('invoiceList.leInvoice.viewInvoice.dateOfPurchase') }}</th>
												<th>{{ t('invoiceList.invoiceData.attachments') }}</th>
											</tr>
										</thead>
										<tbody class="text-black font-bold" v-if="(singleInformationTeamInvoice.invoice_files || []).length">
											<tr :data="tr" :key="i" v-for="(tr, i) in singleInformationTeamInvoice.invoice_files || []">
												<td>{{ tr.purchase_place || '-' }}</td>
												<td>{{ dateFormat(tr.purchase_date) }}</td>
												<td>
													<div class="d-flex align-items-center">
														<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
															<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
														</button>
													</div>
												</td>
											</tr>
										</tbody>
										<tbody class="table-border text-center" v-else>
											<tr>
												<td colspan="3">
													<p class="font-bold py-3 Title text-center">{{ t('common.noDataAvailable') }}.</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<div class="position-relative">
								<div class="overflow-auto" :class="!singleInformationTeamInvoice.approved ? 'blur-overlay' : 'no-blur-overlay'">
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
												<p class="ml-2">
													{{ singleInformationTeamInvoice.iban }}
												</p>
											</div>
											<div style="width:55%; border-bottom:2px solid #000;" class="p-2">
												<p>{{ t('invoiceList.leInvoice.viewInvoice.bic') }}</p>
												<p class="ml-2">
													{{ t('invoiceList.leInvoice.viewInvoice.bank_bic') }} :
													{{ singleInformationTeamInvoice.bic }}
												</p>
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
														{{
															singleInformationTeamInvoice.created_by &&
																singleInformationTeamInvoice.created_by.seeker &&
																singleInformationTeamInvoice.created_by.seeker.user &&
																singleInformationTeamInvoice.created_by.seeker.user.full_name
														}}
													</p>
												</div>
											</div>
											<div style="width:55%;" class="d-flex align-items-end">
												<div style="width:100%;border-top:2px solid #000;" class="d-flex">
													<div style="width:38%; " class="p-2">
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
													<div class="d-flex align-items-center ml-3">
														{{ dateFormat(singleInformationTeamInvoice.due_date) }}
													</div>
												</div>
												<div class="p-2 d-flex" style="width:32%; border-bottom:2px solid #000;">
													<div style="width:13%;">{{ t('invoiceList.leInvoice.viewInvoice.euro') }}</div>
													<div class="d-flex ml-3 align-items-center">€ {{ singleInformationTeamInvoice.mark_as_wrong ? -(singleInformationTeamInvoice.sub_total) :singleInformationTeamInvoice.sub_total }}</div>
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
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
	name: 'TeamInvoiceViewPdf',

	props: {
		singleInformationTeamInvoice: Object,
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

		// gloal store
		const store = useStore();

		/**
		 * computed Properties
		 * *******************************************************************
		 */
		const userDetail = computed(() => store.state.auth.user);

		const seekerTeamInvoiceDetail = computed(() => store.getters['teamInvoice/getTeamInvoiceSeekerDetails']);

		const finalTotal = computed(() => {
			const initObj = { grossSalary: 0, taxbledAmount: 0, compensationAmount: 0, youWillBePaid: 0, invoiceTotal: 0, vatTotal: 0 };
			return (
				store.state.teamInvoice?.teaminvoiceSeekerDetail?.invoice_seekers?.reduce((acc, item) => {
					acc.grossSalary += Number(item.gross_salary);
					acc.taxbledAmount += Number(item.tax_amount);
					acc.compensationAmount += Number(item.compensation_amount);
					acc.youWillBePaid += Number(item.sub_total);
					acc.invoiceTotal += Number(item.seeker_company_pay);
					acc.vatTotal += Number(item.worked_value);
					return acc;
					// }
				}, initObj) || initObj
			);
		});

		return {
			t,
			dateFormat,
			infoIcon,
			editIcon,
			leftArrowIcon,
			rightArrowIcon,
			arrowDown,
			arrowUp,
			downIcon,
			upIcon,
			viewIcon,

			//computed
			userDetail,
			seekerTeamInvoiceDetail,
			finalTotal,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.pph-left-box {
	padding: 19px;
	border-radius: 25px;
	background-color: #f9f9f9;
	height: calc(100% - 62px);
	box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
}

.company-content {
	padding-top: 10px 0;

	.company-text {
		display: flex;
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
			max-width: 200px !important;
		}
	}
}

.w-30 {
	width: 30%;
	height: 30%;
}

.cutomer-width {
	min-width: 110px;
}

.document__list {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	padding: 30px 45px;
	.logo-fi {
		width: 200px;
		height: 55px;
		margin: 0;
	}

	.arrow-width {
		img {
			width: 50px;
		}
	}

	.grey-box {
		background-color: #f6f6f6;
		border-radius: 20px;
		box-shadow: 1px 1px 3px #ccc;

		.grey-col-p {
			padding: 20px;

			&::after {
				content: '';
				background-image: url('~@/assets/images/invoice-address-3.svg');
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
			transform: translate(5px, 0px);
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
	border-radius: 20px;
	height: 440px;
	padding: 80px;
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

.title-sm {
	font-size: 13px;
}

.max-w-300 {
	max-width: 300px;
}
.save-icon {
	max-width: 50px;
	width: 100%;
}

.fw-500 {
	font-weight: 500;
	font-size: 16px;
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

table {
	border-spacing: 0;
	width: 100%;

	tr {
		padding: 20px 20px;
		border-bottom: 1px solid #dee2e6;
		border-radius: 10px;
		overflow: hidden;
		&:last-child {
			border-bottom: 1px solid transparent;
		}
		th {
			padding: 10px;
			font-size: 11px;
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
			font-size: 11px;
		}
	}
}

.expand-table {
	overflow: visible;
	border-radius: 30px;
	border-bottom: none;

	th {
		border: none;
		width: 29%;
	}

	td {
		width: 70%;
		border: none;
		background-color: #fff;
	}
}

.border-padding {
	border-bottom-left-radius: 10px;
	background-color: #f5f5f5;
	padding: 10px;
	border-bottom-right-radius: 10px;
}

.table-height {
	max-height: 100%;
	border: 1px solid #dee2e6;
	border-radius: 10px;
	overflow: hidden !important;
}

.daily-work-col {
	border: 1px solid #dde0e2;
	border-radius: 10px;
}
.border-box {
	border: 1px solid #dde0e2;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
}
.border-b {
	border-bottom: 1px solid #dde0e2;
}
.employer-details {
	.pph-left {
		.title-lg {
			color: #a0a4a9;
			font-size: 26px;
		}
	}
}
.border-spacing-0 {
	border-spacing: 0;
}
.daily-Work-Details {
	.product {
		font-size: 14px;
		padding: 8px 20px;
		border-radius: 12px;
		border: 2px solid #e4e6e7;
	}
	.team-Member {
		width: 100%;
		padding: 8px 20px;
		border-radius: 12px;
		background-color: #f6f6f6;
		font-size: 14px;
	}
	.multiselect-input {
		border: none !important;
		width: 100%;
		border-radius: 12px;
		box-sizing: border-box;
		cursor: pointer;
		position: relative;
		outline: none;
		padding: 8px 20px;
		background-color: #f6f6f6;
	}
	.contract-Value {
		padding: 8px 10px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		background-color: #f6f6f6;
	}
	.actions-btn {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12px;
		color: rgb(255, 75, 87);
		background-color: #f8dddf;
	}
	.opne-toggle {
		border-top: 1px solid #ccc;
		.summary-box {
			background-color: rgb(255, 75, 87);
			height: 320px;
			.summary-text {
				font-size: 48px;
				letter-spacing: -3px;
				line-height: 41px;
				text-shadow: 1px 3px 3px #494848;
			}
		}
		.dark-box {
			height: 320px;
		}
	}
}

.details-content {
	display: flex;
	align-items: center;
	padding: 10px 7px;
	font-size: 10px;

	.product-width {
		width: 20%;
		.product-2 {
			background-color: #fff;
		}
	}
	.work-width {
		width: 23%;

		.work {
			width: 95%;
			padding: 10px;
			border-radius: 12px;
			border: 1px solid #ccc;
			font-size: 14px;
			height: calc(1.9em + 0.75rem + 2px);
			.form-control {
				border: none;
				padding: 0;
				background-color: transparent;
			}
		}
		.programme {
			background-color: #ffff;
		}
	}
	.work {
		border-radius: 50px;
		border: 1px solid #ccc;
	}

	.tax-input {
		width: 95%;
		border-radius: 50px;
		border: 1px solid #ccc;
		font-size: 14px;
		height: calc(1.9em + 0.75rem + 2px);

		.form-control {
			border: none;
			padding: 0;
			background-color: transparent;
		}
	}

	.allowances-input {
		width: 100%;
		padding: 8px 20px;
		border-radius: 50px;
		border: 1px solid #ccc;
		font-size: 14px;
		height: calc(1.9em + 0.75rem + 2px);

		.form-control {
			border: none;
			padding: 0;
			background-color: transparent;
		}
	}
	.hours-width,
	.contractvalue-width {
		width: 22%;
		.hours {
			width: 100%;
			padding: 0;
			border-radius: 12px;
		}
		.contractvalue {
			width: 90%;
			padding: 8px 25px;
			border-radius: 12px;
			background-color: #f6f6f6;
		}
		.contractvalue-1 {
			background-color: #ffff;
		}
		.pieces {
			background-color: #ffff;
		}

		.totalamount {
			width: 95%;
			padding: 8px 10px;
			border-radius: 12px;
			display: flex;
			background-color: #f6f6f6;

			input {
				border: none;
				background: transparent;
			}

			p {
				margin-right: 5px;
			}
		}
		.totalamount-1 {
			background-color: #ffff;
		}
	}
	.totalamount-width {
		width: 17%;
	}

	.share-value {
		width: 20%;

		.work {
			width: 95%;
			border-radius: 50px;
			font-size: 14px;
			height: calc(1.9em + 0.75rem + 2px);

			input {
				border: none;
			}
		}
		.programme {
			background-color: #ffff;
		}
	}
	.totalamount-width {
		width: 17%;
	}

	.down-btn {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12px;
		color: #ffff;
		background-color: #273238;
	}
}
.details-head {
	display: flex;
	align-items: center;
	background-color: #273238;
	padding: 10px 5px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	font-size: 10px;

	.product-no {
		width: 20%;
	}
	.contract-type,
	.contract-value,
	.quantity {
		width: 22%;
	}
	.total-amount {
		width: 17%;
	}
	.actions {
		width: 10%;
	}
	.discription {
		width: 22%;
	}
	.team-member {
		width: 21%;
	}
}

.member-name {
	width: 13%;
}

.role-member {
	width: 10%;
}

.share-value {
	width: 20%;
}

.Tax-value {
	width: 15%;
}

.allowances {
	width: 10%;
}

.payment {
	width: 12%;
}

.email-address {
	width: 17%;
}
.actions {
	width: 10%;
}
.euro-position {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translate(-10px, -50%);
}
.total {
	max-width: 400px;
	background-color: #f9f9f9;
	.total-excl {
		.text-total {
			color: #858a90;
			font-size: 12px;
		}
		.text-prize {
			font-size: 12px;
		}
	}
	.border-top-bottom {
		border-top: 1px solid #dde0e2;
		border-bottom: 4px solid #dde0e2;
		.total-prize {
			color: rgb(255, 75, 87);
		}
	}
}

.first-th {
	width: 40%;
}
.tbl-status {
	.sts-wait {
		background-color: #000;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		color: #fff;
		padding: 10px 20px;
		border-radius: 50px;
	}

	.bottom-header {
		background-color: $coloRed;
		padding: 10px;
		border-radius: 5px;
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
.text-total {
	font-size: 12px;
}
.title-head {
	font-weight: 500;
}

.z-3 {
	z-index: 3;
}

.pph-wrapper,
.red-wrapper {
	height: 100%;
}
.fn16 {
	font-size: 16px;
}
.viewinvoicetable {
	border: 2px solid #000;
	color: #000;
	font-weight: 500;
	font-size: 11px;
}

.table-color {
	.details-head {
		background-color: #3b464c;
	}
}

.page-break {
	page-break-after: always;
}

@page:left {
	margin-top: 5rem !important;
	margin-bottom: 5rem !important;
	margin-left: 5rem !important;
	margin-right: 5rem !important;
}

@page:right {
	margin-top: 5rem !important;
	margin-bottom: 5rem !important;
	margin-left: 5rem !important;
	margin-right: 5rem !important;
}
@media print {
	body {
		padding: 5000px 0;
	}
}

.text-md {
	font-size: px;
	font-weight: 500;
}
.page-break {
	page-break-after: always;
}
</style>
<style lang="scss">
.document__list {
	.data__table .table__data {
		min-height: 400px;
		height: 100%;
	}
}
</style>
