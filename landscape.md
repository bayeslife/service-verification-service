# The service discovery landscape


## Consul and Gliderlabs

Consul is a service discovery capability produced by HashiCorp.

It is the open source variant of their platform.

The Consul Server provides
 - a service registry backed by a distributed key value store
 - a DNS capability allow lookup of SRV lookups for service ports
 - a clustering capability
 - a UI for browsing the services, key value pairs, clustered nodes and data centers
 - a REST API to register/de-register services,nodes and data centers.

Gliderlabs has built a service registrar docker image integrated to Consul.
As docker images are started on the same node as the service registrar, the registrar will register them into Consul.


Below is a demo showing a consul server (run as a Docker image),
a Gliderlabs registrat (run as a Docker image),
a Redis service (run as a Docker image).

Initially the redis container is stop (not running), after the Consul Server and Gliderlabs registrar are started, the redis container is started.

A proxy logs the REST API interaction between the Registrar and the Consul Server.

With the Redis container running, a 'dig' lookup show the service port and the Consul Server UI shows the service status.

![alt text][logo]

[logo]: images/consul.gif "Overview"
