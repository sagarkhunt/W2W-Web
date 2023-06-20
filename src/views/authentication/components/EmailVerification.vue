<template>
	<div>
		<div class="mb-2">
			<label class="semibold" for="account_type">{{ t('loginSignUp.accountType') }}</label>
			<Multiselect
				id="accountType"
				class="form-group"
				@input="userTypeField.handleChange"
				@blur="userTypeField.handleBlur"
				:placeholder="
					t('validation.selectField', {
						field: 'placeholder.accountType',
					})
				"
				v-model="userTypeField.value"
				:options="accountTypeOptions.map(x=>({...x, label: t(x.label)}))"
				mode="single"
				:hide-selected="true"
			/>
			<p class="error-text mt-1">
				{{ userTypeField.errorMessage }}
			</p>
		</div>
		<div class="mb-2">
			<label class="semibold" for="inputEmailPassword4">{{ t('fieldList.emailAddress') }}</label>
			<input
				type="email"
				class="form-control w-100"
				:placeholder="
					t('validation.enterField', {
						field: 'placeholder.email',
					})
				"
				@input="emailField.handleChange"
				@blur="emailField.handleBlur"
				:value="emailField.value"
			/>
			<p class="error-text mt-1">
				{{ emailField.errorMessage }}
			</p>
		</div>

		<div class="accept-text form-check form-checkbox mt-3 mb-0">
			<input
				class="form-check-input form-checkbox-width"
				type="checkbox"
				id="transportedHeavyLoad"
				@change="termsAndConditionField.handleChange"
				:value="termsAndConditionField.value"
				v-model="termsAndConditionField.value"
			/>
			<label class="form-check-label checkbox" for="termsAndCondition"
				><p class="note-text">
					{{ t('loginSignUp.termsContent1') }}
					<span
						><a @click="termsConditions()" target="_blank"> {{ t('loginSignUp.termsContent2') }}. </a></span
					>{{ t('loginSignUp.termsContent3') }}
					<span
						><a @click="privacyPolicy()" target="_blank"> {{ t('loginSignUp.here') }}.</a></span
					>
				</p></label
			>
			<p class="condition-error-text">
				{{ termsAndConditionField.errorMessage }}
			</p>
		</div>
		<div class="d-flex align-items-start icon_responsive_wrapper mt-2">
			<div class="verification-text">
				<p class="mb-3">{{ t('loginSignUp.signupMsg1') }}</p>
				<p>{{ t('loginSignUp.signupMsg2') }}</p>
			</div>
			<div class="next_icon_wrapper mobile_next_icon ml-2">
				<button type="button" @click="submitForm" :disabled="isSubmitting">
					<img src="../../../assets/images/next_arrow.svg" alt="" />
				</button>
			</div>
		</div>
	</div>
	<div class="next_icon_wrapper mt-1 desktop_next_icon">
		<button type="button" @click="submitForm" :disabled="isSubmitting">
			<img src="../../../assets/images/next_arrow.svg" alt="" />
		</button>
	</div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';
import { Tab } from 'bootstrap';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRoute } from 'vue-router';
import { accountTypeOptions } from '@/utils/enums.js';
import Multiselect from '@vueform/multiselect';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { decodeCredential, googleTokenLogin } from 'vue3-google-login';
import { useToast } from 'vue-toastification';
import { router } from '../../../main';
import { async } from 'q';

