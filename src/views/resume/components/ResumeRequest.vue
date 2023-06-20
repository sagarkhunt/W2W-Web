<template>
	<div class="resume_request">
		<div class="table-header">
			<div class="payment-pill-header">
				<div class="pph-left">
					<h5 class="title-lg">
						{{ t('resume.requestRequest') }}
					</h5>
				</div>
			</div>
			<div class="select__limit mobile_table_header">
				<div class="dropdown ml-0">
					<a
						class="
								dropdown-toggle
								btn-common btn-gray-border
								tbl-drop
							"
						href="#"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<p class="d-inline-block head">{{ t('common.Showing') }}</p>
						<span class="ml-2">{{ maxItemsPerPage }}</span>
					</a>
					<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
		<div class="table-overflow">
			<new-data-table
				:data="resumeRequestList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalResumeRequestCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="large-table searchbar_table"
				@sort="handleSort"
			>
				<template #header>
					<div class="select__limit d-flex align-items-center">
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
									id="navbarDropdownExperience"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownExperienceAria">
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
					<new-tb-th>{{ t('fieldList.description') }}</new-tb-th>
					<new-tb-th sort-key="company_name">{{ t('fieldList.companyName') }}</new-tb-th>
					<new-tb-th>{{ t('common.status') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td class="text-elipsis">{{ tr.resume && tr.resume.description }}</new-tb-td>
						<new-tb-td>{{ tr.company && tr.company.company_name }}</new-tb-td>
						<new-tb-td class="overflow-visible">
							<div class="d-flex align-items-center justify-content-center">
								<span v-if="tr.status">
									<div class="tbl-status" v-if="tr.status == 'pending'">
										<div class="dropdown">
											<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
												{{ t('fieldList.action') }}
											</button>
											<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
												<li @click="updateResumeStatus(tr.id, 'approved')" style="cursor: pointer;">
													<span class="dropdown-item">{{ t('invoiceList.Approved') }}</span>
												</li>
												<li @click="updateResumeStatus(tr.id, 'declined')" style="cursor: pointer;">
													<span class="dropdown-item">{{ t('resume.declined') }}</span>
												</li>
											</ul>
										</div>
									</div>
									<div class="tbl-status" v-else-if="tr.status == 'approved'">
										<button class="sts-approve">
											{{ t('invoiceList.Approved') }}
										</button>
									</div>
									<div class="tbl-status" v-else>
										<button class="sts-reject">
											{{ t('resume.declined') }}
										</button>
									</div>
								</span>
								<span v-else>
									-
								</span>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>
		</div>

		<div>
			<new-data-table
				:data="resumeRequestList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalResumeRequestCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table searchbar_table"
			>
				<template #header>
					<div class="select__limit desktop_table_header d-flex align-items-center">
						<div class="dropdown ml-0">
							<a
								class="
								dropdown-toggle
								btn-common btn-gray-border
								tbl-drop
							"
								href="#"
								id="navbarDropdownExperienceMobile"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{ t('common.Showing') }}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownExperienceMobileAria">
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

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div>
											{{ tr.company && tr.company.company_name }}
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
									<new-tb-tr class="top_border">
										<new-tb-th>{{ t('fieldList.description') }}</new-tb-th>
										<new-tb-td class="text-elipsis">{{ tr.resume && tr.resume.description }} </new-tb-td>
									</new-tb-tr>
									<new-tb-tr class="action-overflow bottom_border">
										<new-tb-th>{{ t('common.status') }}</new-tb-th>

										<new-tb-td>
											<div class="d-flex align-items-center">
												<span v-if="tr.status">
													<div class="tbl-status" v-if="tr.status == 'pending'">
														<div class="dropdown">
															<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
																{{t('common.action')}}
															</button>
															<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
																<li @click="updateResumeStatus(tr.id, 'approved')" style="cursor: pointer;">
																	<span class="dropdown-item">{{ t('invoiceList.Approved') }}</span>
																</li>
																<li @click="updateResumeStatus(tr.id, 'declined')" style="cursor: pointer;">
																	<span class="dropdown-item">{{ t('resume.declined') }}</span>
																</li>
															</ul>
														</div>
													</div>
													<div class="tbl-status" v-else-if="tr.status == 'approved'">
														<button class="sts-approve">
															{{ t('invoiceList.Approved') }}
														</button>
													</div>
													<div class="tbl-status" v-else>
														<button class="sts-reject">
															{{ t('resume.declined') }}
														</button>
													</div>
												</span>
												<span v-else>
													-
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
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dateFormat } from '@/utils/mixins';
import { faChevronDown, faChevronUp, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../../components/sweetalert';

export default {
	name: 'ResumeRequest',
	// components
	components: {
		FontAwesomeIcon,
	},

	setup() {
		// ref vars
		const tableIndex = ref(0);
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);

		// icon
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const deleteIcon = faTimes;
		const editIcon = faEdit;

		// global store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch current users experiences
			fetchExperiences();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// total experince count
		const totalResumeRequestCount = computed(() => store.state.resume.totalResumeRequestCount);
		// experience list
		const resumeRequestList = computed(() => store.getters['resume/getCurrentUserResumeRequest']);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current users experiences
		const fetchExperiences = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};
			store.dispatch('resume/getResumesRequest', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchExperiences();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			page.value = 1;
			fetchExperiences();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchExperiences();
		};
		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchExperiences();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		const updateResumeStatus = (id, status) => {
			const payload = {
				status: status,
			};
			store
				.dispatch('resume/updateResumeStatus', {
					payload,
					id: id,
				})
				.then(() => {
					fetchExperiences();
				});
		};

		// delete my document
		const deleteExperience = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.experience'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('resume/deleteExperince', id).then(() => {
						fetchExperiences();
					});
				}
			});
		};

		return {
			// translate function
			t,
			// refs
			page,
			maxItemsPerPage,
			search,
			dateFormat,
			tableIndex,
			deleteIcon,
			editIcon,
			// icon
			arrowDown,
			arrowUp,

			// computed
			resumeRequestList,
			totalResumeRequestCount,

			// methods
			fetchExperiences,
			openTable,
			deleteExperience,
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			updateResumeStatus,
			handleSort,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.resume_request {
	margin-bottom: 10px;
	margin-top: 40px;

	table {
		tr {
			.tbl-action {
				font-size: 14px;
			}
		}
	}
}

.expand-table {
	th {
		width: 8%;
	}

	td {
		width: 20%;
	}
}

.dropdown-toggle {
	border: 1px solid #ccc;
}

.btn:focus {
	box-shadow: none !important;
}

.text-elipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 200px;
}

.payment-pill-header {
	text-align: left !important;
}
.border-padding {
	.action-overflow {
		td {
			overflow: visible !important;
		}
	}
}
.table-border {
	overflow: visible !important;
}
</style>
<style lang="scss">
.resume_request {
	.data__table {
		.table__data {
			overflow: visible !important;
		}
	}
}
.data__table {
	.table__data {
		.table-auto {
			overflow: visible !important;
		}
	}
}

.table-overflow {
	.table__data.border-table {
		overflow: unset !important;

		table {
			thead {
				:first-child {
					border-top-left-radius: 0.5rem;
				}

				:last-child {
					border-top-right-radius: 0.5rem;
				}
			}
		}
	}
}
.top_border td {
	border-top-right-radius: 6px !important;
}
.top_border th {
	border-top-left-radius: 6px !important;
}
.bottom_border td {
	border-bottom-right-radius: 6px !important;
}
.bottom_border th {
	border-bottom-left-radius: 6px !important;
}
</style>
