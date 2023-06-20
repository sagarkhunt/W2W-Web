<template>
	<div class="data__table">
		<div class="table__header" v-if="search || header">
			<div class="header__left">
				<slot name="header"></slot>
			</div>
			<div class="header__right" v-if="search">
				<input type="text" v-model="searchx" class="form-control" :placeholder="t('common.search')" />
			</div>
		</div>

		<div class="table__data">
			<div class="table-responsive">
				<table class="table theme-table">
					<thead>
						<tr>
							<slot name="thead"></slot>
						</tr>
					</thead>
					<tbody v-if="!isNoData">
						<slot name="data" :data="datax"></slot>
					</tbody>
				</table>
				<div v-if="isNoData" class="text-center p-4">
					{{ noDataText }}
				</div>
			</div>
		</div>

		<pagination v-if="pagination && !isNoData" v-model:value="currentx" :total="searchx && !sst ? getTotalPagesSearch : getTotalPages" :max="maxPagesToShow" />
	</div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'DataTable',

	props: {
		// no data text
		noDataText: {
			default: 'No data available',
			type: String,
		},

		data: {
			default: null,
		},

		search: {
			default: false,
			type: Boolean,
		},

		header: {
			default: false,
			type: Boolean,
		},

		pagination: {
			default: false,
			type: Boolean,
		},

		sst: {
			default: false,
			type: Boolean,
		},

		total: {
			type: Number,
			default: 0,
		},

		maxItems: {
			default: 5,
			type: [Number, String],
		},
	},

	setup(props, { emit }) {
		const currentx = ref(1);
		const maxItemsx = ref(5);
		const datax = ref([]);
		const currentSortKey = ref(null);
		const currentSortType = ref(null);
		const searchx = ref(null);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			maxItemsx.value = props.maxItems;
			loadData();
		});

		/**
		 * Computed Properties
		 * *******************************************************************
		 */
		const getTotalPages = computed(() => {
			const totalLength = props.sst && props.total ? props.total : props.data.length;
			return Math.ceil(totalLength / props.maxItems);
		});

		const getTotalPagesSearch = computed(() => {
			return Math.ceil(queriedResults.value.length / props.maxItems);
		});

		const queriedResults = computed(() => {
			let queriedResults = props.data;
			if (searchx.value && props.search) {
				let dataBase = props.data;
				queriedResults = dataBase.filter(tr => {
					let values = getValues(tr)
						.toString()
						.toLowerCase();
					return values.indexOf(searchx.value.toLowerCase()) != -1;
				});
			}
			return queriedResults;
		});

		const maxPagesToShow = computed(() => {
			if (searchx.value && !props.sst) {
				return getTotalPagesSearch.value > 9 ? 9 : getTotalPagesSearch.value;
			} else {
				return getTotalPages.value > 9 ? 9 : getTotalPages.value;
			}
		});

		const isNoData = computed(() => {
			if (typeof datax.value == Object) {
				return datax.value ? Object.keys(datax.value).length == 0 : false && props.search;
			} else {
				return datax.value ? datax.value.length == 0 : false && props.search;
			}
		});

		/**
		 * Methods
		 * *******************************************************************
		 */
		const loadData = () => {
			if (!searchx.value || props.sst) {
				datax.value = props.pagination ? getItems() : sortItems(props.data) || [];
			} else {
				datax.value = props.pagination ? getItemsSearch() : getItemsSearch() || [];
			}
		};

		const getItems = () => {
			return sortItems(props.data);
		};

		const sortItems = data => {
			function compare(a, b) {
				if (a[currentSortKey.value] < b[currentSortKey.value]) {
					return currentSortType.value == 'desc' ? 1 : -1;
				}

				if (a[currentSortKey.value] > b[currentSortKey.value]) {
					return currentSortType.value == 'desc' ? -1 : 1;
				}

				return 0;
			}

			return currentSortType.value !== null ? [...data].sort(compare) : [...data];
		};

		const getItemsSearch = () => {
			const search = normalize(searchx.value);

			return sortItems(props.data).filter(tr => {
				return normalize(getValues(tr).toString()).indexOf(search) != -1;
			});
		};

		const normalize = string => {
			return string
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.toLowerCase();
		};

		const getValues = obj => {
			function flattenDeep(val) {
				return Object.values(val || []).reduce((acc, val) => (typeof val === 'object' ? acc.concat(flattenDeep(val)) : acc.concat(val)), []);
			}

			return flattenDeep(obj).filter(function(item) {
				return typeof item === 'string' || typeof item === 'number';
			});
		};

		const sort = (key, sortType) => {
			currentSortKey.value = key;
			currentSortType.value = sortType;

			if (props.sst) {
				emit('sort', key, sortType);
				return;
			}

			loadData();
		};

		/**
		 * Watch props
		 * *******************************************************************
		 */
		watch(currentx, () => {
			if (props.sst) {
				emit('changePage', currentx.value);
			} else {
				loadData();
			}
		});

		watch(searchx, () => {
			if (props.sst) {
				emit('search', searchx.value);
			} else {
				loadData();
				currentx.value = 1;
			}
		});

		watch(
			() => props.maxItems,
			val => {
				maxItemsx.value = val;
				loadData();
			},
		);

		watch(maxItemsx, () => {
			loadData();
		});

		watch(
			() => props.data,
			() => {
				loadData();
			},
		);

		return {
			t,
			currentx,
			datax,
			searchx,
			getTotalPages,
			getTotalPagesSearch,
			isNoData,
			sort,
			maxPagesToShow,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.data__table {
	.table__header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin: 30px 0px;
		border-radius: 10px;

		@media (max-width: 768px) {
			display: block;
		}

		.header__left {
			display: flex;
			align-items: center;
		}

		.header__right {
			.form-control {
				padding: 12px 15px;
				background-color: #fff;
				height: 50px;
				border: 1px solid #e7e7e7;
				border-radius: 25px;
				width: 100%;
				color: $colorPurple;

				@media (max-width: 576px) {
					height: 50px;
					line-height: 27px;
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.data__table {
		.table__header {
			display: block;
			text-align: center;

			.header__left {
				margin-bottom: 10px;
				justify-content: center;
			}

			.header__right {
				.form-control {
					padding: 10px 15px;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
