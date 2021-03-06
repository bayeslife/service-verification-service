# The service discovery landscape


## Consul and Gliderlabs

Consul is a service discovery capability produced by HashiCorp.

There is an open source variant of this service discovery component of their platform.

The Consul Server provides
 - a service registry backed by a distributed key value store
 - a DNS capability allow lookup of SRV lookups for service ports
 - a clustering capability
 - a UI for browsing the services, key value pairs, clustered nodes and data centers
 - a REST API to register/de-register services, nodes and data centers.


### Shortcomings

Consul doesnt support a 2 phase service activation.  Once a REST call is made to register the service it is active.
Ideally there should be a separate activation request in addition to a registration request.


###
Gliderlabs has built a service registrar docker image integrated to Consul.
As docker images are started on the same node as the service registrar, the registrar will register them into Consul using the Consult REST API interface.

![alt text][ConsulGliderLabsIntegration]

[ConsulGliderLabsIntegration]: images/ConsulGliderLabsIntegration.png "Consult Gliderlabs Integration"


Below is a demo showing a consul server (run as a Docker image),
a Gliderlabs registrat (run as a Docker image),
a Redis service (run as a Docker image).

Initially the redis container is stop (not running), after the Consul Server and Gliderlabs registrar are started, the redis container is started.

A proxy logs the REST API interaction between the Registrar and the Consul Server.

With the Redis container running, a 'dig' lookup show the service port and the Consul Server UI shows the service status.

![alt text][overview]

[overview]: images/consul.gif "Overview"

### Evidence

Some evidence on the capability of consul was gathered to address a number of questions about this capability.
[See this evidence](Evidence.md).


###  Integration Opportunity

The integration from the registrar docker container to the consult container is via the Consul REST API.  

This provides the opportunity to implement a Service Verification component that accepts the registration and deregistration API requests and kicks off a workflow to verify before in turn registering the services to Consul.

![alt text][ConsulGliderLabsServiceVerificationIntegration]

[ConsulGliderLabsServiceVerificationIntegration]: images/ConsulGliderLabsServiceVerificationIntegration.png "Consult Gliderlabs Integration"
