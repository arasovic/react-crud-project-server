const mongoose = require('mongoose');
const today = require('../Date');
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
    adminInfo: {
        type: [Schema.Types.Mixed],
        required: false
    },

    date: {
        type: String,
        default: today
    }

});

const Tenant = mongoose.model('tenants', TenantSchema);

module.exports = Tenant;