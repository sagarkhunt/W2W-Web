<template>
	<!-- view job detail` -->
	<div class="job__detail">
		<div class="market-right position-relative">
			<div class="market-right-section">
				<div class="apply-for-this-section">
					<div class="apply-for-this">
						<div class="logo-img">
							<img
								:src="applicationJobDetail.job && applicationJobDetail.job.company && applicationJobDetail.job.company.user && applicationJobDetail.job.company.user.file_path"
								class="img-fluid"
								alt=""
							/>
						</div>
						<div class="card-content">
							<div class="card-text-btn">
								<div class="card-texts">
									<h2 class="card-titles">
										{{ (applicationJobDetail.job && applicationJobDetail.job.job_title) || '-' }}
									</h2>
									<div class="location">
										<FontAwesomeIcon :icon="MapMarkerIcon" class="icon" />
										<p class="location-name">
											{{ applicationJobDetail.job && applicationJobDetail.job.countryReference && applicationJobDetail.job.countryReference.country_name }}
											({{ applicationJobDetail.job && applicationJobDetail.job.cityReference && applicationJobDetail.job.cityReference.city_name }})
										</p>
									</div>
									<p class="location-time">
										{{ t('projectMarketPage.postedOn') }}
										{{ dateFormat(applicationJobDetail.job && applicationJobDetail.job.created_at) || '-' }}
										<span>&bull;</span> 
										{{ applicationJobDetail.job && applicationJobDetail.job.job_mode == 'home_based' ? t('projectMarketPage.homeBased') :  applicationJobDetail.job && applicationJobDetail.job.job_mode == 'part_time' ? t('projectMarketPage.partTime') : t('projectMarketPage.fullTime') }}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="d-flex flex-wrap">
						<div v-for="item in applicationJobDetail.job && applicationJobDetail.job.skills" :key="item.id" class="labels">
							<div class="labels-name">
								<p>{{ item.reference.skill || '-' }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- job detail -->
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
											{{ applicationJobDetail.job && applicationJobDetail.job.industryReference && applicationJobDetail.job.industryReference.industry_name }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.noOfVaccancies') }}
										</p>
										<p class="card-texts">
											{{ (applicationJobDetail.job && applicationJobDetail.job.vacancies) || '-' }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">{{ t('projectMarketPage.duration') }} ({{ t('fieldList.days') }}):</p>
										<p class="card-texts">
											<!-- One Month -->
											{{ (applicationJobDetail.job && applicationJobDetail.job.job_duration) || '-' }}
										</p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.applyBefore') }}
										</p>
										<p class="card-texts">
											{{ dateFormat((applicationJobDetail.job && applicationJobDetail.job.apply_before) || '-') }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.contractType') }}
										</p>
										<p class="card-texts">
											{{ (applicationJobDetail.job && applicationJobDetail.job.salary_offer) || '-' }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.address') }}
										</p>
										<p class="card-texts">
											{{ (applicationJobDetail.job && applicationJobDetail.job.address) || '-' }}
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
								{{ (applicationJobDetail.job && applicationJobDetail.job.job_description) || '-' }}
							</p>
						</div>
					</div>
				</div>

				<div class="cards-section">
					<div class="the-company-section">
						<h2 class="card-titles">{{ t('projectMarketPage.aboutTheCompany') }}:</h2>
						<div class="cards-details">
							<div class="user-img" v-if="applicationJobDetail.job && applicationJobDetail.job != null">
								<img
									:src="applicationJobDetail.job && applicationJobDetail.job.company && applicationJobDetail.job.company.user && applicationJobDetail.job.company.user.file_path"
									alt="img"
									class="img-fluid w-100 h-100 rounded-circle"
								/>
							</div>
							<div class="user-img" v-else>
								<img src="@/assets/images/user-img.png" alt="img" class="img-fluid w-100 h-100 rounded-circle" />
							</div>
							<div>
								<p class="cards-text fw-bold mb-sm-1">
									{{ applicationJobDetail.job && applicationJobDetail.job.company && applicationJobDetail.job.company.company_name }}
								</p>

								<div class="location d-flex align-items-center mb-sm-1">
									<FontAwesomeIcon :icon="MapMarkerIcon" class="icon me-2" />
									<p class="location-name">
										{{ applicationJobDetail.job && applicationJobDetail.job.cityReference && applicationJobDetail.job.cityReference.city_name }}
										({{ applicationJobDetail.job && applicationJobDetail.job.countryReference && applicationJobDetail.job.countryReference.country_name }})
									</p>
								</div>
								<p>
									{{ (applicationJobDetail.job && applicationJobDetail.job.company && applicationJobDetail.job.company.description) || '-' }}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="cards-section">
					<GMapMap
						:center="{
							lat: applicationJobDetail.job && applicationJobDetail.job.lat,
							lng: applicationJobDetail.job && applicationJobDetail.job.lng,
						}"
						:zoom="10"
						map-type-id="terrain"
						style="height: 400px"
						class="img-fluid w-100"
					>
						<GMapMarker
							:position="{
								lat: applicationJobDetail.job && applicationJobDetail.job.lat,
								lng: applicationJobDetail.job && applicationJobDetail.job.lng,
							}"
							:clickable="true"
							:draggable="true"
						/>
					</GMapMap>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import { dateFormat, currencyConverture, dateNewFormat } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRoute } from 'vue-router';
import { faMap, faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
export default {
	name: 'JobDetail',
	components: {
		FontAwesomeIcon,
	},
	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = 'View Applications - Way2Work';
		//ref
		// gloal store
		const store = useStore();
		// global route
		const route = useRoute();

		// icon
		const mapIcon = faMap;
		const userIcon = faUser;

		// icons
		const MapMarkerIcon = faMapMarkerAlt;

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('job/viewApplicationJobDetails', route.params.id);
		});

		/**
		 * computed Properties
		 * *******************************************************************
		 */

		const applicationJobDetail = computed(() => store.state.job.getJobApplicationViewDetails);

		/**
		 * Watch
		 * *******************************************************************
		 */

		/**
		 * Methods
		 * *******************************************************************
		 */

		// table open

		return {
			//ref
			dateFormat,
			currencyConverture,
			dateNewFormat,

			// icon
			mapIcon,
			userIcon,

			//computed
			applicationJobDetail,

			// icons/

			// methods
			t,
			MapMarkerIcon,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.job__detail {
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
}
</style>