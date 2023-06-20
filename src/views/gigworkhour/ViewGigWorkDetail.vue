<template>
	<!-- view job detail` -->
	<div class="job__detail">
		<div class="manage-gig-detail-pill">
			<!-- job detail header - info -->
			<div class="gig-detail-top">
				<div class="gdp-profile">
					<div class="profile-name">
						<!-- job title -->
						<h5 class="title-lg">{{ t('workDetails.gig_work_hour_detail') }}</h5>
					</div>
				</div>
			</div>

			<!-- job detail -->
			<div class="gig-detail row">
				<div class="detail-left col-xl-8">
					<div class="detail-list">
						<ul>
							<!-- job industry -->
							<li>
								<span class="font-dark">{{ t('common.createdOn') }}</span>
								<span>{{ dateFormat(gigWorkDetail?.created_at) || '-' }}</span>
							</li>

							<!-- total vacancy -->
							<li>
								<span class="font-dark">{{ t('projectMarketPage.contractType') }}</span>
								<span>{{ gigWorkDetail?.contract_type || '-' }}</span>
							</li>

							<!-- job type -->
							<li>
								<span class="font-dark">{{ t('fieldList.tripStart') }}</span>
								<span>{{ gigWorkDetail?.trip_start || '-' }}</span>
							</li>

							<!-- salary -->
							<li>
								<span class="font-dark">{{ t('fieldList.tripEnd') }}</span>
								<span>{{ gigWorkDetail?.trip_end || '-' }}</span>
							</li>

							<!-- job location -->
							<li>
								<span class="font-dark">{{ t('fieldList.tripAddress') }}</span>
								<span>{{ gigWorkDetail?.trip_address || '-' }}</span>
							</li>

							<!-- job education -->
							<li>
								<span class="font-dark">{{ t('common.km') }}</span>
								<span>{{ gigWorkDetail?.distance || '-' }}</span>
							</li>

							<!-- job experience -->
							<li>
								<span class="font-dark">{{ t('fieldList.tripTime') }}</span>
								<span>{{ gigWorkDetail?.trip_time || '-' }}</span>
							</li>

							<!-- apply by -->
							<li>
								<span class="font-dark">{{ t('fieldList.workedHours') }}</span>
								<span>{{ gigWorkDetail?.total_work || '-' }}</span>
							</li>

							<!-- gig position date -->
							<li>
								<span class="font-dark">{{ t('fieldList.otherCompensation') }}</span>
								<span>{{ gigWorkDetail?.other_compensation || '-' }}</span>
							</li>

							<li>
								<span class="font-dark">{{ t('fieldList.extraInformation') }}</span>
								<span>{{ gigWorkDetail?.work_description || '-' }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { dateFormat } from '@/utils/mixins';
import { useI18n } from 'vue-i18n';
export default {
	name: 'GigWorkDetail',
	setup() {
		//ref
		const gigWorkDetail = ref(null);

		// global store
		const store = useStore();
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			fetchGigWorkWorkDetail();
		});

		const fetchGigWorkWorkDetail = () => {
			gigWorkDetail.value = store.state.gigworkhour.gigWorkDetail;
		};
		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		});

		return {
			//ref
			gigWorkDetail,
			dateFormat,
			t,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.job__detail {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	padding: 30px 15px;

	.manage-gig-detail-pill {
		.gig-detail-top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.gdp-profile {
				display: flex;
				align-items: center;

				.profile-img {
					width: 100px;
					height: 100px;
					border-radius: 100%;
					overflow: hidden;
					margin-right: 20px;

					img {
						width: 100px;
						height: 100px;
						object-fit: cover;
					}
				}

				.profile-name {
					span {
						margin-top: 10px;
						display: inline-block;
						color: $colorGray;
					}
				}
			}

			.gdp-information {
				display: flex;
				align-items: center;

				.info-box {
					display: flex;
					align-items: center;
					margin-right: 20px;

					.info-box-left {
						width: 40px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						background-color: $colorExLightGray;
						border-radius: 10px;
						margin-right: 15px;

						svg {
							color: $colorLightGray;
						}
					}

					.info-box-right {
						a,
						p {
							font-weight: 500;
						}
					}
				}
			}
		}

		.gig-detail {
			background-color: #fff;
			padding: 20px;
			border-radius: 20px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
			margin: 30px 0px;
			justify-content: space-between;

			.detail-left {
				width: 100%;

				.detail-list {
					margin-top: 30px;

					ul {
						li {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 5px 0px;

							span {
								&.font-dark {
									font-weight: 600;
								}
							}
						}
					}
				}
			}

			.detail-right {
				.detail-map {
					height: 200px;
					width: auto;
					overflow: hidden;
					border-radius: 20px;
				}

				.detail-skill {
					margin-top: 30px;

					.skill-title {
						margin-bottom: 20px;
					}

					.skill-box {
						padding: 10px;
						background-color: $bg-color;
						border: 2px dashed $colorExLightGray;
						border-radius: 10px;
						display: inline-block;
						width: 100%;

						.inner-skill {
							padding: 10px;
							background-color: $coloRed;
							color: #fff;
							display: inline-block;
							border-radius: 10px;
							font-size: 14px;
							margin-right: 8px;
						}
					}
				}
			}
		}

		.gig-description {
			background-color: #fff;
			padding: 20px;
			border-radius: 20px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			.desc-title {
				margin-bottom: 20px;
			}

			.desc-text {
				p {
					color: $colorGray;
					margin-bottom: 10px;
					display: block;
				}
			}
		}
	}
}
</style>
