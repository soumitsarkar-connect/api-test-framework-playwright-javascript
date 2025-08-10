const { ENV } = require('./support/env');

module.exports = {
  use: {
    baseURL: ENV.baseURL
  },
};