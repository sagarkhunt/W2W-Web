<template>
	<!-- close btn -->
	<div class="model">
		<!-- form field -->
		<div>
			<div class="select-file">
				<div class="align-items-center justify-content-between">
					<div class="invoice-pd invoice-receipt">
						<div class="row">
							<div class="d-flex justify-content-between align-items-center mb-3 mt-5 ">
								<div class="pph-left">
									<h5 class="title-lg">{{ t('invoiceList.invoiceData.attachmentsList') }}</h5>
								</div>

								<div class="pph-right d-flex justify-content-end">
									<button class="btn-common btn-red mt-0" type="button" @click="addReceiptDetail">
										<span class="ml-2">
											<FontAwesomeIcon :icon="pinIcon" />
										</span>
										{{ t('invoiceList.invoiceData.attachmentsList') }}
									</button>
								</div>
							</div>
							<div class="daily-work-row large-table">
								<div class="daily-work-overflow">
									<div class="daily-work-col">
										<!-- daily work hout list - row -->
										<div class="PB-3">
											<div v-if="receiptItem.length > 0">
												<div v-for="(row, index) in receiptItem || []" :key="index">
													<div class="details-content gap-2 mb-lg-4 mb-3">
														<!-- serial no. -->
														<div class="product-width w-25">
															<input
																type="text"
																min="0"
																v-model="row.purchase_place"
																class="form-control form-model"
																placeholder="Description of the attachment"
																@change="e => handleChangeAttachement(e.target.value, index, 'purchase_place')"
															/>
														</div>
														<!-- Team member -->
														<div class="work-width me-2 ml-xl-0 ml-3 w-20">
															<div class="position-relative">
																<v-date-picker
																	v-model="row.purchase_date"
																	:masks="{ input: 'DD.MM.YYYY' }"
																	class="d-flex align-items-center"
																	@dayclick="e => handleChangeAttachement(e.id, index, 'purchase_date')"
																>
																	<template
																		v-slot="{
																			inputValue,
																			inputEvents,
																		}"
																	>
																		<input class="form-control form-model pe-5" :value="inputValue" v-on="inputEvents" placeholder="Attachment date" readonly />

																		<div class="calender-icon d-flex justify-content-center align-items-center position-absolute">
																			<FontAwesomeIcon :icon="calenderIcon" class="text-gray text-sm mb-0" />
																		</div>
																	</template>
																</v-date-picker>
															</div>
														</div>

														<!-- desciption Field Input -->
														<div class="work-width me-2 w-40">
															<div class="work py-0">
																<div class="">
																	<div>
																		<div class="input-pera btn-color position-relative d-flex align-items-center">
																			<FontAwesomeIcon :icon="pinIcon" class="text-light-gray mb-0" />
																			<drop-zone
																				title="Add file"
																				textColor="text-gray"
																				titleText="bold"
																				subTitle="Formats allowed PDF, DOC, PPT, JPG, PNG"
																				@fileDrop="file => handleContractFileChange(file, index, 'receipt_file')"
																				class="ms-2"
																				:isUploadButton="false"
																			/>
																			<div class="img-preview top-0 " v-if="row.contractFile">
																				<div id="preview">
																					<div class="dz-preview dz-error dz-complete dz-image-preview dz-img-wrap">
																						<div class="dz-image">
																							<img
																								data-dz-thumbnail=""
																								alt="Invocie receipt file image"
																								:src="row.contractFilePreview"
																								class="thumb-img"
																							/>
																						</div>
																						<div class="dz-details d-flex align-items-center">
																							<div class="dz-filename">
																								<span>
																									{{ row.contractFile?.name }}
																								</span>
																							</div>
																							<div class="ml-2 mt-2 preview">
																								<button type="button" class="drop-close" @click="removeInvoiceReceiptFile(index)">
																									<FontAwesomeIcon :icon="closeIcon" />
																								</button>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<!--close-btn-->
														<div class="d-flex align-items-center justify-content-center w-10">
															<button type="button" class="close-btn" @click="removeRow(index)">
																<FontAwesomeIcon :icon="closeIcon" />
															</button>
														</div>
													</div>
												</div>
											</div>
											<div v-else class="no-data-border">
												<div class="text-center p-4">{{ t('common.noDataAvailable') }}</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class=" attachment-table responsive-table">
								<div v-if="receiptItem.length > 0">
									<new-data-table sst :data="receiptItem">
										<template #data="scopedData" ref="tablebody">
											<new-tb-tr class="invoice__row expand-table  " v-for="(tr, i) in scopedData.data" :key="i">
												<div>
													<div class="d-flex align-items-center justify-content-end collapse-div" @click="openTable(i, item)">
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
																<new-tb-th>{{ t('invoiceList.invoiceData.attachmentDescription') }}</new-tb-th>
																<new-tb-td>
																	<input
																		type="text"
																		min="0"
																		v-model="tr.purchase_place"
																		class="form-control form-model"
																		@change="e => handleChangeAttachement(e.target.value, i, 'purchase_place')"
																		placeholder="Description of the attachment"
																/></new-tb-td>
															</new-tb-tr>
															<new-tb-tr>
																<new-tb-th>{{ t('invoiceList.invoiceData.attachmentDate') }}</new-tb-th>
																<new-tb-td
																	><div class="work-width">
																		<div class="position-relative">
																			<v-date-picker
																				v-model="tr.purchase_date"
																				:masks="{ input: 'DD.MM.YYYY' }"
																				class="d-flex align-items-center"
																				@dayclick="e => handleChangeAttachement(e.id, i, 'purchase_date')"
																			>
																				<template
																					v-slot="{
																						inputValue,
																						inputEvents,
																					}"
																				>
																					<input
																						class="form-control form-model pe-5"
																						:value="inputValue"
																						v-on="inputEvents"
																						placeholder="Attachment date"
																						readonly
																					/>

																					<div class="calender-icon d-flex justify-content-center align-items-center position-absolute">
																						<FontAwesomeIcon :icon="calenderIcon" class="text-gray text-sm mb-0" />
																					</div>
																				</template>
																			</v-date-picker>
																		</div></div
																></new-tb-td>
															</new-tb-tr>
															<new-tb-tr>
																<new-tb-th>{{ t('invoiceList.invoiceData.attachments') }}</new-tb-th>
																<new-tb-td
																	><div class="work-width me-2">
																		<div class="work py-0">
																			<div class="">
																				<div>
																					<div class="input-pera btn-color position-relative d-flex align-items-center">
																						<FontAwesomeIcon :icon="paperClip" class="text-light-gray mb-0" />
																						<drop-zone
																							title="Add file"
																							textColor="text-gray"
																							titleText="bold"
																							subTitle="Formats allowed PDF, DOC, PPT, JPG, PNG"
																							@fileDrop="file => handleContractFileChange(file, i, 'receipt_file')"
																							class="ms-2 drop-zone"
																							:isUploadButton="false"
																						/>
																						<div class="img-preview top-0 left-0" v-if="tr.contractFile">
																							<div id="preview">
																								<div class="dz-preview dz-error dz-complete dz-image-preview dz-img-wrap">
																									<div class="dz-image">
																										<img
																											data-dz-thumbnail=""
																											alt="Invocie receipt file image"
																											:src="tr.contractFilePreview"
																											class="thumb-img"
																										/>
																									</div>
																									<div class="dz-details d-flex align-items-center">
																										<div class="dz-filename">
																											<span>
																												{{ tr.contractFile?.name }}
																											</span>
																										</div>
																										<div class="ml-2 mt-2 preview close-design">
																											<button type="button" class="drop-close" @click="removeInvoiceReceiptFile(index)">
																												<FontAwesomeIcon :icon="closeIcon" />
																											</button>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</new-tb-td>
															</new-tb-tr>
															<new-tb-tr class="bottom_border">
																<new-tb-th>{{ t('invoiceList.invoiceData.attachmentsAction') }}</new-tb-th>
																<new-tb-td
																	><div class="d-flex align-items-center justify-content-center w-10 ms-2">
																		<button type="button" class="close-btn" @click="removeRow(index)">
																			<FontAwesomeIcon :icon="closeIcon" />
																		</button></div
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faTimes, faCalendarWeek, faPlus, faPaperclip, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ref } from '@vue/reactivity';
import { vatTypeOptionsNew } from '@/utils/enums.js';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
export default {
	name: 'AddAttachment',

	props: {
		isModalShow: Object,
		formFields: Object,
	},

	components: {
		FontAwesomeIcon,
	},
	setup(props) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const formFieldsData = ref(props.formFields);
		const calenderIcon = faCalendarWeek;
		const closeIcon = faTimes;
		const plusIcon = faPlus;
		const paperClip = faPaperclip;
		const contractFile = ref(null);
		const imageFile = ref(null);
		// file var
		const invoiceReceiptFile = ref(null);
		const invoiceReceiptFilePreview = ref('');
		const invoiceMultiFile = ref(null);
		const invoiceMultiFilePreview = ref('');

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		const tableIndex = ref(0);

		// icons
		const clodeicone = faTimes;
		const downArrowIcon = faChevronDown;
		const pinIcon = faPaperclip;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// globle store
		const store = useStore();
		//receipt file
		const receiptItem = ref([
			{
				purchase_place: null,
				purchase_date: null,
				receipt_file: '',
				contractFile: null,
				contractFilePreview: null,
			},
		]);

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			receiptItem.value = [];
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// handle upload receipt file
		const handleInvoiceRecieptFile = acceptedFiles => {
			invoiceReceiptFile.value = acceptedFiles[0]; // store file
			formFieldsData.value.receiptFileField.value = acceptedFiles[0];

			// file preview
			invoiceReceiptFilePreview.value = ['image/png'].includes(acceptedFiles[0].type) ? URL.createObjectURL(acceptedFiles[0]) : require('@/assets/images/iconWomanDraw.png');
		};

		// handle upload multi file
		const handleInvoiceMultiFile = acceptedFiles => {
			invoiceMultiFile.value = acceptedFiles[0]; // store file
			formFieldsData.value.multiFileField.value = acceptedFiles[0];

			// file preview
			invoiceMultiFilePreview.value = ['image/png', 'image/jpg', 'image/svg', 'image/jpeg', 'image/pdf', 'image/csv'].includes(acceptedFiles[0].type)
				? URL.createObjectURL(acceptedFiles[0])
				: require('@/assets/images/iconWomanDraw.png');
		};

		const handleContractFileChange = (file, index) => {
			imageFile.value = file;
			const formData = new FormData();
			formData.append('file', file[0]);
			formData.append('file_upload_from', 'invoice');

			store.dispatch('uploadImage', formData).then(res => {
				receiptItem.value[index].receipt_file = res.data.tempUploadFile?.id;
				receiptItem.value[index].contractFile = file[0]; // store file
				receiptItem.value[index].contractFilePreview = ['image/png', 'image/jpg', 'image/svg', 'image/jpeg', 'image/pdf', 'image/csv'].includes(file[0].type)
					? res.data.file_link
					: require('@/assets/images/iconWomanDraw.png');

				formFieldsData.value.receiptFileField.value = receiptItem.value || [];
			});
		};

		const handleChangeAttachement = (value, index, textType) => {
			receiptItem.value[index][textType] = value ?? null;
			formFieldsData.value.receiptFileField.value = receiptItem.value || [];
		};

		// remove document file
		const removeInvoiceReceiptFile = index => {
			receiptItem.value[index].contractFile = null; // store file

			// file preview
			receiptItem.value[index].contractFilePreview = null;
		};

		const addReceiptDetail = () => {
			receiptItem.value.push({
				purchase_place: '',
				purchase_date: '',
				receipt_file: '',
				contractFile: '',
				contractFilePreview: '',
				file_path: '',
			});
		};
		//remove item
		const removeRow = index => {
			receiptItem.value.splice(index, 1);
		};

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
			//ref
			t,
			vatTypeOptionsNew,
			modalShow,
			formFieldsData,
			receiptItem,
			// icons
			clodeicone,
			downArrowIcon,
			calenderIcon,
			closeIcon,
			plusIcon,
			paperClip,
			pinIcon,
			arrowDown,
			arrowUp,

			// file vars
			invoiceReceiptFile,
			invoiceMultiFile,
			invoiceReceiptFilePreview,
			invoiceMultiFilePreview,
			contractFile,

			// methods
			handleInvoiceRecieptFile,
			handleInvoiceMultiFile,
			removeInvoiceReceiptFile,
			addReceiptDetail,
			removeRow,
			handleContractFileChange,
			handleChangeAttachement,
			openTable,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';
@import '@/assets/scss/style.scss';

.modal-content {
	.model {
		width: 100%;
		padding: 20px 40px;
		border-radius: 25px;
		border: 2px dashed #e4e6e7;
		position: relative;
		overflow: auto;

		@media (max-width: 576px) {
			padding: 20px 20px;
		}
		.collapse-div {
			margin-top: 20px;
		}

		.close-icone {
			width: 20px;
			height: 20px;
			font-size: 20px;
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
		}

		.attachments {
			padding: 20px 0;
			font-weight: 700;
			text-align: center;
		}

		.input-title {
			font-size: 16px;
			margin-bottom: 5px;
			font-weight: 500;
			color: #858a90;
		}

		.input-pera {
			width: 300px;
			padding: 7px 10px;
			font-size: 11px;
			height: 70px;
			border-radius: 12px;
			border: 2px dashed #e4e6e7;
		}

		.input-back {
			border: none;
			background-color: #f6f6f6;
		}

		.text-prize {
			padding: 20px 0;
		}

		.input-fill {
			width: 100%;
			font-size: 14px;
			background: transparent;
			outline: none;
			border: none;
		}

		.text-center {
			text-align: center;
		}

		.btn-color {
			display: flex;
			align-items: center;

			::-webkit-file-upload-button {
				border: 1px solid #273238;
				border-radius: 10px;
				background-color: #273238;
				color: #fff;
				padding: 8px;
				float: right;
				margin-right: 0;
			}
		}

		.pph-right {
			.btn-common {
				padding: 8px 17px;
				font-size: 13px;
			}
		}
	}
}

.img-preview {
	position: absolute;
	right: 0;
}
.dz-img-wrap {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-100%);
	@media (max-width: 1440px) {
		right: -68px;
		left: auto;
	}
	@media (max-width: 1024px) {
		top: -2px;
		right: -49px;
		left: auto;
	}
	@media (max-width: 550px) {
		top: 35px;
		right: -10px;
		left: auto;
		transform: translateX(0);
	}
	@media (max-width: 375px) {
		top: 33px;
	}

	.dz-image {
		min-width: 45px;
		width: 45px;
		object-fit: cover;
		height: 45px;
		border-radius: 50%;
		overflow: hidden;

		.thumb-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		@media (max-width: 1024px) {
			min-width: 43px;
			width: 43px;
			height: 43px;
		}
		@media (max-width: 425px) {
			min-width: 35px;
			width: 35px;
			height: 35px;
		}
	}
}

