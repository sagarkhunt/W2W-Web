<template>
	<!-- --header start-- -->
	<header class="header w-100" id="header">
		<!-- navbar -->
		<nav class="navbar navbar-expand-lg">
			<div class="container">
				<div class="d-sm-flex align-items-center d-block">
					<!-- navbar logo -->
					<div class="navbar-brand mr-xl-4 mr-lg-2 mr-md-4 mr-2">
						<img src="@/assets/images/icons/logo.png" class="img-fluid" alt="" />
					</div>
					<div class="d-md-flex align-items-center desktop_text">
						<div class="d-flex align-items-center ms-2 sm-0">
							<span class="font-semibold watch-text">{{ userHeaderPanel }}</span>
						</div>
						<div class="d-flex align-items-center ml-md-3 ml-2">
							<clock />
							<p class="font-semibold ms-2 watch-text">{{ currentTimeZone }}</p>
						</div>
					</div>
				</div>
				<!-- navbar collapse -->
				<div class="header-collapse" id="navbarSupportedContent">
					<!-- header - right -->
					<div class="header-right">
						<div class="d-flex align-items-center header__right__btns">
							<div v-if="userTypeInfo == 'jobseeker'">
								<label for="switch" class="switch d-flex align-items-center m-0"
									>{{ t('headerField.seek_for_gigs') }}

									<input type="checkbox" v-model="selected" @change="check($event)" class="checkbox" id="switch" />

									<p>
										<span class="on"></span>
										<span class="off"></span>
									</p>
								</label>
							</div>

							<div class="dropdown">
								<button class="dropdown-toggle d-flex align-items-center" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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

							<button class="btn-common btn-red" @click="showLogin" v-if="!isUserLogedIn">
								{{ t('loginSignUp.signIn') }}
							</button>

							<!-- dashboard btn -->
							<div v-if="userTypeInfo == 'jobseeker'">
								<router-link to="/new-dashboard" class="header-right-dash" v-if="isUserLogedIn">
									<div class="hrd-box">
										<FontAwesomeIcon :icon="dashboardIcon" />
									</div>
									<span>{{ t('sidebar.dashboard') }}</span>
								</router-link>
							</div>
							<div v-else>
								<router-link to="/new-dashboard" class="header-right-dash" v-if="isUserLogedIn">
									<div class="hrd-box">
										<FontAwesomeIcon :icon="dashboardIcon" />
									</div>
									<span>{{ t('sidebar.dashboard') }}</span>
								</router-link>
							</div>

							<button class="btn-common btn-black whitespace-nowrap" v-if="isUserLogedIn" @click="userLogout">
								{{ t('common.logout') }}
								<span class="ml-2">
									<FontAwesomeIcon :icon="userIcon" />
								</span>
							</button>
						</div>
					</div>
				</div>

				<div class="d-flex align-items-center">
					<div class="user-wrapper d-flex align-items-center">
						<div class="dropdown language-dropdown me-1">
							<button class="dropdown-toggle d-flex align-items-center" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
						<div class="dropdown user-menu">
							<button id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<div class="ms-2 user-btn">
									<FontAwesomeIcon :icon="userIcon" />
								</div>
							</button>
							<ul class="dropdown-menu" aria-labelledby="userDropdown">
								<li class="d-flex" v-if="isUserLogedIn" @click="userLogout">
									<div class="me-2">
										<FontAwesomeIcon :icon="logoutIcon" />
									</div>
									<div>{{ t('common.logout') }}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<div class="small_header">
			<div class="d-flex align-items-center justify-content-between">
				<div>
					<span class="font-semibold ms-sm-2 watch-text">{{ userHeaderPanel }}</span>
					<div class="d-flex align-items-center ms-sm-2 sm-0 ml-sm-3">
						<div class="lh-0">
							<FontAwesomeIcon :icon="clock" class="clock-icon" />
						</div>
						<p class="font-semibold ms-2 watch-text">{{ currentTimeZone }}</p>
					</div>
				</div>

				<div class="dropdown language-dropdown">
					<p class="font-semibold fn13" data-v-31ea4e03="">{{t('fieldList.language')}}</p>
					<button class="dropdown-toggle fn14 d-flex align-items-center ml-auto" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
			</div>
		</div>
	</header>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { loadMessagesJson } from '@/helpers/I18n.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faUserPlus, faMinusSquare, faSearch, faSignOutAlt, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '@/components/sweetalert'; // sweetalert2
import Clock from '@/layouts/homeLayout/components/clock/Clock.vue';
import moment from 'moment';

