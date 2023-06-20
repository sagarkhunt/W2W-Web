<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_contract" content-class="modal-content px-0 pb-0">
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
					{{ t('invoiceList.leInvoice.sendForRevision.sendRevNote') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<!-- form -->
					<form class="theme-input tab-form">
						<label for="teamName">
							{{ t('invoiceList.leInvoice.sendForRevision.revNotes') }}
						</label>
						<div class="form-row mb-xl-2 mb-0">
							<!-- contract name -->
							<div class="form-group col-xl-6">
								<textarea
									id="revisionNote"
									type="text"
									class="form-control h-100"
									:placeholder="
										t('validation.enterField', {
											field: 'invoiceList.leInvoice.viewInvoice.revisionNote',
										})
									"
									@input="revisionNotesField.handleChange"
									@blur="revisionNotesField.handleBlur"
									:value="revisionNotesField.value"
									:disabled="!revisionNoteDisabled"
								/>

								<p class="text-danger">
									{{ revisionNotesField.errorMessage }}
								</p>
							</div>

							<div class=" d-flex flex-column justify-content-between col-xl-6 px-5 mt-xl-0 mt-2">
								<div class="d-flex align-items-center revision-note-check mb-3">
									<input
										class="form-check-input me-2"
										id="revisionNote0"
										name="revisionNote"
										type="radio"
										@click="handlerRevisionNoteChange($event, 'Agreement misunderstanding.')"
									/>
									<label class="mb-0 ms-2" for="revisionNote0">{{ t('invoiceList.leInvoice.sendForRevision.agrMisunderstanding') }}.</label>
								</div>
								<div class="d-flex align-items-center revision-note-check mb-3">
									<input class="form-check-input me-2" name="revisionNote" id="revisionNote1" type="radio" @click="handlerRevisionNoteChange($event, 'False Invoice.')" />
									<label class="mb-0 ms-2" for="revisionNote1"> {{ t('invoiceList.leInvoice.sendForRevision.falseInvoice') }}.</label>
								</div>
								<div class="d-flex align-items-center revision-note-check mb-3">
									<input class="form-check-input me-2" name="revisionNote" id="revisionNote2" type="radio" @click="handlerRevisionNoteChange($event, 'Ask to be credited.')" />
									<label class="mb-0 ms-2" for="revisionNote2">{{ t('invoiceList.leInvoice.sendForRevision.askCredited') }}.</label>
								</div>
								<div class="d-flex align-items-center revision-note-check mb-3">
									<input class="form-check-input me-2" name="revisionNote" id="revisionNote3" type="radio" @click="handlerRevisionNoteChange($event, 'Scam.')" />
									<label class="mb-0 ms-2" for="revisionNote3">{{ t('invoiceList.leInvoice.sendForRevision.scam') }}.</label>
								</div>
							</div>
						</div>
						<div class="col-md-5 form-check form-checkbox">
							<input
								class="form-check-input form-checkbox-width"
								type="checkbox"
								id="transportedHeavyLoad"
								:value="statusField.value"
								:v-model="statusField.value"
								@click="onStatusChange($event)"
							/>
							<label class="form-check-label extras-font" for="transportedHeavyLoad"> {{ t('invoiceList.leInvoice.sendForRevision.underReview') }} </label>
						</div>

						<!-- upload btn -->
						<div class=" d-flex justify-content-center">
							<button type="button" class="btn-common btn-red mt-2" @click="submitForm">
								{{ t('jobSeekerTeam.submit') }}
							</button>
						</div>
					</form>
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

import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default {
	name: 'AddJobseekerTeamModal',

	//components
	components: {
		FontAwesomeIcon,
	},

	props: {
		// modal status
		isModalShow: Object,
		invoiceId: Number,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const revisionNoteDisabled = ref(false);
		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const contractSchema = yup.object({
			admin_revision_note: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'jobSeekerTeam.teamName',
					}),
				)
				.min(
					5,
					t('validation.atLeast', {
						field: 'jobSeekerTeam.teamName',
						type: '5 characters',
					}),
				)
				.max(
					60,
					t('validation.atMost', {
						field: 'jobSeekerTeam.teamName',
						type: '60 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'jobSeekerTeam.teamName',
					}),
				),
			ststus: yup.boolean(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting } = useForm({
			validationSchema: contractSchema,
		});

		// form fields
		const revisionNotesField = reactive(useField('admin_revision_note', undefined, { initialValue: null }));
		const statusField = reactive(useField('ststus', undefined, { initialValue: false }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// employer list
		const employerList = computed(() => store.getters['document/getEmployersList']);

		/**
		 * Methods
		 * *******************************************************************
		 */

		// submit form - upload contract
		const submitForm = handleSubmit(async values => {
			const payload = {
				admin_revision_note: values.admin_revision_note,
				type: 'under_review',
				status: values.ststus,
			};
			await store
				.dispatch('invoice/addRevisionNotes', {
					id: props.invoiceId,
					payload,
				})
				.then(() => {
					emit('newAddedRevisionNote');
					modalShow.value = false;
				});
		});

		const handlerRevisionNoteChange = (e, note) => {
			revisionNoteDisabled.value = true;
			revisionNotesField.value = note;
		};

		// transport tedHeavy Load
		const onStatusChange = () => {
			statusField.value = !statusField.value;

			return statusField.value;
		};

		return {
			// translate function
			t,
			// refs
			modalShow,
			contractFile,
			contractFilePreview,
			revisionNoteDisabled,

			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// fields
			revisionNotesField,
			statusField,

			// computed
			employerList,

			// methods
			submitForm,
			handlerRevisionNoteChange,
			onStatusChange,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.upload_contract {
	padding: 0;


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
.revision-note-check {
	.form-check-input {
		width: 20px;
		height: 20px;
		&:checked {
			border-color: #ff4b57;
			background-color: #ff4b57;
		}
		&:focus {
			box-shadow: none !important;
		}
	}
}
.text-danger {
	font-size: 13px;
}
</style>
