export default [
	{
		path: '/invites',
		name: 'Invites',
		component: () => import('@/views/invites/index.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'commonDashboard.Invites',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'commonDashboard.Invites', url: '/invites' },
			],
		},
	},
	{
		path: '/companyinvites',
		name: 'CompanyInvites',
		component: () => import('@/views/invites/companyInvites.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'commonDashboard.Invites',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'commonDashboard.Invites', url: '/invites' },
			],
		},
	},
];
