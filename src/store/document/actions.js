import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';

const toast = useToast();

export default {
	// get document types
	getDocumentTypes: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-document/type');

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'documentTypes',
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

	// get users documents
	getUsersDocuments: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-document', {
				params: { ...payload },
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'documents',
				data: res.data.data,
			});
			// set count document
			commit('SET_STATE', {
				action: 'totalDocument',
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
	//get user default document
	getDefaultDocuments: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('jobseeker/seeker-document/sent-by-admin', {
				params: { ...payload },
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'defaultDocuments',
				data: res.data.data,
			});
			// set count document
			commit('SET_STATE', {
				action: 'totalDocument',
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

	// get user contract (user uploaded)
	getUserUploadedContract: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/contract/seeker', {
				params: { ...payload },
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'contracts',
				data: res.data.data,
			});
			//total contract count
			commit('SET_STATE', {
				action: 'totalContracts',
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

	//get e contract
	getEContract: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/contract/e/seeker', {
				params: { ...payload },
			});
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'eContracts',
				data: res.data.data,
			});
			//total count of e contract
			commit('SET_STATE', {
				action: 'totalEContracts',
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
	// Get pay Slip List
	getPaySlipList: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/payslip', {
				params: { ...payload },
			});
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'paySlipList',
				data: res.data.data,
			});
			commit('SET_STATE', {
				action: 'earnedPercentage',
				data: res.data.earned_percentage,
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
	// download payslip details
	paySlipDetailsDownload: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/payslip/export-pdf/${id}`, { responseType: 'blob' });
			// loading - false
			commit('SET_LOADER', false, { root: true });
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
	// get employer list
	getEmployerList: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/company-team');

			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'employerList',
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

	// get tax card list
	getTaxCardList: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-document/tax-card');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'taxCardList',
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

	// upload document file
	uploadDocumentFile: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/seeker-document/', payload, {
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

	// upload contract file
	uploadContractFile: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/contract/seeker', payload, {
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

	//get yearly income
	// Get pay Slip List
	getYearlyIncome: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-document/yearly-income');
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'yearlyIncome',
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

	//delete upload document
	deleteJobseekerSeekerDocument: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/seeker-document/${id}`);

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

	//delete Seeker contract
	deleteJobseekerSeekerContract: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/contract/seeker/${id}`);

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
	//delete Seeker contract
	deleteJobseekerEContract: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/contract/seeker/e/${id}`);

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
	//delete Seeker contract
	deleteJobseekerPaySlip: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/payslip/${id}`);

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
	getPaySlipDetails: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/payslip/${id}`);
			// set state
			commit('SET_STATE', {
				action: 'paySleepSeekerDetail',
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

	// report a bug functionality
	reportBugProblem: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/report-bug', payload, {
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
};
