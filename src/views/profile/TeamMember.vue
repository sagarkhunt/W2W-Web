<template>
	<div class="job__proposals car-space">
		<!-- job proposals list -->
		<div class="spacing-table table-responsive table-auto large-table searchbar_table card-space">
			<!-- header -->
			<div class="payment-pill-header">
				<!-- title -->
				<div class="pph-left mb-3">
					<h5 class="title-lg">
						{{ t('myApplications.teamMember') }}
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
			<template>
				<div class="select__limit">
					<span>{{ t('common.Showing') }}</span>

					<div class="dropdown">
						<a
							class="
								dropdown-toggle
								btn-common btn-gray-border
								tbl-drop
							"
							href="#"
							id="navbarDropdownTeamMember"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ maxItemsPerPage }}
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownTeamMemberAria">
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
			</template>

			<div class="table-width">
				<div class="spacing-table-head">
					<div>{{ t('myApplications.lightEnterpreneurName') }}</div>
					<div>{{ t('fieldList.occupation') }}</div>
					<div>{{ t('fieldList.occupied') }}</div>
					<div>{{ t('fieldList.contract_value') }}</div>
					<div>{{ t('fieldList.currentAddress') }}</div>
					<div>{{ t('fieldList.action') }}</div>
				</div>
				<div v-if="TeamMemberList.length > 0">
					<div class="invoice__row large-table" :key="i" v-for="(item, i) in TeamMemberList">
						<div class="border-right w-100 me-2 d-flex align-items-center ">
							<span v-if="item.file_path">
								<div class="review-user">
									<img :src="item.file_path" alt="" class="img-fluid w-100 h-100" />
								</div>
							</span>
							<span v-else>
								<div class="review-user">
									<img src="@/assets/images/icon_png.png" alt="img" class="img-fluid w-100 h-100" />
								</div>
							</span>
							<p class="ms-2">
								{{ item.full_name }}
							</p>
						</div>

						<div class="border-right w-100 me-2 d-flex align-items-center justify-content-center">
							{{ item.occupation || '-' }}
						</div>

						<div class="border-right w-100 me-2 d-flex align-items-center justify-content-center">
							{{ item.jobSeeker?.occupied }}
						</div>

						<div class="border-right w-100 me-2 d-flex align-items-center justify-content-center">
							-
						</div>

						<div class="border-right w-100 me-2 d-flex align-items-center justify-content-center">
							-
						</div>

						<div class="w-50 d-flex justify-content-center align-items-center justify-content-center">
							<span class="invoice__data">
								<button :title="t('toolTip.RemoveTeamMember')" @click="deleteTeamMemeber(item.id)" class="close-btn tbl-action red-close">
									<FontAwesomeIcon :icon="deleteIcon" />
								</button>
							</span>
						</div>
					</div>
					<pagination @changePage="handleChangePage" v-model:value="page" :total="countTeamMember" :max="9" />
				</div>
				<div v-else>
					<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
				</div>
			</div>
		</div>

		<!-- job proposals list -->
		<div class="spacing-table responsive-table card-space">
			<!-- header -->
			<div class="payment-pill-header">
				<!-- title -->
				<div class="pph-left mb-3">
					<h5 class="title-lg">
						{{ t('myApplications.teamMember') }}
					</h5>
				</div>
			</div>
			<div v-if="TeamMemberList.length > 0">
				<div class="invoice__row mb-3" :key="i" v-for="(item, i) in TeamMemberList">
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
								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<div class="min-width w-100 text-xs">{{ t('myApplications.lightEnterpreneurName') }}</div>
									<div class="d-flex align-items-center flex-wrap">
										<span v-if="item.file_path">
											<div class="review-user">
												<img :src="item.file_path" alt="" class="img-fluid w-100 h-100" />
											</div>
										</span>
										<span v-else>
											<div class="review-user">
												<img src="@/assets/images/icon_png.png" alt="img" class="img-fluid w-100 h-100" />
											</div>
										</span>
										<p class="ms-2 text-xs">
											{{ item.full_name }}
										</p>
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<div class="min-width w-100 text-xs">{{ t('fieldList.occupation') }}</div>
									<div class="d-flex align-items-center text-xs">
										{{ item.occupation || '-' }}
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<div class="min-width w-100 text-xs">{{ t('fieldList.occupied') }}</div>
									<div class="d-flex align-items-center text-xs">
										{{ item.jobSeeker?.occupied }}
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<div class="min-width w-100 text-xs">{{ t('fieldList.contract_value') }}</div>
									<div class="d-flex align-items-center text-xs">
										-
									</div>
								</div>

								<div class="d-flex align-items-center px-sm-4 px-2 py-3 border-bottom bg-white">
									<div class="min-width w-100 text-xs">{{ t('fieldList.currentAddress') }}</div>
									<div class="d-flex align-items-center text-xs">
										-
									</div>
								</div>

								<div class="d-flex align-items-center justify-content-start px-sm-4 px-2 py-3 bg-white">
									<div class="min-width w-100 text-xs">{{ t('fieldList.action') }}</div>
									<div class="d-flex">
										<span class="invoice__data">
											<button title="Remove Work Detail" @click="deleteTeamMemeber(item.id)" class="close-btn tbl-action red-close">
												<FontAwesomeIcon :icon="deleteIcon" />
											</button>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<pagination @changePage="handleChangePage" v-model:value="page" :total="countTeamMember" :max="9" />
			</div>
			<div v-else>
				<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, ref, watch, defineAsyncComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faEdit, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { dateFormat } from '@/utils/mixins';
