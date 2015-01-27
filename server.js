#!/bin/env node

var express = require('express');
var catalog = require('./catalog');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// devices store

var devices = [];


// Create and configure server

var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// root

app.get('/', function(req, res) {
        res.send("try POST /devices?type=motion");
});

// POST devices

app.post('/devices', function(req, res) {
    var type = req.body.type;
    var device = catalog.createDevice(type);
    if (!device) {
        res.type('text').status(422).send('Device type not supported: '+type);
        return;
    }
    // store device
    var id = devices.length;
    devices[id] = device;
    // send response
    res.location('/devices/'+id);
    res.status(201);
    res.json(device);
});

// GET devices

app.get('/devices/:id', function(req, res) {
    res.status(200);
    res.json(devices[req.id]);
});

// Start server

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
        Date(Date.now() ), ipaddress, port);
});
