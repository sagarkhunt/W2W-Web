<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container tax_card_information" content-class="modal-content overflow-visible px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content overflow-visible">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					{{ t('managerAccount.myTaxCardInformation') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body overflow-visible">
				<new-data-table :data="taxCardList" class="large-table">
					<template #thead>
						<new-tb-th>{{ t('document.uploadedOn') }}</new-tb-th>
						<new-tb-th>{{ t('fieldList.yearlyIncome') }}</new-tb-th>
						<new-tb-th>{{ t('fieldList.personalTax') }} (%)</new-tb-th>
						<new-tb-th>{{ t('fieldList.maxTaxPercentage') }} (%)</new-tb-th>
						<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
					</template>

					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
							<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
							<new-tb-td>{{ tr.yearly_income }}</new-tb-td>
							<new-tb-td>{{ tr.min_personal_tax }}</new-tb-td>
							<new-tb-td>{{ tr.max_personal_tax }}</new-tb-td>
							<new-tb-td>
								<div class="d-flex align-items-center justify-content-center">
									<ToolTip :title="t('toolTip.viewDocument')">
										<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
											<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</div>
							</new-tb-td>
						</new-tb-tr>
					</template>
				</new-data-table>

				<div class=" attachment-table responsive-table">
					<div v-if="taxCardList.length > 0">
						<new-data-table sst :data="taxCardList">
							<template #data="scopedData" ref="tablebody">
								<new-tb-tr class="invoice__row expand-table  " v-for="(tr, i) in scopedData.data" :key="i">
									<div>
										<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
											<div class="d-flex">
												<div>
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
												<new-tb-tr class="top_border">
													<new-tb-th>{{ t('document.uploadedOn') }}</new-tb-th>
													<new-tb-td> {{ dateFormat(tr.created_at) }}</new-tb-td>
												</new-tb-tr>
												<new-tb-tr>
													<new-tb-th>{{ t('fieldList.yearlyIncome') }}</new-tb-th>
													<new-tb-td>{{ tr.yearly_income }}</new-tb-td>
												</new-tb-tr>
												<new-tb-tr>
													<new-tb-th>{{ t('fieldList.personalTax') }} (%)</new-tb-th>
													<new-tb-td>{{ tr.min_personal_tax }} </new-tb-td>
												</new-tb-tr>
												<new-tb-tr>
													<new-tb-th>{{ t('fieldList.maxTaxPercentage') }} (%)</new-tb-th>
													<new-tb-td>{{ tr.max_personal_tax }}</new-tb-td>
												</new-tb-tr>
												<new-tb-tr class="bottom_border">
													<new-tb-th>{{ t('fieldList.action') }}</new-tb-th>
													<new-tb-td
														><div class="d-flex align-items-center justify-content-start">
															<ToolTip :title="t('toolTip.viewDocument')">
																<button class="tbl-action grey-edit" @click="viewSeekerDocument(tr.file_path)">
																	<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
																</button>
															</ToolTip></div
													></new-tb-td>
												</new-tb-tr>
											</div>
										</div>
									</div>
								</new-tb-tr>
							</template>
						</new-data-table>
					</div>
					<div v-else class="no-data-border">
						<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faTimes, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import { dateFormat } from '@/utils/mixins';

export default {
	name: 'TaxCardInformation',

	props: {
		// modal status
		isModalShow: Object,
	},

	//components
	components: {
		FontAwesomeIcon,
	},

	setup(props) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;

		const viewIcon = faEye;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		const tableIndex = ref(0);

		// global store
		const store = useStore();
		// view document
		const viewSeekerDocument = link => {
			window.open(link);
		};
		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// tax card information list
		const taxCardList = computed(() => store.getters['document/getTaxCardList']);

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		return {
			tableIndex,
			// translate function
			t,

			// refs
			modalShow,
			dateFormat,

			// icons
			closeIcon,
			viewIcon,
			arrowDown,
			arrowUp,

			// computed
			taxCardList,
			// method
			viewSeekerDocument,
			openTable,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

@import '@/assets/scss/modal.scss';

.tax_card_information {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: hidden;

		.modal-header {
			padding: 15px 30px;
		}

		.modal-body {
			padding: 30px;
			overflow: scroll;
			margin-bottom: 20px;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	@media (max-width: 576px) {
		.modal__content {
			.modal-header {
				display: block;
				padding: 20px;
			}
			.modal-body {
				padding: 20px;
			}
		}
	}
}
.table td,
.table th {
	border-right: 1px solid #dee2e6;
}
.table td:first-child {
	border-left: 1px solid #dee2e6;
}
.responsive-table {
	.table-border {
		margin: 0;
		@media (max-width: 1024px) {
			overflow: visible;
		}
	}
	.collapse-div {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 20px 20px 0 20px;
		background-color: #f5f5f5;
	}
}
.attachment-table {
	.no-data-border {
		border-bottom: 1px solid #ccc;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		border-top: 1px solid #ccc;
		border-radius: 15px;
	}
	td {
		overflow: visible;
	}
	
}
</style>

<style>
.attachment-table .data__table .table__data {
	margin-bottom: 0 !important;
}
@media (max-width: 1024px) {
	.attachment-table .data__table .table__data {
		overflow: visible;
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
