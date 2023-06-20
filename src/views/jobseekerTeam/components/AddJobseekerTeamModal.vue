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
					{{ t('jobSeekerTeam.title') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<!-- form -->
					<form class="theme-input tab-form">
						<div class="form-row">
							<!-- contract name -->
							<div class="form-group col-xl-12">
								<label for="teamName">
									{{ t('jobSeekerTeam.teamName') }}
								</label>

								<input
									id="teamName"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.teamName',
										})
									"
									@input="teamNameField.handleChange"
									@blur="teamNameField.handleBlur"
									:value="teamNameField.value"
								/>

								<p class="text-danger">
									{{ teamNameField.errorMessage }}
								</p>
							</div>
						</div>

						<!-- upload btn -->
						<button type="button" class="btn-common btn-red mt-2" @click="submitForm" :disabled="isSubmitting">
							{{ t('jobSeekerTeam.submit') }}
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
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const contractFile = ref(null);
		const contractFilePreview = ref('');
		const stringRegExp = /^[a-zA-Z ]*$/;
		const isSubmitting = ref(false);
		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const contractSchema = yup.object({
			team_name: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'jobSeekerTeam.teamName',
					}),
				)
				.matches(
					stringRegExp,
					t('validation.noValid', {
						field: 'jobSeekerTeam.teamName',
					}),
				)
				.min(
					2,
					t('validation.atLeast', {
						field: 'jobSeekerTeam.teamName',
						type: '2 characters',
					}),
				)
				.max(
					25,
					t('validation.atMost', {
						field: 'jobSeekerTeam.teamName',
						type: '25 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'jobSeekerTeam.teamName',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: contractSchema,
		});

		// form fields
		const teamNameField = reactive(useField('team_name', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {});

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
			isSubmitting.value = true;
			await store
				.dispatch('jobseekerTeam/addSeekerTeam', {
					team_name: values.team_name,
				})
				.then(() => {
					isSubmitting.value = false;
					emit('newAddedTeam');
					modalShow.value = false;
				});
		});

		return {
			// translate function
			t,
			// refs
			modalShow,
			contractFile,
			contractFilePreview,

			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// fields
			teamNameField,

			// computed
			employerList,

			// methods
			submitForm,
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
</style>

<style lang="scss" scoped>
:deep .modal-content {
	width: 100% !important;
	max-width: 600px !important;
	min-width: auto !important;
}
</style>
