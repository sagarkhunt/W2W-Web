<template>
	<div ref="convstooltip" class="con-vs-tooltip" @mouseleave="mouseleavex" @mouseenter="mouseenterx">
		<transition name="tooltip-fade">
			<div v-show="activeTooltip" ref="vstooltip" :class="[`vs-tooltip-${positionx || position}`, `vs-tooltip-${color}`, { 'after-none': noneAfter }]" :style="style" class="vs-tooltip">
				<slot name="content">
					<h4 v-if="title">{{ title }}</h4>
					{{ text }}
				</slot>
			</div>
		</transition>
		<slot></slot>
	</div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import _color from '@/utils/color.js';
import { nextTick, onBeforeUnmount } from '@vue/runtime-core';

export default {
	name: 'ToolTip',

	props: {
		title: {
			default: null,
			type: [String, Number],
		},
		text: {
			default: null,
			type: [String, Number],
		},
		color: {
			default: null,
			type: String,
		},
		position: {
			default: 'top',
			type: String,
		},
		delay: {
			default: '0s',
			type: [Number, String],
		},
		active: {
			default: false,
			type: [Boolean],
		},
		value: Boolean,
	},

	setup(props) {
		// ref
		const cords = ref({});
		const activeTooltip = ref(props.value);
		const widthx = ref('auto');
		const positionx = ref(null);
		const noneAfter = ref(false);
		const vstooltip = ref(null);
		const convstooltip = ref(null);

		// computed
		const style = computed(() => {
			return {
				left: cords.value.left,
				top: cords.value.top,
				transitionDelay: activeTooltip.value ? props.delay : '0s',
				background: _color.getColor(props.color, 1),
				width: widthx.value,
			};
		});

		// methods
		const mouseleavex = () => {
			activeTooltip.value = false;

			if (vstooltip) {
				document.body.removeChild(vstooltip.value);
			}
		};

		const mouseenterx = () => {
			activeTooltip.value = true;

			nextTick(() => {
				document.body.insertBefore(vstooltip.value, document.body.firstChild);
				changePosition(convstooltip, vstooltip);
			});
		};

		const changePosition = (element, tooltip) => {
			noneAfter.value = false;
			positionx.value = null;

			let elx = element.value.closest('.con-vs-tooltip');
			let scrollTopx = window.pageYOffset || document.documentElement.scrollTop;
			let topx = elx.getBoundingClientRect().top + scrollTopx - tooltip.value.clientHeight - 4;
			let leftx = elx.getBoundingClientRect().left - tooltip.value.clientWidth / 2 + elx.clientWidth / 2;
			let widthx = elx.clientWidth;

			if (props.position === 'bottom') {
				topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
			} else if (props.position === 'left') {
				leftx = elx.getBoundingClientRect().left - tooltip.clientWidth - 4;
				topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight / 2 - tooltip.clientHeight / 2;

				if (Math.sign(leftx) === -1) {
					leftx = elx.getBoundingClientRect().left;
					topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
					positionx.value = 'bottom';
					noneAfter.value = true;
				}
			} else if (props.position === 'right') {
				leftx = elx.getBoundingClientRect().left + elx.clientWidth + 4;
				topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight / 2 - tooltip.clientHeight / 2;

				if (window.innerWidth - (leftx + tooltip.clientWidth) <= 20) {
					leftx = elx.getBoundingClientRect().left - tooltip.clientWidth / 2 - 10;
					topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
					positionx.value = 'bottom';
					noneAfter.value = true;
				}
			}

			cords.value = {
				left: `${leftx}px`,
				top: `${topx}px`,
				width: `${widthx}px`,
			};
		};

		onBeforeUnmount(() => {
			if (vstooltip && activeTooltip.value) {
				document.body.removeChild(vstooltip.value);
			}
		});

		return {
			// ref
			vstooltip,
			positionx,
			noneAfter,
			activeTooltip,
			convstooltip,

			// computed
			style,

			// methods
			mouseleavex,
			mouseenterx,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/components/tooltip/tooltip.scss';
</style>
