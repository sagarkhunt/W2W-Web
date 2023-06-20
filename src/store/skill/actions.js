import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

const toast = useToast();

export default {
	// get all default skills
	getDefaultSkills: async ({ commit },payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/skill',{
				params: { ...payload },
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'defaultskills',
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

	// get logged user skills
	getCurrentUserSkills: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/skill/assigned-skills');
			
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'userSkills',
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

	// add user skill
	addUserSkill: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/skill/', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data,
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

	// delete user skill
	deleteUserSkill: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/skill/${id}`);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data,
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
