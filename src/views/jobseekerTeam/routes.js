export default [
	{
		path: '/jobseeker-team',
		name: 'Jobseeker Team List',
		component: () => import('@/views/jobseekerTeam/JobseekerTeam.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Jobseeker Team List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.LETeamList',
					url: '/job-seeker-team',
					active: true,
				},
			],
		},
	},

	{
		path: '/jobseeker-team/view/:id',
		name: 'View Jobseeker Team',
		component: () => import('@/views/jobseekerTeam/components/ViewJobseekerTeam.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Jobseeker Team',
			activeLink: '/jobseeker-team',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.LETeamList',
					url: '/jobseeker-team',
				},
				{
					title: 'headerField.headerTitle.editTeam',
					url: '/jobseeker-team/view',
				},
			],
		},
	},
];
