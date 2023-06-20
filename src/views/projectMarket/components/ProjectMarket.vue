<template>
	<section class="find-section">
		<div class="container">
			<div class="find">
				<div class="dropdown border-radius">
					<Multiselect
						class="form-group"
						label="industry_name"
						trackBy="industry_name"
						@input="industryField.handleChange"
						@blur="industryField.handleBlur"
						v-model="industryField.value"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.industry',
							})
						"
						:searchable="true"
						valueProp="referenceId"
						:options="industryOptions"
						mode="single"
						:canDeselect="true"
					/>
				</div>

				<div class="dropdown">
					<Multiselect
						id="city"
						class="form-group"
						@input="cityField.handleChange"
						@blur="cityField.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'placeholder.city',
							})
						"
						:searchable="true"
						valueProp="referenceId"
						trackBy="city_name"
						v-model="cityField.value"
						:options="cityOptions"
						mode="single"
						label="city_name"
						:canDeselect="true"
					/>
				</div>

				<button class="btn btn-find" @click="findGigs">{{ t('projectMarketPage.findGigs') }}</button>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="market-section">
				<!-- market-Left -->
				<!-- side bar start -->
				<div class="market-left" :class="popTransform ? 'active' : ''">
					<div class="market-left-section" v-if="projectMarketList.length !== 0">
						<div class="closeIcon" @click="popTransform = false">
							<FontAwesomeIcon :icon="closeIcon" />
						</div>
						<div v-for="(item, i) in projectMarketList" :key="i" :class="{ active: i === activeIndex }" @click="setActive(i, item.id)" class="card">
							<div class="logo-img">
								<img :src="item.company && item.company.user && item.company.user.file_path" alt="img" />
							</div>
							<div class="card-content">
								<h5 class="card-titles">
									{{ item.job_title }}
								</h5>
								<div class="location">
									<FontAwesomeIcon :icon="MapMarkerIcon" class="icon" />
									<p class="location-name">
										{{ item.cityReference && item.cityReference.city_name }}
									</p>
								</div>
								<p class="cards-text">
									{{ titleCase(item.job_description) }}
								</p>
							</div>
						</div>
					</div>
					<div class="market-left-section" v-else>
						<h6>{{ t('projectMarketPage.noJobFound') }}</h6>
					</div>
				</div>
				<!-- side bar end -->

				<!-- content section start -->
				<div class="market-right position-relative">
					<div class="market-right-section" v-if="projectDetails.length != 0">
						<div class="menu-icon" @click="popTransform = true">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.969 192.484">
								<g id="menu" transform="translate(0 -96.243)">
									<g id="Menu_1_">
										<path id="Path_87" data-name="Path 87" d="M12.03,120.3H372.939a12.03,12.03,0,0,0,0-24.06H12.03a12.03,12.03,0,1,0,0,24.06Z" fill="#ff4b57" />
										<path id="Path_88" data-name="Path 88" d="M372.939,180.455H12.03a12.03,12.03,0,1,0,0,24.06H372.939a12.03,12.03,0,1,0,0-24.06Z" fill="#ff4b57" />
										<path id="Path_89" data-name="Path 89" d="M372.939,264.667H132.333a12.03,12.03,0,1,0,0,24.06H372.939a12.03,12.03,0,0,0,0-24.06Z" fill="#ff4b57" />
									</g>
								</g>
							</svg>
						</div>

						<div class="apply-for-this-section">
							<div class="apply-for-this">
								<div class="logo-img" v-if="projectDetails.company && projectDetails.company != null">
									<img :src="projectDetails.company && projectDetails.company.user && projectDetails.company.user.file_path" alt="img" class="img-fluid icon-img" />
								</div>
								<div class="user-img" v-else>
									<img src="@/assets/images/icon_png.png" alt="img" class="img-fluid w-100 h-100 rounded-circle" />
								</div>
								<div class="card-content">
									<div class="card-text-btn">
										<div class="card-texts">
											<h2 class="card-titles">
												{{ projectDetails.job_title || '-' }}
											</h2>
											<div class="location">
												<FontAwesomeIcon :icon="MapMarkerIcon" class="icon" />
												<p class="location-name">
													{{ projectDetails.cityReference && projectDetails.cityReference.city_name }}
													({{ projectDetails.countryReference && projectDetails.countryReference.country_name }})
												</p>
											</div>
											<p class="location-time">
												{{ t('projectMarketPage.postedOn') }}
												{{ dateFormat(projectDetails.created_at) || '-' }}
												<span>&bull;</span> {{ t('projectMarketPage.fullTime') }}
											</p>
										</div>
										<button class="btn-common btn-red" @click="showLoginForm = true" v-if="!isUserLogedIn">
											{{ t('projectMarketPage.applyForThisGig') }}
										</button>
										<button class="btn-common btn-red" v-else-if="userTypeInfo == 'jobseeker' && projectDetails.apply_before < currentDate">
											{{ t('projectMarketPage.expired') }}
										</button>
										<button class="btn-common btn-red" @click="applyJobs(projectDetails.id)" v-else-if="userTypeInfo == 'jobseeker' && projectDetails.job_proposal === 0">
											{{ t('projectMarketPage.applyForThisGig') }}
										</button>
										<button
											class="btn-common btn-yellow"
											v-else-if="userTypeInfo == 'jobseeker' && projectDetails.job_proposal === 1"
											:disabled="projectDetails.apply_before < currentDate"
										>
											{{ t('projectMarketPage.waiting') }}
										</button>
										<button class="btn-common btn-green" v-else-if="projectDetails.job_proposal">
											{{ t('projectMarketPage.Applied') }}
										</button>
									</div>
								</div>
							</div>

							<div class="d-flex flex-wrap">
								<div v-for="item in projectDetails.skills" :key="item.id" class="labels">
									<div class="labels-name">
										<p>{{ item.reference.skill || '-' }}</p>
									</div>
								</div>
							</div>

							<div class="d-flex align-items-center justify-content-end mt-2">
								<div class="d-flex">
									<div class="mr-1 cursor-pointer">
										<ShareNetwork
											network="facebook"
											:url="`${frontBaseUrl}:3002/${projectDetails.id}/${projectDetails.job_slug}`"
											:title="projectDetails.job_title"
											:quote="projectDetails.job_title"
											:description="projectDetails.job_description"
											:media="projectDetails.company?.file_path"
										>
											<img src="@/assets/images/fb-icon.png" alt="err" />
										</ShareNetwork>
									</div>
								</div>
							</div>
						</div>
						<div class="cards-section">
							<div class="about-this-post-section">
								<h2 class="card-titles">
									{{ t('projectMarketPage.aboutThisGigsPost') }}
								</h2>
								<div class="cards-details">
									<div class="row">
										<div class="col-sm-6">
											<div class="text-cards">
												<p class="text-head">
													{{ t('projectMarketPage.industryOfTheGigs') }}
												</p>
												<p class="card-texts">
													{{ projectDetails.industryReference && projectDetails.industryReference.industry_name }}
												</p>
											</div>
											<div class="text-cards">
												<p class="text-head">
													{{ t('projectMarketPage.noOfVaccancies') }}
												</p>
												<p class="card-texts">
													{{ projectDetails.vacancies || '-' }}
												</p>
											</div>
											<div class="text-cards">
												<p class="text-head">{{ t('projectMarketPage.duration') }} ({{ t('fieldList.days') }}):</p>
												<p class="card-texts">
													<!-- One Month -->
													{{ projectDetails.job_duration || '-' }}
												</p>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="text-cards">
												<p class="text-head">
													{{ t('projectMarketPage.applyBefore') }}
												</p>
												<p class="card-texts">
													{{ dateFormat(projectDetails.apply_before || '-') }}
												</p>
											</div>
											<div class="text-cards">
												<p class="text-head">
													{{ t('projectMarketPage.contractType') }}
												</p>
												<p class="card-texts">
													{{ projectDetails.salary_offer || '-' }}
												</p>
											</div>
											<div class="text-cards">
												<p class="text-head">
													{{ t('projectMarketPage.address') }}
												</p>
												<p class="card-texts">
													{{ projectDetails.address || '-' }}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="cards-section">
							<div class="description-section">
								<h2 class="card-titles">{{ t('projectMarketPage.description') }}:</h2>
								<div class="cards-details">
									<p class="cards-text">
										{{ titleCaseDesc(projectDetails.job_description) || '-' }}
									</p>
								</div>
							</div>
						</div>
						<div class="cards-section">
							<div class="the-company-section">
								<h2 class="card-titles">{{ t('projectMarketPage.aboutTheCompany') }}:</h2>
								<div class="cards-details">
									<div class="user-img" v-if="projectDetails.company && projectDetails.company != null">
										<img
											:src="projectDetails.company && projectDetails.company.user && projectDetails.company.user.file_path"
											alt="img"
											class="img-fluid w-100 h-100 rounded-circle"
										/>
									</div>
									<div class="user-img" v-else>
										<img src="@/assets/images/icon_png.png" alt="img" class="img-fluid w-100 h-100 rounded-circle" />
									</div>
									<div>
										<p class="cards-text fw-bold mb-sm-1">
											{{ projectDetails.company && projectDetails.company.company_name }}
										</p>

										<div class="location d-flex align-items-center mb-sm-1">
											<FontAwesomeIcon :icon="MapMarkerIcon" class="icon me-2" />
											<p class="location-name">
												{{
													projectDetails.company &&
														projectDetails.company.user &&
														projectDetails.company.user.cityReference &&
														projectDetails.company.user.cityReference.city_name
												}}
												({{
													projectDetails.company &&
														projectDetails.company.user &&
														projectDetails.company.user.countryReference &&
														projectDetails.company.user.countryReference.country_name
												}})
											</p>
										</div>
										<p>
											{{ (projectDetails.company && projectDetails.company.description) || '-' }}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="cards-section">
							<GMapMap
								:center="{
									lat: projectDetails.lat,
									lng: projectDetails.lng,
								}"
								:zoom="10"
								map-type-id="terrain"
								style="width: 70vw; height: 400px"
								class="img-fluid w-100 h-400"
							>
								<GMapMarker
									:position="{
										lat: projectDetails.lat,
										lng: projectDetails.lng,
									}"
									:clickable="true"
									:draggable="true"
								/>
							</GMapMap>
						</div>
					</div>
					<div class="market-right-section" v-else>
						<h6 style="text-align: center">
							{{ t('projectMarketPage.noDetailsFound') }}
						</h6>
					</div>
					<!-- login form -->
					<div class="container-model">
						<Suspense v-if="showLoginForm">
							<template #default>
								<login-page />
							</template>
							<template #fallback>
								<default-loader />
							</template>
						</Suspense>
					</div>
				</div>
				<!-- content section end -->
			</div>
		</div>
	</section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ref, computed, onMounted, reactive, defineAsyncComponent, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import { useField } from 'vee-validate';
