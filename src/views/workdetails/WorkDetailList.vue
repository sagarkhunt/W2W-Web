<template>
	<!-- work details -->
	<div class="work__details card-space work-detail">
		<!-- header -->
		<div class="payment-pill-header">
			<!-- title -->
			<div class="pph-left">
				<h5 class="title-lg">{{ t('workDetails.workDetails') }}</h5>
			</div>

			<!-- action btns -->
			<div class="pph-right d-flex align-items-center flex-md-nowrap flex-wrap">
				<ToolTip :title="t('toolTip.addWorkDetail')">
					<router-link to="/worked-details/add">
						<button class="btn-common btn-red mb-2 mb-sm-0 mr-2" type="button">+ {{ t('common.add') }}</button>
					</router-link>
				</ToolTip>
				<!-- delete work details -->
				<ToolTip :title="t('toolTip.deleteWorkDetail')">
					<button class="btn-common btn-red mb-2 mb-sm-0 mr-2" type="button" @click="deleteMultipleWorkDetail">
						{{ t('common.delete') }}
					</button>
				</ToolTip>
				<!-- use in invoice -->
				<ToolTip :title="t('toolTip.selectWorkDetail')">
					<button class="btn-common btn-red mb-2 mb-sm-0 mr-2" type="button" @click="useWorkDetailsInInvoice">
						{{ t('workDetails.useInInvoice') }}
					</button>
				</ToolTip>
			</div>
		</div>

		<div>
			<new-data-table
				:data="workDetailList"
				sst
				pagination
				search
				:total="totalWorkDetails"
				:max-items="maxItemsPerPage"
				@sort="handleSort"
				@search="updateSearchQuery"
				@changePage="handlePageChange"
				class="large-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{ t('common.Rows') }}</label>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownworkDetail"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownworkDetailAria">
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
					<new-tb-th>{{ t('common.select') }}</new-tb-th>
					<new-tb-th sort-key="date">{{ t('fieldList.date') }}</new-tb-th>
					<new-tb-th sort-key="">{{ t('fieldList.teamDays') }}</new-tb-th>
					<new-tb-th>{{ t('fieldList.contractType') }}</new-tb-th>
					<new-tb-th sort-key="distance"> {{ t('fieldList.distance') }} ({{ t('common.km') }}) </new-tb-th>
					<new-tb-th sort-kry="total_work">{{ t('fieldList.workedHours') }}</new-tb-th>
					<new-tb-th sort-key="">{{ t('fieldList.hoursPieces') }}</new-tb-th>
					<new-tb-th sort-kry="lunch_compensation_value">{{ t('fieldList.lunchCompensation') }}</new-tb-th>
					<new-tb-th sort-kry="day_compensation_value">{{ t('fieldList.daysCompensation') }}</new-tb-th>
					<new-tb-th sort-kry="other_compensation">{{ t('fieldList.otherCompensation') }}</new-tb-th>
					<new-tb-th>{{ t('common.actions') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>
							<div v-if="tr.team">
								<div class="checkbox-div round">
									<input type="checkbox" v-model="selectedItems" :id="tr.id" :value="tr.id" disabled />
									<label :for="tr.id" disabled></label>
								</div>
							</div>
							<div v-else>
								<div class="checkbox-div round">
									<input type="checkbox" v-model="selectedItems" :id="tr.id" :value="tr.id" />
									<label :for="tr.id"></label>
								</div>
							</div>
						</new-tb-td>
						<new-tb-td>{{ dateFormat(tr.date) }}</new-tb-td>

						<new-tb-td>
							{{ moment(moment(tr.trip_end_date).format('YYYY/MM/DD')).diff(moment(tr.trip_start_date).format('YYYY/MM/DD'), 'days') || '-' }}
						</new-tb-td>

						<new-tb-td>{{ tr.contract_type }}</new-tb-td>
						<new-tb-td>{{ tr.distance || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.contract_value }}</new-tb-td>
						<new-tb-td>{{ tr.total_work }}</new-tb-td>
						<new-tb-td>&euro; {{ (tr.lunchCompensation && tr.lunchCompensation.compensation_value) || 0 }} </new-tb-td>
						<new-tb-td>&euro; {{ (tr.fullHalfDayCompensation && tr.fullHalfDayCompensation.compensation_value) || 0 }} </new-tb-td>
						<new-tb-td>&euro; {{ tr.other_compensation || 0 }}</new-tb-td>
						<new-tb-td class="work_details__actions">
							<div class="d-flex align-items-center justify-content-center">
								<ToolTip :title="t('toolTip.duplicateWorkDetail')">
									<button title="Duplicate Work Detail" class="tbl-action grey-edit" @click="duplicateWorkDetail(tr.id)">
										<FontAwesomeIcon :icon="copyIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.editWorkDetail')">
									<button title="Edit Work Detail" class="tbl-action grey-edit ml-2" @click="editWorkDetail(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.deleteWorkDetails')">
									<button title="Remove Work Detail" @click="deleteWorkDetail(tr.id)" class="tbl-action red-close ml-2">
										<FontAwesomeIcon :icon="deleteIcon" />
									</button>
								</ToolTip>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>
		</div>

		<div>
			<new-data-table
				:data="workDetailList"
				sst
				pagination
				search
				:total="totalWorkDetails"
				:max-items="maxItemsPerPage"
				@search="updateSearchQuery"
				@changePage="handlePageChange"
				class="responsive-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{ t('common.Rows') }}</label>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownworkDetailMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownworkDetailMobileAria">
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

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<div>
										<div class="checkbox-div round">
											<input type="checkbox" v-model="selectedItems" :id="tr.id" :value="tr.id" />
											<label :for="tr.id"></label>
										</div>
									</div>
									<div class="ml-4">
										<div>{{ dateFormat(tr.date) }}</div>
										<div>{{ tr.distance }} ({{ t('common.km') }})</div>
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
										<new-tb-th>{{ t('fieldList.teamDays') }}</new-tb-th>
										<new-tb-td>{{ moment(moment(tr.trip_end_date).format('YYYY/MM/DD')).diff(moment(tr.trip_start_date).format('YYYY/MM/DD'), 'days') || '-' }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.contractType') }}</new-tb-th>
										<new-tb-td>{{ tr.contract_type }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.workedHours') }}</new-tb-th>
										<new-tb-td>{{ tr.contract_value }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.hoursPieces') }}</new-tb-th>
										<new-tb-td>{{ tr.total_work }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.lunchCompensation') }}</new-tb-th>
										<new-tb-td>{{ (tr.lunchCompensation && tr.lunchCompensation.compensation_value) || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.daysCompensation') }}</new-tb-th>
										<new-tb-td>{{ (tr.fullHalfDayCompensation && tr.fullHalfDayCompensation.compensation_value) || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.otherCompensation') }}</new-tb-th>

										<new-tb-td>{{ tr.other_compensation || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>
										<new-tb-td class="work_details__actions">
											<div class="d-flex align-items-center">
												<ToolTip :title="t('toolTip.duplicateWorkDetail')">
													<button title="Duplicate Work Detail" class="tbl-action grey-edit" @click="duplicateWorkDetail(tr.id)">
														<FontAwesomeIcon :icon="copyIcon" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.editWorkDetail')">
													<button title="Edit Work Detail" class="tbl-action grey-edit ml-2" @click="editWorkDetail(tr.id)">
														<FontAwesomeIcon :icon="editIcon" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.deleteWorkDetail')">
													<button title="Remove Work Detail" @click="deleteWorkDetail(tr.id)" class="tbl-action red-close ml-2">
														<FontAwesomeIcon :icon="deleteIcon" />
													</button>
												</ToolTip>
											</div>
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
	<!-- work Team details -->
	<div class="work__details card-space work-detail">
		<!-- header -->
		<div class="payment-pill-header">
			<!-- title -->
			<div class="pph-left">
				<h5 class="title-lg">{{ t('workDetails.gigTeamWorkDetails') }}</h5>
			</div>
		</div>

		<div>
			<new-data-table
				:data="workTeamDetailList"
				sst
				pagination
				search
				:total="totalTeamWorkDetails"
				:max-items="maxItemsPerPage"
				@sort="handleSortTeam"
				@search="updateSearchQueryTeam"
				@changePage="handlePageChangeTeam"
				class="large-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{ t('common.Rows') }}</label>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownworkDetail"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownworkDetailAria">
									<li @click="changePerPageMaxItemsTeam(5)">
										<span class="dropdown-item tbl-drop-link">
											5
										</span>
									</li>
									<li @click="changePerPageMaxItemsTeam(10)">
										<span class="dropdown-item tbl-drop-link">
											10
										</span>
									</li>
									<li @click="changePerPageMaxItemsTeam(15)">
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
					<new-tb-th sort-key="date">{{ t('fieldList.date') }}</new-tb-th>
					<new-tb-th sort-key="">{{ t('jobSeekerTeam.teamName') }}</new-tb-th>
					<new-tb-th sort-key="">{{ t('fieldList.teamDays') }}</new-tb-th>
					<new-tb-th>{{ t('fieldList.contractType') }}</new-tb-th>
					<new-tb-th sort-key="distance"> {{ t('fieldList.distance') }} ({{ t('common.km') }}) </new-tb-th>
					<new-tb-th sort-kry="total_work">{{ t('fieldList.workedHours') }}</new-tb-th>
					<new-tb-th sort-key="">{{ t('fieldList.hoursPieces') }}</new-tb-th>
					<new-tb-th sort-kry="lunch_compensation_value">{{ t('fieldList.lunchCompensation') }}</new-tb-th>
					<new-tb-th sort-kry="day_compensation_value">{{ t('fieldList.daysCompensation') }}</new-tb-th>
					<new-tb-th sort-kry="other_compensation">{{ t('fieldList.otherCompensation') }}</new-tb-th>
					<new-tb-th>{{ t('common.actions') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.date) }}</new-tb-td>
						<new-tb-td>{{ (tr.team && tr.team.team_name) || '-' }}</new-tb-td>
						<new-tb-td v-if="tr.team">
							-
						</new-tb-td>
						<new-tb-td v-else>
							{{ moment(moment(tr.trip_end_date).format('YYYY/MM/DD')).diff(moment(tr.trip_start_date).format('YYYY/MM/DD'), 'days') || '-' }}
						</new-tb-td>

						<new-tb-td>{{ tr.contract_type }}</new-tb-td>
						<new-tb-td>{{ tr.distance || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.contract_value }}</new-tb-td>
						<new-tb-td>{{ tr.total_work }}</new-tb-td>
						<new-tb-td>&euro; {{ (tr.lunchCompensation && tr.lunchCompensation.compensation_value) || 0 }} </new-tb-td>
						<new-tb-td>&euro; {{ (tr.fullHalfDayCompensation && tr.fullHalfDayCompensation.compensation_value) || 0 }} </new-tb-td>
						<new-tb-td>&euro; {{ tr.other_compensation || 0 }}</new-tb-td>
						<new-tb-td class="work_details__actions">
							<div class="d-flex align-items-center justify-content-center">
								<ToolTip :title="t('toolTip.duplicateWorkDetail')">
									<button title="Duplicate Work Detail" class="tbl-action grey-edit" @click="duplicateWorkDetail(tr.id)">
										<FontAwesomeIcon :icon="copyIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.editWorkDetail')">
									<button title="Edit Work Detail" class="tbl-action grey-edit ml-2" @click="editWorkDetail(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.deleteWorkDetails')">
									<button title="Remove Work Detail" @click="deleteWorkDetail(tr.id)" class="tbl-action red-close ml-2">
										<FontAwesomeIcon :icon="deleteIcon" />
									</button>
								</ToolTip>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>
		</div>

		<div>
			<new-data-table
				:data="workTeamDetailList"
				sst
				pagination
				search
				:total="totalWorkDetails"
				:max-items="maxItemsPerPage"
				@search="updateSearchQuery"
				@changePage="handlePageChangeTeam"
				class="responsive-table searchbar_table"
			>
				<template #header>
					<div class="select__limit">
						<div>
							<label class="tbl_label">{{ t('common.Rows') }}</label>
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownworkDetailMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownworkDetailMobileAria">
									<li @click="changePerPageMaxItemsTeam(5)">
										<span class="dropdown-item tbl-drop-link">
											5
										</span>
									</li>
									<li @click="changePerPageMaxItemsTeam(10)">
										<span class="dropdown-item tbl-drop-link">
											10
										</span>
									</li>
									<li @click="changePerPageMaxItemsTeam(15)">
										<span class="dropdown-item tbl-drop-link">
											15
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
						<div>
							<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
								<div class="d-flex">
									<!-- <div>
										<div class="checkbox-div round">
											<input type="checkbox" v-model="selectedItems" :id="tr.id" :value="tr.id" />
											<label :for="tr.id"></label>
										</div>
									</div> -->
									<div class="ml-4">
										<div>{{ dateFormat(tr.date) }}</div>
										<div>{{ tr.distance }} ({{ t('common.km') }})</div>
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
										<new-tb-th>{{ t('jobSeekerTeam.teamName') }}</new-tb-th>
										<new-tb-td>{{ (tr.team && tr.team.team_name) || '-' }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.teamDays') }}</new-tb-th>
										<new-tb-td>{{ moment(moment(tr.trip_end_date).format('YYYY/MM/DD')).diff(moment(tr.trip_start_date).format('YYYY/MM/DD'), 'days') || '-' }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.contractType') }}</new-tb-th>
										<new-tb-td>{{ tr.contract_type }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.workedHours') }}</new-tb-th>
										<new-tb-td>{{ tr.contract_value }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.hoursPieces') }}</new-tb-th>
										<new-tb-td>{{ tr.total_work }}</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.lunchCompensation') }}</new-tb-th>
										<new-tb-td>{{ (tr.lunchCompensation && tr.lunchCompensation.compensation_value) || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.daysCompensation') }}</new-tb-th>
										<new-tb-td>{{ (tr.fullHalfDayCompensation && tr.fullHalfDayCompensation.compensation_value) || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('fieldList.otherCompensation') }}</new-tb-th>

										<new-tb-td>{{ tr.other_compensation || 0 }} &euro;</new-tb-td>
									</new-tb-tr>

									<new-tb-tr>
										<new-tb-th>{{ t('common.actions') }}</new-tb-th>
										<new-tb-td class="work_details__actions">
											<div class="d-flex align-items-center">
												<ToolTip :title="t('toolTip.duplicateWorkDetail')">
													<button title="Duplicate Work Detail" class="tbl-action grey-edit" @click="duplicateWorkDetail(tr.id)">
														<FontAwesomeIcon :icon="copyIcon" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.editWorkDetail')">
													<button title="Edit Work Detail" class="tbl-action grey-edit ml-2" @click="editWorkDetail(tr.id)">
														<FontAwesomeIcon :icon="editIcon" />
													</button>
												</ToolTip>
												<ToolTip :title="t('toolTip.deleteWorkDetail')">
													<button title="Remove Work Detail" @click="deleteWorkDetail(tr.id)" class="tbl-action red-close ml-2">
														<FontAwesomeIcon :icon="deleteIcon" />
													</button>
												</ToolTip>
											</div>
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

	<!-- Duplicate work details form -->
	<Suspense v-if="showDuplicateWorkDetailModalShow.value">
		<template #default>
			<duplicate-work-details v-model:isModalShow="showDuplicateWorkDetailModalShow" v-model:workDetailId="duplicateWorkDetailId" @newWorkDetail="fetchCurrentUserWorkDetails" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { ref, computed, onMounted, defineAsyncComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEdit, faCopy, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useSwal } from '@/components/sweetalert';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import moment from 'moment';

const DuplicateWorkDetails = defineAsyncComponent(async () => {
	return import('@/views/workdetails/components/DuplicateWorkDetailModal.vue' /* webpackChunkName:"DuplicateWorkDetailModal" */);
});

import { dateFormat } from '@/utils/mixins';

export default {
	name: 'WorkDetails',

	// components
	components: {
		FontAwesomeIcon,
		DefaultLoader,
		DuplicateWorkDetails,
	},

	setup() {
		// ref vars
		const isAddWorkDetailsModalShow = ref(false);
		const isViewDetailsModalShow = ref(false);
		const isDuplicateWorkDetailModalShow = ref(false);
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const pageTeam = ref(1);
		const maxItemsPerPageTeam = ref(5);
		const searchTeam = ref(null);
		const orderTeam = ref(null);
		const selectedItems = ref([]);
		const editableWorkDetailId = ref(null);
		const viewWorkDetailId = ref(null);
		const duplicateWorkDetailId = ref(null);

		const showTable = ref(false);
		const tableIndex = ref(0);

		// icons
		const eyeIcon = faEye;
		const deleteIcon = faTimes;
		const editIcon = faEdit;
		const copyIcon = faCopy;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore(); // use state

		// router
		const router = useRouter();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.workedDetails')} - Way2Work`;

		// sweetalert
		const Swal = useSwal();

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch current user's work details
			fetchCurrentUserWorkDetails();

			// team work details
			fetchCurrentUserTeamWorkDetails();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// get total work details count
		const totalWorkDetails = computed(() => store.state.workDetail.totalWorkDetails);
		// get total team work details count
		const totalTeamWorkDetails = computed(() => store.state.workDetail.totalWorkDetails);

		// get current users work details
		const workDetailList = computed(() => store.getters['workDetail/getWorkDetails']);
		// get current users team work details
		const workTeamDetailList = computed(() => store.getters['workDetail/getTeamWorkDetails']);

		// show add work detail form
		const showAddWorkDetailModal = computed({
			get() {
				return isAddWorkDetailsModalShow;
			},

			set(val) {
				isAddWorkDetailsModalShow.value = val;
			},
		});

		// show view work detail modal
		const showViewWorkDetailModal = computed({
			get() {
				return isViewDetailsModalShow;
			},

			set(val) {
				isViewDetailsModalShow.value = val;
			},
		});

		// show duplicate work detail modal
		const showDuplicateWorkDetailModalShow = computed({
			get() {
				return isDuplicateWorkDetailModalShow;
			},

			set(val) {
				isDuplicateWorkDetailModalShow.value = val;
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch current invoice work details
		const fetchCurrentUserWorkDetails = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
				type: 'normal',
			};

			store.dispatch('workDetail/getCurrentUsersWorkDetails', payload);
		};
		// fetch current invoice work details
		const fetchCurrentUserTeamWorkDetails = () => {
			const payload = {
				page: pageTeam.value,
				limit: maxItemsPerPageTeam.value,
				search: searchTeam.value,
				order: orderTeam.value,
				type: 'team',
			};

			store.dispatch('workDetail/getCurrentUsersTeamWorkDetails', payload);
		};
		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchCurrentUserWorkDetails();
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchCurrentUserWorkDetails();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			fetchCurrentUserWorkDetails();
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPageTeam.value = length;
			pageTeam.value = 1;
			fetchCurrentUserWorkDetails();
		};

		// handle page change
		const handlePageChangeTeam = val => {
			page.value = val;
			fetchCurrentUserWorkDetails();
		};

		//filter and sorting data
		const handleSortTeam = key => {
			pageTeam.value = 1;
			orderTeam.value = [key.key, key.sortType];
			fetchCurrentUserTeamWorkDetails();
		};

		// handle search
		const updateSearchQueryTeam = searchKey => {
			searchTeam.value = searchKey;
			fetchCurrentUserTeamWorkDetails();
		};

		// change per page max items
		const changePerPageMaxItemsTeam = length => {
			maxItemsPerPageTeam.value = length;
			pageTeam.value = 1;
			fetchCurrentUserTeamWorkDetails();
		};

		// delete work detail by id
		const deleteWorkDetail = async id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('workDetails.deletedWorkDetails'),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: t('workDetails.YesDelete'),
			}).then(async result => {
				if (result.isConfirmed) {
					// delete request
					await store.dispatch('workDetail/deleteWorkDetail', id).then(() => {
						fetchCurrentUserWorkDetails();
					});
				}
			});
		};

		// delete work detail - multiple
		const deleteMultipleWorkDetail = async () => {
			if (selectedItems.value.length) {
				Swal.fire({
					title: t('workDetails.workDetailsMultipleDetele'),
					text: t('workDetails.workDetailsConformDetele'),
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: t('workDetails.YesDelete'),
				}).then(async result => {
					if (result.isConfirmed) {
						// delete request
						await store.dispatch('workDetail/deleteMultipleWorkDetails', selectedItems.value).then(() => {
							Swal.fire('Deleted!', t('workDetails.deletedWorkDetailsSuccessfully'), 'success');

							selectedItems.value = null;
							fetchCurrentUserWorkDetails();
						});
					}
				});
			} else {
				Swal.fire({
					text: t('workDetails.workDetailsMultipleDetele'),
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
				});
			}
		};

		// use workdetails in invoice
		const useWorkDetailsInInvoice = () => {
			if (selectedItems.value.length) {
				Swal.fire({
					title: t('workDetails.areYouSure'),
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
				}).then(async result => {
					if (result.isConfirmed) {
						const invoiceWorkDetails = JSON.parse(localStorage.getItem('invoiceWorkDetails')) || [];
						if (selectedItems.value) {
							localStorage.removeItem('invoiceWorkDetails');
						}
						const tempArray = selectedItems.value.filter(a => !invoiceWorkDetails.includes(a));
						// update localstorage - invoiceWorkDetails
						localStorage.setItem('invoiceWorkDetails', JSON.stringify(invoiceWorkDetails.concat(tempArray)));

						router.push({ path: '/invoices/add' });
					}
				});
			} else {
				Swal.fire({
					title: t('workDetails.useInvoice'),
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
				});
			}
		};

		// edit work detail
		const editWorkDetail = id => {
			router.push({ name: 'Edit Worked Details', params: { id } });
		};
		// show work details
		const showWorkDetails = id => {
			showViewWorkDetailModal.value = true;
			viewWorkDetailId.value = id;
		};

		// duplicate work detail
		const duplicateWorkDetail = id => {
			showDuplicateWorkDetailModalShow.value = true;
			duplicateWorkDetailId.value = id;
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		/**
		 * Watches
		 * *******************************************************************
		 */
		watch(isAddWorkDetailsModalShow, () => {
			if (!isAddWorkDetailsModalShow.value) {
				editableWorkDetailId.value = null;
			}
		});

		watch(isViewDetailsModalShow, () => {
			if (!isViewDetailsModalShow.value) {
				viewWorkDetailId.value = null;
			}
		});

		watch(isDuplicateWorkDetailModalShow, () => {
			if (!isDuplicateWorkDetailModalShow.value) {
				duplicateWorkDetailId.value = null;
			}
		});

		return {
			moment,
			// icons
			eyeIcon,
			deleteIcon,
			editIcon,
			copyIcon,
			arrowDown,
			arrowUp,

			// translate function
			t,

			// ref
			dateFormat,
			selectedItems,
			editableWorkDetailId,
			viewWorkDetailId,
			duplicateWorkDetailId,
			showTable,
			tableIndex,

			// computed
			workDetailList,
			workTeamDetailList,
			totalWorkDetails,
			totalTeamWorkDetails,
			showAddWorkDetailModal,
			showViewWorkDetailModal,
			showDuplicateWorkDetailModalShow,

			// methods
			fetchCurrentUserWorkDetails,
			fetchCurrentUserTeamWorkDetails,
			maxItemsPerPage,
			maxItemsPerPageTeam,
			handlePageChange,
			changePerPageMaxItems,
			updateSearchQuery,
			deleteWorkDetail,
			deleteMultipleWorkDetail,
			useWorkDetailsInInvoice,
			editWorkDetail,
			showWorkDetails,
			duplicateWorkDetail,
			openTable,
			handleSort,
			handlePageChangeTeam,
			handleSortTeam,
			updateSearchQueryTeam,
			changePerPageMaxItemsTeam,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.work__details {
	.expand-table {
		.collapse-div {
			@media (max-width: 575px) {
				padding: 15px 10px 0 10px;
			}
		}
	}

	:deep(table) {
		min-width: max-content;
	}

	.table-auto {
		overflow: auto;

		table {
			tr {
				.checkbox-div {
					&.round {
						position: relative;

						label {
							background-color: #fff;
							border: 1px solid #ccc;
							border-radius: 50%;
							cursor: pointer;
							height: 28px;
							width: 28px;
							left: 0;
							position: absolute;
							top: 0;
							margin: 0;

							@media (max-width: 575px) {
								width: 23px;
								height: 23px;
							}

							&::after {
								border: 2px solid $coloRed;
								border-top: none;
								border-right: none;
								content: '';
								height: 6px;
								left: 7px;
								opacity: 0;
								position: absolute;
								top: 8px;
								transform: rotate(-45deg);
								width: 12px;
								@media (max-width: 575px) {
									left: 5px;
									top: 7px;
									width: 11px;
									height: 5px;
								}
							}
						}

						input[type='checkbox'] {
							visibility: hidden;
						}

						input[type='checkbox']:checked + label {
							background-color: $colorLightRed;
							border-color: transparent;
						}

						input[type='checkbox']:checked + label:after {
							opacity: 1;
						}
					}
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.work__details {
		.select__limit {
			margin-bottom: 10px;
			justify-content: center;

			span {
				font-size: 14px;
			}
		}
	}
}

.pph-right {
	.btn-common {
		@media (max-width: 576px) {
			font-size: 11px;
		}
	}
}
</style>
<style lang="scss">
.work-detail {
	.data__table .table__data .table-auto {
		overflow: auto !important;
	}
}
.work__details {
	.expand-table {
		th {
			width: 18% !important;
		}

		td {
			width: 50% !important;
		}
	}
}
</style>
<style>
@media (max-width: 768px) {
	.work__details .data__table .table__header {
		display: flex !important;
	}
}

@media (max-width: 575px) {
	.work__details .data__table .table__header {
		display: block !important;
	}
}
</style>
