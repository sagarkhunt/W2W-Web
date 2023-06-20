export default {
	// get document type options
	getDocumentTypeOptions: state => {
		return state.documentTypes.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });

			return acc;
		}, []);
	},

	// get employer list
	getEmployersList: state => {
		return state.employerList.reduce((acc, item) => {
			acc.push({
				...item,
				value: item.company?.id,
				label: item.company?.company_name,
			});

			return acc;
		}, []);
	},

	// get tax card list
	getTaxCardList: state => {
		return state.taxCardList.reduce((acc, item) => {
			acc.push(item);

			return acc;
		}, []);
	},
	// get payslip list
	getPaySlipList: state => {
		return state.paySlipList || [];
	},
	//get yearly income
	getYearlyIncome: state => {
		return state.yearlyIncome || {};
	},
	// pay Sleep details
	getPaySleepDetails: state => {
		return state.paySleepSeekerDetail || {};
	},
};
