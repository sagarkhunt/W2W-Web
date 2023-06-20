<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container view_work_details__modal" content-class="modal-content overflow-visible px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					{{ t('workDetails.createDuplicateWorkDetail') }}
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body overflow-visible">
				<div class="modal-form">
					<form class="theme-input">
						<!-- date -->
						<div class="form-row">
							<div class="form-group col-12">
								<label for="inputEmail4">
									{{ t('fieldList.date') }}
								</label>

								<v-date-picker id="date" @input="dateField.handleChange" @blur="dateField.handleBlur" v-model="dateField.value" :masks="{ input: 'YYYY/MM/DD' }">
									<template v-slot="{ inputValue, inputEvents }">
										<input
											class="form-control"
											:value="inputValue"
											v-on="inputEvents"
											:placeholder="
												t('validation.selectField', {
													field: 'fieldList.date',
												})
											"
										/>
									</template>
								</v-date-picker>

								<p class="text-danger">
									{{ dateField.errorMessage }}
								</p>
							</div>
						</div>

						<!-- submit btn -->
						<div class="w-100 text-right">
							<button type="button" class="btn-common btn-red mt-2" @click="submitForm">
								{{ t('common.submit') }}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';

export default {
	name: 'DuplicateWorkDetail',

	props: {
		// modal status
		isModalShow: Object,

		// work detail id
		workDetailId: {
			default: null,
			type: Number,
		},
	},

	//components
	components: {
		FontAwesomeIcon,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// form schema validation
		const DuplicateWorkDetailSchema = yup.object({
			date: yup
				.date()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.date',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting } = useForm({
			validationSchema: DuplicateWorkDetailSchema,
		});

		// form fields
		const dateField = reactive(useField('date', undefined, { initialValue: null }));

		/**
		 * Methods
		 * *******************************************************************
		 */
		// form submit
		const submitForm = handleSubmit(async values => {
			values.date = moment(values.date).format('YYYY/MM/DD');
			values.work_hourId = props.workDetailId;

			let newWorkDetail;

			// save the work details
			await store.dispatch('workDetail/addDuplicateWorkDetails', values).then(res => {
				newWorkDetail = res.data.data;
				modalShow.value = false;
			});

			// pass added work details to parent component
			emit('newWorkDetail', newWorkDetail);

			return true;
		});

		return {
			// translate function
			t,

			// icons
			closeIcon,

			// refs
			modalShow,

			// form related
			formMeta,
			isSubmitting,

			// fields
			dateField,

			// methods
			submitForm,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.view_work_details__modal {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: unset !important;

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
