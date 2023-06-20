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

		<!-- PaymentSharing List -->
		<PaymentSharingList ref="paymentSharingRef" :vat="vatAmount" :quickPayStat="quickPayStat" />

		<!-- AddAttachment section start -->
		<AddAttachment :formFields="formFields" />
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
		<div class="text-center mt-5 pb-3">
			<ToolTip :title="t('toolTip.saveTeam')">
				<button class="btn-common btn-red" @click="submitForm" :disabled="paymentSharingRef?.teamMembers.length === 0 || paymentSharingRef?.leftToShareAmount !== 0 || isSubmitting">
					{{ t('common.save') }}
				</button>
			</ToolTip>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, watch, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import moment from 'moment';
import { useI18n } from 'vue-i18n';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useSwal } from '@/components/sweetalert';

import EmployerDetails from '@/views/teamInvoice/components/EmployerDetails';
import InvoiceForm from '@/views/teamInvoice/components/InvoiceForm';
import PaymentSharingList from '@/views/teamInvoice/components/PaymentSharingList';
import AddAttachment from '@/views/teamInvoice/components/AddAttachment';
import { useRouter } from 'vue-router';

library.add(faArrowLeft);

export default {
	name: 'Add Team Invoice',
	components: {
		EmployerDetails,
		InvoiceForm,
		PaymentSharingList,
		AddAttachment,
	},

	setup() {
		document.title = 'Add team invoice - Way2Work';
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
		document.title = `${t('invoiceList.addTeamInvoice')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		// sweetalert
		const Swal = useSwal();

		// global router
		const router = useRouter();

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
				.required(
					t('validation.requiredField', {
						field: 'invoiceList.invoiceData.employerDetails',
					}),
				),
			quick_pay_status: yup.boolean(),

			quick_pay: yup.boolean(),
		});

		// form validation intialize
		const { handleSubmit, resetForm } = useForm({
			validationSchema: invoiceSchema,
		});

		const invoiceNumberField = reactive(
			useField('invoice_number', undefined, {
				initialValue: `INV${dateTime}`,
			}),
		);

		const referenceNumberField = reactive(
			useField('reference_number', undefined, {
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
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			store.dispatch('teamInvoice/getInvoiceTax');
		});

		onUnmounted(() => {
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			store.commit('teamInvoice/RESET_STATE');
			store.commit('teamInvoice/RESET_STATE_WOORK_DETAILS');
		});

		/**
		 * Computed
		 * *******************************************************************
		 */
		const getTaxDetail = computed(() => {
			return store.state.teamInvoice.invoiceTaxInfo;
		});

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
			values.team_worked_hours = store.state.teamInvoice.teamWorkDetailList.team_members.map((x, index) => {
				const sharePart = store.state.teamInvoice.paymentSharing.find(y => y.seekerId === x.seekerId);
				return {
					seekerId: x.seekerId,
					worked_hours: x.seeker.work_hours,
					total_hours_amount: Number(x.seeker_total_worked_value),
					total_compensation: Number(x.seeker_total_compensation),
					sub_total: store.getters['teamInvoice/calculateTotalOfSeeker'](index),
					quick_pay_commission: store.getters['teamInvoice/calculateQuickPayCommisionOfSeeker'](index, vatAmount.value, quickPayStat.value),
					quick_pay_percentage: x.seeker_quick_pay_percentage,
					health_insurance: store.getters['teamInvoice/calculateHealthInsuranceOfSeeker'](index),
					accident_insurance: store.getters['teamInvoice/calculateAccidentInsuranceOfSeeker'](index),
					w2w_commission: store.getters['teamInvoice/calculateW2WCommisionOfSeeker'](index),
					health_insurance_per: store.state.teamInvoice.teamWorkDetailList.health_insurance || 0,
					accident_insurance_per: store.state.teamInvoice.teamWorkDetailList.accident_insurance || 0,
					w2w_commission_per: store.state.teamInvoice.teamWorkDetailList.w2w_commission,
					tax_amount: store.getters['teamInvoice/calculateTaxableAmountOfSeeker'](index),
					tax: x.seeker_tax_percentage,
					hours_amount_after_tax: store.getters['teamInvoice/calculateHourAmountAfterTaxableAmountOfSeeker'](index),
					share_amount: sharePart.shared_amount,
					shared_percentage: sharePart.shared_percentage,
				};
			});
			await store
				.dispatch('teamInvoice/addTeamInvoice', values)
				.then(() => {
					isSubmitting.value = false;
					resetForm();
					localStorage.removeItem('workDetails');
					router.push({ name: 'Team Invoice List' });
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

		const fetchWorkDetails = async (startDates, endDates, teamGroupIds, paymentTerms, quickpayStat) => {
			let payload = {
				teamId: teamGroupIds,
				start_date: startDates,
				end_date: endDates,
				payment_terms: paymentTerms,
				quick_pay_status: quickpayStat,
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
			quickPayStat.value = formFields.value.quickPayField.value;

			// set vat, payment terms, quick pay stat in local storage
			localStorage.setItem('teamInvoiceVat', formFields.value.vatField.value);
			localStorage.setItem('quickPayStat', quickPayStat.value);
		});

		watch([startDate, endDate, teamGroupId, paymentTerms, quickPayStat], () => {
			if (startDate.value != 'Invalid date' && endDate.value != 'Invalid date' && teamGroupId.value != 0) {
				fetchWorkDetails(startDate.value, endDate.value, teamGroupId.value, paymentTerms.value, quickPayStat.value);
			}
		});

		return {
			//ref
			t,
			startDate,
			endDate,
			teamGroupId,
			paymentSharingRef,
			paymentTerms,
			quickPayStat,

			vatAmount,

			//form
			isSubmitting,
			submitForm,
			handleSubmit,
			resetForm,
			invoiceNumberField,
			formFields,

			// computed
			getTaxDetail,

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
