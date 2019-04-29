const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TadminSchema = new Schema({

    tAdminName: {
        type: String,
        required: true
    },

    tNameID: {
        type: [Schema.Types.ObjectId],
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Tadmin = mongoose.model('tadmins', TadminSchema);

module.exports = Tadmin;