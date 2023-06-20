import { mapActions } from 'vuex';

const logOutSession = 720;

export const inActiveSession = {
	methods: {
		...mapActions('auth', { triggerLogout: 'logout' }),
		resetTimer() {
			if (
				this.$route.meta.allowAnonymous !== undefined &&
				!this.$route.meta.allowAnonymous
			) {
				const expiredTime = localStorage.getItem('expiredTime');
				if (expiredTime && expiredTime <= Date.now()) {
					this.triggerLogout();
					this.$nextTick(() => {
						localStorage.removeItem('accessToken');
						window.location.href = '/';
					});
				}
				localStorage.setItem(
					'expiredTime',
					Date.now() + logOutSession * 60 * 1000,
				);
			}
		},
		logout() {
			const expiredTime = localStorage.getItem('expiredTime');
			if (expiredTime <= Date.now()) {
				if (!this.$route.meta.allowAnonymous) {
					this.triggerLogout();
					this.$nextTick(() => {
						localStorage.removeItem('accessToken');
						this.$router.push('/').catch(() => {});
					});
				}
				clearInterval(this.logoutTimer);
			}
		},
	},
	mounted() {
		const events = [
			'load',
			'mousedown',
			'mousemove',
			'keypress',
			'scroll',
			'touchstart',
		];		
		events.forEach(event => {
			document.addEventListener(event, this.resetTimer, true);
		});
		this.logoutTimer = setInterval(this.logout, 1000);
	},
	beforeDestroy() {
		// TODO: remove all event listners from document
		const events = [
			'load',
			'mousedown',
			'mousemove',
			'keypress',
			'scroll',
			'touchstart',
		];
		events.forEach(event => {
			document.removeEventListener(event, this.resetTimer, true);
		});
		clearInterval(this.logoutTimer);
	},
};
