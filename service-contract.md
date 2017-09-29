# Service Contract

In order to appropriately register and verify microservices it will be necessary for the microservice to support a metadata API contract.

## Sequence
The metadata required will be retrieved by a GET /service-discovery-metadata callback to the service endpoint after it registers.

This will be invoked after the service registers.

![alt text][QueryMetaData]

[QueryMetaData]: images/metadata.png "Query Metadata"

## Metadata Semantics

The metadata will have the following content.

```
{
    name: ProductEligibilityService,
    version: 3.1,
    environment: "PRODUCTION",
    tags: [ "",""]    
}
```


### MetaData scenarios
