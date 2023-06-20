export default [
	{
		path: '/my-resume',
		name: 'My Resume',
		component: () => import('@/views/resume/MyResume.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: ' Project Market / My Resume',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.projectMarketMyResume',
					url: '/my-resume',
					active: true,
				},
			],
		},
	},
];
