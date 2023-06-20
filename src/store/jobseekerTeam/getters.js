export default {
	// get invoice list - job seeker
	getJobseekerTeamList: state => {
		return state.jobseekerTeamList || [];
	},

	// get invoice edit info - job seeker
	getJobSeekerInvoiceEditInfo: state => {
		return state.invoiceInfo || {};
	},

	// get invoice list - com pany
	getCompanyInvoiceList: state => {
		return state.comnapnyinvoiceList || [];
	},
	// get invoice company view details
	getjobseekerTeamDetails: state => {
		return state.jobseekerTeamDetail || {};
	},
	// get employer list - user specific
	getSeekerList: state => {
		const h = state.jobseekerList.reduce((acc, item) => {
			let fullName = '';
			if (item.full_name) {
				fullName = item.full_name;
				acc.push({
					...item,
					value: item,
					label: fullName,
				});
			}

			return acc;
		}, []);

		return h;
	},
	// get invoice list - job seeker
	getJobseekerBenefitList: state => {
		return state.jobseekerBenefitList || [];
	},
};
