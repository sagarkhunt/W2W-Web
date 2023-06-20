<template>
	<!-- update profile -->
	<div class="account__form w-100 d-block relative">
		<span
			v-if="
				fromRegionsField.value == null ||
					industryField.value == null ||
					durationsField.value == null ||
					gigTypesField.value == null ||
					availableAfterField.value == null ||
					descripationField.value == null ||
					ExperienceInYearsField.value == null
			"
		>
			<img src="~@/assets/images/required-hint.png" alt="img" class="img-fluid info_icon" />
		</span>
		<!-- profile form -->
		<form class="tab-form theme-input">
			<!-- title -->
			<div class="form-group col-12 p-0 mb-0">
				<div class="d-flex align-items-center justify-content-between" @click="gigSeekingExpland = !gigSeekingExpland">
					<h5 class="accordion-head">{{ t('managerAccount.seekForGig') }}</h5>
					<div>
						<a v-if="!gigSeekingExpland">
							<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
						</a>
						<a v-else>
							<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
						</a>
					</div>
				</div>
			</div>

			<!-- personal information -->
			<div class="accordion-collapse collapse show p-0" v-if="gigSeekingExpland">
				<div class="form-row pt-3">
					<!-- first name -->
					<div class="form-group col-xl-4 col-lg-6">
						<label for="firstName">
							{{ t('managerAccount.FromRegions') }}
						</label>

						<Multiselect
							id="fromRegions"
							class="form-group"
							@input="fromRegionsField.handleChange"
							@blur="fromRegionsField.handleBlur"
							:placeholder="
								t('validation.selectField', {
									field: 'placeholder.selectfromregions',
								})
							"
							v-model="fromRegionsField.value"
							:options="countryOptions"
							mode="single"
							label="country_name"
							:searchable="true"
						/>
						<p class="text-danger">
							{{ fromRegionsField.errorMessage }}
						</p>
					</div>

					<div class="form-group col-xl-4 col-lg-6">
						<label for="firstName">
							{{ t('managerAccount.Industry') }}
						</label>

						<Multiselect
							id="industry"
							class="form-group"
							@input="industryField.handleChange"
							@blur="industryField.handleBlur"
							:placeholder="
								t('validation.selectField', {
									field: 'placeholder.industry',
								})
							"
							v-model="industryField.value"
							:options="industryOptions"
							mode="single"
							label="industry_name"
							:searchable="true"
						/>
						<p class="text-danger">
							{{ industryField.errorMessage }}
						</p>
					</div>

					<!-- date of birth -->
					<div class="form-group col-xl-4 col-lg-6">
						<label for="dob">
							{{ t('managerAccount.Durations') }}
						</label>

						<Multiselect
							id="durations"
							class="form-group"
							@input="durationsField.handleChange"
							@blur="durationsField.handleBlur"
							:placeholder="
								t('validation.selectField', {
									field: 'placeholder.durations',
								})
							"
							v-model="durationsField.value"
							:options="gigModeOptions.map(x=>({...x, label: t(x.label)}))"
							mode="single"
						/>
						<p class="text-danger">
							{{ durationsField.errorMessage }}
						</p>
					</div>

					<!-- current address -->
					<div class="form-group col-xl-4 col-lg-6">
						<label for="address">
							{{ t('managerAccount.GigTypes') }}
						</label>

						<Multiselect
							id="gigTypes"
							class="form-group"
							@input="gigTypesField.handleChange"
							@blur="gigTypesField.handleBlur"
							:placeholder="
								t('validation.selectField', {
									field: 'placeholder.gigTypes',
								})
							"
							v-model="gigTypesField.value"
							:options="gigTypes.map(x=>({...x, label: t(x.label)}))"
							mode="single"
						/>
						<p class="text-danger">
							{{ gigTypesField.errorMessage }}
						</p>
					</div>

					<!-- residence - country -->
					<div class="form-group col-xl-4 col-lg-6">
						<label for="residence">
							{{ t('managerAccount.AvailableAfter') }}
						</label>

						<v-date-picker
							id="availableAfter"
							@input="availableAfterField.handleChange"
							@blur="availableAfterField.handleBlur"
							v-model="availableAfterField.value"
							:masks="{ input: 'DD.MM.YYYY' }"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<input class="form-control" :value="inputValue" v-on="inputEvents" />
							</template>
						</v-date-picker>

						<p class="text-danger">
							{{ availableAfterField.errorMessage }}
						</p>
					</div>

					<div class="form-group col-xl-4 col-lg-6">
						<label for="completionYear">
							{{ t('fieldList.experienceYear') }}
						</label>

						<input
							id="editCompletionYear"
							type="text"
							class="form-control"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.experienceYear',
								})
							"
							@input="ExperienceInYearsField.handleChange"
							@blur="ExperienceInYearsField.handleBlur"
							:value="ExperienceInYearsField.value"
						/>

						<p class="text-danger">
							{{ ExperienceInYearsField.errorMessage }}
						</p>
					</div>

					<div class="ml-1 row">
						<div class="col-md-6 form-check form-checkbox">
							<input
								class="form-check-input form-checkbox-width"
								type="checkbox"
								id="transportedHeavyLoad"
								:checked="IHaveToolsField"
								:value="IHaveToolsField.value"
								:v-model="IHaveToolsField.value"
								@click="IHaveTools($event)"
							/>
							<label class="form-check-label extras-font checkbox-left-padding white-space" for="transportedHeavyLoad"> {{ t('managerAccount.haveTools') }} </label>
						</div>

						<div class="col-md-6 form-check form-checkbox">
							<input
								class="form-check-input form-checkbox-width"
								type="checkbox"
								:checked="IHaveCarField"
								:value="IHaveCarField.value"
								:v-model="IHaveCarField.value"
								@click="IHaveCar($event)"
								id="drivenRoughTerrain"
							/>
							<label class="form-check-label extras-font checkbox-left-padding white-space" for="drivenRoughTerrain"> {{ t('managerAccount.haveCar') }}</label>
						</div>

					</div>

					<div class="form-group col-xl-12">
						<p class="mb-3">
							{{ t('managerAccount.seekForGigMsg') }}
						</p>

						<p class="mb-3">
							{{ t('managerAccount.seekForGigMsg1') }}
						</p>
					</div>

					<!-- yearly income -->
					<div class="form-group col-xl-12 col-lg-6 mb-0">
						<textarea
							rows="4"
							class="form-control"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.typeYourDescripation',
								})
							"
							@input="descripationField.handleChange"
							@blur="descripationField.handleBlur"
							:value="descripationField.value"
						>
						</textarea>
						<p class="text-danger">
							{{ descripationField.errorMessage }}
						</p>
					</div>
				</div>
				<!-- update btn -->
				<button type="submit" class="btn-common btn-red btn" @click="submitForm" :disabled="isSubmitting">
					<ToolTip :title="t('toolTip.updateSeek')">
						{{ t('common.update') }}
					</ToolTip>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
