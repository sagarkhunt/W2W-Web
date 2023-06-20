<template>
	<div></div>
	<!-- Mobile view start -->
	<section>
		<div class="mobile-view">
			<div class="main-container d-flex flex-column justify-content-center">
				<p class="text-center text-white mobile-head-text">{{t('mobileSplash.allYourInvoice')}}</p>
				<div class="position-relative pt-2">
					<div class="euro-img">
						<img src="~@/assets/images/way2work-intro.png" alt="" class="img-fluid" />
					</div>
					<div class="view-img">
						<img src="~@/assets/images/mock-up.png" alt="" class="img-fluid" />
					</div>
				</div>
				<div class="pt-4 pb-3">
					<p class="bold text-white text-center fn14">{{t('mobileSplash.saveTimeAndWorkSmarter')}}</p>
				</div>
				<div class="apps-wrapper d-flex align-items-center justify-content-center my-1">
					<a href="https://apps.apple.com/in/app/way2work-mobile/id1551942079" target="_blank">
						<div class="apps-icon">
							<img src="~@/assets/images/apple-icon.png" alt="Apple-icon" />
							<div class="text-white ms-2">
								<p class="mb-1">{{t('mobileSplash.downloadOnThe')}}</p>
								<span class="d-block bold">{{t('mobileSplash.appStore')}}</span>
							</div>
						</div>
					</a>

					<a href="https://play.google.com/store/apps/details?id=com.micrasolution.way2WorkMobile" target="_blank">
						<div class="apps-icon ms-2">
							<img src="~@/assets/images/playstore-icon.png" alt="Playstore-icon" />
							<div class="text-white ms-2">
								<p class="mb-1 text-uppercase">{{t('mobileSplash.getItOn')}}</p>
								<span class="d-block bold">{{t('mobileSplash.googlePlay')}}</span>
							</div>
						</div>
					</a>
				</div>
				<div class="cursor-pointer" @click="hideShowSplash">
					<p class="text-white text-center bold mt-md-4 mt-5">{{t('mobileSplash.continueUsingDesktopVersion')}}</p>
				</div>
			</div>
		</div>
	</section>
	<!-- Mobile view end -->
</template>

<script>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'MobileSplash',

	setup() {
		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		}); //  use i18n
		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			window.addEventListener('resize', () => {
				if (window.innerWidth < 1025) {
					if (JSON.parse(localStorage.getItem('hideSplash')) !== true) {
						document.querySelector('.mobile-view').style.display = 'block';
						document.body.style['overflow-y'] = 'hidden';
					}
				} else {
					document.querySelector('.mobile-view').style.display = 'none';
					document.body.style['overflow-y'] = 'visible';
				}
			});

			if (window.innerWidth < 1025) {
				if (JSON.parse(localStorage.getItem('hideSplash')) !== true) {
					document.querySelector('.mobile-view').style.display = 'block';
					document.body.style['overflow-y'] = 'hidden';
				}
			} else {
				document.querySelector('.mobile-view').style.display = 'none';
				document.body.style['overflow-y'] = 'visible';
			}
		});

		/**
		 * methods
		 * *******************************************************************
		 */
		const hideShowSplash = () => {
			localStorage.setItem('hideSplash', true);
			document.querySelector('.mobile-view').style.display = 'none';
			document.body.style['overflow-y'] = 'visible';
		};
		return {
			t,
			hideShowSplash,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';

// Mobile view //
.mobile-view {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	z-index: 9999999999;
	background-color: #ff0000;


	.main-container {
		padding: 3.3rem 3rem;
		height: 100%;

		@media (max-width: 425px) {
			padding: 3.3rem 1rem;
		}

		.mobile-head-text {
			font-style: italic;
			font-size: 22px;
			font-weight: 700;
		}

		.euro-img {
			margin: 0 auto;
			max-width: 320px;

			@media (max-width: 768px) {
				max-width: 280px;
			}
		}

		.view-img {
			position: absolute;
			bottom: 0;
			width: 100%;
			left: 50%;
			transform: translateX(-50%);
			max-width: 360px;

			@media (max-width: 768px) {
				max-width: 320px;
			}
		}

		.fn14 {
			font-size: 14px;
		}

		.apps-wrapper {
			.apps-icon {
				display: flex;
				align-items: center;
				border-radius: 0.5rem;
				background-color: #000;
				padding: 0.4rem 0.7rem;
				box-shadow: 0px 0px 1px 1px #fff;
				width: 100%;
				max-width: 135px;

				img {
					height: 25px;
					width: 25px;
					object-fit: contain;
				}

				p {
					font-size: 8px;
				}

				span {
					font-size: 13px;
					line-height: 1;
				}
			}
		}
	}
}

.cursor-pointer {
	cursor: pointer;
}
</style>
