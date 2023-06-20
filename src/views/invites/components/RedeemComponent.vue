<template>
	<!--Invite Employer List-->
	<form class="tab-form">
		<!-- <div class="row"> -->
		<div>
			<div class="redeem_gray_card mt-xl-0 mt-lg-4 mt-md-3">
				<div class="row justify-content-center">
					<div class="col-12">
						<div class="row align-items-end m-0">
							<div class="form-group mb-0 col-sm-9 col-12 ps-0 pr-sm-3 pr-0">
								<label class="font-bold">{{ t('companyInvites.redeem_your_code') }} </label>
								<input
									type="text"
									class="form-control"
									:placeholder="
										t('validation.enterField', {
											field: 'fieldList.pasteCodeHere',
										})
									"
									@input="redeemCodeField.handleChange"
									@blur="redeemCodeField.handleBlur"
									:value="redeemCodeField.value"
								/>
							</div>
							<div class="col-sm-3 col-12 mt-sm-0 mt-2 px-0">
								<button type="button" class="btn-common btn-red py-2 px-2 w-100" @click="submitForm">{{ t('companyInvites.redeem') }}</button>
							</div>
							<p class="text-danger">
								{{ redeemCodeField.errorMessage }}
							</p>
						</div>
					</div>
					<div class="col-md-9 col-12">
						<div class="benefits_wrapper mb-3">
							<p class="my-3 font-bold">{{ t('companyInvites.benefits_of_inviting') }}</p>
							<p class="invite_content">
								{{ t('companyInvites.when_you_invite_your_friend') }}
							</p>
						</div>
						<label class="font-bold">{{ t('companyInvites.share_your_code') }}</label>
						<input type="text" class="form-control" @input="shareCodeField.handleChange" @blur="shareCodeField.handleBlur" :value="shareCodeField.value" disabled />
						<p class="font-semibold invite-semibold fn14 mt-3">{{ t('companyInvites.you_have_invited') }} {{ invitedFriends }} {{ t('companyInvites.friends') }}.</p>
					</div>
					<div class="col-sm-3 col-4">
						<div class="h-100 mt-3">
							<img src="../../../assets/images/benefit_redeem.png" alt="" class="benefit_redeem_img" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
import { useRouter } from 'vue-router';

export default {
	name: 'LeRedeem',

	components: {},

	setup() {

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// form schema validation
		const inviteSchema = yup.object({
			redeem_code: yup
				.string()
				.nullable()
				.typeError('Redeem code name is required.')
				.required(
					t('validation.requiredField', {
						field: 'companyInvites.redeem',
					}),
				),
			share_code: yup.string().nullable(),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
			validationSchema: inviteSchema,
		});

		// form fields
		const redeemCodeField = reactive(useField('redeem_code', undefined, { initialValue: null }));
		const shareCodeField = reactive(useField('share_code', undefined, { initialValue: null }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			shareCodeField.value = store.state.auth?.shareCode;
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		// For User Type
		const shareCode = computed(() => store.state.auth.shareCode);
		const invitedFriends = computed(() => store.state.auth.invitedFriends);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - change tab - step - 2
		const submitForm = handleSubmit(async values => {
			await store.dispatch('dashboard/useRedeemCode', values).then(res => {
				resetForm();
			});

			return true;
		});

		/**
		 * Watch
		 * *******************************************************************
		 */

		return {
			t,

			// form related
			formMeta,
			isSubmitting,

			// fields
			redeemCodeField,
			shareCodeField,

			shareCode,
			invitedFriends,

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
