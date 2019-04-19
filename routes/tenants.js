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
    Tenant.find({}, function (err, tenants) {
        if (err) {
            res.status(500).send(err)
        } else {
            let allTenants = {};
            tenants.forEach(function (tenant) {
                allTenants[tenant.id] = tenant
            });
            res.send(allTenants);
        }
    })
});

router.get('/findById/:id', function (req, res) {
    Tenant.findById({_id: req.params.id}, function (err, tenant) {
        if (tenant) {
            res.json(tenant)
        } else {
            res.status(500).send(err)
        }
    })
});

router.put('/edit/:id', function (req, res) {
    Tenant.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, tenant) {
        if (err) {
            return res.send(err)
        }
        if (!tenant) {
            return res.status(404).send('Bookmark not found for user');
        }
        res.status(200).json(tenant);
    });
});

router.delete('/delete/:id', function (req, res) {
    Tenant.findByIdAndRemove({_id: req.params.id}, (err, tenant) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Todo successfully deleted",
            id: tenant._id,
            tName: tenant.tName
        };
        return res.status(200).send(response);
    });
});
module.exports = router;