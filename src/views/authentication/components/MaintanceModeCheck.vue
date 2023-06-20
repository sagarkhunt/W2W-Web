<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container maintanence" content-class="modal-content px-0 pb-0" :click-to-close="false" overlay-class="maintanence-mode-overlay">
		<!-- close btn -->

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<h4>{{ t('common.maintenanceMsg1') }}</h4>
					<p>{{ t('common.maintenanceMsg2') }}.</p>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default {
	name: 'AddJobseekerTeamModal',

	//components
	components: {
	},

	setup() {
		// ref vars
		const modalShow = ref(false);

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

		const maintenanceModeCheck = computed(() => {
			if (store.state.auth.maintanceModeChecked) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				modalShow.value = true;
			} else {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				modalShow.value = false;
			}
			return true;
		});
		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		/**
		 * Methods
		 * *******************************************************************
		 */

		watch(maintenanceModeCheck, () => {
			console.log(maintenanceModeCheck.value, '1=================');
		});

		return {
			// translate function
			t,
			// refs
			modalShow,

			// icons
			closeIcon,
			maintenanceModeCheck,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.maintanence-mode-overlay {
	background: rgba(0, 0, 0, 0.1) !important;
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.maintanence {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: auto;
		height: 100%;

		.modal-header {
			padding: 30px;
		}

		.modal-body {
			padding: 30px;
			overflow: scroll;

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
</style>

<style lang="scss" scoped>
:deep .modal-content {
	padding: 0;
	width: 100% !important;
	max-width: 600px !important;
	min-width: auto !important;
	background-color: rgba(0, 0, 0, 0.88);
	color: #fff;
	border: 0;
	height: 100%;
	max-height: 250px;
	border-radius: 45px;
	box-shadow: 0px 0px 34px 10px #0009;
}
</style>
