const ApplicationError = require('./ApplicationError');

class LimitTasksError extends ApplicationError {
  constructor(message) {
    super(403, message || 'limit tasks has been reached');
  }
}

module.exports = LimitTasksError;