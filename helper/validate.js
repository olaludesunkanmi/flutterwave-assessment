const Joi = require('joi');

   const schema = Joi.object({
        rule: Joi.object({
            field: Joi.string().required().messages({
              "string.base": `field should be a String`,
              "any.required": `field is required`
            }),
            condition: Joi.string().required().messages({
              "string.base": `condition should be a String`,
              "any.required": `condition is required`
            }),
            condition_value: Joi.any().required().messages({
              "any.required": `condition value is required`
            }),
          }).required().messages({
            "object.base": `rule should be an object`,
            "any.required": `rule is required`
          }),
          data: Joi.any().required().messages({
            "any.required": `data is required`
          })
    });
 
exports.schema = schema;