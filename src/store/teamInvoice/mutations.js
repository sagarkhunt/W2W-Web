import _ from 'lodash';

export default {
	SET_STATE: (state, payload) => {
		_.set(state, payload.action, payload.data);
	},

	SET_PAYMENT_SHARING: (state, data) => {
		state.paymentSharing = data.team_members.map(x => ({
			seekerId: x.seekerId,
			shared_amount: Number(x.seeker_total_worked_value),
			shared_percentage: (Number(x.seeker_sub_total) * 100) / data.sub_total,
		}));
	},

	SET_EDIT_PAYMENT_SHARING: (state, data) => {
		state.editPaymentSharing = data.invoice_seekers.map(x => ({
			seekerId: x.seekerId,
			shared_amount: x.worked_value,
			shared_percentage: x.shared_percentage,
		}));
	},

	upda: (state, data) => {
		const data2 = [...state.invoiceInfo.invoice_workhours, ...data].reduce((acc, item) => {
			acc.push(item);
			return acc;
		}, []);

		state.invoiceInfo.invoice_workhours = data2;
	},

	remove: (state, data) => {
		state.invoiceInfo.invoice_workhours.splice(data, 1);
	},

	removeoldWrokItem: state => {
		state.invoiceInfo.invoice_workhours.splice(0);
	},

	updateTeamId: (state, data) => {
		state.invoiceInfo.teamId = data;
	},

	RESET_STATE: state => {
		// state.invoiceInfo = []
		state.invoiceTaxInfo = null;
	},

	RESET_STATE_WOORK_DETAILS: state => {
		// state.invoiceInfo = []
		state.teamWorkDetailList = [];
	},

	//SET_attachment
	SET_ATTACHMENT: (state, data) => {
		state.editTeamWorkDetailList.invoice_files.push(data.data);
	},

	//Delete attachment
	DELETE_ATTACHMENT: (state, index) => {
		state.editTeamWorkDetailList.invoice_files.splice(index, 1);
	},
};
