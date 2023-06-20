export default [
	{
		path: '/invoices',
		name: 'Invoice List',
		component: () => import('@/views/invoice/InvoiceList.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Invoice List',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageInvoices',
					url: '/invoices',
					active: true,
				},
			],
		},
	},
	{
		path: '/invoices/add',
		name: 'Add Invoice',
		component: () => import('@/views/invoice/AddInvoice.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Add Invoice',
			activeLink: '/invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageInvoices',
					url: '/invoices',
				},
				{
					title: 'headerField.headerTitle.addInvoice',
					url: '/invoices/add',
				},
			],
		},
	},
	{
		path: '/invoices/edit/:id',
		name: 'Edit Invoice',
		component: () => import('@/views/invoice/EditInvoice.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Edit Invoice',
			activeLink: '/invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{
					title: 'headerField.headerTitle.manageInvoices',
					url: '/invoices',
				},
				{
					title: 'headerField.headerTitle.editInvoice',
					url: '/invoices/edit',
				},
			],
		},
	},

	//view job seeker invoice view
	{
		path: '/invoice/seeker/view/:id',
		name: 'ViewSeekerInvoiceDetail',
		component: () => import('@/views/invoice/ViewInvoiceSeekerDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Seeker Invoice Detail',
			activeLink: '/invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.manageInvoices', url: '/invoice/list' },
				{
					title: 'headerField.headerTitle.viewInvoice',
					url: route => {
						return `/invoice/Seeker/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},

	//view job seeker invoice view
	{
		path: '/company-invoice/view/:id',
		name: 'ViewCompanyInvoiceDetail',
		component: () => import('@/views/invoice/ViewInvoiceCompanyDetail.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'View Seeker Invoice Detail',
			activeLink: '/invoices',
			breadcrumb: [
				{ title: 'commonDashboard.myDashboard', url: '/dashboard' },
				{ title: 'headerField.headerTitle.seekerInvoice', url: '/invoice/list' },
				{
					title: 'headerField.headerTitle.invoiceSeekerDetail',
					url: route => {
						return `/invoice/Seeker/view/${route.params.id}`;
					},
					active: true,
				},
			],
		},
	},
];
