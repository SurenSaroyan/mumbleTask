class AppError extends Error {
  constructor(message, details) {
    super();
    this.message = message;
    this.details = details;
  }

  toString() {
    return {
      message: this.message,
      details: this.details,
    }
  }
}

module.exports = AppError;
