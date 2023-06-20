import _ from 'lodash';

export default {
	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},

	// remove item from list
	REMOVE_ITEM_ARRAY: (state, payload) => {
		_.remove(state[payload.action], obj => {
			return obj[payload.key] === payload.value;
		});
	},
};
