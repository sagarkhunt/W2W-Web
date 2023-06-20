<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container add_employer__modal " content-class="modal-content recipient-modal">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<div class="model">
			<!-- modal content -->
			<div class="modal__content">
				<!-- modal header -->

				<div class="row d-flex align-items-center justify-content-center m-puzzle" v-if="puzzle">
					<!-- modal header -->
					<div class="modal-header">
						<h5 class="title-lg">
							{{ t('invoiceList.leInvoice.addInvoice.recipientType') }}
						</h5>
					</div>

					<div class="col-xl-6 col-lg-6 col-sm-6 col-12 p-0">
						<a class="header-right-dash" :class="{ userStatusActive: userCompany }" @click="switchToggle('company')">
							<div class="danger-box profession-box-common p-h">
								<span class="prof-bg-puzzle">
									<svg xmlns="http://www.w3.org/2000/svg" class="recipient-puzzle" width="710" height="710" viewBox="0 0 710 710">
										<g id="Group_78570" data-name="Group 78570" transform="translate(14212 -1162)">
											<rect id="Rectangle_6969" data-name="Rectangle 6969" width="710" height="710" transform="translate(-14212 1162)" fill="rgba(255,255,255,0)" />
											<g id="Group_73025" data-name="Group 73025" transform="translate(-14147 1227)">
												<path
													id="Path_127590"
													data-name="Path 127590"
													d="M117.778,863.437H628.537a34.976,34.976,0,0,1,34.874,34.874v209.647a51.719,51.719,0,0,0-16.5-2.735c-25.376,0-46.815,22.2-46.815,48.467s21.439,48.467,46.815,48.467a44.269,44.269,0,0,0,16.5-3.288v210.2a34.976,34.976,0,0,1-34.874,34.874H117.778A34.977,34.977,0,0,1,82.9,1409.07V898.311a34.977,34.977,0,0,1,34.874-34.874Z"
													transform="translate(-82.904 -863.437)"
												/>
											</g>
										</g>
									</svg>
								</span>
								<div class="text-content d-flex flex-column justify-content-between h-100 w-100">
									<p class="fw-bold text-disable">
										{{ t('common.company') }}
									</p>
									<div class="d-flex"></div>
								</div>
							</div>
						</a>
					</div>

					<div class="col-xl-6 col-lg-6 col-sm-6 col-12 p-0">
						<a class="header-right-dash" :class="{ userStatusActive: userPrivate }" @click="switchToggle('private')">
							<div class="danger-box profession-box-common p-h">
								<span class="prof-bg-puzzle">
									<svg xmlns="http://www.w3.org/2000/svg" class="recipient-puzzle" width="710" height="710" viewBox="0 0 710 710">
										<g id="Group_78569" data-name="Group 78569" transform="translate(13431 -1162)">
											<rect id="Rectangle_6968" data-name="Rectangle 6968" width="710" height="710" transform="translate(-13431 1162)" fill="rgba(255,255,255,0)" />
											<g id="Group_73024" data-name="Group 73024" transform="translate(-13431 1227.076)">
												<path
													id="Path_127589"
													data-name="Path 127589"
													d="M545.973.308H198.212V0H34.874A34.977,34.977,0,0,0,0,34.875V545.632a34.977,34.977,0,0,0,34.874,34.874H190.3v.307h64.112c3.91,2.655-4.238,10.18-4.238,25.54,0,21.411,19.009,38.767,40.419,38.767s40.419-17.356,40.419-38.767c0-14.968-9.665-22.865-6.265-25.54H545.973a34.977,34.977,0,0,0,34.874-34.874V35.182A34.977,34.977,0,0,0,545.973.308Z"
													transform="translate(645.12) rotate(90)"
												/>
											</g>
										</g>
									</svg>
								</span>
								<div class="text-content d-flex flex-column justify-content-between h-100 w-100">
									<p class="fw-bold text-disable">
										{{ t('invoiceList.leInvoice.addInvoice.private') }}
									</p>
									<div class="d-flex"></div>
								</div>
							</div>
						</a>
					</div>
				</div>

				<!-- company modal content -->
				<div>
					<div v-if="form === 'company'">
						<div class="d-flex align-items-center justify-content-between px-3">
							<h5 class="title-lg">
								{{ t('invoiceList.addEmployer') }}
								<!-- Add new recipient -->
							</h5>
							<a href="#" @click="(puzzle = true), (form = null), resetData()" class="text-danger">
								{{ t('common.back') }}
							</a>
						</div>

						<div class="row mt-3 m-0">
							<div class="col-12">
								<form class="theme-input">
									<p class="mb-3 col-xl-12 fw-bold p-0">{{ t('invoiceList.leInvoice.addInvoice.basicInformation') }}:</p>

									<div class="form-row">
										<!-- company name -->
										<div class="form-group col-xl-7 col-lg-6" v-if="isPrivateField.value == false">
											<label for="companyName">
												{{ t('fieldList.companyName') }}
											</label>

											<input
												id="companyName"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.companyName',
													})
												"
												@input="companyNameField.handleChange"
												@blur="companyNameField.handleBlur"
												:value="companyNameField.value"
											/>

											<p class="text-danger">
												{{ companyNameField.errorMessage }}
											</p>
										</div>

										<!-- Business id -->
										<div class="form-group col-xl-5 col-lg-6" v-if="isPrivateField.value == false">
											<label for="employerYTunnus">
												{{ t('fieldList.businessID') }}
											</label>

											<input
												id="employerYTunnus"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.businessID',
													})
												"
												@input="employerYTunnusField.handleChange"
												@blur="employerYTunnusField.handleBlur"
												:value="employerYTunnusField.value"
											/>

											<p class="text-danger">
												{{ employerYTunnusField.errorMessage }}
											</p>
										</div>
									</div>
									<div class="form-row">
										<!-- contract name -->
										<div class="form-group col-12">
											<label for="contactName">
												{{ t('fieldList.contractName') }}
											</label>

											<input
												id="contactName"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.contactName',
													})
												"
												@input="contractNameField.handleChange"
												@blur="contractNameField.handleBlur"
												:value="contractNameField.value"
											/>

											<p class="text-danger">
												{{ contractNameField.errorMessage }}
											</p>
										</div>
									</div>

									<div class="form-row">
										<!-- company phone -->
										<div class="form-group col-xl-5 col-lg-6">
											<label for="companyPhone">
												{{ t('fieldList.phone_number') }}
											</label>

											<input
												id="companyPhone"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.phoneNumber',
													})
												"
												@input="companyPhoneField.handleChange"
												@blur="companyPhoneField.handleBlur"
												:value="companyPhoneField.value"
											/>

											<p class="text-danger">
												{{ companyPhoneField.errorMessage }}
											</p>
										</div>

										<!-- email of employer -->
										<div class="form-group col-xl-7 col-lg-6">
											<label for="companyEmail">
												{{ t('fieldList.companyEmail') }}
											</label>

											<input
												id="companyEmail"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.companyEmail',
													})
												"
												@input="companyEmailField.handleChange"
												@blur="companyEmailField.handleBlur"
												:value="companyEmailField.value"
											/>

											<p class="text-danger">
												{{ companyEmailField.errorMessage }}
											</p>
										</div>
									</div>

									<p class="mb-3 col-xl-12 fw-bold p-0">{{ t('invoiceList.leInvoice.addInvoice.contactDtlInvAddress') }}:</p>
									<div class="form-row">
										<!-- company country - country -->
										<div class="form-group col-xl-12">
											<label for="cpuntryCompany"> {{ t('fieldList.country') }} </label>

											<Multiselect
												class="form-group"
												label="country_name"
												trackBy="country_name"
												@input="countryField.handleChange"
												@blur="countryField.handleBlur"
												v-model="countryField.value"
												:placeholder="
													t('validation.selectField', {
														field: 'placeholder.country',
													})
												"
												:searchable="true"
												valueProp="referenceId"
												:options="countryOptions"
												mode="single"
												@change="getCountrWiseCity"
												:canDeselect="false"
											/>
											<p class="text-danger">
												{{ countryField.errorMessage }}
											</p>
										</div>
									</div>

									<div class="form-row">
										<!--invoicing_address -->
										<div class="form-group col-xl-8 col-12">
											<label for="invoicing_address">
												{{ t('fieldList.companyAddress') }}
											</label>

											<input
												id="invoicing_address"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.invoicingAddress',
													})
												"
												@input="companyAddressField.handleChange"
												@blur="companyAddressField.handleBlur"
												:value="companyAddressField.value"
											/>

											<p class="text-danger">
												{{ companyAddressField.errorMessage }}
											</p>
										</div>

										<!-- ZipCode -->
										<div class="form-group col-xl-4 col-12">
											<label for="zipCodeCompnay">
												{{ t('fieldList.zipCode') }}
											</label>

											<input
												id="zipCodeCompnay"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.zipCode',
													})
												"
												@input="zipCodeField.handleChange"
												@blur="zipCodeField.handleBlur"
												:value="zipCodeField.value"
											/>

											<p class="text-danger">
												{{ zipCodeField.errorMessage }}
											</p>
										</div>
									</div>

									<div class="form-row">
										<!--e_invoice_address -->
										<div class="form-group col-xl-8 col-12" v-if="isPrivateField.value == false">
											<label for="eInvoiceAddress">
												{{ t('fieldList.eInvoiceAddress') }}
											</label>

											<input
												id="eInvoiceAddress"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'fieldList.eInvoiceAddress',
													})
												"
												@input="eInvoiceAddressField.handleChange"
												@blur="eInvoiceAddressField.handleBlur"
												:value="eInvoiceAddressField.value"
											/>
										</div>

										<!-- operator code -->
										<div class="form-group col-xl-4 col-12" v-if="isPrivateField.value == false">
											<label for="operator_code">
												{{ t('fieldList.operatorCode') }}
											</label>

											<input
												id="operator_code"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.operatorCode',
													})
												"
												@input="operatorCodeField.handleChange"
												@blur="operatorCodeField.handleBlur"
												:value="operatorCodeField.value"
											/>

											<p class="text-danger">
												{{ operatorCodeField.errorMessage }}
											</p>
										</div>
									</div>

									<!-- vat_number -->
									<div class="form-row">
										<div class="form-group col-xl-12 col-lg-6">
											<label for="vatNumber">
												{{ t('fieldList.vatNumber') }}
											</label>

											<div class="row">
												<div class="col-xl-2 col-3 pr-0">
													<input type="text" class="form-control vat-input" :value="countryCode" readonly />
												</div>
												<div class="col-xl-5 col-9">
													<input
														id="vat_number"
														type="text"
														class="form-control"
														:placeholder="
															t('validation.enterField', {
																field: 'placeholder.vatNumber',
															})
														"
														@input="vatNumberField.handleChange"
														@blur="vatNumberField.handleBlur"
														:value="vatNumberField.value"
													/>
												</div>
											</div>

											<p class="text-danger">
												{{ vatNumberField.errorMessage }}
											</p>
										</div>
									</div>
								</form>
							</div>
							<div class="d-flex align-items-center justify-conent-center">
								<!-- submit btn -->
								<button type="button" class="btn-common btn-red mt-2 mx-auto" @click="submitForm" :disabled="isSubmitting">
									{{ t('common.submit') }}
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- private modal content -->
				<div>
					<div v-if="form === 'private'">
						<div class="d-flex align-items-center justify-content-between px-3">
							<h5 class="title-lg">
								{{ t('invoiceList.addEmployer') }}
								<!-- Add new recipient -->
							</h5>
							<a href="#" @click="(puzzle = true), (form = null)" class="text-danger">
								{{ t('common.back') }}
							</a>
						</div>

						<div class="row mt-3 m-0">
							<div class="col-12">
								<form class="theme-input">
									<p class="mb-2 col-xl-12 p-0 fw-bolder">{{ t('invoiceList.leInvoice.addInvoice.basicInformation') }}:</p>

									<div class="form-row">
										<!-- full name -->
										<div class="form-group col-xl-7 col-lg-6">
											<label for="fullName">
												{{ t('fieldList.fullName') }}
											</label>

											<input
												id="fullName"
												type="text"
												class="form-control"
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

										<!-- company phone -->
										<div class="form-group col-xl-5 col-lg-6">
											<label for="companyPhone">
												{{ t('fieldList.phone_number') }}
											</label>

											<input
												id="companyPhone"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.phoneNumber',
													})
												"
												@input="companyPhoneField.handleChange"
												@blur="companyPhoneField.handleBlur"
												:value="companyPhoneField.value"
											/>

											<p class="text-danger">
												{{ companyPhoneField.errorMessage }}
											</p>
										</div>
									</div>

									<div class="form-row">
										<!-- company country - country -->

										<div class="form-group col-xl-7 col-lg-6">
											<label for="privateEmail">
												{{ t('fieldList.email') }}
											</label>

											<input
												id="privateEmail"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.email',
													})
												"
												@input="companyEmailField.handleChange"
												@blur="companyEmailField.handleBlur"
												:value="companyEmailField.value"
											/>

											<p class="text-danger">
												{{ companyEmailField.errorMessage }}
											</p>
										</div>
									</div>

									<div class="form-row">
										<p class="mb-2 col-xl-12 p-0 fw-bolder">{{ t('invoiceList.leInvoice.addInvoice.contactDtlInvAddress') }}:</p>

										<div class="form-group col-lg-8">
											<label for="cpuntryCompany"> {{ t('fieldList.country') }} </label>

											<Multiselect
												class="form-group"
												label="country_name"
												trackBy="country_name"
												@input="countryField.handleChange"
												@blur="countryField.handleBlur"
												v-model="countryField.value"
												:placeholder="
													t('validation.selectField', {
														field: 'placeholder.country',
													})
												"
												:searchable="true"
												valueProp="referenceId"
												:options="countryOptions"
												mode="single"
												@change="getCountrWiseCity"
												:canDeselect="false"
											/>
											<p class="text-danger">
												{{ countryField.errorMessage }}
											</p>
										</div>

										<!--invoicing_address -->
										<div class="form-group col-8">
											<label for="invoicing_address">
												{{ t('fieldList.companyAddress') }}
											</label>

											<input
												id="invoicing_address"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.invoicingAddress',
													})
												"
												@input="companyAddressField.handleChange"
												@blur="companyAddressField.handleBlur"
												:value="companyAddressField.value"
											/>

											<p class="text-danger">
												{{ companyAddressField.errorMessage }}
											</p>
										</div>

										<!-- ZipCode -->
										<div class="form-group col-xl-4 col-lg-6">
											<label for="zipCodeCompnay">
												{{ t('fieldList.zipCode') }}
											</label>

											<input
												id="zipCodeCompnay"
												type="text"
												class="form-control"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.zipCode',
													})
												"
												@input="zipCodeField.handleChange"
												@blur="zipCodeField.handleBlur"
												:value="zipCodeField.value"
											/>

											<p class="text-danger">
												{{ zipCodeField.errorMessage }}
											</p>
										</div>

										<!-- vat_number -->
										<div class="form-group col-xl-12 col-lg-6">
											<label for="vatNumber">
												{{ t('fieldList.vatNumber') }}
											</label>

											<div class="row">
												<div class="col-2 pr-0">
													<input type="text" class="form-control vat-input" :value="countryCode" readonly />
												</div>
												<div class="col-5">
													<input
														id="vat_number"
														type="text"
														class="form-control"
														:placeholder="
															t('validation.enterField', {
																field: 'placeholder.vatNumber',
															})
														"
														@input="vatNumberField.handleChange"
														@blur="vatNumberField.handleBlur"
														:value="vatNumberField.value"
													/>
												</div>
											</div>

											<p class="text-danger">
												{{ vatNumberField.errorMessage }}
											</p>
										</div>

										<!-- description -->
										<div class="form-group col-12">
											<label for="descripation">
												{{ t('fieldList.description') }}
											</label>

											<textarea
												rows="4"
												class="explaination"
												:placeholder="
													t('validation.enterField', {
														field: 'placeholder.typeYourDescripation',
													})
												"
												@input="descriptionField.handleChange"
												@blur="descriptionField.handleBlur"
												:value="descriptionField.value"
											></textarea>
											<p class="text-danger">
												{{ descriptionField.errorMessage }}
											</p>
										</div>
									</div>
								</form>
							</div>

							<div class="d-flex align-items-center justify-conent-center">
								<!-- submit btn -->
								<button type="button" class="btn-common btn-red mt-2 w-25 mx-auto" @click="submitForm" :disabled="isSubmitting">
									{{ t('common.submit') }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Multiselect from '@vueform/multiselect';

export default {
	name: 'AddEmployerModal',

	props: {
		isModalShow: Object,
	},

	//components
	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	setup(props, { emit }) {
		// ref vars
		const userType = ref(null);
		const modalShow = ref(props.isModalShow);
		const jobSeekerPuzzle = ref(false);
		const companyPuzzle = ref(false);
		const userCompany = ref(false);
		const userPrivate = ref(false);
		const form = ref(null);
		const puzzle = ref(true);
		const phoneRegExp = /^([+])?(\d{10,16}$)/;
		const zipCodeRegExp = /^[0-9]{5}/;
		const countryCode = ref(null);

		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore();
		const isSubmitting = ref(false);
		// form schema validation
		const employerSchema = yup.object({
			is_private: yup.boolean(),
			full_name: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === true) {
						return yup
							.string()
							.matches(
								/^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/,
								t('validation.noValid', {
									field: 'fieldList.fullName',
								}),
							)
							.typeError(
								t('validation.requiredField', {
									field: 'fieldList.fullName',
								}),
							)
							.max(
								25,
								t('validation.atLeast', {
									field: 'fieldList.fullName',
									type: '25 characters',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.fullName',
								}),
							);
					}
				}),
			company_name: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === false) {
						return yup
							.string()
							.typeError(
								t('validation.requiredField', {
									field: 'fieldList.companyName',
								}),
							)
							.max(
								25,
								t('validation.atLeast', {
									field: 'fieldList.fullName',
									type: '25 characters',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.companyName',
								}),
							);
					}
				}),
			company_email: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === true) {
						return yup
							.string()
							.typeError(
								t('validation.requiredField', {
									field: 'fieldList.email',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.companyEmail',
								}),
							);
					}
				})
				.email(t('validation.validEmail')),
			invoicing_address: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.companyAddress',
					}),
				),
			e_invoice_address: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === false) {
						return yup
							.string()
							.nullable()
							.optional();
					}
				})
				.max(400),
			mobile: yup
				.string()
				.typeError(
					t('validation.requiredField', {
						field: 'fieldList.phone_number',
					}),
				)
				.matches(
					phoneRegExp,
					t('validation.noValid', {
						field: 'fieldList.phone_number_code',
					}),
				)
				.max(16),
			reg_number: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === false) {
						return yup
							.string()
							.nullable()
							.required(
								t('validation.requiredField', {
									field: 'fieldList.yTunnus',
								}),
							);
					}
				})
				.max(400),
			countryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.residence',
					}),
				),
			cityId: yup
				.number()
				.nullable()
				.optional(),
			zip_code: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.zipCode',
					}),
				)
				.matches(
					zipCodeRegExp,
					t('validation.noValid', {
						field: 'fieldList.zipCode',
					}),
					'Zip code is not valid',
				)
				.max(
					5,
					t('validation.atMost', {
						field: 'fieldList.zipCode',
						type: '5 characters',
					}),
				),
			operator_code: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === false) {
						return yup
							.string()
							.nullable()
							.optional();
					}
				}),
			vat_number: yup
				.string()
				.nullable()
				.optional(),
			description: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === true) {
						return yup
							.string()
							.typeError(
								t('validation.requiredField', {
									field: 'fieldList.description',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.description',
								}),
							);
					}
				}),
			contractName: yup
				.string()
				.nullable()
				.when('is_private', is_private => {
					if (is_private === false) {
						return yup
							.string()
							.matches(
								/^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/,
								t('validation.noValid', {
									field: 'fieldList.contractName',
								}),
							)
							.typeError(
								t('validation.requiredField', {
									field: 'fieldList.contractName',
								}),
							)
							.required(
								t('validation.requiredField', {
									field: 'fieldList.contractName',
								}),
							)
							.max(
								25,
								t('validation.atLeast', {
									field: 'fieldList.fullName',
									type: '25 characters',
								}),
							);
					}
				}),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, resetForm } = useForm({
			validationSchema: employerSchema,
		});

		// form fields
		const isPrivateField = reactive(useField('is_private', undefined, { initialValue: false }));
		const fullNameField = reactive(useField('full_name', undefined, { initialValue: null }));
		const companyNameField = reactive(useField('company_name', undefined, { initialValue: null }));
		const companyEmailField = reactive(useField('company_email', undefined, { initialValue: null }));
		const companyAddressField = reactive(useField('invoicing_address', undefined, { initialValue: null }));
		const eInvoiceAddressField = reactive(useField('e_invoice_address', undefined, { initialValue: null }));
		const companyPhoneField = reactive(useField('mobile', undefined, { initialValue: null }));
		const employerYTunnusField = reactive(useField('reg_number', undefined, { initialValue: null }));
		const zipCodeField = reactive(useField('zip_code', undefined, { initialValue: null }));
		const cityField = reactive(useField('cityId', undefined, { initialValue: null }));
		const countryField = reactive(useField('countryId', undefined, { initialValue: null }));
		const operatorCodeField = reactive(useField('operator_code', undefined, { initialValue: null }));
		const vatNumberField = reactive(useField('vat_number', undefined, { initialValue: null }));
		const descriptionField = reactive(useField('description', undefined, { initialValue: null }));
		const contractNameField = reactive(useField('contractName', undefined, { initialValue: null }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('country/getCountries');
		});

		/**
		 * Computed props
		 * *******************************************************************
		 */

		// get country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);
		// get city options
		const cityOptions = computed(() => store.getters['country/getCitiesOptions']);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - add employer
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			if (values.contractName) {
				values.contractName = titleCase(values.contractName);
			}
			if (values.full_name) {
				values.full_name = titleCase(values.full_name);
			}
			await store
				.dispatch('auth/addAnonymousEmployer', { ...values, vat_number: `${countryCode.value}-${values.vat_number}` })
				.then(() => {
					isSubmitting.value = false;
					emit('newEmployeeAdded');
					modalShow.value = false;
					resetForm();
				})
				.catch(err => {
					isSubmitting.value = false;
				});
		});
		// firat later capital
		const titleCase = str => {
			var splitStr = str.toLowerCase().split(' ');
			for (var i = 0; i < splitStr.length; i++) {
				// You do not need to check if i is larger than splitStr length, as your for does that for you
				// Assign it back to the array
				splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
			}
			// Directly return the joined string
			return splitStr.join(' ');
		};

		const switchToggle = val => {
			userType.value = val ?? null;
			puzzle.value = false;
			form.value = val;
			resetForm();
			if (userType.value === 'company') {
				jobSeekerPuzzle.value = true;
				companyPuzzle.value = false;
				userCompany.value = true;
				userPrivate.value = false;
				isPrivateField.value = false;
			} else {
				jobSeekerPuzzle.value = false;
				companyPuzzle.value = true;
				userPrivate.value = true;
				userCompany.value = false;
				isPrivateField.value = true;
			}
		};

		//get country wise city
		const getCountrWiseCity = id => {
			cityOptions.value = null;
			cityField.value = null;

			countryCode.value = (countryOptions.value.find(x => x.value === id) || {}).country_code;
			fetchCityCountryWise(id);
		};

		// get city
		const fetchCityCountryWise = id => {
			store.dispatch('country/getCities', id);
		};

		// resetData
		const resetData = () => {
			resetForm();
		};

		return {
			// icons
			closeIcon,

			// translate function
			t,

			// refs
			modalShow,
			userCompany,
			userPrivate,
			countryCode,

			// form related
			formMeta,
			isSubmitting,
			submitForm,

			// fields
			isPrivateField,
			fullNameField,
			companyNameField,
			companyEmailField,
			companyAddressField,
			eInvoiceAddressField,
			companyPhoneField,
			countryField,
			cityField,
			operatorCodeField,
			vatNumberField,
			zipCodeField,
			descriptionField,
			contractNameField,
			employerYTunnusField,

			//computed
			countryOptions,
			cityOptions,
			switchToggle,

			//method
			getCountrWiseCity,
			form,
			puzzle,
			resetData,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.add_employer__modal {
	padding: 0;
	.userStatusActive {
		transform: scale(1.1);
	}

	.modal__content {
		padding: 0;
		overflow: hidden;

		.modal-body {
			padding: 30px;
			overflow: scroll;
			margin-bottom: 20px;

			&::-webkit-scrollbar {
				display: none;
			}

			form {
				max-height: 60vh;
			}
		}
	}

	@media (max-width: 576px) {
		.modal__content {
			.modal-header {
				display: block;
				padding: 20px;
			}
			.modal-body {
				padding: 20px;
			}
		}
	}
}
.switch {
	display: inline-block;
	position: relative;
}
.switch input {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
}
.switch p {
	width: 40px;
	display: block;
	height: 17px;
	display: flex;
	position: relative;
	border-radius: 20px;
	border: 2px solid #000;
	margin: 0 20px;
}

.switch p::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	width: 22px;
	border-radius: 100%;
	height: 22px;
	transform: translate(-7px, -50%);
	background-color: #000;
	transition: all 0.5s;
	box-shadow: 1px 15px 9px #e6d9d9;
}

