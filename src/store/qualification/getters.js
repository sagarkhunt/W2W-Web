export default {
	// get qualification options
	getQualificationOptions: state => {
		return state.qualificationList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });

			return acc;
		}, []);
	},
	// get qualification options
	getPermitOptions: state => {
		return state.permitList.reduce((acc, item) => {					
			acc.push({ ...item, value: item.referenceId,label: item.description });

			return acc;
		}, []);
	},
};
