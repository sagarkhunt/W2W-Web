import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

export default {
	// add work details
	uploadImage: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/upload-file', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			return {
				data: res.data.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const message = handleAPIError(err);

			return Promise.reject({
				message,
			});
		}
	},
};
