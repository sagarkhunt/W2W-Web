<template>
	<div class="invoice__list card-space">
		<!-- header -->
		<div class="payment-pill-header mb-4">
			<div class="pph-left">
				<h5 class="title-lg">{{ t('jobSeekerTeam.viewInvoiceTeam') }}</h5>
			</div>
		</div>
		<!-- form field -->
		<div>
			<form class="tab-form">
				<div class="select-file">
					<div class="form_part form-row">
						<div class="col-12">
							<div class="row align-items-end mb-3">
								<div class="form-group col-lg-4 col-12 theme-input mb-lg-0 pe-lg-0">
									<label for="teamName">
										{{ t('fieldList.teamName') }}
									</label>
									<div class="flex position-relative">
										<input
											id="viewTeamName"
											type="text"
											class="form-control form-icon"
											:placeholder="
												t('validation.enterField', {
													field: 'fieldList.teamName',
												})
											"
											@input="teamNameField.handleChange"
											@blur="teamNameField.handleBlur"
											:value="teamNameField.value"
											disabled
										/>

										<span
											class="position-absolute"
											@click="EditTeamNameDetail(teamNameField.value)"
											:class="!checkTeamNameEditPermission() ? 'view-edit-danger' : 'edit-view-icon-grey'"
											:disabled="!checkTeamNameEditPermission()"
										>
											<ToolTip :title="t('toolTip.editJobSeekerTeamName')" position="top">
												<FontAwesomeIcon :icon="editIcon" />
											</ToolTip>
										</span>
									</div>

									<p class="text-danger">
										{{ teamNameField.errorMessage }}
									</p>
								</div>

								<div class="form-group col-md-6 col-12 theme-input mb-sm-0">
									<label for="teamName">
										{{ t('fieldList.emailAddress') }}
									</label>

									<input
										id="viewEmailAddress"
										type="email"
										class="form-control"
										:placeholder="
											t('validation.enterField', {
												field: 'placeholder.emailAddress',
											})
										"
										@input="userEmailField.handleChange"
										@blur="userEmailField.handleBlur"
										:value="userEmailField.value"
									/>

									<p class="text-danger">
										{{ userEmailField.errorMessage }}
									</p>
								</div>

								<div class="col-lg-2 col-sm-6 col-12 ps-lg-0">
									<ToolTip :title="t('toolTip.addTeamMember')" class="text-end">
										<div v-if="jobseekerTeamDetails.createdById !== seekerCheck.jobSeeker.id">
											<button type="button" class="btn-common btn-red" @click="addSeekerTeamMembers()" :disabled="isSubmitting">
												{{ t('jobSeekerTeam.addMember') }}
											</button>
										</div>
										<div v-else>
											<button type="button" class="btn-common btn-red" @click="addSeekerTeamMembers()" :disabled="isSubmitting">
												{{ t('jobSeekerTeam.addMember') }}
											</button>
										</div>
									</ToolTip>
								</div>
							</div>
						</div>

						<div class="form-group col-12 mt-3" v-if="teamMembersListNew">
							<new-data-table :data="teamMembersListNew || []" sst class="large-table">
								<template #thead>
									<new-tb-th>{{ t('jobSeekerTeam.memberName') }}</new-tb-th>
									<new-tb-th>{{ t('jobSeekerTeam.memberRole') }}</new-tb-th>
									<new-tb-th>{{ t('jobSeekerTeam.memberEmail') }}</new-tb-th>
									<new-tb-th>{{ t('invoiceList.status') }}</new-tb-th>
									<new-tb-th>{{ t('jobSeekerTeam.reSend') }}</new-tb-th>
									<new-tb-th>{{ t('common.actions') }}</new-tb-th>
								</template>

								<template #data="scopedData" ref="tableBody">
									<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
										<new-tb-td>{{ tr.seeker.user.full_name || '-' }}</new-tb-td>
										<new-tb-td>
											<div class="tbl-status" v-if="jobseekerTeamInfo.createdById === tr.seeker.id">
												<span>{{ t('jobSeekerTeam.leader') }}</span>
											</div>
											<div class="tbl-status" v-else>
												<span>{{ t('jobSeekerTeam.member') }}</span>
											</div>
										</new-tb-td>
										<new-tb-td>{{ tr.seeker.user.email || '-' }}</new-tb-td>
										<new-tb-td>
											<div class="tbl-status">
												<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.status === 'accepted'">
													<p>{{ t('jobSeekerTeam.accepted') }}</p>
												</span>
												<span class="sts-reject  d-flex align-items-center justify-content-center" v-else-if="tr.status === 'rejected'">
													<p>{{ t('jobSeekerTeam.rejected') }}</p>
												</span>
												<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
													<p>{{ t('jobSeekerTeam.pending') }}</p>
												</span>
											</div>
										</new-tb-td>
										<new-tb-td>
											<div class="d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.resendInvitation')">
													<span
														class="tbl-action red-close"
														:class="{ 'grey-edit-grey': !reSendInvitationLeader(tr) || !['pending', 'rejected'].includes(tr.status) }"
														@click="reSendInvitation(tr.seeker.user.email)"
													>
														<FontAwesomeIcon :icon="reSendIcon" />
													</span>
												</ToolTip>
											</div>
										</new-tb-td>
										<new-tb-td>
											<div class="d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.deleteInvitation')">
													<span
														class="tbl-action red-close"
														:class="{ 'grey-edit-grey': !checkPermissionAllow(tr) }"
														@click="deleteInvoice(tr.seeker.id)"
														:disabled="!checkPermissionAllow(tr)"
													>
														<FontAwesomeIcon :icon="deleteIcon" />
													</span>
												</ToolTip>
											</div>
										</new-tb-td>
									</new-tb-tr>
								</template>
							</new-data-table>

							<div v-if="teamMembersListNew">
								<new-data-table :data="teamMembersListNew || []" sst class="responsive-table">
									<template #data="scopedData" ref="tableBody">
										<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
											<div>
												<div class="collapse-div" @click="openTable(i, item)">
													<div class="d-flex justify-content-between">
														<div>
															<div>
																{{ tr.seeker.user.full_name || '-' }}
															</div>

															<div>
																{{ tr.seeker.user.email || '-' }}
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
												</div>

												<div class="border-padding">
													<div v-if="i == tableIndex" class="table-border">
														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.memberName') }}</new-tb-th>
															<new-tb-td>{{ tr.seeker.user.full_name || '-' }}</new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.memberRole') }}</new-tb-th>

															<new-tb-td>
																<div class="tbl-status" v-if="jobseekerTeamInfo.createdById === tr.seeker.id">
																	<span>{{ t('jobSeekerTeam.leader') }}</span>
																</div>
																<div class="tbl-status" v-else>
																	<span>{{ t('jobSeekerTeam.member') }}</span>
																</div>
															</new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.memberEmail') }}</new-tb-th>

															<new-tb-td>{{ tr.seeker.user.email || '-' }}</new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('invoiceList.status') }}</new-tb-th>

															<new-tb-td
																><div class="tbl-status">
																	<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.status === 'accepted'">
																		<p>{{ t('jobSeekerTeam.accepted') }}</p>
																	</span>
																	<span class="sts-reject  d-flex align-items-center justify-content-center" v-else-if="tr.status === 'rejected'">
																		<p>{{ t('jobSeekerTeam.rejected') }}</p>
																	</span>
																	<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
																		<p>{{ t('jobSeekerTeam.pending') }}</p>
																	</span>
																</div></new-tb-td
															>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.reSend') }}</new-tb-th>

															<new-tb-td
																><div class="d-flex align-items-center justify-content-start">
																	<ToolTip :title="t('toolTip.resendInvitation')">
																		<span
																			class="tbl-action red-close"
																			:class="{ 'grey-edit-grey': !reSendInvitationLeader(tr) || !['pending', 'rejected'].includes(tr.status) }"
																			@click="reSendInvitation(tr.seeker.user.email)"
																		>
																			<FontAwesomeIcon :icon="reSendIcon" />
																		</span>
																	</ToolTip></div
															></new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('common.actions') }}</new-tb-th>

															<new-tb-td>
																<span
																	v-if="jobseekerTeamInfo.createdById === seekerCheck.jobSeeker.id"
																	class="d-flex align-items-center justify-content-start border-0"
																>
																	<ToolTip :title="t('toolTip.deleteInvitation')">
																		<span class="tbl-action red-close" @click="deleteInvoice(tr.seeker.id)">
																			<!-- DELETE -->
																			<FontAwesomeIcon :icon="deleteIcon" />
																		</span>
																	</ToolTip>
																</span>
																<span v-else>
																	<ToolTip :title="t('toolTip.deleteInvitation')">
																		<span v-if="tr.seekerId === seekerCheck.jobSeeker.id">
																			<span class="tbl-action red-close" @click="deleteInvoice(tr.seeker.id)">
																				<!-- DELETE -->
																				<FontAwesomeIcon :icon="deleteIcon" />
																			</span>
																		</span>
																		<span v-else>
																			<button class="tbl-action grey-edit-grey  ml-2" @click="deleteInvoice(tr.id)" disabled>
																				<FontAwesomeIcon :icon="deleteIcon" />
																			</button>
																		</span>
																	</ToolTip>
																</span>
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
						<div class="col-12">
							<div class="pph-left">
								<h5 class="title-lg">{{ t('jobSeekerTeam.membersYetToJoin') }}</h5>
							</div>
						</div>
						<!--not exits in sytem user -->
						<div class="form-group col-12 mt-3" v-if="newTeamMembersList">
							<new-data-table :data="newTeamMembersList || []" sst class="large-table">
								<template #thead>
									<new-tb-th>{{ t('jobSeekerTeam.memberRole') }}</new-tb-th>
									<new-tb-th>{{ t('jobSeekerTeam.memberEmail') }}</new-tb-th>
									<new-tb-th>{{ t('common.status') }}</new-tb-th>
									<new-tb-th>{{ t('jobSeekerTeam.reSend') }}</new-tb-th>
									<new-tb-th>{{ t('common.actions') }}</new-tb-th>
								</template>

								<template #data="scopedData" ref="tableBody">
									<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
										<new-tb-td>
											<div class="tbl-status">
												<span>{{ t('jobSeekerTeam.member') }}</span>
											</div>
										</new-tb-td>
										<new-tb-td>{{ tr.email || '-' }}</new-tb-td>
										<new-tb-td>
											<div class="tbl-status">
												<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.status === 'registered'">
													<p>{{ t('jobSeekerTeam.registered') }}</p>
												</span>
												<span class="sts-reject  d-flex align-items-center justify-content-center" v-else-if="tr.status === 'reinvited'">
													<p>{{ t('jobSeekerTeam.reinvited') }}</p>
												</span>
												<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
													<p>{{ t('jobSeekerTeam.invited') }}</p>
												</span>
											</div>
										</new-tb-td>
										<new-tb-td class="d-flex align-items-center justify-content-center">
											<ToolTip :title="t('toolTip.resendInvitation')">
												<span>
													<span class="tbl-action red-close" :class="{ 'grey-edit-grey': !reSendInvitationLeader(tr) }" @click="reSendInvitation(tr.email)">
														<!-- DELETE -->
														<FontAwesomeIcon :icon="reSendIcon" />
													</span>
												</span>
											</ToolTip>
										</new-tb-td>
										<new-tb-td>
											<ToolTip :title="t('toolTip.deleteInvitation')">
												<span class="tbl-action red-close" :class="{ 'grey-edit-grey': !checkPermissionAllow(tr) }" @click="deleteInviteUser(tr.teamId, tr.id)">
													<FontAwesomeIcon :icon="deleteIcon" />
												</span>
											</ToolTip>
										</new-tb-td>
									</new-tb-tr>
								</template>
							</new-data-table>

							<div v-if="newTeamMembersList">
								<new-data-table :data="newTeamMembersList || []" sst class="responsive-table">
									<template #data="scopedData" ref="tableBody">
										<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
											<div>
												<div class="collapse-div" @click="openNewMemberTable(i, item)">
													<div class="d-flex justify-content-between">
														<div>
															<div>
																{{ t('jobSeekerTeam.member') }}
															</div>
															{{ tr.email || '-' }}
															<div></div>
														</div>
														<div>
															<a>
																<FontAwesomeIcon :icon="arrowDown" v-if="newTableIndex !== i" class="arrowIcon" />
															</a>

															<a>
																<FontAwesomeIcon :icon="arrowUp" v-if="newTableIndex === i" class="arrowIcon" />
															</a>
														</div>
													</div>
												</div>

												<div class="border-padding">
													<div v-if="i == newTableIndex" class="table-border">
														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.memberRole') }}</new-tb-th>
															<new-tb-td
																><div class="tbl-status">
																	<span>{{ t('jobSeekerTeam.member') }}</span>
																</div></new-tb-td
															>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.memberEmail') }}</new-tb-th>

															<new-tb-td>
																{{ tr.email || '-' }}
															</new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('common.status') }}</new-tb-th>

															<new-tb-td
																><div class="tbl-status">
																	<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.status === 'registered'">
																		<p>{{ t('jobSeekerTeam.registered') }}</p>
																	</span>
																	<span class="sts-reject  d-flex align-items-center justify-content-center" v-else-if="tr.status === 'reinvited'">
																		<p>{{ t('jobSeekerTeam.reinvited') }}</p>
																	</span>
																	<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
																		<p>{{ t('jobSeekerTeam.invited') }}</p>
																	</span>
																</div></new-tb-td
															>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('jobSeekerTeam.reSend') }}</new-tb-th>

															<new-tb-td>
																<ToolTip :title="t('toolTip.resendInvitation')">
																	<span class="d-flex align-items-center justify-content-start">
																		<span
																			class="tbl-action red-close"
																			:class="{ 'grey-edit-grey': !reSendInvitationLeader(tr) }"
																			@click="reSendInvitation(tr.email)"
																		>
																			<!-- DELETE -->
																			<FontAwesomeIcon :icon="reSendIcon" />
																		</span>
																	</span>
																</ToolTip>
															</new-tb-td>
														</new-tb-tr>

														<new-tb-tr>
															<new-tb-th>{{ t('common.actions') }}</new-tb-th>

															<new-tb-td>
																<ToolTip :title="t('toolTip.deleteInvitation')">
																	<span class="d-flex align-items-center justify-content-start">
																		<span
																			class="tbl-action red-close"
																			:class="{ 'grey-edit-grey': !checkPermissionAllow(tr) }"
																			@click="deleteInviteUser(tr.teamId, tr.id)"
																		>
																			<FontAwesomeIcon :icon="deleteIcon" />
																		</span>
																	</span>
																</ToolTip>
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
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- Edit experience modal -->
	<Suspense v-if="showEditTeamNameModal.value">
		<template #default>
			<edit-team-name v-model:isModalShow="showEditTeamNameModal" v-model:editTeamDetails="editTeamDetails" @editTeamName="fetchTeamDetails" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faPlus, faTimes, faTrashAlt, faPaperPlane, faEdit } from '@fortawesome/free-solid-svg-icons';

