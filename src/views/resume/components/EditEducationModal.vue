<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container add_education_modal" content-class="modal-content px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content overflow-visible">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					{{ t('resume.educationTitle') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body responsive-modal">
				<div class="row m-0">
					<div class="col-12">
						<!-- form -->
						<form class="theme-input tab-form">
							<div class="form-row">
								<!-- major subject -->
								<div class="form-group col-xl-4 col-lg-6">
									<label for="majorSubject">
										{{ t('fieldList.majorSubject') }}
									</label>

									<input
										id="editMajorSubject"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.majorSubject',
											})
										"
										@input="subjectField.handleChange"
										@blur="subjectField.handleBlur"
										:value="subjectField.value"
									/>

									<p class="text-danger">
										{{ subjectField.errorMessage }}
									</p>
								</div>

								<!-- institute -->
								<div class="form-group col-xl-4 col-lg-6">
									<label for="institute">
										{{ t('fieldList.institute') }}
									</label>

									<input
										id="editInstitute"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.institute',
											})
										"
										@input="instituteField.handleChange"
										@blur="instituteField.handleBlur"
										:value="instituteField.value"
									/>

									<p class="text-danger">
										{{ instituteField.errorMessage }}
									</p>
								</div>

								<!-- country -->
								<div class="form-group col-xl-4 col-lg-6">
									<label for="country">
										{{ t('fieldList.country') }}
									</label>

									<Multiselect
										id="editCountry"
										class="form-group px-remove"
										trackBy="country_name"
										@input="countryField.handleChange"
										@blur="countryField.handleBlur"
										:placeholder="
											t('validation.selectField', {
												field: 'placeholder.country',
											})
										"
										:searchable="true"
										valueProp="referenceId"
										v-model="countryField.value"
										:options="countryOptions"
										label="country_name"
										mode="single"
										@change="selectCompanyCountry"
										:canDeselect="true"
									/>

									<p class="text-danger">
										{{ countryField.errorMessage }}
									</p>
								</div>

								<!-- city -->
								<div class="form-group col-xl-4 col-lg-6">
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
										label="city_name"
										mode="single"
										:canDeselect="true"
									/>

									<p class="text-danger">
										{{ cityField.errorMessage }}
									</p>
								</div>

								<!-- completion year -->
								<div class="form-group col-xl-4 col-lg-6">
									<label for="completionYear">
										{{ t('fieldList.completionYear') }}
									</label>

									<input
										id="editCompletionYear"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.completionYear',
											})
										"
										@input="completionYearField.handleChange"
										@blur="completionYearField.handleBlur"
										:value="completionYearField.value"
									/>

									<p class="text-danger">
										{{ completionYearField.errorMessage }}
									</p>
								</div>
							</div>

							<!-- submit btn -->
							<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">
								{{ t('common.submit') }}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Multiselect from '@vueform/multiselect';
import moment from 'moment';

export default {
	name: 'AddEmployerModal',

	props: {
		// modal status
		isModalShow: Object,

		// work detail id
		educationId: {
			default: null,
			type: Number,
		},
	},

	//components
	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const educationDetailId = ref(props.educationId);

		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		const isSubmitting = ref(false);

		// form schema validation
		const educationSchema = yup.object({
			subject: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.majorSubject',
					}),
				)
				.max(50),
			institute: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.institute',
					}),
				)
				.max(50),
			cityId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.city',
					}),
				),
			countryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.country',
					}),
				),
			graduation_year: yup
				.string()
				.nullable()
				.when(value => {
					if (moment(moment().format('YYYY')).isBefore(moment(value).format('YYYY'))) {
						return yup
							.string()
							.nullable()
							.typeError(
								t('validation.enterCurrentYear', {
									field: 'fieldList.completionYear',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.completionYear',
								}),
							);
					}
				})
				.min(
					4,
					t('validation.atLeast', {
						field: 'fieldList.graduation_year',
						type: '4 characters',
					}),
				)
				.max(
					4,
					t('validation.atMost', {
						field: 'fieldList.graduation_year',
						type: '4 characters',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, setValues } = useForm({
			validationSchema: educationSchema,
		});

		// form fields
		const subjectField = reactive(useField('subject', undefined, { initialValue: null }));
		const instituteField = reactive(useField('institute', undefined, { initialValue: null }));
		const cityField = reactive(useField('cityId', undefined, { initialValue: null }));
		const countryField = reactive(useField('countryId', undefined, { initialValue: null }));
		const completionYearField = reactive(useField('graduation_year', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch country options
			store.dispatch('country/getCountries');

			// fetch qualification options
			store.dispatch('qualification/getDefaultQualifications');
			//fetch experince detail
			fetchEducationDetails(educationDetailId.value);
		});

		/**
		 * Computed props
		 * *******************************************************************
		 */
		// get country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);

		// get city options
		const cityOptions = computed(() => store.getters['country/getCitiesOptions']);

		// get qualification options
		const qualificationOptions = computed(() => store.getters['qualification/getQualificationOptions']);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			// save the work details
			await store
				.dispatch('resume/updateEducation', {
					payload: values,
					id: educationDetailId.value,
				})
				.then(() => {
					isSubmitting.value = false;
					modalShow.value = false;
				})
				.catch(err => {
					isSubmitting.value = false;
				});

			emit('newEducation');

			return true;
		});
		//get experince details
		const fetchEducationDetails = async id => {
			await store.dispatch('resume/getEducationDetailById', id).then(res => {
				const data = res.data;
				if (data.countryReferenceId) {
					selectCompanyCountry(data.countryReferenceId);
				}
				setValues({
					subject: data?.subject,
					institute: data?.institute,
					cityId: data.cityReferenceId,
					countryId: data.countryReferenceId,
					graduation_year: data.graduation_year,
				});
			});
		};
		//get city bt country id
		const selectCompanyCountry = id => {
			if (id) {
				cityOptions.value = null;
				cityField.value = null;
				store.dispatch('country/getCities', id);
			} else {
				cityOptions.value = null;
				cityField.value = null;
			}
		};

		return {
			// translate function
			t,

			// refs
			modalShow,
			educationDetailId,
			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,
			submitForm,

			// fields
			subjectField,
			countryField,
			cityField,
			instituteField,
			completionYearField,

			// computed
			countryOptions,
			cityOptions,
			qualificationOptions,
			fetchEducationDetails,
			selectCompanyCountry,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.add_education_modal {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 15px 30px;
		}

		.modal-body {
			padding: 30px;
			overflow: scroll;
			margin-bottom: 20px;

			&::-webkit-scrollbar {
				display: none;
			}

			form {
				max-height: 60vh;

				.time__selector {
					padding: 9px 15px;
				}
			}
			&.responsive-modal {
				overflow: visible;
				@media (max-width: 768px) {
					overflow: auto;
				}
			}
		}
	}

	@media (max-width: 576px) {
		.modal__content {
			.modal-header {
				display: block;
				padding: 20px;
			}
			.modal-body {
				padding: 20px;
			}
		}
	}
}
</style>
<style lang="scss">
.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
</style>
