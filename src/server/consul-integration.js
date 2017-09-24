
const debug = require('debug')('service-verifier-consul');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();


function setup(app,serviceprocessor,options){
    app.use ("/v1/*",function(req, res, next) {
        var data='';
        req.setEncoding('utf8');
        req.on('data', function(chunk) { 
           data += chunk;
        });
        req.on('end', function() {                  
            serviceprocessor.process(req,data);      
        });
        next();
      });
      
      app.all("/v1/*", function(req, res) {
        debug(req.url);
        debug(req.method)
        apiProxy.web(req, res, {target: options.backend});
        debug("Proxied");  
      });    
}



  module.exports = {
      setup: setup 
  }