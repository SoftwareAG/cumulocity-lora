package lora.rest;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.codec.DeviceCodec;
import lora.codec.Result;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.Decode;

@RestController
public class CodecRestController {
    
    @Autowired
    private DeviceCodec deviceCodec;

    final Logger logger = LoggerFactory.getLogger(CodecRestController.class);

    @PostMapping(value = "/encode", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Result<DownlinkData> encode(@RequestBody Encode encode) {
    	logger.info("Will encode {} with codec {}", encode.getOperation(), deviceCodec.getName());
        return deviceCodec.encode(encode);
    }

    @PostMapping(value = "/decode", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Result<String> decode(@RequestBody Decode decode) {
    	logger.info("Will decode {} with codec {}", decode.getPayload(), deviceCodec.getName());
        return deviceCodec.decode(decode);
    }
    
    @GetMapping(value = "/models", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getModels() {
    	return deviceCodec.getModels();
    }
    
    @GetMapping(value = "/operations/{model}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, DeviceOperation> getOperations(@PathVariable String model) {
    	return deviceCodec.getAvailableOperations(model);
    }
}
