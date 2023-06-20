<template>
	<div class="table__pagination" style="float:right">
		<nav aria-label="pagination">
			<ul class="pagination">
				<li class="page-item" @click="prevPage">
					<button class="page-link">
						<span aria-hidden="true"> &laquo; {{ t('common.previous') }} </span>
						<span class="sr-only">{{ t('common.previous') }}</span>
					</button>
				</li>
				<li class="page-item pg-inner-row mx-2">
					<div class="pg-inner">
						<ul>
							<li class="page-item" v-for="(page, index) in pages" :key="index" @click="goTo(page)">
								<span class="page-link" :class="{ active: page == current }">
									{{ page }}
								</span>
							</li>
						</ul>
					</div>
				</li>
				<li class="page-item" @click="nextPage">
					<button class="page-link">
						<span aria-hidden="true"> {{ t('common.next') }} &raquo; </span>
						<span class="sr-only">{{ t('common.next') }}</span>
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'TablePagination',

	props: {
		total: {
			type: Number,
			required: true,
		},

		max: {
			default: 9,
			type: Number,
			required: false,
		},

		value: {
			type: Number,
			required: true,
		},
	},

	setup(props, { emit }) {
		const pages = ref([]);
		const prevRange = ref('');
		const nextRange = ref('');
		const current = ref(0);
		const go = ref(0);

		// i18n instance
		const { t } = useI18n({ useScope: 'global' });

		/**
		 * Mounted Properties
		 * *******************************************************************
		 */
		onMounted(() => {
			current.value = go.value = props.value;
			getPages();
		});

		/**
		 * methods
		 * *******************************************************************
		 */
		// get pages
		const getPages = () => {
			if (props.total <= props.max) {
				let tempPages = setPages(1, props.total);
				pages.value = tempPages;
			}

			const even = props.max % 2 === 0 ? 1 : 0;
			if (props.total < 9) {
				prevRange.value = Math.floor(props.max / (props.max / 2));
			} else {
				prevRange.value = Math.floor(props.max / 2);
			}

			nextRange.value = props.total - prevRange.value + 1 + even;

			if (current.value >= prevRange.value && current.value <= nextRange.value && props.total > 9) {
				const start = current.value - prevRange.value + 2;
				const end = current.value + prevRange.value - 2 - even;

				if (props.total <= 9) {
					pages.value = [1, ...setPages(start, end), props.total];
				} else {
					pages.value = [1, '...', ...setPages(start, end), '...', props.total];
				}
			} else if (props.total <= 9) {
				pages.value = [...setPages(1, props.total)];
			} else {
				pages.value = [...setPages(1, prevRange.value), '...', ...setPages(nextRange.value, props.total)];
			}
		};

		// set pages
		const setPages = (start, end) => {
			const setPages = [];
			for (start > 0 ? start : 1; start <= end; start++) {
				setPages.push(start);
			}
			return setPages;
		};

		// next page
		const nextPage = () => {
			if (current.value < props.total) {
				current.value = current.value + 1;
			}
		};

		// prev page
		const prevPage = () => {
			if (current.value > 1) {
				current.value = current.value - 1;
			}
		};

		// go to specific page
		const goTo = page => {
			if (page === '...') {
				return;
			}
			if (typeof page.target === 'undefined') {
				current.value = page;
			} else {
				const value = parseInt(page.target.value, 10);
				go.value = value < 1 ? 1 : value <= props.total ? value : props.total;
				current.value = go.value;
			}
		};

		/**
		 * Watch props
		 * *******************************************************************
		 */
		watch(props, () => {
			getPages();
		});

		watch(current, () => {
			getPages();
			emit('update:value', current.value);
		});

		watch(
			() => props.value,
			val => {
				const pageNum = val < 1 ? 1 : val <= props.total ? val : props.total;
				goTo(pageNum);
			},
		);

		return { t, pages, current, nextPage, prevPage, goTo };
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.table__pagination {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	nav {
		.pagination {
			justify-content: center;

			.page-item {
				cursor: pointer;

				.page-link {
					border: transparent;
					color: $coloRed;

					&:focus {
						box-shadow: none;
					}

					&:hover {
						background-color: transparent;
					}
				}
			}

			.pg-inner-row {
				background-color: $colorLightRed;
				border-radius: 25px;

				.pg-inner {
					background-color: $colorLightRed;
					display: contents;
					overflow: hidden;

					ul {
						display: flex;
						align-items: center;

						.page-item {
							.page-link {
								width: 40px;
								height: 40px;
								border-radius: 100%;
								background-color: transparent;
								padding: 0;
								text-align: center;
								line-height: 40px;

								&.active {
									background-color: $coloRed;
									color: #fff;
								}
								@media (max-width: 576px) {
									width: 20px;
									height: 20px;
									line-height: 30px;
								}
							}
						}
					}
				}
			}
		}
	}
}

@media (max-width: 576px) {
	.table__pagination {
		nav {
			.pagination {

				.page-item {
					.page-link {
						margin: 0 auto;
						font-size: 12px;
					}
				}

				.pg-inner-row {
					.pg-inner {
						ul {
							display: flex;
						}
					}
				}
			}
		}
	}
}
</style>
