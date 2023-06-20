import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

export default {
	// get all industries
	getIndustries: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/industry');			
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'industries',
				data: res.data.data,
			});

			return {
				data: res.data.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const { message } = handleAPIError(err);

			return Promise.reject({
				message,
			});
		}
	},

	//get all occupations
	getOccupation: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('admin/occupation');

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'occupationList',
				data: res.data.data,
			});

			return {
				data: res.data.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const { message } = handleAPIError(err);

			return Promise.reject({
				message,
			});
		}
	},
};
