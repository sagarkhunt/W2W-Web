import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
	// update local language
	updateLocalLanguage({ commit }, language) {
		localStorage.setItem('lang', language);

		commit('UPDATE_LOCAL_LANGUAGE', language);
	},

	// get all languages
	getLanguages: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/language');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'languages',
				data: res.data.data,
			});

			return {
				data: res.data,
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

	//update seeker status
	updateSeekerStatus: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/jobseeker/matching-job/job-alert', payload);
			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // success message

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
