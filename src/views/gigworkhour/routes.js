export default [
	{
		path: '/gigworkhour',
		name: 'Manage GigWrokHour',
		component: () => import('@/views/gigworkhour/GigWorkHourList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Gig Work Hour',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.ManageGigWorkHour',
					url: '/gigworkhour/list',
					active: true,
				},
			],
		},
	},
	{
		path: '/gigworkhour/view/:id',
		name: 'ViewGigWorkDetail',
		component: () => import('@/views/gigworkhour/ViewGigWorkDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View GigWork Detail',
			activeLink: '/gigworkhour',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.GigWorkHour', url: '/gigworkhour/list' },
				{
					title: 'headerField.headerTitle.GigWorkHourDetail',
					url: route => {
						return `/gigwork/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
];
