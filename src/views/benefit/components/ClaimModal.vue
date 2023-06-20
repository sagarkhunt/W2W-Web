<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_contract" content-class="modal-content px-0 pb-0 pt-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal body -->
			<div class="modal-body">
				<div class="benefit_modal">
					<div class="benefit_logo mb-3">
						<img :src="itemData.file_path" alt="" class="img-fluid" />
					</div>
					<div>
						<p class="mb-2 text_hidden">{{ itemData.title }}</p>
						<p class="fn15 text_clamp">
							{{ itemData.description }}
						</p>
					</div>
					<div>
						<button type="button" class="btn-common btn-red font-semibold text-uppercase mt-3 px-4 py-2 text-upppercase" @click="userClaim()">{{t('benefitModule.claimOffer')}}</button>
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

export default {
	name: 'ClaimModal',

	//components
	components: {
		FontAwesomeIcon,
	},

	props: {
		// modal status
		isModalShow: Object,
		itemData: Object,
	},

	setup(props, { emit }) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// global store
		const store = useStore(); // use state

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		/**
		 * Methods
		 * *******************************************************************
		 */
		const userClaim = async () => {
			await store
				.dispatch('jobseekerTeam/jobseekerClaim', {
					benefitId: props.itemData?.id,
				})
				.then(() => {
					window.open(props.itemData.claim_url);
					modalShow.value = false;
				});
		};

		return {
			// translate function
			t,
			// refs
			modalShow,

			// icons
			closeIcon,
			// method
			userClaim,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.upload_contract {
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

				.time__selector {
					padding: 9px 15px;
				}

				.document_file_error {
					position: absolute;
					bottom: 0;
					left: 20px;
					margin-top: 20px;
				}
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
.table thead th {
	border-bottom: transparent;
}

.table td {
	border-right: 2px solid #dee2e6;

	&:last-child {
		border-right: transparent;
	}
}

.benefit_modal {
	.benefit_logo {
		height: 100%;
		width: 105px;
		height: 105px;
		@media (max-width: 575px) {
			min-height: 75px;
			max-width: 190px;
		}
		img {
			object-fit: cover;
			aspect-ratio: 1 / 1;
			width: 100%;
			border-radius: 5px;
		}
	}
	.text_hidden {
		font-weight: 500;
		font-size: 18px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 520px;
		color: #000;
	}
	.text_clamp {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
}
</style>

<style lang="scss" scoped>
:deep .modal-content {
	width: 100% !important;
	max-width: 600px !important;
	min-width: auto !important;
}
</style>
