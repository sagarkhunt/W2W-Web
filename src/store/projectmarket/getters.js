export default {
	// get payslip list
	getProjectList: state => {		
		return state.projectList || [];
	},

	// get matching job list
	getMatchingProjectList: state => {
		return state.projectList;
	},
	getProjectInfo: state => {
		return state.projectDetail || {}
	},

	// get skill list
	getSkillList: state => {		
		return state.leSkillList || [];
	},
	
};
