<template>
	<vue-final-modal v-model="modalShow" classes="modal modal-container upload_contract" content-class="modal-content px-0 pb-0">
		<!-- close btn -->
		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalShow = false">
			<span aria-hidden="true">
				<FontAwesomeIcon :icon="closeIcon" />
			</span>
		</button>

		<!-- modal content -->
		<div class="modal__content">
			<!-- modal header -->
			<div class="modal-header">
				<h5 class="title-lg">
					<h5 class="title-lg">{{t('managerAccount.image_cropper')}}</h5>
				</h5>
			</div>

			<!-- modal body -->
			<div class="modal-body">
				<div class="modal-form">
					<cropper ref="cropper" class="cropper" @change="change" :src="image.src" :stencil-component="stencilComponent" />
					<div class="button-wrapper">
						<button class="button" @click="$refs.file.click()">
							<input type="file" ref="file" @change="uploadImage($event)" accept="image/*" />
							{{t('managerAccount.upload_image')}}
						</button>
						<button class="button" @click="cropImage()">{{t('managerAccount.crop_image')}}</button>
					</div>
				</div>
			</div>
		</div>
	</vue-final-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

export default defineComponent({
	name: 'ImageCropper',
	components: {
		Cropper,
		FontAwesomeIcon,
	},
	props: {
		// modal status
		isModalShow: Object,
	},
	data() {
		return {
			image: {
				src: '',
				type: '',
				isRound: true,
			},
		};
	},
	computed: {
		stencilComponent() {
			return CircleStencil;
		},
	},
	methods: {
		change(result) {
			console.log(result);
		},
		cropImage() {
			const result = this.$refs.cropper.getResult();
			if (result.canvas == undefined) {
				this.toast.error('Please Select Image');
				return;
			}
			this.$emit('imageUpdated', result.canvas.toDataURL(this.image.type), this.image.type);

			// this.$emit('imageType', this.image.type);
			this.modalShow = false;
		},
		uploadImage(event) {
			/// Reference to the DOM input element
			const { files } = event.target;
			// Ensure that you have a file before attempting to read it
			if (files && files[0]) {
				// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src);
				}
				// 2. Create the blob link to the file to optimize performance:
				const blob = URL.createObjectURL(files[0]);

				// 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
				this.image = {
					src: blob,
					type: files[0].type,
				};
			}
		},
	},


	setup(props) {
		const modalShow = ref(props.isModalShow);
		const closeIcon = faTimes;
		// toast
		const toast = useToast();
		const { t } = useI18n({ useScope: 'global' });

		return {
			modalShow,
			closeIcon,
			toast,
			t
		};
	},
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/modal.scss';

.upload_contract {
	padding: 0;

	.modal__content {
		padding: 0;
		overflow: auto;

		.modal-header {
			padding: 30px;
		}

		.modal-body {
			padding: 30px;
			overflow: scroll;

			&::-webkit-scrollbar {
				display: none;
			}

			form {
				max-height: 60vh;

				.time__selector {
					padding: 9px 15px;
				}

				.document_file_error {
					position: absolute;
					bottom: 0;
					left: 20px;
					margin-top: 20px;
				}
			}
		}
	}

	@media (max-width: 576px) {
		.modal__content {
			.modal-header {
				display: block;
				padding: 20px;
			}
			.modal-body {
				padding: 15px;
				.button-wrapper {
					.button {
						padding: 10px;
						font-size: 15px;
					}
				}
			}
		}
	}
}
.table thead th {
	border-bottom: transparent;
}

.table td {
	border-right: 2px solid #dee2e6;

	&:last-child {
		border-right: transparent;
	}
}
</style>

<style lang="scss" scoped>
:deep .modal-content {
	width: 100% !important;
	max-width: 600px !important;
	min-width: auto !important;
}
</style>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

.cropper {
	max-height: 500px;
}

.button-wrapper {
	display: flex;
	justify-content: center;
	margin-top: 17px;
}

.button {
	color: white;
	font-size: 16px;
	padding: 10px 20px;
	width: 100%;
	background: #151515;
	cursor: pointer;
	transition: background 0.5s;
	border: none;
}
.button:not(:last-of-type) {
	margin-right: 10px;
}
.button:hover {
	background: #2f2f2f;
}
.button input {
	display: none;
}
</style>
