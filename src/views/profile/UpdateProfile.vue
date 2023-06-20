<template>
	<!-- update profile -->
	<div class="card-space account__form">
		<!-- profile form -->
		<form class="tab-form theme-input">
			<!-- title -->
			<div class="form-group col-12 p-0 mb-4">
				<div class="d-flex align-items-center justify-content-between mb-4 flex-md-nowrap flex-wrap">
					<h5 class="title-lg mb-md-0 mb-2">{{ t('sidebar.manageAccount') }}</h5>
					<label class="switch d-flex align-items-center m-0">
						<h6 class="fn15">{{ t('managerAccount.gigAvaMsg') }}</h6>
						<input type="checkbox" class="checkbox" v-model="selected" @change="check($event)" id="switch" />
						<p>
							<span class="on"></span>
							<span class="off"></span>
						</p>
					</label>
				</div>
				<div class="row mb-3">
					<div class="col-lg-4 col-md-6 col-12 position-relative user-wrap-input">
						<label class="account-head">{{ t('managerAccount.profileName') }}</label>

						<input
							id="firstName"
							type="text"
							class="form-control user-input"
							:placeholder="
								t('validation.enterField', {
									field: 'fieldList.fullName',
								})
							"
							@input="fullNameField.handleChange"
							@blur="fullNameField.handleBlur"
							:value="fullNameField.value"
							disabled
						/>

						<span class="position-absolute view-edit-danger" @click="showUserName(fullNameField.value)">
							<ToolTip :title="t('toolTip.editUserName')" position="top">
								<FontAwesomeIcon :icon="editIcon" />
							</ToolTip>
						</span>
					</div>
				</div>
				<div class="d-flex align-items-center justify-content-sm-between justify-content-center flex-xxl-nowrap flex-wrap">
					<div class="d-flex align-items-center flex-sm-nowrap flex-wrap count-text-wrap">
						<div class="d-flex align-items-center">
							<span v-for="(item, index) in 5" :key="index">
								<div class="mr-1">
									<a>
										<FontAwesomeIcon :icon="startIcon" :class="ratingAvg > index ? 'fill-star' : 'fill-star-dark'" />
									</a>
								</div>
							</span>
						</div>
						<div class="mx-sm-2 profile-rating-text">
							<p>
								{{ t('managerAccount.your_profile_has_been_reviewed') }}
								{{ ratingCount }}
								{{ t('managerAccount.times_and_your_average_rating_is') }}
								{{ ratingAvg }} {{ t('managerAccount.out_of') }}
							</p>
						</div>
					</div>

					<div class="d-flex flex-md-nowrap flex-wrap lign-items-center justify-content-lg-start justify-content-center">
						<div v-if="profileFlag" class="d-flex">
							<button class="btn-common btn-red mb-md-0 mb-2 grey-edit-bg" type="button">{{ t('managerAccount.viewTaxCards') }}</button>
							<button class="btn-common btn-red mb-md-0 mb-2 ms-sm-3 ms-2 grey-edit-bg" type="button">{{ t('commonDashboard.myDocuments') }}</button>
							<button class="btn-common btn-red mb-md-0 mb-2 ms-sm-3 ms-0 grey-edit-bg" type="button">{{ t('managerAccount.changePassword') }}</button>
						</div>
						<span v-else>
							<button class="btn-common btn-red mb-md-0 mb-2" type="button" @click="viewShowTaxCardModal">{{ t('managerAccount.viewTaxCards') }}</button>
							<button class="btn-common btn-red mb-md-0 mb-2 ms-sm-3 ms-2" type="button" @click="redirectDocument" :disabled="profileFlag">
								{{ t('commonDashboard.myDocuments') }}
							</button>
							<button class="btn-common btn-red mb-md-0 mb-2 ms-sm-3 ms-0" type="button" @click="viewChangePasswordModal()" :disabled="profileFlag">
								{{ t('managerAccount.changePassword') }}
							</button>
						</span>
					</div>
				</div>
			</div>

			<div class="update-profile-card p-sm-4 p-2">
				<div class="form-group mb-0 d-lg-flex main-profile-card">
					<div class="dash-user-profile-img rounded-circle position-relative">
						<div class="h-100">
							<img :src="profilePic" class="img-fluid" alt="err" />
							<!-- openUpdateImageSelector -->
							<div class="tbl-action grey-edit grey-btn-position" @click="imageCropperModal">
								<FontAwesomeIcon :icon="editIcon" class="text-sm" />
							</div>
						</div>
					</div>
					<!-- dropzone - upload file -->
					<div class="form-group col-12 p-0" v-show="false">
						<label for="uploadCompanyLogo">{{ t('managerAccount.uploadCompanyLogo') }}</label>
						<div class="drop-container">
							<div class="dropzone" id="dropImage" v-bind="getRootProps()">
								<div class="dropzone-text">
									<div class="dropzone-icon">
										<FontAwesomeIcon :icon="cloudUploadIcon" class="text-sm" />
									</div>
									<div class="dropzone-info">
										<p>
											{{ t('managerAccount.uploadCompanyLogo') }}
										</p>
										<span>PDF, DOC, PPT, JPG, PNG</span>
									</div>
								</div>
								<div class="fallback">
									<input name="contentFile" v-bind="getInputProps()" accept="image/png, image/gif, image/jpeg image/jpg" />
								</div>
							</div>
						</div>
					</div>
					<div class="card-space mb-0 ms-lg-3 px-sm-4 px-3 py-0 z-1">
						<div class="row">
							<div class="col-xxl-9">
								<h5 class="text-big">{{ t('managerAccount.updateProfile') }}</h5>
								<div class="row">
									<!-- gender -->
									<div class="form-group col-xl-3 col-lg-6">
										<label for="gender"> {{ t('fieldList.gender') }}<span>*</span> </label>
										<Multiselect
											id="gender"
											class="form-group"
											@input="genderField.handleChange"
											@blur="genderField.handleBlur"
											:placeholder="
												t('validation.selectField', {
													field: 'placeholder.gender',
												})
											"
											v-model="genderField.value"
											:options="genderOptions.map(x=>({...x, label: t(x.label)}))"
											mode="single"
											:hide-selected="true"
										/>
										<p class="text-danger">
											{{ genderField.errorMessage }}
										</p>
									</div>

									<!-- date of birth -->
									<div class="form-group col-xl-3 col-lg-6 px-xl-2">
										<label for="dob"> {{ t('fieldList.dob') }}<span>*</span> </label>

										<v-date-picker
											id="dob"
											@input="dobField.handleChange"
											@blur="dobField.handleBlur"
											v-model="dobField.value"
											:masks="{ input: 'DD.MM.YYYY' }"
											:max-date="new Date()"
										>
											<template v-slot="{ inputValue, inputEvents }">
												<input class="form-control" :value="inputValue" v-on="inputEvents" />
											</template>
										</v-date-picker>

										<p class="text-danger">
											{{ dobField.errorMessage }}
										</p>
									</div>

									<!-- bank name -->
									<div class="form-group col-xl-3 col-lg-6 px-xl-2">
										<label for="ssn">
											{{ t('fieldList.ssn') }}
										</label>

										<input
											id="ssn"
											type="text"
											class="form-control"
											:placeholder="
												t('validation.enterField', {
													field: 'placeholder.ssn',
												})
											"
											@input="ssnField.handleChange"
											@blur="ssnField.handleBlur"
											:value="ssnField.value"
										/>

										<p class="text-danger">
											{{ ssnField.errorMessage }}
										</p>
									</div>

									<!-- mobile number -->
									<div class="form-group col-xl-3 col-lg-6">
										<label for="mobilePhone"> {{ t('fieldList.mobile') }}<span>*</span> </label>
										<div class="hideappearance">
											<input
												id="mobilePhone"
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

									<!-- current address -->
									<div class="form-group col-xl-6 col-lg-6 pe-xl-2">
										<label for="address"> {{ t('fieldList.cAddress') }}<span>*</span> </label>

										<input
											id="cAddress"
											type="text"
											class="form-control"
											:placeholder="
												t('validation.enterField', {
													field: 'placeholder.cAddress',
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

									<!-- residence - country -->
									<div class="form-group col-xl-3 col-lg-6 px-xl-2">
										<label for="residence"> {{ t('fieldList.residence') }}<span>*</span> </label>

										<Multiselect
											id="residence"
											class="form-group px-remove"
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
											:options="countryOptions"
											@change="getCountrWiseCity"
											:searchable="true"
											valueProp="referenceId"
											:canDeselect="true"
											mode="single"
										/>

										<p class="text-danger">
											{{ countryField.errorMessage }}
										</p>
									</div>

									<!-- nationality -->
									<div class="form-group col-xl-3 col-lg-6">
										<label for="nationality"> {{ t('fieldList.city') }}<span>*</span> </label>

										<Multiselect
											id="nationality"
											class="form-group px-remove"
											label="city_name"
											trackBy="city_name"
											@input="nationalityField.handleChange"
											@blur="nationalityField.handleBlur"
											v-model="nationalityField.value"
											:placeholder="
												t('validation.selectField', {
													field: 'placeholder.city',
												})
											"
											:searchable="true"
											valueProp="referenceId"
											:options="cityOptions"
											:canDeselect="true"
											mode="single"
										/>

										<p class="text-danger">
											{{ nationalityField.errorMessage }}
										</p>
									</div>
								</div>
								<p class="request-text">
									{{ t('managerAccount.your_profile_will_be_visible_after_you_accept_somebodys_viewing_request') }}
								</p>
							</div>
							<div class="col-xxl-3 relative">
								<div class="d-flex flex-column justify-content-between h-100 bg-img">
									<div class="update-profile-info">
										<h5 class="text-big">{{ t('managerAccount.taxInfoTitle') }}</h5>
										<div>
											<div class="d-flex align-items-center justify-content-between mb-1">
												<div class="tax-title">
													{{ t('fieldList.yearlyIncome') }}
												</div>
												<div class="tax-value" v-if="!taxCardList.value">{{ yearyIncome ?? 0 }} €</div>
												<div class="tax-value" v-else>{{ 0 }} €</div>
											</div>
											<div class="d-flex align-items-center justify-content-between mb-1">
												<div class="tax-title">
													{{ t('managerAccount.withholdingRate') }}
												</div>
												<div class="tax-value">{{ personalTax ?? 60 }} %</div>
											</div>
											<div class="d-flex align-items-center justify-content-between mb-1">
												<div class="tax-title">
													{{ t('managerAccount.topWithholding') }}
												</div>
												<div class="tax-value">{{ maxTaxPercentage ?? 60 }} %</div>
											</div>
										</div>
									</div>
									<div>
										<p class="text-gray text-end mb-1 mt-sm-0 mt-2 fn15">
											<span v-if="taxCardList.length != 0"> {{ t('managerAccount.taxCardUpdatedOn') }} {{ taxDateupdated }} </span>
											<span v-else>
												{{ t('managerAccount.notaxCardFound') }}
											</span>
										</p>

										<span v-if="userVerify">
											<p class="text-gray text-end uppercase fn16">
												{{ t('managerAccount.verifiedUser') }}
											</p>
										</span>
										<span v-else>
											<p class="text-gray text-end uppercase fn16">
												{{ t('managerAccount.not') }}
												{{ t('managerAccount.verifiedUser') }}
											</p>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- personal information -->

			<div class="card-space bank-accordion relative">
				<span v-if="bankNameField.value == null || accountNumberField.value == null || bicField.value == null">
					<img src="~@/assets/images/required-hint.png" alt="img" class="img-fluid info_icon" />
				</span>
				<div class="row m-0">
					<!-- title - bank information -->
					<div class="form-group col-12 p-0 mb-0" @click="bankAccountExpland = !bankAccountExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head mb-0">
								{{ t('managerAccount.bankAccountTitle') }}
							</h5>
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

					<div class="accordion-collapse collapse show p-0" v-if="bankAccountExpland">
						<div class="row mt-3 mx-0">
							<!-- account number -->
							<div class="form-group col-xl-4 col-lg-6 px-0 mb-xl-0 mb-lg-3 mb-2">
								<label for="accountNumber"> {{ t('fieldList.accountNumber') }} </label>

								<input
									id="accountNumber"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.accountNumber',
										})
									"
									@input="accountNumberField.handleChange"
									@blur="accountNumberField.handleBlur"
									:value="accountNumberField.value"
									@change="checkIban"
								/>

								<p class="text-danger">
									{{ accountNumberField.errorMessage }}
								</p>
							</div>

							<!-- bank name -->
							<div class="form-group col-xl-4 col-lg-6 mb-xl-0 mb-lg-3 mb-2 pr-0 ps-lg-3 ps-0 px-xl-3">
								<label for="bankName">
									{{ t('fieldList.bankName') }}
								</label>

								<input
									id="bankName"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.bankName',
										})
									"
									@input="bankNameField.handleChange"
									@blur="bankNameField.handleBlur"
									:value="bankNameField.value"
								/>

								<p class="text-danger">
									{{ bankNameField.errorMessage }}
								</p>
							</div>

							<!-- bic number -->
							<div class="form-group col-xl-4 col-lg-6 px-0 px-sm-3 px-md-0 mb-0">
								<label for="bicNumber">
									{{ t('fieldList.bicNumber') }}
								</label>

								<input
									id="bicNumber"
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'placeholder.bicNumber',
										})
									"
									@input="bicField.handleChange"
									@blur="bicField.handleBlur"
									:value="bicField.value"
								/>

								<p class="text-danger">
									{{ bicField.errorMessage }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- update btn -->
			<button type="button" class="btn-common btn-red" @click="submitForm" :disabled="isSubmitting">
				<ToolTip :title="t('toolTip.updateProfile')">
					{{ t('common.update') }}
				</ToolTip>
			</button>
		</form>
	</div>
	<!-- Tax card details -->
	<TaxCard />
	<!-- seek for gig details -->
	<SeekForGigDetails />
	<!-- use skill details -->
	<UseSkill />
	<!-- seeker rating -->
	<SeekerRating :ratingArray="seekerRatingArray" />
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
	<!-- tax card list information -->
	<Suspense v-if="showTaxCardModal.value">
		<template #default>
			<tax-card-information v-model:isModalShow="showTaxCardModal" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- update user name popup -->

	<Suspense v-if="showUserNameModal.value">
		<template #default>
			<user-name-information v-model:isModalShow="showUserNameModal" v-model:editUserDetails="editUserDetails" @fetchUserDetails="fetchUserProfile" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>

	<!-- open image download modal -->
	<Suspense v-if="showDocumentImageModal.value">
		<template #default>
			<open-image-modal v-model:isModalShow="showDocumentImageModal" :imageLink="imageLink" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { ref, defineAsyncComponent, computed, onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
import Multiselect from '@vueform/multiselect';

import { dateFormat } from '@/utils/mixins';
import { genderOptions } from '@/utils/enums.js'; // gender options
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faStar, faTimes, faCloudUploadAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';
import { useDropzone } from 'vue3-dropzone';
import SeekForGigDetails from '@/views/profile/SeekForGigDetails.vue';
import SeekerRating from '@/views/profile/components/SeekerRating.vue';
import UseSkill from '@/views/skill/UserSkill.vue';
import TaxCard from '@/views/profile/TaxCard.vue';
import IBAN from 'iban';
import { useRouter } from 'vue-router';

const TaxCardInformation = defineAsyncComponent(async () => {
	return import('@/views/profile/components/TaxCardInformationModal.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const UserNameInformation = defineAsyncComponent(async () => {
	return import('@/views/profile/components/UserNameUpdateModale.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const UserChangePassword = defineAsyncComponent(async () => {
	return import('@/views/profile/components/ChangePasswordModale.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const CropperImage = defineAsyncComponent(async () => {
	return import('@/views/profile/components/CropperImageModale.vue' /* webpackChunkName:"TaxCardInformation" */);
});

const OpenImageModal = defineAsyncComponent(async () => {
	return import('@/views/document/components/ImageModal/MyDocumentImageModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'UpdateProfile',

	components: {
		FontAwesomeIcon,
		DefaultLoader,
		TaxCardInformation,
		Multiselect,
		UserNameInformation,
		OpenImageModal,
		UserChangePassword,
		SeekForGigDetails,
		UseSkill,
		TaxCard,
		SeekerRating,
		CropperImage,
	},

	setup() {
		// ref vars
		const isTaxCardInformationModalShow = ref(false);
		const isUserNameModalShow = ref(false);
		const isChangePasswordModalShow = ref(false);
		const isImageCropperModalShow = ref(false);
		const yearyIncome = ref(0);
		const personalTax = ref(0);
		const maxTaxPercentage = ref(0);
		const taxDateupdated = ref(null);
		const documentFile = ref(null);
		const documentFilePreview = ref('');
		const profilePic = ref(null);
		const contentFile = ref(null);
		const contentFilePreview = ref('');
		const isDocImgModal = ref(false);
		const imageLink = ref(null);
		const bankAccountExpland = ref(false);
		// icon
		const editIcon = faEdit;
		const startIcon = faStar;
		const closeIcon = faTimes;
		const cloudUploadIcon = faCloudUploadAlt;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		const phoneRegExp = /^([+])?(\d{10,16}$)/;
		const stringRegExBank = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/;
		const stringRegExp = /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/;
		const alphaNumberRegExp = /^[a-zA-Z0-9]*$/;

		const editUserDetails = ref({});
		const docFilePic = ref(null);
		const ratingAvg = ref(0);
		const ratingCount = ref(0);
		const userVerify = ref(null);
		const seekerRatingArray = ref([]);
		const profileFlag = ref(null);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.manageAccount')} - Way2Work`;

		const tableIndex = ref(null);

		// global store
		const store = useStore(); // use state

		// toast
		const toast = useToast();

		const router = useRouter();

		// form schema validation
		const profileSchema = yup.object({
			full_name: yup
				.string()
				.matches(
					/^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/,
					t('validation.noValid', {
						field: 'fieldList.fullName',
					}),
				)
				.min(
					2,
					t('validation.atLeast', {
						field: 'fieldList.fullName',
						type: '2 characters',
					}),
				)
				.max(
					60,
					t('validation.atMost', {
						field: 'fieldList.fullName',
						type: '60 characters',
					}),
				),

			gender: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.gender',
					}),
				),
			dob: yup
				.date()
				.typeError(
					t('validation.requiredField', {
						field: 'managerAccount.dob',
					}),
				)
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.dob',
					}),
				),
			address: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.address',
					}),
				),
			countryId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.country',
					}),
				),
			nationalityId: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.city',
					}),
				),
			mobile: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.mobile_number',
					}),
				)
				.matches(
					phoneRegExp,
					t('validation.noValid', {
						field: 'fieldList.mobile_number',
					}),
				)
				.max(
					15,
					t('validation.atMost', {
						field: 'fieldList.mobile_number',
						type: '16 characters',
					}),
				),
			ssn: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.ssn',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.ssn',
					}),
				)
				.max(60),
			other_earnings: yup
				.number()
				.nullable()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.other_earnings',
					}),
				)
				.typeError(
					t('validation.beMust', {
						field: 'fieldList.other_earnings_number',
						type: 'number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.otherEarnings',
					}),
				),
			bank_name: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.bankName',
					}),
				)
				.typeError(
					t('validation.atLeast', {
						field: 'fieldList.bankName',
						type: '2 characters',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.bankName',
					}),
				)
				.matches(
					stringRegExBank,
					t('validation.noValid', {
						field: 'fieldList.bankName',
					}),
				)
				.min(
					2,
					t('validation.atLeast', {
						field: 'fieldList.bankName',
						type: '2 characters',
					}),
				)
				.max(
					60,
					t('validation.moreThen', {
						field: 'fieldList.bankName',
						type: '60 characters',
					}),
				),

			account_number: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.bankName',
					}),
					'Account number number is reqiured.',
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.accountNumber',
					}),
				),
			bic_number: yup
				.string()
				.typeError(
					t('validation.isRequired', {
						field: 'fieldList.bic_number',
					}),
				)
				.required(
					t('validation.requiredField', {
						field: 'fieldList.bicNumber',
					}),
				)
				.matches(
					alphaNumberRegExp,
					t('validation.noValid', {
						field: 'fieldList.bic_number',
					}),
				)
				.min(
					8,
					t('validation.atLeast', {
						field: 'fieldList.bic_number',
						type: '8 characters',
					}),
				)
				.max(
					11,
					t('validation.atMost', {
						field: 'fieldList.bic_number',
						type: '11 characters',
					}),
				),

			profile_image: yup.mixed().notRequired(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, setValues, setFieldError } = useForm({
			validationSchema: profileSchema,
		});

		// form fields
		const fullNameField = reactive(useField('full_name', undefined, { initialValue: null }));
		const genderField = reactive(useField('gender', undefined, { initialValue: null }));
		const dobField = reactive(useField('dob', undefined, { initialValue: '' }));
		const addressField = reactive(useField('address', undefined, { initialValue: null }));
		const countryField = reactive(useField('countryId', undefined, { initialValue: null }));
		const nationalityField = reactive(useField('nationalityId', undefined, { initialValue: null }));
		const mobileField = reactive(useField('mobile', undefined, { initialValue: null }));
		const ssnField = reactive(useField('ssn', undefined, { initialValue: null, validateOnValueUpdate: false }));
		const otherEarningsField = reactive(useField('other_earnings', undefined, { initialValue: null }));
		const bankNameField = reactive(useField('bank_name', undefined, { initialValue: null, validateOnValueUpdate: false }));
		const accountNumberField = reactive(useField('account_number', undefined, { initialValue: null, validateOnValueUpdate: false }));
		const bicField = reactive(useField('bic_number', undefined, { initialValue: null, validateOnValueUpdate: false }));
		const profilePictureField = reactive(useField('profile_image', undefined, { initialValue: null }));
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('language/getLanguages');

			// fetch user details
			fetchUserProfile();
			// fetch country options
			store.dispatch('country/getCountries');

			// fetch tax card details
			store.dispatch('document/getTaxCardList');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get language list
		const languageList = computed(() => {
			return store.state.language.languages.map(x => ({ language_name: x.language_name, value: x.id }));
		});

		// show add experience modal
		let showTaxCardModal = computed({
			get() {
				return isTaxCardInformationModalShow;
			},

			set(val) {
				isTaxCardInformationModalShow.value = val;
			},
		});

		const showUserNameModal = computed({
			get() {
				return isUserNameModalShow;
			},

			set(val) {
				isUserNameModalShow.value = val;
			},
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

		// toggle login modal
		const selected = computed({
			get() {
				return store.state.auth.seekForGig;
			},

			set(val) {
				store.commit('auth/SET_STATE', {
					action: 'seekForGig',
					data: val,
				});
			},
		});

		// show upload my document model
		const showDocumentImageModal = computed({
			get() {
				return isDocImgModal;
			},
			set(val) {
				isDocImgModal.value = val;
			},
		});

		// get country options
		const countryOptions = computed(() => store.getters['country/getCountryOptions']);

		// get city options
		const cityOptions = computed(() => store.getters['country/getCitiesOptions']);

		// tax card data
		const taxCardList = computed(() => store.getters['document/getTaxCardList']);
		// calculate file size
		const calculateFileSize = computed(() => {
			return file => {
				const bytes = file.size || 0;
				// convert file size to MB from kb
				if (bytes === 0) {
					return 0;
				}
				return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
			};
		});

		const checkBankAccountFieild = computed(() => {
			if (!bankNameField.value) {
				return true;
			} else {
				return false;
			}
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - change tab - step - 2
		const submitForm = handleSubmit(async values => {
			// set date format
			const formData = new FormData();
			formData.append('dob', moment(values.dob).format('YYYY/MM/DD'));
			formData.append('full_name', values.full_name);
			formData.append('gender', values.gender);
			formData.append('address', values.address);
			formData.append('countryId', values.countryId);
			formData.append('cityId', values.nationalityId);
			formData.append('mobile', values.mobile);
			formData.append('ssn', values.ssn);
			formData.append('other_earnings', values.other_earnings);
			formData.append('bank_name', values.bank_name);
			formData.append('account_number', values.account_number);
			formData.append('bic_number', values.bic_number);
			formData.append('profile_image', contentFile.value);
			profilePictureField.value = null;
			documentFile.value = null;
			documentFilePreview.value = null;
			await store.dispatch('auth/updateSeekerProfile', formData).then(() => {
				// fetch user details
				fetchUserProfile();
			});

			return true;
		});

		const dateFormated = date => {
			return moment('2021-01-21').format('DD/MM/YYYY');
		};

		//get country wise city
		const getCountrWiseCity = id => {
			if (id) {
				cityOptions.value = null;
				nationalityField.value = null;
				fetchCityCountryWise(id);
			} else {
				cityOptions.value = null;
				nationalityField.value = null;
			}
		};

		const showUserName = val => {
			showUserNameModal.value = true;
			editUserDetails.value = {
				editUserName: val,
			};
		};
		// get city
		const fetchCityCountryWise = id => {
			store.dispatch('country/getCities', id);
		};

		const check = event => {
			updateStatusForSeeker(event.target.checked);
		};

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

		const openUpdateImageSelector = () => {
			document.querySelector('#dropImage').click();
		};
		// view image cropper modal
		const imageCropperModal = () => {
			imageCropperdModal.value = true;
			isImageCropperModalShow.value = true;
		};
		// get User Profile
		const fetchUserProfile = () => {
			// fetch user details
			store.dispatch('auth/verifyToken').then(res => {
				const data = res.data.data;
				profilePic.value = data.file_path ?? null;
				docFilePic.value = data.taxCard_file_path ?? null;
				ratingAvg.value = Math.round(data.rating_avg) ?? 0;
				ratingCount.value = data.rating_count ?? 0;
				userVerify.value = data.verified ?? null;
				seekerRatingArray.value = data?.jobSeeker?.seeker_rating;
				profileFlag.value = data.incomplete_profile_flag;
				if (data.countryReferenceId) {
					fetchCityCountryWise(data.countryReferenceId);
				}
				setValues({
					full_name: titleCase(data.full_name),
					gender: data.gender,
					dob: data.dob,
					address: data.jobSeeker?.address,
					countryId: data.countryReferenceId,
					nationalityId: data.cityReferenceId,
					mobile: data.jobSeeker?.mobile,
					ssn: data.jobSeeker?.ssn,
					bank_name: data.jobSeeker?.bank_name,
					account_number: data.jobSeeker?.account_number,
					bic_number: data.jobSeeker?.bic_number,
					other_earnings: data.jobSeeker?.other_earnings,
					profile_image: data?.file_path,
					doc_image: data?.taxCard_file_path,
				});
			});
		};
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
		// update seeker status
		const updateStatusForSeeker = async val => {
			const payload = {
				job_alert: val,
			};
			store.commit('auth/SET_STATE', {
				action: 'seekForGig',
				data: val,
			});

			store.dispatch('language/updateSeekerStatus', payload); // update local value in localhost
		};
		// view document
		const viewShowTaxCardModal = () => {
			showTaxCardModal.value = true;
			isTaxCardInformationModalShow.value = true;
		};

		const viewChangePasswordModal = () => {
			showChangePasswordModal.value = true;
			isChangePasswordModalShow.value = true;
		};
		// check iban tru or false
		const checkIban = data => {
			const checkIban = IBAN.isValid(data.target.value);
			accountNumberField.value = IBAN.printFormat(data.target.value, ' ');
			if (!checkIban) {
				setFieldError('account_number', 'Account number is not valid.');
			}
			if (checkIban) {
				getBankSwiftDetails(data.target.value);
			}
		};
		// get bank and swift detail
		const getBankSwiftDetails = ibanNumber => {
			store.dispatch('auth/getBankSwiftCode', ibanNumber).then(res => {
				bankNameField.value = res.data.bank ?? null;
				bicField.value = res.data.swift_code ?? null;
			});
		};

		const redirectDocument = () => {
			router.push('/documents');
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(taxCardList, () => {
			yearyIncome.value = taxCardList.value[0]?.yearly_income;
			personalTax.value = taxCardList.value[0]?.min_personal_tax;
			maxTaxPercentage.value = taxCardList.value[0]?.max_personal_tax;
			taxDateupdated.value = dateFormat(taxCardList.value[0]?.created_at);
		});

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
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
			// translate function
			t,
			// refs
			profileFlag,
			ratingAvg,
			ratingCount,
			genderOptions,
			dateFormat,
			yearyIncome,
			personalTax,
			maxTaxPercentage,
			documentFile,
			documentFilePreview,
			contentFile,
			contentFilePreview,
			phoneRegExp,
			stringRegExp,
			editUserDetails,
			imageLink,
			isDocImgModal,
			docFilePic,
			taxDateupdated,
			userVerify,
			seekerRatingArray,
			bankAccountExpland,

			//icon
			closeIcon,
			editIcon,
			startIcon,
			cloudUploadIcon,
			arrowDown,
			arrowUp,

			// form related
			formMeta,
			isSubmitting,

			// fields
			fullNameField,
			genderField,
			dobField,
			addressField,
			countryField,
			nationalityField,
			mobileField,
			otherEarningsField,
			bankNameField,
			accountNumberField,
			bicField,
			profilePictureField,
			ssnField,
			showDocumentImageModal,
			showChangePasswordModal,
			imageCropperdModal,

			// computed
			showTaxCardModal,
			countryOptions,
			cityOptions,
			showUserNameModal,
			selected,
			checkBankAccountFieild,
			taxCardList,
			calculateFileSize,
			profilePic,
			languageList,
			// methods
			submitForm,
			dateFormated,
			viewShowTaxCardModal,
			openUpdateImageSelector,
			rest,
			getRootProps,
			getInputProps,
			removeFile,
			getCountrWiseCity,
			imageCropperModal,
			getBankSwiftDetails,

			fetchUserProfile,
			showUserName,
			check,
			updateStatusForSeeker,
			viewChangePasswordModal,
			checkIban,
			redirectDocument,

			tableIndex,
			titleCase,

			// method
			openTable,
			imageUpdated,
			// imageType,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.account__form {
	form {
		.form-group {
			.text-big {
				font-size: 20px;
				margin-bottom: 20px;

				@media (max-width: 1440px) {
					font-size: 18px;
				}

				@media (max-width: 425px) {
					font-size: 17px;
					margin-bottom: 10px;
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

			label {
				font-weight: 500;
				font-size: 14px;

				span {
					color: $coloRed;
					margin-left: 0.3rem;

					&.black-icon {
						color: #000;
					}
				}
			}

			.btn-lightred {
				position: absolute;
				bottom: 0;
				right: 0;
				padding: 8px 15px;
				font-size: 14px;
			}
		}
	}
}

.count-text-wrap {
	@media (max-width: 1770px) {
		margin-bottom: 0.7rem;
	}

	@media (max-width: 575px) {
		margin-bottom: 0.3rem;
	}

	.profile-rating-text {
		font-size: 14px;
		font-weight: 300;

		@media (max-width: 768px) {
			font-size: 12px;
		}

		@media (max-width: 575px) {
			margin-top: 0.2rem;
		}
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

.manage-textarea {
	border: double 3px #808a8f;
	border-radius: 5px;
	background-image: linear-gradient(white, white), radial-gradient(circle at top left, #ff4b57, #808a8f);
	background-origin: border-box;
	background-clip: content-box, border-box;

	textarea {
		border: none;
	}
}

.net {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translate(-10px, -50%);
}

textarea.form-control {
	min-height: calc(5.5em + 0.75rem + 2px) !important;
}

.multiselect-input {
	border: 1px solid #ced4da !important;
}

.hideappearance input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	appearance: none;
}

.fill-star {
	color: #e4aa18;
	font-size: 20px;

	@media (max-width: 576px) {
		font-size: 15px;
	}
}

.fill-star-dark {
	color: #9e9e9e;
	font-size: 20px;

	@media (max-width: 576px) {
		font-size: 15px;
	}
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

	.title-lg {
		color: #a0a4a9;
	}

	.switch {
		display: inline-block;
		position: relative;

		h6 {
			font-weight: 400;
		}
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
}

.h-23 {
	height: 23px;
}

.w-23 {
	width: 23px;
}

.update-profile-card {
	background-color: #e9e9e9;
	border-radius: 20px;
	margin-bottom: 30px;

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

			@media (max-width: 1650px) {
				overflow: hidden;
			}

			.bg-img {
				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					height: 280px;
					width: 190px;
					background-image: url('~@/assets/images/jobseeker.png');
					background-repeat: no-repeat;
					background-size: cover;
					z-index: -1;
					filter: blur(50px) brightness(140%) grayscale(60%);

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
				font-weight: 500;
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
				font-weight: 500;
				font-size: 17px;
				text-align: end;

				@media (max-width: 425px) {
					font-size: 14px;
				}
			}
		}

		.text-gray {
			color: #919191;
			font-weight: 500;

			@media (max-width: 1440px) {
				font-size: 13px;
			}
		}

		.request-text {
			color: #6e6e6e;
			font-weight: 400;
			font-size: 13px;
			letter-spacing: 0.3px;
		}
	}
}

.bank-accordion {
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

	.info_icon {
		position: absolute;
		top: -15px;
		left: -12px;
	}
}

.z-1 {
	z-index: 1;
}

.fn15 {
	font-size: 15px;
}

.fn16 {
	font-size: 16px;
}

.relative {
	position: relative;
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
	}

	.account-head {
		font-weight: 400 !important;
		font-size: 15px !important;
	}

	.view-edit-danger {
		bottom: 8px;
		right: 25px;
		color: #ff4b57;
	}
}
</style>

<style lang="scss">
.px-remove {
	.multiselect-input {
		padding: 0 !important;
	}
}
.account__form {
	.grey-edit-bg {
		padding: 12px 28px;
		color: #000 !important;
		&:hover {
			border: 1px solid gray;
		}
	}
}
</style>
