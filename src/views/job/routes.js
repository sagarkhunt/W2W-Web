export default [
	{
		path: '/job/add',
		name: 'PostNewGig',
		component: () => import('@/views/job/AddJob.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Post New Gig',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.postNewGig',
					url: '/job/add',
					active: true,
				},
			],
		},
	},
	{
		path: '/job/list',
		name: 'ManageGig',
		component: () => import('@/views/job/ManageJob.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage Gigs',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageMyGigs',
					url: '/job/list',
					active: true,
				},
			],
		},
	},
	{
		path: '/job/edit/:id',
		name: 'EditJob',
		component: () => import('@/views/job/EditJob.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Edit Gig',
			activeLink: '/job/list',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageMyGigs', url: '/job/list' },
				{
					title: 'headerField.headerTitle.editGig',
					url: route => {
						return `/job/edit/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
	{
		path: '/job/view/:id',
		name: 'ViewGigDetail',
		component: () => import('@/views/job/ViewJobDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Job Detail',
			activeLink: '/job/list',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageMyGigs', url: '/job/list' },
				{
					title: 'headerField.headerTitle.viewGigDetail',
					url: route => {
						return `/job/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
	{
		path: '/job/proposals',
		name: 'My Applications',
		component: () => import('@/views/job/JobProposal.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage Job Proposals',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.MyApplications',
					url: '/job/proposals',
					active: true,
				},
			],
		},
	},
	//job application view
	{
		path: '/job/view-application/:id',
		name: 'ViewApplicationDetail',
		component: () => import('@/views/job/ViewGigApplicationDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Project market / My applications',
			activeLink: '/job/proposals',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'projectMarketPage.ProjectMarketMyApplications', url: '/job/proposals' },
				{
					title: 'headerField.headerTitle.ViewApplication',
					url: '/job/proposals',
					active: true,
				},
			],
		},
	},
	{
		path: '/job/find',
		name: 'JobFind',
		component: () => import('@/views/job/MatchingJobList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Matching Job List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.ProjectMarketMatchingJobList',
					url: '/job/find',
					active: true,
				},
			],
		},
	},
];

export const jobBlankLayoutRoutes = [
	{
		path: '/job/find',
		name: 'JobFind',
		component: () => import('@/views/job/MatchingJobList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Matching Job List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.MatchingJobList',
					url: '/job/find',
					active: true,
				},
			],
		},
	},
];
