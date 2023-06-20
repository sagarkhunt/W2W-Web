<template>
	<div class="mb-2">
		<label class="semibold" for="full_name">{{ t('fieldList.fullName') }}</label>
		<input
			id="firstName"
			type="text"
			class="form-control"
			:placeholder="
				t('validation.enterField', {
					field: 'placeholder.fullName',
				})
			"
			@input="firstNameField.handleChange"
			@blur="firstNameField.handleBlur"
			:value="firstNameField.value"
		/>

		<p class="error-text mt-1">
			{{ firstNameField.errorMessage }}
		</p>
	</div>
	<div class="mb-2">
		<label class="semibold" for="password">{{ t('fieldList.password') }}</label>
		<input
			type="password"
			class="form-control"
			:placeholder="
				t('validation.enterField', {
					field: 'placeholder.password',
				})
			"
			@input="passwordField.handleChange"
			@blur="passwordField.handleBlur"
			:value="passwordField.value"
		/>
		<p class="error-text mt-1">
			{{ passwordField.errorMessage }}
		</p>
	</div>
	<div class="mb-2">
		<label class="semibold" for="confirm_password">{{ t('fieldList.cpassword') }}</label>
		<input
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
		<p class="error-text mt-1">
			{{ confirmPasswordField.errorMessage }}
		</p>
	</div>
	<div class="mb-2">
		<label class="semibold" for="confirm_password">{{ t('loginSignUp.redeem_your_code') }}</label>
		<input
			type="text"
			class="form-control"
			:placeholder="
				t('validation.enterField', {
					field: 'placeholder.redeemCode',
				})
			"
			@input="redeemYourCodeField.handleChange"
			@blur="redeemYourCodeField.handleBlur"
			:value="redeemYourCodeField.value"
		/>
	</div>
	<div class="d-flex align-items-center justify-content-between mt-4">
		<div class="next_icon_wrapper">
			<button type="button" @click="submitUserInfoForm" :disabled="isSubmitting">
				<img src="../../../assets/images/next_arrow.svg" alt="" />
			</button>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { Tab } from 'bootstrap';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { router } from '../../../main';
import { boolean } from 'yup/lib/locale';

