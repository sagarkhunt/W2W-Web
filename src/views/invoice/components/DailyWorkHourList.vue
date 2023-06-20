<template>
	<div class="workHourList">
		<!-- daily work hour list title -->
		<div class="employer-details py-3">
			<div>
				<h5 class="title-lg">{{ t('workDetails.dailyWorkDetails') }}</h5>
			</div>
		</div>

		<div class="daily-work-row large-table">
			<div class="daily-work-col">
				<!-- daily work hour list - column name -->
				<div class="details-head text-center">
					<div class="product-no text-left">
						<p class="details-head-text">{{ t('workDetails.productNo') }}</p>
					</div>

					<div class="days">
						<p class="details-head-text">{{ t('fieldList.days') }}</p>
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

					<div class="actions">
						<p class="details-head-text">{{ t('workDetails.actions') }}</p>
					</div>
				</div>

				<!-- daily work hout list - row -->
				<div v-for="(item, index) in workDetailList" :key="index">
					<!-- current expanded row -->
					<div v-if="expandRowIndex === index">
						<div class="details-content">
							<!-- serial no. -->
							<div class="product-width">
								<div class="product-1">
									<p class="inpult-area">{{ index + 1 }}</p>
								</div>
							</div>

							<div class="multiple-day d-flex justify-content-center">
								<div class="work py-0" v-if="item.totalDays > 1">
									<span class="d-inline bg-danger text-white multi-rounded">{{ item.totalDays
									}}</span>
								</div>
								<div class="work py-0 text-center" v-else>
									-
								</div>
							</div>

							<!-- desciption Field Input -->
							<div class="work-width ml-xl-0">
								<div class="work py-0">
									<input type="text" :v-model="item.description == null ? '' : item.description"
										@change="e => handleContractValue(e, index, 'description')"
										class="form-control" />
								</div>
							</div>

							<!-- contract type -->
							<div class="hours-width">
								<div class="hours">
									<Multiselect id="contractType" class="form-group"
										@change="e => handleContractValue({ target: { value: e } }, index, 'contract_type')"
										v-model="item.contract_type"
										:options="contractTypeOptions.map(x => ({ ...x, label: t(x.label) }))"
										mode="single" :canDeselect="true" />
								</div>
							</div>

							<!-- contract value -->
							<div class="contractvalue-width">
								<div class="totalamount">
									<p>€</p>
									<input type="number" min="0" v-model="item.contract_value"
										@change="e => handleContractValue(e, index, 'contract_value')"
										class="inpult-area" v-on:keypress="NumbersOnly" @input="checkInputNuberValue" />
								</div>
							</div>

							<!-- quantity & unit -->
							<div class="totalamount-width">
								<div class="totalamount">
									<div class="mr-2 text-sm">
										<FontAwesomeIcon :icon="closeIcon" />
									</div>
									<input type="number" min="0" :value="item.total_work"
										@change="e => handleContractValue(e, index, 'total_work')" class="inpult-area"
										v-on:keypress="NumbersOnly" @input="checkInputNuberQty" />
								</div>
							</div>

							<!-- actions -->
							<div class="buttons">
								<!-- copy work detail -->
								<ToolTip :title="t('toolTip.duplicateRecord')">
									<div class="copy-btn" :class="{ btnDisabled: isDublicateInvoiceDisable(index) }"
										@click="duplicateWorkDetail(index)">
										<FontAwesomeIcon :icon="copyIcon" />
									</div>
								</ToolTip>

								<!-- remove work detail -->
								<ToolTip :title="t('toolTip.deleteRecord')">
									<div class="delete-btn mx-1" :class="{ btnDeletRow: workDetailList.length < 2 }"
										@click="removeWorkDetail(index, item.id)">
										<FontAwesomeIcon :icon="trashIcon" />
									</div>
								</ToolTip>

								<!-- expand work detail -->
								<ToolTip :title="t('toolTip.expantiate')">
									<div class="down-btn" v-if="index !== expandRowIndex"
										@click="expandWorkDetails(index, item.id)">
										<FontAwesomeIcon :icon="downIcon" />
									</div>
								</ToolTip>

								<!-- expand work detail -->
								<ToolTip :title="t('toolTip.expantiate')">
									<div class="down-btn" v-if="index === expandRowIndex" @click="sinkWorkDetails">
										<FontAwesomeIcon :icon="upIcon" />
									</div>
								</ToolTip>

								<!-- euro sign -->
								<ToolTip :title="t('toolTip.tripButton')">
									<div class="down-btn ms-1" :class="{ btnDisabled: workDetailBtnDisabled(index) }"
										@click="addWorkDetails(item.id, index)">
										<FontAwesomeIcon :icon="euroSign" />
									</div>
								</ToolTip>
							</div>
						</div>

						<!-- daily work hour list - row - expand -->
						<div class="opne-toggle" v-if="index === expandRowIndex">
							<div>
								<div class="row no-gutters m-n2">
									<div class="p-1 col-4">
										<div class="summary-box">
											<h1>{{ t('invoiceList.leInvoice.addInvoice.summaryCalculations') }}</h1>
										</div>
									</div>

									<!-- work detail expansion details -->
									<div class="p-1 col-8">
										<div class="dark-box">
											<div class="row no-gutters">
												<!-- allances title -->
												<div class="col-6">
													<ul>
														<!-- allowances -->
														<li class="fw-bold dark-box-text lh-lg">
															{{ t('workDetails.allowances') }}
														</li>

														<!-- part day allowances -->
														<li class="dark-box-text lh-lg">
															{{ t('workDetails.lunchCompensation') }}
														</li>

														<!-- full day allowances -->
														<li class="dark-box-text lh-lg">
															{{ t('workDetails.fullHalfCompensation') }}
														</li>

														<!-- food allowances -->
														<li class="dark-box-text lh-lg">
															{{ t('workDetails.otherCompensation') }}
														</li>

														<!-- kilometer allowances -->
														<li class="dark-box-text lh-lg">
															{{ t('workDetails.kilometerAllowances') }}
														</li>
														<span v-if="item.distance">
															<li v-if="item.transported_heavyloads"
																class="dark-box-text lh-lg">
																{{ t('workDetails.transportedHeavyLoad') }}
															</li>
															<li v-if="item.driven_in_rough_terrain"
																class="dark-box-text lh-lg">
																{{ t('workDetails.Driveninroughterrain') }}
															</li>
															<li v-if="item.vehicle_subclass"
																class="dark-box-text lh-lg">
																{{ t('workDetails.Trailer') }}
															</li>
														</span>
														<!-- total -->
														<li class="dark-box-text lh-lg fw-bold">
															{{ t('workDetails.total') }}
														</li>
													</ul>
												</div>

												<!-- allowances amount -->
												<div class="col-4">
													<ul>
														<!-- amount - header -->
														<li class="fw-bold dark-box-text lh-lg">
															{{ t('workDetails.Amount') }}
														</li>

														<!-- part day allowances - amount -->
														<li class="dark-box-text lh-lg">
															€
															{{ item.lunchCompensationAmount * item.totalDays || 0 }}
														</li>

														<!-- full day allowances - amount -->
														<li class="dark-box-text lh-lg">
															€
															{{ item.fullHalfDayCompensationAmount * item.totalDays || 0
															}}
														</li>

														<!-- food allowances - amount -->
														<li class="dark-box-text lh-lg">€ {{
																item.otherCompensationAmount || 0
														}}</li>

														<!-- kilometer allowances - amount -->
														<li class="dark-box-text lh-lg">
															€
															{{
																	Number(
																		(item.distance == null ? 0 : item.distance) *
																		invoiceAllownceTracer.distanceAllownce *
																		(item.totalDays == null ? 0 : item.totalDays),
																	).toFixed(2) || 0
															}}
														</li>
														<span v-if="item.distance">
															<li v-if="item.transported_heavyloads"
																class="dark-box-text lh-lg">
																€
																{{
																		item.transported_heavyloads == true ?
																			(invoiceAllownceTracer.transported_heavyloads *
																				item.distance * item.totalDays).toFixed(2) : 0
																}}
															</li>

															<li v-if="item.driven_in_rough_terrain"
																class="dark-box-text lh-lg">
																€
																{{
																		item.driven_in_rough_terrain == true
																			? (invoiceAllownceTracer.driven_in_rough_terrain *
																				item.distance * item.totalDays).toFixed(2)
																			: 0
																}}
															</li>

															<li v-if="item.vehicle_subclass"
																class="dark-box-text lh-lg">
																€
																{{ item.vehicle_subclass == true ?
																		(invoiceAllownceTracer.vehicle_subclass * item.distance
																			* item.totalDays).toFixed(2) : 0
																}}
															</li>
														</span>
													</ul>
												</div>

												<!-- allowances sum -->
												<div class="col-2">
													<ul>
														<!-- sum - header -->
														<li class="fw-bold dark-box-text lh-lg">
															{{ t('workDetails.sum') }}
														</li>

														<!-- part day allowances -->
														<li class="dark-box-text lh-lg">
															€
															{{ item.lunchCompensationAmount * item.totalDays || 0 }}
														</li>

														<!-- full day allowances -->
														<li class="dark-box-text lh-lg">
															€
															{{ item.fullHalfDayCompensationAmount * item.totalDays || 0
															}}
														</li>

														<!-- food allowances -->
														<li class="dark-box-text lh-lg">€ {{
																item.otherCompensationAmount || 0
														}}</li>

														<!-- kilometer allowances -->
														<li class="dark-box-text lh-lg">
															€
															{{
																	Number(
																		(item.distance == null ? 0 : item.distance) *
																		invoiceAllownceTracer.distanceAllownce *
																		(item.totalDays == null ? 0 : item.totalDays),
																	).toFixed(2) || 0
															}}
														</li>
														<span v-if="item.distance">
															<li v-if="item.transported_heavyloads"
																class="dark-box-text lh-lg">
																€
																{{
																		item.transported_heavyloads == true ?
																			(invoiceAllownceTracer.transported_heavyloads *
																				item.distance * item.totalDays).toFixed(2) : 0
																}}
															</li>

															<li v-if="item.driven_in_rough_terrain"
																class="dark-box-text lh-lg">
																€
																{{
																		item.driven_in_rough_terrain == true
																			? (invoiceAllownceTracer.driven_in_rough_terrain *
																				item.distance * item.totalDays).toFixed(2)
																			: 0
																}}
															</li>

															<li v-if="item.vehicle_subclass"
																class="dark-box-text lh-lg">
																€
																{{ item.vehicle_subclass == true ?
																		(invoiceAllownceTracer.vehicle_subclass * item.distance
																			* item.totalDays).toFixed(2) : 0
																}}
															</li>
														</span>

														<!-- total - allowances -->
														<li class="fw-bold dark-box-text lh-lg">€ {{
																Number(finalTotal(item)).toFixed(2)
														}}</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- other rows -->
					<div v-else>
						<div class="details-content">
							<!-- serial no. -->
							<div class="product-width">
								<div class="product-1">
									<p class="inpult-area">{{ index + 1 }}</p>
								</div>
							</div>

							<div class="multiple-day d-flex justify-content-center">
								<div class="work py-0" v-if="item.totalDays > 1">
									<span class="d-inline bg-danger text-white multi-rounded">{{ item.totalDays
									}}</span>
								</div>
								<div class="work py-0 text-center" v-else>
									-
								</div>
							</div>

							<!-- desciptionField -->
							<div class="work-width ml-xl-0 ml-3">
								<div class="work py-0">
									<input type="text" v-model="item.description"
										@change="e => handleContractValue(e, index, 'description')"
										class="form-control" />
								</div>
							</div>

							<!-- contract type -->
							<div class="hours-width">
								<div class="hours">
									<Multiselect id="contractType" class="form-group"
										@change="e => handleContractValue({ target: { value: e } }, index, 'contract_type')"
										v-model="item.contract_type"
										:options="contractTypeOptions.map(x => ({ ...x, label: t(x.label) }))"
										mode="single" :canDeselect="true" />
								</div>
							</div>

							<!-- contract value -->
							<div class="contractvalue-width">
								<div class="totalamount">
									<p>€</p>
									<input type="number" min="0" v-model="item.contract_value"
										@change="e => handleContractValue(e, index, 'contract_value')"
										class="inpult-area" v-on:keypress="NumbersOnly" @input="checkInputNuberValue" />
								</div>
							</div>

							<!-- quantity & unit -->
							<div class="totalamount-width">
								<div class="totalamount">
									<div class="mr-2 text-sm">
										<FontAwesomeIcon :icon="closeIcon" />
									</div>
									<input type="number" v-model="item.total_work"
										@change="e => handleContractValue(e, index, 'total_work')" class="inpult-area"
										v-on:keypress="NumbersOnly" @input="checkInputNuberQty" />
								</div>
							</div>

							<!-- actions -->
							<div class="buttons">
								<!-- copy work detail -->
								<ToolTip :title="t('toolTip.duplicateRecord')">
									<div class="copy-btn" :class="{ btnDisabled: isDublicateInvoiceDisable(index) }"
										@click="duplicateWorkDetail(index)">
										<FontAwesomeIcon :icon="copyIcon" />
									</div>
								</ToolTip>

								<!-- remove work detail -->
								<ToolTip :title="t('toolTip.deleteRecord')">
									<div class="delete-btn mx-1" :class="{ btnDeletRow: workDetailList.length < 2 }"
										@click="removeWorkDetail(index, item.id)">
										<FontAwesomeIcon :icon="trashIcon" />
									</div>
								</ToolTip>

								<!-- expand work detail -->
								<ToolTip :title="t('toolTip.expantiate')">
									<div class="down-btn me-1" v-if="index !== expandRowIndex"
										@click="expandWorkDetails(index, item)">
										<FontAwesomeIcon :icon="downIcon" />
									</div>
								</ToolTip>

								<!-- open in work dairies -->
								<ToolTip :title="t('toolTip.tripButton')">
									<div class="down-btn me-1" :class="{ btnDisabled: workDetailBtnDisabled(index) }"
										@click="addWorkDetails(item.id, index)">
										<FontAwesomeIcon :icon="euroSign" />
									</div>
								</ToolTip>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="attachment-table responsive-table ">
			<div class="mb-3" v-for="(item, index) in workDetailList" :key="index">
				<div class="d-flex align-items-center justify-content-between position-relative collapse-div px-3 pt-3">
					<div class="msg-info">
						<img src="~@/assets/images/required-hint.png" alt="img" class="img-fluid info_icon" />
						<span class="msg-info-number">{{ index + 1 }}</span>
					</div>
					<div class="d-flex">
						<div class="expand-daily-table-header">
							<div class="mx-0">
								<div class="d-flex align-items-center">
									<div class="pe-0 mb-sm-0 mb-2 w-100">
										<div class="product-2">
											<span v-if="item.workdetail_createdat_type == 'detailadded'">{{
													dateFormat(item.workdetail_created_at)
											}}</span>
											<span v-else>{{ item.workdetail_created_at }}</span>
											<!-- {{ dateFormat(item.workdetail_created_at) }} -->
											<!-- <input type="text" v-model="item.created_at"
												class="inpult-area" /> -->
										</div>
									</div>
									<!-- actions -->
									<div class="pe-0 ps-lg-2 ms-2 mb-sm-0 mb-2">
										<div class="buttons d-flex align-items-center justify-content-sm-between">
											<div class="copy-btn btnDisabled remove-pointer-events me-0"
												@click="openTable(index, item)">
												<a>
													<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== index"
														class="arrowIcon" />
												</a>

												<a>
													<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === index"
														class="arrowIcon" />
												</a>
											</div>

											<ToolTip class="ms-1" :title="t('toolTip.tripButton')">
												<div class="down-btn"
													:class="{ btnDisabled: workDetailBtnDisabled(index) }"
													@click="addWorkDetails(item.id, index)">
													<FontAwesomeIcon :icon="euroSign" />
												</div>
											</ToolTip>
											<!-- copy work detail -->
											<ToolTip class="ms-1" :title="t('toolTip.duplicateRecord')">
												<div class="copy-btn me-0"
													:class="{ btnDisabled: isDublicateInvoiceDisable(index) }"
													@click="duplicateWorkDetail(index)">
													<FontAwesomeIcon :icon="copyIcon" />
												</div>
											</ToolTip>

											<!-- remove work detail -->
											<ToolTip class="ms-1" :title="t('toolTip.deleteRecord')">
												<div class="delete-btn me-0"
													:class="{ btnDeletRow: workDetailList.length < 2 }"
													@click="removeWorkDetail(index, item.id)">
													<FontAwesomeIcon :icon="trashIcon" />
												</div>
											</ToolTip>
										</div>
									</div>
								</div>
								<!-- <div class="col-sm-1 col-2 max-w-40 pe-0 ps-0 mb-sm-0 mb-2">
									<p class="text-center">{{ t('workDetails.productNo') }}</p>
									<div class="row-1 max-w-40 px-3">
										<p class="inpult-area">{{ index + 1 }}</p>
									</div>
								</div>

								<div class="col-sm-1 max-w-60 col-2 pe-0 ps-2 mb-sm-0 mb-2">
									<p class="">{{ t('fieldList.days') }}</p>
									<div class="product-1">
										<div class="py-0" v-if="item.totalDays > 1">
											<p class="inpult-area d-inline bg-danger text-white multi-rounded">
												{{ item.totalDays }}
											</p>
										</div>
										<div class="work py-0" v-else>
											-
										</div>
									</div>
								</div> -->
								<div class="d-flex align-items-center py-sm-2">
									<!-- contract type -->
									<div class="responsive-col-2 add-min-w pe-0 mb-sm-0 mb-2">
										<div class="hours">
											<Multiselect id="contractType" class="form-group"
												@change="e => handleContractValue({ target: { value: e } }, index, 'contract_type')"
												v-model="item.contract_type"
												:options="contractTypeOptions.map(x => ({ ...x, label: t(x.label) }))"
												mode="single" :canDeselect="true" />
										</div>
									</div>

									<!-- contract value -->
									<div class="pe-0 ms-2 mb-sm-0 mb-2">
										<div class="product-2 d-flex">
											<span class="mr-2">€</span>
											<input type="number" min="0" v-model="item.contract_value"
												@change="e => handleContractValue(e, index, 'contract_value')"
												class="inpult-area" v-on:keypress="NumbersOnly"
												@input="checkInputNuberValue" />
										</div>
									</div>

									<!-- quantity & unit -->
									<div class="pe-0 ps-lg-2 ps-sm-2 ps-0 ms-2 mb-sm-0 mb-2">
										<div class="product-2 d-flex">
											<div class="mr-2 text-sm">
												<FontAwesomeIcon :icon="closeIcon" />
											</div>
											<input type="number" min="0" :value="item.total_work"
												@change="e => handleContractValue(e, index, 'total_work')"
												class="inpult-area" v-on:keypress="NumbersOnly"
												@input="checkInputNuberQty" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="expand-daily-table px-3">
					<div v-if="index == tableIndex">
						<div v-if="expandRowIndex === index">
							<div class="row align-items-end mb-3 mx-0">
								<div class="col-12 px-0">
									<div class="work-width ml-xl-0 mb-2">
										<div class="work py-0">
											<input type="text" :placeholder="
												t('validation.enterField', {
													field: 'placeholder.descriptionMandate',
												})
											" v-model="item.description" @change="e => handleContractValue(e, index, 'description')"
												class="form-control" />
										</div>
									</div>
								</div>
								<div class="col-sm-8 col-12 pe-0 ps-0 mb-sm-0 mb-2">
									<!-- <p class="">{{ t('workDetails.work_description') }}</p> -->
									<div class="d-flex align-items-center">
										<div class="hours min-w-150 vat_text">
											<Multiselect id="rowVat" class="form-group"
												@change="e => handleContractValue({ target: { value: e } }, index, 'vat_value')"
												v-model="item.vat_value" :options="vatTypeOptions" mode="single"
												:canDeselect="true" />
										</div>
										<div
											class="d-flex align-items-center justify-content-between work_value w-100 ms-2">
											<p>{{ t('invoiceList.leInvoice.addInvoice.workValue') }}</p>
											<p>€ {{ item.total_work_value }}</p>
										</div>
									</div>
								</div>
								<div class="col-sm-4 col-12 pe-0 ps-sm-2 ps-0">
									<div class="summary-box">
										<div class="down-btn d-flex align-items-center justify-content-between "
											v-if="index !== expandRowIndex" @click="expandWorkDetails(index, item)">
											<p class="">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
											<ToolTip :title="t('toolTip.expantiate')">
												<FontAwesomeIcon :icon="downIcon" />
											</ToolTip>
										</div>

										<div class="down-btn d-flex align-items-center justify-content-between"
											v-if="index === expandRowIndex" @click="sinkWorkDetails">
											<p>{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
											<ToolTip :title="t('toolTip.expantiate')">
												<FontAwesomeIcon :icon="upIcon" />
											</ToolTip>
										</div>
									</div>
								</div>
							</div>
							<div class="opne-toggle" v-if="index === expandRowIndex">
								<div class="dark-box mx-4">
									<div class="row no-gutters">
										<!-- allances title -->
										<div class="col-6">
											<ul>
												<!-- allowances -->
												<li class="fw-bold dark-box-text lh-lg">
													{{ t('workDetails.allowances') }}
												</li>

												<!-- part day allowances -->
												<li class="dark-box-text lh-lg">
													{{ t('workDetails.lunchCompensation') }}
												</li>

												<!-- full day allowances -->
												<li class="dark-box-text lh-lg">
													{{ t('workDetails.fullHalfCompensation') }}
												</li>

												<!-- food allowances -->
												<li class="dark-box-text lh-lg">
													{{ t('workDetails.otherCompensation') }}
												</li>

												<!-- kilometer allowances -->
												<li class="dark-box-text lh-lg">
													{{ t('workDetails.kilometerAllowances') }}
												</li>
												<span v-if="item.distance">
													<li v-if="item.transported_heavyloads" class="dark-box-text lh-lg">
														{{ t('workDetails.transportedHeavyLoad') }}
													</li>
													<li v-if="item.driven_in_rough_terrain" class="dark-box-text lh-lg">
														{{ t('workDetails.Driveninroughterrain') }}
													</li>
													<li v-if="item.vehicle_subclass" class="dark-box-text lh-lg">
														{{ t('workDetails.Trailer') }}
													</li>
												</span>
												<!-- total -->
												<li class="dark-box-text lh-lg fw-bold">{{ t('workDetails.total') }}
												</li>
											</ul>
										</div>
										<!-- allowances amount -->
										<div class="col-4">
											<ul>
												<!-- amount - header -->
												<li class="fw-bold dark-box-text lh-lg">
													{{ t('workDetails.Amount') }}
												</li>
												<!-- part day allowances - amount -->
												<li class="dark-box-text lh-lg">€ {{ item.lunchCompensationAmount || 0 *
														item.totalDays || 0
												}}</li>
												<!-- full day allowances - amount -->
												<li class="dark-box-text lh-lg">
													€
													{{ item.fullHalfDayCompensationAmount || 0 * item.totalDays || 0 }}
												</li>
												<!-- food allowances - amount -->
												<li class="dark-box-text lh-lg">€ {{ item.otherCompensationAmount || 0
												}}</li>
												<!-- kilometer allowances - amount -->
												<li class="dark-box-text lh-lg">
													€
													{{
															Number(
																(item.distance == null ? 0 : item.distance) *
																invoiceAllownceTracer.distanceAllownce * (item.totalDays == null ? 0
																	: item.totalDays),
															).toFixed(2) || 0
													}}
												</li>
												<span v-if="item.distance">
													<li v-if="item.transported_heavyloads" class="dark-box-text lh-lg">
														€
														{{ item.transported_heavyloads == true ?
																(invoiceAllownceTracer.transported_heavyloads * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>

													<li v-if="item.driven_in_rough_terrain" class="dark-box-text lh-lg">
														€
														{{ item.driven_in_rough_terrain == true ?
																(invoiceAllownceTracer.driven_in_rough_terrain * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>

													<li v-if="item.vehicle_subclass" class="dark-box-text lh-lg">
														€
														{{ item.vehicle_subclass == true ?
																(invoiceAllownceTracer.vehicle_subclass * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>
												</span>
											</ul>
										</div>

										<!-- allowances sum -->
										<div class="col-2">
											<ul>
												<!-- sum - header -->
												<li class="fw-bold dark-box-text lh-lg">{{ t('workDetails.sum') }}</li>

												<!-- part day allowances -->
												<li class="dark-box-text lh-lg">
													€
													{{ item.lunchCompensationAmount || 0 * item.totalDays || 0 }}
												</li>
												<!-- full day allowances -->
												<!-- food allowances -->
												<li class="dark-box-text lh-lg">€ {{ item.otherCompensationAmount || 0
												}}</li>
												<!-- kilometer allowances -->
												<li class="dark-box-text lh-lg">
													€
													{{
															Number(
																(item.distance == null ? 0 : item.distance) *
																invoiceAllownceTracer.distanceAllownce * (item.totalDays == null ? 0
																	: item.totalDays),
															).toFixed(2) || 0
													}}
												</li>
												<span v-if="item.distance">
													<li v-if="item.transported_heavyloads" class="dark-box-text lh-lg">
														€
														{{ item.transported_heavyloads == true ?
																(invoiceAllownceTracer.transported_heavyloads * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>

													<li v-if="item.driven_in_rough_terrain" class="dark-box-text lh-lg">
														€
														{{ item.driven_in_rough_terrain == true ?
																(invoiceAllownceTracer.driven_in_rough_terrain * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>

													<li v-if="item.vehicle_subclass" class="dark-box-text lh-lg">
														€
														{{ item.vehicle_subclass == true ?
																(invoiceAllownceTracer.vehicle_subclass * item.distance *
																	item.totalDays).toFixed(2) : 0
														}}
													</li>
												</span>

												<!-- total - allowances -->
												<li class="fw-bold dark-box-text lh-lg">€ {{
														Number(finalTotal(item)).toFixed(2)
												}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="row align-items-end me-0 mb-3 mx-0">
								<div class="col-12 px-0">
									<div class="work-width ml-xl-0 mb-2">
										<div class="work py-0">
											<input type="text" :placeholder="
												t('validation.enterField', {
													field: 'placeholder.descriptionMandate',
												})
											" v-model="item.description" @change="e => handleContractValue(e, index, 'description')"
												class="form-control" />
										</div>
									</div>
								</div>
								<div class="col-sm-8 col-12 pe-0 ps-0 mb-sm-0 mb-2">
									<!-- <p class="">{{ t('workDetails.work_description') }}</p> -->
									<div class="d-flex align-items-center">
										<div class="hours min-w-150 vat_text">
											<Multiselect id="contractType" class="form-group" v-model="item.vat_value"
												@change="e => handleContractValue({ target: { value: e } }, index, 'vat_value')"
												:options="vatTypeOptions" mode="single" :canDeselect="true" />
										</div>
										<div
											class="d-flex align-items-center justify-content-between work_value w-100 ms-2">
											<p>{{ t('invoiceList.leInvoice.addInvoice.workValue') }}</p>
											<p>€ {{ item.total_work_value }}</p>
										</div>
									</div>
								</div>
								<div class="col-sm-4 col-12 pe-0 ps-sm-2 ps-0">
									<div class="summary-box">
										<!-- expand work detail -->
										<div class="down-btn d-flex align-items-center justify-content-between"
											v-if="index !== expandRowIndex" @click="expandWorkDetails(index, item)">
											<p>{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
											<ToolTip :title="t('toolTip.expantiate')">
												<FontAwesomeIcon :icon="downIcon" />
											</ToolTip>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-auto">
			<div class="bottom-header d-lg-flex align-items-center justify-content-between my-3 gap-5">
				<div class="pph-left mb-lg-0 mb-2">
					<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.summary') }}</h5>
				</div>
				<div class="d-sm-flex align-items-center ml-md-auto flex-md-wrap flex-wrap gap-4">
					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.grossAmount') }}</p>
						<p class="text-sm-fw">
							€
							{{ GrossSalary ? GrossSalary : 0 }}
						</p>
					</div>

					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.withholdingTax') }}</p>
						<p class="text-sm-fw">€ {{ TaxbledAmount ? TaxbledAmount : 0 }}</p>
					</div>

					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.compensations') }}</p>
						<p class="text-sm-fw">€ {{ Number(compensationAmount).toFixed(2) || 0 }}</p>
					</div>

					<div class="text-white">
						<p class="{{'text-sm-fw'|translate}}">{{ t('invoiceList.leInvoice.addInvoice.willpaid') }}</p>
						<p class="text-sm-fw">€ {{ Number(youWillBePaid).toFixed(2) || 0 }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-auto">
			<div class="bottom-header d-lg-flex align-items-center justify-content-between gap-5">
				<div class="pph-left mb-lg-0 mb-2">
					<h5 class="text-white">{{ t('invoiceList.leInvoice.addInvoice.recipient') }}</h5>
				</div>
				<div class="d-sm-flex align-items-center ml-md-auto flex-md-wrap flex-wrap gap-4">
					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.invoiceTotal') }}</p>
						<p class="text-sm-fw">€ {{ Number(invoiceTotal).toFixed(2) || 0.0 }}</p>
					</div>

					<div class="text-white mb-sm-0 mb-2">
						<p class="text-sm-fw">{{ t('invoiceList.leInvoice.addInvoice.VATAmount') }}</p>
						<p class="text-sm-fw">€ {{ vatTotal || 0 }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-2">
			<div class="col-md-5">
				<div class="d-flex align-items-center">
					<ToolTip :title="t('toolTip.addNewTrip')">
						<div class="plus" @click="addNewWorkDetail">
							<FontAwesomeIcon :icon="plusIcon" />
						</div>
					</ToolTip>
					<div>
						<h5 class="grey-light">{{ t('workDetails.addNewRow') }}</h5>
					</div>
				</div>
			</div>

			<div class="col-md-7 col-12 md:ml-auto xs:ml-0 mt-2 debug-design">
				<div class="form-check form-checkbox">
					<input class="form-check-input form-checkbox-width" type="checkbox" id="debugcalculation"
						:checked="displayAllW2WTotoal" :value="displayAllW2WTotoal.value"
						:v-model="displayAllW2WTotoal.value" @click="onTransported($event)" />
					<label class="form-check-label extras-font ml-2" for="debugcalculation">{{
							t('invoiceList.leInvoice.addInvoice.debugCal')
					}}</label>
				</div>

				<!-- total work detail info -->
				<div v-if="displayAllW2WTotoal">
					<!-- total work -->
					<div class="total">
						<div class="total-excl">
							<p class="text-total">{{ t('workDetails.totalWorkValue') }}</p>
							<p class="text-prize">
								€
								{{ calculateTotalWithoutVat }}
							</p>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.grossSalary') }}</p>
								<p class="text-prize">
									€
									{{ GrossSalary ? GrossSalary : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.vatAddedVal')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('workDetails.kilometres') }}</p>
								<p class="text-prize">
									€
									{{ Kilometres ? Kilometres : 0 }}
								</p>
							</div>
							<div class="total-excl">
								<p class="text-total">{{ t('workDetails.fullHalfCompensationAllowances') }}</p>
								<p class="text-prize">
									€
									{{ FullHalfDayAllowances ? FullHalfDayAllowances : 0 }}
								</p>
							</div>
							<div class="total-excl">
								<p class="text-total">{{ t('workDetails.mealAllowances') }}</p>
								<p class="text-prize">
									€
									{{ MealAllowances ? MealAllowances : 0 }}
								</p>
							</div>
							<div class="total-excl">
								<p class="text-total">{{ t('workDetails.otherExpenses') }}</p>
								<p class="text-prize">
									€
									{{ OtherExpenses ? OtherExpenses : 0 }}
								</p>
							</div>
							<div class="total-excl">
								<p class="text-total">{{ t('workDetails.totalCompensation') }}</p>
								<p class="text-prize">
									€
									{{ totalCompensationField.value ? totalCompensationField.value : 0 }}
								</p>
							</div>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{
										t('invoiceList.leInvoice.addInvoice.grossAfterCompensationDeduct')
								}}</p>
								<p class="text-prize">
									€
									{{ grossAfterCompensationDeduct ? grossAfterCompensationDeduct : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.workValuesCompe')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.taxAmount') }}</p>
								<p class="text-prize">
									€
									{{ TaxbledAmount ? TaxbledAmount : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.prTaxGrossSalary')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.grossAfterTax') }}</p>
								<p class="text-prize">
									€
									{{ hoursAmountAfterTax ? hoursAmountAfterTax.toFixed(2) : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.grossAfterTaxFormula')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.health_insurance') }}</p>
								<p class="text-prize">
									€
									{{ healthInsuarnceonAmount ? healthInsuarnceonAmount : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.healthAmtFormula')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.accident_insurance_amount')
								}}</p>
								<p class="text-prize">
									€
									{{ accidentInsuranceAmount ? accidentInsuranceAmount : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.accidentAmtFormula')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.W2WAmt') }}</p>
								<p class="text-prize">
									€
									{{ w2wCommissionAmount ? w2wCommissionAmount : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.W2WAmtFormula')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.commissionAmt') }}</p>
								<p class="text-prize">
									€
									{{ CommitionAmount ? CommitionAmount : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.commissionAmtFormula')
							}})</span>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.dedAmt') }}</p>
								<p class="text-prize">
									€
									{{ deducationAmount ? deducationAmount : 0 }}
								</p>
							</div>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{ t('invoiceList.leInvoice.addInvoice.quickpayAmt') }}</p>
								<p class="text-prize">
									€
									{{ quickpayAmount ? quickpayAmount : 0 }}
								</p>
							</div>
						</div>

						<div class="text-end margin-top-5">
							<div class="total-excl">
								<p class="text-total">{{
										t('invoiceList.leInvoice.addInvoice.willBePaidWithoutAddedAllowance')
								}}</p>
								<p class="text-prize">
									€
									{{ willBePaidWithoutAddedAllowance ? willBePaidWithoutAddedAllowance : 0 }}
								</p>
							</div>
						</div>

						<div class="text-end margin-top-5 total-bold-border">
							<div class="total-excl">
								<p class="all-total">{{ t('invoiceList.leInvoice.addInvoice.willBePaid') }}</p>
								<p class="total-prize">
									€
									{{ subTotalField.value ? Number(subTotalField.value).toFixed(2) : 0 }}
								</p>
							</div>
							<span class="text-xs d-block">({{ t('invoiceList.leInvoice.addInvoice.totalFormula')
							}})</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Upload my document -->
	<Suspense v-if="workDeatilsModal">
		<template #default>
			<work-details-modal v-model:isModalShow="workDeatilsModal" :indexId="indexId" :addNewItem="addNewItem"
				@modalFlag="updateFlag" @workDetails="workDetails" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { onMounted, ref, computed, watch, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faCopy, faTrashAlt, faChevronDown, faChevronUp, faEuroSign, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Multiselect from '@vueform/multiselect';
import { contractTypeOptions, vatTypeOptions, invoiceAllownceTracer } from '@/utils/enums.js';
import { useSwal } from '@/components/sweetalert'; // sw eetalert2
import { useForm, useField } from 'vee-validate';
import { reactive } from '@vue/reactivity';
import * as yup from 'yup';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { useI18n } from 'vue-i18n';
import emitter from '@/helpers/eventHub';
import { dateFormat } from '@/utils/mixins';
import { useToast } from 'vue-toastification';

const WorkDetailsModal = defineAsyncComponent(async () => {
	return import('@/views/invoice/components/WorkDetailModal.vue' /* WorkDetailModal:"WorkDetailModal" */);
});

export default {
	name: 'DailyWorkHourList',

	components: {
		FontAwesomeIcon,
		Multiselect,
		WorkDetailsModal,
		DefaultLoader,
	},

	props: {
		formFields: Object,
	},

	setup(props) {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const workDetailList = ref([]);
		const formFieldsData = ref(props.formFields);
		const defaultWorkDetails = {
			workdetail_createdat_type: 'detailadded',
			workdetail_created_at: new Date(),
			contract_type: 'hours',
			contract_value: 0,
			date: null,
			day_compensation: null,
			description: null,
			distance: null,
			driven_in_rough_terrain: false,
			lunch_compensation: null,
			other_compensation: null,
			teamId: 0,
			total_work: 0,
			transported_heavyloads: false,
			transported_workload: false,
			trip_calculate_time: null,
			trip_end_address: null,
			trip_end_date: null,
			trip_end_time: null,
			trip_name: null,
			trip_start_address: null,
			trip_start_date: null,
			trip_start_time: null,
			vehicleCheckBoxValue: null,
			vehicle_class: null,
			vehicle_number: null,
			vehicle_subclass: false,
			vat_value: null,
			total_work_value: null
		};
		const expandRowIndex = ref(null);
		const expandRowId = ref(null);
		const vatValue = ref(null);
		const plusIcon = faPlus;
		const copyIcon = faCopy;
		const trashIcon = faTrashAlt;
		const downIcon = faChevronDown;
		const downArrowIcon = faChevronDown;
		const saveIcon = faSave;
		const upIcon = faChevronUp;
		const euroSign = faEuroSign;
		const closeIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		const isWorkDetailsModal = ref(false);
		const workDeatilsModal = ref(false);
		const indexId = ref(null);
		const addNewItem = ref(null);
		const displayAllW2WTotoal = ref(false);

		const TaxbledAmount = ref(null);
		const CommitionAmount = ref(null);
		const deducationAmount = ref(null);
		const quickpayAmount = ref(null);
		const misbCommissionAmount = ref(null);
		const healthInsuarnceonAmount = ref(null);
		const accidentInsuranceAmount = ref(null);
		const w2wCommissionAmount = ref(null);
		const VatAddedValue = ref(null);
		const GrossSalary = ref(null);
		const Kilometres = ref(null);
		const FullHalfDayAllowances = ref(null);
		const MealAllowances = ref(null);
		const OtherExpenses = ref(null);
		const grossAfterCompensationDeduct = ref(null);
		const hoursAmountAfterTax = ref(null);
		const totalWorkValue = ref(null);

		const compensationAmount = ref(null);
		const youWillBePaid = ref(null);
		const invoiceTotal = ref(null);
		const vatTotal = ref(null);
		const dueDate = ref(null);
		const willBePaidWithoutAddedAllowance = ref(null);

		const tableIndex = ref(0);

		// global store
		const store = useStore(); // use state

		// sweetalert
		const Swal = useSwal();

		// toast
		const toast = useToast();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch work details
			workDetails();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		const calculateSubTotal = computed(() => {
			return item => {
				const total = item.contract_value * item.total_work + (item.contract_value * item.total_work) / 100;

				return Math.floor(total * 100) / 100;
			};
		});

		const tripTimeCalc = computed(() => {
			const timeDiff = moment.duration(moment(tripEndField.value).diff(moment(tripStartField.value)));
			return timeDiff.asHours();
		});

		// sub total of all item without vat
		const calculateTotalWithoutVat = computed(() => {
			const subTotal = workDetailList.value.reduce((acc, item) => {
				const total = item.contract_value * item.total_work;

				acc += total || 0;
				return acc;
			}, 0);
			return Math.floor(subTotal * 100) / 100;
		});

		// calculate vat from subTotal
		const calculateVat = computed(() => {
			return (calculateTotalWithoutVat.value * 0) / 100;
		});

		// sub total of all item with vat
		const calculatgeTotalWithVat = computed(() => {
			const subTotalWithoutVat = calculateTotalWithoutVat.value;
			return subTotalWithoutVat + calculateVat.value;
		});

		const isDisableCompensation = computed(() => {
			if (fullHalfDatCompensationField.value > 0) {
				lunchCompensationField.value == 0;
				otherCompensationField.value == 0;
				return true;
			}

			return false;
		});

		const dayCompensationDisable = computed(() => {
			if (lunchCompensationField.value || otherCompensationField.value > 0) {
				fullHalfDatCompensationField.value == 0;
				return true;
			}
			return false;
		});

		//select workin details in work dairies or not
		const workId = computed(() => {
			return localStorage.getItem('invoiceWorkDetails') ?? [];
		});

		//distance killo
		const totalDistanceKilloMeter = computed(() => {
			return distanceField.value * invoiceAllownceTracer.distanceAllownce;
		});

		//total calculation
		const finalTotal = computed(() => {
			return data => {
				const drivenInRoughTerrainVal = data.driven_in_rough_terrain == true ? invoiceAllownceTracer.driven_in_rough_terrain * data.distance * data.totalDays : 0;

				const transportedHeavyloadsVal = data.transported_heavyloads == true ? invoiceAllownceTracer.transported_heavyloads * data.distance * data.totalDays : 0;

				const vehicleSubclassVal = data.vehicle_subclass == true ? invoiceAllownceTracer.vehicle_subclass * data.distance * data.totalDays : 0;

				const AddDistance = data.distance == 0 ? 0 : Number(data.distance * invoiceAllownceTracer.distanceAllownce * data.totalDays).toFixed(2);

				const dayAmount = data.day_compensation == null ? 0 : Number(data.fullHalfDayCompensationAmount * data.totalDays);

				const lunchAmount = data.lunch_compensation == null ? 0 : Number(data.lunchCompensationAmount * data.totalDays);

				return (
					Number(dayAmount) +
					Number(lunchAmount) +
					Number(data.otherCompensationAmount) +
					(AddDistance == 0 ? 0 : drivenInRoughTerrainVal) +
					(AddDistance == 0 ? 0 : transportedHeavyloadsVal) +
					(AddDistance == 0 ? 0 : vehicleSubclassVal) +
					Number(AddDistance) || 0
				);
			};
		});

		const invoiceWorkDetailList = computed(() => store.getters['workDetail/getInvoicesWorkDetails']);

		//work details array
		const workDetailsArray = computed(() => {
			let workedIds = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];
			const workObj = [];
			if (workedIds) {
				workObj.value = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			} else {
				workObj.value = store.state.invoice.workDeatilsObj;
			}
			return workObj;
		});
		// work details modal disabled
		const workDetailBtnDisabled = computed(() => {
			return index => {
				const x = workDetailList.value[index];

				if (!x.contract_value || x.contract_value === 0) {
					return true;
				}

				if (!x.total_work || x.total_work === 0) {
					return true;
				}

				return false;
			};
		});

		const isDublicateInvoiceDisable = computed(() => {
			return index => {
				if ([null, '', 0].includes(workDetailList.value[index].contract_value) || [null, '', 0].includes(workDetailList.value[index].total_work)) {
					return true;
				}

				return false;
			};
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// handle work detail amount change
		const handleContractValue = (e, index, textType) => {
			const val = e.target.value;
			const workDataList = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];

			workDataList[index][textType] = val ?? 0;
			if (textType === 'contract_type' && e.target.value === 'pieces') {
				workDataList[index]['total_work'] = 1;
			}


			// set the new vat calculate
			if (textType === 'vat_value' || textType === 'contract_value' || textType === 'total_work') {
				workDataList[index]['total_work_value'] = ((Number(workDataList[index]['contract_value']) * Number(workDataList[index]['total_work'])) * (100 + Number(workDataList[index]['vat_value'])) / 100)

			}

			localStorage.setItem('workDetails', JSON.stringify(workDataList));
			console.log(localStorage.getItem('workDetails'))
			workDetailList.value = workDataList;

			const isExist = workDataList.find(x => {
				if (!x.contract_value || x.contract_value === 0) {
					return true;
				}

				if (!x.total_work || x.total_work === 0) {
					return true;
				}

				return false;
			});
			if (isExist) {
				return false;
			}

			updateInvoiceCalculation();
		};

		const addWorkDetails = (id, index) => {
			let dairiesField = {
				description: desciptionField.value,
				contract_type: contactTypeField.value,
				contract_value: contractValueField.value,
				distance: distanceField.value,
				lunch_compensation: lunchCompensationField.value,
				full_compensation: fullHalfDatCompensationField.value,
				other_compensation: otherCompensationField.value,
				work_description: workDescriptionField.value,
				total_work: hoursUnitField.value,
			};

			store.commit('invoice/SET_STATE', {
				action: 'invoiceWorkDairiesDetail',
				data: dairiesField,
			});
			indexId.value = index ?? null;
			workDeatilsModal.value = true;
		};

		//check box value
		const onTransported = () => {
			displayAllW2WTotoal.value = !displayAllW2WTotoal.value;
			return displayAllW2WTotoal.value;
		};

		// work details
		const workDetails = () => {

			const payload = {
				page: 0,
				limit: 0,
			};
			store.dispatch('workDetail/getCurrentInvoiceWorkDetails', payload).then(res => {
				const checkExistingWorkDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];

				if (checkExistingWorkDetails.length) {
					workDetailList.value = [...checkExistingWorkDetails];
					localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
					updateInvoiceCalculation();
				} else if (res.data.data.length != 0) {
					workDetailList.value = res.data.data.reduce((acc, item) => {
						item.fullHalfDayCompensationAmount = item.fullHalfDayCompensation == null ? null : item.fullHalfDayCompensation.compensation_value;
						item.day_compensation = item.fullHalfDayCompensation == null ? null : item.fullHalfDayCompensation.id;
						item.lunchCompensationAmount = item.lunchCompensation == null ? null : item.lunchCompensation.compensation_value;
						item.lunch_compensation = item.lunchCompensation == null ? null : item.lunchCompensation.id;
						item.otherCompensationAmount = item.other_compensation == 0 ? null : item.other_compensation;
						item.other_compensation = item.other_compensation == 0 ? null : item.other_compensation;
						acc.push(item);
						return acc;
					}, []);
					localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
					updateInvoiceCalculation();
				} else {
					workDetailList.value = new Array(1).fill(null).map(() => {
						return {
							...defaultWorkDetails,
						};
					});
					localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
				}
			});
		};

		// form schema validation
		const workDetailSchema = yup.object({
			description: yup
				.string()
				.nullable()
				.optional(),
			contract_type: yup
				.string()
				.nullable()
				.required(),
			contract_value: yup
				.number()
				.nullable()
				.required(),
			total_work: yup
				.number()
				.nullable()
				.required(),
			vat: yup
				.number()
				.nullable()
				.required(),
			other_amount: yup
				.number()
				.nullable()
				.optional(),
			distance: yup
				.number()
				.nullable()
				.optional(),
			lunch_compensation: yup
				.number()
				.nullable()
				.optional(),
			day_compensation: yup
				.number()
				.nullable()
				.optional(),
			other_compensation: yup
				.number()
				.nullable()
				.optional(),
			trip_start: yup
				.string()
				.nullable()
				.optional(),
			trip_end: yup
				.string()
				.nullable()
				.optional(),
			trip_time: yup
				.number()
				.nullable()
				.optional(),
			trip_address: yup
				.string()
				.nullable()
				.optional(),
			work_description: yup
				.string()
				.nullable()
				.optional(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, resetForm } = useForm({
			validationSchema: workDetailSchema,
		});

		// Form Feilds
		const desciptionField = reactive(
			useField('description', undefined, {
				initialValue: null,
			}),
		);
		const contactTypeField = reactive(
			useField('contract_type', undefined, {
				initialValue: 'hours',
			}),
		);
		const contractValueField = reactive(
			useField('contract_value', undefined, {
				initialValue: 0,
			}),
		);
		const hoursUnitField = reactive(
			useField('total_work', undefined, {
				initialValue: 0,
			}),
		);
		const vatField = reactive(
			useField('vat', undefined, {
				initialValue: 0,
			}),
		);
		const otherAmountField = reactive(
			useField('other_amount', undefined, {
				initialValue: null,
			}),
		);
		const distanceField = reactive(
			useField('distance', undefined, {
				initialValue: null,
			}),
		);
		const lunchCompensationField = reactive(
			useField('lunch_compensation', undefined, {
				initialValue: 0,
			}),
		);
		const fullHalfDatCompensationField = reactive(
			useField('day_compensation', undefined, {
				initialValue: 0,
			}),
		);
		const otherCompensationField = reactive(
			useField('other_compensation', undefined, {
				initialValue: 0,
			}),
		);
		const tripStartField = reactive(
			useField('trip_start', undefined, {
				initialValue: moment()
					.startOf('day')
					.toDate(),
			}),
		);
		const tripEndField = reactive(
			useField('trip_end', undefined, {
				initialValue: moment()
					.startOf('day')
					.toDate(),
			}),
		);
		const tripTimeField = reactive(
			useField('trip_time', undefined, {
				initialValue: tripTimeCalc.value,
			}),
		);
		const tripAddressField = reactive(
			useField('trip_address', undefined, {
				initialValue: null,
			}),
		);
		const workDescriptionField = reactive(
			useField('work_description', undefined, {
				initialValue: null,
			}),
		);
		const totalCompensationField = reactive(
			useField('compensation_amount', undefined, {
				initialValue: 0,
			}),
		);
		const subTotalField = reactive(
			useField('sub_total', undefined, {
				initialValue: null,
			}),
		);
		const taxAmountField = reactive(
			useField('tax', undefined, {
				initialValue: null,
			}),
		);

		// expand work details
		const expandWorkDetails = (index, data) => {
			expandRowIndex.value = index;
			expandRowId.value = data.id;
			desciptionField.value = data.description;
			contactTypeField.value = data.contract_type;
			contractValueField.value = data.contract_value;
			hoursUnitField.value = data.total_work;
			otherAmountField.value = data.other_amount;
			distanceField.value = data.distance || 0;
			lunchCompensationField.value = data.lunch_compensation;
			fullHalfDatCompensationField.value = data.day_compensation || 0;
			otherCompensationField.value = data.other_compensation;
		};

		// Form Submit
		const submitForm = handleSubmit(async values => {
			// save the work details
			await store
				.dispatch('workDetail/addWorkDetails', {
					...values,
					trip_start: moment(values.trip_start).format('HH:mm'),
					trip_end: moment(values.trip_end).format('HH:mm'),
				})
				.then(({ data }) => {
					const workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];

					workDetails.push(data);
					localStorage.setItem('workDetails', JSON.stringify(workDetails));

					//Work deatisl ids
					let workDetailsIds = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];

					workDetailsIds = workDetailsIds.filter(wdIds => wdIds !== data.id);
					workDetailsIds.push(data.id);
					localStorage.setItem('invoiceWorkDetails', JSON.stringify(workDetailsIds));

					setTimeout(() => {
						workDetailList.value = workDetails;
						expandRowIndex.value = null;
					}, 1000);
					setTimeout(() => {
						updateInvoiceCalculation();
					}, 100);
				});
			return true;
		});

		// update work hour list
		const updateWorkHour = handleSubmit(async values => {
			values.transported_heavyloads = false;
			values.driven_in_rough_terrain = false;
			values.transported_workload = false;
			await store
				.dispatch('workDetail/updateWorkDetails', {
					id: expandRowId.value,
					payload: {
						...values,
						trip_start: moment(values.trip_start).format('HH:mm'),
						trip_end: moment(values.trip_end).format('HH:mm'),
					},
				})
				.then(({ data }) => {
					let workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];

					workDetails = workDetails.filter(wd => wd.id !== data.data.id);

					workDetails.push(data.data);
					localStorage.setItem('workDetails', JSON.stringify(workDetails));
					//Work deatisl ids
					let workDetailsIds = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];

					workDetailsIds = workDetailsIds.filter(wdIds => wdIds !== data.data.id);
					workDetailsIds.push(data.data.id);
					localStorage.setItem('invoiceWorkDetails', JSON.stringify(workDetailsIds));

					desciptionField.value = data.data.description;
					contactTypeField.value = data.data.contract_type;
					contractValueField.value = data.data.contract_value;
					hoursUnitField.value = data.data.total_work;
					otherAmountField.value = data.data.other_amount;
					distanceField.value = data.data.distance;
					lunchCompensationField.value = data.data.lunch_compensation;
					fullHalfDatCompensationField.value = data.data.day_compensation;
					otherCompensationField.value = data.data.other_compensation;
					tripStartField.value = data.data.trip_start;
					tripEndField.value = data.data.trip_end;
					tripTimeField.value = data.data.trip_time;
					tripAddressField.value = data.data.trip_address;
					workDescriptionField.value = data.data.work_description;

					setTimeout(() => {
						workDetailList.value = workDetails;
						expandRowIndex.value = null;
					}, 1000);

					setTimeout(() => {
						updateInvoiceCalculation();
					}, 1000);
				});
			return true;
		});

		const updateInvoiceCalculation = async () => {
			const workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			const data = {
				worked_hours: workDetails.reduce((acc, x) => {
					acc.push(x);
					return acc;
				}, []),
				vat: formFieldsData.value.vatField.value ?? 0,
				payment_terms: formFieldsData.value.paymentTermField.value ?? 0,
				quick_pay_status: formFieldsData.value.quickPayField.value ?? 0,
			};
			await store
				.dispatch('invoice/calculationWorkedHour', data)
				.then(res => {
					const data = res.data.data;
					taxAmountField.value = data.tax_amount;
					totalCompensationField.value = data.compensation_amount;
					Kilometres.value = data.totAllowance ?? 0;
					FullHalfDayAllowances.value = data.total_day_compensation ?? 0;
					MealAllowances.value = data.total_lunch_compensation ?? 0;
					OtherExpenses.value = data.total_other_compensation ?? 0;
					willBePaidWithoutAddedAllowance.value = data.will_paid_without_allowances ?? 0;
					subTotalField.value = data.sub_total;
					TaxbledAmount.value = data.tax_amount;
					CommitionAmount.value = data.commission_amount;
					deducationAmount.value = data.deduction_amount ?? 0;
					quickpayAmount.value = data.quick_pay_commission ?? 0;
					VatAddedValue.value = data.work_vat_value ?? 0;
					GrossSalary.value = data.gross_salary ?? 0;
					grossAfterCompensationDeduct.value = data.gross_after_compensation_deduct ?? 0;
					hoursAmountAfterTax.value = data.hours_amount_after_tax ?? 0;
					totalWorkValue.value = data.worked_value ?? 0.0;
					misbCommissionAmount.value = data.misb_commission_amount ?? 0;
					healthInsuarnceonAmount.value = data.health_insurance_amount ?? 0;
					accidentInsuranceAmount.value = data.accident_insurance_amount ?? 0;
					w2wCommissionAmount.value = data.w2w_commission_amount ?? 0;
					compensationAmount.value = data.compensation_amount ?? 0;
					youWillBePaid.value = data.sub_total ?? 0;
					invoiceTotal.value = data.company_pay_amount ?? 0;
					vatTotal.value = data.vat_amount ?? 0;
					dueDate.value = store.state.invoice.invoiceInfo.due_date ?? 0;
				})
				.catch(err => {
					console.log(err.response, err.message);
				});
			return true;
		};

		emitter.$on('vatUpdate', () => {
			const checkWorkDetail = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			const isValid = checkWorkDetail.find(x => Number(x.contract_value) && Number(x.total_work));
			if (checkWorkDetail && isValid) {
				updateInvoiceCalculation();
			}
		});

		emitter.$on('paymentTermsUpdate', () => {
			const checkWorkDetail = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			const isValid = checkWorkDetail.find(x => Number(x.contract_value) && Number(x.total_work));
			if (checkWorkDetail && isValid) {
				updateInvoiceCalculation();
			}
		});

		emitter.$on('quickPayStatusUpdate', () => {
			const checkWorkDetail = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			const isValid = checkWorkDetail.find(x => Number(x.contract_value) && Number(x.total_work));
			if (checkWorkDetail && isValid) {
				updateInvoiceCalculation();
			}
		});

		// sink work details
		const sinkWorkDetails = () => {
			expandRowIndex.value = null;
		};

		//update flage
		const updateFlag = () => {
			workDeatilsModal.value = false;
		};

		// remove work details
		const removeWorkDetail = (index, id) => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete', {
					field: 'conformationMessage.workDetail',
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Remove It',
			}).then(async result => {
				if (result.isConfirmed) {
					console.log(id);
					workDetailList.value.splice(index, 1);
					localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
					updateInvoiceCalculation();
					Swal.fire('Success!', 'Work detail is removed!', 'success');
				}
			});
		};

		// add new work detail
		const addNewWorkDetail = () => {
			let invoiceWorkDetails = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];
			if (invoiceWorkDetails != '') {
				addNewItem.value = true;
				store.commit('workDetail/addWorkDetails', Object.assign({}, defaultWorkDetails));
				workDetailList.value = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			} else {
				workDetailList.value.push(Object.assign({}, defaultWorkDetails));
				localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
			}
		};

		// duplicate work details
		// eslint-disable-next-line no-unused-vars
		const duplicateWorkDetail = index => {
			let invoiceWorkDetails = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];
			if (invoiceWorkDetails) {
				addNewItem.value = true;

				store.commit('workDetail/addWorkDetails', Object.assign({}, workDetailList.value[index]));
				workDetailList.value = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
				updateInvoiceCalculation();
			} else {
				workDetailList.value.push(Object.assign({}, defaultWorkDetails));
				localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
			}
		};

		// update work detail information
		// in localstorage
		const updateWorkDetailInfo = index => {
			const workDetailInfoList = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			workDetailInfoList[index] = { ...workDetailInfoList[index], ...workDetailList.value[index] };
			localStorage.setItem('workDetails', JSON.stringify(workDetailInfoList));
			workDetailList.value = workDetailInfoList;
			updateInvoiceCalculation();
		};

		const NumbersOnly = evt => {
			evt = evt ? evt : window.event;
			var charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		};
		// check input number length
		const checkInputNuberValue = e => {
			const inputNUmberLength = e.target.value ?? 0;
			const regexCheckNumber = /^\d{1,6}(\.\d{1,2})?$/;
			if (!regexCheckNumber.test(inputNUmberLength)) {
				toast.error('Value length is not valid');
				return;
			}
		};
		// check input number length
		const checkInputNuberQty = e => {
			const inputNUmberLength = e.target.value ?? 0;
			const regexCheckNumber = /^\d{1,4}(\.\d{1,2})?$/;
			if (!regexCheckNumber.test(inputNUmberLength)) {
				toast.error('Quantity length is not valid');
				return;
			}
		};

		// Watch
		watch(tripTimeCalc, () => {
			tripTimeField.value = tripTimeCalc.value < 0 ? 0 : tripTimeCalc.value;
		});

		watch(workDetailsArray, () => {
			workDetailList.value.splice(workDetailsArray.value.indexId, 1);
			workDetailList.value.push(workDetailsArray.value);
			localStorage.setItem('workDetails', JSON.stringify(workDetailList.value));
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
			dateFormat,
			t,
			invoiceAllownceTracer,
			contractTypeOptions,
			workDetailList,
			expandRowIndex,
			vatTypeOptions,
			formFieldsData,
			vatValue,
			expandRowId,
			isWorkDetailsModal,
			workDeatilsModal,
			indexId,
			addNewItem,
			TaxbledAmount,
			CommitionAmount,
			deducationAmount,
			quickpayAmount,
			VatAddedValue,
			GrossSalary,
			grossAfterCompensationDeduct,
			hoursAmountAfterTax,
			displayAllW2WTotoal,
			Kilometres,
			FullHalfDayAllowances,
			MealAllowances,
			OtherExpenses,
			totalWorkValue,
			willBePaidWithoutAddedAllowance,
			compensationAmount,
			youWillBePaid,
			invoiceTotal,
			vatTotal,
			dueDate,
			// icons
			plusIcon,
			copyIcon,
			trashIcon,
			downIcon,
			upIcon,
			downArrowIcon,
			euroSign,
			saveIcon,
			closeIcon,
			arrowDown,
			arrowUp,

			// Form
			submitForm,
			formMeta,
			resetForm,
			updateWorkHour,

			// Form Feilds
			desciptionField,
			contactTypeField,
			contractValueField,
			hoursUnitField,
			vatField,
			otherAmountField,
			distanceField,
			lunchCompensationField,
			fullHalfDatCompensationField,
			otherCompensationField,
			tripStartField,
			tripEndField,
			tripTimeField,
			tripAddressField,
			workDescriptionField,
			totalCompensationField,
			subTotalField,
			taxAmountField,

			// computed
			calculateSubTotal,
			calculateTotalWithoutVat,
			calculateVat,
			calculatgeTotalWithVat,
			tripTimeCalc,
			dayCompensationDisable,
			isDisableCompensation,
			totalDistanceKilloMeter,
			finalTotal,
			invoiceWorkDetailList,
			workId,
			workDetailsArray,
			misbCommissionAmount,
			healthInsuarnceonAmount,
			accidentInsuranceAmount,
			w2wCommissionAmount,
			workDetailBtnDisabled,
			isDublicateInvoiceDisable,

			// methods
			expandWorkDetails,
			sinkWorkDetails,
			removeWorkDetail,
			addNewWorkDetail,
			duplicateWorkDetail,
			updateInvoiceCalculation,
			addWorkDetails,
			updateFlag,
			workDetails,
			updateWorkDetailInfo,
			onTransported,
			handleContractValue,
			openTable,
			NumbersOnly,
			checkInputNuberValue,
			checkInputNuberQty,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.max-w-40 {
	max-width: 40px;
}

.max-w-60 {
	max-width: 60px;
}

.responsive-table {
	&.attachment-table {
		@media (max-width: 1440px) {
			display: block;
		}
	}

	.collapse-div {
		border-top-left-radius: 18px;
		border-top-right-radius: 18px;
	}

	.collapse-arrow {
		position: absolute;
		top: 48px;
		right: 20px;
	}

	.responsive-col-2 {
		flex: 0 0 20%;
		max-width: 20%;

		@media (min-width: 380px) and (max-width: 530px) {
			flex: 0 0 30%;
			max-width: 30%;
		}
	}

	.expand-daily-table-header {
		background-color: #f5f5f5;
		border-bottom-right-radius: 18px;
		border-bottom-left-radius: 18px;

		// padding: 10px 30px 10px 30px;
		.table-border {
			margin: 0 auto;
		}

		.product-1 {
			background-color: #fff;
			font-size: 14px;
			display: inline-block;
			padding: 8px 25px;
			border-radius: 12px;
			border: 2px solid #e4e6e7;
			width: 100%;
			text-align: center;

			@media (min-width: 576px) and (max-width: 610px) {
				padding: 8px 10px;
			}
		}

		.row-1 {
			background-color: #fff;
			font-size: 14px;
			display: inline-block;
			padding: 8px 25px;
			border-radius: 12px;
			border: 2px solid #e4e6e7;
			width: 100%;
			text-align: center;
		}

		.product-2 {
			background-color: #fff;
			font-size: 14px;
			display: inline-block;
			padding: 8px 25px;
			border-radius: 12px;
			border: 2px solid #e4e6e7;
			width: 100%;

			@media (max-width: 575px) {
				padding: 8px 15px;
			}

			@media (min-width: 576px) and (max-width: 670px) {
				padding: 8px 10px;
			}
		}

		.quantity-2 {
			.product-2 {
				padding: 8px 12px;

				@media (max-width: 768px) {
					padding: 8px 13px;
				}
			}

			max-width: 87px !important;
		}

		.days-red {
			padding: 8px 25px;
			border-radius: 12px;
			background-color: #ff4b57;
			color: #fff;
		}

		.buttons {
			color: #ff4b57 !important;
			cursor: pointer;

			.delete-btn,
			.copy-btn {
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 5px;
				border-radius: 12px;
				background-color: #f8dddf;
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

		.summary-box {
			padding: 8px 20px;
			border-radius: 13px;
			height: auto;
		}

		.work-width {
			.work {
				.form-control {
					border: 2px solid #e4e6e7;
				}
			}
		}
	}

	.expand-daily-table {
		background-color: #f5f5f5;
		border-bottom-right-radius: 18px;
		border-bottom-left-radius: 18px;
		// padding: 10px 30px 10px 30px;
		padding: 3px 43px 7px 37px;

		.table-border {
			margin: 0 auto;
		}

		// .product-1 {
		// 	background-color: #fff;
		// 	font-size: 14px;
		// 	display: inline-block;
		// 	padding: 8px 25px;
		// 	border-radius: 12px;
		// 	border: 2px solid #e4e6e7;
		// 	width: 100%;
		// 	text-align: center;
		// }
		// .row-1 {
		// 	background-color: #fff;
		// 	font-size: 14px;
		// 	display: inline-block;
		// 	padding: 8px 10px;
		// 	border-radius: 12px;
		// 	border: 2px solid #e4e6e7;
		// 	width: 65%;
		// 	margin-left: 15px;
		// 	text-align: center;
		// }
		// .product-2 {
		// 	background-color: #fff;
		// 	font-size: 14px;
		// 	display: inline-block;
		// 	padding: 8px 25px;
		// 	border-radius: 12px;
		// 	border: 2px solid #e4e6e7;
		// 	width: 100%;

		// 	@media (max-width: 575px) {
		// 		padding: 8px 15px;
		// 	}
		// }
		// .quantity-2 {
		// 	.product-2 {
		// 		padding: 8px 12px;
		// 		@media (max-width: 768px) {
		// 			padding: 8px 13px;
		// 		}
		// 	}
		// 	max-width: 87px !important;
		// }
		// .days-red {
		// 	padding: 8px 25px;
		// 	border-radius: 12px;
		// 	background-color: #ff4b57;
		// 	color: #fff;
		// }

		// .buttons {
		// 	color: #ff4b57 !important;
		// 	cursor: pointer;

		// 	.delete-btn,
		// 	.copy-btn {
		// 		width: 40px;
		// 		height: 40px;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		margin-right: 5px;
		// 		border-radius: 12px;
		// 		background-color: #f8dddf;
		// 	}

		// 	.down-btn {
		// 		width: 40px;
		// 		height: 40px;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		border-radius: 12px;
		// 		color: #ffff;
		// 		background-color: #273238;
		// 	}
		// }
		.summary-box {
			padding: 8px 20px;
			border-radius: 13px;
			height: auto;

			@media (max-width: 768px) {
				padding: 8px 11px;
				font-size: 14px;
			}
		}

		.work-width {
			.work {
				.form-control {
					border: 2px solid #e4e6e7;
				}
			}
		}
	}
}

.invoice__list {
	.inpult-area {
		outline: none;
		border: none;
		width: 100%;
		background-color: transparent;
	}

	.employer-details {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.title-lg {
			color: #a0a4a9;
		}
	}

	.daily-work-row {
		@media (max-width: 1440px) {
			overflow: auto;
			display: none;
		}
	}

	.daily-work-col {
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #273238;
		padding: 15px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		.product-no {
			width: 4%;
		}

		.days {
			width: 5%;
		}

		.contract-type {
			width: 9%;

			@media (max-width: 1400px) {
				width: 10%;
			}
		}

		.contract-value {
			width: 9%;
		}

		.quantity {
			width: 6%;

			@media (max-width: 1800px) {
				width: 7%;
			}

			@media (max-width: 1600px) {
				width: 8%;
			}

			@media (max-width: 1500px) {
				width: 10%;
			}

			@media (max-width: 1200px) {
				width: 8%;
			}
		}

		.actions {
			width: 14%;

			@media (max-width: 1800px) {
				width: 15%;
			}

			@media (max-width: 1550px) {
				width: 17%;
			}

			@media (max-width: 1440px) {
				width: 18%;
			}

			@media (max-width: 1200px) {
				width: 16%;
			}
		}

		.discription {
			width: 50%;

			@media (max-width: 1800px) {
				width: 40%;
			}

			@media (max-width: 1440px) {
				width: 41%;
			}

			@media (max-width: 1400px) {
				width: 37%;
			}
		}
	}

	.details-head-text {
		color: #ffff;
		font-size: 16px;
	}

	.daily-work-col {
		border: 1px solid #dde0e2;
		border-radius: 10px;
	}

	.details-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		border-top: 1px solid #dde0e2;
		min-width: 900px;
		gap: 10px;

		.product-width {
			width: 4%;

			.product-1 {
				font-size: 14px;
				display: inline-block;
				padding: 8px 20px;
				border-radius: 12px;
				border: 2px solid #e4e6e7;
				text-align: center;

				@media (max-width: 1500px) {
					padding: 8px 16px;
				}
			}

			.product-2 {
				background-color: #fff;
			}
		}

		.work-width {
			width: 50%;

			@media (max-width: 1800px) {
				width: 40%;
			}

			@media (max-width: 1440px) {
				width: 41%;
			}

			@media (max-width: 1400px) {
				width: 37%;
			}

			.work {
				width: 98%;
				padding: 8px 20px;
				border-radius: 12px;
				background-color: #f6f6f6;
				font-size: 14px;

				@media (max-width: 1900px) {
					width: 100%;
				}

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

		.contractvalue-width,
		.hours-width {
			width: 9%;

			.hours {
				width: 90%;
				padding: 0;
				border-radius: 12px;

				@media (max-width: 1800px) {
					width: 100%;
				}
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
				width: 90%;
				padding: 8px 9px;
				border-radius: 12px;
				display: flex;
				align-items: center;
				background-color: #f6f6f6;

				@media (max-width: 1800px) {
					width: 100%;
				}

				p {
					margin-right: 5px;
				}
			}

			.totalamount-1 {
				background-color: #ffff;
			}
		}

		.hours-width {
			width: 9%;

			@media (max-width: 1400px) {
				width: 10%;
			}
		}

		.totalamount-width {
			width: 6%;

			@media (max-width: 1800px) {
				width: 7%;
			}

			@media (max-width: 1600px) {
				width: 8%;
			}

			@media (max-width: 1500px) {
				width: 10%;
			}

			@media (max-width: 1200px) {
				width: 8%;
			}

			.totalamount {
				width: 110%;
				padding: 8px 16px;
				border-radius: 12px;
				display: flex;
				align-items: center;
				background-color: #f6f6f6;

				@media (max-width: 2560px) {
					padding: 8px 15px;
				}

				@media (max-width: 1900px) {
					width: 100%;
					padding: 8px 11px;
				}

				@media (max-width: 1800px) {
					padding: 8px 16px;
				}

				@media (max-width: 1600px) {
					padding: 8px 11px;
				}

				@media (max-width: 1440px) {
					padding: 8px 16px;
				}

				p {
					margin-right: 5px;
				}
			}
		}

		.multiple-day {
			width: 5%;
		}

		.buttons {
			width: 14%;
			display: flex;
			cursor: pointer;
			justify-content: flex-end;

			@media (max-width: 1800px) {
				width: 15%;
			}

			@media (max-width: 1550px) {
				width: 17%;
			}

			@media (max-width: 1440px) {
				width: 18%;
			}

			@media (max-width: 1200px) {
				width: 16%;
			}

			.delete-btn,
			.copy-btn {
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ff4b57;
				border-radius: 12px;
				background-color: #f8dddf;
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
	}

	.details-content-1 {
		background-color: #f6f6f6;
	}

	.opne-toggle {
		padding: 0px 0px 21px 0px;

		@media (max-width: 575px) {
			padding: 0;
			margin: 0 -15px;
		}

		.payment-section {
			display: grid;
			gap: 1.25rem;
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.input-title {
			font-size: 14px;
			margin-bottom: 5px;
			font-weight: 500;
			color: #858a90;
		}

		.inpul-fount-md {
			font-size: 14px;
		}

		.input-parent-white {
			background-color: #ffff;
			border-radius: 12px;
			padding: 8px 15px;
		}

		.other-amount {
			display: grid;
			gap: 1.25rem;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.other-compensation {
			font-size: 14px;
			padding: 2px 8px;
			border-radius: 8px;
			background-color: #f6f6f6;
		}

		.trip-time {
			display: grid;
			gap: 5px;
			padding: 5px;
			font-size: 14px;
			border-radius: 12px;
			background-color: #ffff;
			grid-template-columns: repeat(2, minmax(0, 1fr));

			.trip-start-time {
				width: 100%;
				padding: 5px 15px;
				text-align: left;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.address-section {
			padding: 10px 0;
		}

		.work-description {
			width: 100%;
			outline: none;
			font-size: 14px;
			border: none;
			resize: none;
		}
	}

	.summary-box {
		background-color: #e92028;
		color: #fff;
		padding: 20px;
		border-radius: 20px;
		height: 100%;

		h1 {
			font-weight: 600;
			font-size: 48px;
			letter-spacing: -3px;
			line-height: 41px;
			text-shadow: 1px 3px 3px #494848;
			word-break: break-all;

			@media (max-width: 1440px) {
				font-size: 45px;
			}
		}
	}

	.dark-box {
		background-color: #4c4f56;
		color: #fff;
		padding: 30px;
		border-radius: 20px;
		height: 100%;

		@media (max-width: 768px) {
			padding: 15px 20px;
		}

		.dark-box-text {
			font-size: 19px;
			letter-spacing: -1px;
			text-shadow: 1px 3px 3px #494848;

			@media (max-width: 768px) {
				font-size: 17px;
			}

			@media (max-width: 575px) {
				font-size: 13px;
			}
		}
	}

	.total {
		background-color: #f9f9f9;
		border-radius: 20px;
		padding: 25px;

		.total-excl {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.text-total {
				color: #858a90;
				font-size: 14px;
			}

			.text-prize {
				font-size: 14px;
				font-weight: 800;
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

	.text-gray {
		margin-bottom: 10px;
		color: #a0a4a9;
	}

	.grey-light {
		color: #babec3;
		font-weight: 500;
	}

	.explaination {
		padding: 10px;
		border-radius: 12px;
		outline: none;
		width: 100%;
		border: 3px dashed #dde0e2;
	}

	.paperclip-icone {
		color: white;
		margin-right: 10px;
		font-size: 16px;
	}

	.copy-icone {
		color: #ff4b57;
	}

	.down-icone {
		color: #ffff;
		font-size: 20px;
	}

	.dark-box-input {
		background-color: #4c4f56;
		border: none;
		color: #fff;
		width: 80%;
	}
}

.bottom-header {
	background-color: $coloRed;
	padding: 10px;
	border-radius: 5px;
}

.debug-design {
	@media (max-width: 425px) {
		display: flex;
		justify-content: flex-start;
		margin-left: 20px;
	}
}

.remove-pointer-events {
	pointer-events: unset !important;
}

.add-min-w {
	max-width: unset !important;
	min-width: 135px;
}

.min-w-150 {
	min-width: 150px;
}

.work_value {
	color: #fff;
	padding: 8px 10px;
	border-radius: 6px;
	font-weight: 600;
	background-color: #ff4b57;
}
</style>

<style lang="scss" scoped>
.multiselect-options {
	overflow: auto;
	border-radius: 10px;
}

.multiselect-option {
	background-color: #ffffff;
}

.multiselect-option.is-selected.is-pointed {
	color: #000;
	background: #ffff;
}

.multiselect-option.is-selected {
	color: #ff4b57;
	background-color: #ffff;
}

.trip-time {
	padding: 5px 15px !important;
	display: block !important;

	.form-control {
		border: none;
		width: 100%;
		padding: 0;
		height: auto;
	}

	.vc-time-picker {
		padding: 0 !important;

		.vc-time-icon {
			width: 22px;
			height: 22px;
		}
	}

	.vc-time-date {
		display: none !important;
	}

	.vc-select select {
		background: none;
		border: none;

		&:hover {
			color: #000000;
		}
	}
}

.invoice__list .invoice-dropdown {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	border-radius: 50px;
	font-size: 14px;

	&:focus {
		box-shadow: none;
	}
}

.dropdown-menu {
	padding: 15px;
	border: transparent;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	color: #949494;
}

.dropdown-item {
	padding: 8px 0px;
	color: rgb(80, 76, 76);

	&:hover {
		background-color: transparent;
		color: red;
	}
}

.multi-rounded {
	border-radius: 50px;
	padding: 4px 22px;
	font-size: 12px;

	@media (max-width: 1600px) {
		padding: 4px 12px;
	}
}

.bg-danger {
	background: #ff4b57;
}

.bottom-header {
	background-color: #ff4b57;
	padding: 10px;
	border-radius: 5px;
}

.margin-top-5 {
	margin-top: 15px;
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

.btnDisabled {
	cursor: not-allowed;
	pointer-events: none;
	background-color: grey !important;
	color: #fff !important;
}

.btnDeletRow {
	cursor: not-allowed;
	pointer-events: none;
	background: #f8dddf !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.pph-left {
	h5 {
		font-size: 16px;
	}
}

.text-sm-fw {
	font-size: 16px;
}

.msg-info{
	position: absolute;
	top: 0;
	left: 0;
	width: 40px;
	height: 40px;
	transform: translateY(-20px);
	.msg-info-number{
		position: absolute;
		top: 50%;
		left: 50%;
		color:#fff;
		padding: 3px;
		transform: translate(-50%, -50%);
		background-color: #ff4b57;
	}
}
</style>

<style lang="scss">
.expand-daily-table {
	.hours {
		.multiselect-input {
			border: 2px solid #e4e6e7 !important;
		}
	}
}

.vat_text {
	position: relative;

	&::after {
		content: "VAT";
		position: absolute;
		top: 8px;
		left: 10px;
		font-weight: 500;
	}

	.multiselect-single-label {
		padding-left: 50px !important;
	}
}
</style>
