import NewDataTable from '@/components/dataTable/NewDataTable.vue';
import NewTableTh from '@/components/dataTable/components/NewTableTh.vue';
import NewTableTr from '@/components/dataTable/components/NewTableTr.vue';
import NewTableTd from '@/components/dataTable/components/NewTableTd.vue';

export default {
	install: app => {
		app.component(NewDataTable.name, NewDataTable);
		app.component(NewTableTh.name, NewTableTh);
		app.component(NewTableTr.name, NewTableTr);
		app.component(NewTableTd.name, NewTableTd);
	},
};
