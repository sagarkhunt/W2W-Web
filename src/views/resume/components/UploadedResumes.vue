<template>
	<div class="my__resumes">
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('resume.myResumes') }}
				</h5>
			</div>
			<ToolTip :title="t('toolTip.addNewResume')">
				<div class="pph-right">
					<button class="btn-common btn-red" type="button" @click="showAddResumeModal = true">+ {{ t('common.add') }}</button>
				</div>
			</ToolTip>
		</div>

		<new-data-table
			:data="resumeList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalResume"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			@sort="handleSort"
			class="large-table searchbar_table"
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
								id="navbarDropdownResume"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{ t('common.Showing') }}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownResumeAria">
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
				<new-tb-th>{{ t('common.resume') }}</new-tb-th>
				<new-tb-th>{{ t('common.description') }}</new-tb-th>
				<new-tb-th sort-key="created_at">{{ t('fieldList.uploadedDate') }}</new-tb-th>
				<new-tb-th>{{ t('common.actions') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>
						<button @click="viewResume(tr.file_path)">
							<FontAwesomeIcon :icon="fileIcon" class="resumeIcon" />
							{{ t('common.resume') }}
						</button>
					</new-tb-td>
					<new-tb-td class="overflow-hidden description-row">{{ tr.description }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
					<new-tb-td class="resume__actions">
						<div class="d-flex align-items-center justify-content-center">
							<!-- resume download -->
							<ToolTip :title="t('toolTip.downloadResume')">
								<a @click="viewSeekerContractDetail(tr.file_path)" class="grey-edit">
									<FontAwesomeIcon :icon="downloadIcon" />
								</a>
							</ToolTip>

							<!-- resume delete -->
							<ToolTip :title="t('toolTip.deleteResume')">
								<button class="tbl-action red-close ml-2" @click="deleteResume(tr.id)">
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
				:data="resumeList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalResume"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table searchbar_table"
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
									id="navbarDropdownResume"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownResumeAria">
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
											<button @click="viewResume(tr.file_path)">
												<FontAwesomeIcon :icon="fileIcon" class="resumeIcon" />
												{{ t('common.resume') }}
											</button>
										</div>

										<div>
											{{ tr.amount_paid }}
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
										<new-tb-th>{{ t('fieldList.uploadedDate') }}</new-tb-th>

										<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>
										<new-tb-td class="resume__actions">
											<div class="d-flex align-items-center">
												<!-- resume download -->
												<ToolTip :title="t('toolTip.downloadResume')">
													<a :href="tr.file_path" title="Resume Download" download class="grey-edit">
														<FontAwesomeIcon :icon="downloadIcon" />
													</a>
												</ToolTip>

												<!-- resume delete -->
												<ToolTip :title="t('toolTip.deleteResume')">
													<button class="tbl-action red-close ml-2" @click="deleteResume(tr.id)">
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
	<!-- add resume modal -->
	<Suspense v-if="showAddResumeModal.value">
		<template #default>
			<add-resume v-model:isModalShow="showAddResumeModal" @newResume="fetchResumes" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- open image modal -->

	<Suspense v-if="showDocumentImageModal.value">
		<template #default>
			<open-image-modal v-model:isModalShow="showDocumentImageModal" :imageLink="imageLink" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashAlt, faFileAlt, faFileDownload, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { dateFormat } from '@/utils/mixins';
import { useSwal } from '@/components/sweetalert';

const AddResume = defineAsyncComponent(async () => {
	return import('@/views/resume/components/AddResumeModal.vue' /* webpackChunkName:"AddExperienceModal" */);
});

const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'UploadedResumes',

	components: {
		FontAwesomeIcon,
		AddResume,
		DefaultLoader,
		OpenImageModal,
	},

	setup() {
		// ref
		const tableIndex = ref(0);
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const isAddResumeModalShow = ref(false);

		const isDocImgModal = ref(false);
		const imageLink = ref(null);

		// icons
		const removeIcon = faTrashAlt;
		const fileIcon = faFileAlt;
		const downloadIcon = faFileDownload;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

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
			// fetch current users resumes
			fetchResumes();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// show upload my document model
		const showDocumentImageModal = computed({
			get() {
				return isDocImgModal;
			},
			set(val) {
				isDocImgModal.value = val;
			},
		});
		// resume list
		const resumeList = computed(() => store.getters['resume/getCurrentUserResumes']);

		// show add resume modal
		const showAddResumeModal = computed({
			get() {
				return isAddResumeModalShow;
			},

			set(val) {
				isAddResumeModalShow.value = val;
			},
		});

		// total invoice count
		const totalResume = computed(() => store.state.resume.totalResumeCount);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// view document
		const viewSeekerContractDetail = link => {
			imageLink.value = link;
			showDocumentImageModal.value = true;
			isDocImgModal.value = true;
		};
		// fetch current users resumes
		const fetchResumes = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};
			store.dispatch('resume/getResumes', payload);
		};
		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchResumes();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchResumes();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchResumes();
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchResumes();
		};

		// view resume
		const viewResume = link => {
			window.open(link);
		};

		// open upload resume box
		const openUploadResumeBox = () => {
			document.getElementById('uploadResume').click();
		};

		// upload resume
		const uploadResume = async e => {
			const file = e.target.files[0];

			// form data
			const formData = new FormData();
			formData.append('resume_file', file);

			await store.dispatch('resume/addResume', formData).then(() => {
				fetchResumes();
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

		// delete resume
		const deleteResume = async id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.logoutMsg',{
					field:'conformationMessage.logouts'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async result => {
				if (result.isConfirmed) {
					// delete request
					await store.dispatch('resume/deleteResume', id).then(() => {
						fetchResumes();
					});
				}
			});
		};

		return {
			// translate function
			t,

			// refs
			dateFormat,
			tableIndex,
			page,
			maxItemsPerPage,
			search,
			imageLink,

			// icons
			removeIcon,
			fileIcon,
			downloadIcon,
			deleteIcon,
			arrowDown,
			arrowUp,

			// computed
			resumeList,
			totalResume,
			showAddResumeModal,
			showDocumentImageModal,
			isDocImgModal,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			viewResume,
			openUploadResumeBox,
			uploadResume,
			deleteResume,
			openTable,
			fetchResumes,
			handleSort,
			viewSeekerContractDetail,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.description-row {
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 50px;
}

.my__resumes {
	margin-bottom: 60px;

	table {
		tr {
			.resumeIcon {
				color: $coloRed;
				font-size: 22px;
				margin-right: 5px;
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
	.my__resumes .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.my__resumes .data__table .table__header {
		display: block !important;
	}
}
</style>
