import { createApp } from 'vue';
import Vuex from 'vuex';
import VueFinalModal from 'vue-final-modal';
import VCalendar from 'v-calendar'; // vue datepicker, calendar
import Toast from 'vue-toastification'; // toast

import App from './App.vue'; // app
import { setupRouter } from './router'; // router
import store from './store'; // store
import { i18n } from './helpers/I18n'; // i18n
import axios from '@/helpers/axios'; // axios
// global custom components
import Pagination from '@/components/pagination'; // pagination
import DataTable from '@/components/dataTable'; // dataTable
import NewDataTable from '@/components/dataTable/newIndex';
import DropZone from '@/components/dropzone'; // dropzone
import Swal from '@/components/sweetalert'; // sweetaler2
import VueGoogleMaps from '@fawmi/vue-google-maps'; // google map
import VueSignaturePad from 'vue-signature-pad';
import VueSplide from '@splidejs/vue-splide'; //;Splide
import directionsRenderer from './components/DirectionsRenderer';
import ToolTip from '@/components/tooltip'; //tooltip
import { createMetaManager, plugin as metaPlugin } from 'vue-meta';
// vue tour
import Vue3Tour from 'vue3-tour';

import 'vue3-tour/dist/vue3-tour.css';

// social share
import VueSocialSharing from 'vue-social-sharing';

// social login
import vue3GoogleLogin from 'vue3-google-login';

// input maska
import Maska from 'maska';

// bootstrap css
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// main sass file
import '@/assets/scss/main.scss';

// main css file
import '@/assets/css/main.css';


// setup router
export const router = setupRouter(i18n);

const metaManager = createMetaManager();

createApp(App)
	.use(Pagination)
	.use(DataTable)
	.use(DropZone)
	.use(NewDataTable)
	.use(Swal)
	.use(Vuex)
	.use(i18n)
	.use(store)
	.use(router)
	.use(VueFinalModal())
	.use(VCalendar, {})
	.use(Toast)
	.use(ToolTip)
	.use(metaManager)
	.use(metaPlugin)
	.use(VueSignaturePad)
	.use(VueSocialSharing)
	.use(Maska)
	.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyAvEaJtEJVrovB5tQU7QQ6OKLr5L2NsRG0',
			libraries: 'places',
		},
	})
	.use(vue3GoogleLogin, {
		clientId: '183263020099-pr31rqrjgafdit3rmc1en6m9k9fpq6dv.apps.googleusercontent.com',
	})
	.use(Vue3Tour)
	.component('directionsRenderer', directionsRenderer)
	.use(VueSplide)
	.provide('$axios', axios)
	.mount('#app');
