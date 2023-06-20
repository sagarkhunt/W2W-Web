<template>
	<th colspan="1" rowspan="1" @click="handleSort">
		<div class="vs-table-text d-flex justify-content-between">
			<slot></slot>
			<span v-if="sortType && sortType === 'ASC'">
				<FontAwesomeIcon :icon="upArrow" />
			</span>

			<span v-if="sortType && sortType === 'DESC'">
				<FontAwesomeIcon :icon="downArrow" />
			</span>
		</div>
	</th>
</template>

<script>
import emiter from '@/helpers/eventHub';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { onBeforeUnmount } from '@vue/runtime-core';
export default {
	name: 'NewTbTh',

	components: {
		FontAwesomeIcon,
	},

	data() {
		return {
			sortType: null,
			sortKeyName: null,
		};
	},

	setup() {
		const upArrow = faAngleUp;
		const downArrow = faAngleDown;

		onBeforeUnmount(() => {
			emiter.$off('updateColumnSort');
		});

		return {
			upArrow,
			downArrow,
		};
	},

	mounted() {
		emiter.$on('updateColumnSort', data => {
			if (data.sortKey !== this.sortKeyName) {
				this.sortType = null;
			}
		});
	},

	methods: {
		handleSort(e) {
			const sortKey = e.target.parentNode.getAttribute('sort-key');
			if (sortKey) {
				this.sortKeyName = sortKey;
				this.sortType = this.sortType && this.sortType === 'DESC' ? 'ASC' : 'DESC';
				this.$parent.sort({ key: sortKey, sortType: this.sortType });

				emiter.$emit('updateColumnSort', { sortKey, sortType: this.sortType });
			}
		},
	},
};
</script>

<style lang="scss" scoped>
th {
	font-size: 16px;
	font-weight: 400;
	color: #fff;
	overflow: hidden;
	background: #000 !important;
	cursor: pointer;
}
table th {
	vertical-align: middle;
	border-right: 1px solid #fff;
	border-top: none;
	cursor: pointer;

	&:last-child {
		border-right: none;
	}
}
</style>