export default {
	name: 'TopNavbar',

	// components
	components: {
		FontAwesomeIcon,
		Clock,
	},
	created() {
		setInterval(this.getInfoTimeDate, 1000);
	},

	// composition api
	setup() {
		const languageDropDown = ref(null); // language dropdown ref

		// icons
		const userIcon = faUser;
		const addUserIcon = faUserPlus;
		const dashboardIcon = faMinusSquare;
		const searchIcon = faSearch;
		const logoutIcon = faSignOutAlt;
		const currentTimeZone = ref(null);
		const exclamationTriangle = faExclamationTriangle;

		const clock = faClock;

		// global router
		const router = useRouter();

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { locale, setLocaleMessage, availableLocales, t } = useI18n({
			useScope: 'global',
		}); //  use i18n

		// sweetalert
		const Swal = useSwal();

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);
		const userHeaderPanel = computed(() => store.state.auth?.userHeaderPanel);

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			window.addEventListener('scroll', () => {
				if (window.pageYOffset >= 100) {
					document.querySelector('#header').classList.add('fixed');
				} else {
					document.querySelector('#header').classList.remove('fixed');
				}
			});

			// fetch languages
			store.dispatch('language/getLanguages');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// get current local language
		const localLang = computed(() => store.state.language.localLang); // local languages

		// get language list
		const languageList = computed(() => store.state.language.languages);

		// user is looged in ?
		const isUserLogedIn = computed(() => store.state.auth.userLogged);

		// show login form
		const showLoginForm = computed({
			get() {
				return store.state.auth.isLoginModelOpen;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'isLoginModelOpen',
					data: val,
				});
			},
		});

		// show forgot password form
		const showForgotPasswordForm = computed({
			get() {
				return store.state.auth.isForgotPasswordModelOpen;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'isForgotPasswordModelOpen',
					data: val,
				});
			},
		});

		const showJobSeekerForm = computed({
			get() {
				return store.state.auth.isJobSeekerModelOpen;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'isJobSeekerModelOpen',
					data: val,
				});
			},
		});
		// toggle login modal
		const selected = computed({
			get() {
				return store.state.auth.seekForGig;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'seekForGig',
					data: val,
				});
			},
		});

		const getTimeInfo = () => {
			return currentTimeZone.value;
		};

		/**
		 * Methods
		 * *******************************************************************
		 */

		// show register
		const showRegister = async () => {
			router.push({ name: 'registration-page' });
		};

		// show login
		const showLogin = async () => {
			router.push({ name: 'signin-page' });
		};

		// toggle dropdown
		const toggleLanguageDropdown = async () => {
			languageDropDown.value.classList.toggle('hidden');
		};

		const check = event => {
			updateStatusForSeeker(event.target.checked);
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

		// user logout
		const userLogout = () => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.duplicateMsg',{
					field:'conformationMessage.resume'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Logout',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('auth/logout');
					Swal.fire('Logout!', 'Your account is logged out.', 'success').then(() => {
						localStorage.removeItem('workDetails');
						localStorage.removeItem('invoiceWorkDetails');
						const userAccType = localStorage.getItem('UserAccountType');
						localStorage.clear();
						localStorage.setItem('UserAccountType', userAccType);
						window.location.href = '/authlogin';
					});
				}
			});
		};

		// update seeker status
		const updateStatusForSeeker = async val => {
			const payload = {
				job_alert: val,
			};
			store.commit('auth/SET_STATE', {
				action: 'seekForGig',
				data: val,
			});

			store.dispatch('language/updateSeekerStatus', payload); // update local value in localhost
		};

		const expandSideMenu = () => {
			if (window.innerWidth < 1025) {
				let isMobileVersion = document.getElementsByClassName('hide-nav');
				if (isMobileVersion.length > 0) {
					document.getElementById('i_am_sidebar').classList.remove('hide-nav');
					document.getElementById('i_am_sidebar').classList.remove('dash-nav-responsive');
					document.querySelector('.sidebar-overlay').style.display = 'block';
				} else {
					document.getElementById('i_am_sidebar').classList.add('hide-nav');
					document.getElementById('i_am_sidebar').classList.add('dash-nav-responsive');
					document.querySelector('.sidebar-overlay').style.display = 'none';
				}
			}
		};
		const getInfoTimeDate = () => {
			currentTimeZone.value = moment().format('DD.MM.YYYY HH:mm:s');
		};

		return {
			updateStatusForSeeker,
			selected,
			userIcon,
			addUserIcon,
			logoutIcon,
			clock,
			dashboardIcon,
			exclamationTriangle,
			searchIcon,
			currentTimeZone,
			t,
			languageDropDown,
			toggleLanguageDropdown,
			localLang,
			languageList,
			updateLocaleLanguage,
			isUserLogedIn,
			showRegister,
			showForgotPasswordForm,
			showJobSeekerForm,
			showLoginForm,
			userLogout,
			userTypeInfo,
			userHeaderPanel,
			showLogin,
			check,
			expandSideMenu,
			getTimeInfo,
			getInfoTimeDate,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

// header
.header {
	padding: 10px 0px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	background-color: #fff;
	transition: $transition;

	@media (max-width: 576px) {
		padding: 0;
	}

	&.fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
		transition: $transition;
	}

	.navbar {
		background-color: transparent;

		.user-wrapper {
			display: none !important;

			@media (max-width: 992px) {
				display: flex !important;
			}
			.language-dropdown {
				.dropdown-menu {
					@media (max-width: 992px) {
						right: -50px !important;
						min-width: 8rem;
						left: auto;
					}
					@media (max-width: 575px) {
						right: 0 !important;
						min-width: 7rem;
						left: auto;
					}
				}
				@media (max-width: 575px) {
					display: none;
				}
			}
			.user-btn {
				width: 40px;
				height: 40px;
				overflow: hidden;
				position: relative;
				display: block;
				border-radius: 100%;
				margin-right: 0px;
				color: #fff;
				background-color: $coloRed;
				display: flex;
				align-items: center;
				justify-content: center;

				@media (max-width: 575px) {
					width: 35px;
					height: 35px;
					svg {
						width: 0.775em;
					}
				}
			}
			.user-menu {
				.dropdown-menu {
					@media (max-width: 992px) {
						right: 0 !important;
						min-width: 8rem;
						left: auto;
					}
					@media (max-width: 575px) {
						min-width: 7rem;
					}
				}
			}
		}

		.header-collapse {
			margin-left: auto;
		}

		.navbar-toggler {
			color: black;

			svg {
				width: 25px;
				height: 25px;
			}

			&:focus {
				box-shadow: none;
			}

			&.bar-button {
				display: none;

				@media (max-width: 1024px) {
					display: block;
				}
			}
		}

		.navbar-brand {
			font-weight: 600;
			margin-right: 40px;

			img {
				width: 150px;
				height: auto;
				object-fit: contain;
			}
		}

		.navbar-nav {
			.nav-item {
				padding: 5px 10px;

				.nav-link {
					color: $colorGray;
					font-weight: 600;
					font-size: 13px;

					&:hover {
						color: $coloRed;
					}
				}
			}
		}
	}

	.header-right {
		.header-right-search {
			position: relative;
			margin-right: 10px;

			.form-control {
				position: relative;
				border: transparent;
				border-radius: 30px;
				padding: 12px 15px;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
				height: unset;
			}

			.search-icon {
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translate(-50%, -50%);

				svg {
					color: $colorGray;
				}
			}
		}

		.header-right-profile {
			display: block;

			.hrp-box {
				width: 50px;
				height: 50px;
				overflow: hidden;
				position: relative;
				display: block;
				border-radius: 100%;
				margin-right: 10px;
			}

			span {
				color: $colorGray;
				font-weight: 600;
				display: none;
			}
		}

		.header-right-dash {
			display: block;

			.hrd-box {
				width: 50px;
				height: 50px;
				text-align: center;
				overflow: hidden;
				position: relative;
				display: block;
				border-radius: 100%;
				margin-right: 10px;
				margin-left: 10px;
				background-color: $coloRed;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				@media (max-width: 1024px) {
					height: 40px;
					width: 40px;
				}

				svg {
					color: #fff;
					font-size: 20px;
					@media (max-width: 1024px) {
						font-size: 17px;
					}
				}
			}

			.report_box {
				width: 42px;
				height: 42px;
				text-align: center;
				margin: 0 10px;
				@media (max-width: 1024px) {
					height: 35px;
					width: 35px;
				}
			}

			span {
				color: $colorGray;
				font-weight: 600;
				display: none;
			}
		}
	}

	.dropdown {
		margin: 0px 20px;

		.dropdown-toggle {
			text-transform: uppercase;
			color: $colorGray;
			font-weight: 600;
		}
	}

	.btn-bordered {
		span {
			display: inline-block;
			margin-right: 10px;
		}
	}

	.btn-red {
		span {
			display: inline-block;
			margin-left: 10px;
		}
	}
}

