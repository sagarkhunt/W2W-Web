<template>
	<div class="my_educations">
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('resume.myEducations') }}
				</h5>
			</div>
			<div class="pph-right">
				<ToolTip :title="t('toolTip.addmyeducations')">
					<button class="btn-common btn-red" type="button" @click="showAddEducationModal = true">+ {{ t('common.add') }}</button>
				</ToolTip>
			</div>
		</div>

		<new-data-table
			:data="educationList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalEducationCount"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			class="large-table searchbar_table"
			@sort="handleSort"
		>
			<template #header>
				<div class="select__limit d-flex align-items-center">
					<div>
						<label class="tbl_label">{{t('common.Rows')}}</label>
						<div class="dropdown ml-0">
							<a
								class="
										dropdown-toggle
										btn-common btn-gray-border
										tbl-drop
									"
								href="#"
								id="navbarDropdownEducation"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{t('common.Showing')}}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownEducationAria">
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
				<new-tb-th sort-key="subject">{{ t('fieldList.majorSubject') }}</new-tb-th>
				<new-tb-th sort-key="institute">{{ t('fieldList.institute') }}</new-tb-th>
				<new-tb-th sort-key="country_name">{{ t('fieldList.country') }}</new-tb-th>
				<new-tb-th sort-key="city_name">{{ t('fieldList.city') }}</new-tb-th>
				<new-tb-th sort-key="graduation_year">{{ t('fieldList.completionYear') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ tr.subject }}</new-tb-td>
					<new-tb-td>{{ tr.institute }}</new-tb-td>
					<new-tb-td>{{ tr.countryReference.country_name }}</new-tb-td>
					<new-tb-td>{{ tr.cityReference.city_name }}</new-tb-td>
					<new-tb-td>{{ tr.graduation_year }}</new-tb-td>
					<new-tb-td>
						<div class="d-flex align-items-center justify-content-center">
							<ToolTip :title="t('toolTip.editmyeducations')">
								<button class="tbl-action grey-edit" @click="EditEducationDetail(tr.id)">
									<FontAwesomeIcon :icon="editIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
							<ToolTip :title="t('toolTip.deletemyeducations')">
								<button class="tbl-action red-close ml-2" @click="deleteEducation(tr.id)">
									<FontAwesomeIcon :icon="deleteIcon" />
								</button>
							</ToolTip>
						</div>
					</new-tb-td>
				</new-tb-tr>
			</template>
		</new-data-table>

		<div>
			<new-data-table
				:data="educationList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalEducationCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table searchbar_table"
			>
				<template #header>
					<div class="select__limit d-flex align-items-center">
						<div>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownEducationMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{t('common.Showing')}}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownEducationMobileAria">
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
											{{ tr.qualification?.qualification }}
										</div>
										<div>
											{{ tr.subject }}
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
										<new-tb-th>{{ t('fieldList.institute') }}</new-tb-th>
										<new-tb-td>{{ tr.institute }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.country') }}</new-tb-th>

										<new-tb-td>{{ tr.countryReference.country_name }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.city') }}</new-tb-th>
										<new-tb-td>{{ tr.cityReference.city_name }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.completionYear') }}</new-tb-th>
										<new-tb-td>{{ tr.graduation_year }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>

										<new-tb-td>
											<div class="d-flex align-items-center">
												<ToolTip :title="t('toolTip.editmyeducations')">
													<button class="tbl-action grey-edit" @click="EditEducationDetail(tr.id)">
														<FontAwesomeIcon :icon="editIcon" style="text-align: 'center'" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.deletemyeducations')">
													<button class="tbl-action red-close ml-2" @click="deleteEducation(tr.id)">
														<FontAwesomeIcon :icon="deleteIcon" />
													</button>
												</ToolTip>
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

	<!-- add education details form -->
	<Suspense v-if="showAddEducationModal.value">
		<template #default>
			<add-education v-model:isModalShow="showAddEducationModal" @newEducation="fetchEducations" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- edit education details form -->
	<Suspense v-if="showEditEducationModal.value">
		<template #default>
			<edit-education v-model:isModalShow="showEditEducationModal" v-model:educationId="educationId" @newEducation="fetchEducations" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { defineAsyncComponent, ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../../components/sweetalert';

const AddEducation = defineAsyncComponent(async () => {
	return import('@/views/resume/components/AddEducationModal.vue' /* webpackChunkName:"AddEducationModal" */);
});
const EditEducation = defineAsyncComponent(async () => {
	return import('@/views/resume/components/EditEducationModal.vue' /* webpackChunkName:"AddEducationModal" */);
});

export default {
	name: 'MyEducations',

	// components
	components: {
		DefaultLoader,
		AddEducation,
		EditEducation,
		FontAwesomeIcon,
	},

	setup() {
		// ref vars
		const isAddEducationModalShow = ref(false);
		const isEditEducationModalShow = ref(false);
		const educationId = ref(null);
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

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore();

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			// fetch current users educations
			fetchEducations();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// show add experience modal
		const showAddEducationModal = computed({
			get() {
				return isAddEducationModalShow;
			},

			set(val) {
				isAddEducationModalShow.value = val;
			},
		});

		// show edit education modal
		const showEditEducationModal = computed({
			get() {
				return isEditEducationModalShow;
			},

			set(val) {
				isEditEducationModalShow.value = val;
			},
		});

		// education list
		const educationList = computed(() => store.getters['resume/getCurrentUserEducations']);

		// total education count
		const totalEducationCount = computed(() => store.state.resume.totalEducations);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current users educations
		const fetchEducations = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};
			store.dispatch('resume/getEducations', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchEducations();
		};

		// //filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchEducations();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			page.value = 1;
			fetchEducations();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchEducations();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};
		// edit education
		const EditEducationDetail = id => {
			isEditEducationModalShow.value = true;
			educationId.value = id;
		};

		// delete education
		const deleteEducation = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.education'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('resume/deleteEducation', id).then(() => {
						fetchEducations();
					});
				}
			});
		};
		return {
			// translate function
			t,

			// ref
			tableIndex,
			educationId,
			page,
			maxItemsPerPage,
			search,

			// icon
			arrowDown,
			arrowUp,
			deleteIcon,
			editIcon,

			// computed
			showAddEducationModal,
			showEditEducationModal,
			educationList,
			totalEducationCount,

			// methods
			fetchEducations,
			openTable,
			EditEducationDetail,
			deleteEducation,
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			handleSort,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.my_educations {
	margin-bottom: 10px;
	margin-top: 100px;

	table {
		tr {
			.tbl-action {
				font-size: 14px;

			}
		}

		table td {
			border-right: 1px solid #dee2e6;

			&:last-child {
				border-right: transparent;
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

.expand-table {
	th {
		width: 8%;
	}

	td {
		width: 20%;
	}
}

.btn-red {
	white-space: nowrap;
}
</style>
<style>
@media (max-width: 768px) {
	.my_educations .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.my_educations .data__table .table__header {
		display: block !important;
	}
}
</style>
