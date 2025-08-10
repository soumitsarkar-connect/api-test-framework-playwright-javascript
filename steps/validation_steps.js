const { Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ allErrors: true });

Then('the response status should be {int}', async function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then('the JSON response should have property {string}', async function (key) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson).to.have.property(key);
});

Then('the JSON response should not have property {string}', async function (key) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson).to.not.have.property(key);
});

Then('the JSON response property {string} should be {string}', async function (key, value) {
  const responseBodyJson = this.response.body;
  expect(String(responseBodyJson[key])).to.equal(value);
});

Then('the JSON response property {string} should be of type {string}', async function (key, type) {
  const responseBodyJson = this.response.body;
  expect(typeof responseBodyJson[key]).to.equal(type);
});

Then('the JSON response array {string} should have length {int}', async function (key, length) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson[key]).to.be.an('array').with.lengthOf(length);
});

Then('the JSON response property {string} should contain {string}', async function (key, text) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson[key]).to.include(text);
});

Then('the JSON response property {string} should be greater than {int}', async function (key, number) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson[key]).to.be.greaterThan(number);
});

Then('the JSON response property {string} should be less than {int}', async function (key, number) {
  const responseBodyJson = this.response.body;
  expect(responseBodyJson[key]).to.be.lessThan(number);
});

Then('the JSON response should match this JSON:', async function (docString) {
  const expected = JSON.parse(docString);
  const responseBodyJson = this.response.body;
  expect(responseBodyJson).to.deep.equal(expected);
});

Then('the JSON response property {string} should be one of:', async function (key, dataTable) {
  const responseBodyJson = this.response.body;
  const expectedValues = dataTable.raw().flat();
  expect(expectedValues).to.include(String(responseBodyJson[key]));
});

Then('the JSON response should have nested property {string}', async function (path) {
  const responseBodyJson = this.response.body;
  const keys = path.split('.');
  let current = responseBodyJson;
  keys.forEach(k => {
    expect(current).to.have.property(k);
    current = current[k];
  });
});

Then('the JSON response should match the schema {string}', async function (schemaName) {
  const schemaPath = path.join(process.cwd(), 'data/schemas', `${schemaName}.json`);

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const responseBodyJson = this.response.body;

  const validate = ajv.compile(schema);
  const valid = validate(responseBodyJson);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }

  expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`).to.be.true;
});