[lang='es'] {
	@media (max-width: 1240px) {
		.header .navbar .navbar-nav .nav-item .nav-link {
			font-size: 12px;
		}

		.btn-common {
			padding: 8px 10px;
			font-size: 14px;
		}

		.header .navbar .navbar-brand img {
			width: 120px;
		}

		.header .dropdown .dropdown-toggle {
			font-size: 14px;
		}

		.header .btn-bordered span {
			margin-right: 4px;
		}
	}
}

@media (max-width: 1200px) {
	.header {
		.navbar {
			.navbar-brand {
				margin-right: 10px;
			}

			.navbar-nav {
				.nav-item {
					padding: 0px;
				}
			}
		}

		.header-right {
			.signup__btn {
				margin-right: 10px;
			}
		}

		.dropdown {
			margin: 0px 00px 0px 0px;
		}
	}
}

@media (max-width: 1024px) {
	.navbar {
		.container {
			max-width: 100%;
			gap: 8px;
		}
	}
}

@media (max-width: 992px) {
	.header {
		.navbar {
			.navbar-nav {
				.nav-item {
					padding: 0px;
					margin: 0 !important;
				}
			}

			.header__right__btns {
				display: none !important;

				.btn-bordered {
					border: none;
					padding: 8px 0px;
					color: $colorGray;
					font-weight: 600;

					span {
						margin: 0;
						display: none;
					}
				}

				.dropdown {
					margin: 0px;
					padding: 8px 0px;
				}

				.btn-common {
					padding: 8px 0px;
					background-color: transparent;
					color: $colorGray !important;
					font-weight: 600;
				}

				.btn-red {
					padding: 8px 0px;
					background-color: transparent;
					color: $colorGray !important;
					font-weight: 600;

					&:hover {
						border: transparent !important;
					}

					span {
						margin: 0;
						display: none;
					}
				}
			}
		}

		.header-right {
			.header-right-search {
				width: 60%;
				padding: 8px 0px;

				.form-control {
					border: 1px solid $colorExLightGray;
				}
			}

			.header-right-profile {
				padding: 8px 0px;

				.hrp-box {
					display: none;
				}

				span {
					display: block;
				}
			}

			.header-right-dash {
				padding: 8px 0px;

				.hrd-box {
					display: none;
				}

				span {
					display: block;
				}
			}
		}
	}
}

