module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['react-app', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				trailingComma: 'es5',
				semi: true,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
			},
		],
	},
};
