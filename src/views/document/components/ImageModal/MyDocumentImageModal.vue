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
					{{ t('fieldList.documentFile') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<div class="modal-form-img w-100">
						<img :src="imagePreviewGenerator" class="object-contain w-100" />
					</div>

					<div class=" d-flex justify-content-center">
						<button type="button" class="btn-common btn-red mt-2" @click="downLoadFile(imagePreviewGenerator)">
							{{ t('invoiceList.download1') }}
						</button>
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

import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default {
	name: 'ImageDoenloadModal',

	//components
	components: {
		FontAwesomeIcon,
	},

	props: {
		// modal status
		isModalShow: Object,
		imageLink: String,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const revisionNoteDisabled = ref(false);
		const imagePreviewGenerator = ref(null);
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
				.typeError('Team Name is required.')
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
			imagePreviewGenerator.value = props.imageLink;
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

		// transpor tedHeavy Load
		const onStatusChange = () => {
			statusField.value = !statusField.value;

			return statusField.value;
		};
		// download
		const downLoadFile = async link => {
			try {
				const response = await fetch(link);
				const blob = await response.blob();
				const url = await URL.createObjectURL(blob);

				const a = document.createElement('a');
				a.href = url;
				a.download = link.split('/').pop();
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			} catch (err) {
				console.log({ err });
			}
		};

		return {
			// translate function
			t,
			// refs
			imagePreviewGenerator,
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
			downLoadFile,
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
		min-width: 60%;
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
.modal-form-img {
	img {
		height: 300px;
		object-fit: contain;
	}
}
</style>
