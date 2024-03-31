const validEmail = require('email-validator');
const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

function validateInt(param, paramName) {

    if(!Number.isInteger(Number(param))){
    throw{ status : 400, message : `Bad Request!, ${paramName} should be an integer value!`}  
    }
  }

module.exports = {
    validateInt,

};