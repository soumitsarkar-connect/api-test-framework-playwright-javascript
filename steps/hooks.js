const { Before, After } = require('@cucumber/cucumber');
const { APIWorld } = require('../support/custom-world');

Before(async function () {
  await this.init();
});

After(async function () {
  if (this.requestContext) {
    await this.requestContext.dispose();
  }
});
