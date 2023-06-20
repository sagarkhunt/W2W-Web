import { createStore, createLogger } from 'vuex';

import mutations from '@/store/mutations';
import state from '@/store/state';
import actions from '@/store/actions';

import authModule from './auth'; // auth state
import languageModule from './language'; // language state

import countryModule from './county'; // country state
import industryModule from './industry'; // industry module
import workDetailsModule from './workDetails'; // work hours module
import invoiceModule from './invoice'; // invoice module
import skillModule from './skill'; // skill module
import resumeModule from './resume'; // resume module
import qualificationModule from './qualification'; // qualification module
import documentModule from './document'; // document module
import jobModule from './job'; // job module
import dashboard from './dashboard';
import gigworkhour from './gigworkhour';
import projectmarket from './projectmarket'; //project module
import econtract from './econtract'; //econtract module
import signaturepade from './signaturepad'; //signaturepad module
import jobseekerTeam from './jobseekerTeam'; //jobseeker team module
import teamInvoice from './teamInvoice'; //team invocie module
import application from './application'; //application module
import report from './reports'; //application module

export default createStore({
	actions, //actions
	mutations, // common mutations
	state, // common state
	modules: {
		auth: authModule,
		language: languageModule,
		country: countryModule,
		industry: industryModule,
		workDetail: workDetailsModule,
		invoice: invoiceModule,
		skill: skillModule,
		resume: resumeModule,
		qualification: qualificationModule,
		document: documentModule,
		job: jobModule,
		dashboard: dashboard,
		gigworkhour: gigworkhour,
		projectmarket: projectmarket,
		econtract: econtract,
		signaturepade: signaturepade,
		jobseekerTeam: jobseekerTeam,
		teamInvoice: teamInvoice,
		application: application,
		report:report
	},
	strict: process.env.NODE_ENV !== 'production',
	plugins: [createLogger()],
	devtools: true,
});
