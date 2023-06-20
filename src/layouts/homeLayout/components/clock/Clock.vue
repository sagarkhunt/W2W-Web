<template>
	<div class="lh-0">
		<FontAwesomeIcon :icon="clock" class="clock-icon" />
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
export default {
	name: 'Clock',
	components: {
		FontAwesomeIcon,
	},
	setup() {
		const clock = faClock;
		return {
			clock,
		};
	},
};
</script>

<style lang="scss" scoped>
.clock-icon {
	height: 19px;
	width: 19px;

	@media (max-width: 768px) {
		height: 17px;
		width: 17px;
	}

	@media (max-width: 575px) {
		height: 15px;
		width: 15px;
	}
}

.lh-0 {
	line-height: 0;
}
</style>
