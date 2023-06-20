<template>
	<!-- manage skill -->
	<div class="manage__skil">
		<!-- header -->
		<div>
			<p class="accordion-head mb-4">{{ t('commonDashboard.yourReviews') }}</p>
			<div v-if="seekerRatingArray && seekerRatingArray.length > 0">
				<div :key="i" v-for="(item, i) in seekerRatingArray">
					<div>
						<h2>
							<div @click="openTable(i, item)">
								<div class="review-accordion">
									<div class="d-flex review-width">
										<div class="d-flex align-items-center path-width">
											<span v-if="item?.seeker?.user?.file_path">
												<div class="review-user">
													<img :src="item.seeker && item.seeker.user && item.seeker.user.file_path" alt="" class="img-fluid h-100" />
												</div>
											</span>
											<span v-else>
												<div class="review-user">
													<img src="@/assets/images/icon_png.png" alt="" class="img-fluid h-100" />
												</div>
											</span>

											<div class="ms-sm-4 ms-1">
												<p class="mt-sm-0 my-sm-0 my-1 title-base">
													{{ t('commonDashboard.leftReviewTo') }} {{ (item.seeker && item.seeker.user && item.seeker.user && item.seeker.user.full_name) || 'Unnamed user' }}
												</p>
												<p class="mt-sm-0 my-sm-0 my-1 title-base">
													{{ dateFormat(item.created_at) }}
												</p>
											</div>

											<!-- left review on -->
										</div>
										<div class="d-flex align-items-center mx-xl-0 mx-2">
											<span v-for="(items, index) in 5" :key="index" class="me-1">
												<a>
													<FontAwesomeIcon :icon="fillStarIcon" class="star-wrap" :class="item.rate > index ? 'fill-star' : 'fill-star-dark'" />
												</a>
											</span>
										</div>
									</div>
									<!-- <p class="ml-sm-4 title-base seeker-text-elipsis">{{ item.comment }}</p> -->
									<div class="ml-auto arrow-icon">
										<a>
											<FontAwesomeIcon :icon="arrowDown" v-if="tableIndex !== i" class="arrowIcon" />
										</a>
										<a>
											<FontAwesomeIcon :icon="arrowUp" v-if="tableIndex === i" class="arrowIcon" />
										</a>
									</div>
								</div>
							</div>
						</h2>

						<div v-if="i === tableIndex" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								<p class="break-line">
									{{ item.comment }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="text-center p-4">{{ t('seekerRating.noReviewsAvailable') }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '@/utils/mixins';

export default {
	name: 'CompanySeekarRating',

	// components
	components: {
		FontAwesomeIcon,
	},
	props: {},

	setup() {
		// i18n instance
		const { t } = useI18n({ useScope: 'global' });
		const seekerRatingArray = ref([]);
		const tableIndex = ref(null);
		// const search = ref(null);
		// icons
		const deleteIcon = faTimes;
		const fillStarIcon = faStar;
		const arrowDown = faChevronDown;
		const arrowUp = faChevronUp;

		// global store
		const store = useStore(); // use state
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			store.dispatch('auth/verifyToken').then(res => {
				const data = res.data.data;
				seekerRatingArray.value = data?.companyRating;
			});
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */

		/**
		 * Methods
		 * *******************************************************************
		 */
		// table open
		const openTable = index => {
			if (tableIndex.value === index) {
				tableIndex.value = null;
				return;
			}
			tableIndex.value = index;
		};

		//watch

		return {
			t,
			seekerRatingArray,
			dateFormat,
			// icon
			fillStarIcon,
			deleteIcon,
			arrowDown,
			arrowUp,

			tableIndex,

			// method
			openTable,
		};
	},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.manage__skil {
	width: 100%;
	display: block;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	padding: 25px 30px !important;
	margin-top: 30px !important;
	margin-bottom: 0 !important;
	@media (max-width: 768px) {
		padding: 20px 25px !important;
		border-radius: 15px !important;
	}
	@media (max-width: 575px) {
		padding: 15px 20px !important;
		border-radius: 10px !important;
	}
	.manage_skill__form {
		.user_skills {
			width: 100%;
			background-color: #fbfbfb;
			border: 1px solid #eaeaea;
			border-radius: 25px;
			min-height: 40px;
			height: auto;
			display: flex;
			flex-wrap: wrap;

			.user_skill {
				background: $coloRed;
				color: #fff;
				padding: 5px 10px;
				padding-right: 20px;
				border-radius: 25px;
				display: flex;
				align-items: center;
				width: max-content;
				float: left;
				margin: 5px 5px;

				span {
					margin-right: 10px;
				}

				button {
					font-size: 10px;
					color: #fff;
				}
			}
		}

		.skill_error_msg {
			position: absolute;
			left: 20px;
			margin-top: 10px;
			width: 100%;
		}
	}
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

.review-accordion {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	padding: 1rem 2.35rem 1rem 1.25rem;
	font-size: 1rem;
	color: #212529;
	text-align: left;
	background-color: #fff;
	border: 0;
	box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.19);
	border-radius: 12px;
	margin-top: 0.8rem;

	@media (max-width: 575px) {
		padding: 0.7rem 2.35rem 0.7rem 0.65rem;
	}

	.review-width {
		width: 100%;
	}

	.path-width {
		width: 100%;
		max-width: 500px;

		@media (max-width: 768px) {
			max-width: 372px;
		}
	}
}

.accordion-button {
	&::after {
		background-image: url('~@/assets/images/down-grey-arrow.svg');
	}

	padding: 0;

	@media (max-width: 1040px) {
		display: block;
	}
}

.accordion-button:not(.collapsed) {
	background-color: transparent;
	color: #000;
	box-shadow: none;

	&::after {
		background-image: url('~@/assets/images/down-pink-arrow.svg');
	}
}

.accordion-header {
	box-shadow: 0px 3px 25px #e5e5e5;
	border-radius: 20px;
	padding: 20px;

	@media (max-width: 576px) {
		padding: 15px;
	}
}

.accordion-button {
	&:focus {
		box-shadow: none;
		border-color: none;
		padding: 0;
	}
}

.accordion-body {
	background-color: #fff;
	margin: 10px 0;
	box-shadow: 0px 3px 25px #e5e5e5;
	border-radius: 20px;

	@media (max-width: 576px) {
		font-size: 12px;
	}
}

.review-user {
	max-width: 50px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	overflow: hidden;

	@media (max-width: 768px) {
		min-width: 50px;
	}

	@media (max-width: 575px) {
		min-width: 40px;
		width: 40px;
		height: 40px;
	}

	img {
		object-fit: cover;
	}
}

.fill-star {
	color: #e4aa18;
	font-size: 20px;

	@media (max-width: 576px) {
		font-size: 15px;
	}
}

.fill-star-dark {
	color: #9e9e9e;
	font-size: 20px;

	@media (max-width: 576px) {
		font-size: 15px;
	}
}

.title-base {
	font-size: 16px;

	@media (max-width: 768px) {
		font-size: 14px;
	}

	@media (max-width: 575px) {
		font-size: 12px;
	}
}

.seeker-text-elipsis {
	max-width: 540px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.arrow-icon {
	position: absolute;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);

	@media (max-width: 575px) {
		right: 10px;
	}
}

.star-wrap {
	font-size: 20px;

	@media (max-width: 575px) {
		font-size: 12px;
	}
}

.break-line {
	line-break: anywhere;
}
</style>
<style>
.multiselect-input {
	padding: 0 !important;
	border: 1px solid #e2e2e2 !important;
}
</style>
