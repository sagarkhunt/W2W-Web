import { createRouter, createWebHistory } from 'vue-router';
import { loadLocaleMessages, setI18nLanguage } from '../helpers/I18n';
import { isUserAuthenticated } from '@/helpers/functions';

import invoiceRoutes from '@/views/invoice/routes';
import profileRoutes from '@/views/profile/routes';
import documentRoutes from '@/views/document/routes';
import resumeRoutes from '@/views/resume/routes';
import workdetailsRoutes from '@/views/workdetails/routes';
import jobRoutes from '@/views/job/routes';
import jobBlankLayoutRoutes from '@/views/job/routes';
import teamRoutes from '@/views/team/routes';
import gigWrokHour from '@/views/gigworkhour/routes';
import econtract from '@/views/econtract/routes';
import jobseekerTeam from '@/views/jobseekerTeam/routes';
import teamInvoice from '@/views/teamInvoice/routes';
import invites from '@/views/invites/routes';
import companyprofile from '@/views/companyprofile/routes';
import benefit from '@/views/benefit/routes';
import reports from '@/views/reports/routes';
import store from '@/store'; // store

// setup router
export const setupRouter = i18n => {
	// routes
	const routes = [
		// initial routes - guest routes
		{
			path: '',
			component: () => import('@/layouts/homeLayout/index.vue'),
			children: [
				{
					path: '/logout',
					redirect: '',
				},

				{
					path: '/new-dashboard',
					name: 'New DashBoard',
					component: () => import('@/views/newdashboard/index.vue'),
					meta: {
						allowAnonymous: false,
					},
				},
			],
		},

		{
			path: '/project-market',
			name: 'Project Marker',
			component: () => import('@/views/projectMarket/index.vue'),
			meta: {
				allowAnonymous: false,
			},
		},
		{
			path: '/project-market/:id/:slug',
			name: 'ProjectDetails',
			component: () => import('@/views/projectMarket/components/projectDetails.vue'),
			meta: {
				allowAnonymous: false,
			},
		},

		// invitation-accept
		{
			path: '/invitation-accept-message',
			name: 'invitation-accept',
			component: () => import('@/views/maintenancePage/SuccessMessagePage'),
			meta: {
				allowAnonymous: true,
			},
		},

		// invitation-accept
		{
			path: '/invoicing-accept-message',
			name: 'invoicing-accept',
			component: () => import('@/views/maintenancePage/InvoiceQuickpayVerification'),
			meta: {
				allowAnonymous: true,
			},
		},

		// authentication login routes
		{
			path: '/authlogin',
			name: 'auth-login-page',
			component: () => import('@/views/authentication/SignIn'),
			meta: {
				allowAnonymous: true,
			},
		},
		{
			path: '/authlogin/:token',
			name: 'auth-login-page-verify',
			component: () => import('@/views/authentication/SignIn'),
			meta: {
				allowAnonymous: true,
			},
		},
		
		// authenticated routes
		{
			path: '/',
			component: () => import('@/layouts/dashboardLayout/index.vue'),
			children: [
				{
					path: '/dashboard',
					name: 'Dashboard',
					component: () => import('@/views/dashboard/index.vue'),
					meta: {
						allowAnonymous: false,
						breadcrumb: [
							{ title: 'sidebar.dashboard', url: '/dashboard' },
							{
								title: 'sidebar.dashboard',
								url: '/dashboard',
								active: true,
							},
						],
					},
				},
				...invoiceRoutes, // invoice routes
				...profileRoutes, // profile routes
				...documentRoutes, // document routes
				...resumeRoutes, // resume routes
				...workdetailsRoutes, // work detail routes
				...jobRoutes, // job routes
				...teamRoutes, // team routes
				...gigWrokHour, //gigworkhour
				...econtract, //e-contract
				...jobseekerTeam, //job-seeker-team
				...teamInvoice, //taem-invoice
				...invites, // invites
				...companyprofile, //companyprofile
				...jobBlankLayoutRoutes,
				...benefit,
				...reports,
			],
		},
		// maintenance mode
		{
			path: '/maitenance-page',
			name: 'MaintenancePage',
			component: () => import('@/views/maintenancePage/Maintenance.vue'),
			meta: {
				allowAnonymous: true,
			},
		},
		// 404 path
		{
			path: '/:catchAll(.*)*',
			name: 'ErrorPage',
			component: () => import('@/views/maintenancePage/404ErrorPage.vue'),
			meta: {
				allowAnonymous: true,
			},
		},
	];

	// create router
	const router = createRouter({
		history: createWebHistory(process.env.BASE_URL),
		scrollBehavior() {
			return { x: 0, y: 0 };
		},
		routes,
	});

	const checkHomeRoute = to => {
		if (to.path === '/new-dashboard') {
			return true;
		}
		return store.dispatch('auth/urlStatusAccess').then(res => {
			store.commit('SET_STATE', {
				action: 'isSiteStatusChecked',
				value: true,
			});
			localStorage.setItem('urlStatusAccess', res.data.data.url_access_mode);
			if (res.data.data.url_access_mode) {
				return false;
			} else {
				alert;
				return true;
			}
		});
	};

	// check language message - if not then import
	router.beforeEach(async (to, from, next) => {
		const paramsLocale = localStorage.getItem('lang') || 'fi';

		// load locale messages
		if (!i18n.global.availableLocales.includes(paramsLocale)) {
			await loadLocaleMessages(i18n, paramsLocale);
		}

		// set i18n language
		setI18nLanguage(i18n, paramsLocale);
		const allowRoutes = ['/'];
		// check user validated
		const authState = await isUserAuthenticated();
		if (!allowRoutes.includes(to.path)) {
			store.dispatch('auth/urlStatusAccess');
		}

		if (authState || to.meta.allowAnonymous) {
			if (to.path === '/') {
				return next({ path: '/new-dashboard' });
			} else {
				// authenticated routes
				return next();
			}
		} else {
			return next({
				path: '/authlogin',
			});
		}
	});

	return router;
};
