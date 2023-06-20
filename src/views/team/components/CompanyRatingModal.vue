<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_documents" content-class="modal-content overflow-visible px-0 pb-0" :click-to-close="false">
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
					{{ t('job.ratingReview') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body overflow-visible">
				<div class="modal-form">
					<!-- form -->
					<form class="theme-input tab-form">
						<div class="rating space-y-2">
							<div class="row">
								<div class="col-lg-6 col-12">
									<div class="my-lg-0 mt-sm-4">
										<h6>
											{{ t('job.ratingDone') }}
										</h6>
									</div>
								</div>

								<div class="col-lg-6 col-12">
									<div class="rating-text">
										<h6 class="text-sm mt-lg-0 mt-4">
											{{ t('job.review') }}
										</h6>
									</div>
									<div class="d-flex align-items-center">
										<div class="rating-icon flex items-center justify-center">
											<span v-for="(item, index) in 5" :key="index">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													:fill="star > index ? '#E4AA18' : '#9E9E9E'"
													class="start-width review-star"
													@click="star = item"
												>
													<path
														d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
													/>
												</svg>
											</span>
										</div>

										<div>
											<p class="text-grey fw-bolder ml-3">{{ star }} {{ t('job.out_of_5') }}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<textarea
								rows="4"
								class="explaination mt-3"
								placeholder="Type Your explanation"
								@input="commentField.handleChange;"
								@blur="commentField.handleBlur;"
								v-model="commentField.value"
							></textarea>
							<p class="text-danger">
								{{ commentField.errorMessage }}
							</p>
						</div>
						<div>
							<p for="reviewSuggestion" class="text-gray text-md fw-bold my-3">
								{{ t('job.suggestion') }}
							</p>
							<div class="d-flex my-md-0 my-2 gap-4">
								<span>
									<p class="ml-md-0 ml-2 cursor-pointers title-xl-base" @click="suggetionValue('Neutral')">1) {{ t('seekerRating.neutral') }}</p>
								</span>
								<span>
									<p class="ml-md-0 ml-2 cursor-pointers title-xl-base" @click="suggetionValue('Good')">2) {{ t('seekerRating.good') }}</p>
								</span>
								<span>
									<p class="ml-md-0 ml-2 cursor-pointers title-xl-base" @click="suggetionValue('Very Good')">3) {{ t('seekerRating.very_good') }}</p>
								</span>
							</div>
						</div>

						<!-- upload btn -->
						<div
							class="d-flex justify-content-end
						"
						>
							<button type="button" class="btn-common btn-red mt-2 text-center" @click="submitForm" :disabled="isSubmitting">
								{{ t('job.add') }}
							</button>
						</div>
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
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';

export default {
	name: 'UploadMyDocument',

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
		const documentFile = ref(null);
		const documentFilePreview = ref('');
		const taxCardId = ref(null);
		const star = ref(5);
		const suggestion = ref(false);
		const isSubmitting = ref(false);
		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// global route
		const route = useRoute();

		// form schema validation
		const documentSchema = yup.object({
			comment: yup
				.string()
				.nullable()
				.max(
					255,
					t('validation.atMost', {
						field: 'fieldList.reviewRequired',
						type: '255 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.reviewRequired',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: documentSchema,
		});

		// form fields
		const commentField = reactive(useField('comment', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch work detail
			fetchLeJobList();
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

		// get country options
		const leJobOptions = computed(() => store.getters['job/getLeJobOptions']);

		const proposaleId = computed(() => {
			return store.state.job.proposalId;
		});

		const jobsId = computed(() => {
			return store.state.job.jobsId;
		});

		const seekerId = computed(() => {
			return store.state.job.seekerId;
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// document types
		const fetchLeJobList = async () => {
			await store.dispatch('job/getLeJobList', route.params.id);
		};

		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			// form data
			values.jobProposalId = proposaleId.value ?? null;
			values.jobId = jobsId.value ?? null;
			values.seekerId = seekerId.value ?? null;
			values.rate = star.value ?? 0;
			await store.dispatch('job/addRatingReview', values).then(() => {
				isSubmitting.value = false;
				emit('newDocumentUploaded');
				modalShow.value = false;
			});
		});
		const suggetionText = () => {
			suggestion.value = true;
		};

		const suggetionValue = val => {
			commentField.value = val;
			suggestion.value = false;
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
			star,
			suggestion,
			proposaleId,
			jobsId,
			seekerId,

			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// fields
			commentField,

			// computed
			documentTypeOptions,
			calculateFileSize,
			leJobOptions,

			// methods
			submitForm,
			suggetionText,
			suggetionValue,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';
@import '@/assets/scss/style.scss';

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
			padding: 30px;
			overflow: scroll;
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
