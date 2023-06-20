<template>
	<div class="invoice__list card-space">
		<!-- invoice list Seeker -->
		<div class="row" v-if="userTypeInfo == 'jobseeker'">
			<!-- header -->
			<div class="payment-pill-header">
				<div class="pph-left">
					<h5 class="title-lg">{{ t('sidebar.jobseekerTeam') }}</h5>
				</div>
				<ToolTip :title="t('toolTip.addTeamName')">
					<div class="pph-right justify-content-end d-flex">
						<button class="btn-common btn-red" type="button" @click="showAddTeamNameModal = true">+ {{ t('invoiceList.add') }}</button>
					</div>
				</ToolTip>
			</div>

			<!-- invoice list Seeker -->
			<new-data-table
				:data="groupInvoiceList || []"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInvoicesGroup"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="large-table searchbar_table"
				@sort="handleSort"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{ t('common.Rows') }}</label>
							<div class="dropdown ml-0">
								<a
									class="
										dropdown-toggle
										btn-common btn-gray-border
										tbl-drop
									"
									href="#"
									id="navbarDropdownLETeamList"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownLETeamListAria">
									<li @click="changePerPageMaxItems(5)">
										<span class="dropdown-item tbl-drop-link">
											5
										</span>
									</li>
									<li @click="changePerPageMaxItems(10)">
										<span class="dropdown-item tbl-drop-link">
											10
										</span>
									</li>
									<li @click="changePerPageMaxItems(15)">
										<span class="dropdown-item tbl-drop-link">
											15
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</template>

				<template #thead>
					<new-tb-th sort-key="created_at">{{ t('fieldList.creationOn') }}</new-tb-th>
					<new-tb-th sort-key="team_name">{{ t('jobSeekerTeam.teamName') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.Role') }}</new-tb-th>
					<new-tb-th>{{ t('jobSeekerTeam.totalTeamMember') }}</new-tb-th>
					<new-tb-th>{{ t('jobSeekerTeam.totalTeamInvoice') }}</new-tb-th>
					<new-tb-th>{{ t('jobSeekerTeam.teamInvoiceSum') }}</new-tb-th>
					<new-tb-th class="w-10">{{ t('common.actions') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>

						<new-tb-td>{{ tr.team_name || '-' }}</new-tb-td>
						<new-tb-td>
							<div class="tbl-status" v-if="tr.createdById === seekerId.jobSeeker.id">
								<span>{{ t('jobSeekerTeam.leader') }}</span>
							</div>
							<div class="tbl-status" v-else>
								<span>{{ t('jobSeekerTeam.member') }}</span>
							</div>
						</new-tb-td>

						<new-tb-td>{{ tr.team_members || 0 }}</new-tb-td>
						<new-tb-td>{{ tr.teamInvoiceCount || 0 }}</new-tb-td>
						<new-tb-td>€ {{ currencyConverture(tr.invoiceTotalSum) || 0 }}</new-tb-td>
						<new-tb-td>
							<div class="d-flex align-items-center justify-content-center">
								<ToolTip :title="t('toolTip.editJobSeekerTeam')">
									<button class="tbl-action grey-edit" @click="viewJobseekerTeam(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.deleteJobSeekerTeam')">
									<span v-if="tr.createdById === seekerId.jobSeeker.id">
										<button class="tbl-action red-close  ml-2" @click="deleteInvoice(tr.id)">
											<FontAwesomeIcon :icon="deleteIcon" />
										</button>
									</span>
									<span v-else>
										<button class="tbl-action grey-edit-grey  ml-2" @click="deleteInvoice(tr.id)" disabled>
											<FontAwesomeIcon :icon="deleteIcon" />
										</button>
									</span>
								</ToolTip>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>

			<div>
				<new-data-table
					:data="groupInvoiceList || []"
					sst
					pagination
					search
					@search="updateSearchQuery"
					:total="totalInvoicesGroup"
					:max-items="maxItemsPerPage"
					@change-page="handleChangePage"
					class="responsive-table searchbar_table"
				>
					<template #header>
						<div class="select__limit">
							<div>
								<label class="tbl_label">{{ t('common.Rows') }}</label>
								<div class="dropdown ml-0">
									<a
										class="
										dropdown-toggle
										btn-common btn-gray-border
										tbl-drop
									"
										href="#"
										id="navbarDropdownLETeamListMobile"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<p class="d-inline-block head">{{ t('common.Showing') }}</p>
										<span class="ml-2">{{ maxItemsPerPage }}</span>
									</a>
									<ul class="dropdown-menu" aria-labelledby="navbarDropdownLETeamListMobileAria">
										<li @click="changePerPageMaxItems(5)">
											<span class="dropdown-item tbl-drop-link">
												5
											</span>
										</li>
										<li @click="changePerPageMaxItems(10)">
											<span class="dropdown-item tbl-drop-link">
												10
											</span>
										</li>
										<li @click="changePerPageMaxItems(15)">
											<span class="dropdown-item tbl-drop-link">
												15
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</template>

					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
							<div>
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
									<div class="d-flex">
										<div>
											<div>
												{{ tr.team_name || '-' }}
											</div>
											<div>
												{{ dateFormat(tr.created_at) || '-' }}
											</div>
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
										<new-tb-tr>
											<new-tb-th>{{ t('fieldList.creationOn') }}</new-tb-th>

											<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('jobSeekerTeam.teamName') }}</new-tb-th>
											<new-tb-td>{{ tr.team_name || '-' }}</new-tb-td>
										</new-tb-tr>
										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.Role') }} </new-tb-th>
											<new-tb-td>{{ tr.createdById === seekerId.jobSeeker.id ? t('jobSeekerTeam.leader') : t('jobSeekerTeam.member') || '-' }}</new-tb-td>
										</new-tb-tr>
										<new-tb-tr>
											<new-tb-th>{{ t('jobSeekerTeam.totalTeamMember') }}</new-tb-th>
											<new-tb-td>{{ tr.team_members || 0 }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('common.actions') }}</new-tb-th>

											<new-tb-td>
												<div class="d-flex align-items-center">
													<button class="tbl-action grey-edit" @click="viewJobseekerTeam(tr.id)">
														<FontAwesomeIcon :icon="editIcon" />
													</button>
													<span v-if="tr.createdById === seekerId.jobSeeker.id">
														<button class="tbl-action red-close  ml-2" @click="deleteInvoice(tr.id)">
															<FontAwesomeIcon :icon="deleteIcon" />
														</button>
													</span>
													<span v-else>
														<button class="tbl-action grey-edit-grey  ml-2" @click="deleteInvoice(tr.id)" disabled>
															<FontAwesomeIcon :icon="deleteIcon" />
														</button>
													</span>
												</div>
											</new-tb-td>
										</new-tb-tr>
									</div>
								</div>
							</div>
						</new-tb-tr>
					</template>
				</new-data-table>
			</div>
		</div>
		<!-- invoice list Seeker End -->
	</div>
	<!-- Upload contract -->
	<Suspense v-if="showAddTeamNameModal.value">
		<template #default>
			<add-job-seeker-team v-model:isModalShow="showAddTeamNameModal" @newAddedTeam="fetchGroupInvoices" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTrashAlt, faEye, faDownload, faTimes, faChevronDown, faChevronUp, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
const AddJobSeekerTeam = defineAsyncComponent(async () => {
	return import('@/views/jobseekerTeam/components/AddJobseekerTeamModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'JobseekerTeam',

	components: {
		FontAwesomeIcon,
		AddJobSeekerTeam,
		DefaultLoader,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const tableIndex = ref(0);

		// icons
		const trashIcon = faTrashAlt;
		const editIcon = faEdit;
		const viewIcon = faEye;
		const downloadIcon = faDownload;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const copyIcon = faCopy;
		const isAddNewTeamModal = ref(false);
		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.jobseekerTeam')} - Way2Work`;

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch logged users invoices

			fetchGroupInvoices();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// invoice list seeker
		const groupInvoiceList = computed(() => store.getters['jobseekerTeam/getJobseekerTeamList']);

		// total invoice count
		const totalInvoicesGroup = computed(() => store.state.jobseekerTeam.totalInvoicesGroup);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);
		const seekerId = computed(() => store.state.auth.userProfile);
		const teamMembers = computed(() => {
			return data => {
				let teamNames = '';
				data.team_members.forEach(element => {
					teamNames += `${element.seeker.user.full_name} \n`;
				});

				return teamNames;
			};
		});
		// show upload my document model
		const showAddTeamNameModal = computed({
			get() {
				return isAddNewTeamModal;
			},

			set(val) {
				isAddNewTeamModal.value = val;
			},
		});
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch logged users invoices
		const fetchGroupInvoices = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};

			store.dispatch('jobseekerTeam/getJobseekerTeamList', payload);
		};
		// handle page change
		const handleChangePage = val => {
			page.value = val;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchGroupInvoices();
			}
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchGroupInvoices();
			}
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchGroupInvoices();
			}
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchGroupInvoices();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// delete invoice
		const deleteInvoice = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.duplicateMsg',{
					field:'conformationMessage.team'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('jobseekerTeam/deleteJobseekerTeam', id).then(() => {
						fetchGroupInvoices();
					});
				}
			});
		};

		// edit invoice
		const viewJobseekerTeam = id => {
			router.push({ name: 'View Jobseeker Team', params: { id: id } });
		};

		/**
		 * Watch
		 * *******************************************************************
		 */

		return {
			// refs
			maxItemsPerPage,
			dateFormat,
			currencyConverture,
			t,
			tableIndex,

			// icons
			trashIcon,
			editIcon,
			viewIcon,
			downloadIcon,
			deleteIcon,
			arrowDown,
			arrowUp,
			copyIcon,

			// computed
			groupInvoiceList,
			totalInvoicesGroup,
			userTypeInfo,
			teamMembers,
			seekerId,
			// computed
			showAddTeamNameModal,

			// methods
			fetchGroupInvoices,
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			deleteInvoice,
			viewJobseekerTeam,
			openTable,
			handleSort,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice__list {
	.invoice__row {
		.tbl-action-disabled {
			width: 40px;
			height: 40px;
			background-color: $colorExLightGray;
			border-radius: 100%;
			text-align: center;
			line-height: 40px;
			display: inline-block;
			margin-left: 10px;

			svg {
				color: $colorGray;
			}
		}

		.tbl-status {
			display: flex;
			align-items: center;
			width: 100%;

			span {
				margin-right: 10px;

				&.sts-wait {
					color: $colorWait;
					margin-left: 5px;
				}

				&.sts-approve {
					color: $colorApprove;
					margin-left: 5px;
				}
			}

			img {
				width: 18px;
				height: 18px;
				object-fit: cover;
			}
		}
	}
}
</style>
<style lang="scss">
.invoice__list {
	.expand-table {
		th {
			width: 17% !important;
			@media (max-width: 768px) {
				width: 24% !important;
			}
			@media (max-width: 575px) {
				width: 30% !important;
			}
		}

		td {
			width: 80% !important;
			@media (max-width: 768px) {
				width: 70% !important;
			}
			@media (max-width: 575px) {
				width: 65% !important;
			}
		}
	}
}
</style>
<style>
.invoice__list .payment-pill-header .pph-right {
	margin-top: 0px !important;
}
.invoice__list .payment-pill-header {
	display: flex !important;
}
@media (max-width: 768px) {
	.invoice__list .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.invoice__list .data__table .table__header {
		display: block !important;
	}
}
</style>
