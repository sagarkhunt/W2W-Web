/* eslint-disable indent */
import { useToast } from 'vue-toastification';
import { router } from '@/main'; // router
import store from '@/store'; // store

const toast = useToast();

// handle api error
export const handleAPIError = err => {
	const message =
	err.response && err.response.data && err.response.data.errors ? err.response.data.errors[0].msg : err.response && err.response.data.message ? err.response.data.message : err.message;
	if (message !== 'Invalid Token.') {
		toast.error(message); // toast message
	}

	const errorCode = err.response;
	if (errorCode.status == 401) {
		return router.push('/authlogin');
	}

	if (errorCode === 403) {
		// navigate to maintenance page
		router.push({ name: 'MaintenancePage' });
	}
	return message;
};

// handle check user is authenticated
export const isUserAuthenticated = async () => {
	// access token
	const accessToken = localStorage.getItem('accessToken');

	// check token and user detail - present
	if (accessToken && store.state.auth.user) {
		store.commit('auth/SET_STATE', { action: 'userLogged', data: true }); // set user logged state
		return true;
	}

	// verify token and fetch user detail
	if (accessToken && !store.state.auth.user) {
		try {
			await store.dispatch('auth/verifyToken');
			return true;
		} catch (error) {
			return false;
		}
	}

	store.commit('auth/SET_STATE', { action: 'userLogged', data: false }); // set user logged state
	return false;
};

// handle api error on submit time
export const handleAPISubmitError = err => {
	const message =
		err.response && err.response.data && err.response.data.errors ? err.response.data.errors[0].msg : err.response && err.response.data.message ? err.response.data.message : err.message;

	const errorCode = err.response;

	if (errorCode === 403) {
		// navigate to maintenance page
		router.push({ name: 'MaintenancePage' });
	}

	return message;
};
