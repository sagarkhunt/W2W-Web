<template>
	<div class="job__proposals card-space">
		<!-- header -->
		<div class="payment-pill-header">
			<!-- title -->
			<div class="pph-left">
				<h5 class="title-lg">{{ t('myApplications.myApplication') }}</h5>
			</div>
		</div>

		<!-- job proposals list -->
		<div class="large-table">
			<div class="overflow-auto">
				<div class="applications-table spacing-table">
					<div class="spacing-table-head">
						<div class="company-name-width" sort-key="job_title" @click="handleSort">
							{{ t('myApplications.added_by') }}
							<span v-if="sortType && sortKeyName == 'job_title' && sortType === 'ASC'">
								<FontAwesomeIcon :icon="upArrow" />
							</span>

							<span v-if="sortType && sortKeyName == 'job_title' && sortType === 'DESC'">
								<FontAwesomeIcon :icon="downArrow" />
							</span>
						</div>
						<div class="application-name-width d-flex justify-content-center" sort-key="job_title" @click="handleSort">
							{{ t('myApplications.applicationName') }}
							<span v-if="sortType && sortKeyName == 'job_title' && sortType === 'ASC'">
								<FontAwesomeIcon :icon="upArrow" />
							</span>

							<span v-if="sortType && sortKeyName == 'job_title' && sortType === 'DESC'">
								<FontAwesomeIcon :icon="downArrow" />
							</span>
						</div>
						<div class="applied-width d-flex justify-content-center" sort-key="created_at" @click="handleSort">
							{{ t('myApplications.appliedOn') }}
							<span v-if="sortType && sortKeyName == 'created_at' && sortType === 'ASC'">
								<FontAwesomeIcon :icon="upArrow" />
							</span>

							<span v-if="sortType && sortKeyName == 'created_at' && sortType === 'DESC'">
								<FontAwesomeIcon :icon="downArrow" />
							</span>
						</div>
						<div class="button-header-width d-flex justify-content-center">
							{{ t('common.status') }}
						</div>
						<div class="button-header-width d-flex justify-content-center">
							{{ t('myApplications.leWorkStatus') }}
						</div>
						<div class="action-width d-flex justify-content-center align-items-center">
							{{ t('common.actions') }}
						</div>
					</div>
					<div class="job__list" v-if="jobProposalList.length">
						<div :class="`invoice__row ${proposalStatus(item)}`" :key="i" v-for="(item, i) in jobProposalList">
						
							<div class="border-right application-width px-2 d-flex align-items-center justify-content-start">
								<span class="font d-flex align-items-center">
									<span v-if="item?.job?.company?.user?.file_path">
										<div class="review-user me-4">
											<img :src="item?.job?.company?.user?.file_path" alt="img" class="img-fluid w-100 h-100" />
										</div>
									</span>
									<span v-else>
										<div class="review-user me-4">
											<img src="@/assets/images/icon_png.png" alt="" class="img-fluid w-100 h-100" />
										</div>
									</span>
								</span>
								<span class="invoice__data">
									{{ item?.job?.company?.company_name || '-' }}
								</span>
							</div>
							<div class="border-right application-width px-2 d-flex align-items-center justify-content-center">
								<span class="invoice__data ">
									<router-link
										:to="{
											name: 'ViewApplicationDetail',
											params: { id: item.id },
										}"
									>
										{{ item.job?.job_title || '-' }}
									</router-link>
								</span>
							</div>

							<div class="border-right applied-width px-2 d-flex align-items-center justify-content-center">
								<span class="invoice__data ">
									{{ dateFormat(item.created_at) }}
								</span>
							</div>

							<div class="border-right button-width d-flex align-items-center justify-content-center">
								<span class="assign__status">
									<span :class="`assign__status ${proposalStatus(item)}`">
										<span v-if="item.status === 'not_assigned'">
											<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'; margin-right: 5px;" />
										</span>
										<span v-else>
											<span v-if="item.status === 'rejected'">
												<FontAwesomeIcon :icon="deleteIcon" style="text-align: 'center'; margin-right: 5px;" />
											</span>
											<span v-else> <FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'; margin-right: 5px;" /> </span
										></span>
										<!-- {{ item.status || '-' }} -->
										<span v-if="item.status === 'not_assigned'" class="whitespace-nowrap">
											{{ t('myApplications.notAssigned') }}
										</span>
										<span v-else>
											<span v-if="item.status === 'rejected'">
												{{ t('myApplications.rejected') }}
											</span>
											<span v-else>
												{{ t('myApplications.assigned') }}
											</span>
										</span>
									</span>
								</span>
							</div>

							<div class="border-right button-width d-flex align-items-center justify-content-center">
								<span class="assign__status" v-if="item.le_work_status === 'pending'">
									<span :class="`assign__status yellow_class`">
										<FontAwesomeIcon :icon="clockIcon" style="text-align: 'center'; margin-right: 5px;" />
										{{ 'Wating' }}
									</span>
								</span>
								<span class="assign__status" v-else-if="item.le_work_status === 'active'">
									<span :class="`assign__status green_class`">
										<FontAwesomeIcon :icon="checkIcon" style="text-align: 'center'; margin-right: 5px;" />
										{{ 'ACTIVE' }}
									</span>
								</span>
								<span class="assign__status" v-else>
									<span :class="`assign__status green_class`">
										<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'; margin-right: 5px;" />
										{{ 'COMPLETED' }}
									</span>
								</span>
							</div>

							<div class="action-width d-flex align-items-center justify-content-center">
								<div class="d-flex align-items-center justify-content-center">
									<span v-if="item.le_work_status === 'active'">
										<ToolTip :title="t('toolTip.leWorkStatus')">
											<button class="tbl-action approve-icon ml-2" @click="leWorkStatusUpdate(item.id, 'completed')">
												<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
											</button>
										</ToolTip>
									</span>
									<span v-else-if="item.le_work_status === 'pending'">
										<button class="tbl-action grey-edit-grey ml-2">
											<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'" />
										</button>
									</span>
									<span v-else>
										<button class="tbl-action grey-edit-grey ml-2">
											<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'" />
										</button>
									</span>
									<ToolTip :title="t('toolTip.Viewapplicationdetail')">
										<router-link
											:to="{
												name: 'ViewApplicationDetail',
												params: { id: item.id },
											}"
										>
											<button class="tbl-action grey-edit ml-2">
												<FontAwesomeIcon :icon="viewIcon" />
											</button>
										</router-link>
									</ToolTip>
									<ToolTip :title="t('toolTip.Deleteapplication')">
										<button class="tbl-action red-close  ml-2" @click="deleteProposal(item.id)">
											<FontAwesomeIcon :icon="removeIcon" />
										</button>
									</ToolTip>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="text-center mt-4">{{ t('common.noDataAvailable') }}</div>
				</div>
			</div>
			<pagination @changePage="handlePageChange" v-model:value="page" :total="countTotalPage" :max="9" />
		</div>

		<!-- job proposals list -->
		<div class="spacing-table responsive-table">
			<div class="job__list" v-if="jobProposalList.length">
				<div :class="`invoice__row ${proposalStatus(item)} mb-3`" :key="i" v-for="(item, i) in jobProposalList">
					<div class="collapse-div" @click="openTable(i, item)">
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<div class="w-100 me-2 d-flex align-items-center">
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
								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2 border-bottom">
									<div class="w-100 min-width">{{ t('myApplications.logo') }}</div>
									<div class="w-100 me-2 d-flex align-items-center">
										<span class="font d-flex align-items-center">
											<span v-if="item?.job?.company?.user?.file_path">
												<div class="review-user me-2">
													<img :src="item?.job?.company?.user?.file_path" alt="img" class="img-fluid w-100 h-100" />
												</div>
											</span>
											<span v-else>
												<div class="review-user me-2">
													<img src="@/assets/images/icon_png.png" alt="" class="img-fluid w-100 h-100" />
												</div>
											</span>
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2 border-bottom">
									<div class="w-100 min-width">{{ t('myApplications.applicationName') }}</div>
									<div class="w-100 me-2 d-flex align-items-center">
										<span class="invoice__data">
											{{ item.job?.job_title || '-' }}
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2 border-bottom">
									<div class="w-100 min-width">{{ t('myApplications.appliedOn') }}</div>
									<div class="w-100 me-2 d-flex align-items-center">
										<span class="invoice__data ">
											{{ dateFormat(item.created_at) }}
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2 border-bottom">
									<div class="w-100 min-width">{{ t('common.status') }}</div>
									<div class="w-100 me-2 d-flex align-items-center">
										<span class="assign__status">
											<span :class="`assign__status ${proposalStatus(item)}`">
												<span v-if="item.status === 'not_assigned'">
													<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'; margin-right: 5px;" />
												</span>
												<span v-else>
													<span v-if="item.status === 'rejected'">
														<FontAwesomeIcon :icon="deleteIcon" style="text-align: 'center'; margin-right: 5px;" />
													</span>
													<span v-else> <FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'; margin-right: 5px;" /> </span
												></span>
												{{ item.status || '-' }}
											</span>
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2 border-bottom">
									<div class="w-100 min-width">
										{{ t('myApplications.leWorkStatus') }}
									</div>
									<div class="w-100 me-2 d-flex align-items-center">
										<span class="assign__status" v-if="item.le_work_status === 'pending'">
											<span :class="`assign__status yellow_class`"> <FontAwesomeIcon :icon="clockIcon" style="text-align: 'center'; margin-right: 5px;" />{{ 'Wating' }} </span>
										</span>
										<span class="assign__status" v-else-if="item.le_work_status === 'active'" @click="leWorkStatusUpdate(item.id, 'completed')">
											<span :class="`assign__status green_class`"> <FontAwesomeIcon :icon="checkIcon" style="text-align: 'center'; margin-right: 5px;" />{{ 'ACTIVE' }} </span>
										</span>
										<span class="assign__status" v-else>
											<span :class="`assign__status green_class`"> <FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'; margin-right: 5px;" />{{ 'COMPLETED' }} </span>
										</span>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 bg-white gap-2">
									<div class="w-100 min-width">
										{{ t('fieldList.action') }}
									</div>
									<div class="w-100">
										<div class="d-flex align-items-center justify-content-start">
											<ToolTip :title="t('toolTip.Viewapplicationdetail')">
												<router-link
													:to="{
														name: 'ViewApplicationDetail',
														params: { id: item.id },
													}"
												>
													<button class="tbl-action grey-edit">
														<FontAwesomeIcon :icon="viewIcon" />
													</button>
												</router-link>
											</ToolTip>
											<ToolTip :title="t('toolTip.Deleteapplication')">
												<button class="tbl-action red-close ml-2" @click="deleteProposal(item.id)">
													<FontAwesomeIcon :icon="removeIcon" />
												</button>
											</ToolTip>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<pagination @changePage="handlePageChange" v-model:value="page" :total="countTotalPage" :max="9" />
			</div>
			<div v-else class="text-center">{{ t('projectMarketPage.noJobFound') }}</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faTimes, faEye, faAngleUp, faAngleDown, faThumbsUp, faThumbsDown, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '@/components/sweetalert';
