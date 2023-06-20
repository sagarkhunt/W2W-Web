<template>
	<div class="sign_in_up d-flex flex-column align-items-center justify-content-center">
		<div class="w2w_logo-wrapper align-items-center justify-content-center">
			<img src="../../assets/images/dark-logo.svg" alt="w2w_logo" class="" />
		</div>
		<div class="sign_wrapper align-items-center justify-content-center">
			<div class="sign-dark">
				<div class="sign_w2w_logo">
					<img src="../../assets/images/icon_png.png" alt="" class="img-fluid" />
				</div>
				<div class="tab_drop_wrapper">
					<div class="dropdown sign_language_dropdown">
						<button class="dropdown-toggle d-flex align-items-center" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<div class="language-earth_img mr-2">
								<img src="../../assets/images/language-earth.svg" alt="language-earth_img" class="h-100 w-100" />
							</div>
							{{ localLang }}
						</button>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li v-for="language in languageList" :key="language.language_code">
								<div class="d-flex">
									<div class="flag-img-wrap" v-if="language.file_path">
										<img :src="language.file_path" alt="" class="w-100 h-100" />
									</div>
									<button class="dropdown-item" @click="updateLocaleLanguage" :value="language.language_code">
										{{ language.language_name }}
									</button>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav nav-pills" id="sign-tab" role="tablist" aria-orientation="vertical">
						<button class="nav-link active signup_tab" id="v-pills-signup-tab" data-bs-toggle="pill" data-bs-target="#v-pills-signup" type="button" @click="signInContent('SignUp')">
							<svg xmlns="http://www.w3.org/2000/svg" class="sign_icons" viewBox="0 0 24 24">
								<path
									d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
									stroke-width="0"
								/>
							</svg>
							<p class="bold mt-2">{{ t('loginSignUp.signUp') }}</p>
						</button>
						<button class="nav-link signin_tab" id="v-pills-signin-tab" data-bs-toggle="pill" data-bs-target="#v-pills-signin" type="button" @click="signInContent('SignIn')">
							<svg xmlns="http://www.w3.org/2000/svg" class="sign_icons" viewBox="0 0 19.053 19.053">
								<g id="Group_90344" data-name="Group 90344" transform="translate(-39 -39)">
									<path
										id="Path_8103"
										data-name="Path 8103"
										d="M174.011,86l4.068,4.07-4.068,4.07"
										transform="translate(-121.026 -41.543)"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
									/>
									<line
										id="Line_107"
										data-name="Line 107"
										x2="10.849"
										transform="translate(46.201 48.527)"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
									/>
									<path
										id="Path_8104"
										data-name="Path 8104"
										d="M46.2,57.053H40.775A.775.775,0,0,1,40,56.278v-15.5A.775.775,0,0,1,40.775,40H46.2"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
									/>
								</g>
							</svg>

							<p class="bold mt-2">{{ t('loginSignUp.signIn') }}</p>
						</button>
					</div>
				</div>
			</div>

			<div class="white_puzzle" id="white_puzzle">
				<div class="white_content" >
					<div class="entering-text-wapper" id="first_signup">
						<h1 class="bold mb-2">{{ t('loginSignUp.signUpMessage1') }}!</h1>
						<p class="bold fn18">{{ t('loginSignUp.signUpMessage2') }}.</p>
					</div>
					<div class="entering-text-wapper" id="second_signup">
						<h1 class="bold mb-2">{{ t('loginSignUp.almostDone') }}!</h1>
						<p class="bold fn18">{{ t('loginSignUp.verifyMessage') }}.</p>
					</div>
					<div class="entering-text-wapper" id="signin_content">
						<h1 class="bold mb-2">{{ t('loginSignUp.signInMessage') }}!</h1>
						<p class="bold fn18">{{ t('loginSignUp.signInMessage1') }}.</p>
					</div>

					<div class="journey_img" id="imagHide">
						<img src="../../assets/images/sign-journey.png" alt="" class="h-100 w-100" />
					</div>
					<!-- <div class="iframe_render_wrapper">
						<iframe name="my_iframe" src="https://paperpoint-client.aeonarc.in/privacy"></iframe>
					</div> -->
				</div>
			</div>
			<div class="white_puzzle" id="terms_and_condition">
				<div class="white_content">	
					<div class="entering-text-wapper" id="signin_content">
						<h1 class="bold mb-2">{{t('loginSignUp.TermsConditions')}}</h1>
						<p class="fn16">{{t('loginSignUp.termsConditionsText')}}</p>
					</div>			
					<div class="iframe_render_wrapper">
						<iframe name="my_iframe" :src="TermsConditions"></iframe>
					</div>
				</div>
			</div>
			<div class="white_puzzle" id="privacy_policy">
				<div class="white_content">	
					<div class="entering-text-wapper" id="signin_content">
						<h1 class="bold mb-2">{{t('loginSignUp.PrivacyPolicy')}}</h1>
						<p class="fn16">{{t('loginSignUp.privacyPolicyText')}}</p>
					</div>			
					<div class="iframe_render_wrapper">
						<iframe name="my_iframe" :src="PrivacyPolicy"></iframe>
					</div>
				</div>
			</div>
			<div class="sign-red">
				<div class="tab-content text-white" id="sign-tabContent">
					<div class="tab-pane fade show active" id="v-pills-signup" role="tabpanel">
						<h2 class="bold mb-2">{{ t('loginSignUp.signUp') }}</h2>
						<div class="singup_first show active" id="pills-emailVerification" role="tabpanel">
							<EmailVerification :userAccType="userAccType" />
						</div>
						<div class="singup_second" id="pills-mobileVerification" role="tabpanel">
							<MobileVerification />
						</div>
					</div>

					<div class="tab-pane fade" id="v-pills-signin" role="tabpanel">
						<div class="singup_second">
							<LoginComponent ref="loginComponent" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- MobileSplash -->
	<MobileSplash />
