import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

export default {	
	// Get pay Slip List
	getGigWorkHour: async({commit}, { payload, id })=>{
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/company/work-hour/${id}`,{
				params: { ...payload },
			});			
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'gigWorkHourList',
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

	// get all jobSeekewr
	getJobSeeker: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/company/company-team');

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'jobseeker',
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