import Multiselect from '@vueform/multiselect';

import { dateFormat } from '@/utils/mixins';
import { genderOptions } from '@/utils/enums.js'; // gender options
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTimes, faCloudUploadAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { contractTypeOptions, vatTypeOptions, gigModeOptions, gigTypes } from '@/utils/enums.js';

export default {
	name: 'SeekerGigDetails',

	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	setup() {
		// ref vars
		const gigSeekingExpland = ref(false);
		// icon
		const editIcon = faEdit;
		const closeIcon = faTimes;
		const cloudUploadIcon = faCloudUploadAlt;
		const IHaveToolsField = ref(false);
		const IHaveCarField = ref(false);
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const profileSchema = yup.object({
			countryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.country',
					}),
				),
			industryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.industry',
					}),
				),
			duration: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.durationsType',
					}),
				),
			gig_type: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.gigType',
					}),
				),
			available_after: yup
				.date()
				.nullable()
				.typeError(
					t('validation.isRequired', {
						field: 'managerAccount.AvailableAfter',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.availableAfter',
					}),
				),
			experience_in_years: yup
				.string()
				.typeError(
					t('validation.enterCurrentYear', {
						field: 'fieldList.experience_year',
					}),
				)
				.when(value => {
					if (moment(moment().format('YYYY')).isBefore(moment(value).format('YYYY'))) {
						return yup
							.number()
							.nullable()
							.required(
								t('validation.requiredField', {
									field: 'fieldList.experienceYear',
								}),
							);
					}
				})
				.min(
					1,
					t('validation.atLeast', {
						field: 'fieldList.experience_year',
						type: '4 characters',
					}),
				)
				.max(
					2,
					t('validation.atLeast', {
						field: 'fieldList.experience_year',
						type: '4 characters',
					}),
				),

			description: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.description',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'fieldList.description',
						type: '255 characters',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, setValues } = useForm({
			validationSchema: profileSchema,
		});

		// form fields
		const fromRegionsField = reactive(useField('countryId', undefined, { initialValue: null }));
		const industryField = reactive(useField('industryId', undefined, { initialValue: null }));
		const durationsField = reactive(useField('duration', undefined, { initialValue: null }));
		const gigTypesField = reactive(useField('gig_type', undefined, { initialValue: null }));
		const availableAfterField = reactive(useField('available_after', undefined, { initialValue: null }));
		const descripationField = reactive(useField('description', undefined, { initialValue: null }));
		const ExperienceInYearsField = reactive(useField('experience_in_years', undefined, { initialValue: null }));
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {

			// fetch industry options
			store.dispatch('industry/getIndustries');

			//fetch get Occupation Options
			store.dispatch('industry/getOccupation');
			// fetch country options
			store.dispatch('country/getCountries');

			// fetch tax card details
			store.dispatch('document/getTaxCardList');
			store.dispatch('auth/verifyToken').then(res => {
				const data = res.data.data;
				(IHaveToolsField.value = data.jobSeeker?.seeker_gigs_settings?.have_tools || false),
				(IHaveCarField.value = data.jobSeeker?.seeker_gigs_settings?.have_car || false),
				(ExperienceInYearsField.value = data.jobSeeker?.seeker_gigs_settings?.experience_in_years),
				setValues({
					countryId: data.jobSeeker?.seeker_gigs_settings?.countryReferenceId,
					industryId: data.jobSeeker?.seeker_gigs_settings?.industryReferenceId,
					duration: data.jobSeeker?.seeker_gigs_settings?.duration,
					gig_type: data.jobSeeker?.seeker_gigs_settings?.gig_type,
					available_after: data.jobSeeker?.seeker_gigs_settings?.available_after,
					description: data.jobSeeker?.seeker_gigs_settings?.description,
					experience_in_years: data.jobSeeker?.seeker_gigs_settings?.experience_in_years,
				});
			});
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// get country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);
		// industry options
		const industryOptions = computed(() => store.getters['industry/getIndustryOptions']);

		// city options
		const cityOptions = computed(() => store.getters['country/getCitiesOptions']);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - change tab - step - 2
		const submitForm = handleSubmit(async values => {
			values.available_after = moment(values.available_after).format('YYYY/MM/DD');
			values.i_have_tools = IHaveToolsField.value;
			values.i_have_car = IHaveCarField.value;
			
			await store.dispatch('auth/storeSeekerGigDetail', values).then(() => {
				// fetch user details
				store.dispatch('auth/verifyToken');
			});

			return true;
		});

		const dateFormated = date => {
			return moment('2021-01-21').format('DD/MM/YYYY');
		};

		/**
		 * method
		 * *******************************************************************
		 */
		// IHaveTools Load
		const IHaveTools = () => {
			IHaveToolsField.value = !IHaveToolsField.value;
			return IHaveToolsField.value;
		};

		//IHaveCar
		const IHaveCar = () => {
			IHaveCarField.value = !IHaveCarField.value;
			return IHaveCarField.value;
		};
		// ExperienceInYears
		const ExperienceInYears = () => {
			ExperienceInYearsField.value = !ExperienceInYearsField.value;
			return ExperienceInYearsField.value;
		};

		return {
			// trasnslate function
			t,

			// refs
			genderOptions,
			dateFormat,
			contractTypeOptions,
			vatTypeOptions,
			gigModeOptions,
			gigTypes,
			IHaveToolsField,
			IHaveCarField,
			ExperienceInYearsField,
			gigSeekingExpland,
			//icon
			closeIcon,
			editIcon,
			cloudUploadIcon,
			arrowDown,
			arrowUp,

			// form related
			formMeta,
			isSubmitting,

			// fields
			fromRegionsField,
			industryField,
			durationsField,
			gigTypesField,
			availableAfterField,
			descripationField,

			// computed
			countryOptions,
			industryOptions,
			cityOptions,

			// methods
			submitForm,
			dateFormated,
			IHaveTools,
			IHaveCar,
			ExperienceInYears,

		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.account__form {
	padding: 25px 30px;
	margin-bottom: 30px;
	background-color: #fff;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 20px;

	@media (max-width: 768px) {
		padding: 20px 25px;
		border-radius: 15px;
	}

	@media (max-width: 575px) {
		padding: 15px 20px;
		border-radius: 10px;
	}

	.info_icon {
		position: absolute;
		top: -15px;
		left: -12px;
	}

	.accordion-head {
		font-size: 21px;
		font-weight: 600;

		@media (max-width: 1440px) {
			font-size: 18px;
		}

		@media (max-width: 425px) {
			font-size: 17px;
		}
	}

	.tab-form {
		.accordion-collapse {
			.btn-common {
				margin-top: 21px;
			}
		}
	}

	form {
		.form-group {
			.text-big {
				font-size: 20px;
				margin-bottom: 20px;
			}

			label {
				font-weight: 500;
				font-size: 14px;

				span {
					color: $coloRed;

					&.black-icon {
						color: #000;
					}
				}
			}

			.btn-lightred {
				position: absolute;
				bottom: 0;
				right: 0;
				padding: 8px 15px;
				font-size: 14px;
			}
		}
	}
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

.dash-user-profile-img {
	width: 150px;
	height: 150px;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
}

.grey-edit {
	width: 30px;
	height: 30px;

	svg {
		width: 10px;
		height: 10px;
	}
}

.grey-btn-position {
	position: absolute;
	bottom: 0;
	right: 0;
	transform: translateX(10px);
}

.manage-textarea {
	border: double 3px #808a8f;
	border-radius: 5px;
	background-image: linear-gradient(white, white), radial-gradient(circle at top left, #ff4b57, #808a8f);
	background-origin: border-box;
	background-clip: content-box, border-box;

	textarea {
		border: none;
	}
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

.checkbox-left-padding {
	padding-left: 10px;
}
</style>
<style>
textarea.form-control {
	min-height: calc(5.5em + 0.75rem + 2px) !important;
}
</style>