export default {
	name: 'MobileVerification',

	// components
	components: {
		// Multiselect,
	},

	props: {
		userType: String,
		userFalse: boolean,
	},

	// eslint-disable-next-line no-unused-vars
	setup(props) {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		//regx
		const alphaNumberRegExp = /^[a-zA-Z0-9 ]*$/;
		const fullName = /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/;
		// form schema validation
		const AccountSchema = yup.object({
			full_name: yup
				.string()
				.nullable()
				.matches(
					fullName,
					t('validation.noValid', {
						field: 'fieldList.fullName',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.fullName',
					}),
				)
				.max(
					25,
					t('validation.atLeast', {
						field: 'fieldList.fullName',
						type: '25 characters',
					}),
				),
			password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.password',
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
			redeem_code: yup.string().nullable(),
			languageId: yup.number().nullable(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
			validationSchema: AccountSchema,
		});

		// form fields
		const firstNameField = reactive(useField('full_name', undefined, { initialValue: null }));
		// form fields
		const passwordField = reactive(useField('password', undefined, { initialValue: null }));
		const confirmPasswordField = reactive(useField('confirmPassword', undefined, { initialValue: null }));
		const redeemYourCodeField = reactive(useField('redeem_code', undefined, { initialValue: null }));
		const languageField = reactive(useField('languageId', undefined, { initialValue: null }));
		onMounted(() => {
			const currentRegistrationData = JSON.parse(localStorage.getItem('current_registration'));
		});
		/**
		 * computed
		 * *******************************************************************
		 */

		// get language list
		const languageList = computed(() => {
			return store.state.language.languages.map(x => ({ language_name: x.language_name, value: x.id }));
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// change form step
		const changeTab = tab => {
			const triggerTab = document.querySelector(`#pills-tab #${tab}`);
			new Tab(triggerTab).show();
		};

		// submit form - change tab - step - 2
		const submitUserInfoForm = handleSubmit(values => {
			const tempCurrentRegistrationData = JSON.parse(localStorage.getItem('current_registration'));
			const fullName = titleCase(values.full_name);
			// form data
			const formData = new FormData();
			formData.append('email', tempCurrentRegistrationData.email);
			formData.append('password', values.password);
			formData.append('mobile', null);
			formData.append('full_name', values.full_name);
			formData.append('redeem_code', values.redeem_code);
			formData.append('owner_ship_type', tempCurrentRegistrationData.organization_type);

			store.dispatch(tempCurrentRegistrationData.user_type === 'jobseeker' ? 'auth/registerJobSeeker' : 'auth/registerEmployer', formData).then(() => {
				localStorage.removeItem('jobseekerpuzzle');
				localStorage.removeItem('current_registration');
				localStorage.removeItem('cmppuzzLE');
				document.getElementById('v-pills-signin-tab').click();
				router.push({ name: 'auth-login-page' });
				resetForm();
			});
		});
		// firat later capital
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
			t,
			store,
			// mobileField,
			firstNameField,
			passwordField,
			confirmPasswordField,
			redeemYourCodeField,
			languageField,
			formMeta,
			isSubmitting,
			resetForm,
			languageList,
			changeTab,
			// submitForm,
			submitUserInfoForm,
			titleCase,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';
@import '@/assets/scss/style.scss';

.sign_in_up {
	height: 100vh;
	background-image: url('~@/assets/images/sign-up_in-bg.png');
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	z-index: 1;
	@media (max-width: 1024px) {
		padding: 1rem 0;
	}
	.w2w_logo-wrapper {
		display: none;
		margin-bottom: 3rem;
		@media (max-width: 1024px) {
			display: flex;
			margin-bottom: 1rem;
		}
		img {
			max-width: 200px;
			width: 100%;
			@media (max-width: 575px) {
				max-width: 170px;
			}
		}
	}
	.sign_wrapper {
		height: 562px;
		display: flex;
		@media (max-width: 1280px) {
			height: 532px;
		}
		@media (max-width: 1024px) {
			display: block;
			height: auto;
		}
		@media (max-width: 575px) {
			max-width: 380px;
			margin: 0 auto;
		}
		@media (max-width: 400px) {
			max-width: 330px;
		}
		::-webkit-scrollbar {
			width: 3px;
		}
		::-webkit-scrollbar-thumb {
			background: #8080806e;
			border-radius: 10px;
		}
		.sign-dark {
			height: 100%;
			padding: 1.6rem 0 0.8rem 0.8rem;
			border-top-left-radius: 1.5rem;
			border-bottom-left-radius: 1.5rem;
			background-color: #000;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-right: -15px;
			@media (max-width: 1024px) {
				height: auto;
				padding: 0.7rem 0.8rem 0 0.8rem;
				align-items: flex-start;
				border-top-left-radius: 1rem;
				border-bottom-left-radius: 0;
				border-top-right-radius: 1rem;
				margin: 0 1.2rem;
				position: relative;
				z-index: 3;
			}
			@media (max-width: 575px) {
				padding: 0.7rem 0.7rem 0 0.7rem;
			}
			.sign_w2w_logo {
				height: 60px;
				width: 60px;
				margin-right: 0.8rem;
				@media (max-width: 1024px) {
					display: none;
				}
			}
			.tab_drop_wrapper {
				display: block;
				width: 100%;
				@media (max-width: 1024px) {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.sign_language_dropdown {
					margin-bottom: 1.2rem;
					margin-right: 0.8rem;
					@media (max-width: 1024px) {
						margin: -0.8rem 0 0 0;
						order: 2;
						width: 44%;
					}
					@media (max-width: 400px) {
						width: 40%;
					}
					.dropdown-toggle {
						color: #fff;
						text-transform: uppercase;
						font-size: 19px;
						font-weight: 700;
						margin: 0 auto;
						@media (max-width: 575px) {
							font-size: 18px;
						}
						&::after {
							display: none;
						}
						.language-earth_img {
							width: 100%;
							max-width: 19px;
						}
					}
				}
			}
			.nav {
				flex-direction: column;
				@media (max-width: 1024px) {
					flex-direction: row;
					order: 1;
				}
				.nav-link {
					border-top-left-radius: 0.7rem;
					border-bottom-left-radius: 0.7rem;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
					background-color: #2e2b2b;
					color: #fff;
					padding: 20px 15px;
					@media (max-width: 1280px) {
						padding: 15px 10px;
					}
					@media (max-width: 1024px) {
						border-bottom-left-radius: 0;
						border-top-right-radius: 0.7rem;
						padding: 8px 15px;
					}
					@media (max-width: 575px) {
						padding: 8px 13px;
					}
					@media (max-width: 400px) {
						padding: 8px 11px;
					}
					&.signup_tab {
						@media (max-width: 1024px) {
							order: 2;
						}
					}
					&.signin_tab {
						margin-top: 0.25rem;
						@media (max-width: 1024px) {
							order: 1;
							margin-top: 0;
							margin-right: 0.3rem;
						}
					}
					&.active {
						background-color: #fff;
						color: #000;
						.sign_icons {
							fill: #000;
							stroke: #000;
						}
					}
					.sign_icons {
						height: 40px;
						width: 40px;
						fill: #fff;
						stroke: #fff;
						@media (max-width: 1280px) {
							height: 32px;
							width: 32px;
						}
						@media (max-width: 1024px) {
							height: 30px;
							width: 30px;
						}
						@media (max-width: 575px) {
							height: 25px;
							width: 25px;
						}
						~ p {
							font-size: 18px;
							@media (max-width: 1280px) {
								font-size: 16px;
							}
							@media (max-width: 575px) {
								font-size: 14px;
							}
						}
					}
				}
			}
		}
		.white_puzzle {
			z-index: 2;
			position: relative;
			@media (max-width: 1024px) {
				background-color: #fff;
				border-radius: 0.7rem;
				box-shadow: 2px 0px 24px 0px #00000057;
			}
			.white_img_puzzle {
				position: relative;
				.sign_white_puzzle {
					height: 663px;
					width: 100%;
					@media (max-width: 1280px) {
						width: 570px;
						height: 620px;
					}
					@media (max-width: 1024px) {
						display: none;
					}
				}
			}
			.white_content {
				position: absolute;
				top: 0;
				left: 0;
				padding: 75px 87px 65px 55px;
				width: 100%;
				height: 100%;
				@media (max-width: 1280px) {
					padding: 55px 67px 45px 35px;
				}
				@media (max-width: 1024px) {
					position: unset;
					padding: 20px 34px;
					height: 100%;
					max-height: 190px;
					min-height: 165px;
					overflow: auto;
				}
				@media (max-width: 575px) {
					padding: 25px 27px;
					max-height: 180px;
					min-height: 180px;
				}
				@media (max-width: 400px) {
					max-height: 170px;
					min-height: 170px;
				}
				h1 {
					@media (max-width: 1280px) {
						font-size: 2rem;
					}
					@media (max-width: 1024px) {
						font-size: 1.6rem;
					}
				}
				.fn18 {
					font-size: 18px;
					@media (max-width: 1280px) {
						font-size: 16px;
					}
					@media (max-width: 1024px) {
						font-size: 14px;
					}
					@media (max-width: 575px) {
						font-size: 13px;
					}
				}
				.journey_img {
					height: auto;
					width: 100%;
					max-width: 350px;
					position: absolute;
					bottom: 70px;
					right: 90px;
					@media (max-width: 1280px) {
						max-width: 260px;
					}
					@media (max-width: 1024px) {
						max-width: 100px;
						bottom: 10px;
						right: 10px;
					}
					@media (max-width: 575px) {
						bottom: 12px;
						right: 12px;
					}
					img {
						object-fit: contain;
					}
				}
				.entering-text-wapper {
					@media (max-width: 1024px) {
						width: 100%;
						max-width: 245px;
					}
					@media (max-width: 400px) {
						max-width: 220px;
					}
				}
			}
		}
		.sign-red {
			height: 100%;
			background-color: red;
			color: #fff;
			padding: 1.5rem 2rem;
			border-top-right-radius: 1.5rem;
			border-bottom-right-radius: 1.5rem;
			margin-left: -55px;
			box-shadow: 2px 0px 24px 0px #00000057;
			min-width: 410px;
			max-width: 410px;
			overflow: auto;
			position: relative;
			@media (max-width: 1280px) {
				padding: 1.3rem 1.5rem 1.3rem 2rem;
			}
			@media (max-width: 1024px) {
				height: auto;
				overflow: visible;
				margin: -15px auto 0 auto;
				border-top-right-radius: 0;
				border-bottom-right-radius: 1rem;
				border-bottom-left-radius: 1rem;
				padding: 2rem 1.5rem 1.3rem 1.5rem;
			}
			@media (max-width: 575px) {
				min-width: 365px;
				max-width: 365px;
			}
			@media (max-width: 400px) {
				min-width: 325px;
				max-width: 325px;
			}
			&::after {
				content: '';
				width: 40px;
				height: 40px;
				border-radius: 50px;
				background-color: red;
				position: absolute;
				top: 70px;
				right: -30px;
				display: none;
				@media (max-width: 1024px) {
					display: block;
				}
				@media (max-width: 575px) {
					height: 30px;
					width: 30px;
					right: -20px;
				}
				@media (max-width: 400px) {
					height: 25px;
					width: 25px;
					right: -15px;
				}
			}
			&::before {
				content: '';
				width: 40px;
				height: 40px;
				border-radius: 50px;
				background-color: red;
				position: absolute;
				top: 70px;
				left: -30px;
				display: none;
				@media (max-width: 1024px) {
					display: block;
				}
				@media (max-width: 575px) {
					height: 30px;
					width: 30px;
					left: -20px;
				}
				@media (max-width: 400px) {
					height: 25px;
					width: 25px;
					left: -15px;
				}
			}
			.tab-content {
				height: 100%;
				.tab-pane {
					height: 100%;
					h2 {
						@media (max-width: 1024px) {
							font-size: 1.7rem;
						}
					}
					.form-control {
						max-width: 350px;
						width: 100%;
						border: none;
						border-radius: 13px;
						padding: 22px 15px;
						@media (max-width: 575px) {
							padding: 20px 15px;
						}
						&::placeholder {
							color: #ccc;
							font-weight: 500;
							font-size: 14px;
						}
					}
					.note-text {
						font-size: 12px;
						font-weight: 500;
						max-width: 285px;
						line-height: 1.3;
						span {
							text-decoration: underline;
							cursor: pointer;
							a {
								color: #fff;
							}
						}
					}
					.next_icon_wrapper {
						height: 60px;
						width: 60px;
						min-width: 60px;
						background-color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #000;
						border-radius: 50%;
						box-shadow: 1px 1px 12px 4px #00000024;
						cursor: pointer;
						margin-left: auto;
						@media (max-width: 1280px) {
							height: 47px;
							width: 47px;
							min-width: 47px;
						}
						img {
							height: 28px;
							width: 28px;
							@media (max-width: 1280px) {
								height: 24px;
								width: 24px;
							}
						}
						&.desktop_next_icon {
							display: flex;
							@media (max-width: 1024px) {
								display: none;
							}
						}
					}
					.accept-text {
						padding-left: 2rem;
						&.form-checkbox {
							margin-bottom: 10px;

							.form-checkbox-width {
								width: 1.1em;
								height: 1.1em;
								margin: 0 10px 0 -30px;
								min-width: 1.1em;
								z-index: 2;

								&:focus {
									box-shadow: none;
								}
							}
							.form-check-input:checked {
								background-color: #565e64;
								border: none;
							}
						}
						.form-check-label {
							font-size: 13px;
						}
						.condition-error-text {
							font-size: 14px;
						}
					}
					.icon_responsive_wrapper {
						.verification-text {
							line-height: 1.3;
							font-size: 15px;
							font-weight: 500;
							@media (max-width: 1024px) {
								font-size: 0.9rem;
							}
							@media (max-width: 575px) {
								font-size: 0.8rem;
							}
						}
						.mobile_next_icon {
							display: none;
							@media (max-width: 1024px) {
								display: flex;
							}
						}
					}
					.singup_first {
						justify-content: flex-end;
						display: flex;
						flex-direction: column;
						align-items: flex-end;
					}
					.singup_first,
					.singup_second {
						label {
							@media (max-width: 1024px) {
								font-size: 0.9rem;
							}
							@media (max-width: 575px) {
								font-size: 0.8rem;
							}
						}
						.submit_button {
							justify-content: flex-end;
							@media (max-width: 1024px) {
								justify-content: start;
							}
						}
					}
				}
			}
			.fade:not(.show) {
				display: none;
			}
		}
	}
}
.error-text {
	font-size: 13px;
}
</style>

<style lang="scss">
.sign_wrapper {
	.multiselect-input {
		border-radius: 13px !important;
		min-height: 44px;
		@media (max-width: 575px) {
			min-height: 40px;
		}
	}
	.multiselect-options {
		overflow: auto;
		border-radius: 12px;
		border: none;
	}
	.multiselect-single-label {
		color: #000;
	}
}
</style>
