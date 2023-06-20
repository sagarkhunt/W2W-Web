<template>
	<div class="row">
		<div class="col-xl-6 col-12">
			<div class="dash-profile-data">
				<div class="container-lg">
					<div class="row">
						<div class="col-4">
							<div class="dash-user-profile-img">
								<img :src="user.file_path" class="img-fluid" alt="" />
							</div>
						</div>
						<div class="col-8">
							<div class="dash-user-profile">
								<div class="dash-user-profile-info">
									<div class="profile-info-box">
										<div class="info-box-icon">
											<FontAwesomeIcon :icon="userIcon" />
										</div>
										<div class="info-box-text">
											<p class="text-big">{{ user.full_name }}</p>
											<p class="text-small text-break">
												{{ user.email }}
											</p>
										</div>
									</div>
									<div class="profile-info-box mt-3">
										<div class="info-box-icon clr-gay">
											<FontAwesomeIcon :icon="locationIcon" />
										</div>
										<div class="info-box-text">
											<p class="text-big">
												{{ user.cityReference?.city_name }},
												{{ user.countryReference?.country_name }}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-6">
			<div class="professional__summary mt-xl-0 mt-4">
				<!-- form -->
				<div class="professional__summary__form">
					<form class="theme-input">
						<div class="form-row">
							<!-- professional summary -->
							<div class="form-group col-12">
								<label for="pro_summary">
									{{ t('resume.updateProfessionalSummary') }}
								</label>

								<textarea
									class="form-control"
									id="updateProfessionalSummary"
									:placeholder="
										t('validation.enterField', {
											field: 'fieldList.pro_summary',
										})
									"
									@input="summaryField.handleChange"
									@blur="summaryField.handleBlur"
									:value="summaryField.value"
								></textarea>

								<p class="text-danger">
									{{ summaryField.errorMessage }}
								</p>
							</div>
						</div>

						<!-- update btn -->
						<div class="form-row btn-row">
							<ToolTip :title="t('toolTip.updateSummary')">
								<button type="button" class="btn-common btn-red" @click="submitForm" :disabled="isSubmitting">
									{{ t('common.update') }}
								</button>
							</ToolTip>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default {
	name: 'UserInformation',

	// components
	components: {
		FontAwesomeIcon,
	},

	// composition api
	setup() {
		// icons
		const userIcon = faUser;
		const locationIcon = faMapMarkerAlt;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const isSubmitting = ref(false)
		// form schema validation
		const summarySchema = yup.object({
			professional_summary: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.pro_summary',
					}),
				)
				.min(
					2,
					t('validation.atLeast', {
						field: 'fieldList.pro_summary',
						type: '2 characters',
					}),
				)
				.max(
					255,
					t('validation.atMost', {
						field: 'fieldList.pro_summary',
						type: '255 characters',
					}),
				),
		});

		// global store
		const store = useStore();

		// form validation intialize
		const { meta: formMeta, handleSubmit, setValues } = useForm({
			validationSchema: summarySchema,
		});
		const summaryField = reactive(useField('professional_summary', undefined, { initialValue: null }));
		// global router
		const router = useRouter();

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// resume list
		const user = computed(() => store.getters['auth/getUserData']);

		/**
		 * Mounted Props
		 * *******************************************************************
		 */
		onMounted(() => {
			const user = store.getters['auth/getUserData'];
			setValues({
				professional_summary: user.jobSeeker?.professional_summary,
			});
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// submit form - add work hour
		const submitForm = handleSubmit(async values => {
			isSubmitting.value = true;
			// save the work details
			await store.dispatch('resume/updateProfessionalSummary', values).then(() => {
				isSubmitting.value = false;
			}).catch(err => {
				isSubmitting.value = false;
			});

			return true;
		});

		return {
			// translate function
			t,

			// router
			router,
			summaryField,

			// form related
			formMeta,
			isSubmitting,

			// icons
			userIcon,
			locationIcon,

			// computed
			user,

			// methods
			submitForm,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.dash-profile-data {
	.dash-user-profile-img {
		width: 120px;
		height: 120px;
		overflow: hidden;
		border-radius: 100%;
		margin-right: 40px;

		img {
			width: 120px;
			height: 120px;
			object-fit: cover;
			border-radius: 50%;

			@media (max-width: 425px) {
				width: 99px;
				height: 99px;
			}
		}
	}

	.dash-user-profile-info {
		.profile-info-box {
			display: flex;
			align-items: center;
		}

		.info-box-icon {
			max-width: 40px;
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-radius: 10px;
			overflow: hidden;
			background-color: $coloRed;
			margin-right: 10px;

			svg {
				color: #fff;
			}

			&.clr-gay {
				background-color: $colorExLightGray;

				svg {
					color: $colorGray;
				}
			}
		}

		.info-box-text {
			a {
				&:hover {
					color: $coloRed;
				}
			}
		}
	}

	.dash-user-data {
		background-color: #000;

		.dash-user-data-top {
			display: flex;
			align-items: center;
			margin-bottom: 30px;
		}

		.dash-user-data-bottom {
			display: flex;
			align-items: center;
		}
	}
}

@media (max-width: 1200px) {
	.dash-profile-data {
		.dash-user-data {
			float: none;
			text-align: center;
			margin-top: 30px;

			.dash-user-data-top {
				margin-bottom: 20px;
			}
		}
	}
}

@media (max-width: 992px) {
	.dash-profile-data {
		margin: 10px 0px 40px 0px;
	}
}

@media (max-width: 576px) {
	.dash-profile-data {
		.dash-user-profile {
			.dash-user-profile-img {
				width: 80px;
				height: 80px;
				margin-right: 20px;

				img {
					width: 80px;
					height: 80px;
				}
			}
		}
	}
}

@media (max-width: 468px) {
	.dash-profile-data {
		.dash-user-profile {
			display: block;
			text-align: center;

			.dash-user-profile-img {
				margin: 0 auto;
				margin-bottom: 10px;
			}

			.dash-user-profile-info {
				.profile-info-box {
					justify-content: center;

					@media (max-width: 425px) {
						justify-content: start;
						margin-left: 7px;
					}
				}

				.info-box-icon {
					width: 35px;
					height: 35px;
					line-height: 35px;

					@media (max-width: 425px) {
						min-width: 35px;
					}

					svg {
						font-size: 15px;
					}
				}
			}
		}

		.dash-user-data-top {
			justify-content: center;
		}

		.dash-user-data-bottom {
			justify-content: center;
		}
	}
}

.text-big {
	@media (max-width: 425px) {
		font-size: 13px;
	}
}
</style>
