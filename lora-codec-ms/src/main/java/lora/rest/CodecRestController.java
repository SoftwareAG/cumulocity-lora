package lora.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.codec.Decode;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;
import lora.codec.Encode;

@RestController
public class CodecRestController {
    
    @Autowired
    private DeviceCodec deviceCodec;

    final Logger logger = LoggerFactory.getLogger(CodecRestController.class);

    @PostMapping(value = "/encode", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DownlinkData> encode(@RequestBody Encode encode) {
        return ResponseEntity.ok(deviceCodec.encode(encode));
    }

    @PostMapping(value = "/decode", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> decode(@RequestBody Decode decode) {
    	logger.info("Will decode {} with codec {}", decode.getPayload(), deviceCodec.getName());
        deviceCodec.decode(decode);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/models", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getModels() {
    	return deviceCodec.getModels();
    }
}
