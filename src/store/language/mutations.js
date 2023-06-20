import _ from 'lodash';
import axios from '@/helpers/axios';

export default {
	UPDATE_LOCAL_LANGUAGE(state, val) {
		state.localLang = val;
		axios.defaults.headers.common['accept-language'] = val;
	},

	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},
};