.close-btn {
	background-color: #ff4b57;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	min-width: 30px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.add-row {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.plus {
		cursor: pointer;
		color: #ffff;
		max-width: 30px;
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		border-radius: 50%;
		background-color: #ff4b57;

		@media (max-width: 1200px) {
			max-width: 30px;
			height: 30px;
		}

		@media (max-width: 576px) {
			max-width: 30px;
			height: 30px;
		}
	}
}

.plus-border-text {
	.pph-left {
		.add-text {
			min-width: 570px;
			width: 100%;

			@media (max-width: 1024px) {
				min-width: 0;
			}
		}
	}
}

.form-model {
	padding: 12px 15px;
	background-color: #fbfbfb;
	border-radius: 25px;
	position: relative;

	@media (max-width: 575px) {
		font-size: 13px;
		padding: 12px 10px;
	}
}

.calender-icon {
	right: 0;
	top: 50%;
	transform: translate(-30px, -50%);
}

.dz-filename span {
	display: none;
}

.invoice-dropdown {
	padding: 12px 15px;
	background-color: #fbfbfb;
	border: 1px solid #eaeaea;
	height: unset;
	border-radius: 25px;

	&:focus {
		box-shadow: none;
	}

	&:after {
		display: none;
	}
}

.w-full {
	width: 100%;
}

