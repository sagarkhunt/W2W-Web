<template>
	<!-- footer subscriber -->
	<section class="join-email">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-md-6 mb-4 mb-lg-0 mb-md-0">
					<div class="join-email-title sec-header m-0">
						<h5 class="sec-title">
							{{ t('newsLatter.newsLatterNote') }}
						</h5>
					</div>
				</div>
				<div class="col-md-6">
					<div class="join-email-box">
						<!-- form -->
						<form action="">
							<!-- email -->
							<div class="form-input">
								<input class="form-control" type="text" :placeholder="t('newsLatter.inputEmailAddress')" />
							</div>

							<!-- subscribe btn -->
							<div class="form-btn">
								<button type="button" class="btn-common btn-black">
									{{ t('common.subscribe') }}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
	name: 'FooterSubscriber',

	// components
	components: {},

	// composition api
	setup() {
		// translator
		const { t } = useI18n({ useScope: 'global' });

		return { t };
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/style.scss';
.btn-common {
	padding: 7px 28px;
}

.fixed-bottom {
	position: fixed;
	@media (max-width: 1024px) {
		position: relative;
	}
}
</style>
