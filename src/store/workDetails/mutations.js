import _ from 'lodash';

export default {
	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},

	SET_WORK_DETAILS_IDS: (state, payload) => {
		const workDetailsId = payload.data.reduce((acc, item) => {
			acc.push(item.id);

			return acc;
		}, []);

		_.set(state, payload.action, workDetailsId);
	},

	// remove item from list
	REMOVE_ITEM_ARRAY: (state, payload) => {
		_.remove(state[payload.action], obj => {
			return obj[payload.key] === payload.value;
		});
	},

	updateWorkDetails: (state, data) => {
		let checkExistingWorkDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
		checkExistingWorkDetails.splice(data.indexId, 1);

		if (data.addNewItem == true) {
			checkExistingWorkDetails.push(data);
			state.workDetails = checkExistingWorkDetails;
			localStorage.setItem('workDetails', JSON.stringify(checkExistingWorkDetails));
		} else {
			//update local storage
			checkExistingWorkDetails.push(data);

			//update state
			localStorage.setItem('workDetails', JSON.stringify(checkExistingWorkDetails));
		}
	},

	//add new item in work deatils
	addWorkDetails: (state, data) => {
		let checkExistingWorkDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];
		//update local storage
		checkExistingWorkDetails.push(data);
		state.workDetails = checkExistingWorkDetails;

		localStorage.setItem('workDetails', JSON.stringify(checkExistingWorkDetails));
	},

	// remove item from work detail
	removeWorkDetail: (state, index) => {
		let checkExistingWorkDetails = localStorage.getItem('workDetails') ? JSON.parse(localStorage.getItem('workDetails')) : [];

		//update local storage
		checkExistingWorkDetails.splice(index, 1);

		// state.workDetails.push(data);
		state.workDetails = checkExistingWorkDetails;
		localStorage.setItem('workDetails', JSON.stringify(checkExistingWorkDetails));
	},
};
