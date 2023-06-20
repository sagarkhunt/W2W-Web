export default [
	{
		path: '/light-entreprenuers',
		name: 'LightEnterprenuers',
		component: () => import('@/views/team/LightEnterprenuers.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage LightEntrepreneurs',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.ManageLightentreprenuers',
					url: '/light-entreprenuers',
					active: true,
				},
			],
		},
	},
	//view job seeker rating view
	{
		path: '/light-entreprenuers/rating/view/:id',
		name: 'ViewSeekerRatingDetail',
		component: () => import('@/views/team/components/SeekerRating.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Seeker Rating Detail',
			activeLink: '/light-entreprenuers',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.SeekerInvoice', url: '/invoice/list' },
				{
					title: 'headerField.headerTitle.SeekerInvoice',
					url: route => {
						return `/invoice/Seeker/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
];
