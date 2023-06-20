export default [
	{
		path: '/econtract',
		name: 'Manage  E-Contract',
		component: () => import('@/views/econtract/EContractList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'E contract',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.Manageecontract',
					url: '/econtract/list',
					active: true,
				},
			],
		},
	},
];
