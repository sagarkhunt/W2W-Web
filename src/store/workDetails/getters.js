export default {
	// get invoice work details
	getInvoicesWorkDetails: state => {
		return state.workDetails;
	},

	// get work details
	getWorkDetails: state => {
		return state.workDetails;
	},
	// get work details
	getTeamWorkDetails: state => {
		return state.workTeamDetails;
	},
	getTeamOptions: state => {
		return state.teamList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });
			return acc;
		}, []);
	},
	//set id by half/full day compansation
	getHlafFullDayCompensation: state => {
		return state.halfFullCompensation.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });
			return acc;
		}, []);
	},
	//set lunch compensation
	getLunchCompensation: state => {
		return state.lunchCompensation.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });
			return acc;
		}, []);
	},
};
