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
                tenantInfo: req.body.tenantInfo
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
            res.status(200).send(allTenantAdmins);
        }
    })
});

router.delete('/deleteAll', function (req, res) {
    Tadmin.deleteMany({}, (err, tenant) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Tenant Admins deleted"
        };
        return res.status(200).send(response);
    })

});

router.get('/findById/:id', function (req, res) {
    Tadmin.findById({_id: req.params.id}, function (err, tenant) {
        if (tenant) {
            res.status(200).json(tenant)
        } else {
            res.status(500).send(err)
        }
    })
});

router.put('/edit/:id', function (req, res) {
    Tadmin.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, tenant) {
        if (err) {
            return res.send(err)
        }
        if (!tenant) {
            return res.status(404).send('not found');
        }
        res.status(200).json(tenant);
    });
});

router.delete('/delete/:id', function (req, res) {
    Tadmin.findByIdAndRemove({_id: req.params.id}, (err, tenant) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Tenant Admin deleted"
        };
        return res.status(200).send(response);
    });
});
module.exports = router;