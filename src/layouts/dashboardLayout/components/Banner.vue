<template>
	<!-- --banner stat-- -->
	<section class="banner d-inline-block position-relative w-100">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-12">
					<div class="banner-text d-flex justify-content-center align-items-center position-relative text-center">
						<!-- page header - breadcrumb -->
						<div>
							<div class="banner-icon">
								<FontAwesomeIcon :icon="dashboardIcon" />
							</div>

							<div class="sec-header">
								<h5 class="sec-title">
									{{ t(route.meta.breadcrumb[0].title) }}
								</h5>
								<p>
									<router-link class="link-margin me-1" :to="route.meta.breadcrumb[0].url">
										{{ t(route.meta.breadcrumb[0].title) }}
									</router-link>

									<span v-for="(link, index) in route.meta.breadcrumb.slice(1)" :key="index">
										<router-link class="link-margin me-1" :to="link.url"> / {{ t(link.title) }} </router-link>
									</span>
								</p>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- --banner end-- -->
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMinusSquare, faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from '@vue/reactivity';


import { onMounted } from '@vue/runtime-core';

export default {
	name: 'Banner',

	// components
	components: {
		FontAwesomeIcon,
	},

	// composition api
	setup() {
		// icons
		const dashboardIcon = faMinusSquare;
		const leftArrowIcon = faArrowLeft;
		const downArrowIcon = faChevronDown;

		// ref
		const selectedEmployerId = ref(null);

		// global route
		const route = useRoute();

		/**
		 * Mounted
		 * *******************************************************************
		 */

		onMounted(() => {
		});


		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		}); //  use i18n

		return {
			// ref
			selectedEmployerId,
			dashboardIcon,
			leftArrowIcon,
			downArrowIcon,
			t,
			route,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

.banner {
	background-color: $bg-color;
	padding-bottom: 150px;
	padding-top: 130px;

	.banner-text {
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
}

@media (max-width: 992px) {
	.banner {
		padding-top: 150px;
	}
}

@media (max-width: 575px) {
	.banner {
		padding-top: 165px;
	}
}

.dropdown-toggle::after {
	display: none;
}

.link-margin {
	@media (max-width: 320px) {
		font-size: 14px;
	}
}

.sec-header {
	span {
		@media (max-width: 320px) {
			margin-bottom: 0px;
		}
	}
}
</style>

<style lang="scss">
.multiselect-options {
	overflow: auto;
	border-radius: 12px;
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

.trip-time {
	padding: 5px 15px !important;
	display: block !important;

	.form-control {
		border: none;
		width: 100%;
		padding: 0;
		height: auto;
	}

	.vc-time-picker {
		padding: 0 !important;

		.vc-time-icon {
			width: 22px;
			height: 22px;
		}
	}

	.vc-time-date {
		display: none !important;
	}

	.vc-select select {
		background: none;
		border: none;

		&:hover {
			color: #000000;
		}
	}
}
</style>
