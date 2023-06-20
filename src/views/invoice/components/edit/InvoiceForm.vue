<template>
	<div class="invoice_form">
		<!-- title -->
		<div class="payment-pill-header">
			<div>
				<h5 class="title-lg">{{ t('invoiceList.invoiceData.invoiceData') }}</h5>
			</div>
		</div>

		<!-- invoice form -->
		<div class="pph-left-box" :class="{ showMore: isCollapseOpen }">
			<div class="company-content">
				<!-- invoice number -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.invoice_number') }}</p>
					<p class="company-input rounded-md">
						<input
							type="text"
							@input="formFieldsData.invoiceNumberField.handleChange"
							@blur="formFieldsData.invoiceNumberField.handleBlur"
							v-model="formFieldsData.invoiceNumberField.value"
							placeholder="Enter Invoice number"
							class="company-sub-input"
							disabled
						/>
					</p>
				</div>

				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.ourRef') }}</p>
					<p class="company-input rounded-md">
						<input
							type="number"
							class="company-sub-input"
							placeholder="Reference"
							id="ourReference"
							@input="formFieldsData.referenceNumberField.handleChange"
							@blur="formFieldsData.referenceNumberField.handleBlur"
							v-model="formFieldsData.referenceNumberField.value"
							disabled
						/>
						<!-- disabled -->
					</p>
				</div>

				<!-- invoice date -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.invoiceDate') }}</p>
					<p class="company-input input-date rounded-md">
						<v-date-picker
							@input="formFieldsData.invoiceDateField.handleChange"
							@blur="formFieldsData.invoiceDateField.handleBlur"
							v-model="formFieldsData.invoiceDateField.value"
							:masks="{ input: 'DD.MM.YYYY' }"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<input class="form-control" :value="inputValue" v-on="inputEvents" disabled />
							</template>
						</v-date-picker>
					</p>
				</div>

				<!-- invoice date error message -->
				<p class="text-danger">
					{{ formFieldsData.invoiceDateField.errorMessage }}
				</p>

				<!-- payment terms -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.payment_terms') }}</p>
					<div class="w-100">
						<div class="p-0 company-input border-0 rounded-md">
							<Multiselect
								id="vatType"
								class="company-sub-input form-group"
								placeholder="Select Days"
								:options="paymrntTermsOptions"
								mode="single"
								v-model="formFieldsData.paymentTermField.value"
								:canDeselect="true"
								@input="paymentTermsHandleChange"
								:searchable="true"
							/>
						</div>
						<!-- payment terms error message -->
						<p class="text-danger">
							{{ formFieldsData.paymentTermField.errorMessage }}
						</p>
					</div>
				</div>

				<!-- due date -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.dueDate') }}</p>
					<div class="w-100">
						<div class="company-input input-date pr-2 rounded-md">
							<v-date-picker v-model="editdueDateAddDays" :masks="{ input: 'DD.MM.YYYY' }">
								<template v-slot="{ inputValue, inputEvents }">
									<input class="form-control" :value="inputValue" v-on="inputEvents" disabled />
								</template>
							</v-date-picker>
						</div>
						<!-- due date error message -->
						<p class="text-danger">
							{{ formFieldsData.dueDateField.errorMessage }}
						</p>
					</div>
				</div>

				<!-- tax -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.tax') }} ({{ t('fieldList.vero') }}%)</p>
					<p class="company-input rounded-md">
						<input
							type="text"
							class="company-sub-input"
							placeholder="Enter Tax"
							id="tax"
							@input="formFieldsData.taxField.handleChange"
							@blur="formFieldsData.taxField.handleBlur"
							v-model="formFieldsData.taxField.value"
							disabled
						/>
					</p>
				</div>
				<!-- vat -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.vat') }} %</p>
					<p class="company-input p-0 border-0 rounded-md">
						<Multiselect
							id="vatType"
							class="company-sub-input form-group"
							:options="vatTypeOptions"
							v-model="formFieldsData.vatField.value"
							mode="single"
							:canDeselect="true"
							@input="vatHandleChange"
							:searchable="true"
						/>
					</p>
				</div>
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.quickPay') }}</p>
					<div class="form-check form-checkbox">
						<input
							class="form-check-input form-checkbox-width"
							type="checkbox"
							id="multipleDays"
							:checked="formFieldsData.quickPayField.value"
							:value="formFieldsData.quickPayField.value"
							:v-model="formFieldsData.quickPayField.value"
							@click="onQuickPayFiled($event)"
							:disabled="!formFieldsData.quickPayStatus.value"
						/>
					</div>
				</div>
				<!-- contract date -->
				<div class="show-detail">
					<div class="company-text company-text-item">
						<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.contractDate') }}</p>
						<p class="company-input input-date pr-2 rounded-md">
							<v-date-picker
								@input="formFieldsData.contractDateField.handleChange"
								@blur="formFieldsData.contractDateField.handleBlur"
								v-model="formFieldsData.contractDateField.value"
								:masks="{ input: 'DD.MM.YYYY' }"
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input class="form-control" :value="inputValue" v-on="inputEvents" />
								</template>
							</v-date-picker>
						</p>
					</div>
				</div>
			</div>
			<div class="text-center">
				<a class="text-red fw-bold show-more" @click="showDetails"> {{ isCollapseOpen ? t('invoiceList.lessDetails') : t('invoiceList.showDetails') }} </a>
			</div>
		</div>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { computed, ref } from '@vue/reactivity';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import Multiselect from '@vueform/multiselect';
