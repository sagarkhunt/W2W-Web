import store from '@/store'; // store

const jobseeker = [
	// dashboard
	{
		url: '/dashboard',
		name: 'dashboard',
		slug: 'dashboard',
		icon: require('@/assets/images/Layer 1.png'),
	},
	// Invoice Module
	{
		url: '/invoices',
		name: 'invoiceList',
		slug: 'invoice-list',
		icon: require('@/assets/images/invoice-list.png'),
	},
	//Team Invoice
	{
		url: '/team-invoices',
		name: 'teamInvoiceList',
		slug: 'team-invocie-list',
		icon: require('@/assets/images/team-members.png'),
	},
	// Job Seeker Team Module
	{
		url: '/jobseeker-team',
		name: 'jobseekerTeam',
		slug: 'jobseeker-team-list',
		icon: require('@/assets/images/light-entrepreneurs.png'),
	},

	// my documents
	{
		url: null,
		name: 'myProfile',
		slug: 'my-profile',
		icon: require('@/assets/images/applications.png'),
		childrens: [
			// manage account
			{
				url: '/update-profile',
				name: 'manageAccount',
				slug: 'manage-account',
				icon: require('@/assets/images/team-invoice-list.png'),
			},
			// my documents
			{
				url: '/documents',
				name: 'myDocuments',
				slug: 'my-documents',
				icon: require('@/assets/images/light-entrepreneurs.png'),
			},
		],
	},
	// my documents
	{
		url: null,
		name: 'projectMarket',
		slug: 'project-market',
		icon: require('@/assets/images/applications.png'),
		childrens: [
			// my resume
			{
				url: '/my-resume',
				name: 'myResumes',
				slug: 'my-resume',
				icon: require('@/assets/images/myResumesImg.svg'),
			},
			// my applicants
			{
				url: '/job/proposals',
				name: 'myApplications',
				slug: 'my-applications',
				icon: require('@/assets/images/my-application.png'),
			},
			{
				url: '/job/find',
				name: 'jobMatching',
				slug: 'job-matching',
				icon: require('@/assets/images/job-matching.png'),
			},
		],
	},
	// Job Seeker Team Module
	{
		url: '/reports',
		name: 'allReports',
		slug: 'reports-list',
		icon: require('@/assets/images/light-entrepreneurs.png'),
	},
	// benefit Module
	{
		url: '/benefit-list',
		name: 'benefit',
		slug: 'benefit-list',
		icon: require('@/assets/images/light-entrepreneurs.png'),
	},
	// worked hours
	{
		url: '/worked-details',
		name: 'workedDetails',
		slug: 'worked-details',
		icon: require('@/assets/images/worked-details.png'),
	},

	{
		url: '/project-market',
		name: 'viewAllGigs',
		slug: 'view-all-gigs',
		icon: require('@/assets/images/job-matching.png'),
	},
];

const company = [
	// company profile
	{
		url: '/profile/company',
		name: 'dashboard',
		slug: 'my-applications',
		icon: require('@/assets/images/Layer 1.png'),
	},
	// companyprofile
	{
		url: '/companyprofile',
		name: 'companyProfile',
		slug: 'companyProfile',
		icon: require('@/assets/images/Layer 1.png'),
	},
	// manage invoices
	{
		url: '/invoices',
		name: 'allInvoices',
		slug: 'invoice-list',
		icon: require('@/assets/images/all-invoice.png'),
	},
	// manage team invoices
	{
		url: '/team-invoices',
		name: 'allTeamInvoices',
		slug: 'invoice-list',
		icon: require('@/assets/images/all-invoice.png'),
	},
	// manage team member
	{
		url: '/team-member',
		name: 'teamMembers',
		slug: 'manage-account',
		icon: require('@/assets/images/team-members.png'),
	},
	// manage light entrepreneurs
	{
		url: '/light-entreprenuers',
		name: 'lightEntrepreneurs',
		slug: 'my-documents',
		icon: require('@/assets/images/light-entrepreneurs.png'),
	},
	// manage gig work hours
	{
		url: '/gigworkhour',
		name: 'gigWorkHour',
		slug: 'gig-work-hour',
		icon: require('@/assets/images/applications.png'),
	},
	// manage E-Contract
	{
		url: '/econtract',
		name: 'eContract',
		slug: 'e-contract',
		icon: require('@/assets/images/worked-details.png'),
	},
	// post new gig (job)
	{
		url: '/job/add',
		name: 'postGig',
		slug: 'worked-details',
		icon: require('@/assets/images/job-matching.png'),
	},
	// manage gigs (jobs)
	{
		url: '/job/list',
		name: 'manageGig',
		slug: 'job-matching',
		icon: require('@/assets/images/job-matching.png'),
	},
	{
		url: '/project-market',
		name: 'viewAllGigs',
		slug: 'view-all-gigs',
		icon: require('@/assets/images/job-matching.png'),
		
	},
];

const navSideBar = { jobseeker, company };

const userType = (store.state.auth.user && store.state.auth.user.user_type) || 'jobseeker';

export default navSideBar[userType];
