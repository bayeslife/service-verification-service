
const debug = require('debug')('service-verifier-registrationhandler');

module.exports = {
    process: function(req,data){
        console.log("MicroService Registration:"+req.method+":"method.url);
    }
}
