import DropZone from '@/components/dropzone/DropZone.vue';

export default {
	install: app => {
		app.component(DropZone.name, DropZone);
	},
};
