# Evidence

## Are KeyValue pairs synchronized across consul nodes

I wanted to investigate how quickly the consul distribute key value system distributed entries.  To verify this a test case was created which wrote to one of 3 consul servers and then read from the second and third consul servers in a cluster.

The test verified the replication is reasonably fast.

For this test 3 consul servers are started and joined together.

First server
```
docker run -it  --name=consul-server  consul agent -dev -server -bind=172.17.0.2 -client=172.17.0.2
```

Second server
```
docker run -it --name=consul-server2 consul agent -dev -server -bind=172.17.0.3 -client=172.17.0.3 -join=172.17.0.2
```

Third server
```
docker run -it --name=consul-server3 consul agent -dev -server -bind=172.17.0.4 -client=172.17.0.4  -join=172.17.0.2
```

In the test case we write to one node and read from the other two.

```
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
              readValue = buf.toString("ascii");

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


```

The test result
```
[test]   Given a pair of joined consul servers
[test]     When a kv pair is inserted to one server
[test]       Then we should read the value from the second server
[test]         ✓ And verify the value retrieved
[test]       Then we should read the value from the third server
[test]         ✓ And verify the value retrieved
```


[Key Value Video](https://youtu.be/F5vkEzoF2AA)

The video demonstrates the test fails if one of the 3 nodes is not available.
