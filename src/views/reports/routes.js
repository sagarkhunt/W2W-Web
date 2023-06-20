export default [
	{
		path: '/reports',
		name: 'Reports List',
		component: () => import('@/views/reports/Reports.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Reports',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'sidebar.allReports',
					url: '/reports',
					active: true,
				},
			],
		},
	},
];
