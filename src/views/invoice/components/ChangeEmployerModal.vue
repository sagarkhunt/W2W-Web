<template>
	<vue-final-modal
		v-model="modalShow"
		classes="modal modal-container add_employer__modal"
		content-class="modal-content"
	>
		<!-- close btn -->
		<button
			type="button"
			class="close"
			data-dismiss="modal"
			aria-label="Close"
			@click="modalShow = false"
		>
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					{{ t('common.modify') }} {{ t('userType.employer') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="row m-0">
					<div class="col-12">
						<!-- form -->
						<form class="theme-input tab-form">
							<div class="form-row">
								<!-- select employer -->
								<div class="form-group col-lg-6">
									<label for="employer">
										{{ t('common.select') }}
										{{ t('userType.employer') }}
									</label>

									<Multiselect
										id="employer"
										class="form-group"
										@input="employerField.handleChange"
										@blur="employerField.handleBlur"
										:placeholder="
											t('validation.selectField', {
												field: 'userType.employer',
											})
										"
										v-model="employerField.value"
										:options="employerListOption"
										mode="single"
										:canDeselect="true"
									/>

									<p class="text-danger">
										{{ employerField.errorMessage }}
									</p>
								</div>
							</div>

							<!-- submit btn -->
							<button
								type="button"
								class="btn-common btn-red mt-2"
								@click="submitForm"
							>
								{{ t('common.submit') }}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
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
		employerId: {
			type: Object,
			default: null,
		},
	},

	//components
	components: {
		FontAwesomeIcon,
		Multiselect,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);
		const employer = ref(props.employerId);

		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore();

		// form schema validation
		const employerSchema = yup.object({
			employer: yup
				.number()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'userType.employer',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting } = useForm({
			validationSchema: employerSchema,
		});

		// form fields
		const employerField = reactive(
			useField('employer', undefined, { initialValue: null }),
		);

		/**
		 * mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch default employer list
			fetchDefaultEmployers();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// employer list
		const employerListOption = computed(
			() => store.getters['invoice/getEmployerList'],
		);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch default list
		const fetchDefaultEmployers = async () => {
			await store.dispatch('invoice/');
		};

		// submit form - add employer
		const submitForm = handleSubmit(async values => {
			emit('updateEmployer', values.employer);
			modalShow.value = false;
		});

		return {
			// icons
			closeIcon,

			// translate function
			t,

			// refs
			modalShow,
			employer,

			// form related
			formMeta,
			isSubmitting,
			submitForm,

			// fields
			employerField,

			// computed
			employerListOption,
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

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 30px;
		}

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
</style>