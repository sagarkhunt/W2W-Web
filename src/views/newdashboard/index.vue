<template>
	<div>
		<top-dashboard-navbar />
		<section class="banner d-inline-block position-relative w-100">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-12">
						<div class="banner-text d-flex justify-content-center align-items-center">
							<!-- page header - breadcrumb -->
							<div>
								<div class="banner-icon">
									<FontAwesomeIcon :icon="dashboardIcon" />
								</div>

								<div class="sec-header">
									<h5 class="sec-title" id="myDashboard">
										{{ t('commonDashboard.myDashboard') }}
									</h5>
									<p>
										<a href="#"> {{ t('commonDashboard.myDashboard') }}/ </a>

										<span>
											<a href="#">{{ t('commonDashboard.dashboard') }}</a>
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="userTypeInfo == 'jobseeker'">
					<span v-if="profileCompleteFlag" class="alert dashboard-alert text-center position-relative d-block my-4">
						<router-link to="/update-profile" class="header-right-dash" v-if="isUserLogedIn">
							<!-- Your Profile is incomplete, please click update profile -->
							{{ t('commonDashboard.profileInComplete') }}
						</router-link>
						<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
					</span>
				</div>
				<div v-else>
					<span v-if="profileCompleteFlag" class="alert dashboard-alert text-center position-relative d-block my-4">
						<router-link to="/companyprofile" class="header-right-dash" v-if="isUserLogedIn">
							<!-- Your Profile is incomplete, please click update profile -->
							{{ t('commonDashboard.profileInComplete') }}
						</router-link>
						<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
					</span>
				</div>
				<div v-if="userTypeInfo == 'jobseeker'">
					<!-- if tax card exist -->
					<div v-if="!isHideTaxAlert && userProfileInfo.availableTaxCard && userProfileInfo.earned_percentage === 100" class="alert dashboard-alert text-center position-relative my-4">
						<p class="mb-0">
							<!-- Your current tax card limit is expired, so your tax calculation will be count based on maximum tax percentage -->
							{{ t('commonDashboard.dashboardTaxMessage') }}
						</p>
						<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
					</div>

					<!-- if tax card is not exist -->
					<div v-if="!isHideTaxAlert && !userProfileInfo.availableTaxCard" class="alert dashboard-alert text-center position-relative my-4">
						<p class="mb-0">
							<!-- Upload your latest tax card to your documents, otherwise 60 % of your salary will be withheld from your invoices. -->
							{{ t('commonDashboard.taxCardMessage') }}
						</p>
						<span class="cursor-pointer alert-close-icon" @click="hideTaxAlert"><FontAwesomeIcon :icon="closeIcon"/></span>
					</div>

					<div class="profession-container container-lg">
						<div class="row no-gutters">
							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/dashboard" v-if="isUserLogedIn">
									<div class="danger-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-red.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/company.png" alt="" class="img-fluid" />
											</div>
											<h5 class="fw-bold text-center mt-4 text-white">
												{{ t('commonDashboard.dashboard') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''" id="invoicing">
								<router-link to="/invoices" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/all-invoice.png" alt="err" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.Invoicing') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/team-invoices" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/team-members.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.teamInvoicing') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/jobseeker-team" class="header-right-dash" v-if="isUserLogedIn">
									<div
										class="white-box profession-box-common p-h 
										"
									>
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-b.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/light-entrepreneurs.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.jobSeekerTeam') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
								<router-link to="/update-profile" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-t-b.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/team-invoice-list.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.manageAccount') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''" id="myDocument">
								<router-link to="/documents" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-l-t-r.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/applications.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.myDocuments') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/my-resume" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-l-t-r.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/myResumesImg.svg" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.myResumes') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/job/proposals" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/light-grey-l-b.png" alt="err" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/my-application.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.myApplications') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/worked-details" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/light-grey-l-b.png" alt="err" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/worked-details.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.myWorkDetails') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/job/find" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/light-grey-l-b.png" alt="err" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/job-matching.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.jobMatching') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/update-profile" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/light-grey-l-b.png" alt="err" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/manage-skills.png" alt="" class="" />
											</div>
											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.manageSkills') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>
						</div>
						<div class="d-flex justify-content-center">
							<div id="tour" class=""></div>
						</div>
					</div>
				</div>

				<div v-else>
					<div class="profession-container container-lg">
						<div class="row no-gutters">
							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/profile/company" class="header-right-dash" v-if="isUserLogedIn">
									<div class="danger-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-red.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/company.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4 text-white">
												<!-- Tehovoima oy -->
												{{ t('commonDashboard.dashboard') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
								<router-link to="/companyprofile" class="header-right-dash" v-if="isUserLogedIn">
									<div class="profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/company.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												<!-- Tehovoima oy -->
												{{ t('commonDashboard.companyProfile') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''" id="allInvoicing">
								<router-link to="/invoices" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/all-invoice.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.allInvoices') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/team-invoices" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/all-invoice.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.allTeamInvoices') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/team-member" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-left.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/team-members.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.teamMembers') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/light-entreprenuers" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common p-h">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-b.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/light-entrepreneurs.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.lightEntrepreneurs') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/gigworkhour" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-grey-t-b.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/applications.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.myWorkHourList') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/econtract" class="header-right-dash" v-if="isUserLogedIn">
									<div class="white-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-l-t-r.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/worked-details.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.eContract') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''" id="postNewGig">
								<router-link to="/job/add" class="header-right-dash" v-if="isUserLogedIn">
									<div class="dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-l-t-r.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/job-matching.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4">
												{{ t('commonDashboard.postNewGig') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>

							<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12" :class="profileCompleteFlag == true ? 'not-allowed' : ''">
								<router-link to="/job/list" class="header-right-dash" v-if="isUserLogedIn">
									<div class="text-white dark-box profession-box-common prof-px">
										<span class="prof-bg-puzzle">
											<img src="~@/assets/images/new-dash-blue-puzzle.png" alt="err" class="" />
										</span>
										<div class="text-content">
											<div class="content-icon">
												<img src="~@/assets/images/job-matching.png" alt="" class="" />
											</div>

											<h5 class="fw-bold text-center mt-4 text-white">
												{{ t('commonDashboard.manageMyGigs') }}
											</h5>
										</div>
									</div>
								</router-link>
							</div>
						</div>
						<div class="d-flex justify-content-center">
							<div id="company_tour" class=""></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- vue tour -->
		<div class="tour_design">
			<div v-if="userTypeInfo == 'jobseeker'">
				<v-tour name="myTour" :steps="steps" :callbacks="myCallbacks"> </v-tour>
			</div>
			<div v-else>
				<v-tour name="myTour" :steps="step" :callbacks="myCallbacks"> </v-tour>
			</div>
		</div>
		<!-- </div> -->
		<footer class="footer d-inline-block position-relative w-100">
			<div class="container-lg">
				<div class="row">
					<div class="col-lg-5 col-12">
						<div class="footer-logo">
							<a href="index.html"><img src="@/assets/images/logo-white.png" class="img-fluid" alt=""/></a>
						</div>
					</div>
					<div class="col-lg-3 col-12">
						<ul class="footer-sitemap">
							<li>
								<h5 class="footer-title mb-3">
									{{ t('footer.Sitemap') }}
								</h5>
							</li>
							<li>
								<a href="">
									{{ t('footer.Home') }}
								</a>
							</li>
							<li>
								<a href="">{{ t('footer.signIn') }}</a>
							</li>
							<li>
								<a href="">{{ t('footer.joinToday') }}</a>
							</li>
						</ul>
					</div>
					<div class="col-lg-4 col-12">
						<ul class="footer-sitemap">
							<li>
								<h5 class="footer-title mb-4">
									Way2Work oy
								</h5>
							</li>
							<li>
								<a href="" class="d-flex align-items-start">
									<div>
										<FontAwesomeIcon :icon="mapIcon" />
									</div>
									<p class="ml-3">
										Kauppalantie 15,00320 Helsinki Open in weekdays 08:00-16:00
									</p>
								</a>
							</li>
						</ul>

						<div class="row">
							<div class="col-xl-6 col-lg-12 col-12">
								<ul>
									<li>
										<a href="" class="d-flex align-items-center">
											<div>
												<FontAwesomeIcon :icon="telephoneIcon" />
											</div>
											<p class="ml-3 tel-text">
												+358 401591447
											</p>
										</a>
									</li>
								</ul>
							</div>
							<div class="col-xl-6 col-lg-12 col-12">
								<ul>
									<li>
										<a href="" class="d-flex align-items-center">
											<div>
												<FontAwesomeIcon :icon="emailICon" />
											</div>
											<a href="" class="ml-3">info@way2work.fi</a>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="container-lg footer-bottom">
				<p>
					Way2Work oy(3123560-3)
					<span>
						<FontAwesomeIcon :icon="copyrightIcon" />
					</span>
					2021
				</p>
			</div>
		</footer>
		<!-- banner -->

		<div>
			<div class="hrd-box mr-0" @click="viewReportBugModel()">
				<ToolTip :title="t('toolTip.reportBug')">
					<div class="report_icon" @click="showBodyScroll">
						<FontAwesomeIcon :icon="exclamationTriangle" />
					</div>
				</ToolTip>
			</div>
		</div>
	</div>

	<!-- MobileSplash -->
	<MobileSplash />

	<Suspense v-if="showReportBugModal.value">
		<template #default>
			<report-bug-modal v-model:isModalShow="showReportBugModal" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TopDashboardNavbar from '@/layouts/homeLayout/components/TopDashboardNavbar.vue';
import MobileSplash from '@/layouts/homeLayout/components/MobileSplash.vue';
import { faCopyright, faEnvelope, faExclamationTriangle, faMapMarkerAlt, faMinusSquare, faPhoneAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { defineAsyncComponent, onMounted, watch } from 'vue';
import { getCurrentInstance, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
const ReportBugModal = defineAsyncComponent(async () => {
	return import('@/layouts/homeLayout/components/ReportBugModal.vue' /* webpackChunkName:"Report BUg Model" */);
});

export default defineComponent({
	name: 'NewDashboard',

	components: {
		TopDashboardNavbar,
		FontAwesomeIcon,
		MobileSplash,
		ReportBugModal,
		DefaultLoader,
	},

	setup() {
		//vue tour
		const $vueInstance = getCurrentInstance();

		//ref
		const isHideTaxAlert = ref(localStorage.getItem('hideTaxAlert') || false);
		const someTimeLoginUser = ref(null);
		const dashboardIcon = faMinusSquare;
		const FacebookIcon = faFacebook;
		const twitterIcon = faTwitter;
		const instagramIcon = faInstagram;
		const mapIcon = faMapMarkerAlt;
		const telephoneIcon = faPhoneAlt;
		const emailICon = faEnvelope;
		const copyrightIcon = faCopyright;
		const closeIcon = faTimes;
		const exclamationTriangle = faExclamationTriangle;
		const steps = ref([]);
		const step = ref([]);
		const isReportBugModal = ref(false);
		const isReportBugModalShow = ref(false);

		// store
		const store = useStore();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.dashboard')} - Way2Work`;

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		const userTypeInfo = computed(() => store.state.auth.userType);
		// user is looged in ?
		const isUserLogedIn = computed(() => store.state.auth.userLogged);
		// Dashboard and user profile
		const dashboardInfo = computed(() => store.state.dashboard.DashboardWorkStats);
		const userProfileInfo = computed(() => store.state.auth.userProfile);
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */

		onMounted(() => {
			store.dispatch('auth/verifyToken').then(res => {
				someTimeLoginUser.value = res.data.data.first_time_login;
				if (someTimeLoginUser.value) {
					$vueInstance?.proxy?.$tours?.myTour?.start();
				}
			});

			steps.value = [
				{
					target: '#myDashboard',
					header: {
						title: 'Introduction',
					},
					offset: -200,
					content: `<p>Welcome ${userProfileInfo.value.full_name}</p> <p>Would you like to see the introduction of Way2Work billing dashboard?</p>`,
					params: {
						enableScrolling: true,
						placement: 'right',
					},
				},
				{
					target: '#myDocument',
					header: {
						title: 'My Document',
					},
					content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />repudiandae rem autem explicabo maiores <br />corporis alias soluta, unde deserunt voluptates.</p>',
					params: {
						placement: 'right',
					},
				},
				{
					target: '#invoicing',
					header: {
						title: 'Invoicing',
					},
					content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />runde deserunt voluptates.</p>',
					params: {
						placement: 'bottom',
					},
				},
				{
					target: '#tour',
					header: {
						title: 'Help',
					},
					content: '<p>for any questions or help please contact info@way2work.fi.</p>',
					params: {
						placement: 'center',
					},
				},
			];

			step.value = [
				{
					target: '#myDashboard',
					header: {
						title: 'Introduction',
					},
					offset: -200,
					content: `<p>Welcome ${userProfileInfo.value.full_name}</p> <p>Would you like to see the introduction of Way2Work billing dashboard?</p>`,
					params: {
						enableScrolling: true,
						placement: 'right',
					},
				},
				{
					target: '#postNewGig',
					header: {
						title: 'Post New Gigs',
					},
					content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />repudiandae rem autem explicabo maiores <br />corporis alias soluta, unde deserunt voluptates.</p>',
					params: {
						placement: 'right',
					},
				},
				{
					target: '#allInvoicing',
					header: {
						title: 'All Invoicing',
					},
					content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />runde deserunt voluptates.</p>',
					params: {
						placement: 'bottom',
					},
				},
				{
					target: '#company_tour',
					header: {
						title: 'Help',
					},
					content: '<p>for any questions or help please contact info@way2work.fi.</p>',
					params: {
						placement: 'center',
					},
				},
			];
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// show upload my document model
		const showReportBugModal = computed({
			get() {
				return isReportBugModal;
			},

			set(val) {
				isReportBugModal.value = val;
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		// shoe report bug model
		const viewReportBugModel = () => {
			isReportBugModal.value = true;
			isReportBugModalShow.value = true;
		};

		const profileCompleteFlag = computed(() => {
			return store.state.auth.incompleteProfileFlag;
		});

		const firstLogin = computed(() => {
			return store.getters['auth/getUserFirstLogin'];
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		const hideTaxAlert = () => {
			isHideTaxAlert.value = true;
			localStorage.setItem('hideTaxAlert', true);
		};

		//skip tour
		const myCustomSkipStepCallback = () => {
			store.dispatch('auth/vueTour');
		};

		//Finish tour
		const myCustomFinishStepCallback = () => {
			store.dispatch('auth/vueTour');
		};

		const myCallbacks = {
			onSkip: myCustomSkipStepCallback,
			onFinish: myCustomFinishStepCallback,
		};

		const showBodyScroll = () => {
			document.querySelector('body').classList.add('bg_scroll');
		};

		return {
			//ref
			t,
			dashboardIcon,
			FacebookIcon,
			twitterIcon,
			instagramIcon,
			mapIcon,
			telephoneIcon,
			emailICon,
			closeIcon,
			copyrightIcon,
			dashboardInfo,
			isHideTaxAlert,
			someTimeLoginUser,
			exclamationTriangle,
			showReportBugModal,
			userTypeInfo,
			isUserLogedIn,
			profileCompleteFlag,
			hideTaxAlert,
			userProfileInfo,
			firstLogin, //first time login
			steps,
			step,
			myCallbacks,
			myCustomSkipStepCallback,
			myCustomFinishStepCallback,
			viewReportBugModel,
			showBodyScroll,
		};
	},
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.banner {
	background-color: $bg-color;
	padding-bottom: 150px;
	padding-top: 130px;

	@media (max-width: 1024px) {
		padding-bottom: 170px;
	}
	@media (max-width: 768px) {
		padding-bottom: 180px;
	}
	@media (max-width: 575px) {
		padding-bottom: 205px;
	}

	.cursor-pointer {
		cursor: pointer;
	}

	.banner-text {
		text-align: center;
		position: relative;

		.banner-icon {
			margin-bottom: 10px;

			svg {
				font-size: 50px;
				color: $coloRed;
			}
		}

		.sec-header {
			p {
				margin-top: 5px;
				color: $colorGray;
				font-weight: 500;

				a {
					color: $colorGray;
				}

				span {
					color: $colorLightGray;
					font-weight: 300;
				}
			}
		}
	}

	.invoice-dropdown {
		background-color: #fff;
		border-radius: 50px;
		min-height: 40px;
		color: #777777;
		padding: 10px 30px;
		&:focus {
			box-shadow: none;
		}
	}
}

.hrd-box {
	bottom: 90px;
	right: 25px;
	position: fixed;
	width: 60px;
	height: 60px;
	text-align: center;
	overflow: hidden;
	display: block;
	border-radius: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 999999 !important;
	border: 1px solid $coloRed;

	svg {
		color: $coloRed;
		font-size: 24px;
	}

	.report_icon {
		height: 60px;
		width: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.select-employee {
	width: 40%;
	border-radius: 12px;
	background-color: #ffff;
	border-radius: 20px;
}
.not-allowed {
	cursor: not-allowed;
	pointer-events: none !important;
}

@media (max-width: 992px) {
	.banner {
		padding-top: 150px;

		.go__back {
			position: relative !important;
			display: flex;
			justify-content: center;
			margin-bottom: 30px;
			top: unset !important;
			left: unset !important;
		}
	}
}

@media (max-width: 768px) {
	.banner {
		padding-top: 120px;
	}
}

@media (max-width: 576px) {
	.banner {
		padding-top: 165px;

		.go__back {
			.banner-back {
				.back-icon {
					width: 35px !important;
					height: 35px !important;
					line-height: 35px !important;

					span {
						font-size: 20px;
					}
				}
				.back-text {
					span {
						font-size: 14px;
					}
				}
			}
		}
	}
}

.danger-box {
	background-color: transparent;
}

.dark-box {
	background-color: transparent;
	font-weight: 300;

	h2 {
		color: $colorWhite;
	}
}

.white-box {
	background-color: transparent;
	color: #000;

	h2 {
		span {
			font-size: 33px;
			font-weight: 700;
		}
	}
}

.feature-dark-box {
	background-color: #394251;
}

.profession-box-common {
	border-radius: 20px;
	height: 382px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 74px;
	transition: all 0.5s;
	&:hover {
		transform: scale(1.1);
	}

	@media (max-width: 1440px) {
		height: 320px;
	}

	.prof-bg-puzzle {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		display: block;

		img {
			width: 100%;
			height: 100%;
			position: relative;
			object-fit: contain;
		}
	}
	.text-content {
		z-index: 1;

		.content-icon {
			max-width: 80px;
			margin: 0 auto;
			width: 100%;
			img {
				width: 80px;
				height: 80px;
				object-fit: contain;
			}
		}
	}
}

.simple-hover {
	&:hover {
		transform: scale(1.1);
	}
}

.footer {
	background-color: #000;
	color: #fff;
	padding: 50px 0 0;
	li {
		line-height: 45px;
	}

	a {
		color: #fff;
		font-size: 14px;
		font-weight: 500;

		@media (max-width: 576px) {
			font-size: 13px;
		}
	}

	.footer-logo {
		width: 120px;
		@media (max-width: 768px) {
			margin-bottom: 40px;
		}

		@media (max-width: 576px) {
			width: 150px;
		}
	}
	.tel-text {
		font-size: 14px;
		white-space: nowrap;
		@media (max-width: 576px) {
			font-size: 13px;
		}
	}
	.footer-bottom {
		padding: 100px 0 100px;
		@media (max-width: 1024px) {
			padding: 50px 0 100px;
		}

		@media (max-width: 768px) {
			padding: 50px 0 100px;
		}
		@media (max-width: 576px) {
			padding: 20px 20px 20px;
			font-size: 13px;
		}
	}
	.footer-sitemap {
		p {
			max-width: 295px;
			line-height: 30px;
			font-weight: 300;
			font-size: 14px;
		}
		h5 {
			@media (max-width: 1024px) {
				margin: 20px 0 0;
			}
		}
		@media (max-width: 576px) {
			margin: 20px 0 0;
		}
		a {
			@media (max-width: 576px) {
				font-size: 13px;
			}
		}
	}
}
.alert-close-icon {
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	font-size: 22px;
}
.dashboard-alert {
	margin: 10px 10px 0px 22px;
	font-weight: 500;
	color: #fff;
	background-color: #ea2129;
	border-radius: 18px;
	a,
	p {
		font-size: 20px;
		color: #fff;
		margin-right: 0.5rem;
		@media (max-width: 2560px) {
			font-size: 20px;
		}
		@media (max-width: 1600px) {
			font-size: 16px;
		}
		@media (max-width: 575px) {
			font-size: 14px;
		}
	}
	.alert-close-icon {
		font-size: 16px;
		right: 20px;
		color: #000;
	}

	&.alert {
		padding: 0.75rem 2.25rem 0.75rem 1.2rem;
	}
}
</style>

<style lang="scss">
.tour_design {
	.v-tour {
		.v-step {
			width: 100%;
			max-width: fit-content;
			border-radius: 25px;
			@media (max-width: 1024px) {
				max-width: 381px;
			}
			@media (max-width: 768px) {
				max-width: 260px;
			}

			@media (max-width: 575px) {
				max-width: 166px;
			}

			.v-step__header {
				border-top-left-radius: 25px !important;
				border-top-right-radius: 25px !important;
				font-weight: 500;
				font-size: 15px;
				@media (max-width: 768px) {
					margin: -1rem -1rem 0.1rem;
				}
				@media (max-width: 575px) {
					font-size: 12px;
					margin: -1rem -1rem 0.1rem;
				}
			}
			.v-step__content {
				font-weight: 500;
				font-size: 15px;
				@media (max-width: 768px) {
					margin: 0 0 0.5rem 0;
				}
				@media (max-width: 575px) {
					font-size: 12px;
					margin: 0 0 0.5rem 0;
				}
			}
			.v-step__buttons {
				button {
					font-weight: 500;
					border-radius: 50rem;
					margin: 0 0.3rem;
					padding: 0.35rem 1.2rem;
					font-size: 15px !important;
					@media (max-width: 768px) {
						margin: 4px 0.3rem;
					}
					@media (max-width: 575px) {
						font-size: 12px !important;
						margin: 4px 0.3rem;
					}
				}
			}
		}
	}
}
.widget-visible {
	iframe {
		bottom: 10px !important;
	}
}
</style>
