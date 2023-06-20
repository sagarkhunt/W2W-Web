import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import store from '@/store';
import en from '../../i18n/en/en.json'; // default locale

/**
 * setup translation
 */
// load default locale messages
export const i18n = setupI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	// eslint-disable-next-line no-unused-vars
	missing: (locale, key, instance) => {
		// something to do ...
		console.warn(`detect '${key}' key missing in '${locale}'`);
	},
	messages: {
		en,
	},
});

// supported locals
export const SUPPORT_LOCALES = ['en', 'ee'];

// setup i18n
export function setupI18n(options) {
	options.locale = localStorage.getItem('lang') || 'fi';
	const i18n = createI18n(options);
	setI18nLanguage(i18n, options.locale);
	return i18n;
}

// set i18n language
export function setI18nLanguage(i18n, locale) {
	if (i18n.mode === 'legacy') {
		i18n.global.locale = locale;
	} else {
		i18n.global.locale.value = locale;
	}

	// set locale language
	store.dispatch('language/updateLocalLanguage', locale);
	document.querySelector('html').setAttribute('lang', locale);
}

// import lazy load message
export const loadMessagesJson = locale => require(`../../i18n/${locale}/${locale}.json`);

// load locale messages
export async function loadLocaleMessages(i18n, locale) {
	const localMessages = await loadMessagesJson(locale);
	i18n.global.setLocaleMessage(locale, localMessages);

	return nextTick();
}
