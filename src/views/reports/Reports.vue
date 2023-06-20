<template>
	<div class="invoice__list card-space">
		<!-- Reports -->
		<div class="payment-pill-header mb-lg-4 mb-3">
			<div class="pph-left">
				<h5 class="title-lg">{{ t('reportDetail.reportsDetails') }}</h5>
			</div>
		</div>
		<div>
			<div class="card-space accordion_wrapper relative">
				<div class="row m-0">
					<div class="form-group col-12 p-0 mb-0" @click="invoicingExpland = !invoicingExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head mb-0">
								{{ t('reportDetail.invoicing') }}
							</h5>
							<div>
								<a v-if="!invoicingExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>

					<div class="accordion-collapse collapse show p-0" v-if="invoicingExpland">
						<div class="mt-3 mx-0">
							<div class="row align-items-lg-center align-items-start">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.invoicingDetails') }}</p>
									<p class="report_description">{{ t('reportDetail.you_will_receive_list') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('InvoiceDetails')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('InvoiceDetails')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
							<div class="row align-items-lg-center align-items-start mt-sm-3 mt-2">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.invoiceWorkDetails') }}</p>
									<p class="report_description">{{ t('reportDetail.youWillReceiveWorkingHours') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('InvoiceWorkDetails')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('InvoiceWorkDetails')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card-space accordion_wrapper relative">
				<div class="row m-0">
					<div class="form-group col-12 p-0 mb-0" @click="teamInvoicingExpland = !teamInvoicingExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head mb-0">
								{{ t('reportDetail.teamInvoicing') }}
							</h5>
							<div>
								<a v-if="!teamInvoicingExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>

					<div class="accordion-collapse collapse show p-0" v-if="teamInvoicingExpland">
						<div class="mt-3 mx-0">
							<div class="row align-items-lg-center align-items-start">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.invoicingDetails') }}</p>
									<p class="report_description">{{ t('reportDetail.you_will_receive_list') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('TeamInvoiceDetails')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('TeamInvoiceDetails')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
							<div class="row align-items-lg-center align-items-start mt-sm-3 mt-2">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.invoiceWorkDetails') }}</p>
									<p class="report_description">{{ t('reportDetail.youWillReceiveWorkingHours') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('TeamInvoiceWorkDetails')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('TeamInvoiceWorkDetails')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card-space accordion_wrapper relative">
				<div class="row m-0">
					<div class="form-group col-12 p-0 mb-0" @click="myTeamExpland = !myTeamExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head mb-0">
								{{ t('reportDetail.myDocuments') }}
							</h5>
							<div>
								<a v-if="!myTeamExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>

					<div class="accordion-collapse collapse show p-0" v-if="myTeamExpland">
						<div class="mt-3 mx-0">
							<div class="row align-items-lg-center align-items-start">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.documents') }}</p>
									<p class="report_description">{{ t('reportDetail.receiveListOfAllDocuments') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('Documents')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('Documents')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
							<div class="row align-items-lg-center align-items-start mt-sm-3 mt-2">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.defaultDocs') }}</p>
									<p class="report_description">{{ t('reportDetail.receiveListOfAllDocumentsSubmitted') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('DefaultDocs')">
											{{ t('invoiceList.download1') }}
										</button>

										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('DefaultDocs')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
							<div class="row align-items-lg-center align-items-start mt-sm-3 mt-2">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.Payslips') }}</p>
									<p class="report_description">{{ t('reportDetail.youWillReceiveListOfAllPaymentDetailsFromPreviousInvoices') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('Payslips')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('Payslips')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card-space accordion_wrapper relative">
				<div class="row m-0">
					<div class="form-group col-12 p-0 mb-0" @click="myDocumentsExpland = !myDocumentsExpland">
						<div class="d-flex align-items-center justify-content-between">
							<h5 class="accordion-head mb-0">
								{{ t('reportDetail.MyTeam') }}
							</h5>
							<div>
								<a v-if="!myDocumentsExpland">
									<FontAwesomeIcon :icon="arrowDown" class="arrowIcon" />
								</a>
								<a v-else>
									<FontAwesomeIcon :icon="arrowUp" class="arrowIcon" />
								</a>
							</div>
						</div>
					</div>

					<div class="accordion-collapse collapse show p-0" v-if="myDocumentsExpland">
						<div class="mt-3 mx-0">
							<div class="row align-items-lg-center align-items-start">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.Teams') }}</p>
									<p class="report_description">{{ t('reportDetail.youWillReceiveListOfTeamsThatYouHaveEitherCreated') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('Teams')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('Teams')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
							<div class="row align-items-lg-center align-items-start mt-sm-3 mt-2">
								<div class="col-9">
									<p class="font-bold mb-1">{{ t('reportDetail.TeamMembers') }}</p>
									<p class="report_description">{{ t('reportDetail.youWillReceiveListOfTeamMembers') }}</p>
								</div>
								<div class="col-lg-2 col-3">
									<div>
										<button type="submit" class="btn-common btn-red download_text py-2 px-2 w-100" @click="downloadReports('TeamMembers')">
											{{ t('invoiceList.download1') }}
										</button>
										<button type="submit" class="btn-common btn-red download_icon py-2 px-3 ml-auto" @click="downloadReports('TeamMembers')">
											<FontAwesomeIcon :icon="downloadIcon" class="arrowIcon" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Reports End -->
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
	name: 'Reports',

	components: {
		FontAwesomeIcon,
	},

	setup() {
		// refs
		const tableIndex = ref(0);
		const invoicingExpland = ref(false);
		const teamInvoicingExpland = ref(false);
		const myTeamExpland = ref(false);
		const myDocumentsExpland = ref(false);

		const reportName = ref(null);

		// icons
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const downloadIcon = faDownload;

		// global store
		const store = useStore(); // use state

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.allReports')} - Way2Work`;

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
		// download report
		const downloadReports = async report_type => {
			reportName.value = report_type;
			await store.dispatch('report/getReportsDetails', report_type).then(res => {
				downLoadFile(res.data);
			});
		};
		const downLoadFile = async data => {
			try {
				const url = await URL.createObjectURL(data);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${reportName.value}.pdf`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			} catch (err) {
				console.log({ err });
			}
		};

		/**
		 * Watch
		 * *******************************************************************
		 */

		return {
			// refs
			reportName,
			arrowDown,
			arrowUp,
			downloadIcon,
			t,
			tableIndex,
			invoicingExpland,
			teamInvoicingExpland,
			myTeamExpland,
			myDocumentsExpland,

			// methods
			downloadReports,
			downLoadFile,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice__list {
	.invoice__row {
		.tbl-action-disabled {
			width: 40px;
			height: 40px;
			background-color: $colorExLightGray;
			border-radius: 100%;
			text-align: center;
			line-height: 40px;
			display: inline-block;
			margin-left: 10px;

			svg {
				color: $colorGray;
			}
		}

		.tbl-status {
			display: flex;
			align-items: center;
			width: 100%;

			span {
				margin-right: 10px;

				&.sts-wait {
					color: $colorWait;
					margin-left: 5px;
				}

				&.sts-approve {
					color: $colorApprove;
					margin-left: 5px;
				}
			}

			img {
				width: 18px;
				height: 18px;
				object-fit: cover;
			}
		}
	}
}

.accordion_wrapper {
	padding: 25px 30px;
	margin-bottom: 30px;

	@media (max-width: 768px) {
		padding: 20px 25px;
		border-radius: 15px;
	}

	@media (max-width: 575px) {
		padding: 15px 20px;
		border-radius: 10px;
		margin-bottom: 20px;
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

	.download_text {
		@media (max-width: 575px) {
			display: none;
		}
	}
	.download_icon {
		display: none;
		@media (max-width: 575px) {
			display: block;
		}
	}

	.report_description {
		font-size: 15px;
		@media (max-width: 768px) {
			font-size: 14px;
		}
		@media (max-width: 575px) {
			font-size: 13px;
		}
	}
}
</style>
<style lang="scss">
.invoice__list {
	.expand-table {
		th {
			width: 17% !important;
			@media (max-width: 768px) {
				width: 24% !important;
			}
			@media (max-width: 575px) {
				width: 30% !important;
			}
		}

		td {
			width: 80% !important;
			@media (max-width: 768px) {
				width: 70% !important;
			}
			@media (max-width: 575px) {
				width: 65% !important;
			}
		}
	}
}
</style>
<style>
.invoice__list .payment-pill-header .pph-right {
	margin-top: 0px !important;
}
.invoice__list .payment-pill-header {
	display: flex !important;
}
@media (max-width: 768px) {
	.invoice__list .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.invoice__list .data__table .table__header {
		display: block !important;
	}
}
</style>
