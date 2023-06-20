<template>
	<div class="account__form tax_card w-100 d-block position-relative">
		<span v-if="taxCardList.length == 0">
			<img src="~@/assets/images/required-hint.png" alt="img" class="img-fluid info_icon" />
		</span>

		<!-- profile form -->
		<form class="tab-form theme-input">
			<!-- title -->
			<div class="form-group col-12 p-0 mb-0">
				<div class="d-flex align-items-center justify-content-between" @click="taxCardExpland = !taxCardExpland">
					<h5 class="accordion-head">{{ taxCardList.length == 0 ? t('document.addNewTaxCard') : t('document.taxCardInformation') }}</h5>
					<div>
						<a v-if="!taxCardExpland">
							<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
						</a>
						<a v-else>
							<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
						</a>
					</div>
				</div>
			</div>

			<!-- personal information -->
			<div class="accordion-collapse collapse show p-0" v-if="taxCardExpland">
				<div class="pt-3">
					<!-- form -->
					<form class="theme-input tab-form">
						<!-- document type -->
						<div class="form-group col-xl-6 col-lg-6 ps-0 pe-1">
							<label for="documentName" style="display:none">
								{{ t('fieldList.documentName') }}
							</label>

							<input
								id="documentName"
								type="text"
								class="form-control"
								:placeholder="
									t('validation.enterField', {
										field: 'fieldList.documentName',
									})
								"
								@input="documentNameField.handleChange"
								@blur="documentNameField.handleBlur"
								:value="documentNameField.value"
								style="display:none"
							/>
							<p class="text-danger">
								{{ documentNameField.errorMessage }}
							</p>
						</div>

						<div class="form-row">
							<!-- previous earnings  -->
							<div class="form-group col-xl-3 col-sm-6 col-12">
								<label for="otherEarnings">
									{{ t('fieldList.otherEarnings') }}
								</label>

								<input
									id="otherEarnings"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.otherEarnings',
										})
									"
									@input="otherEarningsField.handleChange"
									@blur="otherEarningsField.handleBlur"
									:value="otherEarningsField.value"
									:disabled="taxCardList.length == 0 ? false : true"
								/>

								<p class="text-danger">
									{{ otherEarningsField.errorMessage }}
								</p>
							</div>

							<!-- yearly income -->
							<div class="form-group col-xl-3 col-sm-6 col-12">
								<label for="yearlyIncome">
									{{ t('fieldList.yearlyIncome') }}
								</label>

								<input
									id="yearlyIncome"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.yearlyIncome',
										})
									"
									@input="yearlyIncomeField.handleChange"
									@blur="yearlyIncomeField.handleBlur"
									:value="yearlyIncomeField.value"
									:disabled="taxCardList.length == 0 ? false : true"
								/>

								<p class="text-danger">
									{{ yearlyIncomeField.errorMessage }}
								</p>
							</div>

							<!-- personal tax -->
							<div class="form-group col-xl-3 col-sm-6 col-12">
								<label for="personalTax">
									{{ t('fieldList.personalTax') }}
								</label>

								<input
									id="personalTax"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.personalTax',
										})
									"
									@input="personalTaxField.handleChange"
									@blur="personalTaxField.handleBlur"
									:value="personalTaxField.value"
									:disabled="taxCardList.length == 0 ? false : true"
								/>

								<p class="text-danger">
									{{ personalTaxField.errorMessage }}
								</p>
							</div>

							<!-- max tax percentage -->
							<div class="form-group col-xl-3 col-sm-6 col-12">
								<label for="maxTaxPercentage">
									{{ t('fieldList.maxTaxPercentage') }}
								</label>

								<input
									id="maxTaxPercentage"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.maxTaxPercentage',
										})
									"
									@input="maxTaxPercentageField.handleChange"
									@blur="maxTaxPercentageField.handleBlur"
									:value="maxTaxPercentageField.value"
									:disabled="taxCardList.length == 0 ? false : true"
								/>

								<p class="text-danger">
									{{ maxTaxPercentageField.errorMessage }}
								</p>
							</div>

							<!-- start date of document -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="textcardStartDate">
									{{ t('fieldList.textcardStartDate') }}
								</label>

								<v-date-picker
									id="textcardStartDate"
									@input="startDateField.handleChange"
									@blur="startDateField.handleBlur"
									v-model="startDateField.value"
									:masks="{ input: 'DD.MM.YYYY' }"
								>
									<template v-slot="{ inputValue, inputEvents }">
										<input class="form-control" :value="inputValue" v-on="inputEvents" :disabled="taxCardList.length == 0 ? false : true" />
									</template>
								</v-date-picker>

								<p class="text-danger">
									{{ startDateField.errorMessage }}
								</p>
							</div>

							<!-- expiry date of document -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="textcardExpiryDate">
									{{ t('fieldList.textcardExpiryDate') }}
								</label>

								<v-date-picker
									id="textcardExpiryDate"
									@input="endDateField.handleChange"
									@blur="endDateField.handleBlur"
									v-model="endDateField.value"
									:masks="{ input: 'DD.MM.YYYY' }"
									:min-date="dateFilter"
								>
									<template v-slot="{ inputValue, inputEvents }">
										<input class="form-control" :value="inputValue" v-on="inputEvents" :disabled="taxCardList.length == 0 ? false : true" />
									</template>
								</v-date-picker>

								<p class="text-danger">
									{{ endDateField.errorMessage }}
								</p>
							</div>

							<!-- upload file -->
							<div class="form-group col-12" v-if="taxCardList.length == 0">
								<!-- attachment -->
								<label for="documentFile">
									{{ t('document.addDocumentFile') }}
								</label>

								<div class="drop-container">
									<!-- drop zone component -->
									<drop-zone @fileDrop="handleDocumentFileChange" class="mb-xl-0 mb-lg-2 mb-4" :isUploadButton="false" />

									<!-- document file preview -->
									<div class="preview mb-xl-0 mb-lg-2 mb-4" v-if="documentFile">
										<button type="button" class="drop-close" @click="removeDocumentFile">
											<FontAwesomeIcon :icon="closeIcon" />
										</button>
										<div id="preview">
											<div
												class="
													dz-preview
													dz-error
													dz-complete
													dz-image-preview
												"
											>
												<div class="dz-image">
													<img data-dz-thumbnail="" alt="Invocie receipt file image" :src="documentFilePreview" />
												</div>
												<div class="dz-details">
													<div class="dz-size">
														<span>
															<strong>
																{{ calculateFileSize(documentFile) }}
															</strong>
															{{ t('document.mb') }}
														</span>
													</div>
													<div class="dz-filename">
														<span>{{ documentFile.name }}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- document file - error -->
								<p class="document_file_error text-danger">
									{{ documentFileField.errorMessage }}
								</p>
							</div>

							<!-- upload btn -->
							<span v-if="checkCardData == null">
								<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">
									{{ t('document.addDocument') }}
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
import { dateFormat } from '@/utils/mixins';

