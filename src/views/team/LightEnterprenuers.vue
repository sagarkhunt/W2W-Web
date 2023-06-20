<template>
	<!-- job proposals list -->
	<div class="job__seekers_application card-space searchbar_table">
		<!-- header -->
		<div class="payment-pill-header mb-3">
			<!-- title -->
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('myApplications.LightEnterpreneurs') }}
				</h5>
			</div>
		</div>
		<div class="header__right">
			<div class="form-control mb-3">
				<input type="text" class="border-0 w-100" v-model="search" :placeholder="t('common.search')" />
				<span class="text-light">
					<FontAwesomeIcon icon="search" />
				</span>
			</div>
		</div>

		<div class="spacing-table large-table px-0">
			<div class="table-width">
				<div class="spacing-table-head">
					<span class="w-100">{{ t('myApplications.lightEnterpreneurName') }} </span>
					<span class="w-100 text-center">{{ t('myApplications.applicationDate') }}</span>
					<span class="w-100 text-center">{{ t('myApplications.seekForgig') }}</span>
					<span class="w-100 text-center">{{ t('myApplications.resume') }}</span>
					<span class="w-100 text-center">{{ t('common.actions') }}</span>
				</div>
			</div>
			<div v-if="jobSeekerProposalList.length > 0">
				<div :class="`invoice__row ${proposalStatus(item)}`" :key="i" v-for="(item, i) in jobSeekerProposalList">
					<span class="font border-right w-100 me-md-2 d-flex align-items-center">
						<span v-if="item.file_path">
							<div class="review-user me-2">
								<img :src="item.file_path" alt="img" class="img-fluid w-100 h-100" />
							</div>
						</span>
						<span v-else>
							<div class="review-user me-2">
								<img src="@/assets/images/icon_png.png" alt="" class="img-fluid w-100 h-100" />
							</div>
						</span>
						<span v-if="item.jobSeeker?.one_seeker_resume?.one_resume_request?.status == 'approved'">
							{{ item?.full_name }}
						</span>
						<span v-else>
							<p class="ms-2">
								{{ displayUserNameExtract(item) }}
							</p>
						</span>
					</span>

					<span class="font border-right w-100 me-md-2 d-flex align-items-center justify-content-center">
						{{ dateFormat(item.created_at) }}
					</span>
					<span class="font border-right w-100 me-md-2 d-flex align-items-center justify-content-center">
						{{ item.jobSeeker.send_job_alert == true ? t('myApplications.yes') : t('myApplications.no') }}
					</span>

					<span class="font border-right w-100 me-md-2 d-flex align-items-center justify-content-center">
						<span v-if="item.jobSeeker.one_seeker_resume">
							<div class="tbl-status grey-edit">
								<span v-if="item.jobSeeker?.one_seeker_resume?.one_resume_request?.status == 'approved'">
									<button class="tbl-action grey-edit" @click="viewResumeDocument(item?.jobSeeker?.one_seeker_resume?.file_path)">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</span>
								<span v-else>
									<button class="tbl-action grey-edit">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</span>
							</div>
						</span>
						<span v-else>
							-
						</span>
					</span>

					<span class="w-100 d-flex align-items-center justify-content-center">
						<div class="tbl-status grey-edit d-flex align-items-center">
							<button class="tbl-action grey-edit d-flex align-items-center" @click="viewSeekerRatingDetail(item.jobSeeker.id)">
								<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
							</button>
						</div>
						<span class="ml-1">
							<span v-if="item.jobSeeker.one_seeker_resume">
								<!-- pending, approved, declined -->
								<div class="tbl-status w-100" v-if="item.jobSeeker?.one_seeker_resume.one_resume_request == null">
									<button :class="`assign__status bg-warning ${proposalStatus(item)}`" @click="requestResumeAccess(item.jobSeeker?.one_seeker_resume.id)">
										<span class="d-flex align-items-center">
											<FontAwesomeIcon :icon="clockIcon" class="me-1" />
											{{ t('resume.request') }}
										</span>
									</button>
								</div>
								<div class="tbl-status" v-else-if="item.jobSeeker?.one_seeker_resume?.one_resume_request?.status == 'pending'">
									<button :class="`assign__status bg-info ${proposalStatus(item)}`">
										<span class="sts-approve d-flex align-items-center">
											<FontAwesomeIcon :icon="approveIcon" />
											{{ t('jobSeekerTeam.pending') }}
										</span>
									</button>
								</div>
								<div class="tbl-status" v-else-if="item.jobSeeker?.one_seeker_resume?.one_resume_request?.status == 'approved'">
									<button :class="`assign__status bg-success ${proposalStatus(item)}`">
										<span class="sts-approve d-flex align-items-center">
											<FontAwesomeIcon :icon="approveIcon" class="me-1" />
											{{ t('jobSeekerTeam.accepted') }}
										</span>
									</button>
								</div>
								<div class="tbl-status" v-else>
									<button :class="`assign__status bg-danger ${proposalStatus(item)}`">
										<span class="sts-reject d-flex align-items-center">
											<FontAwesomeIcon :icon="deleteIcon" class="me-1" />
											{{ t('jobSeekerTeam.rejected') }}
										</span>
									</button>
								</div>
							</span>
							<span v-else> </span>
						</span>
					</span>
				</div>
				<pagination @changePage="handlePageChange" :value="page" :total="TotalPages" :max="9" />
			</div>
			<div v-else>
				<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
			</div>
		</div>
		<div class="spacing-table responsive-table">
			<div v-if="jobSeekerProposalList.length > 0">
				<div :class="`invoice__row ${proposalStatus(item)} mb-3`" :key="i" v-for="(item, i) in jobSeekerProposalList">
					<div class="collapse-div" @click="openTable(i)">
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<div class="w-100 me-md-2 d-flex align-items-center">
									<span class="invoice__data ">
										{{ dateFormat(item.created_at) }}
									</span>
								</div>
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

						<div class="border-padding">
							<div v-if="i == tableIndex" class="table-border">
								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<span class="w-100 text-xs">{{ t('myApplications.lightEnterpreneurName') }}</span>
									<div class="w-100 me-md-2 d-flex align-items-center">
										<span class="font w-100 me-md-2 d-flex align-items-center">
											<div class="review-user">
												<img :src="item?.file_path" alt="img" class="img-fluid w-100 h-100" />
											</div>
											<span v-if="item.jobSeeker?.one_seeker_resume?.one_resume_request?.status == 'approved'">
												{{ item?.full_name }}
											</span>
											<span v-else>
												<p class="ms-2">
													{{ displayUserNameExtract(item) }}
												</p>
											</span>
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white">
									<span class="w-100 text-xs">{{ t('myApplications.applicationDate') }}</span>
									<span class="font w-100 me-md-2 d-flex align-items-center text-xs">{{ dateFormat(item.created_at) }}</span>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white">
									<span class="w-100 text-xs">{{ t('common.actions') }}</span>
									<span class="w-100">
										<div class="tbl-status">
											<button class="tbl-action grey-edit" @click="viewSeekerRatingDetail(item.jobSeeker.id)">
												<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
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
</template>

