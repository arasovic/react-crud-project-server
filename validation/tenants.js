const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTenantsInfo(data) {
    let errors = {};
    data.tName = !isEmpty(data.tName) ? data.tName : '';
    // data.tStatus = !isEmpty(data.tStatus) ? data.tStatus : '';

    if (Validator.isEmpty(data.tName)) {
        errors.tName = 'Tenant Name is required';
    }

    // if (Validator.isEmpty(data.tStatus)) {
    //     errors.tStatus = 'Tenant Status is required';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};