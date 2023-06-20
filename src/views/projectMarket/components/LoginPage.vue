<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container login__modal" content-class="modal-content" :clickToClose="false">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal-all">
			<div class="modal__content">
				<!-- modal header -->
				<div class="modal-header">
					<div class="modal-logo-icon">
						<img src="@/assets/images/icon_png.png" alt="img" class="img-fluid" />
					</div>
				</div>

				<!-- modal body -->
				<div class="modal-body">
					<form>
						<div class="modal-texts">
							<h3 class="login">{{ t('common.login') }}</h3>
							<p class="please-login">
								{{ t('projectMarketPage.loginMessage') }}
							</p>
							<div class="input-section">
								<div class="input">
									<input
										type="email"
										class="input-text"
										:placeholder="
											t('validation.enterField', {
												field: 'fieldList.email',
											})
										"
										@input="emailField.handleChange"
										@blur="emailField.handleBlur"
										:value="emailField.value"
									/>
									<span class="red-icon"><FontAwesomeIcon :icon="envelopeIcon"/></span>
								</div>
								<p class="text-danger">
									{{ emailField.errorMessage }}
								</p>
								<div class="input">
									<input
										type="password"
										class="input-text"
										:placeholder="
											t('validation.enterField', {
												field: 'fieldList.password',
											})
										"
										@input="passwordField.handleChange"
										@blur="passwordField.handleBlur"
										:value="passwordField.value"
									/>
									<span class="red-icon"><FontAwesomeIcon :icon="lockIcon"/></span>
								</div>
								<p class="text-danger">
									{{ passwordField.errorMessage }}
								</p>
							</div>
							<div class="forgot-btn">
								<button type="submit" class="btn-common btn-red" @click="submitForm" :disabled="!formMeta.valid || isSubmitting">
									{{ t('common.login') }}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useField, useForm } from 'vee-validate';

import * as yup from 'yup';

export default {
	name: 'LoginForm',

	// components
	components: {
		FontAwesomeIcon,
	},

	setup() {
		// icons
		const closeIcon = faTimes;
		const envelopeIcon = faEnvelope;
		const lockIcon = faLock;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// user type status
		const userType = ref('jobseeker');

		// form schema validation
		const loginSchema = yup.object({
			email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.email',
					}),
				)
				.email(t('validation.validEmail')),
			password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.password',
					}),
				)
				.min(8, t('validation.minPasswordLen', { minLen: 8 })),
			isPasswodRemember: yup.boolean().oneOf([true, false]),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting } = useForm({
			validationSchema: loginSchema,
		});

		// form fields
		const emailField = reactive(useField('email', undefined, { initialValue: null }));

		const passwordField = reactive(useField('password', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			setTimeout(function() {
				document.querySelector('body').style.overflow = 'unset';
			}, 100);
		});

		/**
		 * computed props
		 * *******************************************************************
		 */
		// toggle login modal
		const modalShow = computed({
			get() {
				return store.state.auth.isLoginModelOpenProject;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'isLoginModelOpenProject',
					data: val,
				});
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// submit form - change tab - step - 2
		const submitForm = handleSubmit(values => {
			// login;
			store
				.dispatch('auth/login', {
					...values,
					user_type: userType.value,
				})
				.then(() => {
					window.location.href = '/project-market';
				});
		});

		return {
			t,
			closeIcon,
			modalShow,
			userType,
			formMeta,
			isSubmitting,
			emailField,
			passwordField,
			envelopeIcon,
			lockIcon,
			submitForm,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';
.modal-content {
	min-width: 40%;
	.modal-all {
		.modal__content {
			padding: 0;
			.modal-header {
				padding: 0;
				.modal-logo-icon {
					position: absolute;
					top: 0;
					left: 50%;
					width: 90px;
					padding: 1rem;
					background-color: #fff;
					height: 90px;
					border-radius: 50%;
					transform: translate(-50%, -50%);
					box-shadow: 0 4px 60px -25px #ff4b57;
				}
			}
			.modal-body {
				padding-top: 2.5rem;
				.modal-texts {
					text-align: center;
					.login {
						font-weight: 600;
					}
					.please-login {
						margin-top: 0.5rem;
						font-size: 20px;
						color: #465765;
					}
					.input-section {
						margin-top: 1.5rem;
						.input {
							margin-top: 0.5rem;
							padding: 4px 14px;
							border-radius: 8px;
							display: flex;
							justify-content: space-between;
							background-color: #f7f7f7;
							.input-text {
								width: 100%;
								border: none;
								background: transparent;
							}
							.red-icon {
								font-size: 20px;
								color: $coloRed;
							}
						}
					}
					.btn-common {
						margin-top: 1rem;
					}
				}
			}
		}
	}
}
</style>
