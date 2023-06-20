<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_documents" content-class="modal-content px-0 pb-0" :click-to-close="false">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div>
			<div class="modal__content">
				<!-- modal header -->
				<div class="modal-header">
					<h5 class="title-lg">
						{{ t('workDetails.addWorkDetails') }}
					</h5>
				</div>

				<!-- modal body -->
				<div>
					<div class="modal-body">
						<div class="modal-form">
							<!-- form -->
							<div class="invoice__list">
								<form class="theme-input tab-form">
									<div class="invoice-sec invoice-pd">
										<div class="row m-auto">
											<div class="col-xl-6">
												<div class="pph-left">
													<h5 class="title-lg mb-2">{{ t('invoiceList.leInvoice.addInvoice.tripDtl') }}</h5>
												</div>
												<div class="pph-left-box">
													<div class="row">
														<!-- trip Name -->
														<div class="col-md-12 form-group">
															<label for="tripName" class="company-titel"> {{ t('workDetails.tripName') }} </label>
															<input
																id="tripName"
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
														<div class="col-md-12">
															<div class="col-md-12 form-group p-0">
																<div class="position-relative">
																	<div class="d-flex justify-content-between align-items-end mb-1">
																		<label for="startingAddress" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.startingAddress') }}</label>
																		<div class="plus" @click="addWayPointItem">
																			<FontAwesomeIcon :icon="plusIcon" class="w-11" />
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
																			id="waypoints"
																			type="text"
																			class="form-control"
																			:placeholder="
																				t('validation.enterField', {
																					field: 'fieldList.tripMidAddress',
																				})
																			"
																			:value="row.location"
																			@place_changed="data => wayPoints(data, index)"
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
														<div class="col-md-12">
															<div class="col-md-12 form-group p-0">
																<div class="position-relative">
																	<label for="endingAddress" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.endingAddress') }}</label>

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
														<!-- End Ending Address -->
														<!-- Start Trip Starting date -->
														<div class="col-md-4">
															<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingDate') }}</label>
															<div class="form-group dropdown select-employee">
																<div>
																	<p class="company-input input-date">
																		<v-date-picker
																			@input="tripStartDateField.handleChange;"
																			@blur="tripStartDateField.handleBlur;"
																			v-model="tripStartDateField.value"
																			:min-date="`2020/01/01`"
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
														<div class="col-md-8">
															<div class="form-group px-3">
																<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripStartingTime') }}</label>

																<div class="row">
																	<div class="col-12 p-0">
																		<div class="dropdown select-employee">
																			<div>
																				<input
																					type="time"
																					name="edit_end_time"
																					id="trip_Starting_time"
																					class="form-control"
																					v-model="tripStartTime"
																					style="border-radius: 10px"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!-- End Trip Starting date -->
														<!-- Start Trip Ending date -->
														<div class="col-md-4">
															<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.tripEndingDate') }}</label>
															<div class="form-group dropdown select-employee">
																<p class="company-input input-date">
																	<v-date-picker
																		@input="tripEndDateField.handleChange;"
																		@blur="tripEndDateField.handleBlur;"
																		v-model="tripEndDateField.value"
																		:min-date="`2020/01/01`"
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
														<!-- End Trip Ending date -->

														<!-- Start Ending Time -->
														<div class="col-md-8">
															<div class="form-group px-3">
																<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.endingTime') }}</label>

																<div>
																	<div class="row">
																		<div class="col-12 p-0">
																			<div class="dropdown select-employee">
																				<div>
																					<input
																						type="time"
																						name="edit_end_time"
																						id="ending_time"
																						class="form-control"
																						v-model="tripEndTime"
																						style="border-radius: 10px"
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<!-- End Ending Time -->

														<label for="firstName" class="company-titel pl-3">{{ t('invoiceList.leInvoice.addInvoice.extras') }} </label>
														<div class="ml-3">
															<div class="row">
																<div class="col-md-4 form-check form-checkbox">
																	<input
																		class="form-check-input form-checkbox-width"
																		type="checkbox"
																		id="transportedHeavyLoad"
																		:checked="transportedHeavyLoad"
																		:value="transportedHeavyLoad.value"
																		:v-model="transportedHeavyLoad.value"
																		@click="onTransported($event)"
																	/>
																	<label class="form-check-label extras-font checkbox-left-padding white-space" for="transportedHeavyLoad">
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
																	<label class="form-check-label extras-font checkbox-left-padding white-space" for="vehicleSubClass">
																		{{ t('workDetails.Trailer') }}
																	</label>
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
																				>{{ t('invoiceList.leInvoice.addInvoice.multipleRowsBy') }} {{ daysDiff == 1 ? 0 : daysDiff || 0 }}
																				{{ t('workDetails.days') }}
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<!-- Start Calculatedtrip Time -->
														<div class="col-md-4 col-6">
															<label for="firstName" class="company-titel">{{ t('fieldList.tripTime') }}</label>
															<p class="trip-text" id="calculatedtripTime">{{ calculateTripTime }}</p>
														</div>
														<!-- End Calculatedtrip Time -->

														<!-- Start Total distance  -->
														<div class="col-md-4 col-6">
															<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.totalDistance') }}</label>
															<p class="trip-text">{{ distanceKillometer }} {{ t('common.km') }}</p>
														</div>
														<!-- End Total distance  -->

														<!-- Start Total allowance  -->
														<div class="col-md-4 col-6">
															<label for="firstName" class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.totalAllowances') }}</label>
															<p class="trip-text">€ {{ totalDiscountCalculation }}</p>
														</div>

														<!-- End Total allowance  -->

														<!-- Attechment button -->
													</div>
												</div>
											</div>
											<!-- map view section -->
											<div class="col-xl-6">
												<div class="pph-left">
													<h5 class="title-lg mb-2">{{ t('invoiceList.leInvoice.addInvoice.preview') }}</h5>
												</div>
												<div id="directions_panel" style="margin:20px;background-color:#FFEE77;"></div>
												<div class="cost-ex-map">
													<GMapMap
														style="border: 0"
														:zoom="7"
														:center="{
															lat: 60.1699,
															lng: 24.9384,
														}"
														allowfullscreen=""
														loading="lazy"
													>
														<directions-renderer travelMode="ArrivalTime" :origin="origin" :destination="destionation" :waypoints="wayPointItems">
															<p id="distance"></p>
														</directions-renderer>
													</GMapMap>
												</div>
											</div>
										</div>
									</div>
									<!-- Start Vehicle Section -->
									<div class="detail-sec">
										<div class="row"></div>

										<div class="invoice-grey-sec">
											<div class="row">
												<div class="col-md-4 form-group">
													<label for="Lunch Compensation" class="company-titel">{{ t('fieldList.lunchCompensation') }}</label>
													<div>
														<Multiselect
															id="lunch_compensation"
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

												<div class="col-md-4 form-group">
													<label for="Lunch Compensation" class="company-titel">{{ t('fieldList.dayCompensation') }}</label>
													<div>
														<Multiselect
															id="full_half_day_compensation"
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

												<div class="col-xl-4 col-md-6 form-group mb-3">
													<label for="tripName" class="company-titel"> {{ t('fieldList.otherCompensation') }} </label>
													<input
														id="other_compensation"
														type="number"
														min="0"
														class="form-control"
														@input="otherCompensationField.handleChange"
														@blur="otherCompensationField.handleBlur"
														:value="otherCompensationField.value"
													/>
												</div>
											</div>

											<div class="text-secondary summary-text">
												{{ t('invoiceList.leInvoice.addInvoice.summary') }} = €{{ getLunchCompensationValue }}
												<span class="text-small"> ({{ t('invoiceList.leInvoice.addInvoice.lunchCompensation') }})</span> * €{{ daysDiff }}
												<span class="text-small">({{ t('invoiceList.leInvoice.addInvoice.tripDays') }}) </span> = €{{ Number(getLunchCompensationValue) * Number(daysDiff) }}
											</div>
										</div>
									</div>
									<!-- End Vehicle Section -->
									<div class="text-center mt-2 pb-3">
										<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">
											{{ t('common.submit') }}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import moment from 'moment';
