<template>
	<!-- manage jobs - job list -->
	<div class="manage__Jobs card-space">
		<!-- header -->
		<div class="payment-pill-header">
			<!-- title -->
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('job.allPostedGigs') }}
				</h5>
			</div>
		</div>

		<!-- job list -->
		<div class="job__list" v-if="jobList.length">
			<!-- job -->
			<div class="manage-gig-box" v-for="(job, index) in jobList" :key="index">
				<div class="mgb-row">
					<div class="mgb-left">
						<!-- job title -->
						<div class="mgb-left-title">
							<router-link
								:to="{
									name: 'ViewGigDetail',
									params: { id: job.id },
								}"
							>
								<h5 class="text-big">
									{{ job.job_title }}
								</h5>
							</router-link>
						</div>
						<div class="mgb-left-demo-text">
							<p>{{ job.industry?.industry_name }}</p>
						</div>

						<!-- job description -->
						<div class="mgb-left-text mt-2">
							<p>
								{{ job.job_description }}
							</p>
						</div>
						<div class="right-info-date">
							<p>{{ dateFormat(job.created_at) }}</p>
						</div>
					</div>
					<div class="ml-auto d-md-flex align-items-center">
						<div class="mgb-right mt-xl-0 mt-2">
							<div class="mgb-right-info">
								<div class="right-info-show-active" :class="[job.job_status === 'active' ? 'active' : 'inactive']">
									<p>{{ job.job_status }}</p>
								</div>
							</div>
						</div>
						<div class="d-flex align-items-center justify-content-center mt-xl-0 mt-2">
							<router-link
								:to="{
									name: 'ViewGigDetail',
									params: { id: job.id },
								}"
							>
								<button class="tbl-action grey-edit ml-2">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</router-link>
							<div
								class="ml-2 clr-gay grey-edit"
								@click="
									router.push({
										name: 'EditJob',
										params: { id: job.id },
									})
								"
							>
								<button>
									<FontAwesomeIcon :icon="editIcon" />
								</button>
							</div>

							<div class="mgb-right-edit red-close ml-2" @click="deleteProposal(job.id)">
								<button>
									<FontAwesomeIcon :icon="removeIcon" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<pagination @changePage="handlePageChange" v-model:value="page" :total="countTeamMember" :max="3" />
		</div>

		<div v-else class="text-center">{{ t('projectMarketPage.noJobFound') }}</div>
	</div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencilAlt, faTimes, faStar, faEye } from '@fortawesome/free-solid-svg-icons';

import { dateFormat } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';


export default {
	name: 'ManageJobs',

	components: {
		FontAwesomeIcon,
	},

	setup() {
		document.title = 'All Posted Gigs - Way2Work';
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(3);

		const isRatingReviewModal = ref(false);

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global router
		const router = useRouter();
		// icons
		const editIcon = faPencilAlt;
		const removeIcon = faTimes;
		const startIcon = faStar;
		const viewIcon = faEye;

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// get company job list - my posted jobs
			fetchCompanyJobList();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// get company posted job list
		const jobList = computed(() => store.getters['job/getCompanyPostedJobList']);
		const companyJobsCount = computed(() => store.state.job.companyJobsCount);
		const countTeamMember = computed(() => {
			return Math.ceil(companyJobsCount.value / maxItemsPerPage.value);
		});
		// show upload my document model
		const ratingReviewModal = computed({
			get() {
				return isRatingReviewModal;
			},

			set(val) {
				isRatingReviewModal.value = true;
				store.commit('job/SET_STATE', {
					action: 'jobsId',
					data: val,
				});
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch company posted jobs
		const fetchCompanyJobList = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
			};
			await store.dispatch('job/getCompanyJobs', payload);
		};

		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchCompanyJobList();
		};
		const deleteProposal = async id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.job'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async result => {
				if (result.isConfirmed) {
					// apply proposal
					await store.dispatch('job/deleteCompanyJobProposal', id).then(() => {
						fetchCompanyJobList();
					});
				}
			});
		};

		return {
			// refs
			dateFormat,
			router,
			page,
			maxItemsPerPage,

			// icons
			editIcon,
			removeIcon,
			startIcon,
			viewIcon,

			// translate function
			t,

			// computed
			jobList,
			// totalPages,
			countTeamMember,
			ratingReviewModal,
			companyJobsCount,

			// methods
			fetchCompanyJobList,
			handlePageChange,
			deleteProposal,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.manage__Jobs {
	.payment-pill-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30px;
	}
	.yellow-star {
		svg {
			color: #e4aa18;
		}
	}

	.job__list {
		.manage-gig-box {
			background-color: #fff;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			padding: 20px;
			border-radius: 20px;
			margin-bottom: 30px;

			.mgb-row {
				display: flex;
				align-items: center;

				@media (max-width: 1024px) {
					display: block;
				}

				.mgb-left {
					max-width: 40%;
					.mgb-left-demo-text {
						margin: 10px 0px 15px 0px;

						p {
							font-size: 14px;

							span {
								color: $colorWait;
							}
						}
					}
					.mgb-left-text {
						p {
							width: 100%;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							max-width: 490px;
						}
					}
				}

				.mgb-right {
					display: flex;
					align-items: center;

					@media (max-width: 1024px) {
						align-items: start;
						justify-content: flex-end;
					}

					.mgb-right-info {
						text-align: center;

						.right-info-show-active {
							padding: 12px 28px;
							color: #fff;
							border-radius: 50px;
							margin-top: 8px;

							&.inactive {
								background-color: $colorWait;
							}

							&.active {
								background-color: $colorApprove;
							}

							p {
								font-size: 14px;
								font-weight: 500;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.manage__Jobs {
		.job__list {
			.manage-gig-box {
				padding: 15px;
				.mgb-row {
					display: block;
					text-align: center;
					.mgb-left {
						max-width: 100%;
						margin-bottom: 20px;
						.mgb-left-demo-text {
							margin: 5px 10px;
							p {
								font-size: 12px;
							}
						}
						.mgb-left-text {
							p {
								font-size: 14px;
							}
						}
					}
					.mgb-right {
						justify-content: center;
						text-align: center;

						.mgb-right-info {
							.right-info-date {
								margin-bottom: 5px;
								p {
									font-size: 14px;
								}
							}
						}
						.btn-yellow {
							background-color: #e4aa18;
						}
					}
				}
			}
		}
	}
}
</style>
