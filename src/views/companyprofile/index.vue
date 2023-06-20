<template>
	<!--Company Profile List-->
	<div class="company-user-wrap card-space">
		<!-- header -->
		<div class="payment-pill-header mb-sm-4">
			<div class="pph-left">
				<h5 class="title-lg mb-md-0 mb-2">
					{{ t('commonDashboard.companyProfile') }}
				</h5>
			</div>
		</div>
		<form class="tab-form">
			<div class="theme-input">
				<label class="account-head">{{ t('fieldList.companyName') }}</label>
			</div>
			<div class="row d-sm-flex align-items-center justify-content-sm-between justify-content-center mb-4">
				<div class="col-lg-4 col-md-6 col-12">
					<div class="position-relative user-wrap-input">
						<input
							id="company_name"
							type="text"
							class="form-control user-input"
							:placeholder="
								t('validation.enterField', {
									field: 'placeholder.companyName',
								})
							"
							@input="companyNameField.handleChange"
							@blur="companyNameField.handleBlur"
							:value="companyNameField.value"
							disabled
						/>

						<span class="position-absolute view-edit-danger" @click="showUserName(companyNameField.value)">
							<ToolTip :title="t('toolTip.editUserName')" position="top">
								<FontAwesomeIcon :icon="editIcon" />
							</ToolTip>
						</span>
					</div>
				</div>
				<div class="col-4">
					<div class="mt-md-0 mt-3 d-flex justify-content-end">
						<button class="btn-common btn-red py-2 mb-md-0 mb-2 ms-sm-3 ms-0" type="button" @click="viewChangePasswordModal()" :disabled="profileFlag">
							{{ t('managerAccount.changePassword') }}
						</button>
					</div>
				</div>
			</div>

			<div class="update-profile-card p-sm-4 p-2 mt-1 mb-3">
				<div class="form-group mb-0 d-lg-flex main-profile-card justify-content-xl-between">
					<div class="dash-user-profile-img rounded-circle position-relative">
						<div class="h-100">
							<!-- profile -->

							<img :src="profilePic" class="img-fluid" alt="err" />
							<!-- openImageSelector -->
							<div class="tbl-action grey-edit grey-btn-position" @click="imageCropperModal">
								<FontAwesomeIcon :icon="editIcon" class="text-sm" />
							</div>
						</div>
					</div>

					<div>
						<!-- company logo -->
						<div class="form-group col-12 p-0" v-show="false">
							<!-- dropzone - upload file -->
							<label>{{ t('managerAccount.uploadCompanyLogo') }}</label>
							<div class="drop-container">
								<div class="dropzone" id="dropImage" v-bind="getRootProps()">
									<div class="dropzone-text">
										<div class="dropzone-icon">
											<FontAwesomeIcon :icon="cloudUploadIcon" class=" text-sm" />
										</div>
										<div class="dropzone-info">
											<p>
												{{ t('managerAccount.uploadCompanyLogo') }}
											</p>
											<span>{{ t('common.pdf_doc_ppt_jpg_png') }}</span>
										</div>
									</div>
									<div class="fallback">
										<input name="contentFile" v-bind="getInputProps()" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-space mb-0 ms-lg-3 px-sm-4 px-3 py-4 z-1 bg-img relative">
						<h2 class="title-md">{{ t('managerAccount.details') }}</h2>
						<div class="form_part form-row mt-3">

							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
								<label for="company-user_mail">
									{{ t('fieldList.companyEmail') }}
								</label>
								<input
									id="company-user_mail"
									type="email"
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

							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
								<label for="detail_adress">
									{{ t('fieldList.address') }}
								</label>
								<input
									name=""
									id="detail_adress"
									class="form-control h-50 py-2"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.address',
										})
									"
									@input="addressField.handleChange"
									@blur="addressField.handleBlur"
									:value="addressField.value"
								/>
								<p class="text-danger">
									{{ addressField.errorMessage }}
								</p>
							</div>

							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
								<label for="teamName">
									{{ t('fieldList.country') }}
								</label>
								<div class="dropdown">
									<Multiselect
										class="form-group px-remove"
										label="country_name"
										trackBy="country_name"
										@input="companyCountryField.handleChange"
										@blur="companyCountryField.handleBlur"
										v-model="companyCountryField.value"
										:placeholder="
											t('validation.selectField', {
												field: 'placeholder.country',
											})
										"
										:searchable="true"
										valueProp="referenceId"
										:options="countryOptions"
										mode="single"
										:canDeselect="true"
										@change="selectCompanyCountry"
									/>
									<p class="text-danger">
										{{ companyCountryField.errorMessage }}
									</p>
								</div>
							</div>

							<div class="form-group col-xl-6 col-lg-6 col-12 theme-input">
								<label for="teamName">
									{{ t('fieldList.industry') }}
								</label>
								<Multiselect
									class="form-group px-remove"
									label="industry_name"
									trackBy="industry_name"
									@input="industryField.handleChange"
									@blur="industryField.handleBlur"
									v-model="industryField.value"
									:placeholder="
										t('validation.selectField', {
											field: 'placeholder.industry',
										})
									"
									:searchable="true"
									valueProp="referenceId"
									:options="industryOptions"
									mode="single"
									:canDeselect="true"
								/>

								<p class="text-danger">
									{{ industryField.errorMessage }}
								</p>
							</div>

							<div class="form-group col-xl-3 col-lg-6 col-12 theme-input">
								<label for="teamName">
									{{ t('fieldList.city') }}
								</label>
								<div class="dropdown">
									<Multiselect
										class="form-group px-remove"
										label="city_name"
										trackBy="city_name"
										@input="companyCityField.handleChange"
										@blur="companyCityField.handleBlur"
										v-model="companyCityField.value"
										:placeholder="
											t('validation.selectField', {
												field: 'placeholder.city',
											})
										"
										:searchable="true"
										valueProp="referenceId"
										:options="companyCityOptions"
										mode="single"
										:canDeselect="true"
									/>
									<p class="text-danger">
										{{ companyCityField.errorMessage }}
									</p>
								</div>
							</div>

							<div class="form-group col-xl-3 col-lg-6 col-12 theme-input">
								<label for="detail_businessID">
									{{ t('fieldList.businessID') }}
								</label>
								<input
									id="detail_city"
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

							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input mb-0">
								<label for="noEmployees">
									{{ t('fieldList.noOfEmployees') }}
									<span>*</span>
								</label>
								<div class="dropdown">
									<Multiselect
										class="form-group"
										@input="noOfEmployeesField.handleChange"
										@blur="noOfEmployeesField.handleBlur"
										v-model="noOfEmployeesField.value"
										:placeholder="
											t('validation.selectField', {
												field: 'placeholder.noOfEmployees',
											})
										"
										:options="noOfEmployeesOptions"
										mode="single"
										:canDeselect="true"
									/>

									<p class="text-danger">
										{{ noOfEmployeesField.errorMessage }}
									</p>
								</div>
							</div>

							<!-- Organization Type -->
							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input mb-0">
								<label for="organization">
									{{ t('fieldList.organization') }}
									<span>*</span>
								</label>

								<Multiselect
									class="form-group"
									@input="organizationField.handleChange"
									@blur="organizationField.handleBlur"
									v-model="organizationField.value"
									:placeholder="
										t('validation.selectField', {
											field: 'placeholder.organization',
										})
									"
									:options="organizationOptions.map(x=>({...x, label: t(x.label)}))"
									mode="single"
									:canDeselect="true"
								/>

								<p class="text-danger">
									{{ organizationField.errorMessage }}
								</p>
							</div>

							<div class="form-group col-xl-4 col-lg-6 col-12 theme-input mb-0">
								<label for="Company_website">
									{{ t('fieldList.companyWebsite') }}
								</label>
								<input
									id="Company_website"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.companyWebsite',
										})
									"
									@input="companyWebsiteField.handleChange"
									@blur="companyWebsiteField.handleBlur"
									:value="companyWebsiteField.value"
								/>
								<p class="text-danger">
									{{ companyWebsiteField.errorMessage }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- contactInfo start -->
			<div class="accordion-card card-space">
				<!-- form field -->
				<div class="form_part form-row mx-0">
					<!-- title - bank information -->
					<div class="form-group col-12 p-0 mb-0" @click="bankAccountExpland = !bankAccountExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head">{{ t('commonDashboard.contactInfo') }}</h5>

							<div>
								<a v-if="!bankAccountExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>
					<div class="accordion-collapse collapse show" v-if="bankAccountExpland">
						<div class="pt-3">
							<div class="form_part form-row">
								<div class="form-group col-xl-3 col-lg-6 col-12 theme-input mb-0">
									<label for="company_user_name">
										{{ t('fieldList.contractName') }}
									</label>
									<input
										id="company_user_name"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.contractName',
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
								<div class="form-group col-xl-4 col-lg-6 col-12 theme-input mb-0">
									<label for="company-user_mail">
										{{ t('commonDashboard.email') }}
									</label>
									<input
										id="company-user_mail"
										type="email"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.email',
											})
										"
										@input="emailField.handleChange"
										@blur="emailField.handleBlur"
										:value="emailField.value"
										disabled
									/>
									<p class="text-danger">
										{{ emailField.errorMessage }}
									</p>
								</div>

								<div class="form-group col-xl-3 col-lg-6 col-12 theme-input mb-0">
									<label for="company_mobile">
										{{ t('fieldList.phoneNumber') }}
									</label>
									<div class="hideappearance">
										<input
											id="company_mobile"
											type="text"
											class="form-control"
											:placeholder="
												t('validation.enterField', {
													field: 'placeholder.mobile',
												})
											"
											@input="mobileField.handleChange"
											@blur="mobileField.handleBlur"
											:value="mobileField.value"
										/>
									</div>
									<p class="text-danger">
										{{ mobileField.errorMessage }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- contactInfo end -->

			<!-- invoicing information start -->
			<div class="accordion-card card-space">
				<!-- form field -->
				<div class="form_part form-row mx-0">
					<!-- title - bank information -->
					<div class="form-group col-12 p-0 mb-0" @click="invoicingInfoExpland = !invoicingInfoExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head">{{ t('commonDashboard.invoiceInfo') }}</h5>

							<div>
								<a v-if="!invoicingInfoExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>
					<div class="accordion-collapse collapse show" v-if="invoicingInfoExpland">
						<div class="pt-3">
							<div class="form_part form-row">
								<!--invoicing_address -->
								<div class="form-group col-xl-3 col-lg-4 col-sm-5 col-12 theme-input">
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
								<div class="form-group col-sm-2 col-12 theme-input">
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

								<!--e_invoice_address -->
								<div class="form-group col-xl-3 col-lg-4 col-sm-5 col-12 theme-input">
									<label for="eInvoiceAddress">
										{{ t('fieldList.eInvoiceAddress') }}
									</label>

									<input
										id="eInvoiceAddress"
										type="text"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.eInvoiceAddress',
											})
										"
										@input="eInvoiceAddressField.handleChange"
										@blur="eInvoiceAddressField.handleBlur"
										:value="eInvoiceAddressField.value"
									/>
								</div>

								<!-- operator code -->
								<div class="form-group col-xl-3 col-lg-4 col-sm-5 col-12 theme-input">
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

								<!-- vat_number -->
								<div class="form-group col-xl-12 col-lg-8 col-sm-7 col-12 mb-0 theme-input">
									<label for="vatNumber">
										{{ t('fieldList.vatNumber') }}
									</label>

									<div class="row">
										<div class="col-xl-1 col-lg-2 col-sm-3 col-4 pr-0">
											<input type="text" class="form-control vat-input" :value="countryCode" readonly />
										</div>
										<div class="col-xl-3 col-lg-5 col-sm-7 col-8">
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
						</div>
					</div>
				</div>
			</div>
			<!-- invoicing information	 end -->
			<!-- update btn -->
			<button class="btn-common btn-red" @click="submitForm" :disabled="isSubmitting">
				<ToolTip :title="t('toolTip.updateProfile')">
					{{ t('common.update') }}
				</ToolTip>
			</button>
		</form>
		<!-- <ChangePassword /> -->
		<CompanySeekarRating />
	</div>
	<!-- update company name popup -->
	<Suspense v-if="showUserNameModal.value">
		<template #default>
			<company-name-information v-model:isModalShow="showUserNameModal" v-model:editUserDetails="editUserDetails" @fetchUserDetails="fetchCompanyProfile" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- change pass word modal -->
	<Suspense v-if="showChangePasswordModal.value">
		<template #default>
			<user-change-password v-model:isModalShow="showChangePasswordModal" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- image cropper modale -->
	<Suspense v-if="imageCropperdModal.value">
		<template #default>
			<cropper-image v-model:isModalShow="imageCropperdModal" @imageUpdated="imageUpdated" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { reactive, computed, ref, onMounted, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useForm, useField } from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faCloudUploadAlt, faEdit, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Multiselect from '@vueform/multiselect';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import { useDropzone } from 'vue3-dropzone';
