<template>
	<!-- add job form -->
	<div class="add_job__form">
		<form class="tab-form">
			<!-- form fields -->
			<div class="form_part form-row">
				<!-- form title -->
				<div class="form-group col-12 p-0">
					<h5 class="title-md">
						{{ t('job.editGig') }}
					</h5>
				</div>

				<!-- category -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="category"> {{ t('fieldList.category') }}<span>*</span> </label>

					<Multiselect
						id="editCategory"
						class="form-group px-remove"
						trackBy="industry_name"
						@input="categoryField.handleChange"
						@blur="categoryField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.category',
							})
						"
						:searchable="true"
						valueProp="referenceId"
						v-model="categoryField.value"
						:options="industryOptions"
						mode="single"
						label="industry_name"
						:canDeselect="true"
					/>

					<p class="text-danger">
						{{ categoryField.errorMessage }}
					</p>
				</div>

				<!-- gig title -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="gigTitle"> {{ t('fieldList.gigTitle') }}<span>*</span> </label>

					<input
						id="editGigTitle"
						type="text"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.gigTitle',
							})
						"
						@input="gigTitleField.handleChange"
						@blur="gigTitleField.handleBlur"
						:value="gigTitleField.value"
					/>

					<p class="text-danger">
						{{ gigTitleField.errorMessage }}
					</p>
				</div>

				<!-- no of vacancies -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="noOfVacancy"> {{ t('fieldList.noOfVacancy') }}<span>*</span> </label>

					<input
						id="editnoOfVacancy"
						type="number"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.noOfVacancy',
							})
						"
						@input="vacancyField.handleChange"
						@blur="vacancyField.handleBlur"
						:value="vacancyField.value"
					/>

					<p class="text-danger">
						{{ vacancyField.errorMessage }}
					</p>
				</div>

				<!-- experience required -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="experienceRequired"> {{ t('fieldList.experienceRequired') }} ({{ t('common.years') }})<span>*</span> </label>

					<input
						id="editExperienceRequired"
						type="number"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.experience',
							})
						"
						@input="experienceField.handleChange"
						@blur="experienceField.handleBlur"
						:value="experienceField.value"
					/>

				</div>

				<!-- gig mode -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="gigMode"> {{ t('fieldList.gigMode') }}<span>*</span> </label>

					<Multiselect
						id="editGigMode"
						class="form-group"
						@input="gigModeField.handleChange"
						@blur="gigModeField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.gigMode',
							})
						"
						v-model="gigModeField.value"
						:options="gigModeOptions.map(x=>({...x, label: t(x.label)}))"
						mode="single"
						:canDeselect="true"
					/>

					<p class="text-danger">
						{{ gigModeField.errorMessage }}
					</p>
				</div>

				<!-- gig duration -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="gigDuration"> {{ t('fieldList.gigDuration') }} ({{ t('fieldList.days') }})<span>*</span> </label>

					<input
						id="editGigDuration"
						type="number"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.gigDuration',
							})
						"
						@input="gigDurationField.handleChange"
						@blur="gigDurationField.handleBlur"
						:value="gigDurationField.value"
					/>

					<p class="text-danger">
						{{ gigDurationField.errorMessage }}
					</p>
				</div>

				<!-- salary offer -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="salaryOffer"> {{ t('fieldList.salaryOffer') }} ({{ t('common.inThousands') }}) </label>

					<Multiselect
						id="editSalaryOffer"
						class="form-group"
						@input="salaryOfferField.handleChange"
						@blur="salaryOfferField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.salaryOffer',
							})
						"
						v-model="salaryOfferField.value"
						:options="contractTypeOptions.map(x=>({...x, label: t(x.label)}))"
						mode="single"
						:canDeselect="true"
					/>

					<p class="text-danger">
						{{ salaryOfferField.errorMessage }}
					</p>
				</div>

				<!-- apply before -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="applyBefore">
						{{ t('fieldList.applyBefore') }}
					</label>

					<v-date-picker
						id="editApplyBefore"
						@input="applyBeforeField.handleChange"
						@blur="applyBeforeField.handleBlur"
						v-model="applyBeforeField.value"
						:masks="{ input: 'DD.MM.YYYY' }"
						:min-date="new Date()"
					>
						<template v-slot="{ inputValue, inputEvents }">
							<input
								class="form-control"
								:placeholder="
									t('validation.selectField', {
										field: 'placeholder.date',
									})
								"
								:value="inputValue"
								v-on="inputEvents"
							/>
						</template>
					</v-date-picker>

					<p class="text-danger">
						{{ applyBeforeField.errorMessage }}
					</p>
				</div>

				<!-- city -->
				<div class="form-group col-xl-4 col-lg-6">
					<label for="city">
						{{ t('fieldList.jobPostStatus') }}
					</label>

					<Multiselect
						id="editPostStatus"
						class="form-group"
						@input="statusField.handleChange"
						@blur="statusField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.jobPostStatus',
							})
						"
						v-model="statusField.value"
						:options="jobPostStatus.map(x=>({...x, label: t(x.label)}))"
						mode="single"
						:canDeselect="true"
					/>

					<p class="text-danger">
						{{ statusField.errorMessage }}
					</p>
				</div>
				<!-- address -->
				<div class="form-group col-lg-6">
					<label for="address">
						{{ t('fieldList.address') }}
					</label>

					<input
						id="editAddress"
						type="text"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.address',
							})
						"
						@input="addressField.handleChange"
						@blur="addressField.handleBlur"
						:value="addressField.value"
					/>

					<p class="text-danger">
						{{ addressField.errorMessage }}
					</p>
				</div>

				<!-- location -->
				<div class="form-group col-xl-2 col-lg-6">
					<label for="location">
						{{ t('fieldList.country') }}
					</label>

					<Multiselect
						id="location"
						class="form-group px-remove"
						trackBy="country_name"
						@input="locationField.handleChange"
						@blur="locationField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.country',
							})
						"
						:searchable="true"
						valueProp="referenceId"
						v-model="locationField.value"
						:options="countryOptions"
						mode="single"
						label="country_name"
						:canDeselect="true"
						@change="changeCountry"
					/>

					<p class="text-danger">
						{{ locationField.errorMessage }}
					</p>
				</div>

				<!-- city -->
				<div class="form-group col-xl-2 col-lg-6">
					<label for="city">
						{{ t('fieldList.city') }}
					</label>

					<Multiselect
						id="editCity"
						class="form-group px-remove"
						trackBy="city_name"
						@input="cityField.handleChange"
						@blur="cityField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.city',
							})
						"
						:searchable="true"
						valueProp="referenceId"
						v-model="cityField.value"
						:options="cityOptions"
						mode="single"
						label="city_name"
						:canDeselect="true"
					/>

					<p class="text-danger">
						{{ cityField.errorMessage }}
					</p>
				</div>

				<!-- zip code -->
				<div class="form-group col-xl-2 col-lg-6">
					<label for="zipCode">
						{{ t('fieldList.zipCode') }}
					</label>

					<input
						id="editZipCode"
						type="text"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.zipCode',
							})
						"
						@input="zipCodeField.handleChange"
						@blur="zipCodeField.handleBlur"
						:value="zipCodeField.value"
					/>

					<p class="text-danger">
						{{ zipCodeField.errorMessage }}
					</p>
				</div>

				<!-- job description -->
				<div class="form-group col-12">
					<label for="jobDescription">
						{{ t('fieldList.jobDescription') }}
					</label>

					<textarea
						class="form-control"
						name="job_description"
						id="editJobDescription"
						cols="30"
						rows="5"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.descriptionMandate',
							})
						"
						@input="jobDesriptionField.handleChange"
						@blur="jobDesriptionField.handleBlur"
						:value="jobDesriptionField.value"
					></textarea>

					<p class="text-danger">
						{{ jobDesriptionField.errorMessage }}
					</p>
				</div>
				<div class="form-group col-12">
					<div class="form-row">
						<!-- skills -->
						<!-- add skill -->
						<div class="form-group col-lg-6 col-12">
							<label for="Permit"> {{ t('fieldList.permit') }} </label>

							<Multiselect
								id="editpermit"
								class="form-group px-remove input-bg"
								trackBy="description"
								@input="permitField.handleChange"
								@blur="permitField.handleBlur"
								:placeholder="
									t('validation.selectField', {
										field: 'placeholder.permit',
									})
								"
								:searchable="true"
								valueProp="referenceId"
								v-model="permitField.value"
								:options="permitOptions"
								label="description"
								mode="tags"
								:hideSelected="false"
							/>
						</div>

						<!-- add skill -->
						<div class="form-group col-lg-6 col-12">
							<label for="skill"> {{ t('common.add') }} {{ t('fieldList.skill') }} </label>
							<Multiselect
								id="editSkill"
								class="form-group px-remove input-bg"
								trackBy="skill"
								@input="jobSkillsField.handleChange"
								@blur="jobSkillsField.handleBlur"
								:placeholder="
									t('validation.selectField', {
										field: 'placeholder.skill',
									})
								"
								:searchable="true"
								valueProp="referenceId"
								v-model="jobSkillsField.value"
								:options="skillOptions"
								label="skill"
								mode="tags"
								:hideSelected="false"
							/>
							<p class="text-danger">
								{{ jobSkillsField.errorMessage }}
							</p>

						</div>
					</div>
				</div>

				<div class="form-row align-items-end w-100"></div>

				<!-- post job btn -->
				<button type="button" @click="submitForm" class="btn-common btn-red mt-2" :disabled="isSubmitting">
					{{ t('job.editGig') }}
				</button>
			</div>

			<!-- add job skill -->
			
		</form>
	</div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { gigModeOptions, contractTypeOptions, jobPostStatus } from '@/utils/enums.js';

