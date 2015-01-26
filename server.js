#!/bin/env node

var express = require('express');
var catalog = require('./catalog');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// Create and configure server

var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// root

app.get('/', function(req, res) {
        res.send("try POST /devices?type=motion");
});

// devices

app.post('/devices', function(req, res) {
    var device = catalog.createDevice(req.body.type);
    if (!device) {
        res.sendStatus(404);
        return;
    }
    res.status(201);
    res.json(device);
});


// Start server

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
        Date(Date.now() ), ipaddress, port);
});