export default {
	name: 'EmailVerification',

	props: {
		userType: String,
		userAccType: String,
		userFlagCompany: Boolean,
		userFlagJobseeker: Boolean,
	},
	components: {
		Multiselect,
	},

	// eslint-disable-next-line no-unused-vars
	setup(props) {
		// refs
		const userType = ref(props.userType);
		const userFlags = ref(props.userFlag);
		const TermsConditions = ref(null);
		const PrivacyPolicy = ref(null);

		// Icons
		const GoogleIcon = faGoogle;
		const FacebookIcon = faFacebook;
		const isSubmitting = ref(false)
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		const route = useRoute();

		// toast
		const toast = useToast();

		// form schema validation
		const AccountSchema = yup.object({
			email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.email',
					}),
				)
				.email(t('validation.validEmail')),
			user_type: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.accountType',
					}),
				),
			terms_and_condition: yup
				.bool()
				.oneOf(
					[true],
					t('validation.requiredField', {
						field: 'fieldList.termsAndCon',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.termsAndCon',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, setValues, resetForm } = useForm({
			validationSchema: AccountSchema,
		});

		// form fields
		const emailField = reactive(useField('email', undefined, { initialValue: null }));
		const userTypeField = reactive(useField('user_type', undefined, { initialValue: null }));
		const termsAndConditionField = reactive(useField('terms_and_condition', undefined, { initialValue: false }));
		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			const currentRegistrationData = JSON.parse(localStorage.getItem('current_registration'));
			const UserAccountType = localStorage.getItem('UserAccountType');
			const token = route.params.token;

			if (token) {
				console.log('helllooooo')
			} else if(UserAccountType) {
				userTypeField.value = UserAccountType
				document.querySelector('#v-pills-signin-tab').click();
				
			}
			
			if (currentRegistrationData) {
				setValues({
					email: currentRegistrationData.email,
				});

				userType.value = currentRegistrationData.user_type;
			}
			store.dispatch('language/getLanguages').then(res => {
				TermsConditions.value = res.data.terms_service_url ?? '';
				PrivacyPolicy.value = res.data.privacy_policy_url ?? '';
			});
			
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// terms and condtion
		const termsConditions = () =>{
			document.getElementById('white_puzzle').style.display = 'none';
			// document.getElementById('first_signup').style.display = 'none';
			// document.getElementById('second_signup').style.display = 'none';
			// document.getElementById('imagHide').style.display = 'none';
			document.getElementById('terms_and_condition').style.display = 'block';
			document.getElementById('privacy_policy').style.display = 'none';
		}

		const privacyPolicy = () =>{
			document.getElementById('white_puzzle').style.display = 'none';
			// document.getElementById('first_signup').style.display = 'none';
			// document.getElementById('second_signup').style.display = 'none';
			// document.getElementById('imagHide').style.display = 'none';
			document.getElementById('privacy_policy').style.display = 'block';
			document.getElementById('terms_and_condition').style.display = 'none';
		}

		// change form step
		const changeTab = tab => {
			const triggerTab = document.querySelector(`#pills-tab #${tab}`);
			new Tab(triggerTab).show();
		};

		// submit form - change tab - step - 2
		const submitForm = handleSubmit(values => {
			isSubmitting.value = true;
			// verify email
			const reqObj = {
				...values,
				referer: route.query.referer || null,
				userJobFlag: props.userFlagJobseeker,
				userJComFlag: props.userFlagCompany,
				organization_type: values.user_type,
			};
			store.dispatch('auth/verifyEmail', reqObj).then(() => {
				isSubmitting.value = false
				localStorage.setItem('UserAccountType', values.user_type);
				// set the current registration
				localStorage.setItem('current_registration', JSON.stringify(reqObj));
				
				// store data in vuex
				store.commit('auth/SET_STATE', {
					action: 'emailVerification',
					data: values,
				});
				resetForm();
				userTypeField.value = localStorage.getItem('UserAccountType') ?? ''
			}).catch(err => {
				isSubmitting.value = false
			});
		});

		// social login google
		const callback = response => {
			if (userTypeField.value) {
				if (response.credential) {
					console.log('Call the endpoint which validates JWT credential string');
					console.log(response.credential, 'Call the endpoint which validates JWT credential string');
					const userData = decodeCredential(response.credential);
					console.log('Handle the userData', userData);
					const formData = new FormData();
					formData.append('social_type', 'google');
					formData.append('email', userData.email);
					formData.append('full_name', userData.name);
					formData.append('social_id', userData.sub);
					formData.append('profile_image', userData.picture);
					formData.append('user_type', userTypeField.value);
					store.dispatch('auth/socialLogin', formData).then(() => {
						route.push('/new-dashboard');
					});
				} else {
					console.log('Call the endpoint which validates authorization code');
				}
			} else {
				toast.error(
					t('validation.enterField', {
						field: 'placeholder.accountType',
					}),
				);
				return;
			}
		};

		const login = () => {
			if (userTypeField.value) {
				googleTokenLogin().then(response => {
					if (response.access_token) {
						const payload = {
							access_token: response.access_token,
							user_type: userTypeField.value,
							social_type: 'google',
						};
						store.dispatch('auth/callBackLogin', payload).then(res => {
							router.push('/new-dashboard');
						});
					} else {
						toast.error('Some thig want worng');
						return;
					}
				});
			} else {
				toast.error('Acount type is required.');
				return;
			}
		};

		// facebook login
		const logInWithFacebook = async () => {
			if (userTypeField.value) {
				await loadFacebookSDK(document, 'script', 'facebook-jssdk');
				await initFacebook();
				window.FB.login(
					function(response) {
						if (response.authResponse) {
							const fields = ['id', 'name', 'email', 'picture'];
							window.FB.api(`/${response.authResponse.userID}`, { fields: fields }, function(details) {
								// output the response
								if (details && !details.error) {
									/* handle the result */
									const payload = {
										sub: details.id,
										email: details.email,
										name: details.name,
										picture: details.picture.data.url ?? null,
										user_type: userTypeField.value,
										social_type: 'facebook',
									};
									store.dispatch('auth/callBackLogin', payload).then(res => {
										window.FB.logout();
										router.push('/new-dashboard');
										return;
									});
								} else {
									toast.error(details.error.message);
									window.FB.logout();
									return false;
								}
							});
							window.FB.logout();
							return false;
						} else {
							toast.error('User cancelled login or did not fully authorize.');
							return false;
						}
					},
					{ scope: 'public_profile,email,user_friends', auth_type: 'reauthenticate' },
				);
			} else {
				toast.error('Acount type is required.');
				return;
			}
		};

		const initFacebook = async () => {
			window.FB.init({
				appId: '831546891372583',
				status: true, // check login status
				cookie: true, // enable cookies to allow the server to access the session
				xfbml: true, // parse XFBML,
				version: 'v14.0', // or v2.6, v2.5, v2.4, v2.3
			});
		};
		const loadFacebookSDK = (d, s, id) => {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(
			() => props.userType,
			() => {
				userType.value = props.userType;
			},
		);

		watch(
			() => props.userAccType,
			() => {
				userTypeField.value = props.userAccType;
			},
		);

		return {
			login,
			t,
			store,
			emailField,
			userTypeField,
			termsAndConditionField,
			accountTypeOptions,
			TermsConditions,
			PrivacyPolicy,
			isSubmitting,
			resetForm,
			formMeta,
			changeTab,
			submitForm,
			callback,
			logInWithFacebook,
			loadFacebookSDK,
			initFacebook,
			termsConditions,
			privacyPolicy,

			//Icons
			GoogleIcon,
			FacebookIcon,
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
	@media (max-width: 575px) {
		height: 100%;
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
			padding: 1.6rem 0.44rem 0.8rem 0.8rem;
			border-top-left-radius: 1.5rem;
			border-bottom-left-radius: 1.5rem;
			background-color: #000;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-right: 19px;
			@media (max-width: 1280px) {
				margin-right: 5px;
				margin-right: 13px;
			}
			@media (max-width: 1200px) {
				margin-right: 5px;
			}
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
				position: relative;
				z-index: 3;
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
				z-index: 2;
				position: relative;
				background-color: #fff;
				width: 650px;
				transform: scale(1.08);
				padding: 35px;
				height: 100%;
				box-shadow: 12px 0px 24px 0px #0000003d;
				border-radius: 1.5rem;
				@media (max-width: 1280px) {
					width: 500px;
				}
				@media (max-width: 1200px) {
					width: 485px;
					transform: scale(1.05);
				}
				@media (max-width: 1024px) {
					padding: 0;
					width: 100%;
					height: auto;
					border-radius: 0.8rem;
					box-shadow: 00px 15px 20px 0px #0000003d;
					// z-index: 3;
					transform: none;
				}
				&::after {
					content: '';
					width: 40px;
					height: 40px;
					border-radius: 50px;
					background-color: #fff;
					position: absolute;
					bottom: -30px;
					left: 50%;
					transform: translateX(-50%);
					@media (max-width: 1024px) {
						display: none;
					}
				}
				&::before {
					content: '';
					width: 40px;
					height: 40px;
					border-radius: 50px;
					background-color: #fff;
					position: absolute;
					top: -30px;
					left: 50%;
					transform: translateX(-50%);
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
					@media (max-width: 575px) {
						font-size: 1.4rem;
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
					@media (max-width: 575px) {
						max-width: 235px;
					}
					@media (max-width: 400px) {
						max-width: 200px;
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
			margin-left: 12px;
			box-shadow: 2px 0px 24px 0px #00000057;
			min-width: 410px;
			max-width: 410px;
			overflow: auto;
			position: relative;
			@media (max-width: 1280px) {
				padding: 1.3rem 1.5rem 1.3rem 1.5rem;
				margin-left: 8px;
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
				padding: 1.5rem 2rem;
				overflow: auto;
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
					.social_icons_wrapper {
						.social_icon {
							padding: 0.6rem 0.5rem;
							box-shadow: 0px 0px 3px 1px rgba(237, 234, 234, 0.62);
							background-color: #fff;
							.icons {
								height: 20px;
								width: 20px;
								color: red;
							}
							p {
								font-size: 14px;
								color: red;
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
							font-size: 14px;
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
						padding-bottom: 1rem;
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