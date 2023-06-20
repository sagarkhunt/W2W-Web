export default [
	{
		path: '/new-dashboard',
		name: 'NewDashboad',
		component: () => import('@/views/newdashboard/index.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'New Dashboard',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/new-dashboard' },
				{
					title: 'commonDashboard.myDashboard',
					url: '/new-dashboard',
					active: true,
				},
			],
		},
	},
];
