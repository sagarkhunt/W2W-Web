import moment from 'moment'
export default {
	// get employer list - user specific
	getEmployerList: state => {
		const h = state.employerList.reduce((acc, item) => {
			acc.push({
				...item,
				value: item.company.id,
				label: item.company.company_name,
			});

			return acc;
		}, []);

		return h;
	},

	// get employer details
	getEmployerDetails: state => {
		return state.employerDetail || {};
	},

	// get invoice list - job seeker
	getJobSeekerInvoiceList: state => {
		return state.invoiceList || [];
	},
	// get invoice list - job seeker
	getSeekerDeducationList: state => {
		return state.deducationList || [];
	},

	// get invoice edit info - job seeker
	getJobSeekerInvoiceEditInfo: state => {
		return state.invoiceInfo || {};
	},

	// get invoice list - com pany
	getCompanyInvoiceList: state => {
		return state.comnapnyinvoiceList || [];
	},
	// get invoice company view details
	getInvoiceCompnayDetails: state => {
		return state.invoiceCompanyDetail || {};
	},
	// get invoice company view details
	getInvoiceSeekerDetails: state => {
		return state.invoiceSeekerDetail || {};
	},

	// get invoice company view details
	getInvoiceCompanyDetails: state => {
		return state.invoiceCompanyDetail || {};
	},

	/**
	 * Get attachment from edit team invoice
	 * @param {*} state
	 * @returns <Array>
	 */
	getEditAttachmentFromInvoice: (state)  => {
		return state.invoiceInfo?.invoice_files?.map(x => ({
			purchase_place: x.purchase_place || '',
			purchase_date: x.purchase_date == null ? null : moment(x.purchase_date).format('YYYY/MM/DD'),
			receipt_file: x.receipt_file,
			contractFile: x.file_path || null,
			contractFilePreview: x.file_path || null,
			file_path: x.file_path || null,
		}))
	},
	
};
