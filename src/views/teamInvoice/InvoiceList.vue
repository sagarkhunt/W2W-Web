<template>
	<div class="invoice__list card-space">
		<!-- invoice list Seeker -->
		<div class="row mx-0" v-if="userTypeInfo == 'jobseeker'">
			<!-- header -->
			<div class="payment-pill-header flex-sm-nowrap flex-wrap px-0">
				<div class="pph-left">
					<h5 class="title-lg">
						{{ t('sidebar.teamInvoiceList') }}
					</h5>
				</div>
				<ToolTip :title="t('toolTip.addTeamInvoice')">
					<div class="pph-right d-flex align-items-center justify-content-center ms-md-0 ms-sm-2 ms-0">
						<router-link to="/team-invoices/add" class="btn-common btn-red">+ {{ t('invoiceList.add') }} </router-link>
					</div>
				</ToolTip>
			</div>

			<!-- invoice list Seeker -->
			<new-data-table
				:data="invoiceList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInvoiceCount"
				:max-items="maxItemsPerPage"
				@sort="handleSort"
				@change-page="handleChangePage"
				class="large-table searchbar_table px-0"
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
									id="navbarDropdownTeamInvoice"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownTeamInvoiceAria">
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
						<div class="d-md-flex align-items-center select-date-range mb-xl-0 mb-2">
							<div class="mb-lg-0 mb-2 w-30 ml-2 mr-3">
								<label for="dateRange"> {{ t('invoiceList.leInvoice.invoiceList.selectDateRange') }}</label>
								<v-date-picker @input="dateRangeSelect.handleChange" @blur="dateRangeSelect.handleBlur" v-model="dateRangeSelect.value" :masks="{ input: 'DD.MM.YYYY' }" is-range>
									<template v-slot="{ inputValue, inputEvents }">
										<input :value="inputValue.start" v-on="inputEvents.start" class="border input_wrap focus:outline-none focus:border-indigo-300" readonly />
										<svg class="w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
										</svg>
										<input :value="inputValue.end" v-on="inputEvents.end" class="border input_wrap focus:outline-none focus:border-indigo-300" readonly />
									</template>
								</v-date-picker>
							</div>
							<div class="w-23 mr-4">
								<label>{{t('invoiceList.Group')}}</label>
								<div class="select-drop">
									<div class="select-employee">
										<Multiselect
											id="shardTypeId"
											class="form-group bg-white"
											@input="teamId.handleChange"
											@blur="teamId.handleBlur"
											:placeholder="
												t('validation.selectField', {
													field: 'fieldList.selectTeamGroup',
												})
											"
											:searchable="true"
											v-model="teamId.value"
											:options="teamGroupList"
											@change="getInvoiceTeamWise($event)"
											label="team_name"
											mode="single"
											:canDeselect="true"
											trackBy="team_name"
										/>
									</div>
								</div>
							</div>
							<div class="mr-2 mb-lg-0 mb-2 w-23">
								<label for="statwusFilter" class="statwusFilter-label"> {{ t('common.status') }}</label>
								<div class="w-100">
									<Multiselect
										id="statwusFilter"
										class="form-group"
										@input="invoiceStaus.handleChange"
										@blur="invoiceStaus.handleBlur"
										:placeholder="
											t('validation.selectField', {
												field: 'fieldList.selectStatus',
											})
										"
										v-model="invoiceStaus.value"
										:options="invoiceFilterStatus.map(x=>({...x, label: t(x.label)}))"
										mode="single"
									/>
								</div>
							</div>
						</div>
					</div>
				</template>

				<template #thead>
					<new-tb-th sort-key="created_at">{{ t('fieldList.creationOn') }}</new-tb-th>
					<new-tb-th sort-key="due_date">{{ t('invoiceList.dueDate') }}</new-tb-th>
					<new-tb-th sort-key="invoice_number">{{ t('invoiceList.invoiceId') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.teamName') }}</new-tb-th>
					<new-tb-th sort-key="company_name">{{ t('invoiceList.invoiceTo') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.totalInvoice') }}</new-tb-th>
					<new-tb-th sort-key="approved">{{ t('invoiceList.status') }}</new-tb-th>
					<new-tb-th sort-key="payment_status">{{ t('invoiceList.payment_status') }}</new-tb-th>
					<new-tb-th>{{ t('common.actions') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
						<new-tb-td>{{ dateFormat(tr.due_date) || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.team?.team_name || '-' }}</new-tb-td>
						<new-tb-td>{{ (tr.team_invoice_company && tr.team_invoice_company.company_name) || '-' }} </new-tb-td>
						<new-tb-td>€ {{ tr.mark_as_wrong == true ? -currencyConverture(tr.company_pay_amount) : currencyConverture(tr.company_pay_amount) }}</new-tb-td>
						<new-tb-td>
							<div v-if="tr.mark_as_wrong">
								<div class="tbl-status">
									<span class="grey-edit-bg d-flex align-items-center justify-content-center">
										<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
									</span>
								</div>
							</div>
							<div v-else>
								<div class="tbl-status" v-if="!tr.approved">
									<span class="sts-wait d-flex align-items-center justify-content-center">
										<FontAwesomeIcon :icon="clockIcon" class="me-2" />
										<p>{{ t('invoiceList.Waiting') }}</p>
									</span>
								</div>
								<div class="tbl-status" v-else>
									<span class="sts-approve d-flex align-items-center justify-content-center">
										<FontAwesomeIcon :icon="approveIcon" class="me-2" />
										<p>{{ t('invoiceList.Approved') }}</p>
									</span>
								</div>
							</div>
						</new-tb-td>
						<new-tb-td>
							<div class="tbl-status">
								<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.payment_status === 'paid'">
									<FontAwesomeIcon :icon="approveIcon" class="me-2" />
									<p>{{ t('invoiceList.Paid') }}</p>
								</span>
								<span class="sts-reject d-flex align-items-center justify-content-center" v-else-if="tr.payment_status === 'unpaid'">
									<FontAwesomeIcon :icon="clockIcon" class="me-2" />
									<p>{{ t('invoiceList.Unpaid') }}</p>
								</span>
								<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
									<FontAwesomeIcon :icon="partPaymentIcon" class="me-2" />
									<p>{{ t('invoiceList.partiallyPaid') }}</p>
								</span>
							</div>
						</new-tb-td>
						<new-tb-td>
							<div v-if="!tr.approved && tr.payment_status === 'unpaid' && seekerId.jobSeeker.id === tr.team.createdById" class="d-flex align-items-center justify-content-center">
								<span v-if="tr.mark_as_wrong">
									<ToolTip :title="t('toolTip.markAsCredited')">
										<button class="tbl-action grey-edit-grey" @click="updateTeamMarkAsWrong(tr.id, false)">
											<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</span>
								<span v-else>
									<ToolTip :title="t('toolTip.markAsWrong')">
										<button class="tbl-action approve-icon" @click="updateTeamMarkAsWrong(tr.id, true)">
											<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</span>
								<ToolTip :title="t('toolTip.viewTeamInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="viewSeekerTeamInvoiceDetail(tr.id)">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.editTeamInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="editTeamInvoice(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.deleteTeamInvoice')">
									<button class="tbl-action red-close ml-1" @click="deleteInvoice(tr.id)">
										<FontAwesomeIcon :icon="deleteIcon" />
									</button>
								</ToolTip>
							</div>
							<div v-else class="d-flex align-items-center justify-content-center">
								<ToolTip :title="t('toolTip.markAsCredited')">
									<button class="tbl-action grey-edit-grey">
										<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.viewTeamInvoice')">
									<button class="tbl-action grey-edit ml-1 " @click="viewSeekerTeamInvoiceDetail(tr.id)">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.editTeamInvoice')">
									<button class="tbl-action grey-edit-grey ml-1" @click="editTeamInvoice(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>
								<ToolTip :title="t('toolTip.deleteTeamInvoice')">
									<button class="tbl-action red-close grey-edit-grey ml-1" @click="deleteInvoice(tr.id)">
										<FontAwesomeIcon :icon="deleteIcon" />
									</button>
								</ToolTip>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>

			<div class="px-0">
				<new-data-table
					:data="invoiceList"
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
						<div class="select__limit mb-lg-0 mb-sm-2">
							<div class="d-lg-flex d-sm-block d-flex justify-content-start mb-sm-0 mb-2 align-items-center text-start w-100">
								<div>
									<label class="mb-sm-2 mb-1">{{ t('common.Rows') }}</label>
									<div class="dropdown ml-0 mr-lg-3 mr-2 mb-lg-0 mb-sm-2 mb-0">
										<a
											class="
												dropdown-toggle
												btn-common btn-gray-border
												tbl-drop
											"
											href="#"
											id="navbarDropdownTeamInvoiceMobile"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<p class="d-inline-block head">{{ t('common.Showing') }}</p>
											<span class="ml-2">{{ maxItemsPerPage }}</span>
										</a>
										<ul class="dropdown-menu" aria-labelledby="navbarDropdownTeamInvoiceMobileAria">
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
								<div class="w-100 ml-xl-2 mr-sm-2">
									<label for="dateRange" class="mb-sm-2 mb-1"> {{ t('invoiceList.leInvoice.invoiceList.selectDateRange') }}</label>

									<v-date-picker @input="dateRangeSelect.handleChange" @blur="dateRangeSelect.handleBlur" v-model="dateRangeSelect.value" :masks="{ input: 'DD.MM.YYYY' }" is-range>
										<template v-slot="{ inputValue, inputEvents }">
											<input :value="inputValue.start" v-on="inputEvents.start" class="border w-44 input_wrap focus:outline-none focus:border-indigo-300" />
											<svg class="w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
											</svg>
											<input :value="inputValue.end" v-on="inputEvents.end" class="border w-44 input_wrap focus:outline-none focus:border-indigo-300" />
										</template>
									</v-date-picker>
								</div>
							</div>

							<div class="d-md-flex align-items-start select-date-range text-start w-100">
								<div class="w-100 d-flex align-items-end">
									<div class="mr-2 w-60">
										<label class="mb-sm-2 mb-1">{{t('invoiceList.Group')}}</label>
										<div class="select-drop">
											<div class="select-employee">
												<Multiselect
													id="shardTypeId"
													class="form-group bg-white"
													@input="teamId.handleChange"
													@blur="teamId.handleBlur"
													:placeholder="
														t('validation.selectField', {
															field: 'fieldList.selectTeamGroup',
														})
													"
													:searchable="true"
													v-model="teamId.value"
													:options="teamGroupList"
													@change="getInvoiceTeamWise($event)"
													label="team_name"
													mode="single"
													:canDeselect="true"
													trackBy="team_name"
												/>
											</div>
										</div>
									</div>
									<div class="mr-sm-2 w-60">
										<label for="statwusFilter" class="statwusFilter-label mb-sm-2 mb-1"> {{ t('common.status') }}</label>
										<div>
											<Multiselect
												id="statwusFilter"
												class="form-group"
												@input="invoiceStaus.handleChange"
												@blur="invoiceStaus.handleBlur"
												:placeholder="
													t('validation.selectField', {
														field: 'fieldList.selectStatus',
													})
												"
												v-model="invoiceStaus.value"
												:options="invoiceFilterStatus.map(x=>({...x, label: t(x.label)}))"
												mode="single"
											/>
										</div>
									</div>
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
											<div>
												{{ dateFormat(tr.created_at) || '-' }}
											</div>
											<div>
												{{ dateFormat(tr.due_date) || '-' }}
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
											<new-tb-th>{{ t('invoiceList.invoiceId') }}</new-tb-th>

											<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.teamName') }}</new-tb-th>

											<new-tb-td>{{ tr.team?.team_name || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceTo') }}</new-tb-th>

											<new-tb-td>{{ (tr.team_invoice_company && tr.team_invoice_company.company_name) || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.totalInvoice') }}</new-tb-th>

											<new-tb-td>€ {{ tr.mark_as_wrong == true ? -currencyConverture(tr.company_pay_amount) : currencyConverture(tr.company_pay_amount) }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.status') }}</new-tb-th>

											<new-tb-td>
												<div v-if="tr.mark_as_wrong">
													<div class="tbl-status">
														<span class="sts-wait d-flex align-items-center justify-content-center">
															<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
														</span>
													</div>
												</div>
												<div v-else>
													<div class="tbl-status" v-if="!tr.approved">
														<span class="sts-wait d-flex align-items-center justify-content-center">
															<FontAwesomeIcon :icon="clockIcon" class="me-2" />
															<p>{{ t('invoiceList.Waiting') }}</p>
														</span>
													</div>
													<div class="tbl-status" v-else>
														<span class="sts-approve d-flex align-items-center justify-content-center">
															<FontAwesomeIcon :icon="approveIcon" class="me-2" />
															<p>{{ t('invoiceList.Approved') }}</p>
														</span>
													</div>
												</div>
											</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.payment_status') }}</new-tb-th>

											<new-tb-td>
												<div class="tbl-status">
													<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.payment_status === 'paid'">
														<FontAwesomeIcon :icon="approveIcon" class="me-2" />
														<p>{{ t('invoiceList.Paid') }}</p>
													</span>
													<span class="sts-reject d-flex align-items-center justify-content-center" v-else-if="tr.payment_status === 'unpaid'">
														<FontAwesomeIcon :icon="clockIcon" class="me-2" />
														<p>{{ t('invoiceList.Unpaid') }}</p>
													</span>
													<span class="sts-wait d-flex align-items-center justify-content-center" v-else>
														<FontAwesomeIcon :icon="partPaymentIcon" class="me-2" />
														<p>{{ t('invoiceList.partiallyPaid') }}</p>
													</span>
												</div>
											</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('common.actions') }}</new-tb-th>

											<new-tb-td>
												<div v-if="!tr.approved && seekerId.jobSeeker.id === tr.team.createdById" class="d-flex align-items-center justify-content-start">
													<span v-if="tr.mark_as_wrong">
														<ToolTip :title="t('toolTip.markAsCredited')">
															<button class="tbl-action grey-edit-grey" @click="updateTeamMarkAsWrong(tr.id, false)">
																<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</span>
													<span v-else>
														<ToolTip :title="t('toolTip.markAsCredited')">
															<button class="tbl-action approve-icon" @click="updateTeamMarkAsWrong(tr.id, true)">
																<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</span>
													<button class="tbl-action grey-edit ml-1" @click="viewSeekerTeamInvoiceDetail(tr.id)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</button>

													<button class="tbl-action grey-edit ml-1" @click="editTeamInvoice(tr.id)">
														<FontAwesomeIcon :icon="editIcon" />
													</button>

													<button class="tbl-action red-close  ml-1" @click="deleteInvoice(tr.id)">
														<FontAwesomeIcon :icon="deleteIcon" />
													</button>
												</div>

												<div v-else class="d-flex align-items-center justify-content-start">
													<ToolTip :title="t('toolTip.markAsCredited')">
														<button class="tbl-action grey-edit-grey ml-1">
															<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.viewTeamInvoice')">
														<button class="tbl-action grey-edit ml-1" @click="viewSeekerTeamInvoiceDetail(tr.id)">
															<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.deleteTeamInvoice')">
														<button class="tbl-action grey-edit-grey ml-1" @click="editTeamInvoice(tr.id)">
															<FontAwesomeIcon :icon="editIcon" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.deleteTeamInvoice')">
														<button class="tbl-action red-close grey-edit-grey ml-1" @click="deleteInvoice(tr.id)">
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
		<!-- invoice list Seeker End -->

		<!-- Team invoice list Company Start -->
		<div class="row" v-if="userTypeInfo == 'company'">
			<div class="table-header">
				<div class="payment-pill-header">
					<div class="pph-left">
						<h5 class="title-lg">{{ t('invoiceList.teamtitle') }}</h5>
					</div>
				</div>
				<div class="select__limit mobile_table_header">
					<div class="dropdown ml-0">
						<a
							class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
							href="#"
							id="navbarDropdownCmp"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<p class="d-inline-block head">{{ t('common.Showing') }}</p>
							<span class="ml-2">{{ maxItemsPerPage }}</span>
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownAriaCmp">
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

			<new-data-table
				:data="companyTeamInvoiceList"
				sst
				pagination
				search
				@search="updateSearchQuery"
				:total="totalInvoiceCountCompany"
				:max-items="maxItemsPerPage"
				@change-page="handleChangePage"
				class="large-table table-overflow searchbar_table"
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
									id="navbarDropdownCmp"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownAriaCmp">
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
					<new-tb-th>{{ t('invoiceList.dueDate') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.invoiceId') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.invoiceDate') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.invoiceBy') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.totalsum') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.showInvoice') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.status') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.payment_status') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.markAsWrong') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.due_date) || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
						<new-tb-td>{{ dateFormat(tr.created_navat) || '-' }}</new-tb-td>
						<new-tb-td>{{ (tr.team && tr.team.created_by && tr.team.created_by.user.full_name) || '-' }} </new-tb-td>
						<new-tb-td>€ {{ tr.mark_as_wrong == true ? -currencyConverture(tr.sub_total) : currencyConverture(tr.sub_total) }}</new-tb-td>
						<new-tb-td>
							<ToolTip :title="t('toolTip.viewInvoice')">
								<button class="tbl-action grey-edit mx-auto" @click="viewCompanyInvoiceDetail(tr)">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
						</new-tb-td>
						<new-tb-td>
							<div v-if="tr.mark_as_wrong">
								<div class="tbl-status">
									<span class="grey-edit-bg d-flex align-items-center justify-content-center">
										<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
									</span>
								</div>
							</div>
							<div v-else>
								<div class="tbl-status" v-if="!tr.approved">
									<span class="sts-wait d-flex align-items-center justify-content-center">
										<FontAwesomeIcon :icon="clockIcon" class="me-1" />
										<p>{{ t('invoiceList.Waiting') }}</p>
									</span>
								</div>
								<div class="tbl-status" v-else>
									<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.payment_status === 'paid'">
										<FontAwesomeIcon :icon="approveIcon" class="me-1" />
										<p>{{ t('invoiceList.Paid') }}</p>
									</span>
									<span class="sts-approve d-flex align-items-center justify-content-center" v-else>
										<FontAwesomeIcon :icon="approveIcon" class="me-1" />
										<p>{{ t('invoiceList.Approved') }}</p>
									</span>
								</div>
							</div>
						</new-tb-td>
						<new-tb-td>
							<div class="tbl-status">
								<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.payment_status === 'paid'">
									<FontAwesomeIcon :icon="approveIcon" class="me-2" />
									<p>{{ t('invoiceList.Paid') }}</p>
								</span>
								<span class="sts-reject  d-flex align-items-center justify-content-center" v-else-if="tr.payment_status === 'unpaid'">
									<FontAwesomeIcon :icon="clockIcon" class="me-2" />
									<p>{{ t('invoiceList.Unpaid') }}</p>
								</span>
								<span class="sts-wait  d-flex align-items-center justify-content-center" v-else>
									<FontAwesomeIcon :icon="partPaymentIcon" class="me-2" />
									<p>{{ t('invoiceList.partiallyPaid') }}</p>
								</span>
							</div>
						</new-tb-td>
						<new-tb-td>
							<div class="d-flex">
								<ToolTip :title="t('toolTip.sendRevision')">
									<button class="tbl-action bg-orange ml-2" @click="handleRevisionNote(tr.id)">
										<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
									</button>
								</ToolTip>
								<div>
									<div v-if="!tr.approved" class="d-flex align-items-center justify-content-end">
										<span v-if="tr.req_mark_as_wrong">
											<span class="d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.markAsWrongPending')">
													<button class="tbl-action grey-edit-grey ml-2">
														<FontAwesomeIcon :icon="PanndingIcon" class="me-1" />
													</button>
												</ToolTip>
											</span>
										</span>
										<span v-else>
											<span v-if="tr.mark_as_wrong">
												<ToolTip :title="t('toolTip.markAsWrong')">
													<button class="tbl-action grey-edit-grey ml-2">
														<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
													</button>
												</ToolTip>
											</span>
											<span v-else>
												<ToolTip :title="t('toolTip.markAsWrong')">
													<button class="tbl-action ml-2 disapprove-icon" @click="updateMarkAsWrongCompany(tr.id)">
														<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
													</button>
												</ToolTip>
											</span>
										</span>
									</div>
									<div v-else class="d-flex align-items-center justify-content-end">
										<ToolTip :title="t('toolTip.markAsWrong')">
											<button class="tbl-action grey-edit-grey ml-2">
												<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
											</button>
										</ToolTip>
									</div>
								</div>
							</div>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>

			<div>
				<new-data-table
					:data="companyTeamInvoiceList"
					sst
					pagination
					search
					@search="updateSearchQuery"
					:total="totalInvoiceCountCompany"
					:max-items="maxItemsPerPage"
					@change-page="handleChangePage"
					class="responsive-table searchbar_table"
				>
					<template #header>
						<div class="select__limit desktop_table_header">
							<div class="dropdown ml-0">
								<a
									class="
									dropdown-toggle
									btn-common btn-gray-border
									tbl-drop
								"
									href="#"
									id="navbarDropdownCmpMobile"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownCmpMobileAria">
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
												{{ dateFormat(tr.created_at) || '-' }}
											</div>
											<div>
												{{ tr.due_date || '-' }}
											</div>
										</div>
									</div>

									<div class="d-flex align-items-center">
										<div v-if="tr.mark_as_wrong">
											<div class="tbl-status">
												<span class="grey-edit-bg d-flex align-items-center justify-content-center">
													<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
												</span>
											</div>
										</div>
										<div v-else>
											<div class="tbl-status" v-if="!tr.approved">
												<span class="sts-wait d-flex align-items-center justify-content-center">
													<FontAwesomeIcon :icon="clockIcon" class="me-1" />
													<p>{{ t('invoiceList.Waiting') }}</p>
												</span>
											</div>
											<div class="tbl-status" v-else>
												<span class="sts-approve d-flex align-items-center justify-content-center" v-if="tr.payment_status === 'paid'">
													<FontAwesomeIcon :icon="approveIcon" class="me-1" />
													<p>{{ t('invoiceList.Paid') }}</p>
												</span>
												<span class="sts-approve d-flex align-items-center justify-content-center" v-else>
													<FontAwesomeIcon :icon="approveIcon" class="me-1" />
													<p>{{ t('invoiceList.Approved') }}</p>
												</span>
											</div>
										</div>
										<div class="ml-3">
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
											<new-tb-th>{{ t('invoiceList.dueDate') }}</new-tb-th>
											<new-tb-td>{{ tr.due_date || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceId') }}</new-tb-th>

											<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceDate') }}</new-tb-th>

											<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceBy') }}</new-tb-th>

											<new-tb-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.totalsum') }}</new-tb-th>

											<new-tb-td>€ {{ tr.mark_as_wrong == true ? -currencyConverture(tr.sub_total) : currencyConverture(tr.sub_total) }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.showInvoice') }}</new-tb-th>

											<new-tb-td>
												<ToolTip :title="t('toolTip.viewInvoice')">
													<div class="tbl-action grey-edit" @click="viewCompanyInvoiceDetail(tr)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</div>
												</ToolTip>
											</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.markAsWrong') }}</new-tb-th>
											<new-tb-td>
												<div class="d-flex">
													<ToolTip :title="t('toolTip.sendRevision')">
														<button class="tbl-action bg-orange ml-2" @click="handleRevisionNote(tr.id)">
															<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<div>
														<div v-if="!tr.approved" class="d-flex align-items-center justify-content-end">
															<span v-if="tr.req_mark_as_wrong">
																<span class="sts-wait d-flex align-items-center justify-content-center">
																	<ToolTip :title="t('toolTip.markAsWrongPending')">
																		<button class="tbl-action grey-edit-grey ml-2">
																			<FontAwesomeIcon :icon="PanndingIcon" class="me-1" />
																		</button>
																	</ToolTip>
																</span>
															</span>
															<span v-else>
																<span v-if="tr.mark_as_wrong">
																	<ToolTip :title="t('toolTip.markAsWrong')">
																		<button class="tbl-action grey-edit-grey ml-2">
																			<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
																		</button>
																	</ToolTip>
																</span>
																<span v-else>
																	<ToolTip :title="t('toolTip.markAsWrong')">
																		<button class="tbl-action ml-2 disapprove-icon" @click="updateMarkAsWrongCompany(tr.id)">
																			<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
																		</button>
																	</ToolTip>
																</span>
															</span>
														</div>
														<div v-else class="d-flex align-items-center justify-content-end">
															<ToolTip :title="t('toolTip.markAsWrong')">
																<button class="tbl-action grey-edit-grey ml-2">
																	<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
																</button>
															</ToolTip>
														</div>
													</div>
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
		<!-- Team invoice list Company end -->
	</div>
	<!-- Send for revision -->
	<Suspense v-if="showRevisionNoteModal.value">
		<template #default>
			<add-revision-note v-model:isModalShow="showRevisionNoteModal" :invoiceId="invoiceId" @newAddedRevisionNote="fetchCompanyTeamInvoices" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTrashAlt, faEye, faDownload, faThumbsUp, faClock, faTimes, faChevronDown, faChevronUp, faThumbsDown, faHourglassStart, faUndo, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { invoiceFilterStatus } from '@/utils/enums.js'; //
import * as yup from 'yup';
import Multiselect from '@vueform/multiselect';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
const AddRevisionNote = defineAsyncComponent(async () => {
	return import('@/views/teamInvoice/components/RevisionNoteModal.vue' /* webpackChunkName:"UploadContract" */);
});
export default {
	name: 'TeamInvoiceList',

	components: {
		FontAwesomeIcon,
		Multiselect,
		DefaultLoader,
		AddRevisionNote,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const tableIndex = ref(0);
		const invoiceId = ref(null);
		const isRevisionNoteModal = ref(false);

		// icons
		const trashIcon = faTrashAlt;
		const editIcon = faEdit;
		const viewIcon = faEye;
		const downloadIcon = faDownload;
		const approveIcon = faThumbsUp;
		const clockIcon = faClock;
		const deleteIcon = faTimes;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const createdSign = faEuroSign;
		const order = ref(null);
		const thumbsUp = faThumbsUp;
		const ClockRotateLeft = faUndo;
		const thumbsDown = faThumbsDown;
		const PanndingIcon = faHourglassStart;
		const startDate = ref(null);
		const endDate = ref(null);
		const status = ref(null);
		const partPaymentIcon = faHourglassStart;

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		//Catyegory field
		const teamId = reactive(useField('teamId', undefined, { initialValue: null }));

		// form schema validation
		const profileSchema = yup.object({
			date_range: yup.date().nullable(),
			staus: yup.string().nullable(),
		});

		// form validation intialize
		const { meta: formMeta } = useForm({
			validationSchema: profileSchema,
		});

		// form fields

		const dateRangeSelect = reactive(
			useField('date_range', undefined, {
				initialValue: {
					range: {
						start: new Date(2020, 0, 1),
						end: new Date(2020, 0, 5),
					},
				},
			}),
		);
		const invoiceStaus = reactive(useField('status', undefined, { initialValue: '' }));

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			localStorage.removeItem('workDetails');
			localStorage.removeItem('invoiceWorkDetails');
			// fetch logged users invoices
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
				store.dispatch('teamInvoice/getAllTeamInvoiceGroup');
			} else {
				fetchCompanyTeamInvoices();
			}
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		const seekerId = computed(() => store.state.auth.userProfile);
		// invoice list seeker
		const invoiceList = computed(() => store.getters['teamInvoice/getJobSeekerInvoiceList']);
		// invoice list Company
		const companyTeamInvoiceList = computed(() => store.getters['teamInvoice/getCompanyTeamInvoiceList']);
		// total invoice count
		const totalInvoiceCount = computed(() => store.state.teamInvoice.totalInvoices);
		// total invoice count company
		const totalInvoiceCountCompany = computed(() => store.state.teamInvoice.totalTeamInvoicesComapny);

		// get team group list
		const teamGroupList = computed(() => {
			return store.getters['teamInvoice/getTeamGroupOptions'];
		});

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);

		if (userTypeInfo.value == 'jobseeker') {
			document.title = `${t('sidebar.teamInvoiceList')} - Way2Work`;
		} else {
			document.title = `${t('sidebar.allTeamInvoices')} - Way2Work`;
		}
		/**
		 * Methods
		 * *******************************************************************
		 */
		// fetch logged users invoices
		const fetchInvoices = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
				startDate: startDate.value,
				endDate: endDate.value,
				status: status.value,
				teamId: teamId.value,
			};

			store.dispatch('teamInvoice/getJobSeekersInvoices', payload);
		};

		//view seeker invoice details
		const viewSeekerTeamInvoiceDetail = id => {
			router.push({
				name: 'ViewTeamInvoiceSeekerDetail',
				params: { id: id },
			});
		};

		//Company
		// fetch logged users invoices Company
		const fetchCompanyTeamInvoices = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				order: order.value,
				search: search.value,
			};

			store.dispatch('teamInvoice/getCompanyTeamInvoices', payload);
		};

		// show upload my document model
		const showRevisionNoteModal = computed({
			get() {
				return isRevisionNoteModal;
			},
			set(val) {
				isRevisionNoteModal.value = val;
			},
		});

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyTeamInvoices();
			}
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchInvoices();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyTeamInvoices();
			}
		};

		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyTeamInvoices();
			}
		};

		//add mark as wrong
		const updateTeamMarkAsWrong = (invoiceId, flag) => {
			const payload = {
				type: 'mark_as_wrong',
				mark_as_wrong: flag,
			};
			store
				.dispatch('teamInvoice/teamInvoicesMarkAsWrong', {
					id: invoiceId,
					payload: payload,
				})
				.then(() => {
					fetchInvoices();
				});
		};

		const updateMarkAsWrongCompany = id => {
			store.dispatch('teamInvoice/teamInvoicesMarkAsWrongCompany', id).then(() => {
				fetchCompanyTeamInvoices();
			});
		};

		// delete invoice
		const deleteInvoice = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text: t('validation.youWantDelete',{
					field:'conformationMessage.invoice'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('teamInvoice/deleteTeamInvoice', id).then(() => {
						fetchInvoices();
					});
				}
			});
		};

		// edit invoice
		const editTeamInvoice = id => {
			router.push({ name: 'Edit Team Invoice', params: { id } });
		};

		//View company invoice details
		const viewCompanyInvoiceDetail = data => {
			router.push({
				name: 'ViewCompanyTeamInvoiceDetail',
				params: { id: data.id },
			});
		};

		const getInvoiceTeamWise = val => {
			teamId.value = val ?? '';
			fetchInvoices();
		};

		const handleRevisionNote = id => {
			invoiceId.value = id;
			showRevisionNoteModal.value = true;
			isRevisionNoteModal.value = true;
		};

		/**
		 * Watch
		 * *******************************************************************
		 */
		// date range is filter

		watch(
			() => dateRangeSelect.value,
			() => {
				startDate.value = moment(dateRangeSelect.value.start).format('YYYY/MM/DD');
				endDate.value = moment(dateRangeSelect.value.end).format('YYYY/MM/DD');
				fetchInvoices();
			},
		);
		// status wise filter
		watch(
			() => invoiceStaus.value,
			() => {
				status.value = invoiceStaus.value;
				fetchInvoices();
			},
		);

		return {
			handleRevisionNote,
			// refs
			maxItemsPerPage,
			dateFormat,
			currencyConverture,
			t,
			tableIndex,
			teamId,
			invoiceId,

			dateRangeSelect,
			formMeta,
			invoiceFilterStatus,
			invoiceStaus,

			// icons
			trashIcon,
			editIcon,
			viewIcon,
			downloadIcon,
			approveIcon,
			clockIcon,
			deleteIcon,
			arrowDown,
			arrowUp,
			thumbsUp,
			thumbsDown,
			PanndingIcon,
			partPaymentIcon,
			ClockRotateLeft,
			createdSign,

			// computed
			invoiceList,
			totalInvoiceCount,
			userTypeInfo,
			companyTeamInvoiceList,
			totalInvoiceCountCompany,
			teamGroupList,
			seekerId,
			showRevisionNoteModal,
			isRevisionNoteModal,

			// methods
			handleChangePage,
			updateSearchQuery,
			changePerPageMaxItems,
			deleteInvoice,
			editTeamInvoice,
			viewCompanyInvoiceDetail,
			openTable,
			viewSeekerTeamInvoiceDetail,
			getInvoiceTeamWise,
			handleSort,
			updateTeamMarkAsWrong,
			updateMarkAsWrongCompany,
			fetchCompanyTeamInvoices,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.invoice__list {
	.multiselect-input {
		border: none !important;
	}
	.payment-pill-header {
		text-align: start;
	}
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
	}

	.btn-red {
		white-space: nowrap;
	}
	.expand-table {
		th {
			width: 7% !important;
		}

		td {
			width: 20% !important;
		}
	}
}

