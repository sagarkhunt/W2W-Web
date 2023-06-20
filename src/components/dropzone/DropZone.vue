<template>
	<div class="dropzone" id="dropImage" ref="first" v-bind="getRootProps()">
		<div class="dropzone-text">
			<div class="dropzone-info">
				<div>
					<p :class="titleText">{{ title }}</p>
					<span :class="textColor">{{ subTitle }}</span>
				</div>

				<button v-if="isUploadButton" class="btn-choose">Select File</button>
			</div>
		</div>
		<div class="fallback">
			<input v-bind="getInputProps()" />
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

export default {
	name: 'DropZone',

	props: {
		// multiple file select
		isMultiple: {
			default: false,
			type: Boolean,
		},

		// file max size
		maxSize: {
			default: 10485760, // 5 Mb
			type: Number,
		},

		// accept files
		acceptFiles: {
			default: () => ['.png', '.pdf', '.jpg', '.jpeg', '.docx'],
			type: Array,
		},

		// title
		title: {
			default: () => {
				const { t } = useI18n({ useScope: 'global' });
				return t('document.uploadFile')
			},
			type: String,
		},

		// sub title
		subTitle: {
			default: 'PDF, DOC, PPT, JPG, PNG',
			type: String,
		},

		//is upload button shoe
		isUploadButton: {
			default: true,
			type: Boolean,
		},

		disabled: {
			default: false,
			type: Boolean,
		},

		titleText: {
			default: '',
			type: String,
		},

		textColor: {
			default: '',
			type: String,
		},
	},

	setup(props, { emit }) {
		// icons
		const cloudUploadIcon = faCloudUploadAlt;

		const isMultipleFileSelect = ref(props.isMultiple);
		const maxFileSize = ref(props.maxSize);
		const acceptFileTypes = ref(props.acceptFiles);

		// toast
		const toast = useToast();
		const { t } = useI18n({ useScope: 'global' });

		/**
		 * Methods
		 * *******************************************************************
		 */

		// on file upload
		const onDrop = (acceptFiles, rejectReasons, event) => {
			if (rejectReasons.length) {
				const fileSize = Math.round(rejectReasons[0].file.size / 1024 ** 2);
				if (10 <= fileSize) {
					toast.error(t('common.fileMessage'));
					return false;					
				}
			}

			// emit response
			emit('fileDrop', acceptFiles, rejectReasons, event);
		};

		// dropzone
		const { getRootProps, getInputProps, ...rest } = useDropzone({
			multiple: isMultipleFileSelect,
			onDrop,
			maxSize: maxFileSize,
			accept: acceptFileTypes,
			disabled: props.disabled,
		});

		const handleNameDYnamic= ()=>{
			return 'Upload'
		}

		return { t,cloudUploadIcon, getRootProps, handleNameDYnamic, getInputProps, ...rest };
	},
};
</script>

<style lang="scss">
.dropzone {
	width: 100%;
	cursor: pointer;

	.dropzone-info {
		display: flex;
		justify-content: space-between;

		.btn-choose {
			padding: 8px 12px;
			background-color: #273238;
			color: #fff;
			border-radius: 12px;
		}
	}
}

.text-gray {
	color: #a0a4aa;
}

.bold {
	font-weight: 600;
}

.semibold {
	font-weight: 500;
}
</style>
