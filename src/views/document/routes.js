export default [
	{
		path: '/documents',
		name: 'Manage Documents',
		component: () => import('@/views/document/DocumentList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Project Market / Manage Documents',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageDocuments',
					url: '/documents/list',
					active: true,
				},
			],
		},
	},
	//view seeker pay sleep details
	{
		path: '/documents/view-pay-slip/:id',
		name: 'ViewSeekerPaySleepDetail',
		component: () => import('@/views/document/components/ViewSeekerPaySleepDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Seeker Pay slip Detail',
			activeLink: '/documents',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageDocuments', url: '/invoice/list' },
				{
					title: 'headerField.headerTitle.viewPaySlip',
					url: route => {
						return `/documents/view-pay-slip/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
];
