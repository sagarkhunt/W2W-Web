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
			const res = await axios.get('/jobseeker/invoice', {
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

	// get logged users invoices - job seeker
	getDeducationList: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/jobseeker/seeker-deduction', {
				params: { ...payload },
			});
			// set invoice list
			commit('SET_STATE', {
				action: 'deducationList',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalDeducation',
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
	addInvoice: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/invoice/', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			toast.success(res.data.message); // toast

			return {
				data: res.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const message = err.response.data;

			return Promise.reject({
				message,
			});
		}
	},

	// delete invoice
	deleteInvoice: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/jobseeker/invoice/${id}`);

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

	// edit invoice
	editInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/invoice/${id}`);
			// set state
			commit('SET_STATE', {
				action: 'invoiceInfo',
				data: res.data.data,
			});
			commit('SET_STATE', {
				action: 'invoiceInfoDetails',
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
	invoicesMarkAsWrong: async ({ commit }, { id, payload }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/jobseeker/invoice/mark-wrong/${id}`, payload);

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
	//invoice add to mark as wrong
	invoicesMarkAsWrongCompany: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/company/invoice/mark-wrong/${id}`);

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

	// update invoice data
	updateInvoiceById: async ({ commit }, { id, payload }) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put(`/jobseeker/invoice/${id}`, payload);

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
	getCompanyInvoices: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/company/invoice', {
				params: { ...payload },
			});

			// set invoice list
			commit('SET_STATE', {
				action: 'comnapnyinvoiceList',
				data: res.data.data,
			});

			// set total work details
			commit('SET_STATE', {
				action: 'totalInvoicesComapny',
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

	//view job seeker by id
	// view jobseeker team
	viewJobseekerInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/jobseeker/invoice/${id}`);
			// set state
			commit('SET_STATE', {
				action: 'invoiceSeekerDetail',
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

	//copy invoice
	// update invoice data
	copyJobSeekersInvoices: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post(`/jobseeker/invoice/duplicate/${id}`);
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

	//company invoice view details
	viewCompanyInvoice: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.get(`/company/invoice/${id}`);
			// set state
			commit('SET_STATE', {
				action: 'invoiceCompanyDetail',
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

	deleteInvoiceImage: async ({ commit }, id) => {
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.delete(`/jobseeker/invoice/attachment-delete/${id}`);

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
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const message = err.response.data;

			return Promise.reject({
				message,
			});
		}
	},

	// delete invoice
	deleteInvoiceRemoveCompany: async ({ commit }, id) => {
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
