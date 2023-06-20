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
							type="text"
							class="company-sub-input"
							placeholder="Reference"
							id="teamTax"
							@input="formFieldsData.referenceNumberField.handleChange"
							@blur="formFieldsData.referenceNumberField.handleBlur"
							v-model="formFieldsData.referenceNumberField.value"
							disabled
						/>
					</p>
				</div>

				<!-- invoice date -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.invoice_date') }}</p>

					<p class="company-input input-date rounded-md">
						<v-date-picker
							@input="formFieldsData.invoiceDateField.handleChange"
							@blur="formFieldsData.invoiceDateField.handleBlur"
							v-model="formFieldsData.invoiceDateField.value"
							:masks="{ input: 'DD.MM.YYYY' }"
							class="d-flex justify-content-center align-items-center"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<input class="form-control" :value="inputValue" v-on="inputEvents" disabled />

								<div class="calender-icon d-flex justify-content-center align-items-center mr-2">
									<FontAwesomeIcon :icon="calenderIcon" class="text-light text-sm" />
								</div>
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
						<div class="select-employee">
							<Multiselect
								id="paymentTerms"
								class=""
								:placeholder="
									t('validation.selectField', {
										field: 'placeholder.selectDays',
									})
								"
								:options="paymrntTermsOptions"
								mode="single"
								v-model="formFieldsData.paymentTermField.value"
								:canDeselect="true"
								:searchable="true"
							/>
						</div>
						<p class="text-danger">
							{{ formFieldsData.paymentTermField.errorMessage }}
						</p>
					</div>
				</div>
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.due_date') }}</p>
					<p class="company-input input-date rounded-md">
						<v-date-picker v-model="dueDateAddDaysTeam" :masks="{ input: 'DD.MM.YYYY' }" :min-date="new Date()" class="d-flex justify-content-center align-items-center pr-2">
							<template v-slot="{ inputValue, inputEvents }">
								<input class="form-control" :value="inputValue" v-on="inputEvents" disabled />

								<div class="calender-icon d-flex justify-content-center align-items-center">
									<FontAwesomeIcon :icon="calenderIcon" class="text-light text-sm" />
								</div>
							</template>
						</v-date-picker>
					</p>
				</div>

				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('fieldList.teamId') }}</p>
					<div class="w-100">
						<div class="select-employee">
							<Multiselect
								id="teamShardTypeId"
								class="form-group"
								@input="formFieldsData.teamGroupField.handleChange"
								@blur="formFieldsData.teamGroupField.handleBlur"
								:placeholder="
									t('validation.selectField', {
										field: 'fieldList.selectTeamGroup',
									})
								"
								v-model="formFieldsData.teamGroupField.value"
								:options="teamGroupList"
								@change="tripsStartTime($event)"
								label="team_name"
								mode="single"
								:canDeselect="true"
							/>
							<p class="text-danger">
								{{ formFieldsData.teamGroupField.errorMessage }}
							</p>
						</div>
					</div>
				</div>

				<!-- vat -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.vat') }} %</p>
					<div class="company-input p-0 border-0 rounded-md">
						<Multiselect
							id="teamVatType"
							class="company-sub-input form-group"
							:options="vatTypeOptionsNew"
							mode="single"
							v-model="formFieldsData.vatField.value"
							:canDeselect="true"
							@input="vatHandleChange"
							:searchable="true"
						/>
					</div>
				</div>

				<!-- due date error message -->
				<p class="text-danger">
					{{ formFieldsData.dueDateField.errorMessage }}
				</p>

				<!-- Selected date -->
				<div class="company-text company-text-item">
					<p class="company-titel">{{ t('invoiceList.leInvoice.addInvoice.selectDate') }}</p>
					<div class="gap-2 d-flex align-items-center">
						<p class="company-input input-date rounded-md">
							<v-date-picker
								@input="formFieldsData.workStratDateField.handleChange"
								@blur="formFieldsData.workStratDateField.handleBlur"
								v-model="formFieldsData.workStratDateField.value"
								:masks="{ input: 'DD.MM.YYYY' }"
								class="d-flex justify-content-center align-items-center pr-2"
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input class="form-control" :value="inputValue" v-on="inputEvents" />

									<div class="calender-icon d-flex justify-content-center align-items-center">
										<FontAwesomeIcon :icon="calenderIcon" class="text-light text-sm" />
									</div>
								</template>
							</v-date-picker>
						</p>

						<p class="company-input input-date rounded-md">
							<v-date-picker
								@input="formFieldsData.workEndDateField.handleChange"
								@blur="formFieldsData.workEndDateField.handleBlur"
								v-model="formFieldsData.workEndDateField.value"
								:masks="{ input: 'DD.MM.YYYY' }"
								class="d-flex justify-content-center align-items-center pr-2"
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input class="form-control" :value="inputValue" v-on="inputEvents" />

									<div class="calender-icon d-flex justify-content-center align-items-center">
										<FontAwesomeIcon :icon="calenderIcon" class="text-light text-sm" />
									</div>
								</template>
							</v-date-picker>
						</p>
					</div>
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
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, computed, ref, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendarWeek, faPaperclip, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import Multiselect from '@vueform/multiselect';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { vatTypeOptions, vatTypeOptionsNew, paymrntTermsOptions } from '@/utils/enums.js';
import moment from 'moment';
import emiter from '@/helpers/eventHub';

