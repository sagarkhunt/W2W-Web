<template>
	<!-- New Footer -->
	<section class="footer-up">
		<div class="container">
			
		</div>
	</section>
</template>

<script>
import {
	faFacebook,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { useI18n } from 'vue-i18n';

export default {
	name: 'Footer',

	// components
	components: {
	},

	// composition api
	setup() {
		// icons
		const FacebookIcon = faFacebook;
		const twitterIcon = faTwitter;
		const instagramIcon = faInstagram;

		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		}); //  use i18n

		return {
			FacebookIcon,
			twitterIcon,
			instagramIcon,
			t,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
.footer-up {
	padding: 0;
	color: #fff;
	background-color: #263238;
	.footer-alert {
		padding: 10px 0;
		.footer-alert-text {
			color: #fff;
			text-align: center;
			.lue {
				color: #007bff;
				border-bottom: 1px solid #007bff;
			}
			.btn {
				color: #fff;
				background-color: $coloRed;
				margin-left: 10px;
				padding: 3px 10px;
			}
		}
	}
	.footer {
		.container-footer {
			padding: 40px 0;
			margin: 0 7rem;
			.foouter-title {
				margin-bottom: 12px;
				font-weight: 700;
				font-size: 16px;
			}
			.footer-text-list {
				color: inherit;
				text-decoration: none;
				opacity: 0.6;
			}
			.social-item {
				display: flex;
				align-items: flex-end;
				.social {
					display: flex;
					align-items: center;
					.item-social {
						cursor: pointer;
						font-size: 20px;
						width: 36px;
						height: 36px;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 8px;
						color: #fff;
						opacity: 0.75;
						border: 1px solid #fff;
					}
				}
			}
		}
	}
}
@media (max-width: 768px) {
	.footer-up {
		.footer {
			.container-footer {
				padding: 40px 0;
				margin: 0 1rem;
				.social-item {
					display: block;
					.social {
						margin-top: 1rem;
					}
				}
			}
		}
	}
}
@media (max-width: 480px) {
	.footer-up {
		.footer {
			.container-footer {
				text-align: center;
				.social-item {
					margin-top: 2rem;
					.social {
						justify-content: center;
					}
				}
			}
		}
	}
}
.footer {
	background-color: #000;
	color: #fff;
	.footer-col {
		width: 20%;
		padding: 0px 15px;

		.footer-logo {
			img {
				width: 150px;
				object-fit: contain;
			}
		}

		.footer-logo-text {
			margin: 30px 0px;
		}

		.footer-btns {
			a {
				display: inline-block;
				margin-bottom: 10px;
			}
		}

		.footer-list {
			li {
				padding: 8px 0px;

				a {
					font-weight: 400;
					display: flex;
					align-items: center;

					span {
						display: inline-block;
						margin-right: 10px;

						svg {
							font-size: 20px;
						}
					}

					&:hover {
						color: $coloRed;
					}
				}

				.footer-title {
					margin-bottom: 10px;
					font-size: 20px;
					font-weight: 600;
				}
			}
		}
	}
}

@media (max-width: 992px) {
	.footer {
		.footer-col {
			width: 33.33%;
			margin-bottom: 30px;
		}
	}
}

@media (max-width: 768px) {
	.footer {
		.footer-col {
			width: 50%;
		}
	}
}

@media (max-width: 576px) {
	.footer {
		text-align: center;

		.footer-col {
			width: 100%;
			text-align: center;

			.footer-list {
				li {
					.footer-title {
						margin-bottom: 0px;
						font-size: 18px;
					}

					a {
						justify-content: center;
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
