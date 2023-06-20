<!-- eslint-disable indent -->
<template>
	<!-- my documents list -->
	<div class="my__document">
		<!-- header -->
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('document.defaultDocument') }}
				</h5>
			</div>
		</div>

		<!-- my document list -->
		<new-data-table
			:data="userDefaultDocumentList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalDocimentCount"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			@sort="handleSort"
			class="large-table searchbar_table	"
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
				<new-tb-th>{{ t('commonDashboard.sentOn') }}</new-tb-th>
				<new-tb-th>{{ t('commonDashboard.documentTitle') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.description') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.title || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.description || '-' }}</new-tb-td>
					<new-tb-td>
						<div class="d-flex align-items-center justify-content-center">
							<ToolTip :title="t('toolTip.viewDocument')">
								<button class="tbl-action grey-edit" @click="viewDefaultDocument(tr.file_path)">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
						</div>
					</new-tb-td>
				</new-tb-tr>
			</template>
		</new-data-table>

		<div>
			<new-data-table
				:data="userDefaultDocumentList"
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
										{{ tr.title }}
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
									<new-tb-th>{{ t('commonDashboard.documentTitle') }}</new-tb-th>

									<new-tb-td>{{ tr.title }}</new-tb-td>
								</new-tb-tr>

								<new-tb-tr>
									<new-tb-th>{{ t('fieldList.description') }}</new-tb-th>

									<new-tb-td>{{ tr.description }}</new-tb-td>
								</new-tb-tr>
								<new-tb-tr>
									<new-tb-th>{{ t('common.actions') }}</new-tb-th>
									<new-tb-td>
										<div class="d-flex align-items-center justify-content-start">
											<ToolTip :title="t('toolTip.viewDocument')">
												<button class="tbl-action grey-edit" @click="viewDefaultDocument(tr.file_path)">
													<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
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

const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'DefaultDocuments',

	components: {
		FontAwesomeIcon,
		DefaultLoader,
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

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(async () => {
			// fetch work detail
			fetchDefaultDocumentDocuments();
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
		const userDefaultDocumentList = computed(() => store.state.document.defaultDocuments);

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
		const fetchDefaultDocumentDocuments = async () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
				default_document: true,
			};
			await store.dispatch('document/getDefaultDocuments', payload);
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchDefaultDocumentDocuments();
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchDefaultDocumentDocuments();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			page.value = 1;
			fetchDefaultDocumentDocuments();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchDefaultDocumentDocuments();
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
		const viewDefaultDocument = link => {
			window.open(link);
		};

		// eslint-disable-next-line indent
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
			userDefaultDocumentList,
			isDocumentExpire,
			totalDocimentCount,

			showDocumentImageModal,
			isDocImgModal,

			// methods
			fetchDefaultDocumentDocuments,
			openTable,
			viewDefaultDocument,
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
