export default [
	{
		path: '/manage-skill',
		name: 'Manage Skills',
		component: () => import('@/views/skill/UserSkill.vue'),
		meta: {
			allowAnonymous: false,
			pageTitle: 'Manage Skill',
			breadcrumb: [
				{ title: 'My Dashboard', url: '/dashboard' },
				{
					title: 'Project Market / Manage Skill',
					url: '/manage-skill',
					active: true,
				},
			],
		},
	},
];
