package lora.codec.${codecPackage};

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import c8y.Configuration;
import c8y.RequiredAvailability;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DeviceOperationElement.ParamType;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class ${codecClass} extends DeviceCodec {

    /* Don't forget to provide the list of device models and the list of operations supported by this codec */
    /* Example: */
    {
        models.put("device_model_a", "Device Model A");
        operations.put("device_model_a", new HashMap<>());
        operations.get("device_model_a").put("an_operation", new DeviceOperation("an_operation", "An operation")
            .addElement(new DeviceOperationElement("group_a", "Group A")
                .addElement(new DeviceOperationElement("param_1", "Param 1", ParamType.STRING))
                .addElement(new DeviceOperationElement("param_2", "Param 2", ParamType.INTEGER))
            )
            .addElement(new DeviceOperationElement("group_b", "Group B")
                .addElement(new DeviceOperationElement("param_1", "Param 1", ParamType.STRING))
                .addElement(new DeviceOperationElement("param_2", "Param 2", ParamType.INTEGER))
            )
        );
    }
    
	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
        C8YData c8yData = new C8YData();
        // Do your decoding stuff here
        return c8yData;
    }

    
	@Override
	public String getId() {
		return "${codecId}";
	}

	@Override
	public String getName() {
		return "${codecName}";
	}

	@Override
	public String getVersion() {
		return "${codecVersion}";
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
        DeviceOperation deviceOperation = convertJsonStringToDeviceOperation(encode.getOperation());

        DownlinkData downlinkData = new DownlinkData();
        // Encode the payload here
        return downlinkData;
    }

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return new DownlinkData(devEui, 1, "0203010202020304");
	}
}
