import DataTable from '@/components/dataTable/DataTable.vue';
import TableTh from '@/components/dataTable/components/TableTh.vue';
import TableTr from '@/components/dataTable/components/TableTr.vue';
import TableTd from '@/components/dataTable/components/TableTd.vue';

export default {
	install: app => {
		app.component(DataTable.name, DataTable);
		app.component(TableTh.name, TableTh);
		app.component(TableTr.name, TableTr);
		app.component(TableTd.name, TableTd);
	},
};
