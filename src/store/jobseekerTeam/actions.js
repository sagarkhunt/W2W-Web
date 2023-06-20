import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';
import { Promise } from 'core-js';

const toast = useToast();

export default {
	// get logged users invoices - job seeker
	getJobseekerTeamList: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-team', {
				params: { ...payload },
			});
			// set invoice list
			commit('SET_STATE', {
				action: 'jobseekerTeamList',
				data: res.data.teamInvoiceData,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalInvoicesGroup',
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

	// add invoice
	addSeekerTeam: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/seeker-team/', payload);

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

	// delete invoice
	deleteJobseekerTeam: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-team/${id}`);

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

	// view jobseeker team
	viewJobseekerTeam: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/seeker-team/${id}`);

			// set state
			commit('SET_STATE', {
				action: 'jobseekerTeamDetail',
				data: res.data.data,
			});
			// loading false
			commit('SET_LOADER', false, { root: true });
			return {
				data: res.data.data,
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

	// update invoice data
	updateInvoiceById: async ({ commit }, { id, payload }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/jobseeker/invoice/${id}`, payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// loading false
			commit('SET_LOADER', false, { root: true });
			toast.success(res.data.message);
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

	//get job seeker list
	getJobseekerList: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/user/job-seeker');

			// set work detail
			commit('SET_STATE', {
				action: 'jobseekerList',
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

	// add invoice
	addSeekerTeamMember: async ({ commit }, { payload, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/jobseeker/seeker-team/add-member/${id}`, payload);

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

	// update Team name
	updateTeamName: async ({ commit }, { payload, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.put(`/jobseeker/seeker-team/${id}`, payload);

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

	// delete invoice
	deleteJobseekerTeamMember: async ({ commit }, { seekerId, teamId }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-team/${seekerId}/${teamId}`);

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

	//invite user delete
	deleteinvitedUser: async ({ commit }, { teamId, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-team/new-member/${teamId}/${id}`);

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

	//user re send email
	userReSendEmail: async ({ commit }, { payload, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/jobseeker/seeker-team/resend-invitation/${id}`, payload);

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

	// get Benefit list
	getBenefitList: async ({ commit }, params) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/benefit', {
				params: {
					...params,
				},
			});
			// set invoice work details
			commit('SET_STATE', {
				action: 'jobseekerBenefitList',
				data: res.data.data,
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'totalBenefitCount',
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
	// job seeker claim
	// add invoice
	jobseekerClaim: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/benefit/', payload);

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
