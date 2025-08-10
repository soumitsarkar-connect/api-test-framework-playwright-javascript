const { expect } = require('chai');

class CommonAssertions {
  static async verifyStatus(response, expectedStatus) {
    expect(response.status()).to.equal(expectedStatus);
  }

  static async verifyJsonContains(response, key) {
    const json = await response.json();
    expect(json).to.have.property(key);
  }
}

module.exports = { CommonAssertions };