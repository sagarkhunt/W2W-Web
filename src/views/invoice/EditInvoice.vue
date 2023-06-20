<template>
	<!-- invoice list -->
	<div class="invoice__list card-space">
		<div class="invoice-sec">
			<div class="row">
				<div class="col-xl-6">
					<!-- employer details -->
					<EmployerEditDetails :formFields="formFields" />
				</div>
				<div class="col-xl-6">
					<!-- invoice form -->
					<InvoiceForm :formFields="formFields" />
				</div>
			</div>
		</div>

		<!-- daily work hour list start-->
		<DailyWorkHourList v-if="isInvoiceDetailFetched" :formFields="formFields" class="p-0" />
		<!-- daily work hour list End -->

		<!-- deducation list priority start -->
		<EditDeducationList :formFields="formFields" />
		<!-- deducation list priority end -->

		<!-- AddAttachment section start -->
		<EditAttachment :formFields="formFields" />
		<!-- AddAttachment SECTION END -->

		<hr />

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
		</div>
		<ToolTip :title="t('toolTip.updateInvoice')">
			<div class="text-center mt-5 pb-3">
				<button type="button" class="btn-common btn-red" @click="updateInvoice" :disabled="isSubmitting">{{ t('common.update') }}</button>
			</div>
		</ToolTip>
	</div>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import EmployerEditDetails from '@/views/invoice/components/edit/EmployerEditDetails';
import InvoiceForm from '@/views/invoice/components/edit/InvoiceForm';
import DailyWorkHourList from '@/views/invoice/components/edit/DailyWorkHourList';
import EditAttachment from '@/views/invoice/components/edit/EditAttachment';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, reactive, ref, watch, onUnmounted } from 'vue';
import { dateFormat } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';
import EditDeducationList from '@/views/invoice/components/edit/EditDeducationList';

