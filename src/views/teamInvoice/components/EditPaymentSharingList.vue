<template>
	<div class="paymentsharingList mt-3">
		<!-- daily work hour list title -->
		<div class="d-flex align-items-center justify-content-between mb-3">
			<div>
				<h5 class="title-lg">{{ t('invoiceList.paymentSharing') }}</h5>
			</div>
		</div>
		<p class="pb-2">{{ t('invoiceList.thisPayment') }}</p>

		<div class="daily-work-row large-table">
			<div class="daily-work-col">
				<!-- paymentsharing head -->
				<div class="details-head text-center d-flex align-items-center">
					<div class="member-name">
						<p class="details-head-text text-start">{{ t('invoiceList.memberName') }}</p>
					</div>

					<div class="role-member">
						<p class="details-head-text">{{ t('invoiceList.Role') }}</p>
					</div>

					<div class="email-address">
						<p class="details-head-text">{{ t('invoiceList.emailAddress') }}</p>
					</div>

					<div class="share-value">
						<p class="details-head-text">{{ t('invoiceList.payableAmount') }}</p>
					</div>

					<div class="share-value">
						<p class="details-head-text">{{ t('invoiceList.Share') }}</p>
					</div>

					<div class="Tax-value">
						<p class="details-head-text">{{ t('invoiceList.taxPercentage') }}</p>
					</div>

					<div class="allowances">
						<p class="details-head-text">{{ t('invoiceList.Allowances') }}</p>
					</div>
					<div class="payment">
						<p class="details-head-text">{{ t('invoiceList.willBePaid') }}</p>
					</div>
					<div class="payment">
						<p class="details-head-text">{{ t('invoiceList.Actions') }}</p>
					</div>
				</div>

				<!-- paymentsharing list - row -->
				<div v-for="(tMem, index) in teamMembers" :key="index">
					<div class="details-content text-center">
						<div class="product-no">
							<div class="d-flex align-items-center">
								<div class="w-30 h-30 product-icon">
									<img :src="tMem?.seeker?.user?.file_path" class="w-100 h-100" alt="err" />
								</div>
								<p class="ml-2">{{ tMem?.seeker?.user?.full_name }}</p>
							</div>
						</div>
						<div class="role-member">
							<span v-if="getTeamDetails.createdById === tMem?.id">
								<ToolTip :title="t('toolTip.leader')">
									<div class="w-20 h-20 mx-auto">
										<img :src="require('@/assets/images/leader-icon.svg')" class="w-100 h-100" alt="err" />
									</div>
								</ToolTip>
							</span>
							<span v-else>
								<ToolTip :title="t('toolTip.member')">
									<div class="w-20 h-20 mx-auto">
										<img :src="require('@/assets/images/member-icon.svg')" class="w-100 h-100" alt="err" />
									</div>
								</ToolTip>
							</span>
						</div>

						<div class="email-address text-break">
							<div>
								<p>{{ tMem?.seeker?.user?.email }}</p>
							</div>
						</div>

						<div class="email-address mr-2 text-break">
							<div>
								<p class="text-red">€ {{ Number(tMem.total_work_amount).toFixed(2) }}</p>
							</div>
						</div>

						<div class="share-value ml-xl-0 ml-3">
							<div class="work py-0 form-control d-flex align-items-center rounded-md">
								<p class="pr-2">€</p>
								<input
									type="number"
									class="border-none w-100"
									:max="tMem.TotalWorkValue"
									:value="getTeamPaymentSharing[index].shared_amount.toFixed(2)"
									@change="e => handlePaymentSharing(e, tMem.seekerId, index)"
									oninput="if(this.value <div 0) this.value = 0;"
								/>
							</div>
						</div>

						<!-- tax percentage -->
						<div class="Tax-value">
							<div class="py-0 d-flex align-items-center text-center">
								<p class="pl-2 m-auto">{{ tMem.tax_percentage }} %</p>
							</div>
						</div>

						<div class="allowances">
							<div class="py-0 d-flex align-items-center">
								<p class="pl-2">€ {{ Number(tMem.total_compensation).toFixed(2) || 0 }}</p>
							</div>
						</div>

						<div class="payment">
							<div>
								<p class="text-red">€ {{ calculateTotalOfSeeker(index).toFixed(2) }}</p>
							</div>
						</div>

						<div class="actions d-flex justify-content-center align-items-center">
							<!-- expand work detail -->

							<div class="down-btn" v-if="index !== expandRowIndex" @click="expandWorkDetails(index)">
								<ToolTip :title="t('toolTip.expantiate')">
									<FontAwesomeIcon :icon="downIcon" />
								</ToolTip>
							</div>

							<!-- expand work detail -->

							<div class="down-btn" v-if="index === expandRowIndex" @click="expandWorkDetails(index)">
								<ToolTip :title="t('toolTip.expantiate')">
									<FontAwesomeIcon :icon="upIcon" />
								</ToolTip>
							</div>
						</div>
					</div>

					<!-- paymentsharing row expand -->
					<div class="opne-toggle p-3 border-top border-bottom payment_large_table" v-if="index === expandRowIndex">
						<!-- daily work hour list - column name -->
						<div class="details-head text-center">
							<div class="product-no">
								<p class="details-head-text">{{ t('workDetails.productNo') }}</p>
							</div>
							<div class="discription">
								<p class="details-head-text">{{ t('workDetails.description') }}</p>
							</div>
							<div class="contract-type">
								<p class="details-head-text">{{ t('workDetails.type') }}</p>
							</div>
							<div class="contract-value">
								<p class="details-head-text">{{ t('workDetails.value') }}</p>
							</div>
							<div class="quantity">
								<p class="details-head-text">{{ t('workDetails.quantity') }}</p>
							</div>
							<div class="quantity">
								<p class="details-head-text">{{ t('workDetails.total') }}</p>
							</div>
						</div>

						<div>
							<div class="row no-gutters">
								<div class="details-content border rounded-bottom" v-for="(tMW, wI) in tMem?.seeker?.work_hours || []" :key="wI">
									<!-- serial no. -->
									<div class="product-width">
										<div class="product-1">
											<p class="inpult-area">{{ wI + 1 }}</p>
										</div>
									</div>

									<!-- description -->
									<div class="description-width">
										<span v-if="tMW.description">
											<div class="work-width text-center">
												<p>{{ tMW.description }}</p>
											</div>
										</span>
										<span v-else> {{ t('invoiceList.noDescription') }} </span>
									</div>

									<!-- contract type -->
									<div class="hours-width me-2 text-center">
										<p>{{ tMW.contract_type }}</p>
									</div>

									<!-- contract value -->
									<div class="contractvalue-width text-center">
										<p>€ {{ tMW.contract_value }}</p>
									</div>

									<!-- contract value -->
									<div class="contractvalue-width d-flex align-items-center justify-content-center">
										<div class="me-2">
											<FontAwesomeIcon :icon="closeIcon" />
										</div>
										<p>{{ tMW.total_work }}</p>
									</div>

									<div class="contractvalue-width text-center">
										<p>€ {{ tMW.contract_value * tMW.total_work }}</p>
									</div>
								</div>
							</div>
						</div>

						<div class="overflow-auto">
							<div class="bottom-header d-flex align-items-center justify-content-between my-3">
								<div class="pph-left">
									<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
								</div>
								<div class="d-flex align-items-center ml-md-auto">
									<div class="mr-5 text-white">
										<p class="text-sm-fw">{{ t('invoiceList.payableAmount') }}</p>
										<p class="text-sm-fw">€ {{ EremainingWorkValue(index).toFixed(2) || 0 }}</p>
									</div>

									<div class="mr-5 text-white">
										<p class="text-sm-fw">{{ t('workDetails.taxableAmount') }}</p>
										<p class="text-sm-fw">€ {{ calculateTaxableAmount(index).toFixed(2) || 0 }}</p>
									</div>

									<div class="mr-5 text-white">
										<p class="text-sm-fw">{{ t('workDetails.totalCompensation') }}</p>
										<p class="text-sm-fw">€ {{ Number(tMem.total_compensation).toFixed(2) || 0 }}</p>
									</div>

									<div class="text-white">
										<p class="{{'text-sm-fw'|translate}}">{{ t('workDetails.total') }}</p>
										<p class="text-sm-fw">€ {{ calculateTotalOfSeeker(index).toFixed(2) || 0 }}</p>
									</div>
								</div>
							</div>
						</div>

						<!-- debug calculation - checkbox -->
						<div class="form-check form-checkbox mt-4">
							<input
								class="form-check-input form-checkbox-width"
								type="checkbox"
								id="paymentdebugcalculation"
								:checked="displayAllW2WTotoal"
								:value="displayAllW2WTotoal.value"
								:v-model="displayAllW2WTotoal.value"
								@click="onTransported($event)"
							/>
							<label class="form-check-label extras-font ml-2" for="paymentdebugcalculation"> {{ t('invoiceList.leInvoice.addInvoice.debugCal') }} </label>
						</div>

						<!-- workdetail total summary -->
						<div class="row" v-if="displayAllW2WTotoal">
							<div class="col-lg-7 col-8 ml-auto p-0">
								<div class="total mt-3">
									<div class="total-excl">
										<p class="text-total">{{ t('workDetails.totalWorkValue') }}</p>
										<p class="text-prize">€ {{ EremainingWorkValue(index).toFixed(2) || 0 }}</p>
									</div>
									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('workDetails.totalCompensation') }}</p>

											<p class="text-prize">€ {{ tMem.total_compensation || 0 }}</p>
										</div>
									</div>
									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.grossSalary') }}</p>
											<p class="text-prize">€ {{ editCalculateGrossSalary(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.vatAddedVal') }})</span>
									</div>
									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}</p>
											<p class="text-prize">€ {{ calculateTaxableAmount(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block"
											>({{ t('invoiceList.taxPercentage') }} ({{ tMem.PersonalTax }}%) {{ t('common.of') }} {{ t('invoiceList.leInvoice.addInvoice.gross_salary') }})</span
										>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">
												<!-- Hours Amount After Tax -->
												{{ t('invoiceList.leInvoice.addInvoice.grossAfterTax') }}
											</p>
											<p class="text-prize">€ {{ calculateHoursAmountAfterTax(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.grossAfterTaxFormula') }})</span>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.health_insurance') }}</p>
											<p class="text-prize">
												€
												{{ calculateHealthInsurance(index).toFixed(2) || 0 }}
											</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.healthAmtFormula') }})</span>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">
												{{ t('invoiceList.leInvoice.addInvoice.accident_insurance_amount') }}
											</p>
											<p class="text-prize">
												€
												{{ calculateAccidentInsurance(index).toFixed(2) || 0 }}
											</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.accidentAmtFormula') }})</span>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.W2WAmt') }}</p>
											<p class="text-prize">€ {{ calculateW2WCommision(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.W2WAmtFormula') }})</span>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">
												<!-- Quic kpay Commission Amount -->
												{{ t('invoiceList.leInvoice.addInvoice.quickpayAmt') }}
											</p>
											<p class="text-prize">€ {{ calculateQuickPayCommision(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block"
											>({{ t('invoiceList.leInvoice.addInvoice.quickpayCommission') }}({{ tMem.quickpayPercentage }}%)
											{{ t('common.of') }}
											{{ t('invoiceList.leInvoice.addInvoice.vatAddedValue') }})</span
										>
									</div>

									<div class="text-end margin-top-5">
										<div class="total-excl">
											<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.commissionAmt') }}</p>
											<p class="text-prize">€ {{ calculateCommisionAmount(index).toFixed(2) || 0 }}</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.commissionAmtFormula') }})</span>
									</div>
									<div class="text-end margin-top-5 total-bold-border">
										<div class="total-excl">
											<p class="all-total">{{ t('workDetails.total') }}</p>
											<p class="total-prize">
												€
												{{ calculateTotalOfSeeker(index).toFixed(2) || 0 }}
											</p>
										</div>
										<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.teamTotalFormula') }})</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="attachment-table responsive-table">
			<div v-if="teamMembers.length > 0">
				<new-data-table sst :data="teamMembers">
					<template #data="scopedData" ref="tablebody">
						<new-tb-tr class="invoice__row expand-table  " v-for="(tMem, index) in scopedData.data" :key="index">
							<div>
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(index, tMem)">
									<div class="d-flex">
										<div>
											<div>
												{{ tMem?.seeker?.work_hours?.created_at || '-' }}
											</div>
											<div>
												{{ tMem?.seeker?.user?.full_name || '-' }}
											</div>
										</div>
									</div>

									<div>
										<a>
											<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== index" class="arrowIcon" />
										</a>

										<a>
											<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === index" class="arrowIcon" />
										</a>
									</div>
								</div>
								<div class="border-padding">
									<div v-if="index == tableIndex" class="table-border">
										<div class="payment_table">
											<new-tb-tr class="top_border">
												<new-tb-th>{{ t('invoiceList.memberName') }}</new-tb-th>
												<new-tb-td>
													<div class="product-no">
														<div class="d-flex align-items-center">
															<div class="product-icon">
																<img :src="tMem?.seeker?.user?.file_path" alt="err" />
															</div>
															<p class="ml-2">{{ tMem?.seeker?.user?.full_name }}</p>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.Role') }}</new-tb-th>
												<new-tb-td>
													<div class="role-member">
														<span v-if="getTeamDetails.createdById === tMem?.id">
															<ToolTip :title="t('toolTip.leader')">
																<div class="role-icon mx-auto">
																	<img :src="require('@/assets/images/leader-icon.svg')" class="w-100 h-100" alt="err" />
																</div>
															</ToolTip>
														</span>
														<span v-else>
															<ToolTip :title="t('toolTip.member')">
																<div class="role-icon mx-auto">
																	<img :src="require('@/assets/images/member-icon.svg')" class="w-100 h-100" alt="err" />
																</div>
															</ToolTip>
														</span>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.emailAddress') }}</new-tb-th>
												<new-tb-td>
													<div class="email-address text-break">
														<div>
															<p>{{ tMem?.seeker?.user?.email }}</p>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.payableAmount') }}</new-tb-th>
												<new-tb-td>
													<div class="email-address mr-2 text-break">
														<div>
															<p class="total-text">€ {{ Number(tMem.total_work_amount).toFixed(2) }}</p>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.Share') }}</new-tb-th>
												<new-tb-td>
													<div class="share-value ml-xl-0">
														<div class="work py-0 form-control d-flex align-items-center rounded-md">
															<p class="pr-2">€</p>
															<input
																type="number"
																class="border-none w-100"
																:max="tMem.TotalWorkValue"
																:value="getTeamPaymentSharing[index].shared_amount.toFixed(2)"
																@change="e => handlePaymentSharing(e, tMem.seekerId, index)"
																oninput="if(this.value <div 0) this.value = 0;"
															/>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.taxPercentage') }}</new-tb-th>
												<new-tb-td>
													<div class="Tax-value">
														<div class="py-0 d-flex align-items-center text-center">
															<p class="pl-2">{{ tMem.tax_percentage }} %</p>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.Allowances') }}</new-tb-th>
												<new-tb-td>
													<div class="allowances">
														<div class="py-0 d-flex align-items-center">
															<p class="pl-2">
																€
																{{ Number(tMem.total_compensation).toFixed(2) || 0 }}
															</p>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>

											<new-tb-tr>
												<new-tb-th>{{ t('invoiceList.willBePaid') }}</new-tb-th>
												<new-tb-td>
													<div class="payment">
														<div>
															<p class="total-text">€ {{ tMem.amountWillPaid.toFixed(2) }}</p>
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
															<ToolTip :title="t('toolTip.expantiate')">
																<FontAwesomeIcon :icon="downIcon" />
															</ToolTip>
														</div>

														<!-- expand work detail -->

														<div class="down-btn" v-if="index === expandRowIndex" @click="expandWorkDetails(index)">
															<ToolTip :title="t('toolTip.expantiate')">
																<FontAwesomeIcon :icon="upIcon" />
															</ToolTip>
														</div>
													</div>
												</new-tb-td>
											</new-tb-tr>
										</div>

										<div class="opne-toggle p-3 border-top" v-if="index === expandRowIndex">
											<div class="sub_payment">
												<div class="invoice__row expand-table w-100 mb-3" v-for="(tMW, wI) in tMem?.seeker?.work_hours || []" :key="wI">
													<new-tb-tr class="top_border">
														<new-tb-th>{{ t('workDetails.productNo') }}</new-tb-th>
														<new-tb-td>
															<div class="product-width">
																<div class="product-1">
																	<p class="inpult-area">{{ wI + 1 }}</p>
																</div>
															</div>
														</new-tb-td>
													</new-tb-tr>
													<new-tb-tr>
														<new-tb-th>{{ t('workDetails.description') }}</new-tb-th>
														<new-tb-td>
															<div class="description-width">
																<span v-if="tMW.description">
																	<div class="work-width">
																		<p>{{ tMW.description }}</p>
																	</div>
																</span>
																<span v-else> {{ t('invoiceList.noDescription') }} </span>
															</div>
														</new-tb-td>
													</new-tb-tr>
													<new-tb-tr>
														<new-tb-th>{{ t('workDetails.type') }}</new-tb-th>
														<new-tb-td>
															<div class="hours-width me-2">
																<p>{{ tMW.contract_type }}</p>
															</div>
														</new-tb-td>
													</new-tb-tr>
													<new-tb-tr>
														<new-tb-th>{{ t('workDetails.value') }}</new-tb-th>
														<new-tb-td>
															<div class="contractvalue-width">
																<p>€ {{ tMW.contract_value }}</p>
															</div>
														</new-tb-td>
													</new-tb-tr>
													<new-tb-tr>
														<new-tb-th>{{ t('workDetails.quantity') }}</new-tb-th>
														<new-tb-td>
															<div class="contractvalue-width d-flex align-items-center">
																<div class="me-2">
																	<FontAwesomeIcon :icon="closeIcon" />
																</div>
																<p>{{ tMW.total_work }}</p>
															</div>
														</new-tb-td>
													</new-tb-tr>
													<new-tb-tr class="bottom_border">
														<new-tb-th>{{ t('workDetails.total') }}</new-tb-th>
														<new-tb-td>
															<div class="contractvalue-width">
																<p>€ {{ tMW.contract_value * tMW.total_work }}</p>
															</div>
														</new-tb-td>
													</new-tb-tr>
												</div>
											</div>

											<div class="overflow-auto">
												<div class="bottom-header d-lg-flex align-items-center justify-content-between my-3">
													<div class="pph-left mb-lg-0 mb-2">
														<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
													</div>
													<div class="d-sm-flex align-items-center ml-md-auto">
														<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
															<p class="text-sm-fw">
																{{ t('invoiceList.payableAmount') }}
															</p>
															<p class="text-sm-fw">€ {{ EremainingWorkValue(index).toFixed(2) || 0 }}</p>
														</div>

														<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
															<p class="text-sm-fw">{{ t('workDetails.taxableAmount') }}</p>
															<p class="text-sm-fw">€ {{ calculateTaxableAmount(index).toFixed(2) || 0 }}</p>
														</div>

														<div class="mr-lg-5 mr-4 mb-md-0 mb-1 text-white">
															<p class="text-sm-fw">
																{{ t('workDetails.totalCompensation') }}
															</p>
															<p class="text-sm-fw">
																€
																{{ Number(tMem.total_compensation).toFixed(2) || 0 }}
															</p>
														</div>

														<div class="text-white">
															<p class="{{'text-sm-fw'|translate}}">
																{{ t('workDetails.total') }}
															</p>
															<p class="text-sm-fw">€ {{ calculateTotalOfSeeker(index).toFixed(2) || 0 }}</p>
														</div>
													</div>
												</div>
											</div>

											<!-- debug calculation - checkbox -->
											<div class="form-check form-checkbox mt-md-4 mt-2">
												<input
													class="form-check-input form-checkbox-width"
													type="checkbox"
													id="paymentdebugcalculation"
													:checked="displayAllW2WTotoal"
													:value="displayAllW2WTotoal.value"
													:v-model="displayAllW2WTotoal.value"
													@click="onTransported($event)"
												/>
												<label class="form-check-label extras-font ml-2" for="paymentdebugcalculation"> {{ t('invoiceList.leInvoice.addInvoice.debugCal') }} </label>
											</div>

											<!-- workdetail total summary -->
											<div class="row" v-if="displayAllW2WTotoal">
												<div class="col-lg-9 col-12 ml-auto">
													<div class="total mt-3">
														<div class="total-excl">
															<p class="text-total">{{ t('workDetails.totalWorkValue') }}</p>
															<p class="text-prize">€ {{ EremainingWorkValue(index).toFixed(2) || 0 }}</p>
														</div>
														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('workDetails.totalCompensation') }}
																</p>
																<p class="text-prize">€ {{ tMem.total_compensation || 0 }}</p>
															</div>
														</div>
														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.grossSalary') }}
																</p>
																<p class="text-prize">
																	€
																	{{ editCalculateGrossSalary(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.vatAddedVal') }})</span>
														</div>
														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}
																</p>
																<p class="text-prize">
																	€
																	{{ calculateTaxableAmount(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block"
																>({{ t('invoiceList.taxPercentage') }} ({{ tMem.PersonalTax }}%) {{ t('common.of') }}
																{{ t('invoiceList.leInvoice.addInvoice.gross_salary') }})</span
															>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	<!-- Hours Amount After Tax -->
																	{{ t('invoiceList.leInvoice.addInvoice.grossAfterTax') }}
																</p>

																<p class="text-prize">
																	€
																	{{ calculateHoursAmountAfterTax(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.grossAfterTaxFormula') }})</span>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.health_insurance') }}
																</p>

																<p class="text-prize">
																	€
																	{{ calculateHealthInsurance(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.healthAmtFormula') }})</span>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.accident_insurance_amount') }}
																</p>

																<p class="text-prize">
																	€
																	{{ calculateAccidentInsurance(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.accidentAmtFormula') }})</span>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.W2WAmt') }}
																</p>

																<p class="text-prize">
																	€
																	{{ calculateW2WCommision(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.W2WAmtFormula') }})</span>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	<!-- Quick pay Commission Amount -->
																	{{ t('invoiceList.leInvoice.addInvoice.quickpayAmt') }}
																</p>
																<p class="text-prize">
																	€
																	{{ calculateQuickPayCommision(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block"
																>({{ t('invoiceList.leInvoice.addInvoice.quickpayCommission') }}({{ tMem.quickpayPercentage }}%)
																{{ t('common.of') }}
																{{ t('invoiceList.leInvoice.addInvoice.vatAddedValue') }})</span
															>
														</div>

														<div class="text-end margin-top-5">
															<div class="total-excl">
																<p class="text-total">
																	{{ t('invoiceList.leInvoice.addInvoice.commissionAmt') }}
																</p>
																<p class="text-prize">
																	€
																	{{ calculateCommisionAmount(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.commissionAmtFormula') }})</span>
														</div>
														<div class="text-end margin-top-5 total-bold-border">
															<div class="total-excl">
																<p class="all-total">{{ t('workDetails.total') }}</p>
																<p class="total-prize">
																	€
																	{{ calculateTotalOfSeeker(index).toFixed(2) || 0 }}
																</p>
															</div>
															<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.teamTotalFormula') }})</span>
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
			<div v-else class="no-data-border">
				<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
			</div>
		</div>

		<div class="overflow-auto">
			<div class="bottom-header d-lg-flex align-items-center justify-content-between min-w-auto mt-3 mb-4 gap-5">
				<div class="pph-left mb-lg-0 mb-2">
					<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.recipient') }}</h5>
				</div>
				<div class="d-sm-flex align-items-center ml-md-auto flex-md-wrap flex-wrap gap-4">
					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.invoiceTotal') }}</p>
						<p class="text-sm-fw">€ {{ Number(finalTotal.invoiceTotal).toFixed(2) || 0.0 }}</p>
					</div>

					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.VATAmount') }}</p>
						<p class="text-sm-fw">€ {{ finalTotal.vatTotal || 0 }}</p>
					</div>
				</div>
			</div>
		</div>

		<p class="pt-2 border-bottom pb-3">
			{{ t('invoiceList.leInvoice.addInvoice.teamInvoiceNote') }}
		</p>

		<div class="text-right mt-2">
			<h5 class="title-sm fw-bolder">{{ t('invoiceList.leInvoice.addInvoice.leftToShare') }}</h5>
			<h1 class="text-red">€ {{ Number(leftToShareAmount) }}</h1>
		</div>
	</div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { useSwal } from '@/components/sweetalert';
import { useI18n } from 'vue-i18n';

export default {
	name: 'EditPaymentSharing',

	components: {
		FontAwesomeIcon,
	},

	props: {
		vat: Number,
		quickPayStat: Boolean,
	},

	setup(props) {
		// ref
		const expandRowIndex = ref(null);

		// icon
		const plusIcon = faPlus;
		const downIcon = faChevronDown;
		const upIcon = faChevronUp;
		const closeIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore();

		// sweetalert
		const Swal = useSwal();

		const { t } = useI18n({ useScope: 'global' });

		const displayAllW2WTotoal = ref(false);

		const tableIndex = ref(0);

		/**
		 * Computed
		 * *******************************************************************
		 */
		// get team members
		const teamMembers = computed(() => JSON.parse(JSON.stringify(store.getters['teamInvoice/getEditTeamMembersFromTeamImvoice'])));

		// get team details
		const getTeamDetails = computed(() => store.getters['teamInvoice/getEditTeamInvoiceDetail']);

		// get team payment sharing
		const getTeamPaymentSharing = computed(() => store.state.teamInvoice.editPaymentSharing);

		// calculate remaining work value of seeker
		const EremainingWorkValue = computed(() => index => store.getters['teamInvoice/editCalculateRemainingWorkValueOfSeeker'](index));

		// calculate gross salary of seeker
		const editCalculateGrossSalary = computed(() => index => store.getters['teamInvoice/editCalculateGrossSalaryOfSeeker'](index, props.vat));

		// calculate taxable amount of seeker
		const calculateTaxableAmount = computed(() => index => store.getters['teamInvoice/editCalculateTaxableAmountOfSeeker'](index));

		// calculate hours amount after tax of seeker
		const calculateHoursAmountAfterTax = computed(() => index => store.getters['teamInvoice/editCalculateHourAmountAfterTaxableAmountOfSeeker'](index));

		// calculate misb commision of seeker
		const calculateMISBCommision = computed(() => index => store.getters['teamInvoice/editCalculateMISBCommisionOfSeeker'](index));

		// calculate misb commision of seeker
		const calculateHealthInsurance = computed(() => index => store.getters['teamInvoice/editCalculateHealthInsuranceOfSeeker'](index));

		// calculate misb commision of seeker
		const calculateAccidentInsurance = computed(() => index => store.getters['teamInvoice/editCalculateAccidentInsuranceOfSeeker'](index));

		// calculate w2w commision of seeker
		const calculateW2WCommision = computed(() => index => store.getters['teamInvoice/editCalculateW2WCommisionOfSeeker'](index, props.vat));

		// calculate quick pay commision of seeker
		const calculateQuickPayCommision = computed(() => index => store.getters['teamInvoice/editCalculateQuickPayCommisionOfSeeker'](index, props.vat, props.quickPayStat));

		// calculate commision amount
		const calculateCommisionAmount = computed(() => index => store.getters['teamInvoice/editCalculateCommisionAmountOfSeeker'](index));

		// calculate total of seeker
		const calculateTotalOfSeeker = computed(() => index => store.getters['teamInvoice/editCalculateTotalOfSeeker'](index));

		// calculate share amount and share price
		const calculateShareAmountAndSharePrice = computed(() => store.getters['teamInvoice/editCalculateShareAmountAndSharePercentage']);

		// left to share amount
		const leftToShareAmount = computed(() => {
			const totalAllocatedAmount = getTeamPaymentSharing.value.reduce((acc, item) => acc + Number(item.shared_amount), 0);
			const totalWorkValue = teamMembers.value.reduce((acc, item) => acc + Number(item.total_work_amount), 0);
			const TotalSum = Math.round((totalWorkValue - Number(totalAllocatedAmount) + Number.EPSILON) * 10 ** 2) / 10 ** 2;
			return Number(TotalSum || 0.0);
		});

		const finalTotal = computed(() => {
			const initObj = { grossSalary: 0, taxbledAmount: 0, compensationAmount: 0, youWillBePaid: 0, invoiceTotal: 0, vatTotal: 0 };
			return (
				store.state.teamInvoice?.editTeamWorkDetailList?.invoice_seekers?.reduce((acc, item, index) => {
					acc.grossSalary += store.getters['teamInvoice/editCalculateGrossSalaryOfSeeker'](index);
					acc.taxbledAmount += store.getters['teamInvoice/editCalculateTaxableAmountOfSeeker'](index);
					acc.compensationAmount += Number(item.compensation_amount);
					acc.youWillBePaid += store.getters['teamInvoice/editCalculateTotalOfSeeker'](index);
					acc.invoiceTotal += (Number(item.worked_value) * (100 + Number(props.vat))) / 100;
					acc.vatTotal += (Number(item.worked_value) * Number(props.vat)) / 100;
					return acc;
				}, initObj) || initObj
			);
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// expand work details
		const expandWorkDetails = index => {
			if (expandRowIndex.value === index) {
				expandRowIndex.value = null;
				return false;
			}

			expandRowIndex.value = index;
		};

		// handle work detail amount change
		const handlePaymentSharing = (e, seekerId, index) => {
			const val = e.target.value;
			store.commit('teamInvoice/SET_STATE', {
				action: `editPaymentSharing[${index}]`,
				data: {
					seekerId,
					shared_amount: Number(val),
					shared_percentage: Math.round((Number(val) * 100) / getTeamDetails.value.sub_total),
				},
			});
		};

		//check box value
		const onTransported = () => {
			displayAllW2WTotoal.value = !displayAllW2WTotoal.value;
			return displayAllW2WTotoal.value;
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(teamMembers, () => {
			if (!teamMembers.value.length) {
				Swal.fire({
					text: 'No workdetail found in selected date range !',
					icon: 'error',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Ok',
				});
			}
		});

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		return {
			tableIndex,
			// ref
			t,
			expandRowIndex,
			displayAllW2WTotoal,

			// icon
			plusIcon,
			downIcon,
			upIcon,
			closeIcon,
			arrowDown,
			arrowUp,

			// computed
			teamMembers,
			getTeamDetails,
			getTeamPaymentSharing,
			leftToShareAmount,
			calculateShareAmountAndSharePrice,
			onTransported,
			finalTotal,
			EremainingWorkValue,
			editCalculateGrossSalary,
			calculateTaxableAmount,
			calculateHoursAmountAfterTax,
			calculateMISBCommision,
			calculateW2WCommision,
			calculateQuickPayCommision,
			calculateCommisionAmount,
			calculateTotalOfSeeker,
			calculateHealthInsurance,
			calculateAccidentInsurance,

			expandWorkDetails,
			handlePaymentSharing,
			openTable,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.paymentsharingList {
	.text-red {
		color: #ff4b57;
		font-weight: 500;
	}

	.plus {
		cursor: pointer;
		color: #ffff;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		border-radius: 50%;
		background-color: #ff4b57;
		border: 4px solid #ffe4e6;
	}

	.form-check-input {
		position: relative;
	}

	.form-check-input:checked {
		background-color: #565e64;
		border-color: #565e64;
	}

	.form-check-input:focus {
		border-color: #565e64;
	}

	.form-checkbox {
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-end;

		.form-checkbox-width {
			width: 1.4em;
			height: 1.4em;
			margin: 0 0 0 -30px;

			&:focus {
				box-shadow: none;
			}
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

	.details-head {
		background-color: #273238;
		padding: 10px 10px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.product-no,
	.member-name {
		width: 13%;
	}

	.role-member {
		width: 10%;
	}

	.share-value {
		width: 16%;
	}

	.Tax-value {
		width: 14%;
	}

	.allowances {
		width: 10%;
	}

	.payment {
		width: 10%;
	}

	.email-address {
		width: 20%;
	}

	.actions {
		width: 10%;
	}

	.details-head-text {
		color: #ffff;
		font-size: 16px;
	}

	.details-content {
		display: flex;
		align-items: center;
		padding: 15px;
		min-width: 900px;
		overflow: auto;

		.product-icon {
			min-width: 30%;
		}

		.product-width {
			width: 9%;

			.product-1 {
				font-size: 14px;
				display: inline-block;
				padding: 8px 25px;
				border-radius: 12px;
				border: 2px solid #e4e6e7;
			}

			.product-2 {
				background-color: #fff;
			}
		}

		.description-width {
			width: 22%;
		}

		.work-width {
			width: 23%;

			.work {
				width: 95%;
				padding: 10px;
				background-color: #f6f6f6;
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
			width: 16%;

			.work {
				width: 91%;
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
			cursor: pointer;
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
			width: 10%;
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
			width: 16%;
		}

		.discription {
			width: 22%;
		}

		.team-member {
			width: 21%;
		}
	}

	.total {
		background-color: #f9f9f9;
		border-radius: 20px;
		padding: 25px;

		.total-excl {
			width: 100%;
			display: flex;
			padding-bottom: 5px;
			justify-content: space-between;
			align-items: center;

			.text-total {
				color: #858a90;
				font-size: 14px;
			}

			.text-prize {
				font-size: 14px;
				font-weight: 500;
			}
		}

		.total-excl-border {
			border-bottom: 2px solid #dde0e2;
		}

		.total-bold-border {
			border-bottom: 4px solid #dde0e2;
			padding: 5px 0;
			border-top: 1px solid #dde0e2;

			.all-total {
				font-weight: 600;
			}

			.total-prize {
				color: #ff4b57;
				font-weight: 600;
			}
		}
	}

	.margin-top-5 {
		margin-top: 15px;
	}

	.bottom-header {
		background-color: $coloRed;
		padding: 10px;
		border-radius: 5px;
	}
}

.pph-left {
	h5 {
		font-size: 16px;
	}
}

.text-sm-fw {
	font-size: 16px;
	@media (max-width: 768px) {
		font-size: 14px;
	}
}

.min-w-auto {
	min-width: auto !important;
}
.responsive-table {
	.table-border {
		margin: 0;
		@media (max-width: 1024px) {
			overflow: visible;
		}
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
			width: 14%;
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
