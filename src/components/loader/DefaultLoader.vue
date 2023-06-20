<template>
	<div class="loader">
		<div class="half-circle-spinner">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DefaultLoader',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.loader {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba($color: #fff, $alpha: 0.5);
	z-index: 9999;
	overflow: hidden;
	scroll-behavior: none;
}

.half-circle-spinner,
.half-circle-spinner * {
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.half-circle-spinner {
	width: 60px;
	height: 60px;
	border-radius: 100%;
	position: relative;
}

.half-circle-spinner .circle {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
	border-top-color: $coloRed;
	animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
	border-bottom-color: $coloRed;
	animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
