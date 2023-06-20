import ToolTip from '@/components/tooltip/ToolTip.vue';

export default {
	install: app => {
		app.component(ToolTip.name, ToolTip);
	},
};
