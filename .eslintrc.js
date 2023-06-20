module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'linebreak-style': ['error', 'unix'],
		'no-tabs': 0,
		'no-useless-catch': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
		'consistent-return': 'off',
		'no-unused-vars': 'off' 

	},
};