export default {
	name: 'InvoiceForm',

	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	props: {
		formFields: Object,
	},

	setup(props) {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const formFieldsData = ref(props.formFields);
		const vatChange = ref(null);

		// ref vars
		const isAddEmployerModalShow = ref(false);

		const isAddTeamInvoiceModalShow = ref(false);
		const isCollapseOpen = ref(false);

		const store = useStore();

		//  global route
		const route = useRoute();

		// icons
		const paperClipIcon = faPaperclip;
		const usersIcon = faUsers;
		const calenderIcon = faCalendarWeek;
		const plusIcon = faPlus;

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('teamInvoice/getAllTeamInvoiceGroup');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get team group list
		const teamGroupList = computed(() => {
			return store.getters['teamInvoice/getTeamGroupOptions'];
		});

		// show add employer form
		const showAddEmployerModal = computed({
			get() {
				return isAddEmployerModalShow;
			},

			set(val) {
				isAddEmployerModalShow.value = val;
			},
		});

		const showAddTeamInvoiceModal = computed({
			get() {
				return isAddTeamInvoiceModalShow;
			},

			set(val) {
				isAddTeamInvoiceModalShow.value = val;
			},
		});

		const vatHandleChange = event => {
			store.commit('invoice/SET_STATE', {
				action: 'vatHandler',
				data: event,
			});
		};

		const dueDateAddDaysTeam = computed(() => {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			formFieldsData.value.dueDateField.value = moment(formFieldsData.value.invoiceDateField.value)
				.add(formFieldsData.value.paymentTermField.value, 'days')
				.format();
			return moment(formFieldsData.value.invoiceDateField.value)
				.add(formFieldsData.value.paymentTermField.value, 'days')
				.format();
		});

		onBeforeUnmount(() => {
			emiter.$off('vatUpdate');
			emiter.$off('paymentTermsUpdate');
			emiter.$off('quickPayStatusUpdate');
		});

		/**
		 * Methods Properties
		 * *******************************************************************
		 */
		const showDetails = () => {
			isCollapseOpen.value = !isCollapseOpen.value;
		};

		const toggleAttachmentModal = () => {
			showAddEmployerModal.value = true;
		};

		const toggleTeamInvoiceModal = () => {
			showAddTeamInvoiceModal.value = true;
		};

		const tripsStartTime = () => {
			if (formFieldsData.value.workStratDateField.value != null && formFieldsData.value.workEndDateField.value != null) {
				localStorage.removeItem('workDetails');
			}
		};
		const toggleExpandInvoiceForm = () => {};

		const onQuickPayFiled = () => {
			formFieldsData.value.quickPayField.value = !formFieldsData.value.quickPayField.value;
			return formFieldsData.value.quickPayField.value;
		};

		return {
			tripsStartTime,
			paymrntTermsOptions,

			// translate function
			t,
			route,

			// refs
			formFieldsData,
			vatTypeOptions,
			vatTypeOptionsNew,
			vatChange,
			isCollapseOpen,

			// icons
			paperClipIcon,
			usersIcon,
			calenderIcon,
			plusIcon,

			// computed
			showAddEmployerModal,
			showAddTeamInvoiceModal,
			vatHandleChange,
			teamGroupList,
			dueDateAddDaysTeam,

			// methods
			toggleAttachmentModal,
			toggleTeamInvoiceModal,
			toggleExpandInvoiceForm,
			showDetails,
			onQuickPayFiled,
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

	.pph-left {
		color: #a0a4a9;
	}
}

.btn-common {
	padding: 10px 15px;
	font-size: 14px;

	@media (max-width: 576px) {
		white-space: nowrap;
	}
}

.calender-icon {
	width: 30px;
	height: 30px;
	min-width: 30px;
	border-radius: 100%;
	background-color: #000;
}

.text-sm {
	font-size: 13px;
}

.pph-left-box.showMore {
	overflow: unset;

	.company-content {
		height: 100%;
	}
}

.plus {
	cursor: pointer;
	color: #ffff;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	border-radius: 50%;
	background-color: #ff4b57;
	border: 4px solid #ffe4e6;
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

			@media (max-width: 576px) {
				display: block;
			}

			.company-titel {
				max-width: 160px;
				width: 100%;
				font-size: 14px;
				font-weight: 500;
				color: #858a90;
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

.invoice__list .invoice-dropdown {
	background-color: #fff;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	border-radius: 50px;
	font-size: 14px;

	&:focus {
		box-shadow: none;
	}
}

.dropdown-menu {
	padding: 15px;
	border: transparent;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	color: #949494;
}

.dropdown-item {
	padding: 8px 0px;
	color: rgb(80, 76, 76);

	&:hover {
		background-color: transparent;
		color: red;
	}
}

.show-detail {
	display: none;
}

.showMore .show-detail {
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
