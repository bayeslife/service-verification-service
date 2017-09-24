'use strict';

const debug = require('debug')('service-verifier-server');

const express = require('express');

const serviceprocessor = require("./serviceprocessor.js");

const consul = require("./consul-integration.js");

const PORT = 8500;
const HOST = '0.0.0.0';
const BACKEND = 'http://192.168.1.108:8501';

const app = express();


app.all("/verification/*", function(req, res) {
  debug("Register Verification")
  res.sendStatus(200);
})

consul.setup(app,serviceprocessor,{backend: BACKEND});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
