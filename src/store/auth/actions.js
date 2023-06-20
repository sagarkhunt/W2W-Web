import { useToast } from 'vue-toastification';
import axios from '@/helpers/axios';
import { handleAPIError } from '@/helpers/functions.js';
import { router } from '@/main'; // router

const toast = useToast();
export default {
	// verify email - check email
	verifyEmail: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/email', payload);
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

	// verify - token
	verifyEmailToken: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/verify-user-token', payload);
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

	// register light entrepreneur ( job seeker )
	registerJobSeeker: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/add-seeker', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close registration modal
			commit('SET_STATE', {
				action: 'isRegisterModelOpen',
				data: false,
			});

			toast.success(res.data.message); // success message

			// remove current registration detail
			localStorage.removeItem('current_registration');

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

	// register employeer ( company )
	registerEmployer: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/add-company', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close registration modal
			commit('SET_STATE', {
				action: 'isRegisterModelOpen',
				data: false,
			});

			toast.success(res.data.message); // success message

			// remove current registration detail
			localStorage.removeItem('current_registration');

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

	// login ( company or seeker )
	login: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/signin', payload);
			window.Tawk_API.setAttributes(
				{
					name: res.data.data.full_name,
					email: res.data.data.email,
					userType: res.data.data.user_type,
				},
				function(error) {
					console.log(error);
				},
			);
			// Set accessToken
			localStorage.setItem('accessToken', res.data.token);
			// Update user details
			commit('SET_USER_INFO', res.data.data);

			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: true });
			commit('SET_STATE', { action: 'userLoggedNew', data: true });
			commit('SET_STATE', { action: 'empLogged', data: true });

			// set user type state
			commit('SET_STATE', {
				action: 'userType',
				data: res.data.data.user_type,
			});

			commit('SET_STATE', {
				action: 'userHeaderPanel',
				data: res.data.data.user_header_panel,
			});

			// Set bearer token in axios
			commit('SET_BEARER_TOKEN', res.data.token);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isJobSeekerModelOpen',
				data: false,
			});
			//post gig login
			commit('SET_STATE', {
				action: 'isEmpLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isLoginModelOpenProject',
				data: false,
			});

			commit('SET_STATE', {
				action: 'userProfile',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'seekForGig',
				data: false,
			});

			toast.success(res.data.message); // toast

			return {
				data: res.data,
			};
		} catch (err) {
			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: false });

			// loading - false
			commit('SET_LOADER', false, { root: true });

			const message = handleAPIError(err);

			return Promise.reject({
				message,
			});
		}
	},

	// forgot password (send email)
	forgotPassword: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/forgot-password', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isForgotPasswordModelOpen',
				data: false,
			});

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
	// forgot password (send email)
	forgotPasswordRest: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/forgot-password/reset', payload);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isForgotPasswordModelOpen',
				data: false,
			});

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

	// user authrozed
	verifyToken: async ({ commit, dispatch }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/user/verify-token');

			// Update user details
			commit('SET_USER_INFO', res.data.data);

			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: true });
			commit('SET_STATE', { action: 'userLoggedNew', data: true });
			commit('SET_STATE', { action: 'empLogged', data: true });

			// set user type state
			commit('SET_STATE', {
				action: 'userType',
				data: res.data.data.user_type,
			});
			// set user type state
			commit('SET_STATE', {
				action: 'activityPoints',
				data: res.data.data.activity_points,
			});

			commit('SET_STATE', {
				action: 'userHeaderPanel',
				data: res.data.data.user_header_panel,
			});

			commit('SET_STATE', {
				action: 'userProfile',
				data: res.data.data,
			});

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isLoginModelOpen',
				data: false,
			});
			commit('SET_STATE', {
				action: 'isLoginModelOpenProject',
				data: false,
			});
			commit('SET_STATE', {
				action: 'isJobSeekerModelOpen',
				data: false,
			});

			//post gig login
			commit('SET_STATE', {
				action: 'isEmpLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'seekForGig',
				data: res.data.data.jobSeeker && res.data.data.jobSeeker.send_job_alert,
			});

			commit('SET_STATE', {
				action: 'incompleteProfileFlag',
				data: res.data.data?.incomplete_profile_flag,
			});
			commit('SET_STATE', {
				action: 'firstTimeLogin',
				data: res.data.data && res.data.data.first_time_login,
			});

			commit('SET_STATE', {
				action: 'shareCode',
				data: res.data.data && res.data.data.share_code,
			});
			commit('SET_STATE', {
				action: 'invitedFriends',
				data: res.data.data && res.data.data.invitedFriends,
			});
			return {
				data: res.data,
			};
		} catch (err) {
			localStorage.removeItem('accessToken');

			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: false });

			// loading - false
			commit('SET_LOADER', false, { root: true });

			return Promise.reject({
				err,
			});
		} finally {
			let dataVariable = false;
			const clearSetTimeOut = setInterval(() => {
				if (dataVariable == false) {
					dispatch('auth/urlStatusAccess', null, { root: true })
						.then(res => {
							console.log(res.data, '---------');
						})
						.catch(err => {
							dataVariable = err.err.response.data.data.maintence_mode;
							if (err.err.response.data.data.maintence_mode) {
								clearInterval(clearSetTimeOut);
								
							}
						});
				}
			}, 1000 * 60 * 5);
			localStorage.setItem('maintenceModeTimeID', clearSetTimeOut);
		}
	},

	//update user
	vueTour: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });
		try {
			const res = await axios.put('/user/complete-user-tour');
			commit('SET_LOADER', false, { root: true });

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

	// logout user
	logout: async ({ commit }) => {
		localStorage.removeItem('hideTaxAlert');
		localStorage.removeItem('accessToken');
		document.cookie = 'userId=;';
		// set user logged state
		commit('SET_STATE', { action: 'userLogged', data: false });

		// set user tyep state
		commit('SET_STATE', { action: 'userType', data: '' });

		// remove user details
		commit('SET_USER_INFO', null);

		const userAccType = localStorage.getItem('UserAccountType');
		localStorage.clear();
		localStorage.setItem('UserAccountType', userAccType);
	},

	// add employer - by job seeker
	addAnonymousEmployer: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/employer-by-seeker', payload);

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

	// change password
	changePassword: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/change-password', payload);

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

	// update seeker profile
	updateSeekerProfile: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/seeker', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

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

	// update company profile
	updateCompanyProfile: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/company', payload);

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

	//team member data
	getTeamMembers: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/company/company-team', {
				params: { ...payload },
			});
			// loading - false
			commit('SET_LOADER', false, { root: true });
			commit('SET_STATE', {
				action: 'TeamMemberList',
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
	// get work detail by id
	getTeamMemberById: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get(`/company/company-team/${id}`);

			// set work detail
			commit('SET_STATE', {
				action: 'TeamMember',
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

	// add team member
	addTeamMember: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/company/company-team/', payload, {
				
			});

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

	//delete team member
	// delete invoice
	deleteTeamMember: async ({ commit }, id) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.delete(`/company/company-team/seeker/${id}`);

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

	//seek for gigs deatils store
	// update seeker profile
	storeSeekerGigDetail: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/jobseeker/gigs-settings', payload);

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

	//get access url status
	urlStatusAccess: async ({ commit, dispatch }) => {
		// loading - true
		commit('SET_LOADER', false, { root: true });
		let maintanceMode;
		try {
			const res = await axios.get('/user/site-setting/url_access_mode');
			maintanceMode = res.data.data.maintence_mode;
			
			commit('SET_LOADER', false, { root: true });
			commit('SET_STATE', {
				action: 'maintanceModeChecked',
				data: maintanceMode,
			});
			return {
				data: res.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			maintanceMode = err.response.data.data.maintence_mode;
			commit('SET_STATE', {
				action: 'maintanceModeChecked',
				data: maintanceMode,
			});


			return Promise.reject({
				// message,
				err,
			});
		}
		
	},

	urlStatusAccessSideBar: async ({ commit, dispatch }) => {
		// loading - true
		commit('SET_LOADER', false, { root: true });
		let maintanceMode;
		try {
			const res = await axios.get('/user/site-setting/url_access_mode');
			maintanceMode = res.data.data.maintence_mode;

			// loading - false
			commit('SET_LOADER', false, { root: true });
			return {
				data: res.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			maintanceMode = err.response.data.data.maintence_mode;

			return Promise.reject({
				err,
			});
		} finally {
			if (maintanceMode) {
				clearInterval(localStorage.getItem('maintenceModeTimeID'));
				window.location.href = '/authlogin';

			}
		}
	},

	urlStatusAccessMode: async ({ commit }) => {
		// loading - true
		commit('SET_LOADER', false, { root: true });

		try {
			const res = await axios.get('/user/site-setting/url_access_mode');
			// loading - false
			commit('SET_LOADER', false, { root: true });
			return {
				data: res.data,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			return Promise.reject({
				err,
			});
		}
	},

	//invitaqtion accept
	acceptInvitationUser: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/update-member-status', payload);

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

	// invoice quick pay verify
	acceptInvoiceQuickpayVerify: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/quick-pay-verify', payload);

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

	// team invoice quick pay verify
	acceptTeamInvoiceQuickpayVerify: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/team-quickPay-verify', payload);

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

	// update user name
	// update Team name
	updateUserName: async ({ commit }, { payload }) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.put('/user/update-name', payload);

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

	// get bank name and swift code
	// get work detail by id
	getBankSwiftCode: async ({ commit }, ibanNumber) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const payload = {
				accountNumber: ibanNumber,
			};
			const res = await axios.get('/user/iban-details/', {
				params: payload,
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
	// check for forgot pass token
	checkResetPassToken: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.get('/user/forgot-password/verify-token', {
				params: { ...payload },
			});

			return {
				data: res.data,
				message: res.data.message,
			};
		} catch (err) {
			// loading - false
			commit('SET_LOADER', false, { root: true });

			const { message } = handleAPIError(err);
			router.push({ name: 'auth-login-page' });
			return Promise.reject({
				message,
			});
		}
	},
	// upload document for by user profile
	// upload document file
	uploadDocumentUserProfile: async ({ commit }, payload) => {
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
	// login ( company or seeker )
	socialLogin: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('/user/signin', payload);

			// Set accessToken
			localStorage.setItem('accessToken', res.data.token);

			// Update user details
			commit('SET_USER_INFO', res.data.data);

			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: true });
			commit('SET_STATE', { action: 'userLoggedNew', data: true });
			commit('SET_STATE', { action: 'empLogged', data: true });

			// set user type state
			commit('SET_STATE', {
				action: 'userType',
				data: res.data.data.user_type,
			});

			// Set bearer token in axios
			commit('SET_BEARER_TOKEN', res.data.token);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isJobSeekerModelOpen',
				data: false,
			});
			//post gig login
			commit('SET_STATE', {
				action: 'isEmpLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isLoginModelOpenProject',
				data: false,
			});

			commit('SET_STATE', {
				action: 'userProfile',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'seekForGig',
				data: false,
			});

			toast.success(res.data.message); // toast

			return {
				data: res.data,
			};
		} catch (err) {
			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: false });

			// loading - false
			commit('SET_LOADER', false, { root: true });

			const message = handleAPIError(err);

			return Promise.reject({
				message,
			});
		}
	},

	// google call back function
	callBackLogin: async ({ commit }, payload) => {
		// loading - true
		commit('SET_LOADER', true, { root: true });

		try {
			const res = await axios.post('user/auth/callback', payload);
			// loading - false
			commit('SET_LOADER', false, { root: true });

			// Set accessToken
			localStorage.setItem('accessToken', res.data.token);

			// Update user details
			commit('SET_USER_INFO', res.data.data);

			// set user logged state
			commit('SET_STATE', { action: 'userLogged', data: true });
			commit('SET_STATE', { action: 'userLoggedNew', data: true });
			commit('SET_STATE', { action: 'empLogged', data: true });

			// set user type state
			commit('SET_STATE', {
				action: 'userType',
				data: res.data.data.user_type,
			});

			// Set bearer token in axios
			commit('SET_BEARER_TOKEN', res.data.token);

			// loading - false
			commit('SET_LOADER', false, { root: true });

			// close login modal
			commit('SET_STATE', {
				action: 'isLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isJobSeekerModelOpen',
				data: false,
			});
			//post gig login
			commit('SET_STATE', {
				action: 'isEmpLoginModelOpen',
				data: false,
			});

			commit('SET_STATE', {
				action: 'isLoginModelOpenProject',
				data: false,
			});

			commit('SET_STATE', {
				action: 'userProfile',
				data: res.data.data,
			});

			commit('SET_STATE', {
				action: 'seekForGig',
				data: false,
			});

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
