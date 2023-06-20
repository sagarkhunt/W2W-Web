<template>
	<!--Company Profile List-->
	<div class="company-user-wrap p-2">
		<!-- header -->
		<div class="payment-pill-header mb-4">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('managerAccount.changePassword') }}
				</h5>
			</div>
		</div>

		<!-- form field -->
		<div>
			<form class="tab-form">
				<div class="mt-3">
					<div class="form_part form-row">
						<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
							<label for="profile_old_password"> {{ t('fieldList.oldPassword') }}: </label>
							<input
								id="profile_old_password"
								type="password"
								class="form-control"
								:placeholder="
									t('validation.enterField', {
										field: 'fieldList.oldPassword',
									})
								"
								@input="oldPasswordField.handleChange"
								@blur="oldPasswordField.handleBlur"
								:value="oldPasswordField.value"
							/>
							<p class="text-danger">
								{{ oldPasswordField.errorMessage }}
							</p>
						</div>

						<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
							<label for="profile_new_password"> {{ t('fieldList.newPassword') }}: </label>
							<input
								id="profile_new_password"
								type="password"
								class="form-control"
								:placeholder="
									t('validation.enterField', {
										field: 'fieldList.newPassword',
									})
								"
								@input="passwordField.handleChange"
								@blur="passwordField.handleBlur"
								:value="passwordField.value"
							/>
							<p class="text-danger">
								{{ passwordField.errorMessage }}
							</p>
						</div>

						<div class="form-group col-xl-4 col-lg-6 col-12 theme-input">
							<label for="profile_confirm_password"> {{ t('fieldList.confirmPassword') }}: </label>
							<input
								id="profile_confirm_password"
								type="password"
								class="form-control"
								:placeholder="
									t('validation.enterField', {
										field: 'fieldList.confirmPassword',
									})
								"
								@input="confirmPasswordField.handleChange"
								@blur="confirmPasswordField.handleBlur"
								:value="confirmPasswordField.value"
							/>
							<p class="text-danger">
								{{ confirmPasswordField.errorMessage }}
							</p>
						</div>
					</div>
				</div>

				<div class="form_part form-row py-3">
					<!-- update btn -->
					<div class="update-btn">
						<button type="submit" class="btn-common btn-red" @click="submitForm" :disabled="isSubmitting">
							{{ t('managerAccount.changePassword') }}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
export default {
	name: 'ChangePasswordCompany',
	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// change password form schema validation
		const changePasswordSchema = yup.object({
			old_password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.oldPassword',
					}),
				),
			password: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.newPassword',
					}),
				)
				.min(8, t('validation.minPasswordLen', { minLen: 8 })),
			confirmPassword: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.cpassword',
					}),
				)
				.oneOf([yup.ref('password'), null], t('validation.cPasswordMustMatch')),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
			validationSchema: changePasswordSchema,
		});

		// form fields
		const oldPasswordField = reactive(useField('old_password', undefined, { initialValue: null }));
		const passwordField = reactive(useField('password', undefined, { initialValue: null }));
		const confirmPasswordField = reactive(useField('confirmPassword', undefined, { initialValue: null }));
		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - change tab - step - 2
		const submitForm = handleSubmit(async values => {
			// save the work details
			await store.dispatch('auth/changePassword', values).then(() => resetForm());

			return true;
		});

		return {
			// translate function
			t,

			// form related
			formMeta,
			submitForm,
			isSubmitting,

			// fields
			oldPasswordField,
			passwordField,
			confirmPasswordField,
		};
	},
};
</script>

<style lang="scss" scoped></style>
