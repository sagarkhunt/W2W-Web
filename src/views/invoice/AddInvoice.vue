<template>
	<!-- invoice list -->
	<div class="invoice__list card-space">
		<div class="invoice-sec">
			<div class="row">
				<div class="col-xl-6">
					<!-- employer details -->
					<EmployerDetails :formFields="formFields" />
				</div>
				<div class="col-xl-6">
					<!-- invoice form -->
					<InvoiceForm :formFields="formFields" />
				</div>
			</div>
		</div>

		<!-- daily work hour list -->
		<DailyWorkHourList :formFields="formFields" />
		<!-- daily work hour list edn  -->

		<!-- deducation list priority start -->
		<DeducationList :formFields="formFields" />
		<!-- deducation list priority end -->
		<!-- AddAttachment section start -->
		<AddAttachment :formFields="formFields" />
		<!-- AddAttachment SECTION END -->

		<hr />
		<!-- explanation start -->
		<div>
			<h5 class="title-lg text-gray">{{ t('common.explanation') }}</h5>
			<textarea
				rows="4"
				class="explaination"
				:placeholder="
					t('validation.enterField', {
						field: 'placeholder.typeYourExplanation',
					})
				"
				@input="formFields.invoiceDescriptionField.handleChange"
				@blur="formFields.invoiceDescriptionField.handleBlur"
				v-model="formFields.invoiceDescriptionField.value"
			></textarea>
			<p class="text-danger">
				{{ formFields.invoiceDescriptionField.errorMessage }}
			</p>
		</div>
		<!-- explanation end -->
		<!-- save button -->
		<ToolTip :title="t('toolTip.saveInvoice')">
			<div class="text-center mt-5 pb-3">
				<button type="button" class="btn-common btn-red" @click="submitForm" :disabled="isSubmitting">{{ t('common.save') }}</button>
			</div>
		</ToolTip>
		<!-- save button -->
	</div>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import EmployerDetails from '@/views/invoice/components/EmployerDetails';
import InvoiceForm from '@/views/invoice/components/InvoiceForm';
import DailyWorkHourList from '@/views/invoice/components/DailyWorkHourList';
import AddAttachment from '@/views/invoice/components/AddAttachment';
import DeducationList from '@/views/invoice/components/DeducationList';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import moment from 'moment';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, watch, computed, reactive, ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSwal } from '../../components/sweetalert';

library.add(faArrowLeft);

