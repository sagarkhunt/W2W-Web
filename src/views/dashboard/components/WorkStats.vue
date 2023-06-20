<template>
	<!-- dashboard stats -->
	<div class="dash-user-info">
		<!-- if tax card exist -->
		<div v-if="!isHideTaxAlert && dashboardInfo && dashboardInfo.availableTaxCard && dashboardInfo.earned_percentage === 100" class="alert dashboard-alert text-center position-relative">
			<p class="mb-0">{{ t('commonDashboard.dashboardTaxMessage') }}</p>
			<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
		</div>

		<!-- if tax card is not exist -->
		<div v-if="!isHideTaxAlert && dashboardInfo && !dashboardInfo.availableTaxCard" class="alert dashboard-alert text-center position-relative">
			<p class="mb-0">{{ t('commonDashboard.taxCardMessage') }}</p>
			<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
		</div>
		<div class="container-lg p-0">
			<div class="puzzle-grid">
				<!-- number of working hours -->
				<div class="puzzle-col">
					<router-link to="/documents">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/yellow_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="text-light fw-bold mb-5 puzzle-font">{{ t('commonDashboard.MYDOCUMENTS') }}</h3>

							<a href="#" class="text-light fw-bold arrow-size text-end d-block">></a>
							<div class="puzzle-icon">
								<img src="@/assets/images/brief.png" alt="img" class="img-fluid icon-ing" />
							</div>
						</div>
					</router-link>
				</div>

				<!-- invoices -->
				<div class="puzzle-col">
					<router-link to="/job/proposals" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/red_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>
							<h3 class="text-light fw-bold mb-4 puzzle-font">{{ t('commonDashboard.APPLIEDGIGS') }}</h3>
							<a href="#" class="text-light fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.JobProposalCount || 0 }}</a>
							<div class="puzzle-icon">
								<img src="@/assets/images/red-puzzle-icon.png" alt="img" class="puzzle-fluid" />
							</div>
						</div>
					</router-link>
				</div>

				<!-- number of invites -->
				<div class="puzzle-col">
					<router-link to="/worked-details" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/info_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="text-light fw-bold mb-4 puzzle-font">{{ t('commonDashboard.WORKDETAILS') }}</h3>
							<a href="#" class="text-light fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.work_hours }}</a>

							<div class="puzzle-icon">
								<img src="@/assets/images/info-puzzle-icon.png" alt="img" class="puzzle-fluid" />
							</div>
						</div>
					</router-link>
				</div>

				<!-- work contract, my cv -->
				<div class="puzzle-col">
					<router-link to="/invoices" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/black_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="text-light fw-bold mb-4 puzzle-font">{{ t('commonDashboard.YOURINVOICES') }}</h3>
							<a href="#" class="text-light fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.invoice }}</a>
							<div class="puzzle-icon">
								<img src="@/assets/images/piggy-bank.png" alt="img" class="puzzle-fluid" />
							</div>
						</div>
					</router-link>
				</div>

				<!-- work contract, my cv -->
				<div class="puzzle-col">
					<router-link to="/invites">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/green_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>
							<h2 class="text-light fw-bold mb-5 puzzle-font">{{ t('commonDashboard.INVITEFRIENDS') }}</h2>
							<a href="#" class="text-light fw-bold arrow-size text-end d-block">></a>
							<div class="puzzle-icon">
								<img src="@/assets/images/computer.png" alt="img" class="puzzle-fluid" />
							</div>
						</div>
					</router-link>
				</div>

				<!-- number of working hours -->
				<div class="puzzle-col">
					<router-link to="/documents" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/top_light_red_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="text-light fw-bold mb-5 puzzle-font">{{ t('commonDashboard.TOTALEARNINGSLASTMONTH') }}</h3>

							<a href="#" class="text-light fw-bold arrow-size text-end d-block">€ {{ Number(dashboardJobseekerInfo.total_earning_of_last_month).toFixed(2) || 0 }}</a>
						</div>
					</router-link>
				</div>

				<!-- invoices -->
				<div class="puzzle-col">
					<router-link to="/job/proposals" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/left_light_red_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>
							<h3 class="text-light fw-bold puzzle-font">{{ t('commonDashboard.INVOICESLASTMONTH') }}</h3>
							<a href="#" class="text-light fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.total_invoice_count_of_last_month || 0 }}</a>
							<a href="#" class="text-light fw-bold arrow-size text-end d-block">€ {{ Number(dashboardJobseekerInfo.total_invoice_amount_of_last_month)?.toFixed(2) || 0 }}</a>
						</div>
					</router-link>
				</div>

				<!-- number of invites -->
				<div class="puzzle-col">
					<router-link to="/worked-details" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/left_black_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="text-light fw-bold puzzle-font">{{ t('commonDashboard.PENDINGINVOICES') }}</h3>
							<a href="#" class="text-light fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.pendingInvoices || 0 }}</a>
							<a href="#" class="text-light fw-bold arrow-size text-end d-block">€ {{ Number(dashboardJobseekerInfo.pendingInvoiceAmount)?.toFixed(2) || 0 }}</a>
						</div>
					</router-link>
				</div>

				<!-- work contract, my cv -->
				<div class="puzzle-col">
					<router-link to="/invoices" class="">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/top_gray_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>

							<h3 class="fw-bold puzzle-font">{{ t('commonDashboard.TEAMINVOICES') }}</h3>
							<div class="h-40">
								<a href="#" class="fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.totalTeamInvoiceCount || 0 }}</a>
								<a href="#" class="fw-bold arrow-size text-end d-block">€ {{ Number(dashboardJobseekerInfo.totalTeamInvoiceAmount)?.toFixed(2) || 0 }}</a>
							</div>
						</div>
					</router-link>
				</div>

				<!-- work contract, my cv -->
				<div class="puzzle-col">
					<router-link to="/documents">
						<div class="dash-user-info-box">
							<span class="user-info-box-right">
								<img src="@/assets/images/new_puzzle/left_gray_puzzle.svg" alt="img" class="puzzle-fluid" />
							</span>
							<h2 class="fw-bold puzzle-font">{{ t('commonDashboard.TAXCARDS') }}</h2>
							<div class="h-50">
								<a href="#" class="fw-bold text-size text-end d-block">{{ dashboardJobseekerInfo.total_tax_cards || 0 }}</a>
								<span class=""></span>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'DashboardWorkStats',

	// components
	components: {
		FontAwesomeIcon,
	},

	// composition api
	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		const isHideTaxAlert = ref(localStorage.getItem('hideTaxAlert') || false);

		// icons
		const closeIcon = faTimes;

		/**
		 * Computed
		 * *******************************************************************
		 */
		// Dashboard and user profile
		const dashboardInfo = computed(() => {
			const dashboardStat = store.state.dashboard.DashboardWorkStats;
			return dashboardStat.id ? dashboardStat : null;
		});

		const dashboardJobseekerInfo = computed(() => store.state.dashboard.DashboardJobseeker);

		const hideTaxAlert = () => {
			isHideTaxAlert.value = true;
			localStorage.setItem('hideTaxAlert', true);
		};

		return {
			isHideTaxAlert,
			dashboardInfo,
			dashboardJobseekerInfo,
			closeIcon,
			hideTaxAlert,
			t,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.dash-user-info {
	background-color: #fff;
	box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
	border-radius: 20px;
	padding: 30px;

	.alert-close-icon {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		font-size: 16px;
	}

	.dash-user-info-box {
		background-color: transparent;
		position: relative;
		z-index: 1;
		min-height: 250px;
		max-width: 250px;
		margin: 0 auto;
		padding: 50px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		transition: all 0.5s;

		@media (max-width: 425px) {
			padding: 35px 37px 35px 30px;
			min-height: 170px !important;
			max-height: 170px;
		}

		&:hover {
			transform: scale(1.1);
			.arrow-size {
				white-space: pre-wrap;
				line-break: anywhere;
			}
		}

		@media (max-width: 768px) {
			min-height: 210px;
			padding: 27px 50px 40px 40px;
		}

		@media (max-width: 675px) {
			padding: 30px 60px 35px 60px;
		}

		@media (max-width: 425px) {
			padding: 40px 37px 35px 30px;
		}
	}
	.puzzle-font {
		@media (max-width: 768px) {
			font-size: 15px;
			padding-top: 20px;
		}
		@media (max-width: 675px) {
			font-size: 17px;
			padding-top: 10px;
		}
		@media (max-width: 576px) {
			font-size: 14px;
		}
		@media (max-width: 425px) {
			font-size: 13px;
			padding-top: 0;
		}
	}
	.puzzle-icon {
		position: absolute;
		left: 25%;
		bottom: -2%;
		transform: translate(-20px, -40px);
		z-index: -1;

		@media (max-width: 1440px) {
			max-width: 60px;
			width: 100%;
		}

		@media (max-width: 768px) {
			max-width: 50px;
			width: 100%;
		}

		@media (max-width: 576px) {
			right: 30px;
			max-width: 40px;
			transform: translate(0, -30px);
			bottom: 15px;
		}
		@media (max-width: 425px) {
			bottom: 7px;
			max-width: 35px;
		}
	}

	.user-info-box-right {
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.arrow-size {
		font-size: 18px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		@media (max-width: 576px) {
			font-size: 15px;
		}
		@media (max-width: 375px) {
			font-size: 13px;
		}
	}
	.text-size {
		font-size: 50px;
		@media (max-width: 1440px) {
			font-size: 40px;
		}
		@media (max-width: 768px) {
			font-size: 35px;
		}
		@media (max-width: 425px) {
			font-size: 27px;
		}
	}
	.puzzle-fluid {
		width: 100%;
		height: 100%;
		position: relative;
		object-fit: contain;
	}
	.user-info-box-right {
		p {
			font-weight: 600;
			margin-bottom: 5px;
		}

		a {
			font-size: 14px;
			color: $colorLightGray;

			&:hover {
				color: $coloRed;
			}
		}
	}
	.cursor-pointer {
		cursor: pointer;
	}
}

.title-md {
	font-size: 22px;
	font-weight: 600;
}

@media (max-width: 992px) {
	.dash-user-info {
		padding: 20px 15px;
	}
}

@media (max-width: 576px) {
	.dash-user-info {
		.dash-user-info-box {
			.user-info-box-left {
				.user-info-left-icon-box {
					width: 40px;
					height: 40px;
					line-height: 42px;

					svg {
						font-size: 15px;
					}
				}
			}

			.user-info-box-right {
				p {
					font-size: 14px;
					margin: 0;
				}

				a {
					font-size: 12px;
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.dash-user-info {
		order: 2;
		.dash-user-info-box {
			text-align: center;
			margin: 0 auto;

			.user-info-box-left {
				.user-info-left-icon-box {
					margin: 0 auto;
				}
			}
		}
	}
}
.puzzle-grid {
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));

	@media (max-width: 1646px) {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	@media (max-width: 1280px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 992px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 675px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}

.dashboard-alert {
	margin: 10px 10px 0px 22px;
	font-weight: 500;
	color: #fff;
	background-color: #ea2129;
	border-radius: 18px;
	a,
	p {
		font-size: 20px;
		color: #fff;
		margin-right: 0.5rem;
		@media (max-width: 2560px) {
			font-size: 20px;
		}
		@media (max-width: 1600px) {
			font-size: 16px;
		}
	}
	.alert-close-icon {
		font-size: 16px;
		right: 20px;
		color: #000;
	}
}
</style>
