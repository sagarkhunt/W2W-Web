export default {
	// get country options
	getCountryOptions: state => {
		return state.countries.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId, label: item.country_name });

			return acc;
		}, []);
	},

	// get cities options
	getCitiesOptions: state => {
		return state.cities.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId, label: item.city_name});

			return acc;
		}, []);
	},
	// get cities options Name
	getCitiesOptionsName: state => {
		return state.cities.reduce((acc, item) => {
			acc.push({ ...item, value: item.city_name });

			return acc;
		}, []);
	},

	// get cities options
	getCompanyCitiesOptions: state => {
		return state.companyCities.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId,label: item.city_name });

			return acc;
		}, []);
	},

	// get cities options
	getProjectMarkertCitiesOptions: state => {
		return state.projectMarketCities.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId });
			return acc;
		}, []);
	},
};
