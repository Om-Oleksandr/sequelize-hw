const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(404, message || 'data not found');
  }
}

module.exports = NotFoundError;
