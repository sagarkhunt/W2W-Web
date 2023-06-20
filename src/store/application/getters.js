export default {
	// get company posted job list
	getCompanyPostedJobList: state => {
		return state.companyJobs;
	},

	// get matching job list
	getMatchingJobList: state => {
		return state.jobList;
	},

	// get job proposal list
	getJobProposalsList: state => {
		return state.jobProposals;
	},

	// get job seeker proposal list
	getJobSeekerProposalList: state => {
		return state.jobSeekerProposals;
	},
};
