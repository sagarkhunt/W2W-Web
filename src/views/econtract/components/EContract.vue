<template>
	<!-- add job form -->
	<div class="add_job__form card-space">
		<form class="tab-form">
			<!-- form fields -->
			<div class="form_part">
				<!-- form title -->
				<div class="col-12 p-0">
					<h5 class="title-lg pb-4 fs-3">
						{{ t('eContract.eContractTitle') }}
					</h5>
					<h3 class="title-md pb-3">1. {{ t('eContract.contractingParties') }}</h3>
					<h3 class="title-md pb-3">1.1. {{ t('eContract.contractor') }}</h3>
				</div>
				<!-- Contractor section -->

				<!-- full name -->
				<div class="form-group col-xl-4 col-12 p-0">
					<label class="d-block" for="fullname"> {{ t('eContract.fieldList.fullName') }}<span>*</span> </label>

					<input
						class="form-control mb-2"
						id="fullName"
						type="text"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.fullName',
							})
						"
						@input="fullNameField.handleChange"
						@blur="fullNameField.handleBlur"
						:value="fullNameField.value"
					/>

					<p class="text-danger">
						{{ fullNameField.errorMessage }}
					</p>
				</div>

				<!-- Business ID / Date of Birth -->
				<div class="form-group col-xl-4 col-12 p-0">
					<label class="d-block mb-3" for="businessID"> {{ t('eContract.fieldList.businessID') }}<span>*</span> </label>

					<input
						class="form-control mb-2"
						id="businessID"
						type="text"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.businessID',
							})
						"
						@input="businessIDField.handleChange"
						@blur="businessIDField.handleBlur"
						:value="businessIDField.value"
					/>

					<p class="text-danger">
						{{ businessIDField.errorMessage }}
					</p>
				</div>

				<div class="form-group col-xl-4 col-12 p-0">
					<label class="d-block mb-3" for="contactDetails">
						{{ t('eContract.fieldList.contactDetails') }}
					</label>

					<input
						class="form-control mb-2"
						id="contactDetails"
						type="text"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.contactDetails',
							})
						"
						@input="contactDetailsField.handleChange"
						@blur="contactDetailsField.handleBlur"
						:value="contactDetailsField.value"
					/>

					<p class="text-danger">
						{{ contactDetailsField.errorMessage }}
					</p>
				</div>

				<!-- //Light entrepreneur section -->
				<div class="col-xl-4 col-12 p-0">
					<h3 class="title-md pb-3 pt-1">1.2. {{ t('eContract.lightEntrepreneur') }}</h3>
				</div>

				<!-- le full name -->
				<div class="col-xl-4 col-12 p-0">
					<label for="LEFullName"> {{ t('eContract.fieldList.LEFullName') }}<span>*</span> </label>

					<Multiselect
						id="employer"
						class="form-group px-remove"
						@input="seekerId.handleChange"
						@blur="seekerId.handleBlur"
						:placeholder="
							t('validation.selectField', {
								field: 'eContract.seeker',
							})
						"
						v-model="seekerId.value"
						:options="seekerList"
						mode="single"
						label="full_name"
						:canDeselect="true"
						:searchable="true"
						trackBy="full_name"
					/>

					<p class="text-danger">
						{{ seekerId.errorMessage }}
					</p>
				</div>

				<p class="mb-2">{{ t('eContract.eContractMsg1') }}</p>

				<div class="col-12 p-0">
					<h2 class="title-md pb-3">2. {{ t('eContract.mandateAndValidity') }}</h2>
				</div>
				<!-- mandate description -->
				<div class="form-group col-12 validity p-0">
					<label class="pb-3 jobDescription" for="jobDescription">
						{{ t('eContract.fieldList.descriptionMandate') }}
					</label>

					<textarea
						class="text-height p-3"
						name="job_description"
						id="jobDescription"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.descriptionMandate',
							})
						"
						@input="descriptionMandateFiled.handleChange"
						@blur="descriptionMandateFiled.handleBlur"
						:value="descriptionMandateFiled.value"
					></textarea>

					<p class="text-danger">
						{{ descriptionMandateFiled.errorMessage }}
					</p>
				</div>
				<!-- apply before -->
				<div class="col-12 p-0">
					<label class="text-left jobDescription mb-2">
						{{ t('eContract.fieldList.theAgreementValidFor') }}
					</label>
				</div>
				<div class="col-xl-12 col-lg-12 p-0 commission-text mb-2">
					<input class="mr-2" type="radio" id="radio-1" name="mandate_radio" :value="'deadline'" v-model="agreementRadioValue" @change="onChangeAgreementRadioValue($event)" />
					<span v-bind:class="agreementRadioValue == 'deadline' ? '' : 'radiostyleremove'">
						{{ t('eContract.fieldList.deadline') }}
						<input
							class="border-input date-input-text"
							type="date"
							id="date-1"
							name="date"
							@input="mandateStartDateDeadlineFiled.handleChange"
							@blur="mandateStartDateDeadlineFiled.handleBlur"
							:value="mandateStartDateDeadlineFiled.value"
						/>
						-
						<input
							class="border-input date-input-text"
							type="date"
							id="date-2"
							name="date"
							@input="mandateEndDateDeadlineFiled.handleChange"
							@blur="mandateEndDateDeadlineFiled.handleBlur"
							:value="mandateEndDateDeadlineFiled.value"
						/>
						{{ t('eContract.fieldList.day_month_year') }}
					</span>
				</div>

				<div class="col-12 p-0 commission-text mb-2">
					<input class="mr-2" type="radio" id="radio-2" name="mandate_radio" :value="'period_validity'" v-model="agreementRadioValue" @change="onChangeAgreementRadioValue($event)" />
					<span v-bind:class="agreementRadioValue == 'period_validity' ? '' : 'radiostyleremove'">
						{{ t('eContract.periodValidity') }}
						<input
							class="border-input date-input-text"
							type="date"
							id="date-3"
							name="date"
							@input="mandateStartDatePeriodValidityFiled.handleChange"
							@blur="mandateStartDatePeriodValidityFiled.handleBlur"
							:value="mandateStartDatePeriodValidityFiled.value"
						/>
						-
						<input
							class="border-input date-input-text"
							type="date"
							id="date-4"
							name="date"
							@input="mandateEndDatePeriodValidityFiled.handleChange"
							@blur="mandateEndDatePeriodValidityFiled.handleBlur"
							:value="mandateEndDatePeriodValidityFiled.value"
						/>
						, {{ t('eContract.periodValidityMsg1') }}
						<input
							class="border-input pb-2 mt-2"
							type="text"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.contractMonth',
								})
							"
							@input="mandateMonthsFiled.handleChange"
							@blur="mandateMonthsFiled.handleBlur"
							:value="mandateMonthsFiled.value"
						/>
						{{ t('eContract.periodValidityMsg2') }}
						<input
							class="border-input pb-2"
							type="text"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.contractDay',
								})
							"
							@input="mandateDaysFiled.handleChange"
							@blur="mandateDaysFiled.handleBlur"
							:value="mandateDaysFiled.value"
						/>
						{{ t('eContract.periodValidityMsg3') }}
					</span>
				</div>

				<div class="col-12 p-0 commission-text mb-2">
					<input class="mr-2" type="radio" id="radio-3" name="mandate_radio" :value="'far_away'" v-model="agreementRadioValue" @change="onChangeAgreementRadioValue($event)" />
					<span v-bind:class="agreementRadioValue == 'far_away' ? '' : 'radiostyleremove'">
						{{ t('eContract.so_far_from') }}
						<input
							class="border-input date-input-text"
							type="date"
							id="date-5"
							name="date"
							@input="mandateStartDateFarAwayFiled.handleChange"
							@blur="mandateStartDateFarAwayFiled.handleBlur"
							:value="mandateStartDateFarAwayFiled.value"
						/>.
					</span>
				</div>

				<div class="col-12 p-0 commission-text mb-2">
					<input class="mr-2" type="radio" id="radio-4" name="mandate_radio" :value="'until_completion'" v-model="agreementRadioValue" @change="onChangeAgreementRadioValue($event)" />
					{{ t('eContract.until_the_mandate_is_completed') }}
				</div>

				<div class="col-12 p-0 commission-text ">
					<h2 class="title-md pb-3">3. {{ t('eContract.timetable_and_reporting') }}</h2>
				</div>

				<div class="col-12 p-0 commission-text ">
					<p class="commission-text">
						{{ t('eContract.commissionText') }}
						<input
							class="border-input date-input-text"
							type="date"
							id="leStartDate"
							name="date"
							:placeholder="
								t('validation.enterField', {
									field: 'fieldList.startDate',
								})
							"
							@input="assignmentStartDateFiled.handleChange"
							@blur="assignmentStartDateFiled.handleBlur"
							:value="assignmentStartDateFiled.value"
						/>.
					</p>
				</div>

				<div class="col-12 p-0">
					<p class="commission-text mb-2">{{ t('eContract.commissionText1') }}:</p>
				</div>

				<div class="col-12 p-0">
					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="deadline-1" name="time_report" :value="'no_deadline'" v-model="assignmentType" @change="onChangeAssignmentValue($event)" />
						{{ t('eContract.no_deadline') }}
					</p>

					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="deadline-2" name="time_report" :value="'with_deadline'" v-model="assignmentType" @change="onChangeAssignmentValue($event)" />
						{{ t('eContract.by_the_deadline_which_is') }}
						<input
							class="border-input date-input-text"
							type="date"
							id="date"
							name="date"
							@input="assignmentEndDateFiled.handleChange"
							@blur="assignmentEndDateFiled.handleBlur"
							:value="assignmentEndDateFiled.value"
						/>.
					</p>

					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="deadline-3" name="time_report" :value="'milestones'" v-model="assignmentType" @change="onChangeAssignmentValue($event)" />
						{{ t('eContract.commissionText2') }}:
					</p>
				</div>

				<div class="col-12 p-0">
					<textarea
						class=""
						name="assignmentSeekerDescription"
						id="descriptionReporting"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.reportingDescription',
							})
						"
						@input="assignmentSeekerDescriptionFiled.handleChange"
						@blur="assignmentSeekerDescriptionFiled.handleBlur"
						:value="assignmentSeekerDescriptionFiled.value"
					></textarea>

					<p class="text-danger">
						{{ assignmentSeekerDescriptionFiled.errorMessage }}
					</p>
				</div>
				<div class="col-12 p-0">
					<p class="commission-text mb-2">{{ t('eContract.commissionText3') }} {{ t('eContract.commissionText4') }}):</p>
				</div>
				<div class="col-12 p-0 mb-2">
					<textarea
						class=""
						name="assig_description"
						id="assignmentCompanyDescriptionField"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.assignmentDescription',
							})
						"
						@input="assignmentCompanyDesriptionField.handleChange"
						@blur="assignmentCompanyDesriptionField.handleBlur"
						:value="assignmentCompanyDesriptionField.value"
					></textarea>
					<p class="text-danger">
						{{ assignmentCompanyDesriptionField.errorMessage }}
					</p>
				</div>
				<div class=" col-12 p-0">
					<h3 class="title-md pb-3">4. {{ t('eContract.pay') }}</h3>
					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="contract" name="payment_type" :value="'contract'" @change="onChangePayment($event)" v-model="payRadio" />
						{{ t('eContract.contract') }}
					</p>
					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="hour" name="payment_type" :value="'hour'" @change="onChangePayment($event)" v-model="payRadio" />
						{{ t('eContract.hour') }}
					</p>
					<p class="commission-text mb-2">
						<input class="mr-2" type="radio" id="track" name="payment_type" :value="'track'" @change="onChangePayment($event)" v-model="payRadio" />
						{{ t('eContract.track') }}
					</p>
					<p class="mb-2">
						{{ t('eContract.amount') }}
						<input
							class="border-input"
							id="paymentAmount"
							type="number"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.amount',
								})
							"
							@input="paymentAmountFiled.handleChange"
							@blur="paymentAmountFiled.handleBlur"
							:value="paymentAmountFiled.value"
						/>
						<span class="text-danger">
							{{ paymentAmountFiled.errorMessage }}
						</span>
						€ ( + {{ t('eContract.vat') }}
						<input
							class="border-input"
							id="paymentVat"
							type="number"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.vat',
								})
							"
							@input="paymentVatFiled.handleChange"
							@blur="paymentVatFiled.handleBlur"
							:value="paymentVatFiled.value"
						/>
						%)
						<span class="text-danger">
							{{ paymentVatFiled.errorMessage }}
						</span>
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">5. {{ t('eContract.costs') }}</h3>
					<p class="commission-text">
						{{ t('eContract.costText') }}
					</p>					
					<div class="d-flex mt-2">
						<div class="invoice__row mx-1" :key="i" v-for="(cost, i) in costs">
							<input class="mr-2" type="radio" :id="cost.id" name="cost" :value="cost.value" v-model="costRadio" @change="onChangeCost($event)" />

							<label :for="cost.id">{{ cost.name }}</label>
						</div>
					</div>
					<p class="commission-text mb-2">
						{{ t('eContract.costText1') }}
						<input
							class="border-input"
							id="costChanged"
							type="number"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.costCharged',
								})
							"
							@input="costChangedFiled.handleChange"
							@blur="costChangedFiled.handleBlur"
							:value="costChangedFiled.value"
						/>
						{{ t('eContract.costText2') }}
						<span class="text-danger">
							{{ costChangedFiled.errorMessage }}
						</span>
					</p>
					<p class="commission-text mb-2">{{ t('eContract.costText3') }}:</p>

					<textarea
						class=""
						name="material_description"
						id="materialDescription"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.materialDescription',
							})
						"
						@input="materialDescriptionFiled.handleChange"
						@blur="materialDescriptionFiled.handleBlur"
						:value="materialDescriptionFiled.value"
					></textarea>
					<p class="text-danger">
						{{ materialDescriptionFiled.errorMessage }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">6. {{ t('eContract.tax_conditions_and_billing') }}</h3>
					<p class="commission-text mb-2">
						{{ t('eContract.billingText') }}
					</p>

					<p class="commission-text">
						{{ t('eContract.tax_conditions_and_billing') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">7. {{ t('eContract.termination_of_the_contract') }}</h3>
					<h3 class="title-md pb-3">7.1. {{ t('eContract.contract1') }} "{{ t('eContract.contract2') }}").</h3>
					<textarea
						class=""
						name="termination_description"
						id="jobDescription"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.terminationDescription',
							})
						"
						@input="terminationDesriptionFiled.handleChange"
						@blur="terminationDesriptionFiled.handleBlur"
						:value="terminationDesriptionFiled.value"
					></textarea>
					<p class="text-danger">
						{{ terminationDesriptionFiled.errorMessage }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h2 class="title-md pb-3">7.2. {{ t('eContract.decommissioning') }}</h2>
					<p class="commission-text pb-3">
						{{ t('eContract.decommissioningText') }}
						<input
							class="border-input"
							id="decommissioningDays"
							type="number"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.contractDay',
								})
							"
							@input="decommissioningDaysFiled.handleChange"
							@blur="decommissioningDaysFiled.handleBlur"
							:value="decommissioningDaysFiled.value"
						/>
						<span class="text-danger">
							{{ decommissioningDaysFiled.errorMessage }}
						</span>
						{{ t('eContract.decommissioningText_1') }}
					</p>

					<p class="commission-text pb-3">
						{{ t('eContract.decommissioningText_2') }}
						{{ t('eContract.decommissioningText_3') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md">8. {{ t('eContract.condition') }}</h3>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">9. {{ t('eContract.responsibilities') }}</h3>
					<p class="commission-text pb-3">{{ t('eContract.responsibilities_text') }}:</p>
					<textarea
						class=""
						name="entrepreneur_description"
						id="entrepreneurDescription"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.entrepreneurDescription',
							})
						"
						@input="seekerResponsibilitiesField.handleChange"
						@blur="seekerResponsibilitiesField.handleBlur"
						:value="seekerResponsibilitiesField.value"
					></textarea>
					<p class="text-danger">
						{{ seekerResponsibilitiesField.errorMessage }}
					</p>

					<p class="commission-text py-3">{{ t('eContract.responsibilities_text_1') }}:</p>
					<textarea
						class=""
						name="contractor_description"
						id="contractorDescription"
						cols="30"
						rows="3"
						:placeholder="
							t('validation.enterField', {
								field: 'placeholder.contractorDescription',
							})
						"
						@input="contractorResponsibilitiesField.handleChange"
						@blur="contractorResponsibilitiesField.handleBlur"
						:value="contractorResponsibilitiesField.value"
					></textarea>
					<p class="text-danger">
						{{ contractorResponsibilitiesField.errorMessage }}
					</p>

					<p class="commission-text py-3">
						{{ t('eContract.responsibilities_text_2') }}
					</p>

					<p class="commission-text pb-3">
						{{ t('eContract.responsibilities_text_3') }}
					</p>

					<p class="commission-text pb-3">
						{{ t('eContract.responsibilities_text_4') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h2 class="title-md pb-3">10. {{ t('eContract.change') }}</h2>
					<p class="commission-text pb-3">
						{{ t('eContract.changeText') }}
					</p>

					<p class="commission-text pb-3">
						{{ t('eContract.changeText1') }}
					</p>
					<p class="commission-text pb-3">• {{ t('eContract.changeText2') }}</p>
					<p class="commission-text pb-3">• {{ t('eContract.changeText3') }}</p>
					<p class="commission-text pb-3">• {{ t('eContract.changeText4') }}</p>
					<p class="commission-text pb-3">
						{{ t('eContract.changeText5') }}
					</p>

					<p class="commission-text pb-3">
						{{ t('eContract.changeText6') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">11. {{ t('eContract.amendment_and_transfer_of_the_contract') }}</h3>
					<p class="commission-text pb-3">
						{{ t('eContract.transfer_text') }}
					</p>
					<p class="commission-text pb-3">
						{{ t('eContract.transfer_text_1') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h2 class="title-md pb-3">12. {{ t('eContract.invalidity_of_the_contract') }}</h2>
					<p class="commission-text pb-3">
						{{ t('eContract.Invalidity_text') }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h3 class="title-md pb-3">13. {{ t('eContract.applicable_law_and_jurisdiction') }}</h3>
					<p class="commission-text pb-3">
						{{ t('eContract.law_text') }}
						<input
							class="border-input"
							type="text"
							id="jurisdiction"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.jurisdiction',
								})
							"
							@input="jurisdictionField.handleChange"
							@blur="jurisdictionField.handleBlur"
							:value="jurisdictionField.value"
						/>
					</p>
					<p class="text-danger">
						{{ jurisdictionField.errorMessage }}
					</p>
				</div>

				<div class="form-group col-12 p-0">
					<h2 class="title-md pb-3">14. {{ t('eContract.signatures') }}</h2>
					<p class="commission-text pb-3">
						{{ t('eContract.signatures_text') }}
						<input
							class="border-input"
							type="number"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.signatureCopies',
								})
							"
							@input="signatureCopiesField.handleChange"
							@blur="signatureCopiesField.handleBlur"
							:value="signatureCopiesField.value"
						/>
						{{ t('eContract.pieces') }}
					</p>
					<p class="text-danger">
						{{ signatureCopiesField.errorMessage }}
					</p>

					<p class="commission-text pb-3">{{ t('eContract.place_and_time') }}</p>
					<div class="container sig-margin" style="height:100px">
						<VueSignaturePad id="signature" width="100%" ref="signaturePad" />

						<div class="buttons">
							<button type="button" class="btn-common btn-red" @click="undo">
								{{ t('eContract.undo') }}
							</button>
						</div>
					</div>
				</div>

				<div class="row">

					<div class=" col-12">
						<div class="text-right">
							<button type="button" @click="submitForm" :disabled="isSubmitting" class="btn-common sign-btn">
								{{ t('eContract.sign_contract') }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';


export default {
	name: 'Econtract',

	components: {
		Multiselect,
	},

	setup() {
		// ref
		const tempSkill = ref(null);
		const blob = ref(null);
		const payRadio = ref('contract');
		const costRadio = ref(true);
		const agreementRadioValue = ref('deadline');
		const assignmentType = ref('no_deadline');
		const stringRegExp = /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/;

		// icons
		const closeIcon = faTimes;

		const isSubmitting = ref(false)

		const signaturePad = ref(null);
		const options = reactive({
			count: 0,
			option: {
				penColor: '#c0f',
				backgroundColor: 'rgb(255,255,255)',
			},
			disabled: false,
		});

		//radio button checkbox
		const costs = [
			{
				id: 1,
				name: 'Yes',
				value: true,
			},
			{
				id: 2,
				name: 'No',
				value: false,
			},
		];

		const currentPortal = costs[1];

		//agreement radio button
		const agreementRadio = [
			{
				id: 0,
				name: `<div class="col-xl-12 col-lg-12 p-0 commission-text mb-2">					
					Deadline
					<input
						class="border-input date-input-text"
						type="date"
						id="date-1"
						name="date"
						style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 30%;
						text-align: center
						"
					/>
					-
					<input
						class="border-input date-input-text"
						type="date"
						id="date-2"
						name="date"
						style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 30%;
						text-align: center
						"
					/>
					(day/month/year).
				</div>`,
				value: 'deadline',
			},
			{
				id: 1,
				name: `<div class="col-12 p-0 commission-text mb-2">
					Period of validity
					<input
						class="border-input date-input-text"
						type="date"
						id="date-3"
						name="date"
						style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 20%;
						text-align: center
						"
					/>
					-
					<input
						class="border-input date-input-text"
						type="date"
						id="date-4"
						name="date"
						style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 20%;
						text-align: center
						"
					/>
					, after which the contract shall continue for an indefinite period
					of
					<input class="border-input pb-2" type="number" style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 20%;
						text-align: center
						" /> months, unless
					terminated in writing not later than
					<input class="border-input pb-2" type="number" style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 20%;
						text-align: center
						" /> days before the
					beginning of the next contract period.
				</div>`,
				value: 'period_validity',
			},
			{
				id: 2,
				name: `<div class="col-12 p-0 commission-text mb-2">
					So far from
					<input
						class="border-input date-input-text"
						type="date"
						id="date-5"
						name="date"
						style="
 					    border: none;
    					border-bottom: 1px solid;
    					width: 57%;
						text-align: center
						"
					/>.
				</div>`,
				value: 'far_away',
			},
			{
				id: 3,
				name: `<div class="col-12 p-0 commission-text mb-2">					
					Until the mandate is completed.
				</div>`,
				value: 'until_completion',
			},
		];

		const agreementSelected = agreementRadio[0];

		// icons
		const deleteIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore();

		// post gig schema validation
		const EcontractgSchema = yup.object({
			contractor_name: yup
				.string()
				.nullable()
				.matches(
					stringRegExp,
					t('validation.noValid', {
						field: 'fieldList.fullName',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.fullName',
					}),
				)
				.max(
					50,
					t('validation.atMost', {
						field: 'eContract.fieldList.fullName',
						type: '50 characters',
					}),
				),
			contractor_business_id: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.businessID',
					}),
				)
				.max(
					50,
					t('validation.atMost', {
						field: 'eContract.fieldList.businessID',
						type: '50 characters',
					}),
				),
			contractor_contacts: yup
				.string()
				.nullable()
				.matches(
					stringRegExp,
					t('validation.noValid', {
						field: 'fieldList.contractor_name',
					}),
				)
				.notRequired()
				.max(
					50,
					t('validation.atMost', {
						field: 'fieldList.contractor_name',
						type: '50 characters',
					}),
				),
			seekerId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.seeker',
					}),
				),
			mandate_description: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.descriptionMandate',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.descriptionMandate',
						type: '255 characters',
					}),
				),
			//mandate_type field pending
			mandate_type: yup.string().nullable(),
			//dead line mandate start dat
			dead_line_mandate_start_date: yup.string().nullable(),

			//dead  line mandate end date
			dead_line_mandate_end_date: yup.string().nullable(),

			// period validity mandate start date
			period_validity_mandate_start_date: yup.string().nullable(),

			// period validity mandate end date
			period_validity_mandate_end_date: yup.string().nullable(),

			// period validity mandate end date
			far_away_mandate_start_date: yup.string().nullable(),

			//mandate months
			mandate_months: yup.string().nullable(),
			
			mandate_days: yup.string().nullable(),
			

			//payment_type field pending
			payment_type: yup.string().nullable(),
			
			//payment amount
			payment_amount: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.paymentAmount',
					}),
				),
			// paymrnt vat
			payment_vat: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.paymentVat',
					}),
				),

			//assignment_type field pending
			assignment_start_date: yup.string().nullable(),

			assignment_end_date: yup.string().nullable(),
			//cost type field pending
			cost: yup.string().nullable(),
			// cost changed
			costˍchanged: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.costChanged',
					}),
				),

			//reporting description
			assignment_seeker_description: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.descriptionReporting',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.descriptionReporting',
						type: '255 characters',
					}),
				),

			//termination_description
			termination: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.terminationDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.terminationDescription',
						type: '255 characters',
					}),
				),

			//decommissioningDays
			decommissioning_days: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.decommissioningDays',
					}),
				),
			// material_description
			material_cost: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.materialDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.materialDescription',
						type: '255 characters',
					}),
				),
			// entrepreneur description
			seeker_responsibilities: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.entrepreneurDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.entrepreneurDescription',
						type: '255 characters',
					}),
				),
			//contractor description
			contractor_responsibilities: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.contractorDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.contractorDescription',
						type: '255 characters',
					}),
				),
			// jurisdiction
			jurisdiction: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.jurisdiction',
					}),
				),
			// signature Copies
			signature_copies: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.signatureCopies',
					}),
				),

			// Monitoring the progress of the assignment filed
			assignment_company_description: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'eContract.fieldList.assigDescription',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'eContract.fieldList.assigDescription',
						type: '255 characters',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit } = useForm({
			validationSchema: EcontractgSchema,
		});

		// form fields
		const fullNameField = reactive(useField('contractor_name', undefined, { initialValue: null }));
		//businessIDField
		const businessIDField = reactive(
			useField('contractor_business_id', undefined, {
				initialValue: null,
			}),
		);
		//name and bussinece detals
		const contactDetailsField = reactive(useField('contractor_contacts', undefined, { initialValue: null }));
		//le full name field
		const seekerId = reactive(useField('seekerId', undefined, { initialValue: null }));
		
		// descriptionMandate
		const descriptionMandateFiled = reactive(useField('mandate_description', undefined, { initialValue: null }));

		//mandate_type field pending
		const mandateTypeFiled = reactive(
			useField('mandate_type', undefined, {
				initialValue: null,
			}),
		);

		//dead mandate Start Date Filed
		const mandateStartDateDeadlineFiled = reactive(
			useField('dead_line_mandate_start_date', undefined, {
				initialValue: null,
			}),
		);
		//dead mandateEndDateFiled
		const mandateEndDateDeadlineFiled = reactive(
			useField('dead_line_mandate_end_date', undefined, {
				initialValue: null,
			}),
		);

		//PeriodValidity mandate Start Date Filed
		const mandateStartDatePeriodValidityFiled = reactive(
			useField('period_validity_mandate_start_date', undefined, {
				initialValue: null,
			}),
		);
		//mandate End Date PeriodValidity Filed
		const mandateEndDatePeriodValidityFiled = reactive(
			useField('period_validity_mandate_end_date', undefined, {
				initialValue: null,
			}),
		);

		// mandate Months Filed
		const mandateMonthsFiled = reactive(useField('mandate_months', undefined, { initialValue: null }));
		//
		const mandateDaysFiled = reactive(useField('mandate_days', undefined, { initialValue: null }));

		//far away mandate start date
		const mandateStartDateFarAwayFiled = reactive(
			useField('far_away_mandate_start_date', undefined, {
				initialValue: null,
			}),
		);
		//assignment start date
		const assignmentStartDateFiled = reactive(
			useField('assignment_start_date', undefined, {
				initialValue: null,
			}),
		);

		//assignment end date
		const assignmentEndDateFiled = reactive(
			useField('assignment_end_date', undefined, {
				initialValue: null,
			}),
		);

		//payment_type field pending
		const paymentTypeFiled = reactive(
			useField('payment_type', undefined, {
				initialValue: null,
			}),
		);

		// payment amount
		const paymentAmountFiled = reactive(useField('payment_amount', undefined, { initialValue: null }));

		// payment vat
		const paymentVatFiled = reactive(useField('payment_vat', undefined, { initialValue: null }));

		//cost type field pending
		const costFiled = reactive(useField('cost', undefined, { initialValue: null }));
		// costˍchanged field
		const costChangedFiled = reactive(useField('costˍchanged', undefined, { initialValue: null }));

		const assignmentSeekerDescriptionFiled = reactive(
			useField('assignment_seeker_description', undefined, {
				initialValue: null,
			}),
		);
		// termination Desription
		const terminationDesriptionFiled = reactive(useField('termination', undefined, { initialValue: null }));

		// decommissioning days
		const decommissioningDaysFiled = reactive(useField('decommissioning_days', undefined, { initialValue: null }));

		//  material Description field
		const materialDescriptionFiled = reactive(useField('material_cost', undefined, { initialValue: null }));

		//entrepreneur DesriptionField
		const seekerResponsibilitiesField = reactive(
			useField('seeker_responsibilities', undefined, {
				initialValue: null,
			}),
		);

		// contractor DesriptionField
		const contractorResponsibilitiesField = reactive(
			useField('contractor_responsibilities', undefined, {
				initialValue: null,
			}),
		);

		// contractor DesriptionField
		const jurisdictionField = reactive(useField('jurisdiction', undefined, { initialValue: null }));
		// Signature Copies Field
		const signatureCopiesField = reactive(useField('signature_copies', undefined, { initialValue: null }));
		// assigDesriptionField
		const assignmentCompanyDesriptionField = reactive(
			useField('assignment_company_description', undefined, {
				initialValue: null,
			}),
		);

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch user related company list
			fetchSeekerList();
		});

		/**
		 * Computed
		 * *******************************************************************
		 */

		// seeker list
		const seekerList = computed(() => store.getters['econtract/getjobseekerOptions']);

		/**
		 * Methods
		 * *******************************************************************
		 */

		const undo = () => {
			signaturePad.value.clearSignature();
		};

		// fetch user related company list
		const fetchSeekerList = async () => {
			await store.dispatch('econtract/getJobSeeker');
		};

		// submit form - job post
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			//convert image base64 to png
			if (signaturePad.value.saveSignature().data) {
				const signatureImage = signaturePad.value.saveSignature().data.replace('data:image/png;base64,', '');
				const contentType = 'image/png';
				const b64Data = signatureImage;
				blob.value = b64toBlob(b64Data, contentType);
			}
			const formData = new FormData();
			formData.append('seekerId', values.seekerId);
			formData.append('contractor_name', values.contractor_name);
			formData.append('contractor_business_id', values.contractor_business_id);
			formData.append('contractor_contacts', values.contractor_contacts);
			formData.append('mandate_description', values.mandate_description);
			formData.append('payment_type', payRadio.value);
			formData.append('payment_amount', values.payment_amount);
			formData.append('payment_vat', values.payment_vat);
			formData.append('costˍchanged', values.costˍchanged);
			formData.append('assignment_seeker_description', values.assignment_seeker_description);
			formData.append('termination', values.termination);
			formData.append('decommissioning_days', values.decommissioning_days);
			formData.append('material_cost', values.material_cost);
			formData.append('seeker_responsibilities', values.seeker_responsibilities);
			formData.append('contractor_responsibilities', values.contractor_responsibilities);
			formData.append('jurisdiction', values.jurisdiction);
			formData.append('signature_copies', values.signature_copies);
			formData.append('assignment_company_description', values.assignment_company_description);
			formData.append('signature_file', blob.value);
			formData.append('mandate_type', agreementRadioValue.value);
			formData.append('cost', costRadio.value);
			formData.append('assignment_type', assignmentType.value);
			//handle value for agrrement radio button value
			if (agreementRadioValue.value == 'deadline') {
				formData.append('mandate_start_date', values.dead_line_mandate_start_date == null ? null : moment(values.dead_line_mandate_start_date).format('YYYY/MM/DD'));
				formData.append('mandate_end_date', values.dead_line_mandate_end_date == null ? null : moment(values.dead_line_mandate_end_date).format('YYYY/MM/DD'));
			} else if (agreementRadioValue.value == 'period_validity') {
				formData.append('mandate_start_date', values.period_validity_mandate_start_date == null ? null : moment(values.period_validity_mandate_start_date).format('YYYY/MM/DD'));
				formData.append('mandate_end_date', values.period_validity_mandate_end_date == null ? null : moment(values.period_validity_mandate_end_date).format('YYYY/MM/DD'));
				formData.append('mandate_months', values.mandate_months);
				formData.append('mandate_days', values.mandate_days);
			} else if (agreementRadioValue.value == 'far_away') {
				formData.append('mandate_start_date', values.far_away_mandate_start_date == null ? null : moment(values.far_away_mandate_start_date).format('YYYY/MM/DD'));
			}

			//handle radio button value for assignment section 3.
			if (assignmentType.value == 'no_deadline' || assignmentType.value == 'milestones') {
				formData.append('assignment_start_date', values.assignment_start_date == null ? null : moment(values.assignment_start_date).format('YYYY/MM/DD'));
			} else if (assignmentType.value == 'with_deadline') {
				formData.append('assignment_start_date', values.assignment_start_date == null ? null : moment(values.assignment_start_date).format('YYYY/MM/DD'));
				formData.append('assignment_end_date', values.assignment_end_date == null ? null : moment(values.assignment_end_date).format('YYYY/MM/DD'));
			}

			await store.dispatch('econtract/addEContract', formData).then(
				() => {
					isSubmitting.value = false;
					window.location.href = '/econtract';
				},
			);
		});

		const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
			const byteCharacters = window.atob(b64Data);
			const byteArrays = [];

			for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				const slice = byteCharacters.slice(offset, offset + sliceSize);

				const byteNumbers = new Array(slice.length);
				for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}

				const byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}

			const blob = new File(byteArrays, 'image.jpg', {
				type: contentType,
			});
			return blob;
		};
		//select payment radio
		const onChangePayment = event => {
			payRadio.value = event.target.value;
		};
		// cost radio
		const onChangeCost = event => {
			costRadio.value = event.target.value;
		};
		//change value for agreement radio buttn
		const onChangeAgreementRadioValue = event => {
			agreementRadioValue.value = event.target.value;
		};
		//change value for assignment radio button
		const onChangeAssignmentValue = event => {
			assignmentType.value = event.target.value;
		};

		return {
			// translate function
			t,

			// refs
			tempSkill,
			options,
			signaturePad,
			payRadio,
			costRadio,
			agreementRadioValue,
			assignmentType,
			blob,

			//radio checkbox
			costs,
			currentPortal,
			agreementRadio,
			agreementSelected,

			// icons
			deleteIcon,
			closeIcon,

			// form related
			formMeta,
			isSubmitting,

			// field
			fullNameField,
			businessIDField,
			seekerId,
			descriptionMandateFiled,
			contactDetailsField,
			terminationDesriptionFiled,
			materialDescriptionFiled,
			seekerResponsibilitiesField,
			contractorResponsibilitiesField,
			assignmentCompanyDesriptionField,
			assignmentSeekerDescriptionFiled,
			paymentAmountFiled,
			paymentVatFiled,
			costChangedFiled,
			decommissioningDaysFiled,
			jurisdictionField,
			signatureCopiesField,
			paymentTypeFiled,
			costFiled,
			mandateTypeFiled,
			mandateStartDateDeadlineFiled,
			mandateEndDateDeadlineFiled,
			mandateMonthsFiled,
			mandateDaysFiled,
			mandateStartDatePeriodValidityFiled,
			mandateEndDatePeriodValidityFiled,
			mandateStartDateFarAwayFiled,
			assignmentStartDateFiled,
			assignmentEndDateFiled,

			// computed
			seekerList,
			// methods
			b64toBlob,
			undo,
			submitForm,
			onChangePayment,
			onChangeCost,
			onChangeAgreementRadioValue,
			onChangeAssignmentValue
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.add_job__form {
	form {
		.form_part {
			.form-group {
				.text-big {
					font-size: 20px;
					margin-bottom: 20px;
				}

				label {
					font-weight: 500;
					font-size: 14px;

					span {
						color: $coloRed;

						&.black-icon {
							color: #000;
						}
					}
				}

				.form-control {
					background-color: #fbfbfb;
					border: 1px solid $colorExLightGray;
					height: unset;
					border-radius: 25px;
					position: relative;
					box-sizing: border-box;

					&:focus {
						border-color: $coloRed;
					}
				}

				.btn-lightred {
					position: absolute;
					top: 30px;
					right: 0;
					padding: 14px 20px;
					font-size: 14px;
				}

				.job_skills {
					width: 100%;
					padding: 12px 15px;
					background-color: #fbfbfb;
					border: 1px solid #eaeaea;
					border-radius: 25px;
					min-height: 50px;
					height: auto;
					display: flex;
					flex-wrap: wrap;

					.job_skill {
						background: $coloRed;
						color: #fff;
						padding: 5px 10px;
						padding-right: 20px;
						border-radius: 25px;
						display: flex;
						align-items: center;
						width: max-content;
						float: left;
						margin: 5px 5px;

						span {
							margin-right: 10px;
						}

						button {
							font-size: 10px;
							color: #fff;
						}
					}
				}
			}
		}
	}
}

//signature pad css
#signature {
	border: double 3px #808a8f;
	border-radius: 30px;
	background-image: linear-gradient(white, white), radial-gradient(circle at top left, #ff4b57, #808a8f);
	background-origin: border-box;
	background-clip: content-box, border-box;
}
.radiostyleremove {
	pointer-events: none;
}
.container {
	width: '100%';
	padding: 8px 16px;
}

.buttons {
	display: flex;
	gap: 8px;
	justify-content: center;
	margin-top: 15px;
	float: left;
}
.sig-margin {
	margin: 1px 10px 71px -10px;
}

.title-md {
	font-size: 18px;
}
.jobDescription {
	margin-bottom: 0;
}
.commission-text {
	font-size: 15px;
}
.border-input {
	width: 20%;
	background-color: #fbfbfb;
	border: 1px solid #ced4da;
	border-radius: 50px;
	padding: 8px 20px;

	@media (max-width: 1200px) {
		width: 35%;
	}

	@media (max-width: 576px) {
		width: 55%;
	}
}
textarea {
	width: 100%;
	background-color: #fff;
	border-radius: 20px;
	padding: 10px;
}
.sign-btn {
	background-color: red;
	border-radius: 19px;
	color: #fff;

	&:hover {
		color: #fff !important;
	}
}
.date-input-text {
	font-size: 12px;
	@media (max-width: 576px) {
		margin-top: 10px;
	}
}

@media (max-width: 576px) {
	.sig-margin {
		margin: 40px 0;
	}
}

@media (max-width: 576px) {
	.account__form {
		padding: 20px 15px;

		form {
			.form-group {
				label {
					font-size: 12px;
				}

				.form-control {
					padding: 10px 15px;
					font-size: 14px;
				}

				.btn-lightred {
					padding: 13px 15px;
					font-size: 10px;
				}
			}
		}
	}
}
</style>

<style lang="scss">
.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
</style>