</template>

<script>
import { ref, onMounted, computed, reactive, defineAsyncComponent } from 'vue';
import MobileSplash from '@/layouts/homeLayout/components/MobileSplash.vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { Tab } from 'bootstrap';
import { useRoute } from 'vue-router';
import { faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useField, useForm } from 'vee-validate';
import { router } from '../../main';
import * as yup from 'yup';
import EmailVerification from '@/views/authentication/components/EmailVerification.vue';
import MobileVerification from '@/views/authentication/components/MobileVerification';
import LoginComponent from '@/views/authentication/components/LoginComponent.vue';
import { loadMessagesJson } from '@/helpers/I18n.js';

export default {
	name: 'SignIn',

	// components
	components: {
		EmailVerification,
		MobileVerification,
		LoginComponent,
		MobileSplash,
	},

	setup() {
		// user type status
		const userType = ref(null);
		const userStatus = ref(false);
		const jobSeekerPuzzle = ref(false);
		const companyPuzzle = ref(false);
		const userFlag = ref(false);
		const userFlagJobseeker = ref(false);
		const userFlagCompany = ref(false);
		const currentRegistrationData = ref(null);
		const loginComponent = ref(null);
		const userAccType = ref(null);
		const TermsConditions = ref(null);
		const PrivacyPolicy = ref(null);

		// icon
		const backIcon = faArrowCircleLeft;
		const leftArrowIcon = faArrowLeft;

		// i18n instance
		const { locale, setLocaleMessage, availableLocales, t } = useI18n({
			useScope: 'global',
		});

		// data file
		const filedt = ref(null);

		// global store
		const store = useStore(); // use state

		// language dropdown ref
		const languageDropDown = ref(null);

		// global router
		const route = useRoute();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */

		onMounted(() => {
			const token = route.params.token;
			if (route.query.resetPassword) {
				const payload = {
					resetPassword: route.query.resetPassword,
				};
				store.dispatch('auth/checkResetPassToken', payload).then(res => {
					if (res.data.tokenVerified) {
						return toggleConfirmPass();
					} else {
						router.push({ name: 'auth-login-page' });
					}
				});
			}
			if (token) {
				let payload = {
					token: token,
				};
				store
					.dispatch('auth/verifyEmailToken', payload)
					.then(() => {
						store.commit('auth/SET_STATE', {
							action: 'isRegisterModelOpen',
							data: true,
						});
					})
					.catch(err => {
						document.getElementById('pills-emailVerification').style.display = 'block';
						document.getElementById('pills-mobileVerification').style.display = 'none';
					});
				document.getElementById('pills-mobileVerification').style.display = 'block';
				document.getElementById('pills-emailVerification').style.display = 'none';
				document.getElementById('first_signup').style.display = 'none';
				document.getElementById('second_signup').style.display = 'block';
				document.getElementById('signin_content').style.display = 'none';
				document.getElementById('terms_and_condition').style.display = 'none';
				document.getElementById('privacy_policy').style.display = 'none';
				document.getElementById('white_puzzle').style.display = 'block';
			} else {
				document.getElementById('pills-mobileVerification').style.display = 'none';
				document.getElementById('pills-emailVerification').style.display = 'block';
				document.getElementById('first_signup').style.display = 'block';
				document.getElementById('terms_and_condition').style.display = 'none';
				document.getElementById('privacy_policy').style.display = 'none';
				document.getElementById('second_signup').style.display = 'none';
				document.getElementById('signin_content').style.display = 'none';
				document.getElementById('white_puzzle').style.display = 'block';
			}
			// check referer
			if (route.query.referer) {
				document.querySelector('#v-pills-signup-tab').click();
			}
			store.dispatch('language/getLanguages').then(res => {
				TermsConditions.value = res.data.terms_service_url ?? '';
				PrivacyPolicy.value = res.data.privacy_policy_url ?? '';
			});
			// Auto login check condition
			const accToken = route.query.accToken;
			if (accToken) {
				store.commit('auth/SET_BEARER_TOKEN', accToken);
				localStorage.setItem('accessToken', accToken);
				store.dispatch('auth/verifyToken').then(data => {
					if (data.data.data.user_type == 'jobseeker') {
						if (route.query.workDetailsPage === 'true') {
							router.push({ name: 'Worked Details' });
							return;
						}
						router.push({ name: 'Dashboard' });
					} else {
						router.push({ name: 'Company Profile' });
					}
				});
			}
		});

		/**
		 * Computed Props
		 * *******************************************************************
		 */

		// get current local language
		const localLang = computed(() => store.state.language.localLang); // local languages

		// get language list
		const languageList = computed(() => store.state.language.languages);
		const userTypeInfo = computed(() => store.state.auth.userType);
		// user is looged in ?
		const isUserLogedIn = computed(() => store.state.auth.userLogged);

		const isEmpUserLogedIn = computed(() => store.state.auth.empLogged);

		// toggle login modal
		const modalShow = computed({
			get() {
				return store.state.auth.isRegisterModelOpen;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'isRegisterModelOpen',
					data: val,
				});
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// data file change
		const atfileChange = file => {
			filedt.value = file;
		};

		// toggle dropdown
		const toggleLanguageDropdown = async () => {
			languageDropDown.value.classList.toggle('hidden');
		};

		//user type
		const userTypeName = val => {
			userType.value = val ?? null;

			if (userType.value === 'jobseeker') {
				jobSeekerPuzzle.value = true;
				companyPuzzle.value = false;
				userFlagJobseeker.value = true;
				userFlagCompany.value = false;
			} else {
				jobSeekerPuzzle.value = false;
				companyPuzzle.value = true;
				userFlagCompany.value = true;
				userFlagJobseeker.value = false;
			}
		};

		// show email for otp
		const showEmail = async () => {
			localStorage.setItem('changePassUserTyep', 'jobseeker');
			router.push({ name: 'email-otp-page' });
		};

		// update local language
		const updateLocaleLanguage = async e => {
			const messageJson = await loadMessagesJson(e.target.value); // load locale message json
			const htmlBody = document.getElementsByTagName('html');
			htmlBody[0].setAttribute('lang', e.target.value);
			locale.value = e.target.value; // change locale!

			if (!availableLocales.includes(e.target.value)) {
				setLocaleMessage(e.target.value, messageJson); // set loaded json in locale
			}

			store.dispatch('language/updateLocalLanguage', e.target.value); // update local value in localhost
			router.go();
		};

		//sign in
		const signInContent = value => {
			if (value == 'SignUp') {
				userAccType.value = localStorage.getItem('UserAccountType') ?? '';

				document.getElementById('first_signup').style.display = 'block';
				document.getElementById('second_signup').style.display = 'none';
				document.getElementById('signin_content').style.display = 'none';
				document.getElementById('terms_and_condition').style.display = 'none';
				document.getElementById('terms_and_condition').style.display = 'none';
				document.getElementById('privacy_policy').style.display = 'none';
				document.getElementById('white_puzzle').style.display = 'block';
				const checkToken = route.params.token;
				if (checkToken) {
					document.getElementById('second_signup').style.display = 'block';
					document.getElementById('first_signup').style.display = 'none';
					document.getElementById('pills-mobileVerification').style.display = 'block';
				} else {
					document.getElementById('pills-emailVerification').style.display = 'block';
					document.getElementById('pills-mobileVerification').style.display = 'none';
				}
			} else {
				document.getElementById('first_signup').style.display = 'none';
				document.getElementById('second_signup').style.display = 'none';
				document.getElementById('signin_content').style.display = 'block';
				document.querySelector('.signin_hide').style.display = 'block';
				document.getElementById('terms_and_condition').style.display = 'none';
				document.getElementById('privacy_policy').style.display = 'none';
				document.getElementById('white_puzzle').style.display = 'block';
				if (document.querySelector('.forgot_password_show')) {
					document.querySelector('.forgot_password_show').style.display = 'none';
				}
				if (document.querySelector('.show_content')) {
					document.querySelector('.show_content').style.display = 'none';
				}
			}
		};
		//
		const toggleConfirmPass = () => {
			document.querySelector('#v-pills-signin-tab').click();
			document.querySelector('.forgot_password_show').style.display = 'block';
			document.querySelector('.signin_hide').style.display = 'none';
			loginComponent.value.forgotSection = true;
			loginComponent.value.forgotPasswordRef.passSection = true;
		};
		return {
			loginComponent,
			userAccType,
			// icon
			leftArrowIcon,
			modalShow,
			userType,
			userStatus,
			companyPuzzle,
			jobSeekerPuzzle,
			userTypeName,
			userFlag,
			localLang,
			TermsConditions,
			PrivacyPolicy,
			userFlagCompany,
			userFlagJobseeker,
			currentRegistrationData,
			languageList,
			updateLocaleLanguage,
			toggleLanguageDropdown,
			t,
			filedt,
			atfileChange,
			backIcon,
			showEmail,
			userTypeInfo,
			isUserLogedIn,
			isEmpUserLogedIn,
			signInContent,
			toggleConfirmPass,
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
		height: 100%;
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
			.white_content {
				@media (max-width: 1024px) {
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
					max-width: 320px;
					position: absolute;
					bottom: 50px;
					right: 50px;
					@media (max-width: 1280px) {
						max-width: 260px;
					}
					@media (max-width: 1024px) {
						max-width: 100px;
						bottom: 35px;
						right: 10px;
					}
					@media (max-width: 575px) {
						right: 12px;
					}
					@media (max-width: 400px) {
						max-width: 95px;
					}
					img {
						object-fit: contain;
					}
					animation: bounce 0.7s cubic-bezier(0.5, 0.05, 1, 0.5);
					animation: bounce 0.7s;
					animation-direction: alternate;
					animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
					animation-iteration-count: infinite;
					@keyframes bounce {
						from {
							transform: translate3d(0, 0, 0);
						}
						to {
							transform: translate3d(0, 30px, 0);
						}
					}
					@media (max-width: 400px) {
						@keyframes bounce {
							from {
								transform: translate3d(0, 0, 0);
							}
							to {
								transform: translate3d(0, 15px, 0);
							}
						}
					}
				}
				.entering-text-wapper {
					margin-bottom: 1rem;
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
			border-top-right-radius: 1.5rem;
			border-bottom-right-radius: 1.5rem;
			margin-left: 12px;
			box-shadow: 2px 0px 24px 0px #00000057;
			min-width: 410px;
			max-width: 410px;
			overflow: hidden;
			position: relative;
			@media (max-width: 1280px) {
				padding: 0;
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
				padding: 1rem 2rem 0 2rem;
				overflow: auto;
				@media (max-width: 1024px) {
					padding: 0;
				}
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
						padding-bottom: 1rem;
						@media (max-width: 1024px) {
							padding-bottom: 0;
						}
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

.iframe_render_wrapper {
	iframe {
		height: 370px;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
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
