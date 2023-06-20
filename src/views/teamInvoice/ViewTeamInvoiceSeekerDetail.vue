<template>
	<div class="document__list card-space container-lg pt-4">
		<div class="">
			<div class="row justify-content-center mb-xl-4 mb-sm-0 mb-4">
				<div class="col-xl-6 col-lg-12 col-md-12 col-12 mb-xl-0 mb-3">
					<div class="pph-wrapper">
						<div class="d-flex justify-content-between">
							<div class="logo-fi pb-3">
								<img src="@/assets/images/way2work-logo.png" alt="img" class="img-fluid" />
							</div>
							<div class="d-flex align-items-center justify-content-end mobile-pdf-view" @click="teamInvoicePdf(seekerTeamInvoiceDetail)">
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
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.company_name }}
										</p>
									</div>

									<!-- contact name -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.contractName') }}:</p>
										<p class="company-value">
											{{
												seekerTeamInvoiceDetail.team_invoice_company &&
													seekerTeamInvoiceDetail.team_invoice_company.user &&
													seekerTeamInvoiceDetail.team_invoice_company.user.full_name
											}}
										</p>
									</div>

									<!-- company email -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.email') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.company_email }}
										</p>
									</div>

									<!-- company phone -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.phone') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.mobile }}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.country') }}:</p>
										<p class="company-value">
											{{
												seekerTeamInvoiceDetail.team_invoice_company &&
													seekerTeamInvoiceDetail.team_invoice_company.countryReference &&
													seekerTeamInvoiceDetail.team_invoice_company.countryReference.country_name
											}}
										</p>
									</div>

									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.city') }}:</p>
										<p class="company-value">
											{{
												seekerTeamInvoiceDetail.team_invoice_company &&
													seekerTeamInvoiceDetail.team_invoice_company.cityReference &&
													seekerTeamInvoiceDetail.team_invoice_company.cityReference.city_name
											}}
										</p>
									</div>

									<!-- company address -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.address') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.address }}
										</p>
									</div>
								</div>

								<div class="company-content">
									<!-- employer ssn -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.zip_code }}
										</p>
									</div>

									<!-- employer y tunnus -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.reg_number }}
										</p>
									</div>

									<!-- Operator code no. -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.operator_code }}
										</p>
									</div>

									<!-- Vat no. -->
									<div class="company-text">
										<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
										<p class="company-value">
											{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.vat_number }}
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
												{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.company_name }}
											</div>
										</div>
										<div>
											<a>
												<FontAwesomeIcon :icon="arrowDown" v-if="recipientIndex !== index" class="arrowIcon" />
											</a>

											<a>
												<FontAwesomeIcon :icon="arrowUp" v-if="recipientIndex == index" class="arrowIcon" />
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
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.company_name }}
													</p>
												</div>

												<!-- company email -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.email') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.company_email }}
													</p>
												</div>

												<!-- company phone -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.phone') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.mobile }}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.country') }}:</p>
													<p class="company-value">
														{{
															seekerTeamInvoiceDetail.team_invoice_company &&
																seekerTeamInvoiceDetail.team_invoice_company.countryReference &&
																seekerTeamInvoiceDetail.team_invoice_company.countryReference.country_name
														}}
													</p>
												</div>

												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.city') }}:</p>
													<p class="company-value">
														{{
															seekerTeamInvoiceDetail.team_invoice_company &&
																seekerTeamInvoiceDetail.team_invoice_company.cityReference &&
																seekerTeamInvoiceDetail.team_invoice_company.cityReference.city_name
														}}
													</p>
												</div>

												<!-- company address -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.address') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.address }}
													</p>
												</div>
											</div>

											<div class="company-content">
												<!-- employer ssn -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.zip_code }}
													</p>
												</div>

												<!-- employer y tunnus -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.reg_number }}
													</p>
												</div>

												<!-- Operator code no. -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.operator_code }}
													</p>
												</div>

												<!-- Vat no. -->
												<div class="company-text">
													<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
													<p class="company-value">
														{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.vat_number }}
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

				<div class="col-xl-6 col-md-12 col-12 mb-xl-0 mb-3">
					<div class="red-wrapper">
						<div class="pb-3 d-flex justify-content-between">
							<h5 class="title-head">
								{{
									seekerTeamInvoiceDetail.created_by &&
										seekerTeamInvoiceDetail.created_by.seeker &&
										seekerTeamInvoiceDetail.created_by.seeker.user &&
										seekerTeamInvoiceDetail.created_by.seeker.user.full_name
								}}
								{{ t('invoiceList.leInvoice.viewInvoice.invoice') }}
							</h5>
							<div class="d-flex align-items-center justify-content-end desktop-view" @click="teamInvoicePdf(seekerTeamInvoiceDetail)">
								<button class="btn-common btn-red py-2">{{ t('invoiceList.leInvoice.viewInvoice.pdf') }}</button>
							</div>
						</div>

						<div class="red-box">
							<div class="d-flex justify-content-between">
								<div class="mb-2">
									<h5 class="title-lg">{{ t('fieldList.invoice_date') }}</h5>
									<p class="text-md-fw ">
										{{ dateFormat(seekerTeamInvoiceDetail.created_at) }}
									</p>
								</div>

								<div v-if="seekerTeamInvoiceDetail.mark_as_wrong">
									<div class="tbl-status">
										<span class="sts-wait d-flex align-items-center justify-content-center">
											<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
										</span>
									</div>
								</div>
							</div>

							<div class="mb-2">
								<p class="company-value title-lg">{{ t('fieldList.invoice_number') }}</p>
								<p class="text-md-fw">
									{{ seekerTeamInvoiceDetail.invoice_number }}
								</p>
							</div>

							<div class="mb-2">
								<p class="company-value title-lg">{{ t('fieldList.reference_number') }}</p>
								<p class="text-md-fw">
									{{ seekerTeamInvoiceDetail.ref_number }}
								</p>
							</div>

							<div class="mb-2">
								<p class="company-value title-lg">{{ t('fieldList.due_date') }}</p>
								<p class="text-md-fw">
									{{ dateFormat(seekerTeamInvoiceDetail.due_date) }}
								</p>
							</div>

							<div class="mb-2">
								<p class="company-value title-lg">
									{{ t('invoiceList.leInvoice.viewInvoice.latePaymentinterest') }}
								</p>
								<p class="text-md-fw">
									{{ seekerTeamInvoiceDetail.panelty_interest }}
								</p>
							</div>

							<div class="mb-2" v-if="seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.reg_number">
								<p class="company-value title-lg">{{ t('invoiceList.leInvoice.viewInvoice.companyID') }}</p>
								<p class="text-md-fw">
									{{ seekerTeamInvoiceDetail.team_invoice_company && seekerTeamInvoiceDetail.team_invoice_company.reg_number }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="bg-white pb-3 mt-10">
					<div class="employer-details flex justify-between items-center">
						<div class="pph-left">
							<h3 class="font-semibold">{{ t('invoiceList.leInvoice.viewInvoice.seekerWHList') }}</h3>
						</div>
					</div>
					<div class="list_width">
						<div class="daily-Work-Details bg-white large-table">
							<div class="daily-work-row pt-3">
								<div class="daily-work-col">
									<!-- paymentsharing head -->
									<div class="details-head text-center flex items-center text-white">
										<div class="member-name">
											<p class="details-head-text text-start font-bold">{{ t('invoiceList.leInvoice.viewInvoice.seekerName') }}</p>
										</div>

										<div class="role-member">
											<p class="details-head-text font-bold">{{ t('invoiceList.Role') }}</p>
										</div>

										<div class="email-address">
											<p class="details-head-text font-bold">{{ t('invoiceList.emailAddress') }}</p>
										</div>

										<div class="share-value">
											<p class="details-head-text font-bold">{{ t('invoiceList.Share') }}</p>
										</div>

										<div class="Tax-value">
											<p class="details-head-text font-bold">{{ t('invoiceList.leInvoice.viewInvoice.taxPercentage') }}</p>
										</div>

										<div class="allowances">
											<p class="details-head-text font-bold">{{ t('invoiceList.Allowances') }}</p>
										</div>
										<div class="payment">
											<p class="details-head-text font-bold">{{ t('invoiceList.willBePaid') }}</p>
										</div>
										<div class="actions">
											<p class="details-head-text font-bold">{{ t('invoiceList.Actions') }}</p>
										</div>
									</div>

									<!-- paymentsharing list - row -->
									<div v-for="(item, index) in seekerTeamInvoiceDetail.invoice_seekers || []" :key="index">
										<div class="details-content text-center" v-if="[seekerTeamInvoiceDetail?.created_by?.seeker?.id, item.seeker.id].includes(userDetail?.jobSeeker?.id)">
											<div class="member-name text-left">
												<div class="flex items-center">
													<p class="ml-2">{{ item.seeker.user.full_name }}</p>
												</div>
											</div>

											<div class="role-member">
												<div class="w-20 h-20 mx-auto">
													<img
														:title="seekerTeamInvoiceDetail?.created_by?.seeker?.id === item.seeker?.id ? 'Leader' : 'Member'"
														:src="require(`@/assets/images/${seekerTeamInvoiceDetail?.created_by?.seeker?.id === item.seeker?.id ? 'leader-icon.svg' : 'member-icon.svg'}`)"
														class="w-100 h-100"
														alt="err"
													/>
												</div>
											</div>

											<div class="email-address text-start">
												<div>
													<p class="text-break">{{ item?.seeker?.user?.email }}</p>
												</div>
											</div>

											<div class="share-value ml-xl-0 ml-3">
												<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item?.shared_amount.toFixed(2)) : item?.shared_amount.toFixed(2) }}</p>
											</div>

											<div class="Tax-value">
												<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item?.tax) : item?.tax }}%</p>
											</div>

											<div class="allowances">
												<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? - (item?.compensation_amount.toFixed(2)) : item?.compensation_amount.toFixed(2) }}</p>
											</div>

											<div class="payment">
												<div>
													<p class="text-red">€ {{seekerTeamInvoiceDetail.mark_as_wrong ? -Number(item.seeker_company_pay).toFixed(2) : Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
												</div>
											</div>
											<div class="actions d-flex justify-content-center align-items-center">
												<!-- expand work detail -->
												<div class="down-btn" v-if="index !== expandRowIndex" @click="expandWorkDetails(index)">
													<FontAwesomeIcon :icon="downIcon" />
												</div>

												<!-- expand work detail -->
												<div class="down-btn" v-if="index === expandRowIndex" @click="expandWorkDetails(index)">
													<FontAwesomeIcon :icon="upIcon" />
												</div>
											</div>
										</div>

										<!-- paymentsharing row expand -->
										<div class="opne-toggle p-3" v-if="index === expandRowIndex">
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
															<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value) : itemRaw.contract_value || '-' }}</p>
														</div>

														<!-- contract type -->
														<div class="hours-width me-2 text-center">
															<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.total_work) : itemRaw.total_work || '-' }}</p>
														</div>
														<!-- vat % -->
														<div class="hours-width me-2 text-center">
															<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(seekerTeamInvoiceDetail.vat) : seekerTeamInvoiceDetail.vat || '-' }}</p>
														</div>
														<!-- no vat -->
														<div class="hours-width me-2 text-center">
															<p>€{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work) : itemRaw.contract_value * itemRaw.total_work || '-' }}</p>
														</div>
														<!-- vat -->
														<div class="hours-width me-2 text-center">
															<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -((itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100) :(itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100 }}</p>
														</div>
														<!-- contract value -->
														<div class="contractvalue-width text-center">
															<p>
																€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work + (itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100) :itemRaw.contract_value * itemRaw.total_work + (itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100 }}
															</p>
														</div>
													</div>
												</div>
											</div>
											<div class="ml-auto total mt-3 mr-3">
												<div>
													<div class="total-excl d-flex justify-content-between w-full pb-2">
														<p class="text-total">{{ t('invoiceList.leInvoice.viewInvoice.totalExclVat') }}</p>
														<p class="text-prize text-black font-semibold">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.tax) : item.tax || 0 }}</p>
													</div>
													<div class="total-excl d-flex justify-content-between w-full pb-2">
														<p class="text-total">{{ t('workDetails.totalCompensation') }}</p>
														<p class="text-prize text-black font-semibold">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.compensation_amount.toFixed(2)) : item.compensation_amount.toFixed(2) || 0 }}</p>
													</div>
													<div class="total-excl border-top-bottom d-flex justify-content-between font-semibold text-right text-lg py-2">
														<p class="all-total text-black">{{ t('workDetails.total') }}</p>
														<p class="total-prize">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.sub_total.toFixed(2)) : item.sub_total.toFixed(2) || '0' }}</p>
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
															<p class="text-md-fw">{{ t('invoiceList.leInvoice.addInvoice.grossAmount') }}</p>
															<p class="text-md-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0) : item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0 }}</p>
														</div>

														<div class="mr-5 text-white">
															<p class="text-md-fw">{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}</p>
															<p class="text-md-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0) : item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0 }}</p>
														</div>

														<div class="mr-5 text-white">
															<p class="text-md-fw">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
															<p class="text-md-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(Number(item.compensation_amount).toFixed(2)) : Number(item.compensation_amount).toFixed(2) || 0 }}</p>
														</div>

														<div class="text-white">
															<p class="{{'text-md-fw'|translate}}">{{ t('invoiceList.leInvoice.addInvoice.willpaid') }}</p>
															<p class="text-md-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? - Number(item.seeker_company_pay).toFixed(2) : Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
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

					<!-- responsive table -->
					<div class="min_width_auto">
						<div class="attachment-table responsive-table">
							<new-data-table sst :data="seekerTeamInvoiceDetail.invoice_seekers || []">
								<template #data="scopedData" ref="tablebody">
									<new-tb-tr class="invoice__row expand-table  " v-for="(item, index) in scopedData.data" :key="index">
										<div>
											<div class="d-flex align-items-center justify-content-between collapse-div" @click="openSeekerTable(index, tMem)">
												<div class="d-flex">
													<div>
														<div>
															{{ dateFormat(item.created_at) || '-' }}
														</div>
														<div>
															{{ item.seeker.user.full_name || '-' }}
														</div>
													</div>
												</div>

												<div>
													<a>
														<FontAwesomeIcon :icon="arrowDown" v-if="seekerIndex !== index" class="arrowIcon" />
													</a>

													<a>
														<FontAwesomeIcon :icon="arrowUp" v-if="seekerIndex === index" class="arrowIcon" />
													</a>
												</div>
											</div>
											<div class="border-padding">
												<div v-if="index == seekerIndex" class="table-border">
													<div class="payment_table">
														<new-tb-tr class="top_border">
															<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.seekerName') }}</new-tb-th>
															<new-tb-td>
																<div class="product-no" v-if="[seekerTeamInvoiceDetail?.created_by?.seeker?.id, item.seeker.id].includes(userDetail?.jobSeeker?.id)">
																	<div class="d-flex align-items-center">
																		<p class="ml-2">{{ item.seeker.user.full_name }}</p>
																	</div>
																</div></new-tb-td
															>
														</new-tb-tr>
														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.Role') }}</new-tb-th>
															<new-tb-td>
																<div class="role-member">
																	<img
																		:title="seekerTeamInvoiceDetail?.created_by?.seeker?.id === item.seeker?.id ? 'Leader' : 'Member'"
																		:src="
																			require(`@/assets/images/${
																				seekerTeamInvoiceDetail?.created_by?.seeker?.id === item.seeker?.id ? 'leader-icon.svg' : 'member-icon.svg'
																			}`)
																		"
																		class="role-icon"
																		alt="err"
																	/></div
															></new-tb-td>
														</new-tb-tr>
														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.emailAddress') }}</new-tb-th>
															<new-tb-td>
																<div class="email-address text-break">
																	<div>
																		<p class="text-break">{{ item?.seeker?.user?.email }}</p>
																	</div>
																</div>
															</new-tb-td>
														</new-tb-tr>
														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.Share') }}</new-tb-th>
															<new-tb-td>
																<div class="share-value ml-xl-0">
																	<div class="work py-0 form-control d-flex align-items-center rounded-md">
																		<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item?.shared_amount.toFixed(2)) : item?.shared_amount.toFixed(2) }}</p>
																	</div>
																
																</div></new-tb-td
															>
														</new-tb-tr>
														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.taxPercentage') }}</new-tb-th>
															<new-tb-td>
																<div class="Tax-value">
																	<div class="py-0 d-flex align-items-center text-center">
																		<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item?.tax) : item?.tax }}%</p>
																	</div>
																</div></new-tb-td
															>
														</new-tb-tr>
														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.Allowances') }}</new-tb-th>
															<new-tb-td>
																<div class="allowances">
																	<div class="py-0 d-flex align-items-center">
																		<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item?.compensation_amount.toFixed(2)) : item?.compensation_amount.toFixed(2) }}</p>
																	</div>
																</div></new-tb-td
															>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.willBePaid') }}</new-tb-th>
															<new-tb-td>
																<div class="payment">
																	<div>
																		<p class="">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -Number(item.seeker_company_pay).toFixed(2) : Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
																	</div>
																</div>
															</new-tb-td>
														</new-tb-tr>
														<new-tb-tr class="">
															<new-tb-th>{{ t('invoiceList.Actions') }}</new-tb-th>
															<new-tb-td>
																<div class="actions d-flex justify-content-center align-items-center">
																	<!-- expand work detail -->
																	<div class="down-btn" v-if="index !== expandRowIndex" @click="expandWorkDetails(index)">
																		<FontAwesomeIcon :icon="downIcon" />
																	</div>

																	<!-- expand work detail -->
																	<div class="down-btn" v-if="index === expandRowIndex" @click="expandWorkDetails(index)">
																		<FontAwesomeIcon :icon="upIcon" />
																	</div></div
															></new-tb-td>
														</new-tb-tr>
													</div>

													<div class="opne-toggle p-3 border-top" v-if="index === expandRowIndex">
														<div class="sub_payment">
															<div class="invoice__row expand-table w-100 mb-3" v-for="(itemRaw, index) in item.workHours || []" :key="index">
																<new-tb-tr class="top_border">
																	<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.invoiceDetails') }}</new-tb-th>
																	<new-tb-td>
																		<div class="product-width">
																			<div class="product-1">
																				<p class="inpult-area">{{ itemRaw.description }}</p>
																			</div>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('fieldList.date') }}</new-tb-th>
																	<new-tb-td>
																		<div class="description-width">
																			<p>{{ dateFormat(itemRaw.date) }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('workDetails.value') }}</new-tb-th>
																	<new-tb-td>
																		<div class="hours-width me-2">
																			<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value) : itemRaw.contract_value || '-' }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('workDetails.quantity') }}</new-tb-th>
																	<new-tb-td>
																		<div class="contractvalue-width">
																			<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.total_work) : itemRaw.total_work || '-' }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}%</new-tb-th>
																	<new-tb-td>
																		<div class="contractvalue-width d-flex align-items-center">
																			<p>{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(seekerTeamInvoiceDetail.vat) : seekerTeamInvoiceDetail.vat || '-' }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('invoiceList.leInvoice.viewInvoice.noVat') }}</new-tb-th>
																	<new-tb-td>
																		<div class="contractvalue-width d-flex align-items-center">
																			<p>€{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work) : itemRaw.contract_value * itemRaw.total_work || '-' }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr>
																	<new-tb-th>{{ t('invoiceList.leInvoice.addInvoice.vat') }}</new-tb-th>
																	<new-tb-td>
																		<div class="contractvalue-width d-flex align-items-center">
																			<p>€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100 :(itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100 }}</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
																<new-tb-tr class="bottom_border">
																	<new-tb-th>{{ t('workDetails.total') }}</new-tb-th>
																	<new-tb-td>
																		<div class="contractvalue-width">
																			<p>
																				€
																				{{ seekerTeamInvoiceDetail.mark_as_wrong ? -(
																					itemRaw.contract_value * itemRaw.total_work +
																						(itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100) : itemRaw.contract_value * itemRaw.total_work +
																						(itemRaw.contract_value * itemRaw.total_work * seekerTeamInvoiceDetail.vat) / 100
																				}}
																			</p>
																		</div></new-tb-td
																	>
																</new-tb-tr>
															</div>
														</div>

														<div class="ml-auto total mt-3 mr-lg-3">
															<div>
																<div class="total-excl d-flex justify-content-between w-full pb-2">
																	<p class="text-total">{{ t('invoiceList.leInvoice.viewInvoice.totalExclVat') }}</p>
																	<p class="text-prize text-black font-semibold">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.tax) : item.tax || 0 }}</p>
																</div>
																<div class="total-excl d-flex justify-content-between w-full pb-2">
																	<p class="text-total">{{ t('workDetails.totalCompensation') }}</p>
																	<p class="text-prize text-black font-semibold">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.compensation_amount.toFixed(2)) : item.compensation_amount.toFixed(2) || 0 }}</p>
																</div>
																<div class="total-excl border-top-bottom d-flex justify-content-between font-semibold text-right text-lg py-2">
																	<p class="all-total text-black">{{ t('workDetails.total') }}</p>
																	<p class="total-prize">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.sub_total.toFixed(2)) : item.sub_total.toFixed(2) || '0' }}</p>
																</div>
															</div>
														</div>

														<div class="overflow-auto">
															<div class="bottom-header d-lg-flex align-items-center justify-content-between my-3">
																<div class="pph-left mb-lg-0 mb-2">
																	<h5 class="text-white fn16">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
																</div>
																<div class="d-sm-flex align-items-center ml-md-auto">
																	<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
																		<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.grossAmount') }}</p>
																		<p class="text-sm-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0) :item.gross_salary ? Number(finalTotal.grossSalary).toFixed(2) : 0 }}</p>
																	</div>

																	<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
																		<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}</p>
																		<p class="text-sm-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0) :item.tax_amount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0 }}</p>
																		
																	</div>

																	<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
																		<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
																		<p class="text-sm-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -Number(item.compensation_amount).toFixed(2) : Number(item.compensation_amount).toFixed(2) || 0 }}</p>
																		
																	</div>

																	<div class="text-white">
																		<p class="{{'text-sm-fw'|translate}}">{{ t('invoiceList.leInvoice.addInvoice.willpaid') }}</p>
																		<p class="text-sm-fw">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -Number(item.seeker_company_pay).toFixed(2) : Number(item.seeker_company_pay).toFixed(2) || 0 }}</p>
																		
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</new-tb-tr>
								</template>
							</new-data-table>
						</div>
					</div>
				</div>

				<div class="pph-left mb-3">
					<h5 class="title-head">{{ t('invoiceList.invoiceData.attachmentsList') }}</h5>
				</div>

				<new-data-table :data="seekerTeamInvoiceDetail.invoice_files || []" sst class="large-table">
					<template #thead>
						<new-tb-th class="w-50">{{ t('invoiceList.leInvoice.viewInvoice.placeOfPurchase') }}</new-tb-th>
						<new-tb-th class="w-30">{{ t('invoiceList.leInvoice.viewInvoice.dateOfPurchase') }}</new-tb-th>
						<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
					</template>

					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
							<new-tb-td>{{ tr.purchase_place }}</new-tb-td>
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

				<div class="min_width_auto">
					<new-data-table :data="seekerTeamInvoiceDetail.invoice_files || []" sst class="responsive-table attachment-table mt-4">
						<template #data="scopedData" ref="tableBody">
							<new-tb-tr class="invoice__row expand-table " :key="i" v-for="(tr, i) in scopedData.data">
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
									<div class="d-flex">
										<div>
											<div>
												{{ dateFormat(tr.purchase_date) }}
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
											<new-tb-th>{{ t('invoiceList.invoiceData.attachmentDescription') }}</new-tb-th>
											<new-tb-td>{{ tr.purchase_place || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceData.attachmentDate') }}</new-tb-th>
											<new-tb-td>{{ dateFormat(tr.purchase_date) }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
											<new-tb-td>
												<div class="d-flex align-items-center justify-content-start">
													<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</button>
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
				<div class="overflow-auto" :class="!seekerTeamInvoiceDetail.approved ? 'blur-overlay' : 'no-blur-overlay'">
					<h4 class="text-center mt-5"></h4>

					<div class="viewinvoicetable">
						<div class="d-flex">
							<div style="  border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2 text-start width-13">
								<p>
									{{ t('invoiceList.leInvoice.viewInvoice.saajan_tilinumero') }}
								</p>
								<p>{{ t('invoiceList.leInvoice.viewInvoice.recipient_bank_number') }}</p>
							</div>
							<div style="width:33%; border-right:2px solid #000;border-bottom:2px solid #000;" class="p-2  ">
								<p>{{ t('invoiceList.leInvoice.viewInvoice.iban') }}</p>
								<p class="ml-2">{{ seekerTeamInvoiceDetail.iban }}</p>
							</div>

							<div style="width:55%; border-bottom:2px solid #000;" class="p-2">
								<p>{{ t('invoiceList.leInvoice.viewInvoice.bic') }}</p>
								<p class="ml-2">
									{{ t('invoiceList.leInvoice.viewInvoice.bank_bic') }} :
									{{ seekerTeamInvoiceDetail.bic }}
								</p>
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
										{{
											seekerTeamInvoiceDetail.created_by &&
												seekerTeamInvoiceDetail.created_by.seeker &&
												seekerTeamInvoiceDetail.created_by.seeker.user &&
												seekerTeamInvoiceDetail.created_by.seeker.user.full_name
										}}
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
											{{ dateFormat(seekerTeamInvoiceDetail.due_date) }}
										</div>
									</div>

									<div class="p-2 d-flex" style="width:50%; ">
										<div style="width:13%;" class="me-2">{{ t('invoiceList.leInvoice.viewInvoice.euro') }}</div>
										<div class="d-flex  align-items-center">€ {{ seekerTeamInvoiceDetail.mark_as_wrong ? -(seekerTeamInvoiceDetail.sub_total) :seekerTeamInvoiceDetail.sub_total }}</div>
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

				<div class="go__back position-absolute top-50 start-50 translate-middle shadow" v-if="!seekerTeamInvoiceDetail.approved">
					<router-link to="/team-invoices">
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
	<!-- open image download modal -->

	<Suspense v-if="showDocumentImageModal.value">
		<template #default>
			<open-image-modal v-model:isModalShow="showDocumentImageModal" :imageLink="imageLink" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
	<div id="team-invoicePdf-container"></div>
</template>

<script>
import { computed, createApp, ref } from 'vue';
import { useStore } from 'vuex';
import { defineAsyncComponent, onMounted } from '@vue/runtime-core';
import { dateFormat } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faEdit, faInfo, faLongArrowAltLeft, faLongArrowAltRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from 'vue-router';
import TeamInvoiceViewPdf from '@/views/pdf/TeamInvoiceViewPdf.vue';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import vueStore from '@/store'; // store
import { i18n } from '@/helpers/I18n'; // i18n
import NewDataTable from '@/components/dataTable/newIndex';
import Pagination from '@/components/pagination'; // pagination
import { useI18n } from 'vue-i18n';
const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'TeamInvoiceSeekerDetail',

	components: {
		FontAwesomeIcon,
		OpenImageModal,
		DefaultLoader,
	},

	setup() {

		//ref
		const expandRowIndex = ref(null);
		const totalTime = ref(null);
		const totalKillometer = ref(null);
		const totalCompensation = ref(null);
		const totalWorkhours = ref(null);
		const totalMealBenefits = ref(null);
		const totalFullPerDiem = ref(null);
		const totalOtherBenefits = ref(null);
		const totalPayoutAmount = ref(null);
		const days = ref(null);
		const tableIndex = ref(0);
		const seekerIndex = ref(0);
		const recipientIndex = ref(0);
		const index = ref(0);
		// gloal store
		const store = useStore();
		// global route
		const route = useRoute();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('invoiceList.viewTeamInvoice')} - Way2Work`;
		// icons
		const infoIcon = faInfo;
		const editIcon = faEdit;
		const leftArrowIcon = faLongArrowAltLeft;
		const rightArrowIcon = faLongArrowAltRight;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const downIcon = faChevronDown;
		const upIcon = faChevronUp;
		const viewIcon = faEye;

		const isDocImgModal = ref(false);
		const imageLink = ref(null);

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('teamInvoice/viewJobseekerTeamInvoice', route.params.id);
		});

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

		/**
		 * Methods
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
			if (seekerIndex.value === index) {
				seekerIndex.value = null;
				return;
			}
			seekerIndex.value = index;
		};
		// table open
		const openRecipientTable = index => {
			if (recipientIndex.value === index) {
				recipientIndex.value = null;
				return;
			}
			recipientIndex.value = index;
		};

		// expand work details
		const expandWorkDetails = index => {
			if (expandRowIndex.value === index) {
				expandRowIndex.value = null;
				return false;
			}

			expandRowIndex.value = index;
		};

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

		// download team invoice pdf
		const teamInvoicePdf = singleInformationTeamInvoiceData => {
			const ap = document.querySelector('#mount-node');
			if (ap) {
				ap.remove();
			}
			const elem = document.querySelector('#team-invoicePdf-container');
			const mounteNode = document.createElement('div');
			mounteNode.id = 'mount-node';
			elem.append(mounteNode);

			createApp(TeamInvoiceViewPdf, { singleInformationTeamInvoice: singleInformationTeamInvoiceData })
				.use(vueStore)
				.use(i18n)
				.use(NewDataTable)
				.use(Pagination)
				.mount('#mount-node');
		};

		return {
			//ref
			t,
			dateFormat,
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
			recipientIndex,
			seekerIndex,
			index,
			expandRowIndex,

			//computed
			seekerTeamInvoiceDetail,
			finalTotal,
			userDetail,
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
			downIcon,
			upIcon,
			viewIcon,

			// methods
			openTable,
			openSeekerTable,
			openRecipientTable,
			expandWorkDetails,
			viewSeekerDocument,
			teamInvoicePdf,
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
	height: calc(100% - 61px);
	overflow: hidden;
	box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
	@media (max-width: 1024px) {
		margin: 15px auto;
	}
}

.company-content {
	padding-top: 15px;

	.company-text {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		.company-titel {
			flex-basis: 160px;
			max-width: 160px;
			font-size: 15px;
			font-weight: 500;
			color: #858a90;
		}

		.company-value {
			font-size: 14px;
			font-weight: 500;
		}
	}
}

.document__list {
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

				@media (max-width: 576px) {
					width: 60px;
				}
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
		overflow: hidden;

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
	top: 0;
	left: 20px;
	width: 100%;
	height: 100%;
	font-size: 12px;
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

.title-sm {
	font-size: 13px;
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
			border-bottom: none;

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

.expand-table {
	border-bottom: 10px solid #fff;

	th {
		width: 13%;
	}
}

.daily-work-row {
	@media (max-width: 1440px) {
		overflow: auto;
	}
}

.daily-work-col {
	border: 1px solid #dde0e2;
	border-radius: 10px;

	@media (max-width: 1440px) {
		min-width: 950px;
	}

	@media (max-width: 1200px) {
		min-width: 1150px;
	}

	@media (max-width: 768px) {
		min-width: 1050px;
	}
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
		padding: 8px 25px;
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
	padding: 10px 10px;
	min-width: 900px;

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
	padding: 10px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;

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
	width: 10%;
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
	width: 10%;
}

.email-address {
	width: 15%;
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
	border-radius: 20px;
	padding: 25px;

	.total-excl {
		.text-total {
			color: #858a90;
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

.fn16 {
	font-size: 16px;
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
.responsive-table {
	.table-border {
		margin: 0;
	}
	.collapse-div {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 20px 20px 0 20px;
		background-color: #f5f5f5;
	}
}

.attachment-table {
	.no-data-border {
		border-bottom: 1px solid #ccc;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		border-top: 1px solid #ccc;
		border-radius: 15px;
	}
	td {
		overflow: visible;
	}
}

.payment_table {
	tr {
		&:last-child {
			th {
				border-bottom-left-radius: 6px !important;
			}
			td {
				font-size: 13px;
				padding: 0.5rem;
				border-bottom-right-radius: 6px !important;
			}
		}
		th {
			width: 13%;
			@media (max-width: 575px) {
				width: 28%;
			}
		}
	}
	.role-member {
		@media (max-width: 575px) {
			width: 14%;
		}
		.role-icon {
			height: 25px;
			width: 22px;
			object-fit: contain;
		}
	}
	.email-address,
	.payment {
		.total-text {
			color: #ff4b57;
			font-weight: 500;
		}
	}
	.share-value {
		width: 20%;
		@media (max-width: 768px) {
			width: 28%;
		}
		@media (max-width: 575px) {
			width: 60%;
		}
		.work {
			font-size: 14px;
			@media (max-width: 768px) {
				padding: 10px;
			}
			input {
				border: none;
			}
		}
	}
	.actions {
		@media (max-width: 575px) {
			width: 23%;
		}
		.down-btn {
			width: 40px;
			height: 40px;
			min-width: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 12px;
			color: #ffff;
			background-color: #273238;
			cursor: pointer;
		}
	}
}
.opne-toggle {
	.sub_payment {
		.expand-table {
			max-width: 750px;
			margin: 0 auto;
			border-bottom: 1px solid #fff;
			@media (max-width: 768px) {
				max-width: 550px;
				margin: 0 auto;
			}
			tr {
				th {
					width: 10%;
					@media (max-width: 768px) {
						width: 15%;
					}
				}
				td {
					font-size: 13px;
					padding: 0.5rem;
					width: 37%;
				}
			}
		}
	}

	.total {
		background-color: #fdfdfde3;
		@media (max-width: 575px) {
			padding: 15px;
		}
		.total-excl {
			.text-total,
			.text-prize {
				@media (max-width: 575px) {
					font-size: 13px;
				}
			}
		}
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
<style>
.attachment-table .data__table .table__data {
	margin-bottom: 0 !important;
}
@media (max-width: 1024px) {
	.attachment-table .data__table .table__data {
		overflow: visible;
	}
}
.top_border td {
	border-top-right-radius: 6px !important;
}
.top_border th {
	border-top-left-radius: 6px !important;
}
.bottom_border td {
	border-bottom-right-radius: 6px !important;
}
.bottom_border th {
	border-bottom-left-radius: 6px !important;
}
</style>
