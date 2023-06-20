export default {
	// get payslip list
	getEcontract: state => {
		return state.eContractList || [];
	},

	// get jobseeker options
	getjobseekerOptions: state => {
		return state.jobseeker.reduce((acc, item) => {			
			acc.push({ ...item, value: item.jobSeeker.id });			
			return acc;
		}, []);
	},

	// get gigworkhour details
	getGigWorkDetails: state => {
		return state.gigWorkDetail || {};
	},
};
