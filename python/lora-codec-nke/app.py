from lora_codec_interface.uplink import C8YData, Decode
from lora_codec_interface.downlink import DownlinkData, DeviceOperation, DeviceOperationElement, ParamType, Encode
from datetime import datetime
from c8y_ms_sdk.sdk import ManagedObject
from lora_codec_interface.codec import DeviceCodec
from lora_codec_interface.app import App
import logging
from Decoding_Functions import *


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.basicConfig(format='%(asctime)s %(message)s')


class NKECodec(DeviceCodec):
    def getId(self) -> str:
        return "nke"

    def getName(self) -> str:
        return "NKE Watteco"

    def getVersion(self) -> str:
        return "1.0"

    def _decode(self, mor: ManagedObject, decode: Decode) -> C8YData:
        c8yData = C8YData()
        json_string = Decoding_JSON(decode.payload)
        logger.info(json_string)
        logger.info(datetime.fromtimestamp(decode.updateTime).isoformat())
        c8yData.measurements.append({"source": {"id": mor.id}, "type": "test", "test": {
                                    "test": {"value": 1.0, "unit": "test"}}, "time": datetime.utcfromtimestamp(decode.updateTime).isoformat()})
        return c8yData

    def _encode(self, mor: ManagedObject, encode: Encode) -> DownlinkData:
        pass

    def get_models(self) -> dict[str, str]:
        return {"model1": "Model 1"}

    def ask_device_config(self) -> DownlinkData:
        pass

    def get_available_operations(self, model: str) -> dict[str, DeviceOperation]:
        return {"op1": DeviceOperation(id="op1", name="Operation 1", elements=[DeviceOperationElement(id="attr1", name="Attribute 1", type=ParamType.STRING)])}


app = App(NKECodec())
