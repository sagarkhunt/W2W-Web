<template>
	<div class="my__document">
		<div class="payment-pill-header">
			<div class="pph-left">
				<h5 class="title-lg">{{ t('sidebar.gigWorkHour') }}</h5>
			</div>
			<div class="form-group col-xl-6">
				<label for="category"> {{ t('fieldList.selectJobseeker') }}<span>*</span> </label>
				<Multiselect
					id="category"
					class="form-group"
					@input="seekerId.handleChange"
					@blur="seekerId.handleBlur"
					:placeholder="
						t('validation.selectField', {
							field: 'placeholder.lightEntrepreneur',
						})
					"
					:searchable="true"
					v-model="seekerId.value"
					:options="jobSeekerOptions"
					mode="single"
					label="full_name"
					:canDeselect="true"
					@change="onChange($event)"
				/>
			</div>
		</div>

		<new-data-table
			:data="gigWorkHourList"
			sst
			pagination
			search
			@search="updateSearchQuery"
			:total="totalInvoiceCount"
			:max-items="maxItemsPerPage"
			@change-page="handleChangePage"
			class="large-table searchbar_table"
		>
			<template #header>
				<div class="select__limit">
					<div>
						<label class="tbl_label">{{t('common.Rows')}}</label>
						<div class="dropdown ml-0">
							<a
								class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{t('common.Showing')}}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li @click="changePerPageMaxItems(5)">
									<span class="dropdown-item tbl-drop-link">
										5
									</span>
								</li>
								<li @click="changePerPageMaxItems(10)">
									<span class="dropdown-item tbl-drop-link">
										10
									</span>
								</li>
								<li @click="changePerPageMaxItems(15)">
									<span class="dropdown-item tbl-drop-link">
										15
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</template>

			<template #thead>
				<new-tb-th>{{ t('common.createdOn') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.contractType') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.tripStart') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.tripEnd') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.tripAddress') }}</new-tb-th>
				<new-tb-th>{{ t('common.km') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.tripTime') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.workedHours') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.otherCompensation') }}</new-tb-th>
				<new-tb-th>{{ t('fieldList.extraInformation') }}</new-tb-th>
				<new-tb-th>{{ t('common.actions') }}</new-tb-th>
			</template>

			<template #data="scopedData" ref="tableBody">
				<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
					<new-tb-td>{{ dateFormat(tr.created_at) }}</new-tb-td>
					<new-tb-td>{{ tr.contract_type || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.trip_start || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.trip_end || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.trip_address }}</new-tb-td>
					<new-tb-td>{{ tr.distance || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.trip_time || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.total_work || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.other_compensation || '-' }}</new-tb-td>
					<new-tb-td>{{ tr.work_description || '-' }}</new-tb-td>
					<new-tb-td>
						<!-- actions -->
						<div class="buttons d-flex align-items-center">
							<button class="tbl-action grey-edit" @click="viewGigWorkDetail(tr)">
								<FontAwesomeIcon :icon="viewIcon" />
							</button>
						</div>
					</new-tb-td>
				</new-tb-tr>
			</template>
		</new-data-table>

		<div>
			<new-data-table
				:data="gigWorkHourList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInvoiceCount"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="responsive-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div class="dropdown ml-0">
							<a
								class="
								dropdown-toggle
								btn-common btn-gray-border
								tbl-drop
							"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="d-inline-block head">{{t('common.Showing')}}</p>
								<span class="ml-2">{{ maxItemsPerPage }}</span>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li @click="changePerPageMaxItems(5)">
									<span class="dropdown-item tbl-drop-link">
										5
									</span>
								</li>
								<li @click="changePerPageMaxItems(10)">
									<span class="dropdown-item tbl-drop-link">
										10
									</span>
								</li>
								<li @click="changePerPageMaxItems(15)">
									<span class="dropdown-item tbl-drop-link">
										15
									</span>
								</li>
							</ul>
						</div>
					</div>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div>
											{{ dateFormat(tr.seeker?.user?.dob) }}
										</div>
									</div>
								</div>

								<div>
									<a>
										<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== i" class="arrowIcon" />
									</a>

									<a>
										<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === i" class="arrowIcon" />
									</a>
								</div>
							</div>

							<div class="border-padding">
								<div v-if="i == tableIndex" class="table-border">

									<new-tb-tr>
										<new-tb-th>
											{{ t('fieldList.gender') }}
										</new-tb-th>
										<new-tb-td>
											{{ tr.seeker?.user?.gender }}
										</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>
											{{ t('common.actions') }}
										</new-tb-th>

										<new-tb-td>
											<button
												class="request__access__btn btn-common btn-red mx-auto"
												:class="{
													disable: tr.resume_request,
												}"
												title="Request Resume Access"
												@click="requestResumeAccess(tr.id)"
												:disabled="tr.resume_request"
											>
												{{ tr.resume_request ? t('resume.requestSent') : t('resume.requestAccess') }}
											</button>
										</new-tb-td>
									</new-tb-tr>
								</div>
							</div>
						</div>
					</new-tb-tr>
				</template>
			</new-data-table>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { dateFormat } from '@/utils/mixins';
