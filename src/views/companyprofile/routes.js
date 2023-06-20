export default [
	{
		path: '/companyprofile',
		name: 'companyprofile',
		component: () => import('@/views/companyprofile/index.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Invites',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'commonDashboard.companyProfile',
					url: 'companyprofile',
					active: true,
				},
			],
		},
	},
];
