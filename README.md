# Service Verification

# Problem

When software is designed , developed and tested by separate groups, there are more opportunities for implementation to differ from design intention.  The agile approach is one mechanism to achieve better results but is not always practical especially when groups are not co-located in time and space.  When a solution is developed incremental over time by different designers, developers and testers there risks are increased.

As services are developed and released there needs to be some mechanism to ensure the service is fit for purpose but also to record its existence alongside other services.

Rather than seeing service verification and documentation as a pre-release activity, the aim here is to verify a service continuously, to take offline services that have not met verification tests and make an as built/inventory that is dynamically derived.



A service may be deployed but should only become active and available to clients when
- it passes verification tests
- it provides version, configuration and documentation through standard queries

Below is a diagram which describes this process flow.

1. A designer creates a design including test cases intended to confirm the implementation matches design intention.  These are deployed into the service verification engine.
2. A service is deployed and registers itself with the service verification.
3. The service verification runs tests to confirm the desired functionality
4. The service verification then registers the functionality with a dynamic service discovery mechanism.
5. The client is able to discovery the service and invoke the service.


![alt text][logo]

[logo]: images/overview.png "Overview"

There are a number of service discovery mechanisms available and these are described in the [landscape material](landscape.md).



## Terms

Service: A service that is fine grained and accessible via a lightweight protocol.  A micro service that is.

Service Registration: A service notifies of its existence.

Service Registry: A component which knows of services and can be queried by clients to discover the services.

Service Health Check: Lightwieight tests that a service discovery engine run to monitor the services and choose to take the service offline if the appropriate response is not received.  This is typically implemented by the Service Disovery engine rather than the Service Verification engine.

Service Verification Engine: A component used to verify the microservice is deployed as required and to provide visibility of the service existence.


Service Metadata Query: A query that should return information about the microservice such that the appropriate Service Verification Tests can be identified.

Service Verification Test: A tests used to verify a service is as designed.  This can be much more heavyweight than a Health Check.


## Responsibilities

### Accept Verification Tests
Problem: How to submit/change and remove verification tests.

The Service Verification component provides a REST API to register verification tests.


### Persist Verification Tests
Problem: How will verification tests be available across the cluster.

The component relies upon the Service Discovery distributed KV storage as its persistent storage.  Tests are stored as values indexed by key.

### Associate Verification Tests
Problem: How to identify which tests will apply to which services.

As services life cycle events occur the service end point is provided to the Service Verification component. It will then retrieve meta data about the service through a dedicated API.  The metadata query is then matched to tags associated with the verification tests.


### Verification Test Container
Problem: What environment is provided to verification tests

What languages
How to support any language.

Should the test also have a notification point for failures.

Are verification tests be changed or just removed/added.

Can there be more than one set of verification tests for service.


### Accept Service Activation Notifications
Need to receive connectivity details
Need to receive a refresh token?
How to receive meta data about an API - through the use of tags.

### Run Verification Tests
Run test and get results.
Store results.

Should events be raised when there is a failure.

### Register services
If verification is new, then register service.
If nonverification is new, then de-register service.

### Report services status
Service discovery capabilities do this.

Which services are verified and active
Which services are not verified
Which services are registered but have no verification tests.
Time series data of service historical data.
Historical changes to verification tests.

## Domain Concerns

### How to test a service without testing its dependencies.

A service can be expected to fail if its dependents services arent available or perform differently from expected.

A solution to this problem is provided.  Each service is to report the services it depends upon.
When a service is to be verified, the list of dependencies is first retrieved and only if all dependencies are know to be verified will the verification process proceed.

When a service depends upon an unverified service it will not be registered or will unregister itself.

##  Unit Tests
