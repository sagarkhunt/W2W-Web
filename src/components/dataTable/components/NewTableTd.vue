<template>
	<td ref="td">
		<span>
			<slot></slot>
		</span>
	</td>
</template>

<script>
export default {
	name: 'NewTbTd',
};
</script>

<style scoped>
td {
	border-right: 1px solid #dee2e6;
	white-space: nowrap;
	max-width: 280px;
	overflow: hidden;
	text-overflow: ellipsis;
}
td:last-child {
	border-right: none !important;
}
table td {
	vertical-align: middle;
	padding: 0.75rem;
}
</style>