<script>
import { ref, onMounted, computed, watch } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faClock, faEye, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';

import { dateFormat } from '@/utils/mixins';
import { useRouter } from 'vue-router';

export default {
	name: 'ManageLightEnterPrenuers',

	// components
	components: {
		FontAwesomeIcon,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const value = true;
		const tableIndex = ref(0);
		const search = ref(null);

		// icons
		const eyeIcon = faEye;
		const approveIcon = faThumbsUp;
		const clockIcon = faClock;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const viewIcon = faEye;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.lightEntrepreneurs')} - Way2Work`;

		// global store
		const store = useStore();

		// global router
		const router = useRouter();

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch current users educations
			fetchJobSeekerProposals();
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		// job seeker proposal list
		const jobSeekerProposalList = computed(() => store.getters['job/getCompanyJobSeekerList']);

		// full name show
		const displayUserNameExtract = computed(() => {
			return tr => {
				return tr.jobSeeker?.one_seeker_resume?.one_seeker_request?.status === 'approved' ? tr.full_name : `${tr.full_name.substr(0, 3)} *****`;
			};
		});

		// total job seeker proposals
		const totalJobSeekerProposals = computed(() => store.state.job.jobSeekerTotalProposals);

		const TotalPages = computed(() => {
			return Math.ceil(totalJobSeekerProposals.value / maxItemsPerPage.value);
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

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch job seeker proposals
		const fetchJobSeekerProposals = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
			};

			store.dispatch('job/getComapnyJobSeeker', payload);
		};

		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchJobSeekerProposals();
		};

		const updateProposalStatus = (id, status) => {
			const payload = {
				id: id,
				status: status,
			};
			store.dispatch('job/updateJobProposalStatus', payload).then(() => {
				fetchJobSeekerProposals();
			});
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		const viewSeekerRatingDetail = id => {
			router.push({
				name: 'ViewSeekerRatingDetail',
				params: { id: id },
			});
		};

		// view document
		const viewResumeDocument = link => {
			window.open(link);
		};

		// request resume access
		const requestResumeAccess = async id => {
			await store.dispatch('resume/requestResumeAccess', { resumeId: id }).then(() => fetchJobSeekerProposals());
		};

		/**
		 * Methods
		 * *******************************************************************
		 */
		watch(search, () => {
			page.value = 1;
			fetchJobSeekerProposals();
		});

		return {
			// refs
			page,
			maxItemsPerPage,
			dateFormat,
			tableIndex,
			search,

			// icons
			eyeIcon,
			approveIcon,
			clockIcon,
			deleteIcon,
			arrowDown,
			arrowUp,
			viewIcon,

			// translate function
			t,

			value,

			// computed
			jobSeekerProposalList,
			totalJobSeekerProposals,
			proposalStatus,
			TotalPages,
			displayUserNameExtract,
			// methods
			handlePageChange,
			updateProposalStatus,
			openTable,
			viewSeekerRatingDetail,
			viewResumeDocument,
			requestResumeAccess,
		};
	},
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.job__seekers_application {

	.payment-pill-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

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

	.light-enterpreneur {
		max-width: 40px;
		width: 100%;
	}
}

.table td,
.table th {
	border-right: 1px solid #dee2e6;
}

.table td:first-child {
	border-left: 1px solid #dee2e6;
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

	@media (max-width: 575px) {
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

	@media (max-width: 1300px) {
		display: none;
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

	@media (max-width: 1300px) {
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

.review-user {
	min-width: 50px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	overflow: hidden;

	@media (max-width: 576px) {
		max-width: 30px;
	}

	img {
		object-fit: cover;
	}
}

.border-padding {
	border-bottom-left-radius: 10px;
	background-color: #f5f5f5;
	border-bottom-right-radius: 10px;
	padding: 0 !important;
}

.header__right {
	.form-control {
		padding: 12px 15px;
		background-color: #fff;
		height: 50px;
		border: 1px solid #e7e7e7;
		border-radius: 25px;
		width: 30%;
		color: $colorPurple;
		position: relative;
		margin-left: auto;

		@media (max-width: 768px) {
			width: 100%;
		}

		@media (max-width: 576px) {
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

.text-xs {
	@media (max-width: 1024px) {
		font-size: 15px;
	}
	@media (max-width: 1575px) {
		font-size: 14px;
	}
}
</style>
