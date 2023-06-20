export default [
	{
		path: '/benefit-list',
		name: 'Benefit List',
		component: () => import('@/views/benefit/BenefitList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Benefit List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'sidebar.benefit',
					url: '/benefit-list',
					active: true,
				},
			],
		},
	},
];
