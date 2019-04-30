const mongoose = require('mongoose');
const today = require('../Date');

const Schema = mongoose.Schema;

const TadminSchema = new Schema({

    tAdminName: {
        type: String,
        required: true
    },
    tenantInfo: {
        type: [Schema.Types.Mixed],
        required: false
    },

    date: {
        type: String,
        default: today
    }
});

const Tadmin = mongoose.model('tadmins', TadminSchema);

module.exports = Tadmin;