import { useI18n } from 'vue-i18n';

import { dateFormat } from '@/utils/mixins';

export default {
	name: 'JobProposal',

	components: {
		FontAwesomeIcon,
	},

	setup() {
		// refs
		const maxItemsPerPage = ref(10);
		const page = ref(1);
		const search = ref(null);
		const tableIndex = ref(0);
		const sortType = ref(null);
		const sortKeyName = ref(null);
		const order = ref([]);

		// icons
		const removeIcon = faTimes;
		const thumbsUp = faThumbsUp;
		const thumbsDown = faThumbsDown;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const viewIcon = faEye;
		const upArrow = faAngleUp;
		const downArrow = faAngleDown;
		const clockIcon = faClock;
		const deleteIcon = faTimes;
		const checkIcon = faCheckCircle;

		// global store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.myApplications')} - Way2Work`;

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(() => {
			// fetch matching job list
			fetchJobProposals();
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		// job proposal list
		const jobProposalList = computed(() => store.getters['job/getJobProposalsList']);

		const countTotalPage = computed(() => {
			return Math.ceil(totalJobProposals.value / maxItemsPerPage.value);
		});

		// total job proposal
		const totalJobProposals = computed(() => store.state.job.totalCount);

		// application btn
		const proposalStatus = computed(() => {
			return item => {
				if (item.status === 'rejected') {
					return 'red__class ';
				} else if (item.status === 'not_assigned') {
					return 'yellow_class';
				} else {
					return 'green_class';
				}
			};
		});

		const leWorkStatus = computed(() => {
			return item => {
				if (item.status === 'pending') {
					return 'yellow_class';
				} else if (item.status === 'completed') {
					return 'green_class';
				} else {
					return 'green_class';
				}
			};
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// fetch job proposals
		const fetchJobProposals = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				order: order.value,
			};

			await store.dispatch('job/getJobProposal', payload);
		};

		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchJobProposals();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchJobProposals();
		};

		// delete proposals
		const deleteProposal = async id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text:  t('validation.youWantDelete',{
					field:'conformationMessage.jobProposal'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async result => {
				if (result.isConfirmed) {
					// apply proposal
					await store.dispatch('job/deleteJobProposal', id).then(() => {
						fetchJobProposals();
					});
				}
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

		const handleSort = e => {
			const sortKey = e.target.getAttribute('sort-key');
			if (sortKey) {
				sortType.value = sortType.value && sortKeyName.value === sortKey && sortType.value === 'DESC' ? 'ASC' : 'DESC';
				sortKeyName.value = sortKey;
				order.value = [sortKey, sortType.value];
				fetchJobProposals();
			}
		};

		const leWorkStatusUpdate = (jobId, status) => {
			const payload = {
				id: jobId,
				status: status,
			};
			store.dispatch('job/updateLeWorkStatus', payload).then(() => {
				fetchJobProposals();
			});
		};

		return {
			handleSort,

			// translate function
			t,

			// refs
			page,
			dateFormat,
			maxItemsPerPage,
			tableIndex,

			// icons
			sortType,
			sortKeyName,
			removeIcon,
			arrowDown,
			arrowUp,
			viewIcon,
			upArrow,
			downArrow,
			thumbsUp,
			thumbsDown,
			clockIcon,
			deleteIcon,
			checkIcon,

			// computed
			jobProposalList,
			totalJobProposals,
			proposalStatus,
			leWorkStatus,
			countTotalPage,

			// methods
			fetchJobProposals,
			deleteProposal,
			handlePageChange,
			updateSearchQuery,
			openTable,
			leWorkStatusUpdate,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.job__proposals {
	.payment-pill-header {
		.title-lg {
			margin: 0 0 30px 0;
		}
	}

	:deep(table) {
		min-width: max-content;
	}

	table {
		tr {
			&:last-child {
				border-bottom: transparent;
			}

			.assign__status {
				padding: 8px 0px;
				width: 100%;
				max-width: 100px;
				color: #fff;
				text-transform: uppercase;
				font-size: 12px;
				border-radius: 20px;
				display: flex;
				align-items: center;
				justify-content: center;

				&.not-assinged {
					background-color: $colorWait;
				}

				&.rejected {
					background-color: $colorRed;
				}
			}
		}
	}

	table td {
		border-right: 1px solid #dee2e6;

		&:last-child {
			border-right: transparent;
		}
	}
}

.spacing-table {
	&.applications-table {
		@media (max-width: 1550px) {
			min-width: 1120px;
		}
	}
	.spacing-table-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #000;
		color: #fff;
		padding: 0.75rem 0.8rem;
		border-radius: 50px;
	}

	.invoice__row {
		display: flex;
		justify-content: space-between;
		border: 2px solid #f22d37;
		padding: 0 0.75rem;
		margin: 20px 0;
		border-radius: 20px;
	}

	.assign__status {
		padding: 12px 0;
		width: 100%;
		min-width: 100px;
		color: #fff;
		text-transform: uppercase;
		font-size: 14px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;

		&.green_class {
			background-color: $colorApprove;
		}

		&.red__class {
			background-color: $colorRed;
		}

		&.yellow_class {
			background-color: $colorWait;
		}

		@media (max-width: 1024px) {
			padding: 10px 60px;
			max-width: 100px;
			min-width: auto;
			font-size: 12px;
		}

		@media (max-width: 575px) {
			padding: 7px 56px;
			font-size: 11px;
		}
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
		min-width: 110px;
		font-size: 16px;
		@media (max-width: 575px) {
			font-size: 14px;
		}
	}
}

.whitespace-nowrap {
	white-space: nowrap;
}

.border-padding {
	border-bottom-left-radius: 10px;
	background-color: #f5f5f5;
	border-bottom-right-radius: 10px;
	padding: 0 !important;
}

.button-width {
	width: 12%;
	padding: 0 15px;
	min-width: 12%;

	@media (max-width: 1800px) {
		width: 17%;
	}

	@media (max-width: 1600px) {
		width: 19%;
	}
}

.profile-logo-head {
	width: 10%;

	@media (max-width: 1800px) {
		width: 8%;
	}
}

.profile-logo {
	width: 10%;

	@media (max-width: 1800px) {
		width: 8%;
	}
}

.button-header-width {
	width: 12%;
	min-width: 12%;

	@media (max-width: 1800px) {
		width: 17%;
	}

	@media (max-width: 1600px) {
		width: 19%;
	}
}

.application-width {
	width: 25%;

}

.company-name-width {
	width: 25%;
}
.application-name-width {
	width: 25%;

}

.applied-width {
	width: 16%;

	@media (max-width: 1800px) {
		width: 16%;
	}
}

.action-width {
	width: 13%;

	@media (max-width: 1800px) {
		width: 19%;
	}

	@media (max-width: 1600px) {
		width: 16%;
		min-width: 16%;
	}
}
</style>
