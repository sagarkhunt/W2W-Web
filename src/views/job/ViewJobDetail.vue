<template>
	<!-- view job detail` -->
	<div class="job__detail">
		<div class="market-right position-relative">
			<div class="market-right-section">
				<!-- job detail header - info -->
				<div class="apply-for-this-section">
					<div class="apply-for-this">
						<div class="logo-img">
							<img :src="postJobDetail.company && postJobDetail.company.user && postJobDetail.company.user.file_path" class="img-fluid" alt="" />
						</div>
						<div class="card-content">
							<div class="card-text-btn">
								<div class="card-texts">
									<h2 class="card-titles">
										{{ postJobDetail.job_title || '-' }}
									</h2>
									<div class="location">
										<FontAwesomeIcon :icon="MapMarkerIcon" class="icon" />
										<p class="location-name">
											{{ postJobDetail.cityReference && postJobDetail.cityReference.city_name }}
											({{ postJobDetail.countryReference && postJobDetail.countryReference.country_name }})
										</p>
									</div>
									<p class="location-time">
										{{ t('projectMarketPage.postedOn') }}
										{{ dateFormat(postJobDetail.created_at) || '-' }}
										<span>&bull;</span> {{ t('projectMarketPage.fullTime') }}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="d-flex flex-wrap">
						<div v-for="item in postJobDetail.skills" :key="item.id" class="labels">
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
											{{ postJobDetail.industryReference && postJobDetail.industryReference.industry_name }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.noOfVaccancies') }}
										</p>
										<p class="card-texts">
											{{ postJobDetail.vacancies || '-' }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">{{ t('projectMarketPage.duration') }} ({{ t('fieldList.days') }}):</p>
										<p class="card-texts">
											<!-- One Month -->
											{{ postJobDetail.job_duration || '-' }}
										</p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.applyBefore') }}
										</p>
										<p class="card-texts">
											{{ dateFormat(postJobDetail.apply_before || '-') }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.contractType') }}
										</p>
										<p class="card-texts">
											{{ postJobDetail.salary_offer || '-' }}
										</p>
									</div>
									<div class="text-cards">
										<p class="text-head">
											{{ t('projectMarketPage.address') }}
										</p>
										<p class="card-texts">
											{{ postJobDetail.address || '-' }}
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
								{{ titleCase(postJobDetail.job_description) || '-' }}
							</p>
						</div>
					</div>
				</div>

				<div class="cards-section">
					<div class="the-company-section">
						<h2 class="card-titles">{{ t('projectMarketPage.aboutTheCompany') }}:</h2>
						<div class="cards-details">
							<div class="user-img" v-if="postJobDetail.company && postJobDetail.company != null">
								<img :src="postJobDetail.company && postJobDetail.company.user && postJobDetail.company.user.file_path" alt="img" class="img-fluid w-100 h-100 rounded-circle" />
							</div>
							<div class="user-img" v-else>
								<img src="@/assets/images/user-img.png" alt="img" class="img-fluid w-100 h-100 rounded-circle" />
							</div>
							<div>
								<p class="cards-text fw-bold mb-sm-1">
									{{ postJobDetail.company && postJobDetail.company.company_name }}
								</p>

								<div class="location d-flex align-items-center mb-sm-1">
									<FontAwesomeIcon :icon="MapMarkerIcon" class="icon me-2" />
									<p class="location-name">
										{{ postJobDetail.cityReference && postJobDetail.cityReference.city_name }}
										({{ postJobDetail.countryReference && postJobDetail.countryReference.country_name }})
									</p>
								</div>
								<p>
									{{ (postJobDetail.company && postJobDetail.company.description) || '-' }}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="cards-section">
					<GMapMap
						:center="{
							lat: postJobDetail.lat,
							lng: postJobDetail.lng,
						}"
						:zoom="10"
						map-type-id="terrain"
						style="height: 400px"
						class="img-fluid w-100"
					>
						<GMapMarker
							:position="{
								lat: postJobDetail.lat,
								lng: postJobDetail.lng,
							}"
							:clickable="true"
							:draggable="true"
						/>
					</GMapMap>
				</div>

				<!-- job description -->
				<div class="gig-description mt-3">
					<div class="desc-text">
						<div class="job__seekers_application ">
							<!-- header -->
							<div class="d-flex justify-content-between align-items-center mb-3">
								<div class="payment-pill-header">
									<!-- title -->
									<div class="pph-left mr-sm-0 mr-3">
										<h5 class="title-lg">
											{{ t('job.worker') }}
										</h5>
									</div>
								</div>

								<div class="header__right">
									<div class="form-control">
										<input type="text" class="border-0 w-100" v-model="search" :placeholder="t('common.search')" />
										<span class="text-light">
											<FontAwesomeIcon icon="search" />
										</span>
									</div>
								</div>
							</div>

							<div class="spacing-table large-table">
								<div class="table-width">
									<div class="spacing-table-head">
										<span class="w-100">{{ t('myApplications.lightEnterpreneurName') }} </span>
										<span class="w-100 text-center">{{ t('fieldList.gigTitle') }}</span>
										<span class="w-100 text-center">{{ t('myApplications.applicationDate') }}</span>
										<span class="w-100 text-center">{{ t('job.jobStatus') }}</span>
										<span class="w-100 text-center">{{ t('toolTip.jobVerify') }}</span>
										<span class="w-100 text-center">{{ t('common.actions') }}</span>
									</div>
								</div>
								<div v-if="jobSeekerProposalList.length > 0">
									<div :class="`invoice__row ${proposalStatus(item)}`" :key="i" v-for="(item, i) in jobSeekerProposalList">
										<div class="font border-right w-100 me-2 d-flex align-items-center">
											<span v-if="item?.seeker?.user?.file_path">
												<div class="review-user">
													<img :src="item.seeker && item.seeker.user && item.seeker.user.file_path" alt="" class="img-fluid h-100" />
												</div>
											</span>
											<span v-else>
												<div class="review-user">
													<img src="@/assets/images/icon_png.png" alt="" class="img-fluid h-100" />
												</div>
											</span>

											<p class="mx-2 cursor-pointer" @click="viewSeekerProfileDetail(item.seeker?.id)">
												{{ item.seeker?.user?.full_name }}
											</p>
										</div>

										<span class="font border-right w-100 me-2 d-flex align-items-center justify-content-center">
											{{ item.job?.job_title }}
										</span>

										<span class="font border-right w-100 me-2 d-flex align-items-center justify-content-center">
											{{ dateFormat(item.created_at) }}
										</span>

										<span class="w-100 d-flex align-items-center justify-content-center border-right">
											<div class="tbl-status w-100 d-flex align-items-center justify-content-center" v-if="item.le_work_status == 'pending'">
												<span class="sts-wait">
													{{ t('jobSeekerTeam.pending') }}
												</span>
											</div>
											<div class="tbl-status d-flex align-items-center justify-content-center" v-else-if="item.le_work_status == 'active'">
												<span class="sts-reject">
													{{ t('common.active') }}
												</span>
											</div>
											<div class="tbl-status" v-else>
												<span class="sts-reject">
													{{ t('common.completed') }}
												</span>
											</div>
										</span>

										<span class="w-100 d-flex align-items-center justify-content-center border-right">
											<div class="small-grey-edit" v-if="item.le_work_status == 'completed'">
												<ToolTip :title="t('toolTip.jobVerify')">
													<div
														class="ml-lg-1 grey-edit yellow-star"
														v-if="item.le_work_status == 'completed' && item.company_verify == false"
														@click="ratingReviewModalShow(item.id, item.job.id, item.seeker.id)"
													>
														<button>
															<FontAwesomeIcon :icon="startIcon" />
														</button>
													</div>
													<div class="ml-lg-1 m-auto grey-edit-grey" v-else>
														<button>
															<FontAwesomeIcon :icon="startIcon" />
														</button>
													</div>
												</ToolTip>
											</div>
											<div class="small-grey-edit" v-else>
												<div class="ml-lg-1 m-auto grey-edit-grey">
													<button>
														<FontAwesomeIcon :icon="startIcon" />
													</button>
												</div>
											</div>
										</span>

										<span class="w-100 d-flex align-items-center justify-content-center pl-2">
											<span v-if="item.status == 'not_assigned'" class="d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.rejectJob')" class="red-close">
													<button class="tbl-action" @click="updateProposalStatus(item.id, 'rejected')">
														<FontAwesomeIcon :icon="thumbsDown" style="text-align:'center'" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.assignedJob')">
													<button class="tbl-action approve-icon ml-2" @click="updateProposalStatus(item.id, 'assigned')">
														<FontAwesomeIcon :icon="thumbsUp" style="text-align:'center'" />
													</button>
												</ToolTip>
											</span>
											<span v-else class=" d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.rejectJob')" class="red-close">
													<button class="tbl-action" @click="updateProposalStatus(item.id, 'rejected')">
														<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'" />
													</button>
												</ToolTip>

												<button class="tbl-action grey-edit-grey ml-2">
													<FontAwesomeIcon :icon="thumbsUp" style="text-align:'center'" />
												</button>
											</span>
										</span>
									</div>
									<pagination @changePage="handlePageChange" v-model:value="page" :total="TotalPages" :max="9" />
								</div>
								<div v-else>
									<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
								</div>
							</div>

							<div class="spacing-table responsive-table">
								<div v-if="jobSeekerProposalList.length > 0">
									<div :class="`invoice__row ${proposalStatus(item)} mb-3`" :key="i" v-for="(item, i) in jobSeekerProposalList">
										<div class="collapse-div" @click="openTable(i, item)">
											<div class="d-flex justify-content-between align-items-center">
												<div class="w-100 me-2">
													<span class="invoice__data ">
														{{ dateFormat(item.created_at) }}
													</span>
												</div>
												<div class="w-100 me-2">
													<span class="invoice__data ">
														{{ item.job?.job_title }}
													</span>
												</div>
												<div class="w-100 me-2">
													<span class="w-100">
														<div class="tbl-status w-100" v-if="item.le_work_status == 'pending'">
															<span class="assign__status sts-wait bg-warning">
																<FontAwesomeIcon :icon="clockIcon" />
																{{ t('jobSeekerTeam.pending') }}
															</span>
														</div>

														<div class="tbl-status w-100" v-else-if="item.le_work_status == 'active'">
															<span class="sts-approve">
																<FontAwesomeIcon :icon="approveIcon" class="me-1" />
																{{ t('common.active') }}
															</span>
														</div>

														<div class="tbl-status w-100" v-else>
															<span class="sts-reject">
																{{ t('common.completed') }}
															</span>
														</div>
													</span>
												</div>

												<div>
													<a>
														<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== i" class="arrowIcon" />
													</a>

													<a>
														<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === i" class="arrowIcon" />
													</a>
												</div>
											</div>

											<div class="border-padding px-sm-3 px-2">
												<div v-if="i == tableIndex" class="table-border">
													<div class="d-flex align-items-center px-4 py-3 border-bottom bg-white">
														<span class="w-100">{{ t('myApplications.lightEnterpreneurName') }}</span>
														<div class="w-100 me-2 d-flex align-items-center">
															<span class="font w-100 me-2 d-flex align-items-center">
																<img src="@/assets/images/member-img.png" alt="img" class="img-fluid icon-ing" />
																<p class="ms-2">
																	{{ item.seeker?.user?.full_name }}
																</p>
															</span>
														</div>
													</div>

													<div class="d-flex align-items-center px-4 py-3 border-bottom bg-white">
														<span class="w-100">{{ t('fieldList.gigTitle') }}</span>
														<span class="font w-100 me-2 d-flex align-items-center">{{ item.job?.job_title }}</span>
													</div>

													<div class="d-flex align-items-center px-4 py-3 bg-white">
														<span class="w-100">{{ t('myApplications.applicationDate') }}</span>
														<span class="font w-100 me-2 d-flex align-items-center">{{ dateFormat(item.created_at) }}</span>
													</div>
													<div class="d-flex align-items-center px-4 py-3 bg-white">
														<span class="w-100">{{ t('job.jobStatus') }}</span>
														<span class="w-100">
															<div class="tbl-status w-100" v-if="item.le_work_status == 'pending'">
																<span class="assign__status sts-wait bg-warning">
																	<FontAwesomeIcon :icon="clockIcon" />
																	{{ t('jobSeekerTeam.pending') }}
																</span>
															</div>

															<div class="tbl-status w-100" v-else-if="item.le_work_status == 'active'">
																<span class="assign__status sts-reject">
																	<FontAwesomeIcon :icon="approveIcon" class="me-1" />
																	{{ t('common.active') }}
																</span>
															</div>

															<div class="tbl-status w-100" v-else>
																<span class="assign__status sts-reject">
																	{{ t('common.completed') }}
																</span>
															</div>
														</span>
													</div>

													<div class="d-flex align-items-center px-4 py-3 bg-white">
														<span class="w-100">{{ t('toolTip.jobVerify') }}</span>
														<div class="small-grey-edit w-100" v-if="item.le_work_status == 'completed'">
															<ToolTip :title="t('toolTip.jobVerify')">
																<div
																	class="ml-lg-1 grey-edit yellow-star"
																	v-if="item.le_work_status == 'completed'"
																	@click="ratingReviewModalShow(item.id, item.job.id, item.seeker.id)"
																>
																	<button>
																		<FontAwesomeIcon :icon="startIcon" />
																	</button>
																</div>
															</ToolTip>
														</div>
														<div class="small-grey-edit w-100" v-else>
															<div class="ml-lg-1 m-auto grey-edit-grey">
																<button>
																	<FontAwesomeIcon :icon="startIcon" />
																</button>
															</div>
														</div>
													</div>

													<div class="d-flex align-items-center px-4 py-3 bg-white">
														<span class="w-100">{{ t('common.actions') }}</span>
														<span class="w-100">
															<div class="tbl-status w-100" v-if="item.status == 'not_assigned'">
																<button :class="`assign__status ${proposalStatus(item)}`" @click="updateProposalStatus(item.id, 'assigned')">
																	<span class="sts-wait">
																		<FontAwesomeIcon :icon="clockIcon" />
																		{{ t('myApplications.notAssigned') }}
																	</span>
																</button>
															</div>

															<div class="tbl-status w-100" v-else-if="item.status == 'assigned'">
																<button :class="`assign__status ${proposalStatus(item)}`" @click="updateProposalStatus(item.id, 'rejected')">
																	<span class="sts-approve">
																		<FontAwesomeIcon :icon="approveIcon" class="me-1" />
																		{{ t('myApplications.assigned_1') }}
																	</span>
																</button>
															</div>

															<div class="tbl-status w-100" v-else>
																<button :class="`assign__status ${proposalStatus(item)}`" @click="updateProposalStatus(item.id, 'not_assigned')">
																	<span class="sts-reject">
																		<FontAwesomeIcon :icon="deleteIcon" class="me-1" />
																		{{ t('jobSeekerTeam.rejected') }}
																	</span>
																</button>
															</div>
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<pagination @changePage="handlePageChange" v-model:value="page" :total="TotalPages" :max="9" />
								</div>
								<div v-else>
									<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Upload my document -->
	<Suspense v-if="ratingReviewModal.value">
		<template #default>
			<rating-review-modal v-model:isModalShow="ratingReviewModal" @newDocumentUploaded="fetchJobSeekerProposals" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { defineAsyncComponent, onMounted, ref, watch } from '@vue/runtime-core';
import { dateFormat, currencyConverture, dateNewFormat } from '@/utils/mixins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRoute, useRouter } from 'vue-router';
import { faMap, faUser, faChevronDown, faChevronUp, faClock, faEye, faThumbsUp, faTimes, faStar, faThumbsDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { useI18n } from 'vue-i18n';
const RatingReviewModal = defineAsyncComponent(async () => {
	return import('@/views/job/components/RatingReviewModal.vue' /* webpackChunkName:"UploadMyDocument" */);
});
export default {
	name: 'JobDetail',
	components: {
		FontAwesomeIcon,
		RatingReviewModal,
		DefaultLoader,
	},
	setup() {
		//ref
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const value = true;
		const tableIndex = ref(0);
		const search = ref('');
		const isRatingReviewModal = ref(false);
		// gloal store
		const store = useStore();
		// global route
		const route = useRoute();

		// icon
		const mapIcon = faMap;
		const userIcon = faUser;
		// icons
		const MapMarkerIcon = faMapMarkerAlt;
		const eyeIcon = faEye;
		const approveIcon = faThumbsUp;
		const clockIcon = faClock;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const startIcon = faStar;
		const thumbsUp = faThumbsUp;
		const thumbsDown = faThumbsDown;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.manageGig')} - Way2Work`;

		// global router
		const router = useRouter();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			fetchJobSeekerProposals();
			store.dispatch('job/viewPostJobDetails', route.params.id);
		});

		/**
		 * computed Properties
		 * *******************************************************************
		 */

		const postJobDetail = computed(() => store.state.job.getJobPostViewDetails);

		// job seeker proposal list
		const jobSeekerProposalList = computed(() => store.getters['application/getJobSeekerProposalList']);

		const jobSeekerTotalProposalsCompany = computed(() => store.state.application.jobSeekerTotalProposalsCompany);

		const TotalPages = computed(() => {
			return Math.ceil(jobSeekerTotalProposalsCompany.value / maxItemsPerPage.value);
		});

		// application btn
		const proposalStatus = computed(() => {
			return item => {
				if (item.status === 'rejected') {
					return 'red__class';
				} else if (item.status === 'not_assigned') {
					return 'yellow_class';
				} else {
					return 'green_class';
				}
			};
		});

		// show upload my document model
		const ratingReviewModal = computed({
			get() {
				return isRatingReviewModal;
			},

			set(val) {
				isRatingReviewModal.value = val;
			},
		});

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(search, () => {
			fetchJobSeekerProposals();
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		const titleCase = str => {
			if (str) {
				return str[0].toUpperCase() + str.slice(1);
			}
		};

		// view document
		const ratingReviewModalShow = (proposalId, jobId, seekerId) => {
			isRatingReviewModal.value = true;
			store.commit('job/SET_STATE', {
				action: 'proposalId',
				data: proposalId,
			});
			store.commit('job/SET_STATE', {
				action: 'jobsId',
				data: jobId,
			});

			store.commit('job/SET_STATE', {
				action: 'seekerId',
				data: seekerId,
			});
		};
		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchJobSeekerProposals();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchJobSeekerProposals();
		};

		const fetchJobSeekerProposals = async () => {
			const jobID = route.params.id;
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				jobID: jobID,
			};
			store.dispatch('application/getJobSeekerProposals', payload);
		};

		const updateProposalStatus = (id, status) => {
			const payload = {
				id: id,
				status: status,
			};
			store.dispatch('application/updateJobProposalStatus', payload).then(() => {
				fetchJobSeekerProposals();
			});
		};

		const updateCmpVerifyStatus = (jobId, seekerId, status) => {
			const payload = {
				jobId: jobId,
				seekerId: seekerId,
				status: status,
			};
			store.dispatch('job/updateCmpVerifyStatus', payload).then(() => {
				fetchJobSeekerProposals();
			});
		};

		//view seeker invoice details
		const viewSeekerProfileDetail = id => {
			router.push({
				name: 'ViewSeekerRatingDetail',
				params: { id: id },
			});
		};

		// table open

		return {
			//ref
			t,
			dateFormat,
			currencyConverture,
			dateNewFormat,

			page,
			maxItemsPerPage,
			tableIndex,
			search,

			// icons
			eyeIcon,
			approveIcon,
			clockIcon,
			deleteIcon,
			arrowDown,
			arrowUp,
			value,
			startIcon,
			ratingReviewModal,
			thumbsUp,
			thumbsDown,
			MapMarkerIcon,
			//computed
			postJobDetail,
			jobSeekerProposalList,
			TotalPages,
			proposalStatus,
			// icons/
			mapIcon,
			userIcon,

			// methods
			titleCase,
			handlePageChange,
			updateSearchQuery,
			updateProposalStatus,
			ratingReviewModalShow,
			fetchJobSeekerProposals,
			updateCmpVerifyStatus,
			openTable,
			viewSeekerProfileDetail,
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
				display: block;
			}
		}
	}
}

