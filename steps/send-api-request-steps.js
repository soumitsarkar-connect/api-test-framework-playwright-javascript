const { Given, When, Then } = require('@cucumber/cucumber');
const { APIHelper } = require('../helpers/api-helper');
const logger = require('../helpers/logger');

// Store alias values for later use in steps
let storedValues = {};

// Step with body
When('I send a {string} request to {string} with body:', async function (method, endpoint, body) {
  logger.info(`Sending ${method} request to ${endpoint} with body: ${body}`);

  Object.keys(storedValues).forEach(alias => {
    endpoint = endpoint.replace(`{${alias}}`, storedValues[alias]);
  });

  this.response = await APIHelper.sendRequest(this.requestContext, method, endpoint, JSON.parse(body));
});

// Step without body
When('I send a {string} request to {string}', async function (method, endpoint) {
  logger.info(`Sending ${method} request to ${endpoint}`);
  Object.keys(storedValues).forEach(alias => {
    endpoint = endpoint.replace(`{${alias}}`, storedValues[alias]);
  });

  this.response = await APIHelper.sendRequest(this.requestContext, method, endpoint);
});

// Save a value from JSON response
Given('I store the value of {string} as {string}', async function (key, alias) {
  logger.info(`Storing value of ${key} as ${alias}`);
  const json = await this.response.body;
  storedValues[alias] = json[key];
  if (!storedValues[alias]) {
    throw new Error(`Key "${key}" not found in response`);
  }
});
