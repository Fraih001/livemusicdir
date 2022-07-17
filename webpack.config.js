const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
    new Dotenv({systemvars: true}),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      ]
    }
  }

