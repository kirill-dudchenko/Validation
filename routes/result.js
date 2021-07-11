const express = require('express');
const axios = require('axios')
const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const { default: ValidationError } = require('ajv/dist/runtime/validation_error');

const router = express.Router();
const ajv = new Ajv()
addFormats(ajv, ["ipv4"])

router.post('/', function(req, res, next) {

  const { body } = req;

  const schema = {
    type: "object",
      properties: {
        id: {
             type: "string",
             maxLength: 120
            },
        firstname: { type: "string" },
        lastname: { type: "string" },
        email: { 
               type: "string",
               pattern: "^\\S+@\\S+\\.\\S+$",
               },
        gender: { type: "string" },
        ipaddress: { 
                   type: "string",
                   format: "ipv4"
                   }
      },
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)
  const valid = validate(body)

  if (valid) res.send({ status: 'ok'})
  else res.send({ status: 'invalid data', payload: { error: validate.errors} })

});

module.exports = router;
