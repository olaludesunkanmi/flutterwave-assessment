const {schema} = require('../helper/validate');
const ruleValidation = require('../helper/helper')

module.exports = async (req, res) => {

    // Validate request
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: false,
      statusCode: 400,
      message: error.message,
    });
  }

    const isValidJSON = (str) => {
      try{
          JSON.parse(str);
          return true;
      }
      catch (error){
          return false;
      }
  }
  
    try {
      const isValid = isValidJSON(JSON.stringify(req.body))

      if (isValid === false) {
        return res.send({
          "message": "Invalid JSON payload passed.",
          "status": "error",
            "data": null
        })
      }

      const value = ruleValidation(req.body)
      return res.status(value.status === 'error' ? 400 : 200 ).send({
        ...value
      })
    } catch (error) {
      console.log('error', error.details[0]);
      res.status(400).send({
          message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
          status: "error",
          data: null
      })
    }
  
  }