@media (max-width: 575px) {
	.header {
		.navbar {
			padding: 1rem;
			.navbar-nav {
				.nav-item {
					.nav-link {
						font-size: 14px;
					}
				}
			}

			.header__right__btns {
				.btn-bordered,
				.btn-red {
					font-size: 14px;
				}

				.dropdown {
					.dropdown-toggle {
						font-size: 14px;
					}
				}
			}

			.desktop_text {
				display: none;
			}
		}

		.header-right {
			.header-right-search {
				width: 100%;

				.form-control {
					padding: 10px 15px;
					font-size: 14px;
				}
			}

			.header-right-profile {
				span {
					font-size: 14px;
				}
			}

			.header-right-dash {
				span {
					font-size: 14px;
				}
			}
		}
	}
}

.small_header {
	display: none;
	padding: 1rem;
	background-color: #f5f5f5;
	@media (max-width: 575px) {
		display: block;
	}
}

.switch {
	display: inline-block;
	position: relative;
	white-space: nowrap;
}

.switch input {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
}

.switch p {
	width: 40px;
	display: block;
	height: 17px;
	display: flex;
	position: relative;
	border-radius: 20px;
	border: 2px solid #000;
	margin: 0 20px;
}

.switch p::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	width: 22px;
	border-radius: 100%;
	height: 22px;
	transform: translate(-7px, -50%);
	background-color: #000;
	transition: all 0.5s;
	box-shadow: 1px 15px 9px #e6d9d9;
}

.switch input:checked + p::after {
	background-color: #ff4b57;
	transform: translate(21px, -50%);
}

.switch p span {
	color: #fff;
	width: 50px;
	min-width: 50px;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	padding: 0 6px;
	display: flex;
	align-items: center;
	font-weight: 500;
	transition: all 0.5s;
}

.font-semibold {
	font-weight: 600;
}

.watch-text {
	font-size: 16px;

	@media (max-width: 1024px) {
		font-size: 14px;
	}

	@media (max-width: 575px) {
		font-size: 13px;
	}
}
</style>
