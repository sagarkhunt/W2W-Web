export default [
	{
		path: '/team-member',
		name: 'Manage Team',
		component: () => import('@/views/profile/TeamMember.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage Team',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageTeam',
					url: '/team-member',
					active: true,
				},
			],
		},
	},  
	{
		path: '/update-profile',
		name: 'Manage Account',
		component: () => import('@/views/profile/UpdateProfile.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage Account',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageAccount',
					url: '/update-profile',
					active: true,
				},
			],
		},
	},

	{
		path: '/profile/company',
		name: 'Company Profile',
		component: () => import('@/views/profile/CompanyProfile.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Company Profile',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'sidebar.dashboard',
					url: '/profile/company',
					active: true,
				},
			],
		},
	},
];
