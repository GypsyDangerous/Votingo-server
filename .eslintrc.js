module.exports = {
	parserOptions: {
		ecmaVersion: 2017,
	},
	env: {
		es6: true,
		jest: true,
	},
	rules: {
		"comma-dangle": 0,
		"no-underscore-dangle": 0,
		"no-param-reassign": 0,
		"no-return-assign": 0,
		camelcase: 0,
		quotes: [2, "double", { avoidEscape: true }],
		indent: ["error", "tab"],
	},
};