import { dateFormat } from '@/utils/mixins';
import { useRoute } from 'vue-router';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import moment from 'moment';

const LoginPage = defineAsyncComponent(async () => {
	return import('@/views/projectMarket/components/LoginPage.vue' /* webpackChunkName:"LoginForm" */);
});

export default {
	name: 'Project Market',

	components: {
		FontAwesomeIcon,
		Multiselect,
		LoginPage,
		DefaultLoader,
	},

	setup() {
		// ref
		const activeIndex = ref(0);

		const MapMarkerIcon = faMapMarkerAlt;

		const closeIcon = faTimes;
		//industry
		const industryName = ref('');
		const cityName = ref('');

		const currentDate = ref(moment(new Date()).format('YYYY-MM-DD'));
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.projectMarket')} - Way2Work`;

		// global store
		const store = useStore();

		// global router
		const router = useRoute();

		const cityField = reactive(useField('cityId', undefined, { initialValue: null }));

		const popTransform = ref(false);

		const industryField = reactive(useField('industry', undefined, { initialValue: null }));

		const frontBaseUrl = process.env.VUE_APP_BASE_URL;

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			if (router.params.id && router.params.index) {
				activeIndex.value = router.params.index;
				setActive(router.params.index, router.params.id);
			} else {
				fetchProjectList();
			}
			// fetch city list
			store.dispatch('country/getProjectmarketCities');
			// fetch Industries list
			store.dispatch('industry/getIndustries');
			//project list
		});

		/**
		 * Computed
		 * *******************************************************************
		 */

		// project market list
		const projectMarketList = computed(() => store.getters['projectmarket/getProjectList']);
		// city options
		const cityOptions = computed(() => store.getters['country/getProjectMarkertCitiesOptions']);
		// get industry options
		const industryOptions = computed(() => store.getters['industry/getIndustryOptionsName']);
		// user is looged in ?
		const isUserLogedIn = computed(() => store.state.auth.userLogged);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);

		// project details
		const projectDetails = computed(() => store.getters['projectmarket/getProjectInfo']);
		// show login form
		const showLoginForm = computed({
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

		const fetchProjectList = async () => {
			const values = {
				industry: industryField.value,
				city: cityField.value,
			};
			await store.dispatch('projectmarket/getProjectList', {
				payload: values,
			});
		};
		const fetchProjectDetails = async id => {
			await store.dispatch('projectmarket/getProjectDetails', id);
		};

		const findGigs = async () => {
			fetchProjectList();
		};
		//zero index view record first
		const setActive = (index, pId) => {
			activeIndex.value = index;
			fetchProjectDetails(pId);
		};
		//Apply for this Gig job proposal
		const applyJobs = id => {
			const payload = {
				jobId: id,
			};

			store.dispatch('projectmarket/applyForJobPraposal', payload).then(() => {
				fetchProjectDetails(id);
			});
		};
		const titleCase = str => {
			return str[0].toUpperCase() + str.slice(1);
		};
		const titleCaseDesc = str => {
			if (str) {
				return str[0].toUpperCase() + str.slice(1);
			}
		};

		/**
		 * Watch
		 * *******************************************************************
		 */

		watch(projectMarketList, () => {
			if (projectMarketList.value.length !== 0) {
				const projectId = projectMarketList.value[0].id;
				fetchProjectDetails(projectId);
			} else {
				store.commit('projectmarket/SET_STATE', {
					action: 'projectDetail',
					data: [],
				});
			}
		});

		return {
			//ref
			titleCase,
			titleCaseDesc,
			activeIndex,
			dateFormat,
			currentDate,
			t,
			MapMarkerIcon,
			industryName,
			cityName,
			//reactive
			cityField,
			industryField,
			//computed
			projectMarketList,
			cityOptions,
			projectDetails,
			industryOptions,
			isUserLogedIn,
			showLoginForm,
			closeIcon,
			popTransform,
			userTypeInfo,
			frontBaseUrl,

			//methods
			findGigs,
			setActive,
			applyJobs,
			//Watch
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.dropdown {
	.multiselect-options {
		border-radius: 10px;
	}

	.multiselect-input {
		border: none;
	}

	.multiselect-option.is-selected {
		background-color: #fff;
		color: #000;
	}

	.multiselect-option.is-pointed {
		color: $coloRed;
		background-color: #fff;
	}

	.multiselect-option.is-selected.is-pointed {
		background-color: #fff;
		color: #000;
	}
}

.market-section {
	display: flex;

	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}

	.market-right {
		z-index: 1;
		margin-left: 1.5rem;
		width: 100%;

		@media (max-width: 576px) {
			margin-left: 0px;
		}
	}

	.market-left {
		max-width: 25rem;
		width: 100%;
		transition: all 250ms;
	}
}

//main
.find-section {
	padding: 0;
	background-color: #ffebec;
	background-image: url('~@/assets/images/background-img.svg');

	.find {
		z-index: 9;
		position: relative;
		display: grid;
		padding: 32px 0;
		transform: translateY(50%);
		grid-template-columns: repeat(5, minmax(0, 1fr));

		.dropdown {
			height: 100%;
			width: 100%;
			padding: 10px 20px;
			background-color: #fff;
			grid-column: span 2 / span 2;
			border: 0.5px solid #ffebec;

			.btn {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 100%;
				color: #909aa3;
				font-weight: 400;
				align-items: center;
				border-radius: 0;

				&:focus {
					box-shadow: none;
				}
			}
		}

		.dropdown-menu {
			width: 90%;
			height: 150px;
			overflow: auto;
			transform: translate(0, 55px);
		}

		.border-radius {
			border-top-left-radius: 10rem;
			border-bottom-left-radius: 10rem;
		}

		.btn-find {
			width: 100%;
			height: 100%;
			font-size: 21px;
			font-weight: 600;
			border-top-right-radius: 10rem;
			border-bottom-right-radius: 10rem;
			color: #fff;
			background-color: #465765;
			outline: none;
			border: none;

			&:focus {
				box-shadow: none;
			}
		}
	}
}

@media (max-width: 768px) {
	.find-section {
		padding-top: 85px;
		background-color: #ffebec;
		background-image: url('~@/assets/images/background-img.svg');

		.find {
			display: grid;
			padding: 22px 0;
			transform: translateY(0);
			grid-template-columns: repeat(3, minmax(0, 1fr));

			.dropdown {
				grid-column: auto;
				padding: 5px 10px;

				.btn {
					border-radius: 0;

					&:focus {
						box-shadow: none;
					}
				}
			}

			.btn-find {
				font-size: 20px;
			}
		}
	}
}

@media (max-width: 575px) {
	.find-section {
		padding-top: 160px;
	}
}

@media (max-width: 426px) {
	.find-section {
		.find {
			display: block;

			.dropdown {
				margin-bottom: 7px;
				border-radius: 50px;
			}

			.border-radius {
				border-radius: 50px;
			}

			.btn-find {
				border-radius: 50px;
			}
		}
	}
}

//Sidebar css
.market-left-section {
	.closeIcon {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.5rem;
		display: none;
	}

	.card {
		padding: 1rem;
		border-radius: 10px;
		display: flex;
		margin-bottom: 1.5rem;
		flex-direction: row;
		border: 1px solid #f8f1f1;
		box-shadow: 0 4px 60px 0 #f8f1f1;

		.logo-img {
			max-width: 50px;
			width: 100%;
			height: 50px;
			margin-right: 1rem;
			border-radius: 50%;
			background-color: #fff6f6;

			img {
				max-width: 50px;
				width: 100%;
				height: 50px;
				margin-right: 1rem;
				border-radius: 50%;
				background-color: #fff6f6;
				object-fit: cover;
			}
		}

		.card-content {
			.card-titles {
				font-weight: 700;
				margin-bottom: 0.1rem;
			}

			.location {
				display: flex;
				align-items: center;
				font-size: 14px;
				font-weight: 600;
				margin-bottom: 0.5rem;

				.icon {
					margin-right: 5px;
					color: $coloRed;
				}
			}

			.cards-text {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				max-width: 300px;
			}
		}
	}

	.active {
		background-color: $coloRed;
		position: relative;

		.card-content {
			color: #fff;

			.location {
				.icon {
					color: #fff;
				}
			}

			.cards-text {
				color: #fff;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				max-width: 300px;

				&::after {
					content: '';
					position: absolute;
					width: 25px;
					height: 25px;
					top: 50%;
					right: 0;
					clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
					transform: translate(50%, -50%);
					background-color: $coloRed;
				}
			}
		}
	}
}

.btn-yellow {
	background-color: #e4aa18;
}

@media (max-width: 1200px) {
	.market-left {
		transition: all 250ms;
		transform: translateX(-100%);
		display: none;
	}

	.market-left.active {
		transform: translateX(0);
		display: block;
	}

	.market-left-section {
		.closeIcon {
			display: flex;
		}
	}
}

@media (max-width: 470px) {
	.market-left {
		.card {
			flex-wrap: wrap;
		}
	}
}

//content css
.market-right-section {
	width: 100%;

	.menu-icon {
		width: 25px;
		margin-bottom: 0.5rem;
		display: none;
	}

	.apply-for-this-section {
		padding: 1.5rem;
		border-radius: 10px;
		margin-bottom: 1.5rem;
		background-color: #fefafa;
		border: 1px solid #f8f1f1;
		box-shadow: 0 4px 60px 0 #f8f1f1;

		.apply-for-this {
			display: flex;
			align-items: center;

			.logo-img {
				width: 100%;
				height: 85px;
				max-width: 85px;
				margin-right: 1rem;
				border-radius: 50%;
				background-color: #fff;
				box-shadow: 0 4px 80px 0 #63000730;

				img {
					max-width: 85px;
					width: 100%;
					height: 85px;
					margin-right: 1rem;
					border-radius: 50%;
					background-color: #fff6f6;
					object-fit: cover;
				}

				.icon-img {
					width: 100%;
				}
			}

			.card-content {
				width: 100%;

				.card-text-btn {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					align-items: center;

					.card-texts {
						.card-titles {
							font-weight: 700;
							letter-spacing: -1px;
							margin-bottom: 0.2rem;
							text-transform: uppercase;
						}

						.location {
							display: flex;
							align-items: center;
							margin-bottom: 0.2rem;

							.icon {
								margin-right: 5px;
								color: $coloRed;
							}

							.location-name {
								font-size: 16px;
								letter-spacing: -1px;
								font-weight: 600;
							}
						}

						.location-time {
							font-size: 16px;
							font-weight: 600;
							color: #9fa1a6;
						}
					}
				}
			}
		}

		.labels {
			display: flex;
			flex-wrap: wrap;

			.labels-name {
				margin-top: 1rem;
				padding: 0.5rem 1rem;
				font-size: 16px;
				font-weight: 600;
				border-radius: 10rem;
				margin-right: 10px;
				border: 2px solid #fed6d8;
				cursor: pointer;
			}
		}
	}

	.cards-section {
		padding: 1.5rem;
		border-radius: 10px;
		margin-bottom: 1.5rem;
		border: 1px solid #f8f1f1;
		box-shadow: 0 4px 60px 0 #f8f1f1;

		.card-titles {
			font-size: 24px;
			font-weight: 700;
			color: #cfd2d4;
			margin-bottom: 1.5rem;
			letter-spacing: -1px;
			text-transform: uppercase;
		}
	}

	.about-this-post-section {
		.cards-details {
			.text-cards {
				margin-bottom: 1rem;

				.text-head {
					font-size: 16px;
					font-weight: 500;
					color: #878d92;
				}

				.card-texts {
					font-size: 20px;
					font-weight: 600;
					color: #465765;
				}
			}
		}
	}

	.description-section {
		.cards-text {
			font-size: 18px;
			color: #465765;
		}
	}

	.the-company-section {
		.cards-details {
			display: flex;
			align-items: center;

			.user-img {
				max-width: 120px;
				width: 100%;
				height: 120px;
				border-radius: 50%;
				margin-right: 1rem;
				img {
					object-fit: cover;
				}
			}

			.cards-text {
				font-size: 18px;
				color: #465765;
			}
		}
	}
}

@media (max-width: 1200px) {
	.market-right-section {
		.menu-icon {
			display: block;
		}

		.apply-for-this-section {
			.apply-for-this {
				.card-content {
					.card-text-btn {
						.btn-red {
							margin-top: 1rem;
						}
					}
				}
			}
		}
	}
}

@media (max-width: 425px) {
	.market-right-section {
		.apply-for-this-section {
			padding: 1rem;
			margin-bottom: 1rem;

			.apply-for-this {
				flex-wrap: wrap;

				.logo-img {
					height: 80px;
					max-width: 80px;
					margin-bottom: 1rem;
					img {
						object-fit: cover;
					}
				}

				.card-content {
					.card-text-btn {
						.card-texts {
							.card-titles {
								font-size: 24px;
							}
						}
					}
				}
			}

			.labels {
				.labels-name {
					margin-top: 0.7rem;
					padding: 5px 22px;
					white-space: nowrap;
				}
			}
		}

		.cards-section {
			padding: 1rem;
			margin-bottom: 1rem;

			.card-titles {
				font-size: 20px;
				margin-bottom: 0.7rem;
			}
		}

		.about-this-post-section {
			.cards-details {
				flex-wrap: wrap;

				.text-cards {
					margin-bottom: 0.7rem;

					.text-head {
						font-size: 14px;
					}

					.card-texts {
						font-size: 16px;
					}
				}
			}
		}

		.description-section {
			.cards-text {
				font-size: 14px;
			}
		}

		.the-company-section {
			.cards-details {
				.user-img {
					max-width: 80px;
					width: 100%;
					height: 80px;
					border-radius: 50%;
					margin-right: 1rem;
					img {
						object-fit: cover;
					}
				}

				.cards-text {
					font-size: 14px;
				}
			}
		}
	}
}
.btn-green {
	background-color: green;
	color: #fff;
}

.container-model {
	.vfm--fixed {
		position: absolute;
		backdrop-filter: blur(10px);

		.modal {
			align-items: flex-start;
			padding-top: 130px;
		}
	}

	[data-v-39d009f3] .modal-content {
		min-width: 0;
	}
}

.vfm--overlay[data-v-2836fdb5] {
	background-color: transparent;
}

section {
	padding: 70px 0;
}
</style>

<style lang="scss">
.find-section {
	.multiselect-input {
		border: transparent !important;
		.multiselect-single-label {
			@media (max-width: 768px) {
				font-size: 14px;
				padding: 8px 35px 8px 14px;
			}
		}
	}
	.dropdown {
		.multiselect-options {
			border-radius: 10px;
		}
	}
}
</style>