.preview {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 20px;
	transform: translateY(30%);
	height: 20px;
	background-color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 425px) {
		width: 15px;
		height: 15px;
	}
}

.daily-work-overflow {
	@media (max-width: 768px) {
		overflow: auto;
	}
}

.daily-work-col {
	width: 100%;
	min-width: 800px;
}

.details-head {
	display: flex;
	align-items: center;
	background-color: #273238;
	padding: 10px 10px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	color: #fff;
}

.details-content {
	display: flex;
	align-items: center;
	padding: 15px;
	background-color: #00000006;
	box-shadow: 0px 1px 1px 0px #00000014;
	border-radius: 10px;
}

.text-gray {
	color: $colorDarkGrey;
	font-weight: 900;
}

.text-light-gray {
	color: #a0a4aa;
}

.title-lg {
	@media (max-width: 575px) {
		font-size: 14px;
	}
}

.btn-common {
	@media (max-width: 575px) {
		padding: 5px 10px;
		font-size: 12px;
	}
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
@media (max-width: 768px) {
	.drop-zone {
		font-size: 15px;
	}

	.drop-zone span {
		white-space: pre-wrap;
		font-size: 13px !important;
		line-height: 1.2 !important;
	}
	.drop-zone span font font {
		line-height: 1.2 !important;
	}
}
@media (max-width: 425px) {
	.close-design .svg-inline--fa.fa-w-11 {
		width: 0.4875em !important;
	}

	.drop-zone span {
		font-size: 12px !important;
	}
}
@media (max-width: 1024px) {
	.close-design .svg-inline--fa.fa-w-11 {
		width: 0.5875em !important;
	}
}
@media (max-width: 1024px) {
	.table__data .table-auto {
		overflow: visible !important;
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
