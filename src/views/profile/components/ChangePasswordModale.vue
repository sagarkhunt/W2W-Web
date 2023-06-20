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
					<h5 class="title-lg">{{ t('managerAccount.changePassword') }}</h5>
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<!-- form -->
					<div class="change_password__form">
						<form class="theme-input" @submit.prevent="submitForm()">
							<div class="row">
								<!-- old password -->
								<div class="form-group col-lg-6 col-12">
									<label for="oldPassword"> {{ t('fieldList.oldPassword') }}<span>*</span> </label>

									<input
										id="oldPassword"
										type="password"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.oldPassword',
											})
										"
										@input="oldPasswordField.handleChange"
										@blur="oldPasswordField.handleBlur"
										:value="oldPasswordField.value"
									/>

									<p class="text-danger">
										{{ oldPasswordField.errorMessage }}
									</p>
								</div>

								<!-- new password -->
								<div class="form-group col-lg-6 col-12">
									<label for="newPassword"> {{ t('fieldList.newPassword') }}<span>*</span> </label>

									<input
										id="newPassword"
										type="password"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.newPassword',
											})
										"
										@input="passwordField.handleChange"
										@blur="passwordField.handleBlur"
										:value="passwordField.value"
									/>

									<p class="text-danger">
										{{ passwordField.errorMessage }}
									</p>
								</div>

								<!-- confirm password -->
								<div class="form-group col-lg-6 col-12">
									<label for="confirmPassword"> {{ t('fieldList.confirmPassword') }}<span>*</span> </label>

									<input
										id="confirmPassword"
										type="password"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.confirmPassword',
											})
										"
										@input="confirmPasswordField.handleChange"
										@blur="confirmPasswordField.handleBlur"
										:value="confirmPasswordField.value"
									/>

									<p class="text-danger">
										{{ confirmPasswordField.errorMessage }}
									</p>
								</div>
							</div>

							<!-- change password btn -->
							<div class="form-row text-right">
								<ToolTip :title="t('toolTip.updatePassword')">
									<button type="submit" class="btn-common btn-red mt-2">
										{{ t('managerAccount.changePassword') }}
									</button>
								</ToolTip>
							</div>
						</form>
					</div>
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
	name: 'ChangePasswordSeeker',

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

	setup(props) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		// change password form schema validation
		const changePasswordSchema = yup.object({
			old_password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.oldPassword',
					}),
				),
			password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.newPassword',
					}),
				)
				.min(8, t('validation.minPasswordLen', { minLen: 8 })),
			confirmPassword: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.cpassword',
					}),
				)
				.oneOf([yup.ref('password'), null], t('validation.cPasswordMustMatch')),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
			validationSchema: changePasswordSchema,
		});

		// form fields
		const oldPasswordField = reactive(useField('old_password', undefined, { initialValue: null }));
		const passwordField = reactive(useField('password', undefined, { initialValue: null }));
		const confirmPasswordField = reactive(useField('confirmPassword', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {});

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
			await store.dispatch('auth/changePassword', values).then(() => {
				resetForm();
				modalShow.value = false;
			});
		});

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
			oldPasswordField,
			passwordField,
			confirmPasswordField,

			// computed

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
