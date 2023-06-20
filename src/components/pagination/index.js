import Pagination from '@/components/pagination/Pagination.vue';

export default {
	install: app => {
		app.component(Pagination.name, Pagination);
	},
};