.select__limit {
	@media (max-width: 575px) {
		display: block;

		label {
			font-size: 14px;
		}
	}
}

@media (max-width: 1024px) {
	.input_wrap {
		padding: 8px;
	}
}

@media (max-width: 575px) {
	.searchbar_table {
		.dropdown {
			.tbl-drop {
				height: 42px;
			}
		}
		.input_wrap {
			height: 42px;
		}
	}
}

.payment-pill-header {
	.select-drop {
		width: 100%;
		max-width: 350px;

		@media (max-width: 1024px) {
			width: 100%;
			margin: 0 auto;
		}

		@media (max-width: 575px) {
			margin: 10px 0;
			max-width: 190px;
		}
	}

	.pph-right {
		@media (max-width: 1024px) {
			margin-top: 5px !important;
		}
	}
}

.bg-orange {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #fca556 !important;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: #fff;
	}

	@media (max-width: 576px) {
		width: 35px;
		height: 35px;
		line-height: 35px;
	}
}

.select-date-range {
	.w-70 {
		@media (max-width: 768px) {
			width: 100%;
		}
	}
}

.radius-full {
	border-radius: 50px !important;
}

.select__limit {
	align-items: end;
	@media (max-width: 575px) {
		display: block;
	}
}
</style>
<style lang="scss">
@media (max-width: 575px) {
	.invoice__list {
		.payment-pill-header {
			display: flex !important;
			margin-bottom: 0.5rem;

			.pph-right {
				margin-top: 0px !important;
			}
		}
	}
}
</style>
