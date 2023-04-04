# LoRa connectivity for Cumulocity

## Installation

Download the python script python/install.py.
Script usage is:

```
install.py [-u <username>] [-p <password>] [-h <cumulocity tenant URL>]
```

If a parameter is not provided a prompt will ask you to enter it.
The script might take a while to execute as it will download locally the UI zip and the github-proxy microservice and then install them on your tenant.

Once the script is executed just go to devicemanagement-lora application, then to lora/config menu.
From there just select the microservices you want to install on your tenant.

You'll see 2 kinds of microservices: LNS connectors, usually named lora-ns-, and codecs, usually named lora-codec-

![](config.png)

## User documentation

### Adding a new LNS connector

In devicemanagement-lora application go to menu LoRa/LoRa network servers.
Simply give a name to your connector, then select the type of LNS you want to connect to (the type you're looking for will only show up if the corresponding microservice is installed).

![](lora%20ns.png)

Ensure that le LNS you want to connect to Cumulocity is properly configured (some LNS require the creation of an API key for instance).
Once the type is selected, simply follow the wizard instructions.
Already provisioned devices will be automatically added to Cumulocity once they send data and their data are forwarded by the LNS to Cumulocity.
Example for TTN:

![](lora%20ns%20TTN.png)

And another for Chirpstack:

![](lora%20ns%20Chirpstack.png)

### Automatic device import

Once the connector is created, Cumulocity will automatically create an HTTP route in the LNS to push data from the LNS to the current Cumulocity tenant.
Moreover, all existing devices in the LNS will be automatically created in Cumulocity once they send data and data are pushed to Cumulocity through the configured HTTP route. Those devices will be created without a codec associated to them, you will therefore need to go to the device detailed view in order to choose the right codec.
Any payload sent to Cumulocity priori codec selection won't be lost: they will be stored and you will be able to process them once you have chosen the right codec.

![](lora%20device%20codec%20selection.png)

### Provisioning new LoRa devices

In devicemanagement-lora application go to menu LoRa/LoRa devices.

![](lora%20devices.png)

In order to provision the device in an LNS, you need to check the box labeled "Provision device in LoRa network server": you will then be able to choose the LNS connector related to the LNS you want to provision the device into.
Depending on the type of LNS connector you choose, different fields will appear to finalise the device provisioning in that specific LNS.

Example for TTN:

![](lora%20devices%20TTN.png)

And another for Chirpstack:

![](lora%20devices%20Chirpstack.png)

### Provisioning new gateways

In devicemanagement-lora application go to menu LoRa/LoRa gateways.

![](lora%20gateways.png)

Depending on the LNS connector you will choose, different fields will appear.

Example with TTN:

![](lora%20gateways%20TTN.png)

Another with Actility:

![](lora%20gateways%20Actility.png)

In order to be able to provision a gateway, some LNS require specific authorization. For example TTN requires a user API key, as an application API key will only allow you to manage devices in a specific application.

### Device management

LoRa devices, identified by a JSON fragment `lora_ns_device_LoRaDevice`, can be managed from a specific view accessible through the submenu "LoRa" on the device detailed view.

![](lora%20device%20view.png)

Several actions can be performed in this view:

1. Configure device codec

You can change the codec at any moment. If you select the wrong and it failed to process an incoming payload, the payload will stay in an unprocessed state and you will be able to reprocess it later.

2. Codec options

You can enable debug mode, which will generate a special event for each incoming payload that will contain the full decoded payload.

You can also choose to store the last measurements on the device itself, so you will be able to use them on specific widgets but also to add them as columns in the "all devices" table.

3. Process unprocessed payloads

Devices that are automatically imported won't have a codec configured, and payloads will be stored in an unprocessed state.
You will be able to process them once you have configured a codec.

4. Switch LNS

You can switch a device to another LNS. When doing so the device will be deprovisioned from its current LNS and provisioned to the newly selected LNS.

5. Send commands

Depending on the codec configured on the device, various commands will be available.
Most device will have a command to retrieve their current configuration. When such commands are processed by the device, an uplink containing the device configuration will be received and the configuration will be stored on the device in Cumulocity as a JSON document available in the configuration tab of the device:

![](lora%20device%20configuration.png)

You can either update the device configuration by modifying the JSON directly or by sending a command from the LoRa tab. Commands available on the LoRa tab will have their input fields prefilled with the values stored in the device configuration:

![](lora%20device%20send%20command.png)

When a command is sent it will go through the usual Cumulocity operation lifecycle:

PENDING -> EXECUTING -> SUCCESS or FAILED

The status of the operation will be updated when the LNS send a downlink update event.

Note that not all LNS support downlink update event or that it as to be switched on explicitely either on the device profile or on the LNS configuration.

### LNS events

All LNS events will be available as events on the LNS connector managed object in their raw JSON format as sent by the LNS.

![](lora%20raw%20LNS%20uplink.png)

Uplink events will also be available on the devices in a form that contains the fport, the payload in hex format, whether the payload was processed or not and other relevant information.

![](lora%20device%20raw%20payload.png)

### Codec IDE

The framework offers the ability to quickly build codec directly from Cumulocity UI with an integrated IDE based on Monaco Editor.
The IDE is accessible on LoRa/Custom codecs menu
