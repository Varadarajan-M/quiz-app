/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: false,
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh'],
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-empty-function': 'off',
	},
};
