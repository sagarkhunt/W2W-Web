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
					{{ t('managerAccount.updateCompanyName') }}
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
								<label for="userName">
									{{ t('managerAccount.companyName') }}
								</label>

								<input
									id="teamName"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.companyName',
										})
									"
									@input="fullNameField.handleChange"
									@blur="fullNameField.handleBlur"
									:value="fullNameField.value"
								/>

								<p class="text-danger">
									{{ fullNameField.errorMessage }}
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
import { ref, reactive, onMounted } from 'vue';
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
		// work detail id
		editUserDetails: {
			default: null,
			type: Object,
		},
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;
		const isSubmitting = ref(false)
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const contractSchema = yup.object({
			full_name: yup
				.string()
				.matches(/^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/, 'Comapny name is not valid')
				.typeError('Comapny name is required.')
				.max(
					25,
					t('validation.atLeast', {
						field: 'fieldList.fullName',
						type: '25 characters',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: contractSchema,
		});

		// form fields
		const fullNameField = reactive(useField('full_name', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			fullNameField.value = props.editUserDetails.editUserName ?? null;
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		/**
		 * Methods
		 * *******************************************************************
		 */

		// submit form - upload contract
		const submitForm = handleSubmit(async values => {
			const capitalName = titleCase(values.full_name);
			isSubmitting.value = true;
			await store
				.dispatch('auth/updateUserName', {
					payload: {
						full_name: capitalName,
					},
				})
				.then(() => {
					isSubmitting.value = false;
					emit('fetchUserDetails');
					modalShow.value = false;
				});
		});
		// first later capital
		const titleCase = str => {
			var splitStr = str.toLowerCase().split(' ');
			for (var i = 0; i < splitStr.length; i++) {
				// You do not need to check if i is larger than splitStr length, as your for does that for you
				// Assign it back to the array
				splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
			}
			// Directly return the joined string
			return splitStr.join(' ');
		};

		return {
			// translate function
			t,
			// refs
			modalShow,

			// icons
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// fields
			fullNameField,

			// methods
			submitForm,
			titleCase,
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