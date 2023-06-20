import _ from 'lodash';

export default {
	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},

	upda: (state, data) => {			
		state.invoiceInfo.worked_hours.push(data)
	},

	remove: (state, data) => {		
		state.invoiceInfo.worked_hours.splice(data,1)
	},

	RESET_STATE: (state) => {
		// state.invoiceInfo = []
		state.invoiceTaxInfo = null
	},

	//SET_attachment
	SET_ATTACHMENT: (state, data) => {		
		state.invoiceInfo.invoice_files.push(data.data)
	},
	
	//Delete attachment
	DELETE_ATTACHMENT: (state, index) => {		
		state.invoiceInfo.invoice_files.splice(index,1)
	},
};