export default {
	name: 'UpdateProfile',

	components: {
		Multiselect,
	},

	setup() {
		// ref
		const tempSkill = ref(null);
		const tempPermit = ref(null);
		//regx
		const stringRegExp = /^[a-zA-Z ]*$/;
		const alphaNumberRegExp = /^[0-9]{5}/;
		// icons
		const deleteIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('job.editGig')} - Way2Work`;

		// global store
		const store = useStore();

		const cityOptions = ref([]);

		const skillName = ref([]);
		const permitName = ref([]);

		// global router
		const router = useRouter();

		const isSubmitting = ref(false)

		// current route
		const route = useRoute();

		// post gig schema validation
		const PostGigSchema = yup.object({
			industryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.category',
					}),
				),
			job_title: yup
				.string()
				.nullable()
				.matches(
					stringRegExp,
					t('validation.noValid', {
						field: 'fieldList.jobTitle',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.gigTitle',
					}),
				)
				.max(
					50,
					t('validation.atMost', {
						field: 'fieldList.gigTitle',
						type: '50 characters',
					}),
				),
			vacancies: yup
				.number()
				.typeError(
					t('validation.add_a_number', {
						field: 'fieldList.noOfVacancy',
					}),
				)
				.optional()
				.notRequired()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.noOfVacancy',
					}),
				),
			experience: yup
				.number()
				.nullable()
				.typeError(
					t('validation.beMust', {
						field: 'fieldList.experience',
						type: 'number type',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.experience',
					}),
				),
			job_mode: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.gigMode',
					}),
				),
			job_duration: yup
				.number()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.gigDuration',
					}),
				)
				.typeError(
					t('validation.beMust', {
						field: 'fieldList.gigDuration',
						type: 'number type',
					}),
				),
			salary_offer: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.salaryOffer',
					}),
				),
			apply_before: yup
				.date()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.applyBefore',
					}),
				),
			job_permits: yup
				.array()
				.nullable()
				.optional(),

			address: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.address',
					}),
				)
				.max(
					60,
					t('validation.atMost', {
						field: 'fieldList.address',
						type: '60 characters',
					}),
				),
			countryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.location',
					}),
				),
			cityId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.city',
					}),
				),
			job_status: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.jobPostStatus',
					}),
				),
			zip_code: yup
				.string()
				.nullable()
				.matches(
					alphaNumberRegExp,
					t('validation.noValid', {
						field: 'fieldList.zipCode',
					}),
				)
				.min(
					5,
					t('validation.atLeast', {
						field: 'fieldList.zipCode',
						type: '5 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.zipCode',
					}),
				),
			job_description: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.jobDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'fieldList.jobDescription',
						type: '255 characters',
					}),
				),
			job_skills: yup
				.array()
				.min(
					1,
					t('validation.minValue', {
						field: 'fieldList.skill',
						minLen: 1,
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.skill',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, setValues } = useForm({
			validationSchema: PostGigSchema,
		});

		// form fields
		const categoryField = reactive(useField('industryId', undefined, { initialValue: null }));
		const gigTitleField = reactive(useField('job_title', undefined, { initialValue: null }));
		const vacancyField = reactive(useField('vacancies', undefined, { initialValue: null }));
		const experienceField = reactive(useField('experience', undefined, { initialValue: null }));
		const gigModeField = reactive(useField('job_mode', undefined, { initialValue: null }));
		const gigDurationField = reactive(useField('job_duration', undefined, { initialValue: null }));
		const salaryOfferField = reactive(useField('salary_offer', undefined, { initialValue: null }));
		const applyBeforeField = reactive(useField('apply_before', undefined, { initialValue: null }));
		const permitField = reactive(useField('job_permits', undefined, { initialValue: [] }));
		const addressField = reactive(useField('address', undefined, { initialValue: null }));
		const locationField = reactive(useField('countryId', undefined, { initialValue: null }));
		const cityField = reactive(useField('cityId', undefined, { initialValue: null }));
		const statusField = reactive(useField('job_status', undefined, { initialValue: null }));
		const zipCodeField = reactive(useField('zip_code', undefined, { initialValue: null }));
		const jobDesriptionField = reactive(useField('job_description', undefined, { initialValue: null }));
		const jobSkillsField = reactive(useField('job_skills', undefined, { initialValue: [] }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch current job detail
			fetchJobDetail();

			// fetch industry list
			store.dispatch('industry/getIndustries');

			// fetch country list
			store.dispatch('country/getCountries');

			//fetch get All Permit
			store.dispatch('qualification/getAllPermit');

			// fetch skill list
			store.dispatch('skill/getDefaultSkills');
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		// industry options
		const industryOptions = computed(() => store.getters['industry/getIndustryOptions']);

		// country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);

		//permits computed
		const permitOptions = computed(() => store.getters['qualification/getPermitOptions']);

		// skill options
		const skillOptions = computed(() => store.getters['skill/getJobSkillOptions']);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch job details
		const fetchJobDetail = async () => {
			await store.dispatch('job/getJobById', route.params.id).then(res => {
				const data = res.data;
				fetchCityByCounrtyId(data.countryReferenceId);
				skillName.value = data.skills.reduce((acc, item) => {
					acc.push(item.reference && item.reference.skill);
					return acc;
				}, []);

				permitName.value = data.permits.reduce((acc, item) => {
					acc.push(item.reference && item.reference.description);
					return acc;
				}, []);

				setValues({
					industryId: data.industryReferenceId,
					job_title: data.job_title,
					vacancies: data.vacancies,
					experience: data.experience,
					job_mode: data.job_mode,
					job_duration: data.job_duration,
					salary_offer: data.salary_offer,
					apply_before: data.apply_before,
					address: data.address,
					countryId: data.countryReferenceId,
					cityId: data.cityReferenceId,
					zip_code: data.zip_code,
					job_description: data.job_description,
					job_status: data.job_status,
					job_permits: data.permits.reduce((acc, item) => {
						acc.push(item.reference.referenceId);
						return acc;
					}, []),
					job_skills: data.skills.reduce((acc, item) => {
						acc.push(item.reference.referenceId);
						return acc;
					}, []),
				});
			});
		};

		// add skill
		const addSkill = () => {
			if (tempSkill.value !== null) {
				jobSkillsField.value.push(tempSkill.value);
			}
			tempSkill.value = null;
		};

		// delete skill
		const deleteSkill = skill => {
			let skillId = (skillOptions.value.find(x => x.skill === skill) || {}).referenceId;
			skillName.value = skillName.value.filter(x => x !== skill);
			jobSkillsField.value = jobSkillsField.value.filter(x => x !== skillId);
		};

		// delete permit
		const deletePermit = description => {
			let permitId = (permitOptions.value.find(x => x.description === description) || {}).referenceId;
			permitName.value = permitName.value.filter(x => x !== description);
			permitField.value = permitField.value.filter(x => x !== permitId);
		};

		const changeCountry = event => {
			if (event) {
				cityOptions.value = null;
				cityField.value = null;
				fetchCityByCounrtyId(event);
			} else {
				cityOptions.value = null;
				cityField.value = null;
			}
		};

		//GET country wise city
		const fetchCityByCounrtyId = id => {
			store.dispatch('country/getCities', id).then(res => {
				cityOptions.value = res.data.reduce((acc, item) => {
					acc.push({ ...item, value: item.referenceId });

					return acc;
				}, []);
			});
		};

		// submit form - job post
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			values.apply_before = moment(values.apply_before).format('YYYY/MM/DD');
			// values.job_description = values.job_description[0].toUpperCase() + values.job_description.slice(1).toLowerCase();
			await store
				.dispatch('job/updateJob', {
					payload: values,
					id: route.params.id,
				})
				.then(() => {
					isSubmitting.value = false;
					router.push({ name: 'ManageGig' });
				}).catch(err => {
					isSubmitting.value = false;
				});
		});

		const tempFunction = async e => {
			if (e !== null && !skillName.value.includes(e)) {
				let skillId = (skillOptions.value.find(x => x.skill === e) || {}).referenceId;
				skillName.value.push(e);
				jobSkillsField.value.push(skillId);
				tempSkill.value = null;
			}
			tempSkill.value = null;
		};

		const tempPermitFunction = async e => {
			if (e !== null && !permitName.value.includes(e)) {
				let permitId = (permitOptions.value.find(x => x.description === e) || {}).referenceId;
				permitName.value.push(e);
				permitField.value.push(permitId);
				tempPermit.value = null;
			}
			tempPermit.value = null;
		};


		return {
			// translate function
			t,

			// refs
			gigModeOptions,
			contractTypeOptions,
			jobPostStatus,
			tempSkill,
			skillName,
			tempPermit,
			permitName,

			// icons
			deleteIcon,

			// form related
			formMeta,
			isSubmitting,

			// field
			categoryField,
			gigTitleField,
			vacancyField,
			experienceField,
			gigModeField,
			gigDurationField,
			salaryOfferField,
			applyBeforeField,
			permitField,
			addressField,
			locationField,
			cityField,
			statusField,
			zipCodeField,
			jobDesriptionField,
			jobSkillsField,

			// computed
			industryOptions,
			countryOptions,
			cityOptions,
			permitOptions,
			skillOptions,

			// methods
			addSkill,
			deleteSkill,
			submitForm,
			tempFunction,
			fetchCityByCounrtyId,
			changeCountry,
			deletePermit,
			tempPermitFunction,

		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.add_job__form {
	form {
		.form_part {
			width: 100%;
			padding: 50px 30px;
			background-color: #fff;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			border-radius: 20px;

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

				.form-control {
					padding: 8px 15px;
					background-color: #fbfbfb;
					border: 1px solid $colorExLightGray;
					height: unset;
					border-radius: 10px;
					position: relative;
					box-sizing: border-box;

					&:focus {
						border-color: $coloRed;
					}
				}

				.btn-lightred {
					position: absolute;
					top: 30px;
					right: 0;
					padding: 14px 20px;
					font-size: 14px;
				}

				.job_skills {
					width: 100%;
					padding: 12px 15px;
					background-color: #fbfbfb;
					border: 1px solid #eaeaea;
					border-radius: 25px;
					min-height: 50px;
					height: auto;
					display: flex;
					flex-wrap: wrap;

					.job_skill {
						background: $coloRed;
						color: #fff;
						padding: 5px 10px;
						padding-right: 20px;
						border-radius: 25px;
						display: flex;
						align-items: center;
						width: max-content;
						float: left;
						margin: 5px 5px;

						span {
							margin-right: 10px;
						}

						button {
							font-size: 10px;
							color: #fff;
						}
					}
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.account__form {
		padding: 20px 15px;

		form {
			.form-group {
				label {
					font-size: 12px;
				}

				.form-control {
					padding: 10px 15px;
					font-size: 14px;
				}

				.btn-lightred {
					padding: 13px 15px;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
<style>
.tab-form .is-open .multiselect-input,
.tab-form .multiselect-input {
	max-height: 1070px !important;
}
</style>
<style lang="scss">
.input-bg {
	&.is-tags {
		.multiselect-search {
			input {
				background-color: #fbfbfb;
			}
		}
	}
}
.multiselect-tag {
	background-color: #ff4b57 !important;
	border-radius: 25px;
	padding: 10px;
	@media (max-width: 575px) {
		padding: 6px 12px;
	}
}

.multiselect-tag i:before {
	color: #fff;
}

.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
</style>