import { vatTypeOptions, paymrntTermsOptions } from '@/utils/enums.js';
import moment from 'moment';
import emiter from '@/helpers/eventHub';
import { useStore } from 'vuex';
import { onBeforeUnmount } from '@vue/runtime-core';

export default {
	name: 'InvoiceForm',

	components: {
		Multiselect,
	},

	props: {
		formFields: Object,
	},

	setup(props) {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const formFieldsData = ref(props.formFields);
		// ref vars
		const isAddEmployerModalShow = ref(false);
		const isCollapseOpen = ref(false);

		// icons
		const paperClipIcon = faPaperclip;
		const store = useStore();

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// show add employer form
		const showAddEmployerModal = computed({
			get() {
				return isAddEmployerModalShow;
			},

			set(val) {
				isAddEmployerModalShow.value = val;
			},
		});

		const editdueDateAddDays = computed(() => {
			formFieldsData.value.dueDateField.value = moment(formFieldsData.value.invoiceDateField.value)
				.add(formFieldsData.value.paymentTermField.value, 'days')
				.format();
			return moment(formFieldsData.value.invoiceDateField.value)
				.add(formFieldsData.value.paymentTermField.value, 'days')
				.format();
		});

		const vatHandleChange = event => {
			formFieldsData.value.vatField.value = Number(event);
			emiter.$emit('vatUpdate', event);
			store.commit('invoice/SET_STATE', {
				action: 'vatHandler',
				data: event,
			});
		};
		//chnage dpayment terms
		const paymentTermsHandleChange = event => {
			formFieldsData.value.paymentTermField.value = Number(event);
			emiter.$emit('paymentTermsUpdate');
		};

		const onQuickPayFiled = () => {
			formFieldsData.value.quickPayField.value = !formFieldsData.value.quickPayField.value;
			emiter.$emit('quickPayStatusUpdate');
			return formFieldsData.value.quickPayField.value;
		};

		/**
		 * Methods Properties
		 * *******************************************************************
		 */
		const toggleAttachmentModal = () => {
			showAddEmployerModal.value = true;
		};

		const showDetails = () => {
			isCollapseOpen.value = !isCollapseOpen.value;
		};

		const showLessDetails = () => {
			isCollapseOpen.value == isCollapseOpen.value;
		};

		onBeforeUnmount(() => {
			emiter.$off('vatUpdate');
			emiter.$off('paymentTermsUpdate');
			emiter.$off('quickPayStatusUpdate');
		});

		return {
			// translate function
			t,

			// refs
			formFieldsData,
			vatTypeOptions,
			isCollapseOpen,
			paymrntTermsOptions,

			// icons
			paperClipIcon,

			// computed
			showAddEmployerModal,
			editdueDateAddDays,
			vatHandleChange,
			// methods
			toggleAttachmentModal,
			showDetails,
			showLessDetails,
			onQuickPayFiled,
			paymentTermsHandleChange,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.payment-pill-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	.title-lg {
		color: #a0a4a9;
	}
}
.title-lg {
	font-size: 24px;
}
.btn-common {
	padding: 10px 15px;
	font-size: 14px;

	@media (max-width: 576px) {
		white-space: nowrap;
	}
}
.pph-left-box {
	padding: 19px;
	border-radius: 20px;
	background-color: #f9f9f9;
	.text-red {
		color: #ff4b57;
		font-weight: 600;
		font-size: 13px;
		text-decoration: underline;
		margin: 0 auto;
		cursor: pointer;
	}
	.company-content {
		padding: 10px 0;
		.company-text {
			display: flex;
			align-items: flex-start;
			margin-bottom: 5px;
			.company-titel {
				max-width: 160px;
				width: 100%;
				font-size: 14px;
				font-weight: 500;
				color: #858a90;
			}
			@media (max-width: 576px) {
				display: block;
			}

			.company-input {
				width: 100%;
				padding: 8px 15px;
				background-color: #ffff;
				border: 1px solid #e7e7e7;

				.company-sub-input {
					width: 100%;
					font-size: 14px;
					outline: none;
					border: none;
					background: transparent;
				}
				.sub-input {
					width: 70%;
				}
			}

			.input-date {
				padding: 1px;
				.form-control {
					border: none;
					background-color: transparent;
				}
			}
		}

		.company-text-item {
			align-items: center;
		}
		.company-value {
			font-size: 14px;
			margin-bottom: 5px;
			font-weight: 500;
		}

		.days-net {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.net {
				font-size: 14px;
				font-weight: 500;
				color: #858a90;
				white-space: nowrap;
			}
		}
		.details {
			margin-top: 5px;
			text-align: center;
			button {
				color: #ff4b57;
				font-size: 14px;
				text-align: center;
				border-bottom: 1px solid #ff4b57;
			}
		}
	}
}
.show-detail {
	display: none;
}
.showMore .show-detail {
	display: block;
}
.showMore .show-less {
	display: block;
}
.form-checkbox {
	.form-checkbox-width {
		width: 1.4em;
		height: 1.4em;
		margin: 0 0 0 -19px;

		&:focus {
			box-shadow: none;
		}
	}
}
.form-check-input:checked {
	background-color: #565e64;
	border-color: #565e64;
}

.form-check-input:focus {
	border-color: #565e64;
}
</style>
