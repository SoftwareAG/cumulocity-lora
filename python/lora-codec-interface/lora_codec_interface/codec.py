from abc import ABC, abstractmethod
from c8y_ms_sdk.sdk import MicroserviceSubscriptionService, ManagedObject, ExternalIdentity, base_url
from lora_codec_interface.uplink import Decode, C8YData
from typing import TypeVar, Generic
from lora_codec_interface.downlink import DownlinkData, DeviceOperation, Encode
import requests
import jsons
import logging
from dataclasses import dataclass
from dataclasses_json import dataclass_json


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.basicConfig(format='%(asctime)s %(message)s')

T = TypeVar("T")


@dataclass_json
@dataclass
class Result(Generic[T]):
    success: bool
    message: str
    response: T


DEVEUI_TYPE = "LoRa devEUI"
CODEC_TYPE = "Device Codec"
CODEC_ID = "Codec ID"


class DeviceCodec(ABC):
    service: MicroserviceSubscriptionService

    @abstractmethod
    def getId(self) -> str:
        pass

    @abstractmethod
    def getName(self) -> str:
        pass

    @abstractmethod
    def getVersion(self) -> str:
        pass

    @abstractmethod
    def _decode(self, mor: ManagedObject, decode: Decode) -> C8YData:
        pass

    @abstractmethod
    def _encode(self, encode: Encode) -> DownlinkData:
        pass

    @abstractmethod
    def get_models(self) -> dict[str, str]:
        pass

    @abstractmethod
    def ask_device_config(self) -> DownlinkData:
        pass

    @abstractmethod
    def get_available_operations(self, model: str) -> dict[str, DeviceOperation]:
        pass

    def on_new_subscription(self, client):
        logger.info(f"New subscription detected: {client}")
        codec_id = self.find_external_id_with_client(
            client, self.getId(), CODEC_ID)
        if codec_id is None:
            logger.info(f"Codec {self.getName()} will be registered.")
            response = requests.post(base_url + "/inventory/managedObjects", auth=client, headers={"Accept": "application/json"}, json={"type": CODEC_TYPE, "name": self.getName(
            ), "lora_codec_DeviceCodecRepresentation": {"id": self.getId(), "name": self.getName(), "version": self.getVersion()}})
            if response.status_code == 201:
                requests.post(base_url + "/identity/globalIds/" + response.json()["id"] + "/externalIds", auth=client, json={
                              "externalId": self.getId(), "type": CODEC_ID})
        else:
            logger.info(f"Codec {self.getName()} is already registered.")

    def __init__(self):
        self.service = MicroserviceSubscriptionService()
        self.service.events.on_new_subscription += self.on_new_subscription

    def decode(self, decode: Decode) -> Result[str]:
        result: Result[str] = Result[str](
            success=True, message="", response="OK")
        device = self.get_device(decode.deveui)
        if device is not None:
            logger.info(f"Device {device.name} received data: {decode}")
            c8yData: C8YData = self._decode(mor=device, decode=decode)
            self.processData(device, c8yData)
            result.message = f"Successfully processed payload {decode.payload} from port {decode.fPort} for device {decode.deveui}"
        else:
            logger.info(f"Device {decode.deveui} doesn't exist.")
            result.success = False
            result.message = f"Device {decode.deveui} doesn't exist."
            result.response = 'KO'

        return result

    def encode(self, encode: Encode) -> Result[DownlinkData]:
        device = self.get_device(encode.devEui)
        data: DownlinkData = None
        logger.info(
            f"Processing operation {encode.operation} for device {encode.devEui}")

        if encode.operation.startswith("raw "):
            tokens = encode.operation.split(" ")
            data = DownlinkData(
                devEui=encode.devEui,
                fport=int(tokens[1]),
                payload=tokens[2]
            )
        elif "get config" in encode.operation:
            data = self.ask_device_config(encode.devEui)
        else:
            data = self._encode(device, encode)
            if data is not None:
                data.devEui = encode.devEui
        logger.info(f"Will send to LNS {data.payload} on port {data.fport}")
        result = Result[DownlinkData](
            success=True, message=f"Successfully processed {encode.operation} for device {encode.devEui}", response=data)
        return result

    def find_external_id_with_client(self, client, external_id: str, type: str) -> ExternalIdentity | None:
        response = requests.get(
            f"{base_url}/identity/externalIds/{type}/{external_id}", auth=client)
        if response.status_code == 200:
            return jsons.loads(response.text, cls=ExternalIdentity)
        else:
            return None

    def find_external_id(self, external_id: str, type: str) -> ExternalIdentity | None:
        return self.find_external_id_with_client(self.service.get_client(), external_id, type)

    def get_device(self, devEui: str) -> ManagedObject | None:
        external_id = self.find_external_id(devEui, DEVEUI_TYPE)
        if isinstance(external_id, ExternalIdentity):
            response = requests.get(
                f"{base_url}/inventory/managedObjects/{external_id.managedObject.id}", auth=self.service.get_client())
            if response.status_code == 200:
                return jsons.loads(response.text, cls=ManagedObject)
            else:
                return None
        else:
            return None

    def clear_alarms(self, device: ManagedObject, alarmType: str):
        response = requests.get(
            base_url + "/alarm/alarms?type=" + alarmType + "&source=" + device.id + "&status=ACTIVE", auth=self.service.get_client())
        if response.status_code == 200:
            alarms = response.json()["alarms"]
            for alarm in alarms:
                requests.put(base_url + "/alarm/alarms", auth=self.service.get_client(),
                             json={"id": alarm["id"], "status": "CLEARED"})

    def processData(self, device: ManagedObject, c8yData: C8YData):
        for m in c8yData.measurements:
            requests.post(base_url + "/measurement/measurements",
                          auth=self.service.get_client(), json=m)
        for e in c8yData.events:
            requests.post(base_url + "/event/events",
                          auth=self.service.get_client(), json=e)
        for a in c8yData.alarms:
            requests.post(base_url + "/alarm/alarms",
                          auth=self.service.get_client(), json=a)
        for ac in c8yData.alarms_to_clear:
            self.clear_alarms(device, ac)
        if c8yData.mor_to_update is not None:
            requests.put(base_url + "/inventory/managedObjects",
                         auth=self.service.get_client(), json=jsons.dump(c8yData.mor_to_update))