export default {
	name: 'TaxCard',

	//components
	components: {
		FontAwesomeIcon,
	},

	setup() {
		// ref vars
		const documentFile = ref(null);
		const documentFilePreview = ref('');
		const taxCardId = ref(null);
		const invoiceListCount = ref(null);
		const taxCardExpland = ref(false);
		// icons
		const closeIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const docTaxcardId = ref(null);
		const checkCardData = ref(null);
		const checkCardExpired = ref(null);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const documentSchema = yup.object({
			document_name: yup
				.string()
				.nullable()
				.typeError(
					t('validation.atLeast', {
						field: 'fieldList.documentName',
						type: '2 characters',
					}),
				)
				.max(
					60,
					t('validation.atMost', {
						field: 'fieldList.documentName',
						type: '60 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.documentName',
					}),
				)
				.min(
					2,
					t('validation.atLeast', {
						field: 'fieldList.documentName',
						type: '2 characters',
					}),
				),
			yearly_income: yup
				.number()
				.nullable()
				.typeError(
					t('validation.mustBeEnter', {
						field: 'fieldList.yearly_income',
						type: 'number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.yearlyIncome',
					}),
				),

			min_personal_tax: yup
				.number()
				.nullable()
				.typeError(
					t('validation.mustBeEnter', {
						field: 'fieldList.min_personal_tax',
						type: 'number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.personalTax',
					}),
				)
				.max(100),
			max_personal_tax: yup
				.number()
				.nullable()
				.typeError(
					t('validation.mustBeEnter', {
						field: 'fieldList.max_personal_tax',
						type: 'number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.maxTaxPercentage',
					}),
				)
				.max(100),
			start_date: yup
				.date()
				.nullable()
				.typeError(
					t('validation.selectProper', {
						field: 'fieldList.startDate',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.documentStartDate',
					}),
				),
			expiry_date: yup
				.date()
				.nullable()
				.typeError(
					t('validation.selectProper', {
						field: 'fieldList.expiryDate',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.documentExpiryDate',
					}),
				),
			document_file: yup.mixed().required(
				t('validation.requiredField', {
					field: 'fieldList.documentFile',
				}),
			),
			other_earnings: yup
				.number()
				.nullable()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.other_earnings',
					}),
				)
				.typeError(
					t('validation.beMust', {
						field: 'fieldList.other_earnings_number',
						type: 'number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.otherEarnings',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm, setValues } = useForm({
			validationSchema: documentSchema,
		});

		// form fields
		const documentTypeField = reactive(useField('document_type', undefined, { initialValue: 'Tax Card' }));
		const documentNameField = reactive(useField('document_name', undefined, { initialValue: t('fieldList.textCardText') }));
		const yearlyIncomeField = reactive(useField('yearly_income', undefined, { initialValue: null }));
		const personalTaxField = reactive(useField('min_personal_tax', undefined, { initialValue: null }));
		const maxTaxPercentageField = reactive(useField('max_personal_tax', undefined, { initialValue: null }));
		const startDateField = reactive(useField('start_date', undefined, { initialValue: null }));
		const endDateField = reactive(useField('expiry_date', undefined, { initialValue: null }));
		const documentFileField = reactive(useField('document_file', undefined, { initialValue: null }));
		const otherEarningsField = reactive(useField('other_earnings', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch work detail
			store.dispatch('invoice/getJobSeekersInvoices').then(res => {
				invoiceListCount.value = res.data.data.length ?? 0;
			});

			// fetch document details
			fetchDocumentDetails();

			// fetch tax card details
			store.dispatch('document/getTaxCardList');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// get current users work details
		const documentTypeOptions = computed(() => store.getters['document/getDocumentTypeOptions']);
		const taxCardList = computed(() => store.getters['document/getTaxCardList']);
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

		const dateFilter = computed(() => {
			if (startDateField.value) {
				const startDate = moment(startDateField.value).format('DD.MM.YYYY');
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				endDateField.value = moment(startDate, 'DD.MM.YYYY')
					.add(1, 'year')
					.toISOString();
			}

			return invoiceListCount.value == 0 ? null : new Date();
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		const fetchDocumentDetails = () => {
			// set value in tax card
			store.dispatch('auth/verifyToken').then(res => {
				const data = res.data.data;
				docTaxcardId.value = data?.seeker_taxcard?.documentTypeId ?? null;
				checkCardData.value = data?.seeker_taxcard;
				checkCardExpired;
				if (checkCardData.value) {
					handleDocumentFileChange(data?.seeker_taxcard?.file_path);
					setValues({
						document_type: 'Tax Card',
						document_name: 'Tax Card',
						yearly_income: data?.seeker_taxcard?.yearly_income ?? null,
						min_personal_tax: data?.seeker_taxcard?.min_personal_tax ?? null,
						max_personal_tax: data?.seeker_taxcard?.max_personal_tax ?? null,
						other_earnings: data?.seeker_taxcard?.other_earnings ?? null,
						start_date: data?.seeker_taxcard?.start_date,
						expiry_date: data?.seeker_taxcard?.end_date,
						document_file: data?.seeker_taxcard?.file_path,
					});
				}
			});
		};

		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			const taxcardId = docTaxcardId.value;
			// form data
			const formData = new FormData();

			formData.append('yearly_income', values.yearly_income);
			formData.append('min_personal_tax', values.min_personal_tax);
			formData.append('max_personal_tax', values.max_personal_tax);
			formData.append('other_earnings', values.other_earnings);
			formData.append('document_name', values.document_name);
			formData.append('start_date', moment(values.start_date).format('YYYY/MM/DD'));
			formData.append('end_date', moment(values.expiry_date).format('YYYY/MM/DD'));
			formData.append('document_file', values.document_file[0]);
			formData.append('documentType', 'Tax Card');

			await store.dispatch('auth/uploadDocumentUserProfile', formData).then(() => {
				resetForm(); // reset form
				documentFileField.value = null;
				documentFile.value = null;
				documentFilePreview.value = null;
				fetchDocumentDetails();
				store.dispatch('document/getTaxCardList');
			});
		});

		// handle document file change
		const handleDocumentFileChange = file => {
			documentFileField.value = file;

			documentFile.value = file[0]; // store file
			// file preview
			documentFilePreview.value = ['image/png', 'image/jpg', 'image/svg', 'image/jpeg', 'image/pdf', 'image/csv'].includes(file[0].type)
				? URL.createObjectURL(file[0])
				: require('@/assets/images/iconWomanDraw.png');
		};

		// remove document file
		const removeDocumentFile = () => {
			documentFileField.value = null;
			documentFile.value = null;
			documentFilePreview.value = null;
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(documentTypeOptions, () => {
			taxCardId.value = documentTypeOptions.value.reduce((acc, item) => {
				if (item.document_name === 'Tax Card') {
					acc = item.id;
				}

				return acc;
			}, 0);
		});

		return {
			// translate function
			t,
			dateFormat,

			// refs
			documentFile,
			documentFilePreview,
			taxCardId,
			taxCardList,
			invoiceListCount,
			taxCardExpland,
			docTaxcardId,
			checkCardData,
			checkCardExpired,

			// icons
			closeIcon,
			arrowDown,
			arrowUp,

			// form related
			formMeta,
			isSubmitting,

			// fields
			documentTypeField,
			documentNameField,
			yearlyIncomeField,
			personalTaxField,
			maxTaxPercentageField,
			startDateField,
			endDateField,
			documentFileField,
			otherEarningsField,

			// computed
			documentTypeOptions,
			calculateFileSize,
			dateFilter,

			// methods
			submitForm,
			handleDocumentFileChange,
			removeDocumentFile,
			fetchDocumentDetails,
		};
	},
};
</script>

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
			.drop-container {
				@media (max-width: 768px) {
					display: block;
				}
				.preview {
					@media (max-width: 768px) {
						margin-left: 0;
					}
				}
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
</style>
