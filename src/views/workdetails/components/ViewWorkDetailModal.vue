<template>
	<vue-final-modal
		v-model="modalShow"
		classes="modal modal-container view_work_details__modal"
		content-class="modal-content px-0 pb-0"
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
				<h5 class="title-lg">{{ t('workDetails.workDetails') }}</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<!-- row -->
				<div class="row">
					<!-- colomn - 1 -->
					<div class="col-md-6 mb-4">
						<!-- contract type -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.contractType') }}:
							</h5>
							<p>{{ workDetail.contract_type }}</p>
						</div>

						<!-- word detail date -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.date') }}:
							</h5>
							<p>{{ dateFormat(workDetail.date) }}</p>
						</div>

						<!-- trip end -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.tripEnd') }}:
							</h5>
							<p>{{ workDetail.trip_end }}</p>
						</div>

						<!-- distance -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.distance') }}
								{{ t('common.km') }}:
							</h5>
							<p>{{ workDetail.distance }}</p>
						</div>

						<!-- lunch compensation -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.lunchCompensation') }}:
							</h5>
							<p>{{ workDetail.lunch_compensation }}</p>
						</div>

						<!-- other compensation -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.otherCompensation') }}:
							</h5>
							<p>{{ workDetail.other_compensation }}</p>
						</div>

						<!-- work compensation -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.workDescription') }}:
							</h5>
							<p>{{ workDetail.work_description }}</p>
						</div>
					</div>

					<!-- column - 2 -->
					<div class="col-md-6 mb-4">
						<!-- trip start -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.tripStart') }}:
							</h5>
							<p>{{ workDetail.trip_start }}</p>
						</div>

						<!-- trip address -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.tripAddress') }}:
							</h5>
							<p>{{ workDetail.trip_address }}</p>
						</div>

						<!-- total work -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{
									workDetail.contract_type === 'hours'
										? t('fieldList.numberOfHours')
										: t('fieldList.numberOfPieces')
								}}:
							</h5>
							<p>{{ workDetail.total_work }}</p>
						</div>

						<!-- trip time -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.tripTime') }}:
							</h5>
							<p>{{ workDetail.trip_time }}</p>
						</div>

						<!-- day compensation -->
						<div class="d-flex align-items-center mb-1">
							<h5 class="text-big mr-2">
								{{ t('fieldList.dayCompensation') }}:
							</h5>
							<p>{{ workDetail.day_compensation }}</p>
						</div>
					</div>
				</div>

				<!-- modal close btn -->
				<button
					type="button"
					class="btn-common btn-red mt-2"
					@click="modalShow = false"
				>
					{{ t('common.close') }}
				</button>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import { dateFormat } from '@/utils/mixins';

export default {
	name: 'ViewWorkDetail',

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

	setup(props) {
		// ref vars
		const modalShow = ref(props.isModalShow);

		// icons
		const closeIcon = faTimes;

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		/**
		 * Mounted
		 * *******************************************************************
		 */
		onMounted(async () => {
			if (props.workDetailId) {
				// fetch work detail
				fetchWorkDetailById();
			}
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get work detail
		const workDetail = computed(() => store.state.workDetail.workDetail);

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch work detail by id
		const fetchWorkDetailById = async () => {
			// save the work details
			await store.dispatch(
				'workDetail/getWorkDetailById',
				props.workDetailId,
			);
		};

		return { closeIcon, modalShow, workDetail, dateFormat, t };
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
		overflow: hidden;

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