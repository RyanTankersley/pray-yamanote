"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

router.get('/stations', function(req, res) {
    const file = __dirname + '/lib/data/english/stations.json';
    res.sendFile(file);
});

router.get('/strings', function(req, res) {
    const file = __dirname + '/lib/data/english/strings.json';
    res.sendFile(file);
});

app.use(express.static('public'));

app.use('/api', router);

app.get('/*', (req, res) => {
    const file = __dirname + '/index.html';
    res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);