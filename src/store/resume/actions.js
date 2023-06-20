import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

const toast = useToast();

export default {
	// get resumes
	getResumes: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-resume', {
				params: { ...payload },
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'resumes',
				data: res.data.data,
			});
			// set total resum
			commit('SET_STATE', {
				action: 'totalResumeCount',
				data: res.data.totalCount,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

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

	// get resume list - company
	getResumeList: async ({ commit }, params) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('resume-request/company', {
				params: {
					...params,
				},
			});

			// set resume list
			commit('SET_STATE', {
				action: 'resumesList',
				data: res.data.data,
			});

			// set total count
			commit('SET_STATE', {
				action: 'totalResumeCount',
				data: res.data.totalCount,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

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

	// get resumes request
	getResumesRequest: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/resume-request/seeker', {
				params: { ...payload },
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'resumesRequest',
				data: res.data.data,
			});
			// set total resum
			commit('SET_STATE', {
				action: 'totalResumeRequestCount',
				data: res.data.totalCount,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

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

	updateResumeStatus: async ({ commit }, { id, payload }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(
				`/resume-request/seeker/${id}`,
				payload,
			);

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

	

	// get current user's experiences
	getExperiences: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-experience', {
				params: { ...payload },
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'experiences',
				data: res.data.data,
			});

			// set total resum
			commit('SET_STATE', {
				action: 'totalExperinceCount',
				data: res.data.totalCount,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

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

	// get current user's educations
	getEducations: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-education', {
				params: { ...payload },
			});

			// set education
			commit('SET_STATE', {
				action: 'educations',
				data: res.data.data,
			});

			// set count education
			commit('SET_STATE', {
				action: 'totalEducations',
				data: res.data.totalCount,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

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

	// add resume
	addResume: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/seeker-resume/', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // success message

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

	// add experience
	addExperience: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(
				'/jobseeker/seeker-experience',
				payload,
			);

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

	// add educations
	addEducation: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(
				'/jobseeker/seeker-education',
				payload,
			);

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

	// request resume access
	requestResumeAccess: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('resume-request/company', payload);

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

	// update professional summary
	updateProfessionalSummary: async ({ commit, dispatch }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(
				'/jobseeker/professional-summary',
				payload,
			);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			dispatch('auth/verifyToken', null, { root: true });

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

	// delete resume
	deleteResume: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-resume/${id}`);

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

	// get seeker-experience detail by id
	getExperienceDetailById: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/seeker-experience/${id}`);
			// set experince detail
			commit('SET_STATE', {
				action: 'seekerExperience',
				data: res.data.data,
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

	// update experience
	updateExperience: async ({ commit }, { id, payload }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(
				`/jobseeker/seeker-experience/${id}`,
				payload,
			);

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
	// delete experience
	deleteExperince: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(
				`/jobseeker/seeker-experience/${id}`,
			);

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
	// get seeker-experience detail by id
	getEducationDetailById: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/seeker-education/${id}`);
			// set experience detail
			commit('SET_STATE', {
				action: 'seekerEducation',
				data: res.data.data,
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
	// update education
	updateEducation: async ({ commit }, { id, payload }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(
				`/jobseeker/seeker-education/${id}`,
				payload,
			);

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
	// delete education
	deleteEducation: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-education/${id}`);

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
