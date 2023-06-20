export default {
	// get country ( employer ) registration form data
	getEmployerRegisterFormData: state => {
		return {
			...state.accountInformation,
			...state.companyInformation,
		};
	},

	// get light enterpreneur ( job seeker ) registration form data
	getSeekerRegistrationFormData: state => {
		return {
			...state.emailVerification,
			...state.mobileVerification,
			...state.userInformation,
			...state.passwordVerification,
		};
	},

	// get user profile data
	getUserData: state => {
		return state.user || [];
	},

	// get all team member data
	getTeamMembers: state => {
		return state.TeamMemberList || [];
	},

	// get team  options
	getTeamOptions: state => {
		return state.TeamMemberList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });
			return acc;
		}, []);
	},

	// get user profile data
	getUserFirstLogin: state => {		
		return state.firstTimeLogin;
	},
};
