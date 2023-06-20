import _ from 'lodash';

export default {
	// update loader
	SET_LOADER(state, value) {
		state.loader = value;
	},

	// update state
	SET_STATE(state, payload) {
		_.set(state, payload.action, payload.value);
	},
};
