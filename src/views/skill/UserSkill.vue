<template>
	<!-- <SeekForGigDetails /> -->
	<!-- manage skill -->
	<div class="manage__skil relative">
		<span v-if="jobSkillsField.value.length == 0">
			<img src="~@/assets/images/required-hint.png" alt="img" class="img-fluid info_icon" />
		</span>

		<!-- header -->
		<div class="d-flex align-items-center justify-content-between" @click="profileSkillsExpland = !profileSkillsExpland">
			<div class="payment-pill-header">
				<div class="pph-left">
					<h5 class="accordion-head">
						{{ t('skill.title') }}
					</h5>
				</div>
			</div>
			<div>
				<a v-if="!profileSkillsExpland">
					<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
				</a>
				<a v-else>
					<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
				</a>
			</div>
		</div>

		<div class="accordion-collapse collapse show" v-if="profileSkillsExpland">
			<!-- manage skill form -->
			<div class="manage_skill__form pt-3">
				<form class="theme-input tab-form">
					<div class="form-row mx-0">
						<p class="msp-note form-group">
							{{ t('managerAccount.userSkillDesc') }}
						</p>
					</div>

					<div class="form-row mx-0">
						<p class="msp-note form-group">
							<span class="d-block font-weight-bold">{{ t('managerAccount.example') }}:</span>
							<span>
								{{ t('managerAccount.userSkillExTit') }} <br />
								{{ t('managerAccount.userSkillEx') }}
							</span>
						</p>
					</div>

					<hr />

					<div class="form-row mx-0">
						<div class="form-group col-lg-6 col-12 mb-0 ps-0">
							<label for="skill"> {{ t('common.add') }} {{ t('placeholder.skill') }} </label>
							<Multiselect
								id="skill"
								class="form-group px-remove multiselect-height input-bg"
								trackBy="skill"
								@input="jobSkillsField.handleChange"
								@blur="jobSkillsField.handleBlur"
								:placeholder="
									t('validation.selectField', {
										field: 'placeholder.skill',
									})
								"
								:searchable="true"
								valueProp="referenceId"
								v-model="jobSkillsField.value"
								:options="userSkillOptions"
								label="skill"
								mode="tags"
								:hideSelected="false"
							/>
							<p class="text-danger">
								{{ jobSkillsField.errorMessage }}
							</p>
						</div>
						<div class="form-group col-xl-2 col-lg-3 col-md-4 mb-0 text-center text-md-left">
							<button type="button" class="btn-common btn-red save_btn ms-lg-4" @click="submitForm" :disabled="isSubmitting">
								{{ t('common.save') }}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'ManageSkill',

	// components
	components: {
		Multiselect,
		FontAwesomeIcon,
	},

	setup() {
		// ref vars
		const profileSkillsExpland = ref(false);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const search = ref(null);
		// icons
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore(); // use state

		// add skill validation
		const skillSchema = yup.object({
			
			referenceId: yup
				.array()
				.nullable()
				.optional()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.skill',
					}),
				),
		});

		// form validation intialize
		const { meta: formMeta, handleSubmit, isSubmitting, resetForm, setValues } = useForm({
			validationSchema: skillSchema,
		});

		// form fields
		const jobSkillsField = reactive(useField('referenceId', undefined, { initialValue: [] }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch current user's work details
			fetchDefaultSkills();
			fetchUserSkills();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get default skills
		const skillOptions = computed(() => {
			const user_skills = userSkills.value.map(x => x.referenceId);
			return store.getters['skill/getSkillOptions'].filter(x => !user_skills.includes(x.referenceId));
		});
		const userSkillOptions = computed(() => store.getters['skill/getUserSkillOptions']);

		// get current users skills
		const userSkills = computed(() => store.state.skill.userSkills);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch default skills
		const fetchDefaultSkills = async () => {
			const payload = {
				search: search.value,
			};
			await store.dispatch('skill/getDefaultSkills', payload);
		};

		// fetch users skills
		const fetchUserSkills = async () => {
			await store.dispatch('skill/getCurrentUserSkills').then(res => {
				setValues({
					referenceId: res.data.reduce((acc, item) => {
						acc.push(item.reference.referenceId);
						return acc;
					}, []),
				});
			});
		};

		// submit form - add skill
		const submitForm = handleSubmit(async values => {
			await store.dispatch('skill/addUserSkill', values).then(() => {
				resetForm(); // reset form
				fetchUserSkills();
			});
		});

		// delete skill
		const deleteSkill = async id => {
			await store.dispatch('skill/deleteUserSkill', id).then(() => {
				fetchUserSkills();
			});
		};

		return {
			// refs
			profileSkillsExpland,

			// translate function
			t,

			// icons
			deleteIcon,
			arrowDown,
			arrowUp,

			// form related
			formMeta,
			isSubmitting,

			// fields
			jobSkillsField,

			// computed
			skillOptions,
			userSkills,
			userSkillOptions,

			// methods
			submitForm,
			deleteSkill,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.manage__skil {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	padding: 25px 30px !important;
	margin-bottom: 30px !important;
	@media (max-width: 768px) {
		padding: 20px 25px !important;
		border-radius: 15px;
	}
	@media (max-width: 575px) {
		padding: 15px 20px !important;
		border-radius: 10px;
	}

	.info_icon {
		position: absolute;
		top: -15px;
		left: -12px;
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
	.manage_skill__form {
		.save_btn {
			margin-top: 31px;
			@media (max-width: 991px) {
				margin-top: 20px;
			}
		}

		.user_skills {
			width: 100%;
			background-color: #fbfbfb;
			border: 1px solid #eaeaea;
			border-radius: 25px;
			min-height: 40px;
			height: auto;
			display: flex;
			flex-wrap: wrap;

			.user_skill {
				background: $coloRed;
				color: #fff;
				padding: 5px 10px;
				padding-right: 20px;
				border-radius: 25px;
				display: flex;
				align-items: center;
				width: max-content;
				float: left;
				margin: 5px 5px;

				span {
					margin-right: 10px;
				}

				button {
					font-size: 10px;
					color: #fff;
				}
			}
		}

		.skill_error_msg {
			position: absolute;
			left: 20px;
			margin-top: 10px;
			width: 100%;
		}
	}
}
</style>
<style lang="scss">
.input-bg {
	&.is-tags {
		.multiselect-search {
			input {
				background-color: #fbfbfb;
			}
		}
	}
}
.multiselect-tag {
	background-color: #ff4b57 !important;
	border-radius: 25px;
	padding: 10px;
	@media (max-width: 575px) {
		padding: 6px 12px;
	}
}
</style>
<style>
.tab-form .is-open .multiselect-input,
.tab-form .multiselect-input {
	max-height: 1070px !important;
}

.multiselect-input {
	padding: 0 !important;
	border: 1px solid #e2e2e2 !important;
}

.multiselect-tag i:before {
	color: #fff;
}
</style>