import { ref, computed, reactive, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faArrowDown, faArrowLeft, faArrowRight, faChevronDown, faMapMarkerAlt, faPaperclip, faPlus, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import { vatTypeOptionsNew, gAuComRestriction, invoiceAllownceTracer } from '@/utils/enums.js';

export default {
	name: 'WorkDetailModal',

	//components
	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	props: {
		// modal status
		isModalShow: Boolean,
		indexId: Number,
		addNewItem: Boolean,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const formFieldsData = ref('');
		const vehicleCheckBoxValue = ref(false);
		const multiselectFiled = ref(false);
		const transportedHeavyLoad = ref(false);
		const drivenRoughTerrain = ref(false);
		const transportedWorkload = ref(false);
		const vehicleSubClassField = ref(false);
		const start = ref('');
		const end = ref('');
		const imageFile = ref(null);
		const tripStartTime = ref(null);
		const tripEndTime = ref(null);
		const compensationType = ref(null);
		const onTransportedValue = ref(1);
		const ondrivenRoughValue = ref(1);
		const onTrailerValue = ref(1);
		// icons
		const closeIcon = faTimes;
		const rightIcon = faArrowRight;
		const bottomIcon = faArrowDown;
		const leftArrowIcon = faArrowLeft;
		const faMapMarker = faMapMarkerAlt;
		const downArrowIcon = faChevronDown;
		const paperClipIcon = faPaperclip;
		const plusIcon = faPlus;
		const calenderIcon = faCalendarWeek;
		const ionvoiceWorkDetail = ref(null);
		const wayPointItems = ref([]);
		const isSubmitting = ref(false);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

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
				.nullable()
				.notRequired(),
			other_compensation: yup
				.string()
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
					t('validation.beMust', {
						field: 'fieldList.contract_value',
						type: 'number',
					}),
				)
				.nullable(),
			date: yup.string().nullable(),
			teamId: yup
				.number()
				.nullable()
				.notRequired(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, setValues } = useForm({
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
		const dayCompensationField = reactive(useField('day_compensation', undefined, { initialValue: 0 }));
		const otherCompensationField = reactive(useField('other_compensation', undefined, { initialValue: 0 }));
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
				initialValue: new Date(),
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
		onMounted(async () => {
			// fetch work detail
			store.dispatch('invoice/getDefaultEmployerList');
			store.dispatch('workDetail/getWrokTeam');

			fetchInvoiceWorkDairies();
			//get lunch compensation
			fetchLunchCompensation();
			//half_day_compensation, full_day_compensation,
			fetchfullDayCompensation();
			//get travelling fees
			fetchTravellingFees();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		const calculateTripTime = computed(() => {
			const startTime = tripStartTime.value;
			const endTime = tripEndTime.value;
			const startDate = moment(tripStartDateField.value).format('YYYY/MM/DD');
			const endDate = moment(tripEndDateField.value).format('YYYY/MM/DD');
			const startDateTime = moment(`${startDate} 00:00`, 'YYYY/MM/DD HH:mm');
			const endDateTime = moment(`${endDate} 23:59`, 'YYYY/MM/DD HH:mm').add(1, 'minutes');

			const dayHours = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes') / 60;

			const diff = moment(endDateTime).diff(moment(startDateTime), 'days');

			return Number.parseFloat(Number(dayHours || 0) * Number(diff || 0)).toFixed(2);
		});

		const totalSummaryCalculations = computed(() => {
			const totalSummary = Number(lunchCompensationField.value) + Number(otherCompensationField.value);
			return totalSummary;
		});

		// get employer list
		const employerList = computed(() => {
			return store.getters['invoice/getEmployerList'];
		});

		const origin = computed(() => {
			if (!start.value) return null;
			return { query: start.value };
		});

		const wayPointDestination = computed(() => {
			if (!wayPointDestination.value) return null;

			return true;
		});

		const destionation = computed(() => {
			if (!end.value) return null;
			return { query: end.value };
		});
		// calculate file size
		const calculateFileSize = computed(() => {
			return file => {
				const bytes = file.size || 0;

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
			return Math.round((Number(store.state.workDetail.totalKilloMeter * daysDiff.value) + Number.EPSILON) * 10 ** 2) / 10 ** 2;
		});

		/**
		 * get lunch compensation value
		 */
		const getLunchCompensationValue = computed(() => {
			return (lunchCompensation.value.find(x => x.id === lunchCompensationField.value) || { compensation_value: 0 }).compensation_value;
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// clear selected value
		const clearVal = () => {};

		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			let invoiceWorkDetails = localStorage.getItem('invoiceWorkDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDetails')) : [];
			const Starttime = tripStartTime.value ? moment(tripStartTime.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';
			const EndTime = tripEndTime.value ? moment(tripEndTime.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';

			const workDetailData = { ...values, vehicle_class: 'own_car' };

			if (invoiceWorkDetails.length) {
				workDetailData.teamId = values.teamId ?? null;
				workDetailData.trip_start_address = start.value ?? null;
				workDetailData.trip_end_address = end.value ?? null;
				workDetailData.address_mid_points = JSON.stringify(wayPointItems.value.map(x => x.location));
				workDetailData.distance = store.state.workDetail.totalKilloMeter || 0;
				workDetailData.trip_start_date = values.trip_start_date == null ? null : moment(values.trip_start_date).format('YYYY/MM/DD');
				workDetailData.trip_end_date = values.trip_end_date == null ? null : moment(values.trip_end_date).format('YYYY/MM/DD');
				workDetailData.trip_start_time = Starttime;
				workDetailData.trip_end_time = EndTime;
				workDetailData.vehicleCheckBoxValue = vehicleCheckBoxValue.value;
				workDetailData.trip_calculate_time = calculateTripTime.value;
				workDetailData.transported_heavyloads = transportedHeavyLoad.value;
				workDetailData.driven_in_rough_terrain = drivenRoughTerrain.value;
				workDetailData.transported_workload = transportedWorkload.value;
				workDetailData.vehicle_subclass = vehicleSubClassField.value;
				workDetailData.multiple_days_select = multiselectFiled.value;
				workDetailData.day_compensation = values.other_compensation == 0 ? null : values.other_compensation;
				workDetailData.fullHalfDayCompensationAmount = values.day_compensation == 0 ? 0 : (halfFullCompnesation.value.find(x => x.value === values.day_compensation) || {}).compensation_value;
				workDetailData.lunch_compensation = values.lunch_compensation == 0 ? null : values.lunch_compensation;
				workDetailData.lunchCompensationAmount = values.lunch_compensation == 0 ? 0 : (lunchCompensation.value.find(x => x.value === values.lunch_compensation) || {}).compensation_value;
				workDetailData.day_compensation = values.day_compensation == 0 ? null : values.day_compensation;
				workDetailData.other_compensation = [0, ''].includes(values.other_compensation) ? null : parseInt(values.other_compensation);
				workDetailData.otherCompensationAmount = workDetailData.other_compensation;
				workDetailData.indexId = props.indexId ?? 0;
				workDetailData.addNewItem = props.addNewItem;
				workDetailData.totalDays = daysDiff.value;
				workDetailData.date = values.date == null ? null : moment(values.date).format('YYYY/MM/DD');
				workDetailData.workdetail_createdat_type = 'detailupdate'
				workDetailData.workdetail_created_at = `${moment(values.trip_start_date).format('DD.MM')} - ${moment(values.trip_end_date).format('DD.MM.YYYYY')}`;
				store.commit('workDetail/updateWorkDetails', workDetailData);
				isSubmitting.value = false;
				emit('modalFlag');
				emit('workDetails');

				modalShow.value = false;
			} else {
				workDetailData.teamId = values.teamId ?? null;
				workDetailData.trip_start_address = start.value ?? null;
				workDetailData.trip_end_address = end.value ?? null;
				workDetailData.distance = store.state.workDetail.totalKilloMeter || 0;
				workDetailData.trip_start_date = values.trip_start_date == null ? null : moment(values.trip_start_date).format('YYYY/MM/DD');
				workDetailData.trip_end_date = values.trip_end_date == null ? null : moment(values.trip_end_date).format('YYYY/MM/DD');
				workDetailData.trip_start_time = Starttime;
				workDetailData.trip_end_time = EndTime;
				workDetailData.vehicleCheckBoxValue = vehicleCheckBoxValue.value;
				workDetailData.trip_calculate_time = calculateTripTime.value;
				workDetailData.transported_heavyloads = transportedHeavyLoad.value;
				workDetailData.driven_in_rough_terrain = drivenRoughTerrain.value;
				workDetailData.transported_workload = transportedWorkload.value;
				workDetailData.vehicle_subclass = vehicleSubClassField.value;
				workDetailData.multiple_days_select = multiselectFiled.value;
				workDetailData.fullHalfDayCompensationAmount = values.day_compensation == 0 ? 0 : (halfFullCompnesation.value.find(x => x.value === values.day_compensation) || {}).compensation_value;
				workDetailData.day_compensation = values.day_compensation == 0 ? null : values.day_compensation;
				workDetailData.lunch_compensation = values.lunch_compensation == 0 ? null : values.lunch_compensation;
				workDetailData.lunchCompensationAmount = values.lunch_compensation == 0 ? 0 : (lunchCompensation.value.find(x => x.value === values.lunch_compensation) || {}).compensation_value;
				workDetailData.other_compensation = [0, ''].includes(values.other_compensation) ? null : parseInt(values.other_compensation);
				workDetailData.otherCompensationAmount = workDetailData.other_compensation;
				workDetailData.indexId = props.indexId ?? 0;
				workDetailData.totalDays = daysDiff.value;
				workDetailData.date = values.date == null ? null : moment(values.date).format('YYYY/MM/DD');
				workDetailData.address_mid_points = JSON.stringify(wayPointItems.value.map(x => x.location));
				workDetailData.workdetail_createdat_type = 'detailupdate'
				workDetailData.workdetail_created_at = `${moment(values.trip_start_date).format('DD.MM')} - ${moment(values.trip_end_date).format('DD.MM.YYYYY')}`
				store.commit('workDetail/updateWorkDetails', workDetailData);
				isSubmitting.value = false;
				emit('modalFlag');
				emit('workDetails');

				modalShow.value = false;
			}
		});

		//check box radio
		const onChangeValue = () => {
			vehicleCheckBoxValue.value = !vehicleCheckBoxValue.value;
			return vehicleCheckBoxValue.value;
		};

		// transpor tedHeavy Load
		const onTransported = () => {
			transportedHeavyLoad.value = !transportedHeavyLoad.value;
			onTransportedValue.value = store.state.workDetail.travellingFees.heavy_load || invoiceAllownceTracer.transported_heavyloads;
			return transportedHeavyLoad.value;
		};

		//transported Work load
		const onTransportedWorkload = () => {
			transportedWorkload.value = !transportedWorkload.value;
			return transportedWorkload.value;
		};

		const onTrailer = () => {
			vehicleSubClassField.value = !vehicleSubClassField.value;
			onTrailerValue.value = store.state.workDetail.travellingFees.vehicle_subclass || invoiceAllownceTracer.vehicle_subclass;
			return vehicleSubClassField.value;
		};

		const onMultiselectFiled = () => {
			multiselectFiled.value = !multiselectFiled.value;
			return multiselectFiled.value;
		};
		// driven Rough Terrain
		const ondrivenRough = () => {
			drivenRoughTerrain.value = !drivenRoughTerrain.value;
			ondrivenRoughValue.value = store.state.workDetail.travellingFees.rough_terrian || invoiceAllownceTracer.driven_in_rough_terrain;
			return drivenRoughTerrain.value;
		};

		//close modal
		const closeModal = () => {
			emit('modalFlag');
			modalShow.value = false;
		};

		// remove receipt file
		const removeReceiptFile = () => {
			contractFile.value = null;
			contractFilePreview.value = null;
		};
		// start address
		const originStart = place => {
			start.value = place.formatted_address;
		};
		// mid point address
		const wayPoints = (place, index) => {
			wayPointItems.value[index] = { location: place.formatted_address, stopover: true };
		};
		// destionation address
		const destionationEnd = place => {
			end.value = place.formatted_address;
		};
		// start add null
		const handleStartPlaceChange = () => {
			start.value = null;
		};
		// end add null
		const handleEndPlaceChange = () => {
			end.value = null;
		};

		//tripe start time updated
		const tripsStartTime = event => {
			tripsStartTime.value = event;
		};

		//tripe end time updated
		const tripsEndTime = event => {
			tripsEndTime.value = event;
		};

		//get work dairies details
		const fetchInvoiceWorkDairies = () => {
			const checkExistingWorkDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			ionvoiceWorkDetail.value = store.state.invoice.invoiceWorkDairiesDetail;
			contactTypeField.value = ionvoiceWorkDetail.value.contract_type;
			contractValueField.value = ionvoiceWorkDetail.value.contract_value;
			totalWorkField.value = ionvoiceWorkDetail.value.total_work || 0;
			lunchCompensationField.value = ionvoiceWorkDetail.value.lunch_compensation || 0;
			otherCompensationField.value = ionvoiceWorkDetail.value.full_compensation || 0;
			let dataWorkDetail = checkExistingWorkDetails[props.indexId];
			transportedHeavyLoad.value = dataWorkDetail.transported_heavyloads || false;
			drivenRoughTerrain.value = dataWorkDetail.driven_in_rough_terrain || false;
			transportedWorkload.value = dataWorkDetail.transported_workload || false;
			vehicleSubClassField.value = dataWorkDetail.vehicle_subclass || false;
			multiselectFiled.value = dataWorkDetail.multiple_days_select || false;
			tripStartTime.value = dataWorkDetail.trip_start_time == null ? '00:00' : dataWorkDetail.trip_start_time;
			tripEndTime.value = dataWorkDetail.trip_end_time == null ? '00:00' : dataWorkDetail.trip_end_time;
			const startingAddr = {
				formatted_address: dataWorkDetail.trip_start_address ?? '',
			};
			const endingAddr = {
				formatted_address: dataWorkDetail.trip_end_address ?? '',
			};
			if (dataWorkDetail.address_mid_points) {
				const midArray = JSON.parse(dataWorkDetail.address_mid_points);
				wayPointItems.value = midArray.map(x => ({ location: x, stopover: true }));
			}

			setTimeout(() => {
				originStart(startingAddr);
				destionationEnd(endingAddr);
			}, 1000);

			setValues({
				trip_name: dataWorkDetail.trip_name == null ? null : dataWorkDetail.trip_name,
				trip_start_address: dataWorkDetail.trip_start_address == null ? null : dataWorkDetail.trip_start_address,
				trip_end_address: dataWorkDetail.trip_end_address == null ? null : dataWorkDetail.trip_end_address,
				trip_start_date: dataWorkDetail.trip_start_date == null ? null : dataWorkDetail.trip_start_date,
				trip_end_date: dataWorkDetail.trip_end_date == null ? null : dataWorkDetail.trip_end_date,
				trip_calculate_time: dataWorkDetail.trip_calculate_time == null ? null : dataWorkDetail.trip_calculate_time,
				vehicle_number: dataWorkDetail.vehicle_number == null ? null : dataWorkDetail.vehicle_number,
				vehicle_class: dataWorkDetail.vehicle_class == null ? null : dataWorkDetail.vehicle_class,
				description: dataWorkDetail.description == null ? null : dataWorkDetail.description,
				lunch_compensation: dataWorkDetail.lunch_compensation == null ? null : dataWorkDetail.lunch_compensation,
				day_compensation: dataWorkDetail.day_compensation == null ? null : dataWorkDetail.day_compensation,
				distance: dataWorkDetail.distance == null ? 0 : dataWorkDetail.distance,
				total_work: dataWorkDetail.total_work == null ? null : dataWorkDetail.total_work,
				other_compensation: dataWorkDetail.other_compensation == null ? null : dataWorkDetail.other_compensation,
				contract_type: dataWorkDetail.contract_type == null ? null : dataWorkDetail.contract_type,
				contract_value: dataWorkDetail.contract_value == null ? null : dataWorkDetail.contract_value,
				date: dataWorkDetail.date == null ? new Date() : dataWorkDetail.date,
			});
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
			wayPointItems.value.push({ location: null, stopover: true });
		};

		//remove way point item
		const removeWayPointRow = index => {
			wayPointItems.value.splice(index, 1);
		};

		return {
			gAuComRestriction,
			lastTwoYear,
			invoiceAllownceTracer,
			// translate function
			t,
			clearVal,

			// refs
			wayPointItems,
			modalShow,
			contractFile,
			contractFilePreview,
			formFieldsData,
			vehicleCheckBoxValue,
			transportedHeavyLoad,
			multiselectFiled,
			drivenRoughTerrain,
			transportedWorkload,
			start,
			end,
			imageFile,
			ionvoiceWorkDetail,
			tripStartTime,
			tripEndTime,
			compensationType,
			onTransportedValue,
			ondrivenRoughValue,
			onTrailerValue,

			// waypts,

			// icons
			closeIcon,
			rightIcon,
			bottomIcon,
			leftArrowIcon,
			faMapMarker,
			downArrowIcon,
			paperClipIcon,
			plusIcon,
			calenderIcon,

			//options
			vatTypeOptionsNew,

			// form related

			// fields
			formMeta,
			isSubmitting,
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
			dayCompensationField,
			contactTypeField,
			contractValueField,
			dateField,
			showTeamField,

			// computed
			calculateTripTime,
			totalSummaryCalculations,
			employerList,
			origin,
			destionation,
			calculateFileSize,
			halfFullCompnesation,
			lunchCompensation,
			isDisableCompensation,
			daysDiff,
			totalDiscountCalculation,
			distanceKillometer,
			getLunchCompensationValue,
			wayPointDestination,

			// methods
			handleSubmit,
			removeReceiptFile,
			submitForm,
			onChangeValue,
			onTransported,
			ondrivenRough,
			onTransportedWorkload,
			onTrailer,
			originStart,
			destionationEnd,
			closeModal,
			tripsStartTime,
			tripsEndTime,
			onMultiselectFiled,
			handleEndPlaceChange,
			handleStartPlaceChange,
			fetchTravellingFees,
			addWayPointItem,
			removeWayPointRow,
			wayPoints,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.text-grey {
	color: rgb(93, 92, 92);
}
.text-md {
	font-size: 20px;
}
.start-width {
	width: 30px;
}
.explaination {
	padding: 10px;
	border-radius: 12px;
	outline: none;
	width: 100%;
	border: 1px solid #dde0e2;
	box-shadow: 2px 1px 11px #a5a5a5;
	font-weight: 600;
	font-size: 14px;
	background-color: #f6f6f6;
}

.upload_documents {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 15px 30px;
		}

		.modal-body {
			padding: 10px 10px;
			overflow: auto;
			margin-bottom: 40px;

			&::-webkit-scrollbar {
				display: none;
			}

			form {
				max-height: 60vh;

				.time__selector {
					padding: 9px 15px;
				}

				.document_file_error {
					position: absolute;
					bottom: 0;
					left: 20px;
					margin-top: 20px;
				}
			}
		}
	}

	@media (max-width: 576px) {
		.modal__content {
			.modal-header {
				display: block;
				padding: 10px;
			}
			.modal-body {
				padding: 20px;
			}
		}
	}
}
</style>

<style scoped>
.review-star:hover {
	fill: #e4aa18;
	cursor: pointer;
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
.vue-map-container {
	width: 100%;
	height: 515px;
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
	border-radius: 20px;
	overflow: auto;
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
	border-radius: 20px;
	overflow: auto;

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
		height: auto;
		font-size: 14px;
	}
	.form-grey-input {
		background-color: #f9f9f9;
		border-radius: 50px;
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
		font-size: 13px;
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
			margin: 0 0 0 -18px;

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
	.detail-sec {
		margin-top: 70px;
		padding: 0 15px;
	}
	.invoice-grey-sec {
		background-color: #f9f9f9;
		border-radius: 10px;
		padding: 19px;
		border-radius: 10px;
	}

	.calender-icon {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translate(-20%, -50%);
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
::placeholder {
	font-size: 13px;
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
		padding: 8px 30px 8px 8px;
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
	}
}
</style>
<style lang="scss">
.time__selector {
	.vc-time-picker {
		padding: 0;

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
.modal-content {
	max-width: 60% !important;
}
.checkbox-left-padding {
	padding-left: 10px;
}
.text-small {
	font-size: 12px;
	margin: 0 3px;
}
</style>
