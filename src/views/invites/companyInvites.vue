<template>
	<!--Invite Employer List-->
	<div class="invite-employer card-space">
		<!-- header -->
		<div class="payment-pill-header mb-4">
			<div class="pph-left">
				<h5 class="title-lg">
					{{ t('companyInvites.invite_user') }}
				</h5>
			</div>
		</div>

		<!-- form field -->
		<div>
			<form class="tab-form">
				<div class="row">
					<div class="col-xl-6 col-12 px-sm-3 px-2">
						<p class="invite_content">{{ t('companyInvites.earn_activity_points_by_inviting') }} support@way2work.fi</p>
						<p class="my-3 font-bold">{{ t('companyInvites.invitation_via_link') }}</p>
						<p class="invite_content">
							{{ t('companyInvites.is_your_friend_interested') }}
						</p>
						<div class="row align-items-end mt-2 mx-0">
							<div class="form-group mb-0 col-sm-9 col-12 theme-input ps-0 pr-sm-3 pr-0">
								<label>{{ t('fieldList.emailAddress') }}</label>
								<input
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'fieldList.email',
										})
									"
									@input="emailField.handleChange"
									@blur="emailField.handleBlur"
									:value="emailField.value"
								/>
							</div>
							<div class="col-sm-3 col-12 mt-sm-0 mt-2 pr-0 ps-xl-2 ps-0">
								<button type="submit" class="btn-common btn-red py-2 px-2 w-100" @click="submitForm">{{ t('companyInvites.send_invite') }}</button>
							</div>
							<p class="text-danger">
								{{ emailField.errorMessage }}
							</p>
						</div>
						<div class="row align-items-end mt-2 mx-0">
							<div class="form-group mb-0 col-sm-9 col-12 theme-input ps-0 pr-sm-3 pr-0">
								<label>{{ t('fieldList.phoneNumber') }}</label>
								<input type="text" class="form-control" placeholder="Type your friends phone number" disabled />
							</div>
							<div class="col-sm-3 col-12 mt-sm-0 mt-2 pr-0 ps-xl-2 ps-0">
								<button type="button" class="btn-common btn-red py-2 px-2 w-100">{{ t('companyInvites.Send_SMS') }}</button>
							</div>
						</div>
					</div>
					<div class="col-xl-6 col-12 px-sm-3 px-2">
						<redeem-component />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import RedeemComponent from '@/views/invites/components/RedeemComponent.vue';

export default {
	name: 'companyInvites',

	components: {
		RedeemComponent,
	},

	setup() {
		// ref vars
		document.title = 'Invite - Way2Work';
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// form schema validation
		const inviteSchema = yup.object({
			email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.email',
					}),
				)
				.min(2),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
			validationSchema: inviteSchema,
		});

		// form fields
		const emailField = reactive(useField('email', undefined, { initialValue: null }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - change tab - step - 2
		const submitForm = handleSubmit(async values => {
			await store.dispatch('dashboard/inviteSeekerEmployer', values).then(res => {
				// fetch user details
				resetForm();
			});

			return true;
		});

		/**
		 * Watch
		 * *******************************************************************
		 */

		return {
			// trasnslate function
			t,
			// form related
			formMeta,
			isSubmitting,

			// fields
			emailField,
			// computed

			// methods
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
.invite-employer {
	padding: 30px;
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

	.payment-pill-header {
		.title-lg {
			color: #212529 !important;
		}
	}
	.invite_content {
		font-size: 14px !important;
		max-width: 650px;
		color: #000;
	}
	.tab-form {
		.redeem_gray_card {
			background-color: #f7f7f7;
			border-radius: 12px;
			padding: 1.5rem;
			@media (max-width: 1024px) {
				padding: 0;
				background-color: #fff;
				border-radius: 0;
				border-top: 1px solid #ddd;
			}
			.benefit_redeem_img {
				height: 100%;
				width: 100%;
				object-fit: contain;
				@media (max-width: 1024px) {
					max-height: 210px;
				}
				@media (max-width: 768px) {
					max-height: none;
				}
			}
		}
	}
}
</style>
