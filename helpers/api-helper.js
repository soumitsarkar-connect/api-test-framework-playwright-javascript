const logger = require('./logger');

class APIHelper {
  /**
   * Generic API call handler
   * @param {object} requestContext - Playwright APIRequestContext
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
   * @param {string} endpoint - API endpoint
   * @param {object} [body] - Optional request body
   * @returns {Promise<object>} - Playwright APIResponse
   */
  static async sendRequest(requestContext, method, endpoint, body = null) {
    logger.info(`API Request → ${method.toUpperCase()} ${endpoint}`);

    const options = { method };

    // Only add 'data' if it's provided
    if (body) {
      logger.info(`Request Body: ${JSON.stringify(body, null, 2)}`);
      options.data = body;
    }

    const response = await requestContext.fetch(endpoint, options);

    const responseBody = await response.json();
    logger.info(`Response Status: ${response.status()}`);
    logger.info(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);

    return { status: response.status(), body: responseBody };
  }
}

module.exports = { APIHelper };