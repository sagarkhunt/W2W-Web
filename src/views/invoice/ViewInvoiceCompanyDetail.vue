<template>
	<div class="document__list card-space container-lg">
		<div class="">
			<div class="row justify-content-center">
				<div class="col-xl-6 col-lg-12 col-md-12 col-12">
					<div class="pph-wrapper">
						<div class="d-flex justify-content-between">
							<div class="logo-fi pb-3">
								<img src="@/assets/images/way2work-logo.png" alt="img" class="img-fluid" />
							</div>
							<div class="d-flex align-items-center justify-content-end mobile-pdf-view " @click="invoicePdf(seekerInvoiceDetail)">
								<button class="btn-common btn-red py-2">{{ t('invoiceList.leInvoice.viewInvoice.pdf') }}</button>
							</div>
						</div>

						<div class="pph-left-box large-table">
							<h5 class="title-head oligona-title">{{ t('fieldList.recipientDetails') }}</h5>
							<div class="pph-left-content">
								<div class="company-content">
									<!-- company name -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.name') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.company_name) || '-' }}
										</p>
									</div>
									<!-- company user name -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.contractName') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.user && seekerInvoiceDetail.invoice_company.user.full_name) || '-' }}
										</p>
									</div>

									<!-- company email -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.email') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.company_email) || '-' }}
										</p>
									</div>

									<!-- company phone -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.phone') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.mobile) || '-' }}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.residence') }}:</p>
										<p class="company-value">
											{{
												seekerInvoiceDetail.invoice_company &&
													seekerInvoiceDetail.invoice_company.countryReference &&
													seekerInvoiceDetail.invoice_company.countryReference.country_name
											}}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.city') }}:</p>
										<p class="company-value">
											{{
												(seekerInvoiceDetail.invoice_company &&
													seekerInvoiceDetail.invoice_company.cityReference &&
													seekerInvoiceDetail.invoice_company.cityReference.city_name) ||
													'-'
											}}
										</p>
									</div>

									<!-- company address -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.address') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.address) || '-' }}
										</p>
									</div>
								</div>

								<div class="company-content">
									<!-- employer Zip code. -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.zip_code) || '-' }}
										</p>
									</div>

									<!-- employer y tunnus -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.reg_number) || '-' }}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.operator_code) || '-' }}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
										<p class="company-value">
											{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.vat_number) || '-' }}
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- responsive data -->
						<div class="attachment-table responsive-table mb-4">
							<h5 class="title-head oligona-title pb-3">{{ t('fieldList.recipientDetails') }}</h5>
							<div>
								<div>
									<div class="d-flex align-items-center justify-content-between collapse-div" @click="openRecipientTable(index, item)">
										<div class="d-flex">
											<div>
												{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.company_name) || '-' }}
											</div>
										</div>
										<div>
											<a>
												<FontAwesomeIcon :icon="arrowDown" v-if="recipientIndex !== index" class="arrowIcon" />
											</a>

											<a>
												<FontAwesomeIcon :icon="arrowUp" v-if="recipientIndex === index" class="arrowIcon" />
											</a>
										</div>
									</div>
								</div>
								<div class="border-padding">
									<div v-if="index == recipientIndex" class="pph-left-box">
										<div class="pph-left-content">
											<div class="company-content">
												<!-- company name -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.name') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.company_name) || '-' }}
													</p>
												</div>

												<!-- company email -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.email') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.company_email) || '-' }}
													</p>
												</div>

												<!-- company phone -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.phone') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.mobile) || '-' }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.residence') }}:</p>
													<p class="company-value">
														{{
															seekerInvoiceDetail.invoice_company &&
																seekerInvoiceDetail.invoice_company.countryReference &&
																seekerInvoiceDetail.invoice_company.countryReference.country_name
														}}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.city') }}:</p>
													<p class="company-value">
														{{
															(seekerInvoiceDetail.invoice_company &&
																seekerInvoiceDetail.invoice_company.cityReference &&
																seekerInvoiceDetail.invoice_company.cityReference.city_name) ||
																'-'
														}}
													</p>
												</div>

												<!-- company address -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.address') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.address) || '-' }}
													</p>
												</div>
											</div>

											<div class="company-content">
												<!-- employer Zip code. -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.zip_code) || '-' }}
													</p>
												</div>

												<!-- employer y tunnus -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.reg_number) || '-' }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.operator_code) || '-' }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
													<p class="company-value">
														{{ (seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.vat_number) || '-' }}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xl-6 col-md-12 col-12">
					<div class="red-wrapper">
						<div class="pb-4 d-flex justify-content-between">
							<h3 class="title-head">
								{{ seekerInvoiceDetail.seeker && seekerInvoiceDetail.seeker.user && seekerInvoiceDetail.seeker.user.full_name }} {{ t('invoiceList.leInvoice.viewInvoice.invoice') }}
							</h3>
							<div class="d-flex align-items-center justify-content-end desktop-view" @click="invoicePdf(seekerInvoiceDetail)">
								<button class="btn-common btn-red py-2">{{ t('invoiceList.leInvoice.viewInvoice.pdf') }}</button>
							</div>
						</div>

						<div class="red-box">
							<div class="d-flex justify-content-between">
								<div class="mb-2">
									<p class="title-lg">{{ t('invoiceList.invoiceDate') }}</p>
									<p class="text-md-fw ">
										{{ dateFormat(seekerInvoiceDetail.created_at) }}
									</p>
								</div>

								<div v-if="seekerInvoiceDetail.req_mark_as_wrong">
									<div class="tbl-status">
										<span class="sts-wait d-flex align-items-center justify-content-center">
											<p>{{ t('jobSeekerTeam.pending') }}</p>
										</span>
									</div>
								</div>

								<div v-if="seekerInvoiceDetail.mark_as_wrong">
									<div class="tbl-status">
										<span class="sts-wait d-flex align-items-center justify-content-center">
											<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
										</span>
									</div>
								</div>
							</div>

							<div class="mb-2">
								<h5 class="title-lg">{{ t('fieldList.invoice_number') }}</h5>
								<p class="text-md-fw">
									{{ seekerInvoiceDetail.invoice_number }}
								</p>
							</div>

							<div class="mb-2">
								<h5 class="title-lg">{{ t('fieldList.reference_number') }}</h5>
								<p class="text-md-fw">
									{{ seekerInvoiceDetail?.ref_number || '-' }}
								</p>
							</div>

							<div class="mb-2">
								<h5 class="title-lg">{{ t('fieldList.due_date') }}</h5>
								<p class="text-md-fw">
									{{ dateFormat(seekerInvoiceDetail.due_date || '-') }}
								</p>
							</div>

							<div class="mb-2">
								<h5 class="title-lg">
									{{ t('invoiceList.leInvoice.viewInvoice.latePaymentinterest') }}
								</h5>
								<p class="text-md-fw">{{ seekerInvoiceDetail?.panelty_interest || 0 }}%</p>
							</div>

							<div class="mb-2" v-if="seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.reg_number">
								<h5 class="title-lg">{{ t('invoiceList.leInvoice.viewInvoice.companyID') }}</h5>
								<p class="text-md-fw">
									{{ seekerInvoiceDetail.invoice_company && seekerInvoiceDetail.invoice_company.reg_number }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="seekerInvoiceDetail.under_review">
				<div class="pph-left mb-3">
					<h5 class="title-lg">{{ t('invoiceList.leInvoice.viewInvoice.revisionNote') }}</h5>
				</div>

				<div class="bottom-header d-flex align-items-center justify-content-between mb-4">
					<div class="d-flex align-items-center">
						<p class="text-white">{{ seekerInvoiceDetail.admin_revision_note ?? '' }}</p>
					</div>
				</div>
			</div>

			<div class="mt-4">
				<div class="mb-3">
					<h5 class="title-head">{{ t('workDetails.workDetails') }}</h5>
				</div>
				<div class="list_width">
					<new-data-table :data="seekerInvoiceDetail.worked_hours || []" sst class="large-table">
						<template #thead>
							<new-tb-th class="w-30">{{ t('invoiceList.leInvoice.viewInvoice.invoiceDetails') }}</new-tb-th>
							<new-tb-th>{{ t('fieldList.date') }}</new-tb-th>
							<new-tb-th>{{ t('workDetails.value') }}</new-tb-th>
							<new-tb-th>{{ t('workDetails.quantity') }}</new-tb-th>
							<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}%</new-tb-th>
							<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.noVat') }}</new-tb-th>
							<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}</new-tb-th>
							<new-tb-th>{{ t('workDetails.total') }}</new-tb-th>
						</template>

						<template #data="scopedData" ref="tableBody">
							<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
								<new-tb-td>{{ tr.description || '-' }}</new-tb-td>

								<new-tb-td>{{ (tr.date && dateFormat(tr.date)) || '-' }}</new-tb-td>

								<new-tb-td>€ {{ seekerInvoiceDetail.mark_as_wrong ? -tr.contract_value : tr.contract_value || '-' }}</new-tb-td>

								<new-tb-td>{{ seekerInvoiceDetail.mark_as_wrong ? -tr.total_work : tr.total_work || '-' }}</new-tb-td>

								<new-tb-td>{{ seekerInvoiceDetail.mark_as_wrong ? -seekerInvoiceDetail.vat : seekerInvoiceDetail.vat || '-' }}</new-tb-td>

								<new-tb-td>€ {{ seekerInvoiceDetail.mark_as_wrong ? -(tr.contract_value * tr.total_work).toFixed(2) : (tr.contract_value * tr.total_work).toFixed(2) }}</new-tb-td>

								<new-tb-td
									>€
									{{
										seekerInvoiceDetail.mark_as_wrong
											? -((tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
											: ((tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
									}}</new-tb-td
								>
								<new-tb-td
									>€
									{{
										seekerInvoiceDetail.mark_as_wrong
											? -(tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
											: (tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
									}}</new-tb-td
								>
							</new-tb-tr>
						</template>
					</new-data-table>
				</div>
				<div class="min_width_auto">
					<new-data-table :data="seekerInvoiceDetail.worked_hours || []" sst class="responsive-table mt-4">
						<template #data="scopedData" ref="tableBody">
							<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
									<div class="d-flex">
										<div>
											<div>
												{{ tr.description || '-' }}
											</div>
											<div class="d-flex">
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
											<new-tb-th>{{ t('fieldList.date') }}</new-tb-th>
											<new-tb-td>{{ (tr.date && dateFormat(tr.date)) || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('workDetails.value') }}</new-tb-th>
											<new-tb-td>€ {{ seekerInvoiceDetail.mark_as_wrong ? -tr.contract_value : tr.contract_value || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('workDetails.quantity') }}</new-tb-th>
											<new-tb-td>{{ seekerInvoiceDetail.mark_as_wrong ? -tr.total_work : tr.total_work || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}%</new-tb-th>
											<new-tb-td>{{ seekerInvoiceDetail.mark_as_wrong ? -seekerInvoiceDetail.vat : seekerInvoiceDetail.vat || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.noVat') }}</new-tb-th>
											<new-tb-td
												>€ {{ seekerInvoiceDetail.mark_as_wrong ? -(tr.contract_value * tr.total_work).toFixed(2) : (tr.contract_value * tr.total_work).toFixed(2) }}</new-tb-td
											>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}</new-tb-th>
											<new-tb-td
												>€
												{{
													seekerInvoiceDetail.mark_as_wrong
														? -((tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
														: ((tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
												}}</new-tb-td
											>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('workDetails.total') }}</new-tb-th>
											<new-tb-td
												>€
												{{
													seekerInvoiceDetail.mark_as_wrong
														? -(tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2)
														: (tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * seekerInvoiceDetail.vat) / 100).toFixed(2) || '-'
												}}
											</new-tb-td>
										</new-tb-tr>
									</div>
								</div>
							</new-tb-tr>
						</template>
					</new-data-table>
				</div>

				<div class="bottom-header d-md-flex d-block align-items-center justify-content-between mb-4 gap-5">
					<div class="save-icon">
						<img src="@/assets/images/save-icon.png" class="img-fluid" alt="err" />
					</div>
					<div class="d-sm-flex align-items-center ml-md-auto gap-4">
						<div class="text-white mb-sm-0 mb-2">
							<p class="text-md-fw">{{ t('invoiceList.leInvoice.addInvoice.invoiceTotal') }}</p>
							<p class="text-md-fw">
								€
								{{
									seekerInvoiceDetail.mark_as_wrong
										? -(seekerInvoiceDetail.company_pay_amount && seekerInvoiceDetail.company_pay_amount.toFixed(2))
										: (seekerInvoiceDetail.company_pay_amount && seekerInvoiceDetail.company_pay_amount.toFixed(2)) || 0.0
								}}
							</p>
						</div>

						<div class="text-white mb-sm-0 mb-2">
							<p class="text-md-fw">{{ t('invoiceList.leInvoice.addInvoice.VATAmount') }}</p>
							<p class="text-md-fw">
								€
								{{
									seekerInvoiceDetail.mark_as_wrong
										? -(seekerInvoiceDetail.vat_amount && seekerInvoiceDetail.vat_amount.toFixed(2))
										: (seekerInvoiceDetail.vat_amount && seekerInvoiceDetail.vat_amount.toFixed(2)) || '-'
								}}
							</p>
						</div>
					</div>
				</div>

				<div class="pph-left mb-3">
					<h5 class="title-head">{{ t('invoiceList.invoiceData.attachmentsList') }}</h5>
				</div>
				<div class="list_width">
					<new-data-table :data="seekerInvoiceDetail.invoice_files || []" sst class="large-table">
						<template #thead>
							<new-tb-th class="w-30">{{ t('invoiceList.leInvoice.viewInvoice.placeOfPurchase') }}</new-tb-th>
							<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.dateOfPurchase') }}</new-tb-th>
							<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
						</template>

						<template #data="scopedData" ref="tableBody">
							<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
								<new-tb-td>{{ tr.purchase_place || '-' }}</new-tb-td>
								<new-tb-td>{{ dateFormat(tr.purchase_date) }}</new-tb-td>
								<new-tb-td>
									<div class="d-flex align-items-center justify-content-end">
										<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
											<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
										</button>
									</div>
								</new-tb-td>
							</new-tb-tr>
						</template>
					</new-data-table>
				</div>
				<div class="min_width_auto">
					<new-data-table :data="seekerInvoiceDetail.invoice_files || []" sst class="attachment-table responsive-table mt-4">
						<template #data="scopedData" ref="tableBody">
							<new-tb-tr class="invoice__row expand-table " :key="i" v-for="(tr, i) in scopedData.data">
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openSeekerTable(i, item)">
									<div class="d-flex">
										<div>
											<div>
												{{ dateFormat(tr.purchase_date) }}
											</div>
											<div class="d-flex">
												<div>
													{{ t('invoiceList.leInvoice.viewInvoice.dateOfStartTime') }}
												</div>
											</div>
										</div>
									</div>

									<div>
										<a>
											<FontAwesomeIcon :icon="arrowDown" v-if="newTableIndex !== i" class="arrowIcon" />
										</a>

										<a>
											<FontAwesomeIcon :icon="arrowUp" v-if="newTableIndex === i" class="arrowIcon" />
										</a>
									</div>
								</div>

								<div class="border-padding">
									<div v-if="i == newTableIndex" class="table-border">
										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.placeOfPurchase') }}</new-tb-th>
											<new-tb-td>{{ tr.purchase_place || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.dateOfPurchase') }}</new-tb-th>
											<new-tb-td>{{ dateFormat(tr.purchase_date) }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
											<new-tb-td>
												<div class="d-flex align-items-center justify-content-start">
													<ToolTip title="View Attachment">
														<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
															<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
														</button>
													</ToolTip>
												</div>
											</new-tb-td>
										</new-tb-tr>
									</div>
								</div>
							</new-tb-tr>
						</template>
					</new-data-table>
				</div>
			</div>

			<div class="position-relative">
				<div class="overflow-auto" :class="!seekerInvoiceDetail.approved ? 'blur-overlay' : 'no-blur-overlay'">
					<h4 class="text-center mt-5"></h4>

					<div class="viewinvoicetable">
						<div class="d-flex">
							<div style="  border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2 text-start width-13">
								<p>
									{{ t('invoiceList.leInvoice.viewInvoice.saajan_tilinumero') }}
								</p>
								<p>{{ t('invoiceList.leInvoice.viewInvoice.recipient_bank_number') }}</p>
							</div>
							<div style="width:33%; border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2">
								<p>{{ t('invoiceList.leInvoice.viewInvoice.iban') }}</p>
								<p class="ml-2">{{ seekerInvoiceDetail.iban }}</p>
							</div>
							<div style="width:55%; border-bottom:2px solid #000;" class="p-2">
								<p>{{ t('invoiceList.leInvoice.viewInvoice.bic') }}</p>
								<p class="ml-2">{{ t('invoiceList.leInvoice.viewInvoice.bank_bic') }} : {{ seekerInvoiceDetail.bic }}</p>
							</div>
						</div>

						<div class="d-flex">
							<div style=" height: 223px; border-right:2px solid #000;" class="p-2 width-13">
								<div class="ml-auto text-start">
									{{ t('invoiceList.leInvoice.viewInvoice.maksajan_nimi') }}
								</div>
								<div class="text-start">
									{{ t('invoiceList.leInvoice.viewInvoice.payer_name') }}
								</div>
							</div>

							<div class="d-flex flex-column justify-content-between p-2  " style="width:33%; border-right:2px solid #000;">
								<div class="p-2">
									<p>
										{{ (seekerInvoiceDetail.seeker && seekerInvoiceDetail.seeker.user && seekerInvoiceDetail.seeker.user.full_name) || '-' }}
									</p>
								</div>
							</div>

							<div style="width:55%;" class="d-flex align-items-end">
								<div style="width:100%;border-top:2px solid #000;" class="d-flex">
									<div class="p-2 width_ref">
										{{ t('invoiceList.leInvoice.viewInvoice.vitenumero_reference_number') }}
									</div>
								</div>
							</div>
						</div>

						<div style="border-top:2px solid #000;">
							<div class="d-flex">
								<div class="p-2 text-end width-13" style="  border-right:2px solid #000; border-bottom:2px solid #000;"></div>
								<div class="p-2  " style=" width:33%;border-right:2px solid #000; border-bottom:2px solid #000;"></div>
								<div class="p-2 d-flex" style="width:55%;border-bottom:2px solid #000;">
									<div class="d-flex width-44">
										<div style="width:37%;">
											{{ t('invoiceList.leInvoice.viewInvoice.erapaiva_due_date') }}
										</div>
										<div class="d-flex align-items-center ml-3">
											{{ dateFormat(seekerInvoiceDetail.due_date) }}
										</div>
									</div>
									<div class="p-2 d-flex" style="width:50%; ">
										<div style="width:13%;" class="me-2">{{ t('invoiceList.leInvoice.viewInvoice.euro') }}</div>
										<div class="d-flex  align-items-center">
											€
											{{
												seekerInvoiceDetail.mark_as_wrong
													? -(seekerInvoiceDetail.sub_total && seekerInvoiceDetail.sub_total.toFixed(2))
													: seekerInvoiceDetail.sub_total && seekerInvoiceDetail.sub_total.toFixed(2)
											}}
										</div>
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

				<div class="go__back position-absolute top-50 start-50 translate-middle shadow" v-if="!seekerInvoiceDetail.approved">
					<router-link to="/invoices">
						<a class="banner-back d-inline-block">
							<div class="d-flex align-items-center">
								<div class="back-icon d-flex align-items-center justify-content-center text-light">
									<FontAwesomeIcon :icon="leftArrowIcon" />
								</div>
								<div class="back-text">
									<span class="ml-2 mr-5">
										{{ t('common.back') }}
									</span>
								</div>
							</div>
						</a>
					</router-link>
				</div>
			</div>
		</div>
	</div>
	<Suspense v-if="showDocumentImageModal.value">
		<template #default>
			<open-image-modal v-model:isModalShow="showDocumentImageModal" :imageLink="imageLink" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
	<div id="invoicePdf-container"></div>
</template>

<script>
import { computed, createApp, ref } from 'vue';
import { useStore } from 'vuex';
import { defineAsyncComponent, onMounted, watch } from '@vue/runtime-core';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faEdit, faInfo, faLongArrowAltLeft, faLongArrowAltRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { useI18n } from 'vue-i18n';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import InvoiceViewPdf from '@/views/pdf/InvoiceViewPdf.vue';
import vueStore from '@/store'; // store
import { i18n } from '@/helpers/I18n'; // i18n
import NewDataTable from '@/components/dataTable/newIndex';
import Pagination from '@/components/pagination'; // pagination
const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'ViewSeekerInvoiceDetail',

	components: {
		FontAwesomeIcon,
		OpenImageModal,
		DefaultLoader,
	},

	setup() {
		//ref
		const totalTime = ref(null);
		const totalKillometer = ref(null);
		const totalCompensation = ref(null);
		const totalWorkhours = ref(null);
		const totalMealBenefits = ref(null);
		const totalFullPerDiem = ref(null);
		const totalOtherBenefits = ref(null);
		const totalPayoutAmount = ref(null);
		const totalNoVatAmount = ref(null);
		const totalVatAmount = ref(null);
		const totalWorkAmount = ref(null);
		const finalTotal = ref(null);
		const days = ref(null);
		const tableIndex = ref(0);
		const newTableIndex = ref(0);
		const recipientIndex = ref(0);
		const index = ref(0);

		// gloal store
		const store = useStore();
		// global route
		const route = useRoute();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('invoiceList.viewInvoice')} - Way2Work`;

		// icons
		const infoIcon = faInfo;
		const editIcon = faEdit;
		const leftArrowIcon = faLongArrowAltLeft;
		const rightArrowIcon = faLongArrowAltRight;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const viewIcon = faEye;
		const isDocImgModal = ref(false);
		const imageLink = ref(null);

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('invoice/viewCompanyInvoice', route.params.id);
		});

		/**
		 * computed Properties
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

		const seekerInvoiceDetail = computed(() => store.getters['invoice/getInvoiceCompanyDetails']);

		// view document
		const viewSeekerDocument = link => {
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

		//download invoice pdf
		const invoicePdf = singleInformationInvoiceData => {
			const ap = document.querySelector('#mount-node');
			if (ap) {
				ap.remove();
			}
			const elem = document.querySelector('#invoicePdf-container');
			const mounteNode = document.createElement('div');
			mounteNode.id = 'mount-node';
			elem.append(mounteNode);

			createApp(InvoiceViewPdf, { singleInformationInvoice: singleInformationInvoiceData })
				.use(vueStore)
				.use(i18n)
				.use(NewDataTable)
				.use(Pagination)
				.mount('#mount-node');
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(seekerInvoiceDetail, () => {
			let currentDate = new Date();
			let d1 = moment(currentDate).format('YYYY-MM-DD');
			let d2 = moment(seekerInvoiceDetail.value.due_date);
			let vatValue = seekerInvoiceDetail.value.vat;

			days.value = d2.diff(d1, 'days');
			seekerInvoiceDetail.value.worked_hours.forEach(element => {
				if (element.trip_start_time && element.trip_end_time) {
					let startTime = moment(element.trip_start_time, 'HH:mm:ss a');
					let endTime = moment(element.trip_end_time, 'HH:mm:ss a');
					let duration = moment.duration(endTime.diff(startTime));
					totalTime.value += parseInt(duration.asHours());
				} else {
					totalTime.value = '0';
				}
				totalKillometer.value += element.distance ?? 0;
				totalCompensation.value += element.distance * element.per_km_amount;
				totalWorkhours.value += element.total_work ?? 0;
				totalMealBenefits.value += element.lunch_compensation ?? 0;
				totalFullPerDiem.value += element.day_compensation ?? 0;
				totalOtherBenefits.value += element.other_compensation ?? 0;
				totalPayoutAmount.value += element.total_work * element.contract_value ?? 0;
				totalNoVatAmount.value += element.contract_value - (element.contract_value * vatValue) / 100;
				totalVatAmount.value += (element.contract_value * vatValue) / 100;
				totalWorkAmount.value += element.contract_value;
			});
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// table open
		const openSeekerTable = index => {
			if (newTableIndex.value === index) {
				newTableIndex.value = null;
				return;
			}
			newTableIndex.value = index;
		};

		// table open
		const openRecipientTable = index => {
			if (recipientIndex.value === index) {
				recipientIndex.value = null;
				return;
			}
			recipientIndex.value = index;
		};

		return {
			//ref
			t,
			dateFormat,
			currencyConverture,
			days,
			totalTime,
			totalKillometer,
			totalCompensation,
			totalWorkhours,
			totalMealBenefits,
			totalFullPerDiem,
			totalOtherBenefits,
			totalPayoutAmount,
			tableIndex,
			index,
			newTableIndex,
			recipientIndex,
			totalNoVatAmount,
			totalVatAmount,
			totalWorkAmount,

			//computed
			seekerInvoiceDetail,
			finalTotal,
			showDocumentImageModal,
			isDocImgModal,
			imageLink,

			// icons/
			infoIcon,
			editIcon,
			leftArrowIcon,
			rightArrowIcon,
			arrowDown,
			arrowUp,
			viewIcon,

			// methods
			openTable,
			openSeekerTable,
			openRecipientTable,
			viewSeekerDocument,
			invoicePdf,
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
	.expand-table {
		th {
			width: 8%;
		}
	}
	.logo-fi {
		max-width: 200px;
		width: 100%;
	}

	.mobile-pdf-view {
		display: none !important;

		@media (max-width: 1200px) {
			display: block !important;
		}
	}

	.arrow-width {
		img {
			width: 50px;
		}
	}

	.grey-box {
		background-color: #f6f6f6;
		border-radius: 20px;

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
	top: 20px;
	left: 0;
	width: 90%;
	height: 75%;
	font-size: 14px;
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

	@media (max-width: 1024px) {
		max-width: 200px;
	}
}

.save-icon {
	max-width: 50px;
	width: 100%;

	@media (max-width: 576px) {
		display: none;
	}
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
		th {
			border-right: transparent;
		}

		td {
			border-right: transparent;
			padding: 10px;
		}
	}
}

.pph-left-box {
	padding: 19px;
	border-radius: 20px;
	background-color: #f9f9f9;
	overflow: hidden;
	box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
	height: calc(100% - 61px);

	.company-content {
		padding: 10px 0;

		.company-text {
			display: flex;
			margin-bottom: 5px;

			.company-titel {
				max-width: 160px;
				width: 100%;
				font-size: 14px;
				font-weight: 500;
				color: #858a90;
			}

			@media (max-width: 576px) {
				display: block;
			}
		}

		.company-value {
			font-size: 14px;
			margin-bottom: 5px;
			font-weight: 500;
			min-width: 320px;
		}
	}

	.company-sub-content {
		padding: 19px;
		border-radius: 20px;
		background-color: #f2f2f2;
	}
}

.expand-table {
	border-bottom: 10px solid #fff;

	th {
		width: 19%;
	}
}

.tbl-status {
	.sts-wait {
		background-color: #000;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		color: #fff;
		padding: 10px 20px;
		border-radius: 50px;
	}
}

.title-lg {
	font-size: 16px;
}

.text-md-fw {
	font-size: 16px;
	font-weight: 400;
}

.title-head {
	font-size: 26px;
	font-weight: 600;
}

.pph-wrapper,
.red-wrapper {
	height: 100%;
}

.viewinvoicetable {
	border: 2px solid #000;
	width: 100%;
	@media (max-width: 1024px) {
		min-width: 1254px;
	}
	.width-13 {
		width: 16%;
		@media (max-width: 1440px) {
			width: 24%;
		}
	}
	.width-44 {
		width: 36%;
		@media (max-width: 1440px) {
			width: 44%;
		}
	}
	.width_ref {
		width: 25%;
		@media (max-width: 1440px) {
			width: 37%;
		}
		@media (max-width: 1024px) {
			width: 30%;
		}
	}
}

.desktop-view {
	display: block !important;

	@media (max-width: 1200px) {
		display: none !important;
	}
}
</style>
<style lang="scss">
.min_width_auto {
	.data__table .table__data {
		min-height: auto !important;
	}
}
.list_width {
	.data__table .table__data {
		min-height: 400px;
		height: 100%;
	}
}
</style>
