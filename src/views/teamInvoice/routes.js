export default [
	{
		path: '/team-invoices',
		name: 'Team Invoice List',
		component: () => import('@/views/teamInvoice/InvoiceList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Team Invoice List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageTeamInvoice',
					url: '/team-invoices',
					active: true,
				},
			],
		},
	},
	{
		path: '/team-invoices/add',
		name: 'Add Team Invoice',
		component: () => import('@/views/teamInvoice/AddInvoice.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Add Team Invoice',
			activeLink: '/team-invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageTeamInvoice',
					url: '/team-invoices',
				},
				{
					title: 'headerField.headerTitle.addTeamInvoice',
					url: '/team-invoices/add',
				},
			],
		},
	},
	{
		path: '/team-invoices/edit/:id',
		name: 'Edit Team Invoice',
		component: () => import('@/views/teamInvoice/EditInvoice.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Edit Team Invoice',
			activeLink: '/team-invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageTeamInvoice',
					url: '/team-invoices',
				},
				{
					title: 'headerField.headerTitle.editTeamInvoice',
					url: '/team-invoices/edit',
				},
			],
		},
	},

	//view Seeker invoice view
	{
		path: '/team-invoices/view/:id',
		name: 'ViewTeamInvoiceSeekerDetail',
		component: () => import('@/views/teamInvoice/ViewTeamInvoiceSeekerDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Company Invoice Detail',
			activeLink: '/team-invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageTeamInvoice', url: '/team-invoice/list' },
				{
					title: 'headerField.headerTitle.viewTeamInvoice',
					url: route => {
						return `/invoice/seeker/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},

	//view Company invoice view
	{
		path: '/team-invoices/compnay/view/:id',
		name: 'ViewCompanyTeamInvoiceDetail',
		component: () => import('@/views/teamInvoice/ViewTeamInvoiceCompanyDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Company Team Invoice Detail',
			activeLink: '/team-invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageTeamInvoice', url: '/team-invoice/list' },
				{
					title: 'headerField.headerTitle.viewTeamInvoice',
					url: route => {
						return `/team-invoices/seeker/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
];