.switch input:checked + p::after {
	background-color: #ff4b57;
	transform: translate(21px, -50%);
}

.switch p span {
	color: #fff;
	width: 50px;
	min-width: 50px;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	padding: 0 6px;
	display: flex;
	align-items: center;
	font-weight: 500;
	transition: all 0.5s;
}
.profession-box-common {
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 45px 45px;
	transition: all 0.5s;
	height: 280px;
	fill: #c8cdd7 !important;
	transition: all 0.5s;

	@media (max-width: 2000px) {
		height: 240px;
	}

	@media (max-width: 1024px) {
		height: 230px;
	}

	.prof-bg-puzzle {
		top: 0;
		left: 0;
		height: 100%;
		position: absolute;
		display: block;

		@media (max-width: 425px) {
			right: 0;
		}

		.recipient-puzzle {
			width: 100%;
			height: 100%;
			position: relative;
			object-fit: contain;
		}
	}

	.text-content {
		z-index: 1;

		.content-icon {
			max-width: 80px;
			margin: 0 auto;
			width: 100%;

			svg {
				width: 80px;
				height: 80px;
				object-fit: contain;
			}
		}
		p {
			font-size: 21px;
		}
	}
	&:hover {
		fill: #ff4b57 !important;

		.text-content {
			color: #fff;
		}
	}
}
.sign-up-img-wrap {
	max-width: 40px;
	width: 100%;
}
.text-danger {
	font-weight: 500;
}
.m-puzzle {
	@media (max-width: 2560px) {
		margin-left: 10px;
	}
	@media (max-width: 2000px) {
		margin-left: -10px;
	}
}

.text-disable {
	@media (max-width: 425px) {
		justify-content: center;
		display: flex;
	}
}
</style>
<style lang="scss">
.recipient-modal {
	@media (max-width: 2560px) {
		min-width: 25% !important;
	}

	@media (max-width: 2000px) {
		min-width: 29% !important;
	}
}
.add_employer__modal {
	.modal-content {
		max-width: 600px;
		@media (max-width: 425px) {
			max-width: 337px;
		}
	}
}
</style>
