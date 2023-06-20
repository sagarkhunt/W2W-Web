export default {
	// get payslip list
	getGigWorkhourList: state => {
		return state.gigWorkHourList || [];
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
