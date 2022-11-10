const path = require('path');




const clientConfig = {
	entry: './src/modules.js',
	output: {
		filename: 'modules.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'MyLibrary',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
					presets: [
						'@babel/preset-env', 
						["@babel/preset-react", {"runtime": "automatic"}]
					],
					plugins: [
						"@babel/plugin-syntax-dynamic-import",
						"@babel/plugin-proposal-class-properties"
						]
					}
				}
			},
			{
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
				test: /\.css$/
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images/',
							name: '[name][hash].[ext]',
						},
					},
				],
			},
		]
	},
	mode: 'development',
};


module.exports = [clientConfig];