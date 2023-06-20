import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

const toast = useToast();

export default {
	// get work details of current invoice
	getCurrentInvoiceWorkDetails: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });
		payload.work_hourIds = (JSON.parse(localStorage.getItem('invoiceWorkDetails')) || []).toString();
		try {
			const res = await axios.get('/jobseeker/work-hour/many', {
				params: { ...payload },
			});
			// set invoice work details
			commit('SET_STATE', {
				action: 'workDetails',
				data: res.data.data,
			});

			commit('SET_WORK_DETAILS_IDS', {
				action: 'workDetailsIds',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalWorkDetails',
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

	// get current user's work details
	getCurrentUsersWorkDetails: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/work-hour', {
				params: { ...payload },
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'workDetails',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalWorkDetails',
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

	// get current user's team work details
	getCurrentUsersTeamWorkDetails: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/work-hour', {
				params: { ...payload },
			});

			// set invoice work details
			commit('SET_STATE', {
				action: 'workTeamDetails',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalTeamWorkDetails',
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

	// get work detail by id
	getWorkDetailById: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/work-hour/${id}`);

			// set work detail
			commit('SET_STATE', {
				action: 'workDetail',
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

	// add work details
	addWorkDetails: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/work-hour', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data.data,
				message: res.data.message,
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

	// add duplicate work details
	addDuplicateWorkDetails: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/work-hour/duplicate', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data.data,
				message: res.data.message,
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

	// update work details
	updateWorkDetails: async ({ commit }, { payload, id }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/jobseeker/work-hour/${id}`, payload);

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

	// delete work detail by id
	deleteWorkDetail: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/work-hour/${id}`);

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

	// delete multiple work details
	deleteMultipleWorkDetails: async ({ commit }, ids) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete('/jobseeker/work-hour/many', {
				params: {
					work_hourIds: ids.toString(),
				},
			});

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

	//get working team
	getWrokTeam: async ({ commit }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-team/as-member');

			// set work detail
			commit('SET_STATE', {
				action: 'teamList',
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

	//get half/full daya comoensation
	getHalfFullCompensation: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/salary-settings/compensation', {
				params: { ...payload },
			});
			// set invoice work details
			commit('SET_STATE', {
				action: 'halfFullCompensation',
				data: res.data.data,
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
	//get Travelling Fees
	getTravellingFees: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/travelling-fees');
			// set invoice work details
			commit('SET_STATE', {
				action: 'travellingFees',
				data: res.data.data,
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
	//get lunch compensation
	//get half/full daya comoensation
	getLunchCompensation: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/salary-settings/compensation', {
				params: { ...payload },
			});
			// set invoice work details
			commit('SET_STATE', {
				action: 'lunchCompensation',
				data: res.data.data,
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

	//delete recipt image
	//delete attachment image
	deleteWorkHourReciptImage: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.delete(`/jobseeker/work-hour/receipt-delete/${id}`);

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
};
