<template>
	<div class="invoice__list benefit_list card-space">
		<!-- invoice list Seeker -->
		<div class="payment-pill-header mb-xl-4 mb-lg-3 mb-2">
			<div class="pph-left">
				<h5 class="title-lg">{{ t('sidebar.benefit') }}</h5>
			</div>
		</div>
		<p class="fn17 semibold">
			{{t('benefitModule.youHaveTotalOf')}} <span class="text-red">{{ activityPoints }} {{t('benefitModule.points')}}</span> {{t('benefitModule.toSpendOnBenefits')}}
		</p>
		<div class="benefit_list_wrapper mb-3 pt-2 mt-3" v-if="jobseekerBenefitList.length">
			<div class="row mx-0">
				<div class="col-xl-3 col-lg-4 col-sm-6 col-12 px-0" :key="i" v-for="(item, i) in jobseekerBenefitList">
					<div class="benefit_wrapper mt-2">
						<div class="benefit_box bg-white px-3 py-5">
							<div class="benefit_btn">
								<button type="button" class="d-flex align-items-center justify-content-center text-white">
									<img src="~@/assets/images/shopingicon.svg" alt="Shoping-icon" class="shop_icon mr-2" />
									<p>{{ item.benefit_point }}</p>
								</button>
							</div>
							<div class="benefit_logo mb-3">
								<img :src="item.file_path" alt="" />
							</div>
							<div class="text-center">
								<p class="mb-2 text_hidden mx-auto">{{ item.title }}</p>
								<p class="fn15 mx-3 text_clamp">{{ item.description }}</p>
							</div>
							<span v-if="item.benefit_point > activityPoints">
								<div class="d-flex justify-content-center">
									<button type="button" class="btn-common btn-gray font-semibold text-uppercase mt-3"  disabled>{{t('benefitModule.Expand')}}</button>
								</div>
							</span>
							<span v-else>
								<div class="d-flex justify-content-center">
									<button type="button" class="btn-common btn-red mt-3" @click="viewClaimModal(item)">{{t('benefitModule.Expand')}}</button>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="text-center mt-4">{{ t('common.noDataAvailable') }}</div>

		<pagination v-if="jobseekerBenefitList.length" @changePage="handlePageChange" v-model:value="page" :total="countTotalPage" :max="9" />
	</div>
	<Suspense v-if="showClaimModal.value">
		<template #default>
			<claim-modal v-model:isModalShow="showClaimModal" @newAddedTeam="fetchBenefitList" :itemData="itemData" />
		</template>
		<template #fallback>
			<default-loader />
		</template>
	</Suspense>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { dateFormat, currencyConverture } from '@/utils/mixins';
import { useSwal } from '../../components/sweetalert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DefaultLoader from '@/components/loader/DefaultLoader.vue';
const ClaimModal = defineAsyncComponent(async () => {
	return import('@/views/benefit/components/ClaimModal.vue' /* webpackChunkName:"UploadContract" */);
});

export default {
	name: 'BenefitList',

	components: {
		ClaimModal,
		DefaultLoader,
	},

	setup() {
		// refs
		const page = ref(1);
		const maxItemsPerPage = ref(8);
		const search = ref(null);
		const order = ref(null);
		const tableIndex = ref(0);

		// icons
		const isClaimModal = ref(false);
		const isClaimModalShow = ref(false);
		const itemData = ref(null);
		// global store
		const store = useStore(); // use state

		// global router
		const router = useRouter();

		// sweetalert
		const Swal = useSwal();

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		document.title = `${t('sidebar.benefit')} - Way2Work`;

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			// fetch logged users invoices

			fetchBenefitList();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		// benefit list seeker
		const jobseekerBenefitList = computed(() => store.getters['jobseekerTeam/getJobseekerBenefitList']);

		// total invoice count
		const countTotalPage = computed(() => {
			return Math.ceil(totalBenefit.value / maxItemsPerPage.value);
		});

		// total job proposal
		const totalBenefit = computed(() => store.state.jobseekerTeam.totalBenefitCount);
		// For User Type
		const userTypeInfo = computed(() => store.state.auth.userType);
		const activityPoints = computed(() => store.state.auth.activityPoints);
		const seekerId = computed(() => store.state.auth.userProfile);
		const teamMembers = computed(() => {
			return data => {
				let teamNames = '';
				data.team_members.forEach(element => {
					teamNames += `${element.seeker.user.full_name} \n`;
				});

				return teamNames;
			};
		});
		// show upload my document model
		const showClaimModal = computed({
			get() {
				return isClaimModal;
			},

			set(val) {
				isClaimModal.value = val;
			},
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		const viewClaimModal = item => {
			itemData.value = item;
			isClaimModal.value = true;
			isClaimModalShow.value = true;
		};
		// fetch logged users invoices
		const fetchBenefitList = () => {
			const payload = {
				page: page.value,
				limit: maxItemsPerPage.value,
				search: search.value,
				order: order.value,
			};

			store.dispatch('jobseekerTeam/getBenefitList', payload);
		};
		// handle page change
		const handlePageChange = val => {
			page.value = val;
			fetchBenefitList();
		};

		// handle search
		const updateSearchQuery = searchKey => {
			search.value = searchKey;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchBenefitList();
			}
		};

		// change per page max items
		const changePerPageMaxItems = length => {
			maxItemsPerPage.value = length;
			page.value = 1;
			//check for user is jobseeker or employer
			if (userTypeInfo.value == 'jobseeker') {
				fetchBenefitList();
			}
		};

		//filter and sorting data
		const handleSort = key => {
			page.value = 1;
			order.value = [key.key, key.sortType];
			fetchBenefitList();
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
		 * Watch
		 * *******************************************************************
		 */

		return {
			// refs
			page,
			maxItemsPerPage,
			dateFormat,
			currencyConverture,
			t,
			tableIndex,
			itemData,

			// computed
			jobseekerBenefitList,
			countTotalPage,
			userTypeInfo,
			teamMembers,
			seekerId,
			activityPoints,
			// computed
			showClaimModal,
			totalBenefit,
			// methods
			viewClaimModal,
			fetchBenefitList,
			handlePageChange,
			updateSearchQuery,
			changePerPageMaxItems,
			openTable,
			handleSort,
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

.text-red {
	color: $colorDanger;
}

.fn17 {
	font-size: 17px;
}

.benefit_list_wrapper {
	.benefit_wrapper {
		
		padding: 0.8rem;
		.benefit_box {
			box-shadow: 0px 5px 8px -1px #00000026;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			position: relative;

			.benefit_btn {
				border-radius: 0.7rem;
				background-color: #000;
				position: absolute;
				top: -5px;
				right: -10px;
				button {
					padding: 10px 15px;
					p {
						font-size: 17px;
						font-weight: 700;
					}
					.shop_icon{
						height: 18px;
						width: 18px;
					}
				}
			}

			.benefit_logo {
				margin: 0 auto;
				width: 105px;
				height: 105px;
				img {
					object-fit: cover;
					aspect-ratio: 1 / 1;
					width: 100%;
					border-radius: 5px;
				}
			}
			.text_hidden {
				font-size: 18px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 300px;
				color: #000;
			}
			.text_clamp {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
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
