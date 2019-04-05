const express = require('express');
const router = express.Router();
const validateTenantsInfo = require('../validation/tenants');

const Tenant = require('../models/Tenants');

router.post('/add', function (req, res) {
    // const {errors, isValid} = validateTenantsInfo(req.body);
    //
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    Tenant.findOne({
        tName: req.body.tName
    }).then(tenant => {
        if (tenant) {
            return res.status(400).json({
                tName: 'Tenant already exists'
            });
        } else {
            const newTenant = new Tenant({
                tName: req.body.tName,
                tStatus: req.body.tStatus
            });
            newTenant.save().then(tenant => {
                res.json(tenant)
            })
        }
    })
});


router.get('/getAll', function (req, res) {
    Tenant.find({},function (err, tenants) {
        if (err){
            res.json(err)
        } else{
            let allTenants = {};
            tenants.forEach(function (tenant) {
                allTenants[tenant.id]=tenant
            });
            res.send(allTenants);
        }
    })
});

module.exports = router;