.job__seekers_application {
	:deep(table) {
		min-width: max-content;
	}

	table {
		tr {
			.font-line {
				font-weight: 600;
				text-decoration: underline;
			}

			.view-doc {
				width: 50px;
				height: 50px;
				line-height: 50px;
				background-color: $colorLightRed;
				border-radius: 100%;
				display: inline-block;
				vertical-align: middle;

				svg {
					color: $coloRed;
					vertical-align: middle;
				}
			}

			.btn-common {
				font-size: 14px;
				display: block;
				margin-bottom: 8px;
			}
		}
	}

	.yellow-star {
		svg {
			color: #e4aa18;
		}
	}

	.grey-edit-grey {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-image: linear-gradient(#e1e4e9, #c8cbd1);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: none;
		pointer-events: none;

		svg {
			color: grey;
		}
	}
}

@media (max-width: 576px) {
	.job__seekers_application {
		padding: 15px 0px;

		.payment-pill-header {
			display: block;
			text-align: center;

			.pph-right {
				margin-top: 10px;
			}
		}
	}
}

.bg-disabed {
	background-color: rgb(184, 182, 182);
	color: #fff;
	padding: 5px 10px;
	border-radius: 50px;
}

.bg-disabed:hover {
	border: 1px solid rgb(184, 182, 182);
	background-color: #fff;
	color: rgb(184, 182, 182);
}

.bg-success {
	background-color: green;
	color: #fff;
	padding: 5px 10px;
	border-radius: 50px;
}

.bg-success:hover {
	border: 1px solid green;
	background-color: #000;
	color: #000;
}

.bg-danger {
	color: #fff;
	background-color: red;
	padding: 5px 10px;
	border-radius: 50px;
}

.bg-danger:hover {
	border: 1px solid red;
	background-color: #fff;
	color: #000;
}

.spacing-table {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	padding: 0 15px;

	@media (max-width: 768px) {
		padding: 0;
	}

	.spacing-table-head {
		display: flex;
		align-items: center;
		background-color: #000;
		color: #fff;
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
	}

	.invoice__row {
		display: flex;
		justify-content: space-between;
		border: 2px solid #f22d37;
		padding: 0.75rem;
		margin: 20px 0;
		border-radius: 20px;
	}

	.table-width {
		min-width: 915px;
	}

	.assign__status {
		padding: 8px 15px;
		width: auto;
		max-width: max-content;
		color: #fff;
		text-transform: uppercase;
		font-size: 12px;
		border-radius: 20px;
		display: flex;
		align-items: center;

		&.yellow_class {
			background-color: $colorWait;
		}

		&.red__class {
			background-color: $colorRed;
		}

		&.green_class {
			background-color: $colorApprove;
		}
	}
}

.table-responsive .table-auto {
	min-width: 915px;
}

.invoice__row.yellow_class {
	border-color: $colorWait;
	box-shadow: 1px 1px 5px rgb(207, 204, 204);
}

.invoice__row.red__class {
	border-color: $coloRed;
	box-shadow: 1px 1px 5px rgb(207, 204, 204);
}

.invoice__row.green_class {
	border-color: $colorApprove;
	box-shadow: 0px 0px 5px rgb(207, 204, 204);
}

.large-table {
	display: block;

	@media (max-width: 1024px) {
		display: none;
	}
}

.job__seekers_application {
	.header__right {
		.form-control {
			padding: 12px 15px;
			background-color: #fff;
			height: 50px;
			border: 1px solid #e7e7e7;
			border-radius: 25px;
			width: 100%;
			color: $colorPurple;
			position: relative;
			margin-left: auto;

			@media (max-width: 575px) {
				height: 40px;
				line-height: 19px;
				padding: 10px 15px;
				font-size: 14px;
			}

			input {
				background-color: transparent;
			}

			span {
				width: 50px;
				height: 50px;
				background-color: #ff4b57;
				border-radius: 50%;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;

				@media (max-width: 575px) {
					height: 40px;
					width: 40px;

					.fa-search {
						width: 0.9em;
					}
				}
			}

			::placeholder {
				color: #ff4b57;
				opacity: 1;
			}
		}
	}
}

.responsive-table {
	display: none;

	.invoice__row {
		display: block;
		padding: 0px;
		margin: 0;
		border: none;
	}

	@media (max-width: 1024px) {
		display: block;
	}

	.table-border {
		border: 1px solid #ccc;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 15px;
	}

	.collapse-div {
		border-radius: 10px !important;
		padding: 20px;
		background-color: #f5f5f5;
		border: 2px solid #f22d37;

		@media (max-width: 575px) {
			padding: 10px;
		}
	}

	.min-width {
		max-width: 190px;
	}
}

.border-padding {
	border-bottom-left-radius: 10px;
	background-color: #f5f5f5;
	border-bottom-right-radius: 10px;
	padding: 0 !important;
}

.small-grey-edit {
	.grey-edit {
		width: 42px;
		height: 42px;
		min-width: 42px;
	}
}

.bg-success {
	background-color: green;
	color: #fff;
	padding: 5px 10px;
	border-radius: 50px;
}

.bg-success:hover {
	border: 1px solid green;
	background-color: #000;
	color: #000;
}

.sts-wait {
	background-color: $colorWait;
	color: #fff;
	padding: 10px 20px;
	border-radius: 50px;
}

.sts-reject {
	background-color: $colorApprove;
	color: #fff;
	padding: 10px 20px;
	border-radius: 50px;
	@media (max-width: 575px) {
		padding: 5px 10px;
		font-size: 12px;
	}
}

.review-user {
	max-width: 50px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	overflow: hidden;

	@media (max-width: 768px) {
		min-width: 50px;
	}

	img {
		object-fit: cover;
	}
}
</style>
