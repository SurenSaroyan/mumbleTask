const Joi = require('joi');
const BaseController = require('./base.controller');
const { login } = new (require('../modules/Salesforce'))();

class UsersController extends BaseController {

    async login(req, res) {
        try {
                const response = await login();
                if (!response) {
                    super.errorResponse(res, { message: 'Sales Force not available'});
                }
                super.successResponse(res, response)
        } catch (error) {
            console.log(error);
            super.errorResponse(res, error);
        }
    }
}

module.exports = UsersController
