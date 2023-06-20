<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container add_experience_modal" content-class="modal-content px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					{{ t('resume.resumeTitle') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body overflow-visible">
				<div class="row m-0">
					<div class="col-12">
						<!-- form -->
						<form class="theme-input tab-form">
							<div class="form-row">
								<!-- job title type -->
								<div class="form-group col-md-12">
									<label for="resumeDesc">
										{{ t('fieldList.description') }}
									</label>

									<textarea
										id="resumeDesc"
										type="text"
										class="form-control text-height"
										@input="resumeDescripationField.handleChange"
										@blur="resumeDescripationField.handleBlur"
										:value="resumeDescripationField.value"
									/>

									<p class="text-danger">
										{{ resumeDescripationField.errorMessage }}
									</p>
								</div>
							</div>

							<div class="form-group col-md-12 p-0">
								<!-- dropzone - upload file -->
								<label for="uploadResumeFile">{{ t('resume.uploadResumeFile') }}</label>
								<div class="drop-container">
									<div class="dropzone" id="dropImage" v-bind="getRootProps()">
										<div class="dropzone-text">
											<div class="dropzone-icon">
												<FontAwesomeIcon :icon="cloudUploadIcon" />
											</div>
											<div class="dropzone-info align-items-center flex-wrap">
												<p class="pr-3">
													{{ t('resume.uploadResumeFile') }}
												</p>
												<span>{{t('common.pdf_doc_ppt_jpg_png')}}</span>
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
								<p class="text-danger">
									{{ resumefileField.errorMessage }}
								</p>
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
import { faTimes, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import { useDropzone } from 'vue3-dropzone';

export default {
	name: 'AddEmployerModal',

	props: {
		// modal status
		isModalShow: Object,

		// work detail id
		workDetailId: {
			default: null,
			type: Number,
		},
	},

	//components
	components: {
		FontAwesomeIcon,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// file var
		const contentFile = ref(null);
		const contentFilePreview = ref('');

		// icons
		const closeIcon = faTimes;
		const cloudUploadIcon = faCloudUploadAlt;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// toast
		const toast = useToast();

		// global store
		const store = useStore(); // use state

		const isSubmitting = ref(false)

		// form schema validation
		const experienceSchema = yup.object({
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
			resume_file: yup
				.mixed()
				.nullable()
				.optional(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: experienceSchema,
		});

		// form fields
		const resumeDescripationField = reactive(useField('description', undefined, { initialValue: null }));
		const resumefileField = reactive(useField('resume_file', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
		});

		/**
		 * Computed props
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
		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			// set date format
			const file = contentFile.value ?? null;

			// form data
			const formData = new FormData();
			formData.append('resume_file', file);
			formData.append('description', values.description);

			await store.dispatch('resume/addResume', formData).then(() => {
				isSubmitting.value = false;
				modalShow.value = false;
			}).catch(err => {
				isSubmitting.value = false;
			});

			emit('newResume');

			return true;
		});

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
			resumefileField.value = acceptFiles[0];

			// file preview
			contentFilePreview.value = ['image/png', 'image/jpg', 'image/jpeg', 'image/pdf'].includes(acceptFiles[0].type)
				? URL.createObjectURL(acceptFiles[0])
				: require('@/assets/images/iconWomanDraw.png');
		};

		// remove file
		const removeFile = () => {
			contentFile.value = null;
		};

		// dropzone
		const { getRootProps, getInputProps, ...rest } = useDropzone({
			multiple: false,
			onDrop,
			maxSize: 5242880, // 5 MB
			accept: ['.png', '.pdf', '.jpg', '.jpeg', '.docx'],
		});

		return {
			// translate function
			t,
			contentFile,
			contentFilePreview,
			toast,

			// refs
			modalShow,

			// icons
			closeIcon,
			cloudUploadIcon,
			// form related
			formMeta,
			isSubmitting,

			// fields
			resumeDescripationField,
			resumefileField,
			// computed
			calculateFileSize,

			//method
			onDrop,
			submitForm,
			removeFile,
			getRootProps,
			getInputProps,
			rest,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.add_experience_modal {
	padding: 0;
	.theme-input {
		.text-height {
			height: 100px;
		}
	}

	.modal__content {
		padding: 0;
		max-height: calc(100vh - 4em);
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
