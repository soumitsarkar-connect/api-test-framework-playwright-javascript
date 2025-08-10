const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { ENV } = require('./env');

class APIWorld extends World {
  async init() {
    this.requestContext = await request.newContext({
      baseURL: ENV.baseURL
    });
  }
}

setWorldConstructor(APIWorld);

module.exports = { APIWorld };