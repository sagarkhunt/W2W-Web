import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';



export default {	
	// Get pay Slip List
	getEContractList: async({commit},{payload})=>{
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {			
			const res = await axios.get('/company/contract/e/company',{
				params: { ...payload },
			});						
			// loading - false
			commit('SET_LOADER', false, { root: true });

			commit('SET_STATE', {
				action: 'eContractList',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'totalEContract',
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
	
};
