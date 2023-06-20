import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

export default {
	// get reports details
	getReportsDetails: async ({ commit }, report_type) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/report/${report_type}`, { responseType: 'blob' });
			// loading false
			commit('SET_LOADER', false, { root: true });
			return {
				data: res.data,
			};
		} catch (err) {
			// loading false
			commit('SET_LOADER', false, { root: true });
			const message = handleAPIError(err);
			return Promise.reject({
				message,
			});
		}
	},
};
