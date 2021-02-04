const Joi = require('joi');
const BaseController = require('./base.controller');
const { createLeads, getLeads } = new (require('../modules/Salesforce'))();


class LeadsController extends BaseController {
  async getLeads(req, res) {
    try {
      const data = await getLeads(req.body);
      super.successResponse(res, data)
    } catch (error) {
      console.log({error});
      super.errorResponse(res, error);
    }
  }

  async createLeads(req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address: Joi.required(),
        phoneNumber: Joi.string().required(),
        company: Joi.string().required(),
        industry: Joi.string().required(),
        debtAmount : Joi.string().required()
      })
      super.validate(schema, req.body);

      const data = await createLeads(req.body);
      super.successResponse(res, data)
    } catch (error) {
      console.log({error});
      super.errorResponse(res, error);
    }
  }

  async updateLeads(req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address: Joi.required(),
        phoneNumber: Joi.string().required(),
        company: Joi.string().required(),
        industry: Joi.string().required(),
      })
      const value = super.validate(schema, req.body);
      super.validate(schema, req.body);

      const data = await createLeads(req.body);
      super.successResponse(res, data)
    } catch (error) {
      console.log({error});
      super.errorResponse(res, error);
    }
  }

}

module.exports = LeadsController
