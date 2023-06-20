export default {
	// get skill options
	getSkillOptions: state => {
		return state.defaultskills.reduce((acc, item) => {
			acc.push({ ...item, value: item.id , label:item.skill});
			
			return acc;
		}, []);
	},

	// get skill options
	getUserSkillOptions: state => {
		return state.defaultskills.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId , label:item.skill});
			
			return acc;
		}, []);
	},
	// get job skill
	getJobSkillOptions: state => {
		return state.defaultskills.reduce((acc, item) => {
			acc.push({ ...item, value: item.referenceId , label:item.skill});
			
			return acc;
		}, []);
	},
};
