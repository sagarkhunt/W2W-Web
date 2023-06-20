<template>
	<!-- my documents list -->
	<div class="my__document">
		<!-- header -->
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('document.myDocument') }}
				</h5>
			</div>
			<!-- upload document btn -->
			<ToolTip :title="t('toolTip.uploadDocument')">
				<div class="pph-right">
					<button class="btn-common btn-red" type="button" @click="showUploadDocumentModal = true">+ {{ t('document.uploadDocument') }}</button>
				</div>
			</ToolTip>
		</div>

		<!-- my document list -->
		<new-data-table
			:data="userDocumentList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalDocimentCount"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			@sort="handleSort"
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
								id="navbarDropdownDoc"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{t('common.Showing')}}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownMyDoc">
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
				<new-tb-th sort-key="document_name">{{ t('fieldList.documentName') }}</new-tb-th>
				<new-tb-th sort-key="document_type">{{ t('fieldList.documentType') }}</new-tb-th>
				<new-tb-th sort-key="created_at">{{ t('document.uploadedOn') }}</new-tb-th>
				<new-tb-th sort-key="start_date">{{ t('fieldList.documentStartDate') }}</new-tb-th>
				<new-tb-th sort-key="end_date">{{ t('fieldList.documentExpiryDate') }}</new-tb-th>
				<new-tb-th>{{ t('common.status') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ tr.document_name }}</new-tb-td>
					<new-tb-td>{{ tr.documentType.document_name }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.start_date) }}</new-tb-td>
					<new-tb-td>{{ dateFormat(tr.end_date) }}</new-tb-td>
					<new-tb-td>
						<span :class="[isDocumentExpire(tr) ? 'text-red' : 'text-yellow']">
							<span>
								<FontAwesomeIcon :icon="isDocumentExpire(tr) ? clockIcon : approveIcon" class="mr-2" />
								{{ isDocumentExpire(tr) ? t('document.documentExpired') : t('document.documentNotExpired') }}
							</span>
						</span>
					</new-tb-td>
					<new-tb-td>
						<div class="d-flex align-items-center justify-content-center">
							<ToolTip :title="t('toolTip.viewDocument')">
								<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
							<ToolTip :title="t('toolTip.deleteDocument')">
								<button class="tbl-action red-close ml-2" @click="deleteSeekerDocument(tr.id)">
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
				:data="userDocumentList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalDocimentCount"
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
									id="navbarDropdownDocMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{t('common.Showing')}}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownDocMobileAria">
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
						<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
							<div class="d-flex">
								<div>
									<div>
										{{ tr.document_name }}
									</div>
									<div>
										{{ tr.documentType.document_name }}
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
									<new-tb-th>{{ t('document.uploadedOn') }}</new-tb-th>

									<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
								</new-tb-tr>

								<new-tb-tr>
									<new-tb-th>{{ t('fieldList.documentStartDate') }}</new-tb-th>

									<new-tb-td>{{ dateFormat(tr.start_date) }}</new-tb-td>
								</new-tb-tr>
								<new-tb-tr>
									<new-tb-th>{{ t('fieldList.documentExpiryDate') }}</new-tb-th>

									<new-tb-td>{{ dateFormat(tr.end_date) }}</new-tb-td>
								</new-tb-tr>
								<new-tb-tr>
									<new-tb-th>{{ t('common.status') }}</new-tb-th>

									<new-tb-td>
										<span :class="[isDocumentExpire(tr) ? 'text-red' : 'text-yellow']">
											<FontAwesomeIcon :icon="isDocumentExpire(tr) ? clockIcon : approveIcon" class="mr-2" />
											{{ isDocumentExpire(tr) ? t('document.documentExpired') : t('document.documentNotExpired') }}
										</span>
									</new-tb-td>
								</new-tb-tr>
								<new-tb-tr>
									<new-tb-th>{{ t('common.actions') }}</new-tb-th>

									<new-tb-td>
										<div class="d-flex align-items-center justify-content-start">
											<ToolTip :title="t('toolTip.viewDocument')">
												<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.id)">
													<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
												</button>
											</ToolTip>
											<ToolTip :title="t('toolTip.deleteDocument')">
												<button class="tbl-action red-close ml-2" @click="deleteSeekerDocument(tr.id)">
													<FontAwesomeIcon :icon="deleteIcon" />
												</button>
											</ToolTip>
										</div>
									</new-tb-td>
								</new-tb-tr>
							</div>
						</div>
					</new-tb-tr>
				</template>
			</new-data-table>
		</div>
	</div>

	<!-- Upload my document -->
	<Suspense v-if="showUploadDocumentModal.value">
		<template #default>
			<upload-my-documents v-model:isModalShow="showUploadDocumentModal" @newDocumentUploaded="fetchUsersDocuments" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- open image download modal -->

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
import { ref, defineAsyncComponent, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { dateFormat } from '@/utils/mixins';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { faChevronDown, faChevronUp, faClock, faThumbsUp, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../../components/sweetalert';

const UploadMyDocuments = defineAsyncComponent(async () => {
	return import('@/views/document/components/UploadMyDocument.vue' /* webpackChunkName:"UploadMyDocument" */);
});

const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'MyDocuments',

	components: {
		FontAwesomeIcon,
		DefaultLoader,
		UploadMyDocuments,
		OpenImageModal,
	},

	setup() {
		// refs
		const isUploadDocumentModal = ref(false);
		const tableIndex = ref(0);
		const isDocImgModal = ref(false);
		const imageLink = ref(null);
		// icon
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const approveIcon = faThumbsUp;
		const clockIcon = faClock;
		const deleteIcon = faTimes;
		const viewIcon = faEye;
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// sweet alert
		const Swal = useSwal();

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(async () => {
			// fetch work detail
			fetchUsersDocuments();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// show upload my document model
		const showUploadDocumentModal = computed({
			get() {
				return isUploadDocumentModal;
			},

			set(val) {
				isUploadDocumentModal.value = val;
			},
		});

		// show upload my document model
		const showDocumentImageModal = computed({
			get() {
				return isDocImgModal;
			},
			set(val) {
				isDocImgModal.value = val;
			},
		});

		// user document list
		const userDocumentList = computed(() => store.state.document.documents);

		// document expiry status check
		const isDocumentExpire = computed(() => {
			return data => {
				const today = new Date();
				const expiryDate = new Date(data.end_date);
				return today.getTime() >= expiryDate.getTime();
			};
		});
		// total education count
		const totalDocimentCount = computed(() => store.state.document.totalDocument);
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current users document type
		const fetchUsersDocuments = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};
			await store.dispatch('document/getUsersDocuments', payload);
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchUsersDocuments();
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchUsersDocuments();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			page.value = 1;
			fetchUsersDocuments();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchUsersDocuments();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};
		// view document
		const viewSeekerDocument = link => {
			const checkExtenation = link
				.split(/[#?]/)[0]
				.split('.')
				.pop()
				.trim();
			if (checkExtenation == 'pdf' || checkExtenation == 'docx') {
				window.open(link);
			} else {
				imageLink.value = link;
				showDocumentImageModal.value = true;
				isDocImgModal.value = true;
			}
		};

		// delete my document
		const deleteSeekerDocument = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.document'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('document/deleteJobseekerSeekerDocument', id).then(() => {
						fetchUsersDocuments();
					});
				}
			});
		};

		return {
			// translate function
			t,

			// icon
			arrowDown,
			arrowUp,
			approveIcon,
			clockIcon,
			deleteIcon,
			viewIcon,
			page,
			maxItemsPerPage,
			search,
			imageLink,

			// refs
			dateFormat,
			tableIndex,

			// computed
			showUploadDocumentModal,
			userDocumentList,
			isDocumentExpire,
			totalDocimentCount,

			showDocumentImageModal,
			isDocImgModal,

			// methods
			fetchUsersDocuments,
			openTable,
			deleteSeekerDocument,
			viewSeekerDocument,
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

.my__document {
	margin-bottom: 10px;

	.collapse-div {
		margin-top: 20px;
	}

	table {
		tr {
			&:last-child {
				border-bottom: transparent;
			}
		}

		.table thead th {
			border-bottom: transparent;
		}
	}
}

.btn-red {
	white-space: nowrap;
}
</style>
<style lang="scss">
.my__document {
	.expand-table {
		th {
			width: 18% !important;
			@media (max-width: 575px) {
				width: 27% !important;
			}
		}

		td {
			width: 50% !important;
		}
	}
}
</style>
<style>
@media (max-width: 768px) {
	.my__document .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.my__document .data__table .table__header {
		display: block !important;
	}
}
</style>
