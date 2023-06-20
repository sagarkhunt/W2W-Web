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
	getCompanyJobSeekerList: state => {
		return state.jobSeekerProposals;
	},

	// get country options
	getLeJobOptions: state => {
		return state.leJobList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id});
			return acc;
		}, []);
	},

	// get job seeker proposal list
	getJobSeekerProposalList: state => {
		return state.jobSeekerProposalsLeaveReview;
	},
};
