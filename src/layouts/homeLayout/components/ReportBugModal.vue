<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_contract report_modal" content-class="modal-content px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" id="report_close" data-dismiss="modal" aria-label="Close" @click="removeBodyScroll()">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal header -->
			<div class="modal-header pb-0">
				<h5 class="title-lg">
					{{ t('headerField.reportTitle') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<p class="invite_content mb-3">
					{{ t('footer.reportModelDescription') }}
				</p>
				<div class="modal-form">
					<!-- form -->
					<form class="theme-input tab-form">
						<div class="form-row">
							<!-- contract name -->
							<div class="form-group col-xl-12 col-lg-12">
								<label for="description">
									{{ t('footer.reportBugDescription') }}
								</label>

								<textarea
									id="description"
									cols="60"
									rows="3"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.descriptionMandate',
										})
									"
									@input="descriptionField.handleChange"
									@blur="descriptionField.handleBlur"
									:value="descriptionField.value"
								/>

								<p class="text-danger">
									{{ descriptionField.errorMessage }}
								</p>
							</div>

							<!-- upload contract -->
							<div class="form-group col-12">
								<!-- attachment -->
								<label for="contractFile">
									{{ t('document.uploadReportFile') }}
								</label>
								<div class="drop-container">
									<div class="dropzone" id="dropImage" v-bind="getRootProps()">
										<div class="dropzone-text">
											<div class="dropzone-icon">
												<FontAwesomeIcon :icon="cloudUploadIcon" />
											</div>
											<div class="dropzone-info align-items-center flex-wrap">
												<p class="pr-3">
													{{ t('resume.uploadScreenShot') }}
												</p>
												<span>{{ t('common.jpeg_jpg_png') }}</span>
											</div>
										</div>
										<div class="fallback">
											<input name="contentFile" v-bind="getInputProps()" />
										</div>
									</div>

									<!-- uploaded file preview -->
									<div class="preview" v-if="contentFile">
										<button type="button" class="drop-close" @click="removeFile">
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
													<img data-dz-thumbnail="" alt="Content file image" :src="contentFilePreview" />
												</div>
												<div class="dz-details">
													<div class="dz-size">
														<span data-dz-size=""
															><strong>{{ calculateFileSize }}</strong> {{ t('document.mb') }}</span
														>
													</div>
													<div class="dz-filename">
														<span data-dz-name="">{{ contentFile.name }}</span>
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
							{{ t('common.submit') }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'vue-toastification';
import { useDropzone } from 'vue3-dropzone';

export default {
	name: 'ReportBug',

	//components
	components: {
		FontAwesomeIcon,
	},

	props: {
		// modal status
		isModalShow: Object,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const stringRegExp = /^[a-zA-Z ]*$/;

		// icons
		const closeIcon = faTimes;
		const isSubmitting = ref(false);
		const cloudUploadIcon = faCloudUploadAlt;
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// file var
		const contentFile = ref(null);
		const contentFilePreview = ref('');
		// toast
		const toast = useToast();

		// form schema validation
		const contractSchema = yup.object({
			report_description: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.description',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'fieldList.description',
						type: '255 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.description',
					}),
				),

		});

		// form validation initialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: contractSchema,
		});

		// form fields
		const descriptionField = reactive(useField('report_description', undefined, { initialValue: null }));
		const contractFileField = reactive(useField('report_file', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch user related company list
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// calculate file size
		const calculateFileSize = computed(() => {
			const bytes = (contentFile.value && contentFile.value.size) || 0;

			// convert file size to MB from kb
			if (bytes === 0) {
				return 0;
			}

			return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// submit form - upload report file
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			const file = contentFile.value ?? null;
			// form data
			const formData = new FormData();

			formData.append('report_description', values.report_description);
			formData.append('report_file', file);

			await store.dispatch('document/reportBugProblem', formData).then(() => {
				isSubmitting.value = false;
				modalShow.value = false;
			});
		});

		// handle contract file change
		const handleContractFileChange = file => {
			contractFileField.value = file;

			contractFile.value = file[0]; // store file
			// file preview
			contractFilePreview.value = ['image/png'].includes(file[0].type) ? URL.createObjectURL(file[0]) : require('@/assets/images/iconWomanDraw.png');
		};

		// remove contract file
		const removeContractFile = () => {
			contractFileField.value = null;
			contractFile.value = null;
			contractFilePreview.value = null;
		};

		// on file upload
		const onDrop = (acceptFiles, rejectReasons) => {
			if (rejectReasons.length) {
				const fileSize = Math.round(rejectReasons[0].file.size / 1024 ** 2);
				if (10 <= fileSize) {
					toast.error(t('common.fileMessage'));
					return false;
				}
			}

			contentFile.value = acceptFiles[0]; // store file
			contractFileField.value = acceptFiles[0];

			// file preview
			contentFilePreview.value = ['image/png', 'image/jpg', 'image/jpeg', 'image/pdf'].includes(acceptFiles[0].type)
				? URL.createObjectURL(acceptFiles[0])
				: require('@/assets/images/iconWomanDraw.png');
		};

		// remove file
		const removeFile = () => {
			contentFile.value = null;
		};

		const removeBodyScroll = () => {
			document.querySelector('body').classList.remove('bg_scroll');
			modalShow.value = false;
		};

		// dropzone
		const { getRootProps, getInputProps, ...rest } = useDropzone({
			multiple: false,
			onDrop,
			maxSize: 10485760, // 5 MB
			accept: ['.png', '.jpg', '.jpeg'],
		});

		return {
			// translate function
			t,

			// refs
			modalShow,
			contractFile,
			contractFilePreview,

			contentFile,
			contentFilePreview,
			toast,

			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// fields
			descriptionField,
			contractFileField,
			cloudUploadIcon,

			// computed
			calculateFileSize,

			// methods
			submitForm,
			handleContractFileChange,
			removeContractFile,
			onDrop,
			removeFile,
			getRootProps,
			getInputProps,
			removeBodyScroll,
			rest,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.upload_contract {
	padding: 0;

	.invite_content {
		font-size: 14px !important;
		color: #000;
	}

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 30px;
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
				padding: 20px;
			}
			.modal-body {
				padding: 20px;
			}
		}
	}
}
.table thead th {
	border-bottom: transparent;
}

.table td {
	border-right: 2px solid #dee2e6;

	&:last-child {
		border-right: transparent;
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
