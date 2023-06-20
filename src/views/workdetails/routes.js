export default [
	{
		path: '/worked-details',
		name: 'Worked Details',
		component: () => import('@/views/workdetails/WorkDetailList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Work Detail List',
			activeLink: '/work-details',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageWorkDetails',
					url: '/worked-details',
					active: true,
				},
			],
		},
	},
	{
		path: '/worked-details/add',
		name: 'Add Worked Details',
		component: () => import('@/views/workdetails/AddWorkDetails.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Add Worked Details',
			activeLink: '/worked-details',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageWorkDetails',
					url: '/worked-details',
				},
				{
					title: 'headerField.headerTitle.AddWorkedDetails',
					url: '/worked-details/add',
				},
			],
		},
	},
	{
		path: '/worked-details/edit/:id',
		name: 'Edit Worked Details',
		component: () => import('@/views/workdetails/EditWorkDetails.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Edit Worked Details',
			activeLink: '/worked-details',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageWorkDetails',
					url: '/worked-details',
				},
				{
					title: 'headerField.headerTitle.EditWorkedDetails',
					url: '/worked-details/edit',
				},
			],
		},
	},
];
