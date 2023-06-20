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

		<!-- PaymentSharing List -->
		<EditPaymentSharingList ref="paymentSharingRef" :vat="vatAmount" :quickPayStat="quickPayStat" />

		<!-- AddAttachment section start -->
		<EditAttachment :formFields="formFields" />
		<!-- AddAttachment SECTION END -->

		<hr />

		<!-- invoice explanation -->
		<div>
			<h5 class="title-lg text-gray mt-2">{{ t('common.explanation') }}</h5>
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

		<!-- add invoice -->
		<ToolTip :title="t('toolTip.updateTeam')">
			<div class="text-center mt-5 pb-3">
				<button class="btn-common btn-red" @click="updateInvoice" :disabled="paymentSharingRef?.teamMembers.length === 0 || paymentSharingRef?.leftToShareAmount !== 0 || isSubmitting">
					{{ t('common.update') }}
				</button>
			</div>
		</ToolTip>
	</div>
</template>

<script>
import { onMounted, onUnmounted, watch, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import moment from 'moment';
import { useI18n } from 'vue-i18n';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useSwal } from '@/components/sweetalert';

import EmployerEditDetails from '@/views/teamInvoice/components/edit/EmployerEditDetails';
import InvoiceForm from '@/views/teamInvoice/components/edit/InvoiceForm';
import EditPaymentSharingList from '@/views/teamInvoice/components/EditPaymentSharingList';
import EditAttachment from '@/views/teamInvoice/components/edit/EditAttachment';

library.add(faArrowLeft);