import Multiselect from '@vueform/multiselect';
import { faChevronDown, faChevronUp, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSwal } from '../../../components/sweetalert';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';

export default {
	name: 'GigWorkHour',

	components: {
		Multiselect,
		FontAwesomeIcon,
	},

	setup() {
		//ref
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const tableIndex = ref(0);

		// icon
		const viewIcon = faEye;
		const trashIcon = faTrashAlt;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		//global store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		// sweetalert
		const Swal = useSwal();

		//globle router
		const router = useRouter();

		//Catyegory field
		const seekerId = reactive(useField('seekerId', undefined, { initialValue: null }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('gigworkhour/getJobSeeker');
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// gigworkhour list
		const gigWorkHourList = computed(() => store.getters['gigworkhour/getGigWorkhourList']);

		// total invoice count
		const totalInvoiceCount = computed(() => store.state.invoice.totalPaySlip);
		//job seeker option
		const jobSeekerOptions = computed(() => store.getters['gigworkhour/getjobseekerOptions']);
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current users document type
		const fetchGigWorkHour = async () => {
			const values = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
			};
			await store.dispatch('gigworkhour/getGigWorkHour', {
				payload: values,
				id: seekerId.value,
			});
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			fetchGigWorkHour();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchGigWorkHour();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			fetchGigWorkHour();
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// select drop down box on change
		const onChange = event => {
			seekerId.value = event;
			fetchGigWorkHour();
		};

		// remove work details
		const removeWorkDetail = () => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.workDetail'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Remove It',
			}).then(async () => {
				
			});
		};

		//View gig work hour details
		const viewGigWorkDetail = data => {
			store.commit('gigworkhour/SET_STATE', {
				action: 'gigWorkDetail',
				data: data,
			});
			router.push({ name: 'ViewGigWorkDetail', params: { id: data.id } });
		};

		return {
			// translate function
			t,

			// ref
			maxItemsPerPage,
			tableIndex,

			// icon
			seekerId,
			viewIcon,
			trashIcon,

			// icon
			arrowDown,
			arrowUp,

			dateFormat,

			// computed
			gigWorkHourList,
			totalInvoiceCount,
			jobSeekerOptions,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			onChange,
			removeWorkDetail,
			viewGigWorkDetail,
			openTable,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.my__document {
	margin-bottom: 10px;

	.md-header {
		.md-header-left {
			.header-title {
				font-weight: 600;
				font-size: 22px;
			}
		}

		.progress__bar {
			width: 100%;
			border-radius: 20px;
			background-color: $colorExLightGray;
			align-items: flex-end;
			position: relative;
		}
	}

	table {
		tr {
			td {
				&.text-yellow {
					color: $colorWait;
				}
			}
		}
	}

	.form-group {
		.text-big {
			font-size: 20px;
			margin-bottom: 20px;
		}

		label {
			font-weight: 500;
			font-size: 14px;

			span {
				color: $coloRed;

				&.black-icon {
					color: #000;
				}
			}
		}
	}

	.buttons {
		color: #ff4b57;
		display: flex;
		cursor: pointer;

		.delete-btn,
		.view-btn {
			width: 50px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 5px;
			border-radius: 12px;
			background-color: #f8dddf;
		}
	}
}

@media (max-width: 576px) {
	.my__document {
		.md-header {
			display: block;
			text-align: center;

			.md-header-left {
				.header-title {
					margin-bottom: 15px;
					font-size: 20px;
				}
			}
		}
	}
}

.expand-table {
	th {
		width: 10%;
	}

	td {
		width: 20%;
	}
}

.my__document {
	.payment-pill-header {
		@media (max-width: 425px) {
			display: block;
		}
	}
}
</style>
<style>
@media (max-width: 768px) {
	.my__document .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.my__document .data__table .table__header {
		display: block !important;
	}
}
</style>