export default {
	components: {
		EmployerDetails,
		InvoiceForm,
		DailyWorkHourList,
		AddAttachment,
		DeducationList,
	},

	setup() {
		// ref
		const dateTime = Math.floor(10000000 + Math.random() * 90000000);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('invoiceList.addInvoice')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		// icon
		const rightIcon = faArrowRight;
		const leftArrowIcon = faArrowLeft;
		const isSubmitting = ref(false);

		// form schema validation
		const invoiceSchema = yup.object({
			invoice_number: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.invoice_number',
					}),
				)
				.min(2),
			ref_number: yup
				.string()
				.nullable()
				.optional()
				.min(2),
			invoice_date: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.invoice_date',
					}),
				),
			payment_terms: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.payment_terms',
					}),
				),
			due_date: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.due_date',
					}),
				),
			contract_date: yup.string().nullable(),
			penalty_interest: yup
				.number()
				.nullable()
				.optional(),
			delivery_date: yup
				.string()
				.nullable()
				.optional(),
			tax_vero: yup
				.number()
				.nullable()
				.optional(),
			vat: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.vat',
					}),
				),
			invoice_description: yup
				.string()
				.nullable()
				.optional()
				.max(400),
			invoice_attachments: yup
				.array()
				.nullable()
				.optional(),
			companyId: yup
				.number()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'invoiceList.invoiceData.employerDetails',
					}),
				),
			quick_pay_status: yup.boolean(),

			quick_pay: yup.boolean(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, resetForm } = useForm({
			validationSchema: invoiceSchema,
		});

		const invoiceNumberField = reactive(
			useField('invoice_number', undefined, {
				initialValue: `INV${dateTime}`,
			}),
		);

		const referenceNumberField = reactive(
			useField('ref_number', undefined, {
				initialValue: null,
			}),
		);

		const invoiceDateField = reactive(
			useField('invoice_date', undefined, {
				initialValue: moment().format('MM-DD-YYYY'),
			}),
		);

		const paymentTermField = reactive(
			useField('payment_terms', undefined, {
				initialValue: null,
			}),
		);

		const dueDateField = reactive(
			useField('due_date', undefined, {
				initialValue: null,
			}),
		);

		const contractDateField = reactive(
			useField('contract_date', undefined, {
				initialValue: null,
			}),
		);

		const penaltyInterestField = reactive(
			useField('penalty_interest', undefined, {
				initialValue: null,
			}),
		);

		const deliveryDateField = reactive(
			useField('delivery_date', undefined, {
				initialValue: null,
			}),
		);

		const taxField = reactive(
			useField('tax_vero', undefined, {
				initialValue: 0,
			}),
		);

		const vatField = reactive(
			useField('vat', undefined, {
				initialValue: '0',
			}),
		);

		const receiptFileField = reactive(useField('invoice_attachments', undefined, { initialValue: null }));
		const multiFileField = reactive(useField('multiFile', undefined, { initialValue: null }));
		const invoiceDescriptionField = reactive(useField('invoice_description', undefined, { initialValue: null }));
		const selectedEmployerId = reactive(useField('companyId', undefined, { initialValue: null }));
		const quickPayField = reactive(useField('quick_pay_status', undefined, { initialValue: false }));
		const quickPayStatus = reactive(useField('quick_pay', undefined, { initialValue: null }));

		// form fields
		const formFields = ref({
			invoiceNumberField,
			leftArrowIcon,
			referenceNumberField,
			invoiceDateField,
			paymentTermField,
			dueDateField,
			contractDateField,
			penaltyInterestField,
			deliveryDateField,
			taxField,
			vatField,
			receiptFileField,
			multiFileField,
			invoiceDescriptionField,
			selectedEmployerId,
			quickPayField,
			quickPayStatus,
		});

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			store.dispatch('invoice/getInvoiceTax');
		});

		onUnmounted(() => {
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			store.commit('invoice/RESET_STATE');
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		const getTaxDetail = computed(() => store.state.invoice.invoiceTaxInfo);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			const workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			values.worked_hours = JSON.stringify(workDetails);
			values.due_date = moment(values.due_date).format('YYYY/MM/DD');
			values.contract_date = values.contract_date == null ? null : moment(values.contract_date).format('YYYY/MM/DD');
			await store
				.dispatch('invoice/addInvoice', values)
				.then(() => {
					isSubmitting.value = false;
					resetForm();
					localStorage.removeItem('workDetails');
					localStorage.removeItem('invoiceWorkDetails');
					router.push({ name: 'Invoice List' });
				})
				.catch(err => {
					isSubmitting.value = false;
					Swal.fire({
						text: err.message.errors[0].msg,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Ok',
					});
				});

			return true;
		});
		// open page cost expenses
		const viewCostExpenses = () => {
			router.push({
				name: 'CostExpensesInvoice',
				params: '',
			});
		};

		watch(getTaxDetail, () => {
			taxField.value = getTaxDetail.value;
		});
		return {
			t,
			//form
			isSubmitting,
			formMeta,
			submitForm,
			handleSubmit,
			resetForm,
			invoiceNumberField,
			formFields,

			//method
			viewCostExpenses,

			// computed
			getTaxDetail,

			// icon
			rightIcon,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice__list {
	.text-gray {
		margin-bottom: 15px;
	}
	.cost-sec {
		background-color: #e92028;
		.info-icon {
			width: 50px;
			height: 50px;

			@media (max-width: 1200px) {
				max-width: 40px;
				height: 40px;
			}
		}

		p {
			font-size: 23px;
			font-weight: 600;
			color: #fff;
			letter-spacing: -2px;
			text-shadow: 1px 3px 3px #494848;
			white-space: nowrap;

			@media (max-width: 1200px) {
				font-size: 17px;
				letter-spacing: -2px;
			}

			@media (max-width: 1024px) {
				font-size: 16px;
			}

			@media (max-width: 768px) {
				font-size: 16px;
			}

			@media (max-width: 576px) {
				font-size: 12px;
			}
		}
		.cost-btn {
			background-color: #4c4f56;
			padding: 7px 15px;
			color: #fff;
			border-radius: 50px;
			font-size: 14px;
			letter-spacing: -1px;
			white-space: nowrap;

			@media (max-width: 1024px) {
				font-size: 12px;
				padding: 6px 12px;
				margin: 10px 0 0;
				margin-left: auto;
			}

			@media (max-width: 768px) {
				font-size: 12px;
				padding: 6px 12px;
				margin: 10px 0 0;
				margin-left: auto;
			}

			.right-icon {
				width: 25px;
				height: 25px;
				border: 2px solid #fff;
			}
		}
	}
	.explaination {
		padding: 10px;
		border-radius: 12px;
		outline: none;
		width: 100%;
		border: 3px dashed #dde0e2;
		font-weight: 600;
		font-size: 14px;
		background-color: #f6f6f6;
	}
	::placeholder {
		color: #a0a4a9;
	}
}
.dash-right-tab {
	margin-top: 0;
}
</style>

<style lang="scss" scoped>
.invoice__list {
	overflow: hidden;
}
</style>
