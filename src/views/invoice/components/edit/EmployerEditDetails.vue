<template>
	<div class="employerDetails">
		<!-- title -->
		<div class="payment-pill-header mb-4">
			<!-- employer details -->
			<div class="pph-left">
				<h5 class="title-lg white-space mr-2">{{ t('fieldList.recipientDetails') }}</h5>
			</div>

			<!-- select employer -->
			<div class="select-employee">
				<Multiselect
					id="employerList"
					class="form-group"
					:placeholder="t('common.selectRecipient')"
					v-model="selectedEmployerId"
					:options="employerList"
					@change="empListChage($event)"
					mode="single"
					:canDeselect="true"
					disabled
				/>
			</div>
		</div>
		<!-- employer details -->
		<div class="pph-left-box large-table" v-if="employerDetails">
			<div class="pph-left-content">
				<div class="company-content">
					<!-- company name -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.name') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.company_name) || '-' }}
						</p>
					</div>
					<!-- contact name -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.contractName') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.user && employerDetails.company.user.full_name) || '-' }}
						</p>
					</div>

					<!-- company email -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.email') }}:</p>
						<p class="company-value">
							{{ employerDetails.company && employerDetails.company.company_email }}
						</p>
					</div>

					<!-- company phone -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.phone') }}:</p>
						<p class="company-value">
							{{ employerDetails.company && employerDetails.company.mobile }}
						</p>
					</div>

					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.residence') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.countryReference && employerDetails.company.countryReference.country_name) || '-' }}
						</p>
					</div>

					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.city') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.cityReference && employerDetails.company.cityReference.city_name) || '-' }}
						</p>
					</div>

					<!-- company address -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.address') }}:</p>
						<p class="company-value">
							{{ employerDetails.company && employerDetails.company.address }}
						</p>
					</div>
				</div>

				<div class="company-content">
					<!-- employer tax no. -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.zipCode') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.zip_code) || '-' }}
						</p>
					</div>

					<!-- employer y tunnus -->
					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.reg_number) || '-' }}
						</p>
					</div>

					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.operator_code) || '-' }}
						</p>
					</div>

					<div class="company-text">
						<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
						<p class="company-value">
							{{ (employerDetails.company && employerDetails.company.vat_number) || '-' }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- responsive data -->
		<div class=" attachment-table responsive-table mb-4">
			<div v-if="employerDetails">
				<div>
					<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(index, item)">
						<div class="d-flex">
							<div>
								{{ (employerDetails.company && employerDetails.company.company_name) || '-' }}
							</div>
						</div>
						<div>
							<a>
								<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== index" class="arrowIcon" />
							</a>

							<a>
								<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === index" class="arrowIcon" />
							</a>
						</div>
					</div>
				</div>
				<div class="border-padding">
					<div v-if="tableIndex === index" class=" pph-left-box">
						<div class="pph-left-content">
							<div class="company-content">
								<!-- company name -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.name') }}:</p>
									<p class="company-value">
										{{ (employerDetails.company && employerDetails.company.company_name) || '-' }}
									</p>
								</div>
								<!-- company email -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.email') }}:</p>
									<p class="company-value">
										{{ employerDetails.company && employerDetails.company.user && employerDetails.company.user.email }}
									</p>
								</div>

								<!-- company phone -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.phone') }}:</p>
									<p class="company-value">
										{{ employerDetails.company && employerDetails.company.user && employerDetails.company.user.phone_number }}
									</p>
								</div>

								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.residence') }}:</p>
									<p class="company-value">
										{{ employerDetails.company && employerDetails.company.countryReference && employerDetails.company.countryReference.country_name }}
									</p>
								</div>

								<!-- company address -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.address') }}:</p>
									<p class="company-value">
										{{ employerDetails.company && employerDetails.company.address }}
									</p>
								</div>
							</div>

							<div class="company-content">
								<!-- employer tax no. -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.zipCode') }}.:</p>
									<p class="company-value">
										{{ (employerDetails.company && employerDetails.company.zip_code) || '-' }}
									</p>
								</div>

								<!-- employer y tunnus -->
								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.employerYTunnus') }}:</p>
									<p class="company-value">
										{{ (employerDetails.company && employerDetails.company.reg_number) || '-' }}
									</p>
								</div>

								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.operatorCode') }}:</p>
									<p class="company-value">
										{{ (employerDetails.company && employerDetails.company.operator_code) || '-' }}
									</p>
								</div>

								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.vatNumber') }}:</p>
									<p class="company-value">
										{{ (employerDetails.company && employerDetails.company.vat_number) || '-' }}
									</p>
								</div>

								<div class="company-text">
									<p class="company-titel">{{ t('fieldList.Type') }}:</p>
									<p class="company-value" v-if="employerDetails.company.is_private == true">
										{{ t('invoiceList.leInvoice.addInvoice.private') }}
									</p>
									<p class="company-value" v-else>
										{{ t('common.company') }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Add employer form -->
	<Suspense v-if="showAddEmployerModal.value">
		<template #default>
			<AddEmployerModal v-model:isModalShow="showAddEmployerModal" @newEmployeeAdded="fetchEmplist" />
		</template>
	</Suspense>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import { useI18n } from 'vue-i18n';
import { onMounted } from '@vue/runtime-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AddEmployerModal from '@/views/invoice/components/AddEmployerModal';
import { faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '@/utils/mixins';

export default {
	name: 'EmployerEditDetails',

	components: {
		Multiselect,
		FontAwesomeIcon,
		AddEmployerModal,
	},

	props: {
		formFields: Object,
	},

	setup(props) {
		// icone
		const plusIcon = faPlus;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		const isAddEmployerModalShow = ref(false);

		const formFieldsData = ref(props.formFields);

		// global store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		const tableIndex = ref(0);
		const index = ref(0);

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(() => {
			fetchEmplist();
		});

		/**
		 * computed props
		 * *******************************************************************
		 */
		const empListChage = event => {
			formFieldsData.value.selectedEmployerId.value = event ?? null;
		};
		// get employer list
		const employerList = computed(() => {
			return store.getters['invoice/getEmployerList'];
		});

		const selectedEmployerId = computed(() => {
			return store.state.invoice.CompanyIdInv;
		});

		// employer details
		const employerDetails = computed(() => {
			return employerList.value.find(x => {
				if (x.company.id === formFieldsData.value.selectedEmployerId.value) {
					formFieldsData.value.quickPayStatus.value = x.company.quick_pay_status || false;
					return true;
				}
			});
		});

		const showAddEmployerModal = computed({
			get() {
				return isAddEmployerModalShow;
			},

			set(val) {
				isAddEmployerModalShow.value = val;
			},
		});

		/**
		 * Methods Properties
		 * *******************************************************************
		 */
		const toggleAttachmentModal = () => {
			showAddEmployerModal.value = true;
		};

		const fetchEmplist = async () => {
			await store.dispatch('invoice/getDefaultEmployerList');
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
			index,
			dateFormat,
			t,
			// ref
			selectedEmployerId,
			formFieldsData,
			// computed props
			employerList,
			empListChage,
			employerDetails,
			// icons
			plusIcon,
			arrowDown,
			arrowUp,
			showAddEmployerModal,
			toggleAttachmentModal,
			fetchEmplist,

			openTable,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.responsive-table {
	.collapse-div {
		background-color: #f9f9f9;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
	.border-padding {
		background-color: #f9f9f9;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
}

.select-employee {
	width: 40%;
	border-radius: 12px;
	background-color: #ffff;
	border-radius: 20px;

	@media (max-width: 575px) {
		width: 50%;
	}
}
.payment-pill-header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 1024px) {
		text-align: left !important;
	}

	@media (max-width: 768px) {
	}
	.pph-left {
		color: #a0a4a9;
	}
	.plus-modal {
		cursor: pointer;
		color: #ffff;
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-color: #ff4b57;
		border: 2px solid #ffe4e6;
	}
}
.title-lg {
	font-size: 24px;
}
.oligona-title {
	margin-bottom: 5px;
}
.pencilIcon {
	color: #ff4b57;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #f8dddf;
	display: flex;
	justify-content: center;
	align-items: center;
}
.add-recipt-btn {
	padding: 8px 10px;
	font-size: 14px;
}
.pph-left-box {
	padding: 19px;
	border-radius: 20px;
	background-color: #f9f9f9;
	.company-content {
		padding: 10px 0;
		.company-text {
			display: flex;
			margin-bottom: 5px;
			@media (max-width: 576px) {
				display: block;
			}
			.company-titel {
				max-width: 160px;
				width: 100%;
				font-size: 15px;
				font-weight: 500;
				color: #858a90;
			}
		}
		.company-value {
			font-size: 14px;
			margin-bottom: 5px;
			font-weight: 500;
		}
	}
	.company-sub-content {
		padding: 19px;
		border-radius: 20px;
		background-color: #f2f2f2;
	}
}
</style>
<style lang="scss">
.multiselect-input {
	font-size: 14px;
}
.multiselect-options {
	overflow: auto;
	border-radius: 10px;
}
.multiselect-option {
	background-color: #ffffff;
	font-size: 14px;
	min-height: 45px;
}
.multiselect-option.is-selected.is-pointed {
	color: #000;
	background: #ffff;
}
.multiselect-option.is-selected {
	color: #ff4b57;
	background-color: #ffff;
}
.trip-time {
	padding: 5px 15px !important;
	display: block !important;

	.form-control {
		border: none;
		width: 100%;
		padding: 0;
		height: auto;
	}
	.vc-time-picker {
		padding: 0 !important;
		.vc-time-icon {
			width: 22px;
			height: 22px;
		}
	}
	.vc-time-date {
		display: none !important;
	}
	.vc-select select {
		background: none;
		border: none;

		&:hover {
			color: #000000;
		}
	}
}
</style>
