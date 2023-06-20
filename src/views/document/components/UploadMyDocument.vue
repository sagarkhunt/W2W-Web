<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_documents" content-class="modal-content overflow-visible px-0 pb-0" :click-to-close="false">
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
					{{ t('document.uploadDocument') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<!-- form -->
					<form class="theme-input tab-form">
						<div class="form-row">
							<!-- document type -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="documentType">
									{{ t('fieldList.documentType') }}
								</label>

								<Multiselect
									id="documentType"
									class="form-group px-remove"
									@input="documentTypeField.handleChange"
									@blur="documentTypeField.handleBlur"
									:searchable="true"
									:placeholder="
										t('validation.selectField', {
											field: 'placeholder.documentType',
										})
									"
									v-model="documentTypeField.value"
									:options="documentTypeOptions"
									label="document_name"
									mode="single"
									:canDeselect="true"
									trackBy="document_name"
								/>
								<p class="text-danger">
									{{ documentTypeField.errorMessage }}
								</p>
							</div>

							<!-- document name -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="documentName">
									{{ t('fieldList.documentName') }}
								</label>

								<input
									id="documentName"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.documentName',
										})
									"
									@input="documentNameField.handleChange"
									@blur="documentNameField.handleBlur"
									:value="documentNameField.value"
								/>

								<p class="text-danger">
									{{ documentNameField.errorMessage }}
								</p>
							</div>

							<!-- previous earnings  -->
							<div class="form-group col-xl-3 col-sm-6 col-12" v-if="documentTypeField.value === taxCardId">
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
								/>

								<p class="text-danger">
									{{ otherEarningsField.errorMessage }}
								</p>
							</div>

							<!-- yearly income -->
							<div class="form-group col-xl-3 col-sm-6 col-12" v-if="documentTypeField.value === taxCardId">
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
								/>

								<p class="text-danger">
									{{ yearlyIncomeField.errorMessage }}
								</p>
							</div>

							<!-- personal tax -->
							<div class="form-group col-xl-3 col-sm-6 col-12" v-if="documentTypeField.value === taxCardId">
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
								/>

								<p class="text-danger">
									{{ personalTaxField.errorMessage }}
								</p>
							</div>

							<!-- max tax percentage -->
							<div class="form-group col-xl-3 col-sm-6 col-12" v-if="documentTypeField.value === taxCardId">
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
								/>

								<p class="text-danger">
									{{ maxTaxPercentageField.errorMessage }}
								</p>
							</div>

							<!-- start date of document -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="documentStartDate">
									{{ t('fieldList.documentStartDate') }}
								</label>

								<v-date-picker
									id="documentStartDate"
									@input="startDateField.handleChange"
									@blur="startDateField.handleBlur"
									v-model="startDateField.value"
									:masks="{ input: 'DD.MM.YYYY' }"
									:min-date="dateFilter"
								>
									<template v-slot="{ inputValue, inputEvents }">
										<input class="form-control" :value="inputValue" v-on="inputEvents" />
									</template>
								</v-date-picker>

								<p class="text-danger">
									{{ startDateField.errorMessage }}
								</p>
							</div>

							<!-- expiry date of document -->
							<div class="form-group col-xl-6 col-lg-6">
								<label for="documentExpiryDate">
									{{ t('fieldList.documentExpiryDate') }}
								</label>

								<v-date-picker
									id="documentExpiryDate"
									@input="endDateField.handleChange"
									@blur="endDateField.handleBlur"
									v-model="endDateField.value"
									:masks="{ input: 'DD.MM.YYYY' }"
									:min-date="dateFilter"
								>
									<template v-slot="{ inputValue, inputEvents }">
										<input class="form-control" :value="inputValue" v-on="inputEvents" />
									</template>
								</v-date-picker>

								<p class="text-danger">
									{{ endDateField.errorMessage }}
								</p>
							</div>

							<!-- upload file -->
							<div class="form-group col-12">
								<!-- attachment -->
								<label for="documentFile">
									{{ t('document.addDocumentFile') }}
								</label>

								<div class="drop-container">
									<!-- drop zone component -->
									<drop-zone @fileDrop="handleDocumentFileChange" class="mb-4" :isUploadButton="false" />

									<!-- document file - error -->
									<p
										class="
											document_file_error
											text-center text-danger
										"
									>
										{{ documentFileField.errorMessage }}
									</p>

									<!-- document file preview -->
									<div class="preview mb-4" v-if="documentFile">
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
							</div>
						</div>

						<!-- upload btn -->
						<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">
							{{ t('common.upload') }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';

export default {
	name: 'UploadMyDocument',

	//components
	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	props: {
		// modal status
		isModalShow: Object,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const documentFile = ref(null);
		const documentFilePreview = ref('');
		const taxCardId = ref(null);
		const invoiceListCount = ref(null);

		// icons
		const closeIcon = faTimes;
		const isSubmitting = ref(false);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const documentSchema = yup.object({
			document_type: yup
				.number()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.documentType',
					}),
				),
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
				.when('document_type', document_type => {
					if (document_type === taxCardId.value) {
						return yup
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
							);
					}
				}),
			min_personal_tax: yup
				.number()
				.nullable()
				.when('document_type', document_type => {
					if (document_type === taxCardId.value) {
						return yup
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
							);
					}
				})
				.max(100),
			max_personal_tax: yup
				.number()
				.nullable()
				.when('document_type', document_type => {
					if (document_type === taxCardId.value) {
						return yup
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
							);
					}
				})
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
				.when('document_type', document_type => {
					if (document_type === taxCardId.value) {
						return yup
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
							);
					}
				}),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: documentSchema,
		});

		// form fields
		const documentTypeField = reactive(useField('document_type', undefined, { initialValue: null }));
		const documentNameField = reactive(useField('document_name', undefined, { initialValue: null }));
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
			fetchDocumentTypes();
			store.dispatch('invoice/getJobSeekersInvoices').then(res => {
				invoiceListCount.value = res.data.data.length ?? 0;
			});
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// get current users work details
		const documentTypeOptions = computed(() => store.getters['document/getDocumentTypeOptions']);

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
		// document types
		const fetchDocumentTypes = async () => {
			await store.dispatch('document/getDocumentTypes');
		};

		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			// form data
			const formData = new FormData();

			formData.append('documentTypeId', values.document_type);

			if (values.document_type === taxCardId.value) {
				formData.append('yearly_income', values.yearly_income);
				formData.append('min_personal_tax', values.min_personal_tax);
				formData.append('max_personal_tax', values.max_personal_tax);
				formData.append('other_earnings', values.other_earnings);
			}

			formData.append('start_date', moment(values.start_date).format('YYYY/MM/DD'));
			formData.append('end_date', moment(values.expiry_date).format('YYYY/MM/DD'));
			formData.append('document_name', values.document_name);
			formData.append('document_file', values.document_file[0]);

			await store
				.dispatch('document/uploadDocumentFile', formData)
				.then(() => {
					isSubmitting.value = false;
					emit('newDocumentUploaded');
					modalShow.value = false;
				})
				.catch(err => {
					isSubmitting.value = false;
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

			// refs
			modalShow,
			documentFile,
			documentFilePreview,
			taxCardId,
			invoiceListCount,

			// icons
			closeIcon,

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
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.upload_documents {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 30px;
		}

		.modal-body {
			padding: 30px;
			overflow: visible;
			margin-bottom: 20px;

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

	@media (max-width: 992px) {
		.modal-body {
			overflow: auto !important;
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
