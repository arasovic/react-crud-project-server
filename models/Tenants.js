const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TenantSchema = new Schema({
    tName: {
        type: String,
        required: true
    },

    tStatus: {
        type: Boolean,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const Tenant = mongoose.model('tenants', TenantSchema);

module.exports = Tenant;