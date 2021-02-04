const ValidationError = require('../services/validation-error.service');

class BaseController {

  validate(schema, data, options = {}) {
    const { error, value } = schema.validate(data, options);

    if (error) {
      throw new ValidationError(error.message, error.details);
    }

    return value;
  }

  errorResponse(res, error) {
    res.send( {
      error: true,
      message: error.message
    })

  }

  successResponse(res, data) {
    res.send({
      error: false,
      message: 'Success',
      data
    })
  }
}

module.exports = BaseController;
