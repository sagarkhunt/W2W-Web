<template>
	<div class="invoice__list card-space">
		<!-- invoice list Seeker -->
		<div class="row mx-0" v-if="userTypeInfo == 'jobseeker'">
			<!-- header -->
			<div class="payment-pill-header px-0">
				<div class="pph-left">
					<h5 class="title-lg">{{ t('invoiceList.titleSeeker') }}</h5>
				</div>

				<div class="d-flex align-items-center justify-content-center">
					<ToolTip :title="t('toolTip.addInvoice')">
						<div class="pph-right ms-3">
							<router-link to="/invoices/add" class="btn-common btn-red">+ {{ t('invoiceList.add') }} </router-link>
						</div>
					</ToolTip>
				</div>
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
									id="navbarDropdownInv"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<p class="d-inline-block head">{{ t('common.Showing') }}</p>
									<span class="ml-2">{{ maxItemsPerPage }}</span>
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdownAriaInv">
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
							<div class="mb-lg-0 mb-2 w-48 ml-2">
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

							<div class="mr-2 mb-lg-0 mb-2 w-33">
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
					<new-tb-th sort-key="company_name">{{ t('invoiceList.invoiceTo') }}</new-tb-th>
					<new-tb-th sort-key="approved">{{ t('invoiceList.status') }}</new-tb-th>
					<new-tb-th sort-key="payment_status">{{ t('invoiceList.payment_status') }}</new-tb-th>
					<new-tb-th sort-key="sub_total">{{ t('invoiceList.totalsum') }}</new-tb-th>
					<new-tb-th>{{ t('common.actions') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
						<new-tb-td>{{ dateFormat(tr.due_date) || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
						<new-tb-td>{{ (tr.company && tr.company.company_name) || '-' }}</new-tb-td>
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
						<new-tb-td>€ {{ `${tr.mark_as_wrong ? `-` : ''}` + currencyConverture(tr.company_pay_amount) }} </new-tb-td>
						<new-tb-td>
							<div v-if="!tr.approved" class="d-flex align-items-center justify-content-center">
								<span v-if="tr.mark_as_wrong">
									<ToolTip :title="t('toolTip.markAsWrong')">
										<button class="tbl-action grey-edit-grey">
											<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</span>
								<span v-else>
									<ToolTip :title="t('toolTip.markAsWrong')">
										<button class="tbl-action approve-icon" @click="updateMarkAsWrong(tr.id, true)">
											<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</span>
								<ToolTip :title="t('toolTip.copyInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="copywSeekerInvoiceDetail(tr.id)">
										<FontAwesomeIcon :icon="copyIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.viewInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="viewSeekerInvoiceDetail(tr.id)">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.editInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="editInvoice(tr.id)">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.deleteInvoice')">
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
								<ToolTip :title="t('toolTip.copyInvoice')">
									<button class="tbl-action grey-edit-grey ml-1">
										<FontAwesomeIcon :icon="copyIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.viewInvoice')">
									<button class="tbl-action grey-edit ml-1" @click="viewSeekerInvoiceDetail(tr.id)">
										<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.editInvoice')">
									<button class="tbl-action grey-edit-grey ml-1" :disabled="tr.approved">
										<FontAwesomeIcon :icon="editIcon" />
									</button>
								</ToolTip>

								<ToolTip :title="t('toolTip.deleteInvoice')">
									<button class="tbl-action grey-edit-grey red-close ml-1" :disabled="tr.approved">
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
							<div class="d-flex justify-content-start mb-sm-0 mb-2 align-items-center text-start">
								<div>
									<label class="mb-sm-2 mb-1">{{ t('common.Rows') }}</label>
									<div class="dropdown ml-0 mr-lg-3 mr-2">
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
								<div class="w-70 mr-lg-3">
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

							<div class="d-md-flex align-items-center select-date-range w-100 text-start">
								<div class="w-100">
									<div class="mr-sm-2">
										<label for="statwusFilter" class="statwusFilter-label mb-sm-2 mb-1"> {{ t('common.status') }}</label>
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
						</div>
					</template>

					<template #data="scopedData" ref="tableBody">
						<new-tb-tr class="invoice__row expand-table" :key="i" v-for="(tr, i) in scopedData.data">
							<div>
								<div class="d-flex align-items-center justify-content-between collapse-div" @click="openTable(i, item)">
									<div class="d-flex align-items-center justify-content-center">
										<div>
											<div>
												{{ tr.invoice_number || '-' }}
											</div>
											<div>
												{{ dateFormat(tr.due_date) || '-' }}
											</div>
										</div>
									</div>

									<div class="d-flex align-items-center">
										<div v-if="tr.mark_as_wrong">
											<div class="tbl-status">
												<span class="grey-edit-bg d-flex align-items-center justify-content-center px-sm-4">
													<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
												</span>
											</div>
										</div>
										<div class="tbl-status" v-else>
											<div v-if="!tr.approved">
												<span class="sts-wait d-flex align-items-center justify-content-center px-sm-4">
													<FontAwesomeIcon :icon="clockIcon" class="me-1" />
													<p>{{ t('invoiceList.Waiting') }}</p>
												</span>
											</div>
											<span v-else>
												<span class="sts-approve d-flex align-items-center justify-content-center px-sm-4">
													<FontAwesomeIcon :icon="approveIcon" class="me-1" />
													<p>{{ t('invoiceList.Approved') }}</p>
												</span>
											</span>
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
											<new-tb-th>{{ t('invoiceList.invoiceId') }}</new-tb-th>
											<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.invoiceTo') }}</new-tb-th>

											<new-tb-td>{{ (tr.invoice_company && tr.invoice_company.company_name) || '-' }}</new-tb-td>
										</new-tb-tr>
										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.totalsum') }}</new-tb-th>

											<new-tb-td>€{{ `${tr.mark_as_wrong ? `-` : ''}` + currencyConverture(tr.company_pay_amount) }}</new-tb-td>
										</new-tb-tr>

										<new-tb-tr>
											<new-tb-th>{{ t('common.actions') }}</new-tb-th>

											<new-tb-td>
												<div v-if="!tr.approved" class="d-flex align-items-center justify-content-start">
													<span v-if="tr.mark_as_wrong">
														
														<ToolTip :title="t('toolTip.markAsWrong')">
															<button class="tbl-action grey-edit-grey">
																<FontAwesomeIcon :icon="thumbsDown" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</span>
													<span v-else>
														<ToolTip :title="t('toolTip.markAsCredited')">
															<button class="tbl-action ml-2 approve-icon" @click="updateMarkAsWrong(tr.id, true)">
																<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</span>
													<ToolTip :title="t('toolTip.copyInvoice')">
														<button class="tbl-action grey-edit ml-2" @click="copywSeekerInvoiceDetail(tr.id)">
															<FontAwesomeIcon :icon="copyIcon" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.viewInvoice')">
														<button class="tbl-action grey-edit ml-2" @click="viewSeekerInvoiceDetail(tr.id)">
															<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
														</button>
													</ToolTip>

													<ToolTip :title="t('toolTip.editInvoice')">
														<button class="tbl-action grey-edit ml-2" @click="editInvoice(tr.id)">
															<FontAwesomeIcon :icon="editIcon" />
														</button>
													</ToolTip>

													<ToolTip :title="t('toolTip.deletInvoice')">
														<button class="tbl-action red-close ml-2" @click="deleteInvoice(tr.id)">
															<FontAwesomeIcon :icon="deleteIcon" />
														</button>
													</ToolTip>
												</div>

												<div v-else class="d-flex align-items-center justify-content-start">
													
													<ToolTip :title="t('toolTip.markAsCredited')">
														<button class="tbl-action grey-edit-grey">
															<FontAwesomeIcon :icon="createdSign" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.viewInvoice')">
														<button class="tbl-action grey-edit ml-2" @click="viewSeekerInvoiceDetail(tr.id)">
															<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
														</button>
													</ToolTip>
													<ToolTip :title="t('toolTip.copyInvoice')">
														<button class="tbl-action grey-edit ml-2" @click="copywSeekerInvoiceDetail(tr.id)">
															<FontAwesomeIcon :icon="copyIcon" style="text-align: 'center'" />
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

		<!-- invoice list Company Start -->
		<div class="row" v-if="userTypeInfo == 'company'">
			<div class="table-header">
				<div class="payment-pill-header">
					<div class="pph-left">
						<h5 class="title-lg">{{ t('invoiceList.title') }}</h5>
					</div>
				</div>
				<div class="select__limit mobile_table_header">
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
			</div>

			<new-data-table
				:data="companyInvoiceList"
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
					<new-tb-th>{{ t('invoiceList.status') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.payment_status') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.markAsWrong') }}</new-tb-th>
					<new-tb-th>{{ t('invoiceList.showInvoice') }}</new-tb-th>
				</template>

				<template #data="scopedData" ref="tableBody">
					<new-tb-tr class="invoice__row" :key="i" v-for="(tr, i) in scopedData.data">
						<new-tb-td>{{ dateFormat(tr.due_date) || '-' }}</new-tb-td>
						<new-tb-td>{{ tr.invoice_number || '-' }}</new-tb-td>
						<new-tb-td>{{ dateFormat(tr.created_at) || '-' }}</new-tb-td>
						<new-tb-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </new-tb-td>
						<new-tb-td>€ {{ `${tr.mark_as_wrong ? `-` : ''}` + currencyConverture(tr.company_pay_amount) }} </new-tb-td>
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
							<div class="d-flex align-items-center justify-content-md-center">
								<div v-if="tr.under_review">
									<ToolTip :title="t('toolTip.sendRevision')">
										<button class="tbl-action bg-green ml-1">
											<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</div>
								<div v-else>
									<ToolTip :title="t('toolTip.sendRevision')">
										<button class="tbl-action bg-orange ml-1" @click="handleRevisionNote(tr.id)">
											<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
										</button>
									</ToolTip>
								</div>
								<div>
									<div v-if="!tr.approved" class="d-flex align-items-center justify-content-end">
										<span v-if="tr.req_mark_as_wrong">
											<span class="sts-wait d-flex align-items-center justify-content-center">
												<ToolTip :title="t('toolTip.markAsWrongPending')">
													<button class="tbl-action grey-edit-grey ml-1">
														<FontAwesomeIcon :icon="PanndingIcon" class="me-1" />
													</button>
												</ToolTip>
											</span>
										</span>
										<span v-else>
											<span v-if="tr.mark_as_wrong">
												<ToolTip :title="t('toolTip.markAsWrong')">
													<button class="tbl-action grey-edit-grey ml-1">
														<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
													</button>
												</ToolTip>
											</span>
											<span v-else>
												<ToolTip :title="t('toolTip.markAsWrong')">
													<button class="tbl-action ml-1 disapprove-icon" @click="updateMarkAsWrongCompany(tr.id)">
														<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
													</button>
												</ToolTip>
											</span>
										</span>
									</div>

									<div v-else class="d-flex align-items-center justify-content-end">
										<ToolTip :title="t('toolTip.markAsWrong')">
											<button class="tbl-action grey-edit-grey ml-1">
												<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
											</button>
										</ToolTip>
									</div>
								</div>
							</div>
						</new-tb-td>
						<new-tb-td>
							<ToolTip :title="t('toolTip.viewInvoice')">
								<button class="tbl-action grey-edit mx-auto" @click="viewCompanyInvoiceDetail(tr)">
									<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
								</button>
							</ToolTip>
						</new-tb-td>
					</new-tb-tr>
				</template>
			</new-data-table>

			<div>
				<new-data-table
					:data="companyInvoiceList"
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
												<span class="grey-edit-bg d-flex align-items-center justify-content-center px-sm-4">
													<p>{{ t('invoiceList.leInvoice.invoiceList.credited') }}</p>
												</span>
											</div>
										</div>
										<div v-else>
											<div class="tbl-status" v-if="!tr.approved">
												<span class="sts-wait d-flex align-items-center justify-content-center px-sm-4">
													<FontAwesomeIcon :icon="clockIcon" class="me-2" />
													<p>{{ t('invoiceList.Waiting') }}</p>
												</span>
											</div>
											<div class="tbl-status" v-else>
												<span class="sts-approve d-flex align-items-center justify-content-center px-sm-4">
													<FontAwesomeIcon :icon="approveIcon" class="me-2" />
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

											<new-tb-td>€ {{ `${tr.mark_as_wrong ? `-` : ''}` + currencyConverture(tr.company_pay_amount) }}</new-tb-td>
										</new-tb-tr>
										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.markAsWrong') }}</new-tb-th>
											<new-tb-td>
												<div class="d-flex align-items-center justify-content-start ">
													<div v-if="tr.under_review">
														<ToolTip :title="t('toolTip.sendRevision')">
															<button class="tbl-action bg-green me-2">
																<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</div>
													<div v-else>
														<ToolTip :title="t('toolTip.sendRevision')">
															<button class="tbl-action bg-orange me-2" @click="handleRevisionNote(tr.id)">
																<FontAwesomeIcon :icon="ClockRotateLeft" style="text-align: 'center'" />
															</button>
														</ToolTip>
													</div>
													<div>
														<div v-if="!tr.approved" class="d-flex align-items-center justify-content-end">
															<span v-if="tr.req_mark_as_wrong">
																<span class="sts-wait d-flex align-items-center justify-content-center">
																	<ToolTip :title="t('toolTip.markAsWrongPending')">
																		<button class="tbl-action grey-edit-grey">
																			<FontAwesomeIcon :icon="PanndingIcon" class="me-1" />
																		</button>
																	</ToolTip>
																</span>
															</span>
															<span v-else>
																<span v-if="tr.mark_as_wrong">
																	<ToolTip :title="t('toolTip.markAsWrong')">
																		<button class="tbl-action grey-edit-grey">
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
																<button class="tbl-action grey-edit-grey">
																	<FontAwesomeIcon :icon="thumbsUp" style="text-align: 'center'" />
																</button>
															</ToolTip>
														</div>
													</div>
												</div>
											</new-tb-td>
										</new-tb-tr>
										<new-tb-tr>
											<new-tb-th>{{ t('invoiceList.showInvoice') }}</new-tb-th>

											<new-tb-td>
												<ToolTip :title="t('toolTip.viewInvoice')">
													<div class="tbl-action grey-edit-grey" @click="viewCompanyInvoiceDetail(tr)">
														<FontAwesomeIcon :icon="viewIcon" style="text-align: 'center'" />
													</div>
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
		<!-- invoice list Company end -->
		<!-- Send for revision -->
		<Suspense v-if="showRevisionNoteModal.value">
			<template #default>
				<add-revision-note v-model:isModalShow="showRevisionNoteModal" :invoiceId="invoiceId" @newAddedRevisionNote="fetchCompanyInvoices" />
			</template>
			<template #fallback>
				<default-loader />
			</template>
		</Suspense>
	</div>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faEdit,
	faTrashAlt,
	faEye,
	faDownload,
	faThumbsUp,
	faClock,
	faTimes,
	faUsers,
	faChevronDown,
	faChevronUp,
	faCopy,
	faHourglassStart,
	faAngleUp,
	faThumbsDown,
	faUndo,
	faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import { invoiceFilterStatus } from '@/utils/enums.js'; // Invoice filter option options
import Multiselect from '@vueform/multiselect';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
import { useField, useForm } from 'vee-validate';
import moment from 'moment';
const AddRevisionNote = defineAsyncComponent(async () => {
	return import('@/views/invoice/components/RevisionNoteModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'InvoiceList',

	components: {
		FontAwesomeIcon,
		DefaultLoader,
		AddRevisionNote,
		Multiselect,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(5);
		const search = ref(null);
		const order = ref(null);
		const tableIndex = ref(0);
		const invoiceId = ref(null);
		const isRevisionNoteModal = ref(false);
		// icons
		const trashIcon = faTrashAlt;
		const editIcon = faEdit;
		const viewIcon = faEye;
		const downloadIcon = faDownload;
		const approveIcon = faThumbsUp;
		const partPaymentIcon = faHourglassStart;
		const clockIcon = faClock;
		const PanndingIcon = faHourglassStart;
		const deleteIcon = faTimes;
		const groupIcon = faUsers;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;
		const copyIcon = faCopy;
		const upArrow = faAngleUp;
		const thumbsUp = faThumbsUp;
		const thumbsDown = faThumbsDown;
		const ClockRotateLeft = faUndo;
		const startDate = ref(null);
		const endDate = ref(null);
		const status = ref(null);
		const createdSign = faEuroSign;

		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

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
			} else {
				fetchCompanyInvoices();
			}
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// invoice list seeker
		const invoiceList = computed(() => store.getters['invoice/getJobSeekerInvoiceList']);
		// invoice list Company
		const companyInvoiceList = computed(() => store.getters['invoice/getCompanyInvoiceList']);
		// total invoice count
		const totalInvoiceCount = computed(() => store.state.invoice.totalInvoices);
		// total invoice count company
		const totalInvoiceCountCompany = computed(() => store.state.invoice.totalInvoicesComapny);

		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);

		if (userTypeInfo.value == 'jobseeker') {
			document.title = `${t('sidebar.invoiceList')} - Way2Work`;
		} else {
			document.title = `${t('invoiceList.title')} - Way2Work`;
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
				startDate: startDate.value ?? null,
				endDate: endDate.value ?? null,
				status: status.value,
			};

			store.dispatch('invoice/getJobSeekersInvoices', payload);
		};

		//Company
		// fetch logged users invoices Company
		const fetchCompanyInvoices = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};

			store.dispatch('invoice/getCompanyInvoices', payload);
		};

		// handle page change
		const handleChangePage = val => {
			page.value = val;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyInvoices();
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
			page.value = 1;
			search.value = searchKey;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyInvoices();
			}
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

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchInvoices();
			} else {
				fetchCompanyInvoices();
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
					store.dispatch('invoice/deleteInvoice', id).then(() => {
						fetchInvoices();
					});
				}
			});
		};

		// edit invoice
		const editInvoice = id => {
			router.push({ name: 'Edit Invoice', params: { id } });
		};

		//View company invoice details
		const viewCompanyInvoiceDetail = data => {
			store.commit('invoice/SET_STATE', {
				action: 'invoiceCompanyDetail',
				data: data,
			});
			router.push({
				name: 'ViewCompanyInvoiceDetail',
				params: { id: data.id },
			});
		};

		//view seeker invoice details
		const viewSeekerInvoiceDetail = id => {
			router.push({
				name: 'ViewSeekerInvoiceDetail',
				params: { id: id },
			});
		};

		//add mark as wrong
		const updateMarkAsWrong = (invoiceId, flag) => {
			const payload = {
				type: 'mark_as_wrong',
				mark_as_wrong: flag,
			};
			store
				.dispatch('invoice/invoicesMarkAsWrong', {
					id: invoiceId,
					payload: payload,
				})
				.then(() => {
					fetchInvoices();
				});
		};

		//add mark as wrong
		const updateMarkAsWrongCompany = id => {
			store.dispatch('invoice/invoicesMarkAsWrongCompany', id).then(() => {
				fetchCompanyInvoices();
			});
		};

		//view seeker invoice details
		const copywSeekerInvoiceDetail = id => {
			Swal.fire({
				title: t('workDetails.areYouSure'),
				text:  t('validation.duplicateMsg',{
					field:'conformationMessage.invoice'
				}),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			}).then(async result => {
				if (result.isConfirmed) {
					store.dispatch('invoice/copyJobSeekersInvoices', id).then(() => {
						fetchInvoices();
					});
				}
			});
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
				if (dateRangeSelect.value) {
					startDate.value = dateRangeSelect.value == '' ? null : moment(dateRangeSelect.value.start).format('YYYY/MM/DD');
					endDate.value = dateRangeSelect.value == '' ? null : moment(dateRangeSelect.value.end).format('YYYY/MM/DD');
					fetchInvoices();
				} else {
					startDate.value = null;
					endDate.value = null;
					fetchInvoices();
				}
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
			// refs
			maxItemsPerPage,
			dateFormat,
			currencyConverture,
			t,
			tableIndex,
			invoiceId,
			showRevisionNoteModal,
			isRevisionNoteModal,
			dateRangeSelect,
			formMeta,
			invoiceFilterStatus,
			invoiceStaus,

			// icons
			trashIcon,
			editIcon,
			viewIcon,
			copyIcon,
			downloadIcon,
			approveIcon,
			partPaymentIcon,
			clockIcon,
			deleteIcon,
			groupIcon,
			arrowDown,
			arrowUp,
			upArrow,
			thumbsUp,
			thumbsDown,
			PanndingIcon,
			ClockRotateLeft,
			createdSign,

			// computed
			invoiceList,
			totalInvoiceCount,
			userTypeInfo,
			companyInvoiceList,
			totalInvoiceCountCompany,

			// methods
			handleChangePage,
			handleSort,
			updateSearchQuery,
			changePerPageMaxItems,
			deleteInvoice,
			editInvoice,
			viewCompanyInvoiceDetail,
			viewSeekerInvoiceDetail,
			copywSeekerInvoiceDetail,
			openTable,
			updateMarkAsWrong,
			updateMarkAsWrongCompany,
			handleRevisionNote,
			fetchCompanyInvoices,
		};
	},
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.tbl-status {
	span {
		&.sts-wait {
			color: $colorWait;
		}

		&.sts-approve {
			color: $colorApprove;
		}
	}

	img {
		width: 40px;
		height: 40px;
		object-fit: cover;
	}
}


.invoice__list {
	.payment-pill-header {
		text-align: start;
	}
}

.table td,
.table th {
	vertical-align: middle;
}

.expand-table {
	th {
		width: 9%;
		@media (max-width: 575px) {
			width: 20%;
		}
	}

	td {
		width: 32%;
	}
}

.data__table .table__data {
	overflow: auto !important;
}

.bg-green {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #13d63a !important;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: #fff;
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

.con-vs-tooltip {
	@media (max-width: 1024px) {
		display: inline-flex;
	}
}

.grey-edit-grey {
	pointer-events: visible;
}

.select__limit {
	@media (max-width: 1520px) {
		.w-48{
			width: 55%;
		}
	}

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
			padding: 8px;
		}
	}
}
</style>
<style lang="scss">
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
