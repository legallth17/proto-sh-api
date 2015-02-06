#!/bin/env node

var express = require('express');
var catalog = require('./catalog');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var secret = 'STY1673HJ19UUY5DFCVFR';

// devices store

var devices = [];


// Create and configure server

var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use('/devices', expressJwt({secret: secret})); // protect access to /devices
// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// root

app.get('/', function(req, res) {
        res.send("try POST /devices?type=motion");
});

app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'joe.dalton' && req.body.password === 'alcatraz')) {
    res.send(401, 'wrong user or password');
    return;
  }

  var profile = {
    first_name: 'Joe',
    last_name: 'Dalton',
    email: 'joe.dalton@alcatraz.jail',
    id: 707
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 30 });

  res.json({ token: token });
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

app.get('/devices', function(req, res) {
    res.status(200);
    res.json(devices);
});

// GET devices

app.get('/devices/:id', function(req, res) {
    var device = devices[req.params.id];
    if( !device ) {
        res.status(404).end();
        return;
    }
    res.status(200);
    res.json(device);
});

// Start server

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
        Date(Date.now() ), ipaddress, port);
});
