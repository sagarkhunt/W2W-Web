import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

const toast = useToast();

export default {	
	// get job seeker's job proposal
	getJobSeekerProposals: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/company/job-proposal/${payload.jobID}`, {
				params: {
					...payload,
				},
			});
			// set invoice work details
			commit('SET_STATE', {
				action: 'jobSeekerProposals',
				data: res.data.data,
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'jobSeekerTotalProposalsCompany',
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

	// add new job
	addNewJob: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/company/job/', payload);

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

	// apply on job
	addJobProposal: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/job-proposal', payload);

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

	// update job
	updateJob: async ({ commit }, { payload, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/company/job/${id}`, payload);

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

	// delete job proposal
	deleteJobProposal: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/job-proposal/${id}`);

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

	// Update job proposal status
	updateJobProposalStatus: async ({ commit },payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {				
			const res = await axios.put(
				`company/job-proposal/${payload.id}`,
				payload
			);

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

	//add rating review
	// apply on job
	addRatingReview: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {			
			const res = await axios.post('company/seeker-rating', payload);

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

	// company add rating for seeker
	addCompanyRatingReview: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {	
			// loading - false
			commit('SET_LOADER', false, { root: true });

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
