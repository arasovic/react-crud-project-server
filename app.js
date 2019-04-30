const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');
const tenants = require('./routes/tenants');
const tadmins = require('./routes/tadmins');

mongoose.connect(config.DB, {useNewUrlParser: true}).then(
    () => {
        console.log('Mongoya bağlandı')
    },
    err => {
        console.log('Mongoya bağlanamadı' + err)
    }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/tenants', tenants);
app.use('/api/tadmins', tadmins);

// app.get('/', function(req, res) {
//     res.send('hello');
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server çalışıyor port: ${PORT}`);
});