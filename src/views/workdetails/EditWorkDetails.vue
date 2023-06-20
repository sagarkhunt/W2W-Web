<template>
	<div class="invoice__list card-space">
		<form class="theme-input tab-form">
			<div class="invoice-sec">
				<div class="row">
					<div class="pph-head">
						<h5 class="title-lg">{{ t('workDetails.editWorkDetails') }}</h5>
					</div>

					<div class="col-xl-6 mt-4">
						<div class="col-xl-12 col-lg-6 col-12 form-group p-0">
							<label for="Lunch Compensation" class="company-titel">{{ t('workDetails.showInTeam') }}</label>
							<div class="select-employee">
								<Multiselect
									id="editTeamShowInTeam"
									class="form-group px-remove"
									@input="showTeamField.handleChange"
									@blur="showTeamField.handleBlur"
									:placeholder="
										t('validation.selectField', {
											field: 'fieldList.selectTeamGroup',
										})
									"
									v-model="showTeamField.value"
									:options="teamList"
									label="team_name"
									mode="single"
									:canDeselect="true"
									:searchable="true"
									trackBy="team_name"
								/>
							</div>
						</div>
						<div class="pph-left">
							<h5 class="title-lg mb-2">{{ t('invoiceList.leInvoice.addInvoice.tripDtl') }}</h5>
						</div>
						<div class="pph-left-box">
							<div class="row">
								<!-- trip Name -->
								<div class="col-md-12 form-group">
									<label for="editTeamTripName" class="company-titel"> {{ t('workDetails.tripName') }} </label>
									<input
										id="editTeamTripName"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'fieldList.tripName',
											})
										"
										@input="tripNameField.handleChange"
										@blur="tripNameField.handleBlur"
										:value="tripNameField.value"
									/>
								</div>
								<!-- End trip Name -->
								<!-- Start Starting Address -->
								<div class="col-xxl-6 col-xl-12">
									<div class="form-group p-0">
										<div class="position-relative">
											<div class="d-flex justify-content-between align-items-end mb-1">
												<label for="startingAddress" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.startingAddress') }}</label>
												<div class="plus">
													<FontAwesomeIcon :icon="plusIcon" class="w-11" @click="addWayPointItem" />
												</div>
											</div>

											<div class="position-relative">
												<GMapAutocomplete
													class="form-control"
													:placeholder="
														t('validation.enterField', {
															field: 'fieldList.tripStartAddress',
														})
													"
													@input="handleStartPlaceChange"
													@blur="tripStartAddressField.handleBlur"
													:value="tripStartAddressField.value"
													@place_changed="originStart"
													:componentRestrictions="gAuComRestriction"
												/>

												<div class="calender-icon d-flex justify-content-center align-items-center position-absolute">
													<FontAwesomeIcon :icon="faMapMarker" class="text-sm" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- End Starting Address -->
								<!-- Strat MidPoint Address -->
								<div class="col-md-12">
									<div class="col-md-12 form-group p-0">
										<div class="position-relative">
											<label for="midpoints" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.midpointsAddress') }}</label>

											<div class="midpoint-wrap position-relative mb-1" v-for="(row, index) in wayPointItems || []" :key="index">
												<GMapAutocomplete
													id="editwaypoints"
													type="text"
													class="form-control"
													:placeholder="
														t('validation.enterField', {
															field: 'fieldList.tripMidAddress',
														})
													"
													:value="row.location"
													@place_changed="data => editWayPoint(data, index)"
													:componentRestrictions="gAuComRestriction"
												/>
												<div class="calender-icon d-flex justify-content-center align-items-center position-absolute">
													<FontAwesomeIcon :icon="faMapMarker" class="text-sm" />
												</div>
												<div class="close-icon" @click="removeWayPointRow(index)">
													<FontAwesomeIcon :icon="closeIcon" class="text-sm" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- End MidPoint Address -->
								<!-- Strat Ending Address -->
								<div class="col-xxl-6 col-xl-12">
									<div class="form-group p-0">
										<div class="position-relative">
											<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.endingAddress') }}</label>

											<div class="position-relative">
												<GMapAutocomplete
													type="text"
													class="form-control"
													:placeholder="
														t('validation.enterField', {
															field: 'fieldList.tripEndAddress',
														})
													"
													@input="handleEndPlaceChange"
													@blur="tripEndAddressField.handleBlur"
													:value="tripEndAddressField.value"
													@place_changed="destionationEnd"
													:componentRestrictions="gAuComRestriction"
												/>

												<div class="calender-icon d-flex justify-content-center align-items-center position-absolute">
													<FontAwesomeIcon :icon="faMapMarker" class="text-sm" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="">
								<!-- End Ending Address -->
								<div v-if="showTeamField.value" class="row me-0">
									<!-- Start Trip Starting date -->
									<div class="col-md-4 pe-0">
										<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingDate') }}</label>
										<div class="form-group dropdown select-employee">
											<div>
												<p class="company-input input-date">
													<v-date-picker
														@input="tripStartDateField.handleChange;"
														@blur="tripStartDateField.handleBlur;"
														v-model="tripStartDateField.value"
														:masks="{
															input: 'DD.MM.YYYY',
														}"
														class="d-flex justify-content-center align-items-center"
													>
														<template v-slot="{ inputValue, inputEvents }">
															<input class="form-control" :value="inputValue" v-on="inputEvents" />

															<div class="calender-icon d-flex justify-content-center align-items-center">
																<FontAwesomeIcon :icon="calenderIcon" class="text-sm" />
															</div>
														</template>
													</v-date-picker>
												</p>
											</div>
										</div>
									</div>
									<!-- End Trip Starting date -->

									<!-- Strat Trip Starting time -->
									<div class="col-md-8 pe-0">
										<div class="form-group p-0">
											<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingTime') }}</label>

											<div class="row m-0">
												<div class="col-12 p-0">
													<div class="dropdown select-employee">
														<div>
															<input type="time" name="edit_end_time" id="edit_start_time" class="form-control" v-model="tripStartTime" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- End Trip Starting date -->

									<!-- Start Trip Ending date -->
									<div class="col-md-4 pe-0">
										<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripEndingDate') }}</label>
										<div class="form-group dropdown select-employee">
											<p class="company-input input-date">
												<v-date-picker
													@input="tripStartDateField.handleChange;"
													@blur="tripStartDateField.handleBlur;"
													v-model="tripStartDateField.value"
													:masks="{
														input: 'DD.MM.YYYY',
													}"
													class="d-flex justify-content-center align-items-center"
													disabled
												>
													<template v-slot="{ inputValue, inputEvents }">
														<input class="form-control" :value="inputValue" v-on="inputEvents" disabled />

														<div class="calender-icon d-flex justify-content-center align-items-center">
															<FontAwesomeIcon :icon="calenderIcon" class="text-sm" />
														</div>
													</template>
												</v-date-picker>
											</p>
										</div>
									</div>
									<!-- End Trip Ending date -->

									<!-- Start Ending Time -->
									<div class="col-md-8 pe-0">
										<div class="form-group p-0">
											<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.endingTime') }}</label>
											<div>
												<div class="row m-0">
													<div class="col-12 p-0">
														<div class="dropdown select-employee">
															<div>
																<input type="time" name="edit_end_time" id="add_ending_time" class="form-control" v-model="tripEndTime" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- End Ending Time -->
								</div>

								<div v-else class="row me-0">
									<!-- Start Trip Starting date -->
									<div class="col-md-4 pe-0">
										<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingDate') }}</label>
										<div class="form-group dropdown select-employee">
											<div>
												<p class="company-input input-date">
													<v-date-picker
														@input="tripStartDateField.handleChange;"
														@blur="tripStartDateField.handleBlur;"
														v-model="tripStartDateField.value"
														:masks="{
															input: 'DD.MM.YYYY',
														}"
														class="d-flex justify-content-center align-items-center"
													>
														<template v-slot="{ inputValue, inputEvents }">
															<input class="form-control" :value="inputValue" v-on="inputEvents" />

															<div class="calender-icon d-flex justify-content-center align-items-center">
																<FontAwesomeIcon :icon="calenderIcon" class="text-sm" />
															</div>
														</template>
													</v-date-picker>
												</p>
											</div>
										</div>
									</div>
									<!-- End Trip Starting date -->

									<!-- Strat Trip Starting time -->
									<div class="col-md-8 pe-0">
										<div class="form-group p-0">
											<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingTime') }}</label>

											<div class="row m-0">
												<div class="col-12 p-0">
													<div class="dropdown select-employee">
														<div>
															<input type="time" name="edit_end_time" id="add_start_time" class="form-control" v-model="tripStartTime" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- End Trip Starting date -->

									<!-- Start Trip Ending date -->
									<div class="col-md-4 pe-0">
										<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripEndingDate') }}</label>
										<div class="form-group dropdown select-employee">
											<p class="company-input input-date">
												<v-date-picker
													@input="tripEndDateField.handleChange;"
													@blur="tripEndDateField.handleBlur;"
													v-model="tripEndDateField.value"
													:masks="{
														input: 'DD.MM.YYYY',
													}"
													class="d-flex justify-content-center align-items-center"
													disabled
												>
													<template v-slot="{ inputValue, inputEvents }">
														<input class="form-control" :value="inputValue" v-on="inputEvents" />

														<div class="calender-icon d-flex justify-content-center align-items-center">
															<FontAwesomeIcon :icon="calenderIcon" class="text-sm" />
														</div>
													</template>
												</v-date-picker>
											</p>
										</div>
									</div>
									<!-- End Trip Ending date -->

									<!-- Start Ending Time -->
									<div class="col-md-8 pe-0">
										<div class="form-group p-0">
											<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.endingTime') }}</label>
											<div>
												<div class="row m-0">
													<div class="col-12 p-0">
														<div class="dropdown select-employee">
															<div>
																<input type="time" name="edit_end_time" id="add_ending_time" class="form-control" v-model="tripEndTime" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- End Ending Time -->
								</div>
							</div>

							<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.extras') }} </label>
							<div class="ml-3">
								<div class="row">
									<div class="col-md-4 form-check form-checkbox">
										<input
											class="form-check-input form-checkbox-width"
											type="checkbox"
											id="editWorkTransportedHeavyLoad"
											:checked="transportedHeavyLoad"
											:value="transportedHeavyLoad.value"
											:v-model="transportedHeavyLoad.value"
											@click="onTransported($event)"
										/>
										<label class="form-check-label extras-font checkbox-left-padding white-space" for="editWorkTransportedHeavyLoad">
											{{ t('invoiceList.leInvoice.addInvoice.heavyLoad') }}
										</label>
									</div>

									<div class="col-md-4 form-check form-checkbox">
										<input
											class="form-check-input form-checkbox-width"
											type="checkbox"
											:checked="drivenRoughTerrain"
											:value="drivenRoughTerrain.value"
											:v-model="drivenRoughTerrain.value"
											@click="ondrivenRough($event)"
											id="drivenRoughTerrain"
										/>
										<label class="form-check-label extras-font checkbox-left-padding white-space" for="drivenRoughTerrain">
											{{ t('invoiceList.leInvoice.addInvoice.roughTerrain') }}
										</label>
									</div>

									<!-- Trailer -->
									<div class="col-md-4 form-check form-checkbox">
										<input
											class="form-check-input form-checkbox-width"
											type="checkbox"
											:checked="vehicleSubClassField"
											:value="vehicleSubClassField.value"
											:v-model="vehicleSubClassField.value"
											@click="onTrailer($event)"
											id="vehicleSubClass"
										/>
										<label class="form-check-label extras-font  checkbox-left-padding white-space" for="vehicleSubClass"> {{ t('workDetails.Trailer') }} </label>
									</div>

									<div class="col-md-12 col-6 px-0">
										<div class="mt-2">
											<div class="form-check form-checkbox">
												<input
													class="form-check-input form-checkbox-width"
													type="checkbox"
													id="multipleDays"
													:checked="multiselectFiled"
													:value="multiselectFiled.value"
													:v-model="multiselectFiled.value"
													@click="onMultiselectFiled($event)"
												/>
												<label class="form-check-label extras-font checkbox-left-padding" for="multipleDays"
													>{{ t('invoiceList.leInvoice.addInvoice.multipleRowsBy') }} {{ daysDiff == 1 ? 0 : daysDiff || 0 }} {{ t('workDetails.days') }}
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<!-- Start Calculatedtrip Time -->
								<div class="col-md-4 col-6">
									<label for="firstName" class="company-titel">{{ t('workDetails.calculatedtripTime') }}</label>
									<input
										class="border-0 bg-transparent trip-text w-100"
										id="editTeamCalculatedtripTime"
										type="text"
										:value="Number.parseFloat(calculateTripTime).toFixed(2)"
										disabled
									/>
								</div>

								<div class="col-md-4 col-6">
									<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.totalDistance') }}</label>
									<p class="trip-text" id="totalDistance" style="display: none;"></p>
									<p class="trip-text">{{ distanceKillometer }} {{ t('common.km') }}</p>
								</div>

								<div class="col-md-4 col-6">
									<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.totalAllowances') }}</label>
									<p class="trip-text" id="totalDistance" style="display: none;"></p>
									<p class="trip-text">€ {{ totalDiscountCalculation }}</p>
								</div>
							</div>
						</div>
					</div>

					<div class="col-xl-6 mt-lg-4 mt-5">
						<div class="pph-left">
							<h5 class="title-lg mb-2">{{ t('invoiceList.leInvoice.addInvoice.preview') }}</h5>
						</div>
						<div class="cost-ex-map">
							<GMapMap style="border: 0" :zoom="7" :center="{ lat: 60.1699, lng: 24.9384 }" allowfullscreen="" loading="lazy">
								<directions-renderer travelMode="ArrivalTime" :origin="origin" :destination="destionation" :waypoints="wayPointItems">
									<p id="distance"></p>
								</directions-renderer>
							</GMapMap>
						</div>
					</div>
				</div>
			</div>

			<!-- Start Vehicle Section -->
			<div class="invoice-pd detail-sec pt-3">
				<div class="invoice-grey-sec">
					<div class="row">
						<div class="col-xl-2 col-md-6 col-12 form-group">
							<label for="firstName" class="company-titel">{{ t('workDetails.type') }}</label>
							<Multiselect
								id="ceditTeamCntractType"
								class="form-group"
								@input="contactTypeField.handleChange;"
								@blur="contactTypeField.handleBlur;"
								v-model="contactTypeField.value"
								:options="contractTypeOptions.map(x=>({...x, label: t(x.label)}))"
								@change="e => handleContractValue({ target: { value: e } }, 'contract_type')"
								mode="single"
								:canDeselect="true"
							/>
							<p class="text-danger">
								{{ contactTypeField.errorMessage }}
							</p>
						</div>

						<div class="col-xl-2 col-md-6 col-12 form-group">
							<label for="tripName" class="company-titel">{{ t('workDetails.value') }} </label>
							<input
								id="editTeamValue"
								type="number"
								min="0"
								class="form-control"
								@input="contractValueField.handleChange"
								@blur="contractValueField.handleBlur"
								:value="contractValueField.value"
							/>
							<p class="text-danger">
								{{ contractValueField.errorMessage }}
							</p>
						</div>

						<div class="col-xl-2 col-lg-6 col-12 form-group">
							<label for="firstName" class="company-titel">{{ t('fieldList.contractDate') }}</label>
							<div class="form-group dropdown select-employee">
								<p class="company-input input-date">
									<v-date-picker
										@input="dateField.handleChange;"
										@blur="dateField.handleBlur;"
										v-model="dateField.value"
										:masks="{
											input: 'DD.MM.YYYY',
										}"
										:min-date="lastTwoYear()"
										class="d-flex justify-content-center align-items-center position-relative"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<input class="form-control" :value="inputValue" v-on="inputEvents" />

											<div class="calender-icon d-flex justify-content-center align-items-center">
												<FontAwesomeIcon :icon="calenderIcon" class="text-sm" />
											</div>
										</template>
									</v-date-picker>
								</p>
								<p class="text-danger">
									{{ dateField.errorMessage }}
								</p>
							</div>
						</div>

						<div class="col-xl-6 col-lg-6 col-12 form-group">
							<label for="firstName" class="company-titel">{{ t('fieldList.workDescription') }}</label>
							<textarea
								class="form-control"
								id="editTeamWorkDescription"
								spellcheck="false"
								@input="workDescription.handleChange"
								@blur="workDescription.handleBlur"
								:value="workDescription.value"
							></textarea>
						</div>

						<div class="col-xl-3 col-lg-6 col-12 form-group">
							<label for="Lunch Compensation" class="company-titel">{{ t('fieldList.hoursPieces') }}</label>
							<div class="form-control d-flex">
								<input
									id="editTeamHoursPieces"
									type="number"
									class="input-area"
									@input="totalWorkField.handleChange"
									@blur="totalWorkField.handleBlur"
									:value="totalWorkField.value"
									:disabled="contactTypeField.value === 'pieces'"
								/>
							</div>
							<p class="text-danger">
								{{ totalWorkField.errorMessage }}
							</p>
						</div>

						<div class="col-xl-3 col-lg-6 col-12 form-group">
							<label for="Lunch Compensation" class="company-titel">{{ t('fieldList.lunchCompensation') }}</label>
							<div>
								<Multiselect
									id="editTeamLunchCompensation"
									class="form-group"
									@input="lunchCompensationField.handleChange"
									@blur="lunchCompensationField.handleBlur"
									:placeholder="
										t('validation.selectField', {
											field: 'placeholder.lunch',
										})
									"
									v-model="lunchCompensationField.value"
									:options="lunchCompensation"
									clear
									@clear="clearVal"
									label="compensation_value"
									mode="single"
									:canDeselect="true"
									:disabled="isDisableCompensation('lunch')"
								/>
							</div>
						</div>

						<div class="col-xl-3 col-md-6 form-group mb-3">
							<label for="editTeamFullHalfDayCompensation" class="company-titel">{{ t('fieldList.dayCompensation') }}</label>
							<div>
								<Multiselect
									id="editTeamFullHalfDayCompensation"
									class="form-group"
									@input="dayCompensationField.handleChange"
									@blur="dayCompensationField.handleBlur"
									:placeholder="
										t('validation.selectField', {
											field: 'placeholder.days',
										})
									"
									v-model="dayCompensationField.value"
									:options="halfFullCompnesation"
									clear
									@clear="clearVal"
									label="compensation_value"
									mode="single"
									:canDeselect="true"
									:disabled="isDisableCompensation('fullHalfDay')"
								/>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 form-group mb-3">
							<label for="tripName" class="company-titel"> {{ t('fieldList.otherCompensation') }} </label>
							<input
								id="editTeamOtherCompensation"
								type="number"
								min="0"
								class="form-control"
								@input="otherCompensationField.handleChange"
								@blur="otherCompensationField.handleBlur"
								:value="otherCompensationField.value"
							/>
						</div>
					</div>
				</div>
			</div>
			<!-- End Vehicle Section -->
			<!-- Start Receipts Section -->
			<div class="invoice-pd invoice-receipt">
				<div class="row" v-for="(row, index) in receiptItem" :key="row">
					<div class="d-flex justify-content-between">
						<div class="pph-left">
							<h5 class="title-lg mb-2">Receipts</h5>
						</div>

						<button type="button" class="close-btn" @click="removeRow(index, row.id)">
							<FontAwesomeIcon :icon="closeIcon" />
						</button>
					</div>

					<!-- trip Name -->
					<div class="col-xl-6 col-6 form-group">
						<label for="firstName" class="input-title">{{ t('invoiceList.leInvoice.viewInvoice.placeOfPurchase') }}</label>
						<input id="teamPlaceOfPurchase" type="text" class="form-control form-grey-input" aria-label="Text input with dropdown button" v-model="row.purchase_place" :disabled="row.id" />
					</div>
					<!-- trip Name -->

					<div class="col-xl-6 col-6 theme-input">
						<label for="firstName" class="input-title">{{ t('invoiceList.leInvoice.viewInvoice.dateOfPurchase') }}</label>
						<v-date-picker
							v-model="row.purchase_date"
							:masks="{
								input: 'DD.MM.YYYY',
							}"
							class="d-flex justify-content-center align-items-center"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<input class="form-control" :value="inputValue" v-on="inputEvents" :disabled="row.id" />
							</template>
						</v-date-picker>
					</div>

					<div class="form-group col-xl-6 col-12">
						<p class="input-title">{{ t('invoiceList.invoiceData.attachments') }}</p>
						<div class="">
							<div>
								<div class="input-pera btn-color position-relative">
									<drop-zone :disabled="row.id" @fileDrop="file => handleContractFileChange(file, index)" class="mb-4" :isUploadButton="false" />
									<div class="preview top-0 left-0" v-if="row.contractFilePreview">
										<div id="preview">
											<div class="dz-preview dz-error dz-complete dz-image-preview dz-img-wrap">
												<div class="dz-image">
													<img data-dz-thumbnail="" alt="Invocie receipt file image" :src="row.contractFilePreview" class="img-fluid" />
												</div>
												<div class="dz-details d-flex align-items-center position-absolute">
													<div class="dz-filename">
														<span>
															{{ row.contractFile?.name }}
														</span>
													</div>
													<div class="ml-2 mt-2 preview">
														<button type="button" class="drop-close" @click="removeInvoiceReceiptFile(index, row.id)">
															<FontAwesomeIcon :icon="closeIcon" />
														</button>
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
			</div>

			<div class="invoice-pd add-row">
				<div class="pph-left">
					
				</div>
				<span class="border-top w-100 mx-2"></span>
				
			</div>
			<!-- End Receipts Section -->

			<!-- Start Summary Calculations -->
			<div class="row no-gutters m-n2 pt-3">
				<div class="px-2 col-lg-4 col-12">
					<div class="summary-box">
						<h1>{{ t('invoiceList.leInvoice.addInvoice.summaryCalculations') }}</h1>
						<div class="d-flex">
							<h1 class="border-bottom summary-calc ml-auto mt-5 text-right d-inline-block ml-auto">€ {{ Number(totalSummaryCalculations).toFixed(2) }}</h1>
						</div>
					</div>
				</div>

				<div class="px-2 col-lg-8 col-12">
					<div class="dark-box mt-lg-0 mt-3">
						<div class="row no-gutters">
							<div class="col-md-6 col-12">
								<ul>
									<li class="fw-bold dark-box-text lh-lg">{{ t('workDetails.allowances') }}</li>
									<li class="dark-box-text lh-lg">
										<!-- Full day allowances -->
										{{ t('fieldList.lunchCompensation') }}
									</li>
									<li class="dark-box-text lh-lg">
										<!-- part day allowances -->
										{{ t('fieldList.dayCompensation') }}
									</li>
									<li class="dark-box-text lh-lg">
										<!-- part day allowances -->
										{{ t('workDetails.otherCompensation') }}
									</li>

									<!-- kilometer allowances -->
									<li class="dark-box-text lh-lg">{{ t('workDetails.kilometerAllowances') }}</li>
									<span v-if="totalSumKillometer">
										<li v-if="transportedHeavyLoad" class="dark-box-text lh-lg">{{ t('workDetails.transportedHeavyLoad') }}</li>
										<li v-if="drivenRoughTerrain" class="dark-box-text lh-lg">{{ t('workDetails.Driveninroughterrain') }}</li>
										<li v-if="vehicleSubClassField" class="dark-box-text lh-lg">{{ t('workDetails.Trailer') }}</li>
									</span>
								</ul>
							</div>
							<div class="col-md-4 col-6">
								<ul>
									<li class="fw-bold dark-box-text lh-lg">{{ t('workDetails.Amount') }}</li>
									<li class="dark-box-text lh-lg">€ {{ lunchCompensationAmount || 0 }}</li>
									<li class="dark-box-text lh-lg">€ {{ dayCompensationAmount || 0 }}</li>
									<li class="dark-box-text lh-lg">€ {{ otherCompensationAmount || 0 }}</li>

									<!-- kilometer allowances -->
									<li class="dark-box-text lh-lg">€ {{ (totalSumKillometer * invoiceAllownceTracer.distanceAllownce).toFixed(2) }}</li>
									<span v-if="totalSumKillometer">
										<li v-if="transportedHeavyLoad" class="dark-box-text lh-lg">
											€ {{ transportedHeavyLoad ? (totalSumKillometer * invoiceAllownceTracer.transported_heavyloads).toFixed(2) : 0 }}
										</li>

										<li v-if="drivenRoughTerrain" class="dark-box-text lh-lg">
											€ {{ drivenRoughTerrain ? (totalSumKillometer * invoiceAllownceTracer.driven_in_rough_terrain).toFixed(2) : 0 }}
										</li>

										<li v-if="vehicleSubClassField" class="dark-box-text lh-lg">
											€ {{ vehicleSubClassField ? (totalSumKillometer * invoiceAllownceTracer.vehicle_subclass).toFixed(2) : 0 }}
										</li>
									</span>
								</ul>
							</div>
							<div class="col-md-2 col-6">
								<ul>
									<li class="fw-bold dark-box-text lh-lg">{{ t('workDetails.sum') }}</li>
									<li class="dark-box-text lh-lg">€ {{ lunchCompensationAmount || 0 }}</li>
									<li class="dark-box-text lh-lg">€ {{ dayCompensationAmount || 0 }}</li>
									<li class="dark-box-text lh-lg">€ {{ otherCompensationAmount || 0 }}</li>

									<!-- kilometer allowances -->
									<li class="dark-box-text lh-lg">€ {{ (totalSumKillometer * invoiceAllownceTracer.distanceAllownce).toFixed(2) }}</li>
									<span v-if="totalSumKillometer">
										<li v-if="transportedHeavyLoad" class="dark-box-text lh-lg">
											€ {{ transportedHeavyLoad ? (totalSumKillometer * invoiceAllownceTracer.transported_heavyloads).toFixed(2) : 0 }}
										</li>

										<li v-if="drivenRoughTerrain" class="dark-box-text lh-lg">
											€ {{ drivenRoughTerrain ? (totalSumKillometer * invoiceAllownceTracer.driven_in_rough_terrain).toFixed(2) : 0 }}
										</li>

										<li v-if="vehicleSubClassField" class="dark-box-text lh-lg">
											€ {{ vehicleSubClassField ? (totalSumKillometer * invoiceAllownceTracer.vehicle_subclass).toFixed(2) : 0 }}
										</li>
									</span>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- End Summary Calculations -->
			<div class="text-center mt-5 pb-3">
				<ToolTip :title="t('toolTip.updateWorkDetail')">
					<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">{{ t('common.update') }}</button>
				</ToolTip>
			</div>
		</form>
	</div>
	<!-- daily work hour list -->
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, reactive, ref } from '@vue/runtime-core';
import { faArrowDown, faArrowLeft, faArrowRight, faChevronDown, faMapMarkerAlt, faPaperclip, faPlus, faCalendarWeek, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import { vatTypeOptionsNew, contractTypeOptions, invoiceAllownceTracer, gAuComRestriction } from '@/utils/enums.js';
import { useRouter, useRoute } from 'vue-router';

export default {
	name: 'TeamCostExpenses',

	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	setup() {
		// ref
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const formFieldsData = ref('');
		const vehicleCheckBoxValue = ref(false);
		const transportedHeavyLoad = ref(false);
		const drivenRoughTerrain = ref(false);
		const vehicleSubClassField = ref(false);
		const transportedWorkload = ref(false);
		const start = ref('');
		const end = ref('');
		const closeIcon = faTimes;
		const imageFile = ref(null);
		const tripStartTime = ref(null);
		const tripEndTime = ref(null);
		const receiptItem = ref([
			{
				purchase_place: null,
				purchase_date: null,
				receipt_file: '',
				contractFile: null,
			},
		]);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('workDetails.editWorkDetails')} - Way2Work`;

		// global store
		const store = useStore(); // use state
		const isSubmitting = ref(false);
		// global router
		const router = useRouter();
		// global route
		const route = useRoute();

		// icon
		const rightIcon = faArrowRight;
		const bottomIcon = faArrowDown;
		const leftArrowIcon = faArrowLeft;
		const faMapMarker = faMapMarkerAlt;
		const downArrowIcon = faChevronDown;
		const paperClipIcon = faPaperclip;
		const plusIcon = faPlus;
		const calenderIcon = faCalendarWeek;
		const ionvoiceWorkDetail = ref(null);
		const multiselectFiled = ref(false);
		const wayPointItems = ref([]);

		//Form Field

		// form schema validation
		const workDetailsSchema = yup.object({
			trip_name: yup
				.string()
				.nullable()
				.notRequired(),
			trip_start_address: yup
				.string()
				.nullable()
				.notRequired(),
			trip_end_address: yup
				.string()
				.nullable()
				.notRequired(),

			trip_start_date: yup
				.string()
				.nullable()
				.notRequired(),

			trip_start_time: yup
				.string()
				.nullable()
				.notRequired(),
			trip_end_date: yup
				.string()
				.nullable()
				.notRequired(),

			trip_end_time: yup
				.string()
				.nullable()
				.notRequired(),
			trip_calculate_time: yup
				.number()
				.nullable()
				.notRequired(),
			vehicle_number: yup
				.string()
				.nullable()
				.notRequired(),
			vehicle_class: yup
				.string()
				.nullable()
				.notRequired(),
			description: yup
				.string()
				.nullable()
				.notRequired(),
			lunch_compensation: yup
				.number()
				.nullable()
				.notRequired(),
			distance: yup
				.number()
				.nullable()
				.notRequired()
				.min(0, t('validation.minDistance', { minLen: 0 })),
			total_work: yup
				.number()
				.typeError(
					t('validation.requiredField', {
						field: 'fieldList.hoursPieces',
					}),
				)
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.hoursPieces',
					}),
				),
			other_compensation: yup
				.number()
				.nullable()
				.notRequired(),
			day_compensation: yup
				.number()
				.nullable()
				.notRequired(),
			contract_type: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.contractType',
					}),
				),
			contract_value: yup
				.number()
				.typeError(
					t('validation.requiredField', {
						field: 'fieldList.contractValue',
					}),
				)
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.contractValue',
					}),
				),
			date: yup
				.string()
				.nullable()
				.typeError(
					t('validation.requiredField', {
						field: 'fieldList.contractDate',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.contractDate',
					}),
				),
			teamId: yup
				.number()
				.nullable()
				.notRequired(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, errors } = useForm({
			validationSchema: workDetailsSchema,
		});
		//trip name
		const tripNameField = reactive(useField('trip_name', undefined, { initialValue: null }));
		// start address
		const tripStartAddressField = reactive(useField('trip_start_address', undefined, { initialValue: null }));
		// end address
		const tripEndAddressField = reactive(useField('trip_end_address', undefined, { initialValue: null }));
		// trip start date
		const tripStartDateField = reactive(
			useField('trip_start_date', undefined, {
				initialValue: null,
			}),
		);
		// trip start time
		const tripStartTimeHoursField = reactive(
			useField('trip_start_time', undefined, {
				initialValue: moment()
					.startOf('day')
					.toDate(),
			}),
		);

		// tripe end date
		const tripEndDateField = reactive(useField('trip_end_date', undefined, { initialValue: null }));
		// tripe end time
		const tripEndTimeHourField = reactive(
			useField('trip_end_time', undefined, {
				initialValue: moment()
					.startOf('day')
					.toDate(),
			}),
		);
		// trip calculations
		const tripCalculateTimeField = reactive(useField('trip_calculate_time', undefined, { initialValue: 0 }));
		//  vehicle registration
		const vehicleRegistrationField = reactive(
			useField('vehicle_number', undefined, {
				initialValue: null,
			}),
		);
		// vehicle class
		const vehicleClassField = reactive(useField('vehicle_class', undefined, { initialValue: null }));

		//work description
		const workDescription = reactive(useField('description', undefined, { initialValue: null }));
		//total work hour
		const totalWorkField = reactive(useField('total_work', undefined, { initialValue: null }));
		// lunch compensation Field
		const lunchCompensationField = reactive(useField('lunch_compensation', undefined, { initialValue: 0 }));
		//day Compensation Field
		const otherCompensationField = reactive(useField('other_compensation', undefined, { initialValue: 0 }));
		const dayCompensationField = reactive(useField('day_compensation', undefined, { initialValue: 0 }));
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

		const dateField = reactive(
			useField('date', undefined, {
				initialValue: null,
			}),
		);
		const showTeamField = reactive(
			useField('teamId', undefined, {
				initialValue: null,
			}),
		);

		/**
		 * Mounted
		 * *******************************************************************
		 */

		// start add null
		const handleStartPlaceChange = () => {
			start.value = null;
		};
		// end add null
		const handleEndPlaceChange = () => {
			end.value = null;
		};
		onMounted(() => {
			fetchWorkDetail();
			store.dispatch('workDetail/getWrokTeam');
			//get lunch compensation
			fetchLunchCompensation();
			fetchfullDayCompensation();
			
			//get travelling fees
			fetchTravellingFees();
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		const totalSumKillometer = computed(() => {
			return store.state.workDetail.totalKilloMeter;
		});

		const lunchCompensationAmount = computed(() => {
			return lunchCompensationField.value == 0 ? 0 : (lunchCompensation.value.find(x => x.value === lunchCompensationField.value) || {}).compensation_value;
		});

		const dayCompensationAmount = computed(() => {
			return dayCompensationField.value == 0 ? 0 : (halfFullCompnesation.value.find(x => x.value === dayCompensationField.value) || {}).compensation_value;
		});

		const otherCompensationAmount = computed(() => {
			return otherCompensationField.value;
		});

		//calculate trip time
		const calculateTripTime = computed(() => {
			const startTime = tripStartTime.value;
			const endTime = tripEndTime.value;
			const startDate = moment(tripStartDateField.value).format('YYYY/MM/DD');
			const endDate = showTeamField.value != null ? moment(tripStartDateField.value).format('YYYY/MM/DD') : moment(tripEndDateField.value).format('YYYY/MM/DD');
			const startDateTime = moment(`${startDate} 00:00`, 'YYYY/MM/DD HH:mm');
			const endDateTime = moment(`${endDate} 23:59`, 'YYYY/MM/DD HH:mm').add(1, 'minutes');

			const dayHours = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes') / 60;

			const diff = moment(endDateTime).diff(moment(startDateTime), 'days');
			return Number.parseFloat(dayHours * diff).toFixed(2);
			
		});

		//totalSummaryCalculations
		const totalSummaryCalculations = computed(() => {
			const distanceAmount = Number(totalSumKillometer.value) * invoiceAllownceTracer.distanceAllownce;
			const totalSummary =
				Number(lunchCompensationAmount.value) +
				Number(dayCompensationAmount.value) +
				distanceAmount +
				Number(otherCompensationAmount.value) +
				Number(transportedHeavyLoad.value ? Number(totalSumKillometer.value) * 0.23 : 0) +
				Number(drivenRoughTerrain.value ? Number(totalSumKillometer.value) * 0.1 : 0) +
				Number(vehicleSubClassField.value ? Number(totalSumKillometer.value) * 0.08 : 0);
			return totalSummary;
		});

		// multiple days select
		const onMultiselectFiled = () => {
			multiselectFiled.value = !multiselectFiled.value;
			return multiselectFiled.value;
		};

		// get employer list
		const employerList = computed(() => {
			return store.getters['invoice/getEmployerList'];
		});

		// get team list
		const teamList = computed(() => {
			return store.getters['workDetail/getTeamOptions'];
		});

		const origin = computed(() => {
			if (!start.value) return null;
			return { query: start.value };
		});
		const destionation = computed(() => {
			if (!end.value) return null;
			return { query: end.value };
		});
		// calculate file size
		const calculateFileSize = computed(() => {
			return file => {
				const bytes = file.size || 0;

				// convert file size to MB from kb
				if (bytes === 0) {
					return 0;
				}

				return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
			};
		});

		//get half full day compensation
		const halfFullCompnesation = computed(() => {
			return store.getters['workDetail/getHlafFullDayCompensation'];
		});

		//get lunch compensation
		const lunchCompensation = computed(() => {
			return store.getters['workDetail/getLunchCompensation'];
		});

		//lunch compensation disabled
		const isDisableCompensation = computed(() => {
			return val => {
				if (val === 'fullHalfDay' && lunchCompensationField.value > 0) {
					return true;
				} else if (val === 'lunch' && dayCompensationField.value > 0) {
					return true;
				} else {
					return false;
				}
			};
		});

		//diff days
		const daysDiff = computed(() => {
			if (tripStartDateField.value && tripEndDateField.value) {
				const startDate = moment(tripStartDateField.value).format('YYYY/MM/DD');
				const endDate = moment(tripEndDateField.value).format('YYYY/MM/DD');
				const startDateTime = moment(`${startDate} 00:00`, 'YYYY/MM/DD HH:mm');
				const endDateTime = moment(`${endDate} 23:59`, 'YYYY/MM/DD HH:mm').add(1, 'minutes');
				const days = moment(endDateTime).diff(startDateTime, 'days');
				return days || 0;
			}
			return 1;
		});

		const totalDiscountCalculation = computed(() => {
			const areaDistance = Number(store.state.workDetail.totalKilloMeter);
			const distance_Allownce = store.state.workDetail.travellingFees.travelling_by_car || invoiceAllownceTracer.distanceAllownce;
			const tripDays = daysDiff.value;
			const tripTotalDistance = areaDistance * tripDays;
			let tripTotalDistanceAllowance = tripTotalDistance * distance_Allownce;

			if (transportedHeavyLoad.value) {
				const transportedHeavyloads = store.state.workDetail.travellingFees.heavy_load || invoiceAllownceTracer.transported_heavyloads;
				tripTotalDistanceAllowance += tripTotalDistance * transportedHeavyloads;
			}

			if (drivenRoughTerrain.value) {
				const driven_in_rough_terrain = store.state.workDetail.travellingFees.rough_terrian || invoiceAllownceTracer.driven_in_rough_terrain;
				tripTotalDistanceAllowance += tripTotalDistance * driven_in_rough_terrain;
			}

			if (vehicleSubClassField.value) {
				const vehicle_subclass = store.state.workDetail.travellingFees.trailer || invoiceAllownceTracer.vehicle_subclass;
				tripTotalDistanceAllowance += tripTotalDistance * vehicle_subclass;
			}

			return Math.round(((tripTotalDistanceAllowance ? parseFloat(tripTotalDistanceAllowance) : 0) + Number.EPSILON) * 10 ** 2) / 10 ** 2;
		});

		const distanceKillometer = computed(() => {
			return Math.round(Number(store.state.workDetail.totalKilloMeter * daysDiff.value)) || 0;
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// handle work detail amount change
		const handleContractValue = (e, textType) => {
			if (textType === 'contract_type' && e.target.value === 'pieces') {
				totalWorkField.value = 1;
			} else {
				totalWorkField.value = null;
			}
		};
		const clearVal = () => {};

		const fetchWorkDetail = async () => {
			await store.dispatch('workDetail/getWorkDetailById', route.params.id).then(res => {
				const data = res.data;
				receiptItem.value = data.receipts.reduce((acc, item) => {
					acc.push({
						id: item.id,
						purchase_place: item.purchase_place || '',
						purchase_date: item.purchase_date == null ? null : moment(item.purchase_date).format('YYYY/MM/DD'),
						receipt_file: item.receipt_file,
						contractFile: item.file_path || null,
						contractFilePreview: item.file_path || null,
						file_path: item.file_path || null,
					});
					return acc;
				}, []);

				document.getElementById('totalDistance').innerHTML = `${data.distance} km`;
				store.commit('workDetail/SET_STATE', {
					action: 'totalKilloMeter',
					data: data.distance,
				});

				tripNameField.value = data.trip_name;
				tripStartAddressField.value = data.trip_start_address;
				tripEndAddressField.value = data.trip_end_address;
				tripStartDateField.value = data.trip_start_date;
				tripStartTime.value = data.trip_start_time || '00:00';
				tripEndTime.value = data.trip_end_time || '00:00';
				tripEndDateField.value = data.trip_end_date;
				vehicleRegistrationField.value = data.vehicle_number;
				vehicleClassField.value = data.vehicle_class;
				vehicleSubClassField.value = data.vehicle_subclass || false;
				workDescription.value = data.description;
				totalWorkField.value = data.total_work;
				lunchCompensationField.value = (data.lunchCompensation && data.lunchCompensation.id) || 0;
				dayCompensationField.value = (data.fullHalfDayCompensation && data.fullHalfDayCompensation.id) || 0;
				otherCompensationField.value = data.other_compensation || 0;

				otherCompensationAmount.value = (data.otherCompensation && data.otherCompensation.compensation_value) || 0;
				transportedHeavyLoad.value = data.transported_heavyloads;
				drivenRoughTerrain.value = data.driven_in_rough_terrain;
				transportedWorkload.value = data.transported_workload;
				multiselectFiled.value = data.multiple_days_select || false;
				contactTypeField.value = data.contract_type;
				contractValueField.value = data.contract_value;
				dateField.value = data.date;
				showTeamField.value = data.teamId;
				if (data.address_mid_points) {
					const midArray = JSON.parse(data.address_mid_points);
					wayPointItems.value = midArray.map(x => ({ location: x, stopover: true }));
				}
				const startingAddr = {
					formatted_address: data.trip_start_address ?? '',
				};
				const endingAddr = {
					formatted_address: data.trip_end_address ?? '',
				};

				setTimeout(() => {
					originStart(startingAddr);
					destionationEnd(endingAddr);
				}, 500);
			});
		};

		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			const Starttime = tripStartTime.value ? moment(tripStartTime.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';
			const EndTime = tripEndTime.value ? moment(tripEndTime.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';

			values.teamId = values.teamId ?? null;
			values.trip_start_address = start.value ?? null;
			values.trip_end_address = end.value ?? null;
			values.distance = store.state.workDetail.totalKilloMeter || 0;
			values.trip_start_time = Starttime;
			values.trip_end_time = EndTime;
			values.vehicleCheckBoxValue = vehicleCheckBoxValue.value;
			values.trip_calculate_time = calculateTripTime.value;
			values.transported_heavyloads = transportedHeavyLoad.value;
			values.driven_in_rough_terrain = drivenRoughTerrain.value;
			values.transported_workload = transportedWorkload.value;
			values.vehicle_subclass = vehicleSubClassField.value;
			values.vehicle_class = 'own_car';
			values.day_compensation = values.day_compensation == 0 ? null : values.day_compensation;
			values.lunch_compensation = values.lunch_compensation == 0 ? null : values.lunch_compensation;
			values.other_compensation = values.other_compensation == 0 ? 0 : values.other_compensation;
			values.multiple_days_select = multiselectFiled.value;
			
			values.receipts = receiptItem.value.filter(x => x.receipt_file && typeof x.receipt_file === 'number');

			values.date = values.date == null ? null : moment(values.date).format('YYYY/MM/DD');
			values.address_mid_points = JSON.stringify(wayPointItems.value.map(x => x.location));

			// save the work details
			await store
				.dispatch('workDetail/updateWorkDetails', {
					payload: values,
					id: route.params.id,
				})
				.then(({ data }) => {
					isSubmitting.value = false;
					if (route.params.workDairies) {
						let workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
						workDetails = workDetails.filter(wd => wd.id !== data.data.id);
						workDetails.push(data.data);
						localStorage.setItem('workDetails', JSON.stringify(workDetails));
						if (route.params.workDairies == 'ADD') {
							router.push({
								name: 'Add Invoice',
							});
						} else {
							let id = route.params.editInvoiceId || '';

							localStorage.setItem('invoiceWorkDairiesDetails', JSON.stringify(data.data));
							router.push({
								name: 'Edit Invoice',
								params: { id },
							});
						}
					} else {
						window.location.href = '/worked-details';
					}
				})
				.catch(err => {
					isSubmitting.value = false;
				});
		});

		//check box radio
		const onChangeValue = () => {
			vehicleCheckBoxValue.value = !vehicleCheckBoxValue.value;
			return vehicleCheckBoxValue.value;
		};

		// transpor tedHeavy Load
		const onTransported = () => {
			transportedHeavyLoad.value = !transportedHeavyLoad.value;
			return transportedHeavyLoad.value;
		};

		//transported Work load
		const onTransportedWorkload = () => {
			transportedWorkload.value = !transportedWorkload.value;
			return transportedWorkload.value;
		};

		const onTrailer = () => {
			vehicleSubClassField.value = !vehicleSubClassField.value;
			return vehicleSubClassField.value;
		};

		const ondrivenRough = () => {
			drivenRoughTerrain.value = !drivenRoughTerrain.value;
			return drivenRoughTerrain.value;
		};

		//tripe start time updated
		const tripsStartTime = event => {
			tripStartTime.value = event;
		};
		//tripe end time updated
		const tripsEndTime = event => {
			tripEndTime.value = event;
		};

		// handle upload multi file
		const handleContractFileChange = (file, index) => {
			imageFile.value = file;
			const formData = new FormData();
			formData.append('file', file[0]);
			formData.append('file_upload_from', 'workHoursReceipts');

			store.dispatch('uploadImage', formData).then(res => {
				receiptItem.value[index].receipt_file = res.data.tempUploadFile?.id;
				receiptItem.value[index].contractFile = file[0]; // store file
				receiptItem.value[index].contractFilePreview = ['image/png', 'image/jpg', 'image/svg', 'image/jpeg', 'image/pdf', 'image/csv'].includes(file[0].type)
					? res.data.file_link
					: require('@/assets/images/iconWomanDraw.png');
			});
		};
		// remove document file
		const removeInvoiceReceiptFile = (index, id) => {
			if (id) {
				store.dispatch('teamInvoice/deleteTeamInvoiceImage', id).then(() => {
					receiptItem.value.splice(index, 1);
				});
			}
			receiptItem.value[index].contractFile = null; // store file
			// file preview
			receiptItem.value[index].contractFilePreview = null;
		};
		// start address
		const originStart = place => {
			start.value = place.formatted_address;
		};
		// mid point address
		const destionationEnd = place => {
			end.value = place.formatted_address;
		};
		// destionation address
		const editWayPoint = (place, index) => {
			wayPointItems.value[index] = { location: place.formatted_address, stopover: true };
		};

		const addReceiptDetail = () => {
			receiptItem.value.push({
				purchase_place: '',
				purchase_date: '',
				receipt_file: '',
				contractFile: '',
				contractFilePreview: '',
				file_path: '',
			});
		};

		//remove item
		const removeRow = (index, id) => {
			if (id) {
				store.dispatch('workDetail/deleteWorkHourReciptImage', id).then(() => {
					receiptItem.value.splice(index, 1);
				});
			}
			receiptItem.value.splice(index, 1);
		};

		//get lunch compensation
		const fetchLunchCompensation = () => {
			const payload = {
				compensationType: 'lunch_compensation',
			};
			store.dispatch('workDetail/getLunchCompensation', payload);
		};

		//half_day_compensation, full_day_compensation,
		const fetchfullDayCompensation = () => {
			const payload = {
				compensationType: 'full_day_compensation',
			};
			store.dispatch('workDetail/getHalfFullCompensation', payload);
		};

		// fetch Travelling Fees
		const fetchTravellingFees = () => {
			store.dispatch('workDetail/getTravellingFees');
		};

		//get last two year date
		const lastTwoYear = () => {
			let lastYear = moment()
				.subtract(2, 'year')
				.format('YYYY/MM/DD');
			return lastYear;
		};

		// add midpoint text
		const addWayPointItem = () => {
			wayPointItems.value.push({
				location: null,
				stopover: true,
			});
		};
		//remove way point item
		const removeWayPointRow = index => {
			wayPointItems.value.splice(index, 1);
			const startingAddr = {
				formatted_address: start.value ?? '',
			};
			const endingAddr = {
				formatted_address: end.value ?? '',
			};
			setTimeout(() => {
				originStart(startingAddr);
				destionationEnd(endingAddr);
			}, 100);
		};


		return {
			//ref
			invoiceAllownceTracer,
			lastTwoYear,
			errors,
			imageFile,
			receiptItem,
			contractFile,
			contractFilePreview,
			totalSummaryCalculations,
			start,
			end,
			t,
			gAuComRestriction,
			vehicleCheckBoxValue,
			vatTypeOptionsNew,
			contractTypeOptions,
			formFieldsData,
			transportedHeavyLoad,
			drivenRoughTerrain,
			transportedWorkload,
			ionvoiceWorkDetail,
			tripStartTime,
			tripEndTime,
			multiselectFiled,
			wayPointItems,
			// icon
			rightIcon,
			bottomIcon,
			leftArrowIcon,
			calenderIcon,
			downArrowIcon,
			paperClipIcon,
			plusIcon,
			faMapMarker,
			closeIcon,
			//Field
			tripNameField,
			tripStartAddressField,
			tripEndAddressField,
			tripStartDateField,
			tripStartTimeHoursField,
			tripEndDateField,
			tripEndTimeHourField,
			tripCalculateTimeField,
			vehicleRegistrationField,
			vehicleClassField,
			vehicleSubClassField,
			workDescription,
			totalWorkField,
			lunchCompensationField,
			otherCompensationField,
			contactTypeField,
			contractValueField,
			dateField,
			showTeamField,

			// form related
			formMeta,
			isSubmitting,
			// computed
			calculateTripTime,
			employerList,
			teamList,
			origin,
			destionation,
			calculateFileSize,
			halfFullCompnesation,
			lunchCompensation,
			isDisableCompensation,
			removeInvoiceReceiptFile,
			lunchCompensationAmount,
			dayCompensationAmount,
			otherCompensationAmount,
			dayCompensationField,
			totalSumKillometer,
			daysDiff,
			totalDiscountCalculation,
			distanceKillometer,

			//method
			handleContractFileChange,
			submitForm,
			onChangeValue,
			onTransported,
			ondrivenRough,
			onTransportedWorkload,
			originStart,
			destionationEnd,
			addReceiptDetail,
			removeRow,
			clearVal,
			onTrailer,
			tripsStartTime,
			tripsEndTime,
			handleContractValue,
			handleStartPlaceChange,
			handleEndPlaceChange,
			onMultiselectFiled,
			editWayPoint,
			addWayPointItem,
			removeWayPointRow,

		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.vue-map-container {
	width: 100%;
	height: 600px;
}

.text-gray {
	color: #858a90;
}

.text-light-grey {
	color: #bbbfc4;
}

.summary-text {
	font-size: 13px;
	font-weight: 500;
}

.dropdown-menu {
	padding: 15px;
	border: transparent;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	color: #949494;
}

.invoice__list {
	width: 100%;
	display: block;
	align-items: center;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0px 2px 5px #ccc;

	.text-gray {
		margin-bottom: 15px;
	}

	.cost-sec {
		background-color: #e92028;

		.info-icon {
			max-width: 50px;
			height: 50px;

			@media (max-width: 1200px) {
				max-width: 40px;
				height: 40px;
			}

			@media (max-width: 1024px) {
				max-width: 30px;
				height: 30px;
			}

			@media (max-width: 576px) {
				max-width: 30px;
				height: 30px;
			}
		}

		p {
			font-size: 21px;
			font-weight: 600;
			color: #fff;
			letter-spacing: -2px;
			text-shadow: 1px 3px 3px #494848;
			white-space: nowrap;

			@media (max-width: 1200px) {
				font-size: 17px;
				letter-spacing: -2px;
			}

			@media (max-width: 1024px) {
				font-size: 16px;
			}

			@media (max-width: 768px) {
				font-size: 16px;
			}

			@media (max-width: 576px) {
				font-size: 12px;
			}
		}

		.cost-btn {
			background-color: #4c4f56;
			padding: 7px 15px;
			color: #fff;
			border-radius: 50px;
			font-size: 14px;
			letter-spacing: -1px;
			white-space: nowrap;

			@media (max-width: 1200px) {
				padding: 7px 9px;
				font-size: 12px;
			}

			@media (max-width: 1024px) {
				font-size: 12px;
				padding: 6px 12px;
				margin: 10px 0 0;
				margin-left: auto;
			}

			@media (max-width: 768px) {
				font-size: 12px;
				padding: 6px 12px;
				margin: 10px 0 0;
				margin-left: auto;
			}

			.right-icon {
				width: 25px;
				height: 25px;
				border: 2px solid #fff;
			}
		}
	}

	.explaination {
		padding: 10px;
		border-radius: 12px;
		outline: none;
		width: 100%;
		border: 3px dashed #dde0e2;
		font-weight: 600;
		font-size: 14px;
	}

	::placeholder {
		color: #a0a4a9;
		font-size: 13px;
	}

	.invoice-dropdown {
		background-color: #fff;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 15px;
		border-radius: 15px;

		&:focus {
			box-shadow: none;
		}
	}

	.grey-invoice-drop {
		background-color: #f9f9f9;
		border-radius: 10px;
		padding: 5px 15px;
	}

	.dropdown-toggle::after {
		display: none;
	}

	.start-time-drop {
		background-color: #fff;
		border-radius: 15px;
	}

	.add-row {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.plus {
			cursor: pointer;
			color: #ffff;
			max-width: 50px;
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 10px;
			border-radius: 50%;
			background-color: #ff4b57;
			border: 4px solid #ffe4e6;

			@media (max-width: 1200px) {
				max-width: 30px;
				height: 30px;
			}

			@media (max-width: 576px) {
				max-width: 30px;
				height: 30px;
			}
		}
	}
}

.invoice__list {
	width: 100%;
	display: block;
	align-items: center;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0px 2px 5px #ccc;

	.trip-text {
		font-size: 14px;
		font-weight: 500;
	}

	.pph-left-box {
		padding: 19px;
		border-radius: 20px;
		background-color: #f9f9f9;

		@media (max-width: 576px) {
			height: 100%;
		}

		.form-control {
			&.pac-target-input {
				padding: 8px 30px 8px 8px;
			}
		}
	}

	.pph-left {
		color: #a0a4a9;

		.title-lg {
			font-size: 20px;
		}
	}

	.company-titel {
		font-size: 13px;
		font-weight: 500;
		color: #858a90;
	}

	.form-control {
		background-color: #fff;
		position: relative;
		border: 1px solid #e7e7e7;
		height: auto;
		font-size: 14px;
	}

	.vat-drop {
		padding: 5px 10px;
	}

	.cost-ex-map iframe {
		width: 100%;
		min-height: 450px;
		border-radius: 10px;
	}

	.btn-padding {
		padding: 10px 14px;
		font-size: 13px;
	}

	.input-group {
		background: white;
		border-radius: 1rem;
	}

	.extras-font {
		font-size: 14px;
		font-weight: 500;
		color: #858a90;
	}

	.input-group-text {
		border: none;
		background-color: rgb(60, 60, 199);
		color: #fff;
		border-bottom-left-radius: 50px;
		border-top-left-radius: 50px;
		padding: 10px 20px;

		.form-check {
			margin-bottom: 20px;
		}

		.form-check-input {
			background-color: transparent;
			margin-left: -6px;
			border: 1px solid rgb(90, 88, 88);

			input {
				margin-left: -6px;
			}

			&:checked {
				background-color: #fff;
				border-color: #fff;
			}

			&:focus {
				box-shadow: none;
			}
		}
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

		.form-checkbox-width {
			width: 1.4em;
			height: 1.4em;
			margin: 0 0 0 -19px;

			&:focus {
				box-shadow: none;
			}
		}
	}

	.prof-bg-puzzle {
		position: relative;
		display: block;

		img {
			width: 100%;
			height: 100%;
			position: relative;
			object-fit: contain;
		}
	}

	.puzzle-text {
		position: absolute;
		top: 40px;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;

		@media (max-width: 1024px) {
			top: 50%;
		}
	}

	.invoice-grey-sec {
		border-radius: 10px;
		background-color: #f9f9f9;
		padding: 19px;
	}

	.calender-icon {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translate(-50%, -50%);
	}

	.input-title {
		font-size: 16px;
		margin-bottom: 5px;
		font-weight: 500;
		color: #858a90;
	}

	.input-area {
		outline: none;
		border: none;
		width: 100%;
		background-color: transparent;
	}

	.input-pera {
		width: 100%;
		padding: 7px 10px;
		border-radius: 12px;
		border: 2px dashed #e4e6e7;
	}

	.invoice-receipt {
		padding: 19px 0;
	}
}

.add-text {
	white-space: nowrap;

	@media (max-width: 1200px) {
		font-size: 13px;
		white-space: nowrap;
	}

	@media (max-width: 576px) {
		font-size: 13px;
		white-space: nowrap;
	}
}

.summary-box {
	background-color: #e92028;
	color: #fff;
	padding: 20px;
	border-radius: 20px;
	height: 100%;

	@media (max-width: 1200px) {
		max-width: 320px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		max-width: 320px;
		margin: 0 auto;
	}

	@media (max-width: 576px) {
		max-width: 320px;
		margin: 0 auto;
	}

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

		@media (max-width: 1024px) {
			font-size: 35px;
			letter-spacing: -2px;
		}
	}
}

.dark-box {
	background-color: #4c4f56;
	color: #fff;
	padding: 30px;
	border-radius: 20px;
	height: 100%;

	@media (max-width: 576px) {
		max-width: 320px;
		margin: 0 auto;
	}

	.dark-box-text {
		font-size: 19px;
		letter-spacing: -1px;
		text-shadow: 1px 3px 3px #494848;

		@media (max-width: 576px) {
			font-size: 14px;
		}
	}

	.dark-box-input {
		background-color: #4c4f56;
		border: none;
		color: #fff;
		width: 80%;
	}
}

.dropdown-menu {
	width: 100%;
}

.transparent-input {
	opacity: 0.9;
}

.additional-dropdown {
	background-color: #fff;
	opacity: 0.9;
	border-radius: 50px;
}

.grey-drop {
	padding: 5px 10px;
	background-color: #f9f9f9;
	border-radius: 10px;
	font-size: 13px;

	&:focus {
		box-shadow: none;
	}
}

.dropdown-item {
	&:hover {
		background-color: transparent;
		color: #ff4b57;
	}
}

.plus {
	cursor: pointer;
	color: #ffff;
	max-width: 40px;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	border-radius: 50%;
	background-color: #ff4b57;
	border: 4px solid #ffe4e6;

	@media (max-width: 1200px) {
		max-width: 30px;
		height: 30px;
	}

	@media (max-width: 576px) {
		max-width: 30px;
		height: 30px;
	}

	.w-11 {
		width: 11px;
	}
}

.midpoint-wrap {
	.form-control {
		padding: 8px 45px 8px 8px !important;
	}

	.calender-icon {
		right: 15px;
		transform: translate(-15px, -50%) !important;
	}

	.close-icon {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		cursor: pointer;
	}
}
</style>
<style lang="scss">
.time__selector {
	.vc-time-picker {
		padding: 0;
		justify-content: center;

		.vc-time-content {
			.vc-time-date {
				display: none;
			}

			.vc-select select {
				width: 120px;
			}
		}

		.vc-time-icon {
			display: none;
		}
	}
}

.vue-map {
	border-radius: 20px;
}

.close-btn {
	background-color: #ff4b57;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.dz-image {
	width: 120px;
	height: 120px;
	position: absolute;
	top: 0;
	right: -170px;
}

.dz-details {
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(100%, -80%);
}

.checkbox-left-padding {
	padding-left: 15px;
}

.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
</style>
