# LoRa framework documentation

This framework is composed of 2 parts:

* LoRa Network Server (LNS) connectivity which is responsible for:

    * handling both uplink and downlink

    * providing wizard steps for UI to create a new connector

    * handling calls to LNS API in order to:

        * configure the LNS for pushing data to Cumulocity

        * provision/deprovision devices

* Device codec which is responsible for:

    * decoding uplink to Cumulocity data

    * encoding Cumulocity operations to downlink commands

    * listing device supported operations per model (one codec can support multiple models)

    * listing supported models

LNS Connectors as well as codecs are multitenant microservices that can fully scale.

## How to create a new connector
### Interfaces and classes to extend/implement
1. Abstract class `LNSIntegrationService<C extends LNSConnector>`

This abstract class which is responsible for processing messages coming from the LNS exposes the following abstract methods:

* `DeviceData processUplinkEvent(String eventString)`

This method processes uplinks sent by the LNS.

Uplink is passed as a string that can contains any kind of data (can be JSON, XML, etc...).

The method must produce a `DeviceData` object which is described later in this chapter.

* `OperationData processDownlinkEvent(String eventString)`

This method processes downlink updates sent by the LNS.

Downlink update is passed as a string that can contains any kind of data (can be JSON, XML, etc...).

The method must produce an `OperationData` object which is described later in this chapter.

* `boolean isOperationUpdate(String eventString)`

This is a convenient method that can be used when the LNS supports only one route for both uplinks and downlink updates.

2. Abstract class `LNSAbstractConnector`

This abstract class which implements the `LNSConnector` interface and is responsible for calling the LNS API exposes the following abstract methods:

* `void init()`

This is where you initialize the connector, for example by creating an instance of an HTTP client to the LNS that will be reused by below methods.

* `configureRoutings(String url, String tenant, String login, String password)`

This method will configure the LNS to push data to Cumulocity tenant specified by passed parameters.

* `removeRoutings()`

This method will remove LNS push configuration. Invoked when you delete a connector.

* `boolean provisionDevice(DeviceProvisioning deviceProvisioning)`

This method will provision a device in the LNS and create the device with Cumulocity.
The new device will have its deveui as an external Id.

* `boolean deprovisionDevice(String deveui)`

This method will deprovision a device in the LNS and is called when you delete a device from the LoRa devices UI.

* `Optional<EndDevice> getDevice(String devEui)`

This method get info on a device from the LNS.

* `List<EndDevice> getDevices()`

This method get the list of available devices from the LNS (currently not used, so it is safe to ignore it).

* `String sendDownlink(DownlinkData downlinkData)`

This method will send a downlink to the LNS after the Cumulocity operation has been processed by the device codec.

3. Interface `LNSConnectorWizardStep`

This interface must be implemented at least once and added to the `wizard` linked list in the class extending `LNSIntegrationService`.

The reason we need a wizard to configure a LNS connector is because most LNS group their devices in a way or another, and pushing configurations only apply to one of those groups.

For example Kerlink Wanesy groups devices in clusters, Loriot groups them in apps and Objenious in groups.

So generally you have 2 steps to connect a LNS to Cumulocity: first step provides access to the LNS (for example URL and credentials) and second step lets you chose which group of devices you want to connect to Cumulocity.

A `LNSConnectorWizardStep` must provide a `LinkedList` of `PropertyDescription`s.

The `PropertyDescription` is quite simple to understand, though how to access the groups of devices must be clarified.

The last parameter of `PropertyDescription` constructor is the type of the data to display in the UI. It can be:

* `PropertyType.TEXT`

* `PropertyType.PASSWORD`

* `PropertyType.INTEGER`

* `PropertyType.NUMBER`

* `PropertyType.DATETIME`

* `PropertyType.BOOLEAN`

* `PropertyType.LIST`

The `PropertyType.LIST` type is the one that will be used to create a `select` element in the UI which options list will be created by calling the URL given by the `url` parameter passed to the `PropertyDescription` constructor.

For example, if URL is `/clusters`, you'll have to create a REST resource that serves this URI and should look like this:

```
@RestController
public class KerlinkRestController {

	@PostMapping(value = "/clusters", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<ClusterDto> getClusters(@RequestBody Properties properties) {
		return new KerlinkConnector(properties).getClusters();
	}

}
````

Your LNSConnector implementation must expose a constructor that takes a `java.util.Properties` parameter.
If you're extending from LNSAbstractConnector your just have to call the super constructor like this:

```
	public KerlinkConnector(Properties properties) {
		super(properties);
	}
```

This allows to create a temporary connector to access the LNS API.
