var assert = require('assert');

var Client = require('node-rest-client-promise').Client;

var client = new Client();

describe('Given a pair of joined consul servers', function() {
  this.timeout(10000);
  var value = "hello";
  var key = Math.random().toString(36).substring(7);
  describe('When a kv pair is inserted to one server', function() {
    var clientStatus=false;
    before(function(done){
      client.putPromise("http://172.17.0.2:8500/v1/kv/"+key, { data: value })
        .then(function(response){
          clientStatus=true;
          done();
        })
        .catch(function(error){
          console.log(error.errno);
          done();
        })
    })
    describe('Then we should read the value from the second server', function() {
      var readValue =null;
      before(function(done){
        client.getPromise("http://172.17.0.3:8500/v1/kv/"+key)
          .then(function({response,data}){
            if(response.statusCode==200){
              clientStatus=true;
              var buf = Buffer.from(data[0].Value, 'base64')
              readValue = buf.toString('ascii');

            }else {
              console.log("Response Status:"+response.statusCode)
            }
            done();
          })
          .catch(function(error){
            console.log(error.code);
            done();
          })
      })
      it('And verify the value retrieved', function() {
        assert.ok(clientStatus,"The put request failed");
        assert.equal(value,readValue);
      });
    });
    describe('Then we should read the value from the third server', function() {
      var readValue =null;
      before(function(done){
        client.getPromise("http://172.17.0.4:8500/v1/kv/"+key)
          .then(function({response,data}){
            if(response.statusCode==200){
              clientStatus=true;
              var buf = Buffer.from(data[0].Value, 'base64')
              readValue = buf.toString('ascii');

            }else {
              console.log("Response Status:"+response.statusCode)
            }
            done();
          })
          .catch(function(error){
            console.log(error.code);
            done();
          })
      })
      it('And verify the value retrieved', function() {
        assert.ok(clientStatus,"The put request failed");
        assert.equal(value,readValue);
      });
    });
  })
});