export default {
	name: 'Edit Invoice',
	components: {
		EmployerEditDetails,
		InvoiceForm,
		DailyWorkHourList,
		EditAttachment,
		EditDeducationList,
	},

	setup() {
		// ref
		const dateTime = Math.floor(10000000 + Math.random() * 90000000);
		const receiptItem = ref([
			{
				purchase_place: null,
				purchase_date: null,
				receipt_file: '',
				contractFile: null,
				contractFilePreview: null,
			},
		]);
		const isInvoiceDetailFetched = ref(false);

		const isSubmitting = ref(false);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('invoiceList.editInvoice')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// global route
		const route = useRoute();

		// sweetalert
		const Swal = useSwal();

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
				.notRequired(),
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
				.optional(),
			invoice_attachments: yup
				.array()
				.nullable()
				.optional(),

			invoice_deducation: yup
				.array()
				.nullable()
				.optional(),
			companyId: yup
				.number()
				.nullable()
				.notRequired(),
			quick_pay_status: yup.boolean(),

			quick_pay: yup.boolean(),
		});

		// form validation intialize
		const { handleSubmit, resetForm, setValues } = useForm({
			validationSchema: invoiceSchema,
		});

		const invoiceNumberField = reactive(
			useField('invoice_number', undefined, {
				initialValue: `INV${dateTime}`,
			}),
		);

		const referenceNumberField = reactive(
			useField('ref_number', undefined, {
				initialValue: dateTime,
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
				initialValue: 10,
			}),
		);

		const vatField = reactive(
			useField('vat', undefined, {
				initialValue: null,
			}),
		);

		const receiptFileField = reactive(useField('invoice_attachments', undefined, { initialValue: null }));
		const deducationFileField = reactive(useField('invoice_deducation', undefined, { initialValue: null }));
		const multiFileField = reactive(useField('multiFile', undefined, { initialValue: null }));
		const invoiceDescriptionField = reactive(useField('invoice_description', undefined, { initialValue: null }));
		const workedHoursId = reactive(useField('worked_hourIds', undefined, { initialValue: null }));
		const selectedEmployerId = reactive(useField('companyId', undefined, { initialValue: null }));
		const quickPayField = reactive(useField('quick_pay_status', undefined, { initialValue: false }));
		const quickPayStatus = reactive(useField('quick_pay', undefined, { initialValue: null }));

		// form fields
		const formFields = ref({
			invoiceNumberField,
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
			deducationFileField,
			multiFileField,
			invoiceDescriptionField,
			workedHoursId,
			selectedEmployerId,
			quickPayField,
			quickPayStatus,
		});

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// edit invoice by id
			store
				.dispatch('invoice/editInvoice', route.params.id)
				.then(({ data }) => {
					const editInvoiceData = data;
					if (editInvoiceData.worked_hours) {
						// Work deatisl ids
						let workDairiesDetails = localStorage.getItem('invoiceWorkDairiesDetails') ? JSON.parse(localStorage.getItem('invoiceWorkDairiesDetails')) : [];
						if (workDairiesDetails != '') {
							store.commit('invoice/upda', workDairiesDetails);
						}
						localStorage.setItem(
							'workDetails',
							JSON.stringify(
								editInvoiceData.worked_hours.map(x => ({
									...x,
									fullHalfDayCompensationAmount: x.fullHalfDayCompensation?.compensation_value || 0,
									lunchCompensationAmount: x.lunchCompensation?.compensation_value || 0,
									otherCompensationAmount: x.other_compensation,
								})),
							),
						);
					}

					store.commit('invoice/SET_STATE', {
						action: 'CompanyIdInv',
						data: editInvoiceData.companyId,
					});

					// set value edit form
					setValues({
						invoice_number: editInvoiceData.invoice_number,
						ref_number: editInvoiceData.ref_number || null,
						invoice_date: editInvoiceData.created_at,
						payment_terms: editInvoiceData.payment_terms || 0,
						due_date: editInvoiceData.due_date,
						contract_date: editInvoiceData.contract_date ?? null,
						penalty_interest: editInvoiceData.penalty_interest || 0,
						delivery_date: editInvoiceData.delivery_date || '',
						notice_period: editInvoiceData.notice_period == '' || editInvoiceData.notice_period == null ? 0 : editInvoiceData.notice_period,
						tax_vero: editInvoiceData.tax || 0,
						vat: editInvoiceData.vat || 0,
						quick_pay_status: editInvoiceData.quick_pay_status || 0,
						invoice_description: editInvoiceData.description,
						invoice_deducation: editInvoiceData.deductions || [],
						invoice_attachments:
							editInvoiceData.invoice_files.reduce((acc, item) => {
								acc.push({
									purchase_place: item.purchase_place,
									purchase_date: item.purchase_date,
									receipt_file: item.file_name,
									contractFilePreview: item.file_path,
								});
								return acc;
							}, []) || [],
						companyId: editInvoiceData.companyId,
					});
				})
				.finally(() => {
					isInvoiceDetailFetched.value = true;
				});

			// get tax field value
			store.dispatch('invoice/getInvoiceTax');
		});

		onUnmounted(() => {
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			store.commit('invoice/RESET_STATE');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get tax field value computed
		const getTaxDetail = computed(() => {
			return store.state.invoice.invoiceTaxInfo;
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form
		const updateInvoice = handleSubmit(async values => {
			isSubmitting.value = true;
			const workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			var exists = values.invoice_attachments.some(function(receiptItem) {
				return receiptItem === values.invoice_attachments;
			});

			values.worked_hours = JSON.stringify(workDetails);
			values.delivery_date = null;
			values.due_date = moment(values.due_date).format('YYYY/MM/DD');
			values.contract_date = values.contract_date == null ? null : moment(values.contract_date).format('YYYY/MM/DD');
			values.invoice_attachments = values.invoice_attachments.filter(x => x.receipt_file && typeof x.receipt_file === 'number');
			await store
				.dispatch('invoice/updateInvoiceById', {
					id: route.params.id,
					payload: values,
				})
				.then(() => {
					isSubmitting.value = false;
					resetForm();
					localStorage.removeItem('invoiceWorkDairiesDetails');
					localStorage.removeItem('workDetails');
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

		watch(getTaxDetail, () => {
			taxField.value = getTaxDetail.value;
		});

		return {
			t,
			isInvoiceDetailFetched,
			receiptItem,
			dateFormat,
			updateInvoice,
			handleSubmit,
			resetForm,
			isSubmitting,
			invoiceNumberField,
			formFields,

			// computed
			getTaxDetail,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice__list {
	.invoice-pd {
		padding: 10px 20px;
	}

	.text-gray {
		margin-bottom: 15px;
		color: #a0a4a9;
	}
	.explaination {
		padding: 10px;
		border-radius: 12px;
		outline: none;
		border: 3px dashed #dde0e2;
		width: 100%;
		font-weight: 600;
		font-size: 14px;
		background-color: #f6f6f6;
	}
}
</style>
