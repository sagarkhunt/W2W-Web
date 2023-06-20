<template>
	<div class="my_experiences">
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('resume.myExperience') }}
				</h5>
			</div>
			<div class="pph-right">
				<ToolTip :title="t('toolTip.addmyexperience')">
					<button class="btn-common btn-red" type="button" @click="showAddexperienceModal = true">+ {{ t('common.add') }}</button>
				</ToolTip>
			</div>
		</div>

		<new-data-table
			:data="experienceList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalExperinceCount"
			:max-items="maxItemsPerPage"
			@sort="handleSort"
			@change-page="handleChangePage"
			class="large-table searchbar_table"
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
								id="navbarDropdownExperience"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{t('common.Showing')}}</p>
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
				<new-tb-th sort-key="job_title">{{ t('fieldList.jobTitle') }}</new-tb-th>
				<new-tb-th sort-key="company_name">{{ t('fieldList.companyName') }}</new-tb-th>
				<new-tb-th sort-key="city_name">{{ t('fieldList.city') }}</new-tb-th>
				<new-tb-th sort-key="start_date">{{ t('fieldList.startDate') }}</new-tb-th>
				<new-tb-th sort-key="end_date">{{ t('fieldList.endDate') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
			</template>
			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ tr.job_title }}</new-tb-td>
					<new-tb-td>{{ tr.company_name }}</new-tb-td>
					<new-tb-td>{{ tr.cityReference && tr.cityReference.city_name }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.start_date) }}</new-tb-td>
					<new-tb-td>{{ tr.end_date ? dateFormat(tr.end_date) : '-' }}</new-tb-td>
					<new-tb-td>
						<div class="d-flex align-items-center justify-content-center">
							<ToolTip :title="t('toolTip.editmyexperience')">
								<button class="tbl-action grey-edit" @click="EditExperienceDetail(tr.id)">
									<FontAwesomeIcon :icon="editIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
							<ToolTip :title="t('toolTip.deletemyexperience')">
								<button class="tbl-action red-close ml-2" @click="deleteExperience(tr.id)">
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
				:data="experienceList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalExperinceCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table searchbar_table"
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
									id="navbarDropdownExperienceMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{t('common.Showing')}}</p>
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
					</div>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div>
											{{ tr.job_title }}
										</div>

										<div>
											{{ tr.company_name }}
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
										<new-tb-th>{{ t('fieldList.city') }}</new-tb-th>
										<new-tb-td>{{ tr.cityId }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.startDate') }}</new-tb-th>

										<new-tb-td>{{ dateFormat(tr.start_date) }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.endDate') }}</new-tb-th>
										<new-tb-td>{{ tr.end_date ? dateFormat(tr.end_date) : '-' }}</new-tb-td>
									</new-tb-tr>
									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>

										<new-tb-td>
											<div class="d-flex align-items-center">
												<ToolTip title="Edit my experience">
													<button class="tbl-action grey-edit" @click="EditExperienceDetail(tr.id)">
														<FontAwesomeIcon :icon="editIcon" style="text-align: 'center'" />
													</button>
												</ToolTip>
												<ToolTip title="Delete my experience">
													<button class="tbl-action red-close ml-2" @click="deleteExperience(tr.id)">
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

	<!-- add experience modal -->
	<Suspense v-if="showAddexperienceModal.value">
		<template #default>
			<add-experience v-model:isModalShow="showAddexperienceModal" @newExperience="fetchExperiences" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
	<!-- Edit experience modal -->
	<Suspense v-if="showEditexperienceModal.value">
		<template #default>
			<edit-experience v-model:isModalShow="showEditexperienceModal" v-model:experiencId="experiencId" @newExperience="fetchExperiences" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dateFormat } from '@/utils/mixins';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { faChevronDown, faChevronUp, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../../components/sweetalert';

const AddExperience = defineAsyncComponent(async () => {
	return import('@/views/resume/components/AddExperienceModal.vue' /* webpackChunkName:"AddExperienceModal" */);
});
//edit model
const EditExperience = defineAsyncComponent(async () => {
	return import('@/views/resume/components/EditExperienceModal.vue' /* webpackChunkName:"AddExperienceModal" */);
});

export default {
	name: 'MyExperience',
	// components
	components: {
		DefaultLoader,
		AddExperience,
		EditExperience,
		FontAwesomeIcon,
	},

	setup() {
		// ref vars
		const isAddExperienceModalShow = ref(false);
		const isEditExperienceModalShow = ref(false);
		const experiencId = ref(null);
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
		// show add experience modal
		const showAddexperienceModal = computed({
			get() {
				return isAddExperienceModalShow;
			},

			set(val) {
				isAddExperienceModalShow.value = val;
			},
		});
		// show edit experience modal
		const showEditexperienceModal = computed({
			get() {
				return isEditExperienceModalShow;
			},

			set(val) {
				isEditExperienceModalShow.value = val;
			},
		});
		// total experince count
		const totalExperinceCount = computed(() => store.state.resume.totalExperinceCount);
		// experience list
		const experienceList = computed(() => store.getters['resume/getCurrentUserExperiences']);

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
			store.dispatch('resume/getExperiences', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchExperiences();
		};

		// //filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
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

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// edit experience
		const EditExperienceDetail = id => {
			isEditExperienceModalShow.value = true;
			experiencId.value = id;
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
			experiencId,

			// icon
			arrowDown,
			arrowUp,

			// computed
			showAddexperienceModal,
			showEditexperienceModal,
			isEditExperienceModalShow,
			experienceList,
			totalExperinceCount,

			// methods
			fetchExperiences,
			openTable,
			EditExperienceDetail,
			deleteExperience,
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

.my_experiences {
	margin-bottom: 10px;
	margin-top: 90px;

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
</style>
<style>
@media (max-width: 768px) {
	.my_experiences .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.my_experiences .data__table .table__header {
		display: block !important;
	}
}
</style>
