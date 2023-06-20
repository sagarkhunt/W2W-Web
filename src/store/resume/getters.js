export default {
	// get resumes
	getCurrentUserResumes: state => {
		return state.resumes;
	},

	// get all seekers resume list
	getResumeList: state => {
		return state.resumesList;
	},

	// get experiences
	getCurrentUserExperiences: state => {
		return state.experiences;
	},

	// get educations
	getCurrentUserEducations: state => {
		return state.educations;
	},

	// get resume request
	getCurrentUserResumeRequest: state => {
		return state.resumesRequest;
	},
};