import { useI18n } from 'vue-i18n';
import { useSwal } from '../../components/sweetalert';
import { useRouter } from 'vue-router';

export default {
	name: 'TeamMemberList',

	components: {
		FontAwesomeIcon,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const isAddTeamMembwersModalShow = ref(false);
		const editableTeamMemberId = ref(null);
		const tableIndex = ref(0);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.teamMembers')} - Way2Work`;

		// icons
		const trashIcon = faTrashAlt;
		const editIcon = faEdit;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch logged users invoices
			fetchTeammembers();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		const countTeamMember = computed(() => {
			return Math.ceil(TeamMemberList.value.length / maxItemsPerPage.value);
		});
		// // invoice list
		const TeamMemberList = computed(() => store.state.auth.TeamMemberList);

		// // total invoice count
		const totalInvoiceCount = computed(() => store.state.invoice.totalInvoices);

		// show add work detail form
		const showAddTeamMemberModal = computed({
			get() {
				return isAddTeamMembwersModalShow;
			},

			set(val) {
				isAddTeamMembwersModalShow.value = val;
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch logged users invoices
		const fetchTeammembers = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
			};
			store.dispatch('auth/getTeamMembers', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchTeammembers();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchTeammembers();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchTeammembers();
		};

		// delete invoice;
		const deleteTeamMemeber = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.member'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('auth/deleteTeamMember', id).then(() => {
						fetchTeammembers();
					});
				}
			});
		};

		/**
		 * Watches
		 * *******************************************************************
		 */
		watch(isAddTeamMembwersModalShow, () => {
			if (!isAddTeamMembwersModalShow.value) {
				editableTeamMemberId.value = null;
			}
		});

		watch(search, () => {
			fetchTeammembers();
		});

		// edit team member
		const editTeamMember = id => {
			router.push({ name: 'Edit Invoice', params: { id } });
		};

		return {
			// translate function
			t,

			// refs
			page,
			maxItemsPerPage,
			dateFormat,
			editableTeamMemberId,
			tableIndex,
			search,

			// router
			router,
			Swal,

			// icons
			trashIcon,
			editIcon,
			deleteIcon,
			arrowDown,
			arrowUp,

			// computed
			TeamMemberList,
			showAddTeamMemberModal,
			totalInvoiceCount,
			countTeamMember,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			deleteTeamMemeber,
			editTeamMember,
			fetchTeammembers,
			openTable,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.team_member__list {
	.tbl-status {
		display: flex;
		align-items: center;
		width: 100%;

		span {
			margin-right: 10px;

			&.sts-wait {
				color: $colorWait;
			}

			&.sts-approve {
				color: $colorApprove;
			}
		}

		img {
			width: 40px;
			height: 40px;
			object-fit: cover;
		}
	}
}

.spacing-table {
	.spacing-table-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

		@media (max-width: 576px) {
			height: 50px;
			line-height: 27px;
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
		}

		::placeholder {
			color: #ff4b57;
			opacity: 1;
		}
	}
}

.large-table {
	display: block;

	@media (max-width: 1024px) {
		display: none;
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
</style>
