<template>
	<hr class="m-0" />
	<div class="copyright d-inlline-block bottom-0 left-0 bg-white w-100">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<p class="copyright-left">
						{{ t('footerCopyright.copyright') }}
						<span>
							<FontAwesomeIcon :icon="copyrightIcon" />
						</span>
						2020. Y-Tunnus: 3123560-3
					</p>
				</div>
				<div class="col-md-6">
					<a href="" class="copyright-right">
						{{ t('footerCopyright.interview') }} |
						{{ t('footerCopyright.policy') }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';

export default {
	name: 'FooterCopyright',

	// components
	components: { FontAwesomeIcon },

	// composition api
	setup() {
		// icon
		const copyrightIcon = faCopyright;

		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		}); //  use i18n

		return { copyrightIcon, t };
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.copyright {
	position: fixed;
	padding: 25px 0px;
	box-shadow: 3px 0px 5px rgba(57, 63, 72, 0.3);
	z-index: 9;

	.copyright-right {
		text-align: right;
		width: 100%;
		display: inline-block;
	}
}

@media (max-width: 768px) {
	.copyright {
		text-align: center;

		.copyright-right {
			text-align: center;
		}
	}
}

@media (max-width: 576px) {
	.copyright {
		padding: 15px 0px;
		font-size: 12px;
		position: absolute;

		.copyright-right {
			margin-top: 8px;
		}
	}
}
</style>