import CompanySeekarRating from '@/views/companyprofile/components/CompanySeekarRating.vue';
import { noOfEmployeesOptions, organizationOptions } from '@/utils/enums.js'; // gender options
const CompanyNameInformation = defineAsyncComponent(async () => {
	return import('@/views/companyprofile/components/CompanyNameUpdate.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const UserChangePassword = defineAsyncComponent(async () => {
	return import('@/views/profile/components/ChangePasswordModale.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const CropperImage = defineAsyncComponent(async () => {
	return import('@/views/companyprofile/components/CropperImageCompany.vue' /* webpackChunkName:"TaxCardInformation" */);
});

import DefaultLoader from '@/components/loader/DefaultLoader.vue';
export default {
	name: 'companyUserprofile',

	components: {
		Multiselect,
		FontAwesomeIcon,
		CompanySeekarRating,
		CompanyNameInformation,
		DefaultLoader,
		UserChangePassword,
		CropperImage,
	},
	setup() {
		//ref
		const contentFile = ref(null);
		const contentFilePreview = ref('');
		const profilePic = ref(null);
		const isUserNameModalShow = ref(false);
		const isImageCropperModalShow = ref(false);
		// icon
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		const bankAccountExpland = ref(false);
		const invoicingInfoExpland = ref(false);
		const editUserDetails = ref({});

		const isChangePasswordModalShow = ref(false);
		const phoneRegExp = /^([+])?(\d{10,16}$)/;
		const fullName = /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/;
		const zipCodeRegExp = /^[0-9]{5}/;
		const countryCode = ref(null);
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.companyProfile')} - Way2Work`;

		// global store
		const store = useStore(); // use state

		// toast
		const toast = useToast();
		const profileFlag = ref(null);
		// icons
		const closeIcon = faTimes;
		const cloudUploadIcon = faCloudUploadAlt;
		const editIcon = faEdit;

		// form schema validation
		const employerSchema = yup.object({
			full_name: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.contractName',
					}),
				)
				.matches(
					fullName,
					t('validation.noValid', {
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
					t('validation.atMost', {
						field: 'fieldList.contractName',
						type: '25 characters',
					}),
				),
			phone_number: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.phoneNumber',
					}),
				)
				.matches(
					phoneRegExp,
					t('validation.noValid', {
						field: 'fieldList.phoneNumber',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.phoneNumber',
					}),
				)
				.max(
					15,
					t('validation.atMost', {
						field: 'fieldList.phoneNumber',
						type: '16 characters',
					}),
				),
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
			company_name: yup.string().nullable(),
			countryId: yup
				.string()
				.nullable()
				.optional(),
			cityId: yup
				.string()
				.nullable()
				.optional(),

			industryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.industry',
					}),
				),
			email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.email',
					}),
				)
				.email(t('validation.validEmail')),
			company_email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.companyEmail',
					}),
				)
				.email(t('validation.validEmail')),
			address: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.companyAddrdess',
					}),
				)
				.max(
					60,
					t('validation.atMost', {
						field: 'fieldList.companyAddrdess',
						type: '60 characters',
					}),
				),
			reg_number: yup
				.string()
				.nullable()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.businessID',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.businessID',
					}),
				),
			website: yup
				.string()
				.nullable()
				.optional(),
			companyCountryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.country',
					}),
				),
			companyCityId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.city',
					}),
				),
			
			no_of_employees: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.noOfEmployees',
					}),
				),
			owner_ship_type: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.organization',
					}),
				),
			
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
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, setValues } = useForm({
			validationSchema: employerSchema,
		});

		// form fields
		const fullNameField = reactive(useField('full_name', undefined, { initialValue: null }));
		const mobileField = reactive(useField('phone_number', undefined, { initialValue: null }));
		const companyNameField = reactive(useField('company_name', undefined, { initialValue: null }));
		const companyEmailField = reactive(useField('company_email', undefined, { initialValue: null }));
		const countryField = reactive(useField('countryId', undefined, { initialValue: null }));
		const cityField = reactive(useField('cityId', undefined, { initialValue: null }));
		const industryField = reactive(useField('industryId', undefined, { initialValue: null }));
		const emailField = reactive(useField('email', undefined, { initialValue: null }));
		const addressField = reactive(useField('address', undefined, { initialValue: null }));
		const employerYTunnusField = reactive(useField('reg_number', undefined, { initialValue: null }));
		const companyWebsiteField = reactive(useField('website', undefined, { initialValue: null }));
		const companyCountryField = reactive(useField('companyCountryId', undefined, { initialValue: null }));
		const companyCityField = reactive(useField('companyCityId', undefined, { initialValue: null }));
		const noOfEmployeesField = reactive(useField('no_of_employees', undefined, { initialValue: null }));
		const organizationField = reactive(useField('owner_ship_type', undefined, { initialValue: null }));
		const companyAddressField = reactive(useField('invoicing_address', undefined, { initialValue: null }));
		const zipCodeField = reactive(useField('zip_code', undefined, { initialValue: null, validateOnValueUpdate: false }));
		const eInvoiceAddressField = reactive(useField('e_invoice_address', undefined, { initialValue: null }));
		const operatorCodeField = reactive(useField('operator_code', undefined, { initialValue: null }));
		const vatNumberField = reactive(useField('vat_number', undefined, { initialValue: null }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch country options
			store.dispatch('country/getCountries');
			// get preferd language
			store.dispatch('language/getLanguages');
			// fetch company detail
			fetchCompanyProfile();
			// fetch industry options
			store.dispatch('industry/getIndustries');			
		});

		/**
		 * Computed props
		 * *******************************************************************
		 */

		const showUserNameModal = computed({
			get() {
				return isUserNameModalShow;
			},
			set(val) {
				isUserNameModalShow.value = val;
			},
		});

		// get language list
		const languageList = computed(() => {
			return store.state.language.languages.map(x => ({ language_name: x.language_name, value: x.id }));
		});

		// get country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);
		// get city options
		const cityOptions = computed(() => store.getters['country/getCitiesOptions']);

		// get company city options
		const companyCityOptions = computed(() => store.getters['country/getCompanyCitiesOptions']);

		// get industry options
		const industryOptions = computed(() => store.getters['industry/getIndustryOptions']);

		// calculate file size
		const calculateFileSize = computed(() => {
			const bytes = (contentFile.value && contentFile.value.size) || 0;

			// convert file size to MB from kb
			if (bytes === 0) {
				return 0;
			}

			return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
		});

		// show change pass modale
		const showChangePasswordModal = computed({
			get() {
				return isChangePasswordModalShow;
			},

			set(val) {
				isChangePasswordModalShow.value = val;
			},
		});
		// show Image cropper modale
		const imageCropperdModal = computed({
			get() {
				return isImageCropperModalShow;
			},

			set(val) {
				isImageCropperModalShow.value = val;
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// change form step

		// on file upload
		const onDrop = (acceptFiles, rejectReasons) => {
			if (rejectReasons.length) {
				toast.error(rejectReasons[0].errors[0].message);
				return false;
			}

			contentFile.value = acceptFiles[0]; // store file
			// file preview
			profilePic.value = ['image/png', 'image/jpg', 'image/jpeg'].includes(acceptFiles[0].type) ? URL.createObjectURL(acceptFiles[0]) : require('@/assets/images/iconWomanDraw.png');
		};

		// remove file
		const removeFile = () => {
			contentFile.value = null;
		};

		// dropzone
		const { getRootProps, getInputProps, ...rest } = useDropzone({
			multiple: false,
			onDrop,
			maxSize: 5242880, // 5 MB
			accept: ['.png', '.pdf', '.jpg', '.jpeg', '.docx'],
		});

		// submit form - change tab - step - 2
		const submitForm = handleSubmit(values => {
			const vatNumberValue = `${countryCode.value}-${values.vat_number}`;
			// form data
			const fullName = titleCase(values.full_name);
			const formData = new FormData();
			formData.append('full_name', fullName);
			formData.append('email', values.email);
			formData.append('company_name', values.company_name);
			formData.append('company_email', values.company_email);
			formData.append('address', values.address);
			formData.append('countryId', values.companyCountryId);
			formData.append('cityId', values.companyCityId);
			formData.append('zip_code', values.zip_code);
			formData.append('industryId', values.industryId);
			formData.append('phone_number', values.phone_number);
			formData.append('website', values.website);
			formData.append('reg_number', values.reg_number);
			formData.append('description', values.companyDescription);
			formData.append('profile_image', contentFile.value); // company logo
			formData.append('mobile', values.phone_number);
			formData.append('owner_ship_type', 'private');
			formData.append('no_of_employees', values.no_of_employees);
			formData.append('companyCountryId', values.companyCountryId);
			formData.append('companyCityId', values.companyCityId);
			formData.append('invoicing_address', values.invoicing_address);
			formData.append('e_invoice_address', values.e_invoice_address);
			formData.append('operator_code', values.operator_code);
			formData.append('vat_number', vatNumberValue ?? null);

			store.dispatch('dashboard/updateCompanyProfile', formData).then(() => {
				// fetch user details
				fetchCompanyProfile();
			});
			return true;
		});

		const openImageSelector = () => {
			document.querySelector('#dropImage').click();
		};

		//get country wise city
		const getCountrWiseCity = id => {
			if (id) {
				cityOptions.value = null;
				cityField.value = null;
				countryCode.value = (countryOptions.value.find(x => x.value === id) || {}).country_code;
				fetchCityCountryWise(id);
			} else {
				cityOptions.value = null;
				cityField.value = null;
			}
		};

		// first later capital
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

		// get city
		const fetchCityCountryWise = id => {
			countryCode.value = (countryOptions.value.find(x => x.value === id) || {}).country_code;

			store.dispatch('country/getCities', id);
		};

		//company detail select country and city
		const selectCompanyCountry = id => {
			if (id) {
				companyCityOptions.value = null;
				companyCityField.value = null;
				countryCode.value = (countryOptions.value.find(x => x.value === id) || {}).country_code;
				store.dispatch('country/getCompanyCities', id);
			} else {
				companyCityOptions.value = null;
				companyCityField.value = null;
				countryCode.value = null;
			}
		};

		const showUserName = val => {
			showUserNameModal.value = true;
			editUserDetails.value = {
				editUserName: val,
			};
		};
		// fetchcompany details
		const fetchCompanyProfile = () => {
			// // fetch user details
			store.dispatch('auth/verifyToken').then(res => {
				let data = res.data.data;
				if (res.data.data.countryReferenceId) {
					//fetch city
					fetchCityCountryWise(res.data.data.countryReferenceId);
					//fetch city company
					selectCompanyCountry(res.data.data.company.countryReferenceId);
				}
				profilePic.value = data.file_path ?? null;
				profileFlag.value = data.incomplete_profile_flag;
				let vatNumber = data.company.vat_number ? (data.company.vat_number.slice(3) == 'null' ? null : data.company.vat_number.slice(3)) : '';
				setValues({
					full_name: data.full_name,
					phone_number: data.company?.mobile,
					zip_code: data.company?.zip_code,
					company_name: data.company?.company_name,
					address: data.company?.address,
					countryId: data.countryReferenceId,
					cityId: data?.cityReferenceId,
					companyCountryId: data.company?.countryReferenceId,
					companyCityId: data.company?.cityReferenceId,
					industryId: data.company?.industryReferenceId,
					email: data?.email,
					company_email: data.company?.company_email,
					reg_number: data.company?.reg_number,
					website: data.company?.website,
					companyDescription: data.company?.description,
					no_of_employees: data.company?.no_of_employees,
					owner_ship_type: data.company?.owner_ship_type,
					invoicing_address: data.company?.invoicing_address,
					e_invoice_address: data.company?.e_invoice_address,
					operator_code: data.company?.operator_code,
					vat_number: data.company.vat_number == null ? '' : vatNumber,
				});
			});
		};

		const viewChangePasswordModal = () => {
			showChangePasswordModal.value = true;
			isChangePasswordModalShow.value = true;
		};
		// view image cropper modal
		const imageCropperModal = () => {
			imageCropperdModal.value = true;
			isImageCropperModalShow.value = true;
		};
		const imageUpdated = (dada, type) => {
			profilePic.value = dada;
			const base64Image = dada.replace(`data:${type};base64,`, '');
			const contentType = 'image/png';
			contentFile.value = b64toBlob(base64Image, contentType);
		};
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

		return {
			//ref
			contentFile,
			contentFilePreview,
			t,
			closeIcon,
			cloudUploadIcon,
			editIcon,
			profilePic,
			noOfEmployeesOptions,
			organizationOptions,
			bankAccountExpland,
			invoicingInfoExpland,
			editUserDetails,
			countryCode,

			//icon
			arrowDown,
			arrowUp,

			//field
			fullNameField,
			mobileField,
			zipCodeField,
			companyNameField,
			countryField,
			cityField,
			industryField,
			emailField,
			companyEmailField,
			addressField,
			employerYTunnusField,
			companyWebsiteField,
			companyCityField,
			companyCountryField,
			noOfEmployeesField,
			organizationField,
			companyAddressField,
			eInvoiceAddressField,
			operatorCodeField,
			vatNumberField,

			// form related
			formMeta,
			isSubmitting,

			//computed
			countryOptions,
			cityOptions,
			industryOptions,
			calculateFileSize,
			companyCityOptions,
			imageCropperdModal,
			languageList,
			showUserNameModal,
			showChangePasswordModal,

			//method
			submitForm,
			removeFile,
			getRootProps,
			getInputProps,
			rest,
			openImageSelector,
			getCountrWiseCity,
			selectCompanyCountry,
			imageCropperModal,
			titleCase,
			profileFlag,
			showUserName,
			fetchCompanyProfile,

			// ChangePassword,
			UserChangePassword,

			viewChangePasswordModal,
			imageUpdated,
			b64toBlob,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.company-user-wrap {
	.theme-input {
		.form-control {
			padding: 8px 12px;
		}
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

	.company-user-profile {
		max-width: 100px;
		width: 100%;
		height: 100px;
		border-radius: 100%;
		background-color: #eaeaea;

		@media (max-width: 576px) {
			margin: 0 auto;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}

	.grey-edit {
		width: 30px;
		height: 30px;

		svg {
			width: 10px;
			height: 10px;
		}
	}

	.grey-btn-position {
		position: absolute;
		bottom: 0;
		right: 0;
		transform: translateX(10px);
	}

	#company-textarea {
		border: 2px solid #bbbbbb;
		border-radius: 1rem;
		background-origin: border-box;
		background-clip: content-box, border-box;

		.form-control {
			border-radius: 1rem;
			border: 0;
		}
	}
}

.accordion-head {
	font-size: 21px;
	font-weight: 600;
	@media (max-width: 1440px) {
		font-size: 18px;
	}

	@media (max-width: 425px) {
		font-size: 17px;
	}
}

.payment-pill-header {
	text-align: start !important;

	.title-lg {
		color: #a0a4a9;
	}
}

.dash-user-profile-img {
	max-width: 100px;
	width: 100%;
	height: 100px;
	border-radius: 100%;
	background-color: #eaeaea;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
}

.update-profile-card {
	background-color: #e9e9e9;
	border-radius: 20px;

	.main-profile-card {
		align-items: flex-start;

		@media (min-width: 1650px) {
			align-items: center;
		}

		.dash-user-profile-img {
			max-width: 170px;
			height: 170px;

			@media (max-width: 1024px) {
				max-width: 150px;
				height: 150px;
			}

			@media (max-width: 992px) {
				margin: 0 auto 1rem auto;
			}

			@media (max-width: 992px) {
				max-width: 130px;
				height: 130px;
			}

			@media (max-width: 425px) {
				max-width: 110px;
				height: 110px;
			}

			img {
				box-shadow: 0px 4px 16px 6px rgba(0, 0, 0, 0.1);
			}

			.grey-btn-position {
				right: 17px;
				background-color: #000;
				background-image: none;

				@media (max-width: 425px) {
					right: 10px;
				}

				svg {
					width: 15px;
					height: 15px;
					color: #fff;

					@media (max-width: 425px) {
						width: 13px;
						height: 13px;
					}
				}

				&.grey-edit {
					height: 45px;
					width: 45px;

					@media (max-width: 1024px) {
						height: 40px;
						width: 40px;
						min-width: 40px;
					}

					@media (max-width: 425px) {
						height: 30px;
						width: 30px;
						min-width: 30px;
					}
				}
			}
		}

		.card-space {
			box-shadow: 0px, 0px, 17px, 0px rgba(0, 0, 0, 0.22);

			@media (max-width: 576px) {
				padding: 15px 10px;
			}

			&.bg-img {
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					right: 30px;
					height: 280px;
					width: 190px;
					background-image: url('~@/assets/images/jobseeker.png');
					background-repeat: no-repeat;
					background-size: cover;
					z-index: -1;
					filter: blur(50px) brightness(120%) grayscale(60%);

					@media (max-width: 1024px) {
						display: none;
					}
				}
			}

			.col-xxl-9 {
				@media (min-width: 1650px) {
					width: 75%;
					padding-top: 1.5rem !important;
					padding-bottom: 1.5rem !important;
				}
			}

			.col-xxl-3 {
				@media (min-width: 1650px) {
					width: 25%;
					padding-top: 1.5rem !important;
					padding-bottom: 1.5rem !important;
				}
			}

			@media (max-width: 1650px) {
				.col-xxl-9 {
					width: 100%;
					padding-top: 1rem !important;
					padding-bottom: 1rem !important;
				}

				.col-xxl-3 {
					width: 100%;
					padding-top: 1rem !important;
					padding-bottom: 1rem !important;
				}
			}

			@media (max-width: 425px) {
				.col-xxl-9 {
					padding-top: 0.5 !important;
					padding-bottom: 0.5 !important;
				}

				.col-xxl-3 {
					padding-top: 0.5 !important;
					padding-bottom: 0.5 !important;
				}
			}
		}

		.update-profile-info {
			.tax-title {
				max-width: 170px;
				width: 100%;
				font-weight: 600;
				font-size: 17px;

				@media (max-width: 1440px) {
					font-size: 15px;
				}

				@media (max-width: 425px) {
					font-size: 14px;
				}
			}

			.tax-value {
				min-width: 80px;
				font-weight: 600;
				font-size: 17px;
				text-align: end;

				@media (max-width: 425px) {
					font-size: 14px;
				}
			}
		}

		.text-gray {
			color: #919191;
			font-weight: 600;

			@media (max-width: 1440px) {
				font-size: 13px;
			}
		}
	}
}

.z-1 {
	z-index: 1;
}

.relative {
	position: relative;
}

.view-edit-danger {
	top: 0px;
	right: 10px;
	transform: translate(-50%, 20%);
	color: #ff4b57;
}

.user-wrap-input {
	.user-input {
		font-size: 23px;
		font-weight: 600;
		color: #3c3c3c;
		padding: 8px 48px 8px 15px !important;

		@media (max-width: 1650px) {
			font-size: 22px;
		}

		@media (max-width: 992px) {
			max-width: 300px;
		}

		@media (max-width: 575px) {
			max-width: 100%;
			font-size: 20px;
		}
	}
	.account-head {
		font-weight: 400 !important;
		font-size: 15px !important;
	}

	.view-edit-danger {
		top: 2px;
		right: 15px;
	}
}

.accordion-card {
	padding: 25px 30px;
	margin-bottom: 30px;
	@media (max-width: 768px) {
		padding: 20px 25px;
		border-radius: 15px;
	}
	@media (max-width: 575px) {
		padding: 15px 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}
}
.text-big {
	font-size: 20px;
}

.tab-form {
	.btn-common {
		@media (max-width: 1024px) {
			font-size: 15px;
		}

		@media (max-width: 768px) {
			font-size: 13px;
		}
	}
}
</style>
<style>
textarea.form-control {
	min-height: calc(5.5em + 0.75rem + 2px) !important;
}

.hideappearance input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	appearance: none;
}
</style>

<style lang="scss">
.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
</style>
