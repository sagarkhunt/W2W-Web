import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';
import { Promise } from 'core-js';

const toast = useToast();

export default {
	// get default employer list
	getDefaultEmployerList: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/company-team');

			// set work detail
			commit('SET_STATE', {
				action: 'employerList',
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

	// get employer details
	getEmployerDetails: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/company/${id}`);

			// set work detail
			commit('SET_STATE', {
				action: 'employerDetail',
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

	// get logged users invoices - job seeker
	getJobSeekersInvoices: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/team-invoice', {
				params: { ...payload },
			});

			// set invoice list
			commit('SET_STATE', {
				action: 'invoiceList',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalInvoices',
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
	addTeamInvoice: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/team-invoice', payload);

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
	deleteTeamInvoice: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/team-invoice/${id}`);

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

	//invoice add to mark as wrong
	teamInvoicesMarkAsWrong: async ({ commit }, { id, payload }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/jobseeker/team-invoice/mark-wrong/${id}`, payload);

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

	// edit invoice
	editTeamInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/team-invoice/${id}`);
			// set state
			commit('SET_STATE', {
				action: 'editTeamWorkDetailList',
				data: { ...res.data.data, createdById: res.data.data?.created_by?.id },
			});

			commit('SET_EDIT_PAYMENT_SHARING', res.data.data);

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
			const res = await axios.put(`/jobseeker/team-invoice/${id}`, payload);

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

	// work-hour invoice update data
	updateWorkHourDetails: async ({ commit }, { payload, id }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/jobseeker/work-hour/add-update/${id}`, payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

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

	// get invoice worked hours by id
	getWorkedHoursById: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/jobseeker/work-hour/${id}`);

			// set work detail
			commit('SET_STATE', {
				action: 'workHourInfo',
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

	// get personal tax (vero) jobseeker
	getInvoiceTax: async ({ commit }) => {
		// loading true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/invoice/tax');
			// set tax vero (personal tax)
			commit('SET_STATE', {
				action: 'invoiceTaxInfo',
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

	// on blur event calculation jobseeker invoice
	calculationWorkedHour: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/invoice/calculation', payload);

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

	//company
	// get logged users invoices - Company
	getCompanyTeamInvoices: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/company/team-invoice', {
				params: { ...payload },
			});
			// set invoice list
			commit('SET_STATE', {
				action: 'comnapnyInvoiceList',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalTeamInvoicesComapny',
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

	//get team invoice group
	getAllTeamInvoiceGroup: async ({ commit }) => {
		try {
			const res = await axios.get('/seeker-team');
			// set work detail
			commit('SET_STATE', {
				action: 'teamGroupList',
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

	//get work Details
	getTeamWorkDetails: async ({ commit }, payload) => {
		try {
			const res = await axios.get('/jobseeker/work-hour/team', {
				params: { ...payload },
			});

			// set work detail
			commit('SET_STATE', {
				action: 'teamWorkDetailList',
				data: res.data.data,
			});

			// set initial payment sharing
			if (res.data.data.team_members) {
				commit('SET_PAYMENT_SHARING', res.data.data);
			}

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

	// view jobseeker team
	viewJobseekerTeamInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/team-invoice/${id}`);

			// set state
			commit('SET_STATE', {
				action: 'teaminvoiceSeekerDetail',
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

	//invoice add to mark as wrong
	teamInvoicesMarkAsWrongCompany: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/company/team-invoice/mark-wrong/${id}`);

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
	// view jobseeker team
	viewCompanyTeamInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/company/team-invoice/${id}`);

			// set state
			commit('SET_STATE', {
				action: 'teamInvoiceCompanyDetail',
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
	//delete attachment image
	deleteTeamInvoiceImage: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.delete(`/jobseeker/team-invoice/team-invoice-attachment-delete/${id}`);

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

	// add invoice
	addRevisionNotes: async ({ commit }, { id, payload }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/company/invoice/revision/${id}`, payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data,
			};
		} catch (err) {
			commit('SET_LOADER', false, { root: true });
			const message = handleAPIError(err);
			return Promise.reject({
				message,
			});
		}
	},
	// delete invoice
	deleteRemoveCompany: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/employer-by-seeker/${id}`);

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
