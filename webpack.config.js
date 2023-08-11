const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env', // default is .env
      safe: true, // load '../../path/to/other.env.example'
      defaults: true, // load '../../path/to/other.env.defaults'
    }),
    // new Dotenv(),
  ],
};
