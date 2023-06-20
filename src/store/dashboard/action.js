import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
	// get all data in dashboard
	getDashboardLists: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/user/verify-token');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'DashboardWorkStats',
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

	// get all data in received document
	getReceiveDocuments: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-document/sent-by-admin', {
				params: { ...payload },
			});
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'RecevedDocuments',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'totalRecevedDocuments',
				data: res.data.totalCount,
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

	getInsurances: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/insurance', {
				params: { ...payload },
			});
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'InsuranceData',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'totalInsurance',
				data: res.data.totalCount,
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

	// get all jobSeeker dashboard
	fetchJobseeker: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/dashboard');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'DashboardJobseeker',
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

	// update status insurance
	updateInsurancesStatus: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('jobseeker/insurance', payload);

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

	// get all company dashboard
	getCompanyDashboard: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/company/dashboard');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'DashboardCompany',
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

	// update status insurance
	inviteSeekerEmployer: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/invite', payload);

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

	// update status insurance
	useRedeemCode: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/invite/redeem-code', payload);

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
	

	//update company user profile

	// register employer ( company )
	updateCompanyProfile: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/company', payload, {
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

	//receive Documents View Status
	// update status insurance
	documentsViewStatus: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/seeker-document/sent-by-admin/${id}`);
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
};
