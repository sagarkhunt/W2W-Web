import _ from 'lodash';
import axios from '@/helpers/axios';

export default {
	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},

	// set user data
	SET_USER_INFO: (state, data) => {
		_.set(state, 'user', data);
	},

	// set axios bearer token
	SET_BEARER_TOKEN: (state, token) => {
		axios.defaults.headers.common['x-access-token'] = token;
	},
};
