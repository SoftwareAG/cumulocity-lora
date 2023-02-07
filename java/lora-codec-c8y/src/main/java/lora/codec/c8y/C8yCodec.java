package lora.codec.c8y;

import java.util.HashMap;
import java.util.Map;

import com.cumulocity.lpwan.devicetype.model.DeviceType;
import com.cumulocity.lpwan.devicetype.service.DeviceTypeMapper;
import com.cumulocity.lpwan.payload.service.PayloadDecoderService;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.inventory.InventoryFilter;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class C8yCodec extends DeviceCodec {

    @Autowired
    private PayloadDecoderService<C8yUplink> payloadDecoderService;

    @Autowired
    private DeviceTypeMapper deviceTypeMapper;

    @Override
    protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
        DeviceType deviceType = deviceTypeMapper.convertManagedObjectToDeviceType(inventoryApi.get(GId.asGId(decode.getModel())));
        payloadDecoderService.decodeAndMap(new C8yUplink(decode.getPayload(), new DateTime(decode.getUpdateTime()), decode.getDeveui(), decode.getFPort()), mor, deviceType);
        return new C8YData();
    }

    @Override
    protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public DownlinkData askDeviceConfig(String devEui) {
        // TODO Auto-generated method stub
        return null;
    }
    
    public String getId() {
        return "c8y";
    }

    public String getName() {
        return "Cumulocity Codec";
    }

    public String getVersion() {
        return "1.0";
    }

    @Override
    public Map<String, String> getModels() {
        final Map<String, String> models = new HashMap<>();
        InventoryFilter filter = new InventoryFilter().byType("c8y_LoraDeviceType");
        inventoryApi.getManagedObjectsByFilter(filter).get(2000).getManagedObjects().forEach(mo -> {
            models.put(mo.getId().getValue(), mo.getName());
        });
        return models;
    }

    @Override
    public Map<String, DeviceOperation> getAvailableOperations(String model) {
        return new HashMap<>();
    }
}