export default {
	name: 'Edit Invoice',
	components: {
		EmployerEditDetails,
		InvoiceForm,
		EditPaymentSharingList,
		EditAttachment,
	},

	setup() {
		// ref
		const dateTime = Math.floor(10000000 + Math.random() * 90000000);
		const startDate = ref(null);
		const endDate = ref(null);
		const teamGroupId = ref(null);
		const vatAmount = ref(null);
		const paymentTerms = ref(null);
		const quickPayStat = ref(false);
		const isSubmitting = ref(false);
		// template ref
		const paymentSharingRef = ref(null);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('invoiceList.editTeamInvoice')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		// global route
		const route = useRoute();

		// sweetalert
		const Swal = useSwal();

		// icon
		const rightIcon = faArrowRight;
		const leftArrowIcon = faArrowLeft;

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
			reference_number: yup
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
			work_strat_date: yup
				.string()
				.nullable()
				.notRequired(),
			work_end_date: yup
				.string()
				.nullable()
				.notRequired(),
			penalty_interest: yup
				.number()
				.nullable()
				.optional(),
			delivery_date: yup
				.string()
				.nullable()
				.optional(),
			notice_period: yup
				.number()
				.nullable()
				.optional(),
			tax_vero: yup
				.number()
				.nullable()
				.optional(),
			vat: yup
				.number()
				.nullable()
				.optional(),
			invoice_description: yup
				.string()
				.nullable()
				.optional(),
			invoice_attachments: yup
				.array()
				.nullable()
				.optional(),
			multiFile: yup.mixed().notRequired(),
			teamId: yup
				.number()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.teamId',
					}),
				),
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
			useField('reference_number', undefined, {
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

		const noticePeriodField = reactive(
			useField('notice_period', undefined, {
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
				initialValue: null,
			}),
		);

		const receiptFileField = reactive(useField('invoice_attachments', undefined, { initialValue: null }));

		const multiFileField = reactive(useField('multiFile', undefined, { initialValue: null }));

		const invoiceDescriptionField = reactive(useField('invoice_description', undefined, { initialValue: null }));
		const teamGroupField = reactive(
			useField('teamId', undefined, {
				initialValue: 0,
			}),
		);
		const workStratDateField = reactive(
			useField('work_strat_date', undefined, {
				initialValue: null,
			}),
		);
		const workEndDateField = reactive(
			useField('work_end_date', undefined, {
				initialValue: null,
			}),
		);
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
			penaltyInterestField,
			deliveryDateField,
			noticePeriodField,
			taxField,
			vatField,
			receiptFileField,
			multiFileField,
			invoiceDescriptionField,
			teamGroupField,
			workStratDateField,
			workEndDateField,
			selectedEmployerId,
			quickPayField,
			quickPayStatus,
		});

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			// edit invoice by id
			store.dispatch('teamInvoice/editTeamInvoice', route.params.id).then(({ data }) => {
				if (data.invoice_workhours) {
					localStorage.setItem('workDetails', JSON.stringify(data.invoice_workhours));
				}

				store.commit('teamInvoice/SET_STATE', {
					action: 'CompanyId',
					data: data?.team_invoice_company?.companyId,
				});
				// set value edit form
				setValues({
					companyId: data?.team_invoice_company?.companyId,
					invoice_number: data.invoice_number,
					reference_number: data.ref_number || null,
					invoice_date: data.created_at,
					payment_terms: data.payment_terms || 0,
					due_date: data.due_date,
					penalty_interest: data.penalty_interest || 0,
					delivery_date: data.delivery_date || '',
					notice_period: data.notice_period == 'null' ? '' : data.notice_period,
					tax_vero: data.tax_vero || 0,
					vat: data.vat || 0,
					invoice_description: data.description,
					invoice_attachments: data.invoice_files || null,
					receiptFile: data.receiptFile,
					multiFile: data.multiFile,
					teamId: data.teamId,
					company_id: data.company?.id,
					purchase_place: null,
					rece_description: null,
					purchase_date: null,
					amount: null,
					vat_att: null,
					vat_free: null,
					work_strat_date: null,
					work_end_date: null,
					quick_pay_status: data.quick_pay_status || false,
				});
				return true;
			});

			// get tax field value
			store.dispatch('teamInvoice/getInvoiceTax');
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

		// invoice edit info
		const invoiceEditInfo = computed(() => {
			const editInvoiceData = store.state.teamInvoice.editTeamWorkDetailList;
			if (editInvoiceData.invoice_workhours) {
				localStorage.setItem('workDetails', JSON.stringify(editInvoiceData.invoice_workhours));
			}

			store.commit('teamInvoice/SET_STATE', {
				action: 'CompanyId',
				data: editInvoiceData.companyId,
			});
			// set value edit form
			setValues({
				invoice_number: editInvoiceData.invoice_number,
				reference_number: editInvoiceData.reference_number || 123,
				invoice_date: editInvoiceData.created_at,
				payment_terms: editInvoiceData.payment_terms || 0,
				due_date: editInvoiceData.due_date,
				penalty_interest: editInvoiceData.penalty_interest || 0,
				delivery_date: editInvoiceData.delivery_date || '',
				notice_period: editInvoiceData.notice_period == 'null' ? '' : editInvoiceData.notice_period,
				tax_vero: editInvoiceData.tax_vero || 0,
				vat: editInvoiceData.vat || 0,
				invoice_description: editInvoiceData.description,
				receiptFile: editInvoiceData.receiptFile,
				multiFile: editInvoiceData.multiFile,
				teamGroupId: editInvoiceData.teamId,
				company_id: editInvoiceData.company?.id,
				purchase_place: null,
				rece_description: null,
				purchase_date: null,
				amount: null,
				vat_att: null,
				vat_free: null,
				work_strat_date: null,
				work_end_date: null,
			});
			return editInvoiceData;
		});

		const getTaxDetail = computed(() => {
			return store.state.teamInvoice.invoiceTaxInfo;
		});

		/**
		 * Methods
		 * *******************************************************************
		 */

		// submit form
		const updateInvoice = handleSubmit(async values => {
			isSubmitting.value = true;
			const workDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
			values.worked_hours = JSON.stringify(workDetails);
			values.due_date = moment(values.due_date).format('YYYY/MM/DD');

			values.team_worked_hours = store.state.teamInvoice.editTeamWorkDetailList.invoice_seekers.map((x, index) => {
				const sharePart = store.state.teamInvoice.editPaymentSharing.find(y => y.seekerId === x.seekerId);
				return {
					seekerId: x.seekerId,
					total_hours_amount: Number(x.worked_value),
					total_compensation: Number(x.compensation_amount),
					sub_total: store.getters['teamInvoice/editCalculateTotalOfSeeker'](index),
					quick_pay_commission: store.getters['teamInvoice/editCalculateQuickPayCommisionOfSeeker'](index, vatAmount.value, quickPayStat.value),
					quick_pay_percentage: x.quick_pay_percentage,
					health_insurance: store.getters['teamInvoice/editCalculateHealthInsuranceOfSeeker'](index),
					accident_insurance: store.getters['teamInvoice/editCalculateAccidentInsuranceOfSeeker'](index),
					w2w_commission: store.getters['teamInvoice/editCalculateW2WCommisionOfSeeker'](index),
					health_insurance_per: store.state.teamInvoice.editTeamWorkDetailList.health_insurance || 0,
					accident_insurance_per: store.state.teamInvoice.editTeamWorkDetailList.accident_insurance || 0,
					w2w_commission_per: store.state.teamInvoice.editTeamWorkDetailList.w2w_commission,
					tax_amount: store.getters['teamInvoice/editCalculateTaxableAmountOfSeeker'](index),
					tax: x.tax,
					hours_amount_after_tax: store.getters['teamInvoice/editCalculateHourAmountAfterTaxableAmountOfSeeker'](index),
					share_amount: sharePart.shared_amount,
					shared_percentage: sharePart.shared_percentage,
				};
			});
			values.invoice_attachments = values.invoice_attachments.filter(x => x.receipt_file && typeof x.receipt_file === 'number');
			// delivery date
			if (values.delivery_date) {
				values.delivery_date = moment(values.delivery_date).format('YYYY/MM/DD');
			} else {
				values.delivery_date = null;
			}
			await store
				.dispatch('teamInvoice/updateInvoiceById', {
					id: route.params.id,
					payload: values,
				})
				.then(() => {
					isSubmitting.value = false;
					resetForm();
					localStorage.removeItem('workDetails');
					localStorage.removeItem('invoiceWorkDetails');
					window.location.href = '/team-invoices';
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

		const fetchWorkDetails = async (startDates, endDates, teamGroupIds, paymentTerms) => {
			let payload = {
				teamId: teamGroupIds,
				start_date: startDates,
				end_date: endDates,
				payment_terms: paymentTerms,
			};

			return await store.dispatch('teamInvoice/getTeamWorkDetails', payload);
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(getTaxDetail, () => {
			taxField.value = getTaxDetail.value;
		});

		watch(formFields.value, () => {
			startDate.value = moment(formFields.value.workStratDateField.value).format('YYYY/MM/DD') ?? null;
			endDate.value = moment(formFields.value.workEndDateField.value).format('YYYY/MM/DD') ?? null;
			teamGroupId.value = formFields.value.teamGroupField.value ?? 0;
			vatAmount.value = formFields.value.vatField.value;
			paymentTerms.value = formFields.value.paymentTermField.value;
			quickPayStat.value = formFields.value.quickPayStatus.value;

			// set vat, payment terms, quickpay stat in localstorage
			localStorage.setItem('teamInvoiceVat', formFields.value.vatField.value);
			localStorage.setItem('quickPayStat', quickPayStat.value);
		});

		watch([startDate, endDate, teamGroupId, paymentTerms], () => {
			if (startDate.value != 'Invalid date' && endDate.value != 'Invalid date' && teamGroupId.value != 0) {
				fetchWorkDetails(startDate.value, endDate.value, teamGroupId.value, paymentTerms.value);
			}
		});

		return {
			//ref
			t,
			startDate,
			endDate,
			teamGroupId,
			paymentSharingRef,
			updateInvoice,
			vatAmount,
			paymentTerms,
			quickPayStat,

			//form
			isSubmitting,
			handleSubmit,
			resetForm,
			invoiceNumberField,
			formFields,

			// computed
			invoiceEditInfo,
			getTaxDetail,

			//method
			fetchWorkDetails,

			// icon
			rightIcon,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice-pd {
	padding: 10px 20px;
}

.invoice__list {
	.text-gray {
		margin-bottom: 15px;
	}
	.explaination {
		padding: 10px;
		border-radius: 12px;
		outline: none;
		width: 100%;
		border: 3px dashed #dde0e2;
	}
}
</style>