import { useI18n } from 'vue-i18n';
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from '@vue/runtime-core';
import * as yup from 'yup';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import { useSwal } from '../../../components/sweetalert';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
//edit model
const EditTeamName = defineAsyncComponent(async () => {
	return import('@/views/jobseekerTeam/components/EditJobseekerTeamModal.vue' /* webpackChunkName:"AddExperienceModal" */);
});

export default {
	name: 'ViewJobseekerTeam',
	components: {
		FontAwesomeIcon,
		// Multiselect,
		EditTeamName,
		DefaultLoader,
	},
	setup() {
		//ref
		const jobseekerTeamDetail = ref({});
		const teamMembersListNew = ref([]);
		const newTeamMembersList = ref([]);
		const seekerId = ref('');
		const userFullName = ref('');
		const userEmail = ref('');
		const tableIndex = ref(0);
		const newTableIndex = ref(0);
		const isEditTeamNameModalShow = ref(false);
		const editTeamName = ref(null);
		const editTeamid = ref(null);
		const editTeamDetails = ref({});

		const isSubmitting = ref(false);

		// global store
		const store = useStore(); // use state

		// global route
		const route = useRoute();

		// sweetalert
		const Swal = useSwal();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('jobSeekerTeam.editTeam')} - Way2Work`;

		// icons
		const clodeicone = faTimes;
		const downArrowIcon = faChevronDown;
		const plusIcon = faPlus;
		const trashIcon = faTrashAlt;
		const editIcon = faEdit;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const deleteIcon = faTimes;
		const reSendIcon = faPaperPlane;
		const percentag = ref(null);
		const SeekerTeamSchema = yup.object({
			team_name: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.teamName',
					}),
				),
			user_email: yup
				.string()
				.nullable()
				.required(
					t('validation.requiredField', {
						field: 'fieldList.emailAddress',
					}),
				)
				.email(t('validation.validEmail')),
		});

		// form validation intialize
		const { meta: formMeta } = useForm({
			validationSchema: SeekerTeamSchema,
		});

		const teamNameField = reactive(useField('team_name', undefined, { initialValue: null }));
		const userEmailField = reactive(useField('user_email', undefined, { initialValue: null }));

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(() => {
			fetchTeamDetails();
		});
		/**
		 * Computed
		 * *******************************************************************
		 */
		//delete permission
		const checkPermissionAllow = computed(() => tr => {
			if (jobseekerTeamInfo.value.createdById === seekerCheck.value.jobSeeker.id && seekerCheck.value.jobSeeker.id === tr.seekerId) {
				return false;
			}

			if (jobseekerTeamInfo.value.createdById === seekerCheck.value.jobSeeker.id) {
				return true;
			}

			if (seekerCheck.value.jobSeeker.id === tr.seekerId) {
				return true;
			}

			return false;
		});

		const checkTeamNameEditPermission = computed(() => () => {
			if (jobseekerTeamInfo.value.createdById === seekerCheck.value.jobSeeker.id) {
				return false;
			}

			return true;
		});

		const reSendInvitationLeader = computed(() => () => {
			if (jobseekerTeamInfo.value.createdById === seekerCheck.value.jobSeeker.id) {
				return true;
			}

			return false;
		});

		// get jobseeker list
		const employerList = computed(() => {
			return store.getters['jobseekerTeam/getSeekerList'];
		});
		// jobseeker team view info
		const jobseekerTeamInfo = computed(() => {
			const editSeekerTeamData = store.state.jobseekerTeam.jobseekerTeamDetail;
			teamNameField.value = editSeekerTeamData.team_name ?? null;
			editTeamid.value = editSeekerTeamData.id ?? null;
			return editSeekerTeamData;
		});
		const fetchTeamDetails = () => {
			store.dispatch('jobseekerTeam/viewJobseekerTeam', route.params.id);
		};
		//jobseeker team detaila
		const jobseekerTeamDetails = computed(() => store.state.jobseekerTeam.jobseekerTeamDetail);
		const seekerCheck = computed(() => store.state.auth.userProfile);

		// show edit team name modal
		const showEditTeamNameModal = computed({
			get() {
				return isEditTeamNameModalShow;
			},

			set(val) {
				isEditTeamNameModalShow.value = val;
			},
		});
		/**
		 * Methods
		 * *******************************************************************
		 */

		//resend invitation
		const reSendInvitation = async email => {
			const data = {
				email: email ?? null,
			};

			await store
				.dispatch('jobseekerTeam/userReSendEmail', {
					payload: data,
					id: route.params.id,
				})
				.then(() => store.dispatch('jobseekerTeam/viewJobseekerTeam', route.params.id));
		};

		const onChange = event => {
			seekerId.value = event.jobSeeker.id ?? '';
			userFullName.value = event.full_name ?? '';
			userEmail.value = event.email ?? '';
		};
		const addSeekerTeamMembers = async () => {
			isSubmitting.value = true;
			const values = {
				email: userEmailField.value ?? null,
				team_name: teamNameField.value ?? null,
			};
			await store
				.dispatch('jobseekerTeam/addSeekerTeamMember', {
					payload: values,
					id: route.params.id,
				})
				.then(() => {
					isSubmitting.value = false;
					store.dispatch('jobseekerTeam/viewJobseekerTeam', route.params.id);
				})
				.catch(err => {
					isSubmitting.value = false;
				});
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// table open
		const openNewMemberTable = index => {
			if (newTableIndex.value === index) {
				newTableIndex.value = null;
				return;
			}
			newTableIndex.value = index;
		};
		//delete member
		const deleteInvoice = seekerIds => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.member'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					let teamId = route.params.id;
					await store
						.dispatch('jobseekerTeam/deleteJobseekerTeamMember', {
							seekerId: seekerIds,
							teamId,
						})
						.then(() => {
							store.dispatch('jobseekerTeam/viewJobseekerTeam', route.params.id);
						});
				}
			});
		};

		//delete invite user
		const deleteInviteUser = (teamId, id) => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.member'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					let teamId = route.params.id;
					await store
						.dispatch('jobseekerTeam/deleteinvitedUser', {
							teamId,
							id: id,
						})
						.then(() => {
							store.dispatch('jobseekerTeam/viewJobseekerTeam', route.params.id);
						});
				}
			});
		};

		// edit experience
		const EditTeamNameDetail = val => {
			isEditTeamNameModalShow.value = true;
			editTeamDetails.value = {
				editTeamName: val,
				editTeamid: editTeamid.value,
			};
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		watch(jobseekerTeamInfo, () => {
			teamMembersListNew.value = jobseekerTeamInfo.value.team_members.reduce((acc, item) => {
				if (item.shared_type == 'percentage') {
					percentag.value += item.shared_part;
				}
				acc.push(item);
				return acc;
			}, []);

			newTeamMembersList.value = jobseekerTeamInfo.value.new_team_members.reduce((acc, item) => {
				if (item.shared_type == 'percentage') {
					percentag.value += item.shared_part;
				}
				acc.push(item);
				return acc;
			}, []);
		});
		return {
			//ref
			t,
			jobseekerTeamDetail,
			teamMembersListNew,
			seekerId,
			userFullName,
			userEmail,
			percentag,
			tableIndex,
			newTableIndex,
			isEditTeamNameModalShow,
			editTeamName,
			editTeamDetails,

			// icons
			clodeicone,
			downArrowIcon,
			plusIcon,
			trashIcon,
			arrowDown,
			arrowUp,
			deleteIcon,
			reSendIcon,
			editIcon,
			teamNameField,
			userEmailField,
			// form related
			formMeta,
			isSubmitting,
			//computed
			checkPermissionAllow,
			checkTeamNameEditPermission,
			employerList,
			jobseekerTeamInfo,
			jobseekerTeamDetails,
			seekerCheck,
			newTeamMembersList,
			reSendInvitationLeader,
			showEditTeamNameModal,
			//method
			EditTeamNameDetail,
			fetchTeamDetails,
			onChange,
			openTable,
			openNewMemberTable,
			deleteInvoice,
			addSeekerTeamMembers,
			reSendInvitation,
			deleteInviteUser,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';
@import '@/assets/scss/style.scss';

.model {
	width: 100%;
	padding: 20px 40px;
	border-radius: 25px;
	position: relative;

	@media (max-width: 576px) {
		padding: 20px 20px;
	}

	.close-icone {
		width: 20px;
		height: 20px;
		font-size: 20px;
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
	}

	.attachments {
		padding: 20px 0;
		font-weight: 700;
		text-align: center;
	}

	.input-title {
		font-size: 16px;
		margin-bottom: 5px;
		font-weight: 500;
		color: #858a90;
	}

	.input-pera {
		width: 100%;
		padding: 7px 10px;
		border-radius: 12px;
		border: 2px dashed #e4e6e7;
	}

	.input-back {
		border: none;
		background-color: #f6f6f6;
	}

	.plus {
		cursor: pointer;
		color: #ffff;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		border-radius: 50%;
		background-color: #ff4b57;
		border: 4px solid #ffe4e6;
	}

	.salary-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		box-shadow: 0px 4px 8px #dcdada;
		border-radius: 10px;
		padding: 3px 10px;
		width: 85%;

		.salary-dropdown {
			border-radius: 10px;
			background-color: #fbfbfb;
			padding: 2px 8px;
		}

		.dropdown-toggle::after {
			display: none;
		}
	}

	.text-prize {
		padding: 20px 0;
	}

	.input-fill {
		width: 100%;
		font-size: 14px;
		background: transparent;
		outline: none;
		border: none;
	}

	.text-center {
		text-align: center;
	}

	.btn-color {
		display: flex;
		align-items: center;

		::-webkit-file-upload-button {
			border: 1px solid #273238;
			border-radius: 10px;
			background-color: #273238;
			color: #fff;
			padding: 8px;
			float: right;
			margin-right: 0;
		}
	}

	.info-2 {
		width: 120px;
	}

	.team-text {
		font-size: 14px;
		color: #858a90;
		font-weight: 500;
		line-height: 41px;
	}

	.text-gray {
		color: #858a90;
		font-size: 14px;
		font-weight: 500;
	}

	.drop-font {
		font-size: 12px;
		color: #696d72;
	}

	.btn-common {
		white-space: nowrap;
	}
}

.edit-view-icon-grey {
	top: 0%;
	right: 10px;
	transform: translate(-50%, 30%);
	pointer-events: none;
	color: #bdc4cb;

	svg {
		margin-top: 5px;
	}
}

.view-edit-danger {
	top: 0px;
	right: 10px;
	transform: translate(-50%, 30%);
	color: #ff4b57;
}

table {
	td {
		border-top: transparent;
	}
}

.table > :not(caption) > * > * {
	border-bottom-width: 0;
}

.dz-image {
	display: flex;
	flex-wrap: wrap;

	.thumb-img {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}
}

.form-model {
	padding: 12px 15px;
	background-color: #fbfbfb;
	border-radius: 25px;
	position: relative;
}

.dz-filename span {
	font-size: 12px;
}

.invoice-dropdown {
	padding: 12px 15px;
	background-color: #fbfbfb;
	border: 1px solid #eaeaea;
	height: 50px;
	width: 80%;
	border-radius: 25px;
	display: flex;
	align-items: center;
	padding: 10px 20px;

	&:focus {
		box-shadow: none;
	}

	&:after {
		display: none;
	}
}

.grey-edit-grey {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-image: linear-gradient(#e1e4e9, #c8cbd1);
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: grey;
	}
}
.invoice__list {
	.expand-table {
		th {
			width: 12%;

			@media (max-width: 425px) {
				width: 28%;
			}
		}

		td {
			width: 50%;
		}
	}
}

.dropdown-menu {
	width: 80%;
	transform: translate(0px, 52px);
}

.multiselect-options {
	overflow: auto;
	border-radius: 10px;
}

.multiselect-option {
	background-color: #ffffff;
}

.multiselect-option.is-selected.is-pointed {
	color: #000;
	background: #ffff;
}

.multiselect-option.is-selected {
	color: #ff4b57;
	background-color: #ffff;
}

.form-control {
	&.form-icon {
		padding: 8px 40px 8px 15px;
	}
}
</style>
