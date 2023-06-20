<template>
	<div class="dashboard__sidebar" @mouseover="$emit('toggleDashboardSidebar')">
		<!-- sidebar links -->
		<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" @mouseover="toggleDashboardSidebar" @mouseleave="toggleDashboardSidebarMouseleave">
			<div v-for="(menu, index) in navMenuItems" :key="index" class="cursor-pointer">
				<router-link
					v-if="menu.url"
					:to="menu.url"
					class="nav-link"
					active-class="active"
					:class="{ active: route.meta.activeLink === menu.url, cursorDisable: !['/update-profile', '/companyprofile'].includes(menu.url) && profileCompleteFlag }"
					@click="resetToggle"
				>
					<div class="d-flex align-items-center">
						<div class="sidebar-icon-wrap">
							<span class="nav-link-icon">
								<img :src="menu.icon" class="img-fluid" alt="" />
							</span>
						</div>
						<span class="res-hide">{{ t(`sidebar.${menu.name}`) }}</span>
					</div>
					<div class="left-arrow">
						<FontAwesomeIcon :icon="leftArrowIcon" />
					</div>
				</router-link>

				<div v-else>
					<div class="nav-link my-1 cursor-pointer" :class="{ active: isToggleActive(menu, index) }" @click="toggleChildElems(index)">
						<div class="d-flex align-items-center">
							<div class="sidebar-icon-wrap">
								<span class="nav-link-icon">
									<img :src="menu.icon" class="img-fluid" alt="" />
								</span>
							</div>

							<span class="res-hide">{{ t(`sidebar.${menu.name}`) }}</span>
						</div>

						<div v-if="expandedItem === index" class="left-arrow">
							<FontAwesomeIcon :icon="downArrowIcon" />
						</div>

						<div v-else class="left-arrow">
							<FontAwesomeIcon :icon="leftArrowIcon" />
						</div>
					</div>

					<ul v-if="expandedItem === index">
						<li v-for="(childItem, index2) in menu.childrens" :key="index2" class="px-2xl-5 px-xl-3 px-2 ">
							<router-link
								v-if="childItem.url"
								:to="childItem.url"
								class="nav-link nav-child-link"
								active-class="active"
								:class="{ active: route.meta.activeLink === childItem.url, cursorDisable: !['/update-profile', '/companyprofile'].includes(childItem.url) && profileCompleteFlag }"
							>
								<div class="d-flex align-items-center">
									<div class="sidebar-sub-menu-icon-wrap">
										<span class="nav-link-icon">
											<img :src="childItem.icon" class="img-fluid" alt="" />
										</span>
									</div>
									<span class="res-hide">{{ t(`sidebar.${childItem.name}`) }}</span>
								</div>

								<div class="left-arrow">
									<FontAwesomeIcon :icon="leftArrowIcon" />
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import navMenuItems from './navItems';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'Sidebar',

	// components
	components: {
		FontAwesomeIcon,
	},

	// composition api
	setup() {
		// global route
		const route = useRoute();
		const expandedItem = ref(null);

		// icon
		const leftArrowIcon = faChevronRight;
		const downArrowIcon = faChevronDown;

		// i18n instance
		const { t } = useI18n({
			useScope: 'global',
		}); //  use i18n

		// store
		const store = useStore();

		/**
		 * Computed
		 * ********************************************************
		 */
		const profileCompleteFlag = computed(() => {
			return store.state.auth.incompleteProfileFlag;
		});

		const isToggleActive = computed(() => {
			return (menu, index) => {
				if ((menu.childrens && menu.childrens.find(x => x.url === route.path)) || expandedItem.value === index) {
					return true;
				}
				return false;
			};
		});

		/**
		 * Methods
		 * ********************************************************
		 */
		const toggleChildElems = index => {
			if (expandedItem.value === index) {
				expandedItem.value = null;
				return false;
			}
			expandedItem.value = index;
		};

		const resetToggle = () => {
			expandedItem.value = null;
		};

		return {
			t,
			navMenuItems,
			route,
			expandedItem,

			// icon
			leftArrowIcon,
			downArrowIcon,

			// computed
			isToggleActive,
			profileCompleteFlag,

			// methods
			toggleChildElems,
			resetToggle,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

// --dashboard--
.dashboard__sidebar {
	.cursorDisable {
		cursor: not-allowed !important;
		pointer-events: none !important;
	}

	.cursor-pointer {
		cursor: pointer;
	}

	// sidebar toggle icon
	.dt-icons {
		text-align: center;

		.btn-navigate {
			margin: 0 auto;
			margin-bottom: 20px;
			cursor: pointer;

			svg {
				width: 30px;
				height: auto;
			}
		}
	}

	.nav {
		background-color: $ashGrey;
		border-radius: 15px;
		overflow: hidden;
		transition: $transition;
		margin-top: 15px;

		@media (max-width: 1024px) {
			min-height: 73vh;
			height: 100%;
			margin-top: 0;
			overflow: auto;
		}

		@media (max-width: 575px) {
			height: 100vh;
			min-height: auto;
			display: block;
			border-radius: 0;
		}
		.nav-link {
			color: $colorBlack;
			padding: 12px 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			transition: $transition;

			.nav-link-icon {
				display: inline-block;
				margin-right: 15px;
				width: 50px;
				height: 50px;
				display: flex;
				align-content: center;
				background-color: #808080;
				border-radius: 100%;
				text-align: center;
				justify-content: center;

				@media (max-width: 1025px) {
					width: 30px;
					height: 30px;
					line-height: 30px;
				}

				svg {
					font-size: 25px;
				}
			}

			.res-hide {
				white-space: nowrap;

				@media (max-width: 1025px) {
					font-size: 13px;
				}
			}

			&.active {
				background-color: $coloRed;
				border-radius: 8px;
				color: #fff;

				.nav-link {
					.nav-link-icon {
						background-color: transparent;
					}
				}

				.res-hide {
					font-weight: 500;
				}
			}
		}
	}
}

.dash-nav-responsive {
	.nav {
		.nav-link {
			text-align: center;
			transition: all 0s;
			display: flex;
			justify-content: center;

			@media (max-width: 425px) {
				width: 50px;
			}

			&.active {
				background-color: transparent !important;
				padding: 0;

				.sidebar-icon-wrap {
					width: 100px;
					height: 75px;
					border-radius: 10px;
					background-color: #ff4b57;
					display: flex;
					align-items: center;
					justify-content: center;

					@media (max-width: 1025px) {
						width: 50px;
						height: 50px;
					}
				}

				&.nav-child-link {
					width: 80px;

					.sidebar-sub-menu-icon-wrap {
						width: 65px;
						height: 65px;
						background-color: #ff4b57;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 10px;
					}
				}
			}

			&::after {
				display: none;
			}

			.res-hide {
				display: none;
				white-space: nowrap;
			}

			.nav-link-icon {
				margin: 0;
			}
		}
	}
}

.dashboard__layout_row {
	.dash-nav-responsive {
		width: 10%;
		transition: all 0s;

		.nav {
			.nav-link {
				.left-arrow {
					display: none !important;
				}
			}
		}
	}
}

@media (max-width: 992px) {
	.dashboard__sidebar {
		.dt-icons {
			display: none;
		}

		.nav {
			.nav-link {
				transition: $transition;

				&::after {
					display: block;
				}

				.res-hide {
					font-size: 13px;
				}

			}
		}
	}

	.dash-nav-responsive {
		.nav {
			.nav-link {
				&::after {
					display: block;
				}

				.res-hide {
					display: none;
					margin-left: 10px;
				}

				.nav-link-icon {
					display: block;
				}
			}
		}
	}
}

</style>
