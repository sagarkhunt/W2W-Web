<template>
	<div class="table__header">
		<slot name="header"></slot>

		<div class="header__left">
			<slot name="header"></slot>
		</div>
		<div class="header__right">
			<input type="text" class="form-control" placeholder="Search here..." />
		</div>
	</div>
</template>

<script>
export default {
	name: 'TableHeader',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.table__header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	margin: 30px 0px;
	@media (max-width: 768px) {
		display: block;
	}

	.header__left {
		display: flex;
		align-items: center;

		span {
			font-weight: 500;
		}

		.dropdown {
			margin: 0px 20px;

			.dropdown-toggle {
				color: #000;

				&:hover {
					border-color: $colorExLightGray !important;
					color: #000 !important;
				}
			}
		}
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

@media (max-width: 576px) {
	.table__header {
		display: block;
		text-align: center;

		.header__left {
			margin-bottom: 10px;
			justify-content: center;

			span {
				font-size: 14px;
			}
		}

		.header__right {
			.form-control {
				padding: 10px 15px;
				font-size: 14px;
			}
		}
	}
}
</style>
