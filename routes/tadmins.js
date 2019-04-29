const express = require('express');
const router = express.Router();

const Tadmin = require('../models/Tadmins');

router.post('/add', function (req, res) {
    Tadmin.findOne({
        tAdminName: req.body.tAdminName
    }).then(tenantAdmin => {
        if (tenantAdmin) {
            return res.status(400).json({
                tAdminName: 'Tenant Admin already exists'
            });
        } else {
            const newTenantAdmin = new Tadmin({
                tAdminName: req.body.tAdminName,
                tNameID: req.body.tNameID
            });
            newTenantAdmin.save().then(tenantAdmin => {
                res.json(tenantAdmin)
            })
        }
    })
});

router.get('/getAll', function (req, res) {
    Tadmin.find({}, function (err, tenants) {
        if (err) {
            res.status(500).send(err)
        } else {
            let allTenantAdmins = {};
            tenants.forEach(function (tenant) {
                allTenantAdmins[tenant.id] = tenant
            });
            res.send(allTenantAdmins);
        }
    })
});

module.exports = router;