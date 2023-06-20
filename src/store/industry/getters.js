export default {
	// get industry options
	getIndustryOptions: state => {
		return state.industries.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId,label: item.industry_name });

			return acc;
		}, []);
	},
	// get industry options Name
	getIndustryOptionsName: state => {
		return state.industries.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId });

			return acc;
		}, []);
	},
	//get occupation
	getOccupationOptions: state => {
		return state.occupationList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });

			return acc;
		}, []);
	},
};
