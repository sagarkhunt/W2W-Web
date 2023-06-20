import axios from 'axios';

export const baseURL = process.env.VUE_APP_API_END_POINT;

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
	axios.defaults.headers.common['x-access-token'] = accessToken;
} else {
	axios.defaults.headers.common['x-access-token'] = '';
}
axios.defaults.headers.common['accept-language'] = localStorage.getItem('lang') || 'en';

export default axios.create({
	baseURL,
	open:true,
	proxy:{
		'/api':{
			target:baseURL,
			ws:true,
			changeOrigin:true
		}
	}

	// You can add your headers here
});
