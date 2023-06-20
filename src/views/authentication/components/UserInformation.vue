<template>
	<div class="userInformation">
		<!-- step - 3 -- title -->
		<div class="tab-header">
			<h5 class="text-big">{{ t('registerForm.userInformation') }}</h5>
		</div>

		<!-- step - 3 -- form content -->
		<div class="tab-form theme-input my-4">
			<div>
				<!-- first name -->
				<div>
					<label for="firstName">
						{{ t('fieldList.fullName') }}<span>*</span>
					</label>
					<input
						id="firstName"
						type="text"
						class="form-control"
						:placeholder="
							t('validation.enterField', {
								field: 'fieldList.fullName',
							})
						"
						@input="firstNameField.handleChange"
						@blur="firstNameField.handleBlur"
						:value="firstNameField.value"
					/>

					<p class="text-danger">
						{{ firstNameField.errorMessage }}
					</p>
				</div>
			</div>
		</div>

		<!-- prev tab and next tab btn -->
		<div class="form-btns d-flex align-items-center">
			<div>
				<button
					type="button"
					class="btn-common btn-lightGray mr-3"
					@click="changeTab('pills-mobileVerification-tab')"
					:disabled="isSubmitting"
				>
					{{ t('common.back') }}
				</button>
			</div>
			<div>
				<button
					type="button"
					class="btn-common btn-red"
					@click="submitForm"
					:disabled="isSubmitting"
				>
					{{ t('common.next') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue';
import { Tab } from 'bootstrap';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
	name: 'userInformation',

	// eslint-disable-next-line no-unused-vars
	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// form schema validation
		const AccountSchema = yup.object({
			full_name: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.fullName',
					}),
				),
			
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit , isSubmitting} = useForm({
			validationSchema: AccountSchema,
		});

		// form fields
		const firstNameField = reactive(
			useField('full_name', undefined, { initialValue: null }),
		);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// change form step
		const changeTab = (tab) => {
			const triggerTab = document.querySelector(`#pills-tab #${tab}`);
			new Tab(triggerTab).show();
		};

		// submit form - change tab - step - 2
		const submitForm = handleSubmit((values) => {			
			// store data in vuex
			store.commit('auth/SET_STATE', {
				action: 'userInformation',
				data: values,
			});

			// go to next tab
			changeTab('pills-passwordVerification-tab');
		});

		return {
			t,
			store,
			firstNameField,
			formMeta,
			changeTab,
			submitForm,
			isSubmitting
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.userInformation {
	.tab-form {
		margin: 30px 0px 10px 0px;
	}

	@media (max-width: 576px) {
		.tab-header {
			text-align: center;
		}
		.tab-form {
			margin: 20px 0px;
		}
	}
}
</style>
