from bottle import Bottle, request
from lora_codec_interface.codec import DeviceCodec
from lora_codec_interface.uplink import Decode
from lora_codec_interface.downlink import Encode


class App:
    codec: DeviceCodec

    def __init__(self, codec: DeviceCodec):
        self.codec = codec
        app = Bottle()
        app.route("/decode", "POST", self.decode)
        app.route("/encode", "POST", self.encode)
        app.route("/models", "GET", self.get_models)
        app.route("/operations/<model>", "GET", self.get_operations)
        app.run(host="0.0.0.0", post=8080)

    def decode(self):
        decode = Decode.from_dict(request.json)
        return self.codec.decode(decode).to_dict()

    def encode(self):
        encode = Encode.from_dict(request.json)
        return self.codec.encode(encode).to_dict()

    def get_models(self):
        return self.codec.get_models()

    def get_operations(self, model: str):
        ops = self.codec.get_available_operations(model)
        for op in ops:
            ops[op] = ops[op].to_dict()

        return ops
