<template>
	<div class="deducation__list pt-3">
		<!-- invoice list Seeker -->
		<div class="row">
			<!-- header -->
			<div class="payment-pill-header py-3 text-left">
				<h5 class="title-lg">{{ t('invoiceList.invoiceData.deductionList') }}</h5>
			</div>


			<div class="row m-0">
				<div class="col-12 px-0">
					<div v-if="deductionListItem.length > 0">
						<div class="deducation-box d-md-flex justify-content-between align-items-start p-4">
							<div>
								<h5 class="text-white mb-2">{{ t('invoiceList.leInvoice.addInvoice.deductions') }}</h5>
								<p class="fn15 mb-md-0 mb-2">{{ t('invoiceList.leInvoice.addInvoice.dedDesc') }}</p>
							</div>
							<div class="poduct-wrapper">
								<div v-for="(row, index) in deductionListItem || []" :key="index">
									<div class="mb-1 d-flex justify-content-between">
										<p class="product-name">{{ row.deduction_notes || '-' }} ({{ Number(row.total_parts - row.deducted_parts) }} {{ t('invoiceList.leInvoice.addInvoice.left') }})</p>
										<p class="product-price">€ {{ row.parts_amount.toFixed(2) || 0 }}</p>
									</div>
								</div>

								<div class="mb-1 d-flex justify-content-sm-between justify-content-end gap-sm-0 gap-1 pt-3">
									<p class="product-name text-sm-start text-end">{{ t('workDetails.total') }}</p>
									<p class="product-price">€ {{ deductionListTotal }}</p>
								</div>
							</div>
						</div>
					</div>
					<div v-else>
						<div class="text-center p-4 no-data-border">{{ t('common.noDataAvailable') }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- invoice list Seeker End -->
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { vatTypeOptionsNew } from '@/utils/enums.js';
import { onMounted, watch } from '@vue/runtime-core';
import { dateFormat } from '@/utils/mixins';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
	name: 'EditAttachment',

	props: {
		isModalShow: Object,
		formFields: Object,
	},

	components: {
	},

	setup(props) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const editFormFieldsData = ref(props.formFields);

		// global store
		const store = useStore();
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		//receipt file
		const deductionListItem = ref([]);
		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			deductionListItem.value = [];
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		const receiptData = computed(() => store.state.invoice?.invoiceInfo?.deductions);

		const deductionListTotal = computed(() => {
			const subTotal = deductionListItem.value.reduce((acc, item) => {
				const total = item.parts_amount;
				acc += total || 0;
				return acc;
			}, 0);
			return subTotal.toFixed(2) || 0;
		});

		watch(receiptData, () => {
			deductionListItem.value = receiptData.value.map(x => ({
				id: x.id,
				payment_term: x.payment_term || '',
				parts_amount: x.parts_amount,
				deduction_notes: x.deduction_notes || null,
				total_parts: x.total_parts || null,
				deducted_parts: x.deducted_parts || null,
			}));
		});

		return {
			//ref
			receiptData,
			t,
			vatTypeOptionsNew,
			modalShow,
			editFormFieldsData,
			deductionListItem,
			dateFormat,
			deductionListTotal,

		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
@import '@/assets/scss/modal.scss';

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

.dz-img-wrap {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-100%);

	.dz-image {
		min-width: 30px;
		width: 50px;
		object-fit: cover;
		height: 40px;

		.thumb-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}

.close-btn {
	background-color: #ff4b57;
	border-radius: 50%;
	width: 30px;
	height: 30px;
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
}

.calender-icon {
	right: 0;
	top: 50%;
	transform: translate(-30px, -50%);
}

.dz-filename span {
	font-size: 12px;
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

.invoice-dropdown {
	padding: 10px 20px;
}

.w-full {
	width: 100%;
}

.b-bottom {
	border-bottom: 1px solid red;
	padding-bottom: 20px;
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

.payment-pill-header {
	.title-lg {
		color: #a0a4a9;
	}
}

.deducation-box {
	background-color: #000;
	border-radius: 5px;
	color: #fff;

	@media (max-width: 768px) {
	}

	h5 {
		font-size: 18px;
		font-weight: 600;
	}

	.poduct-wrapper {
		font-size: 15px;
		font-weight: 500;

		.product-name {
			min-width: 150px;
		}

		.product-price {
			padding-left: 10px;
			min-width: 80px;
			text-align: end;
		}
	}
}

.fn15 {
	font-size: 15px;
}
.no-data-border {
	border-bottom: 1px solid #ccc;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	border-top: 1px solid #ccc;
	border-radius: 15px;
}
</style>
