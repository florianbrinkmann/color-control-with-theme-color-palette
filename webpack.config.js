const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: ['./blocks/index.js'],
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'js/editor.blocks.js',
	},
};
