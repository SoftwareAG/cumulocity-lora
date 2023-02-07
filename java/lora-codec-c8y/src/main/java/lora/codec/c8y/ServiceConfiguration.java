package lora.codec.c8y;

import static com.cumulocity.lpwan.payload.service.PayloadDecoderService.messageIdFromPayload;

import com.cumulocity.lpwan.devicetype.service.DeviceTypeMapper;
import com.cumulocity.lpwan.devicetype.service.DeviceTypePayloadConfigurer;
import com.cumulocity.lpwan.payload.service.PayloadDecoderService;
import com.cumulocity.lpwan.payload.service.PayloadMappingService;
import com.cumulocity.lpwan.payload.uplink.model.MessageIdConfiguration;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfiguration {
    public static final class MessageIdReader implements PayloadDecoderService.MessageIdReader<C8yUplink> {
		@Override
		public Integer read(C8yUplink uplinkMessage, MessageIdConfiguration messageIdConfiguration) {
			String source = messageIdConfiguration.getSource();
			if (source.equals("FPORT")) {
				return uplinkMessage.getPort();
			} else if (source.equals("PAYLOAD")) {
				return messageIdFromPayload(uplinkMessage, messageIdConfiguration);
			} else {
				throw new UplinkException("Message id configuration is not valid.");
			}
		}
	}

	@Bean
	public PayloadMappingService payloadMappingService(EventApi eventApi, InventoryApi inventoryApi, AlarmApi alarmApi,
			MeasurementApi measurementApi) {
		return new PayloadMappingService(measurementApi, alarmApi, eventApi, inventoryApi);
	}

	@Bean
	public DeviceTypePayloadConfigurer deviceTypePayloadConfigurer(InventoryApi inventoryApi,
			DeviceTypeMapper deviceTypeMapper) {
		return new DeviceTypePayloadConfigurer(inventoryApi, deviceTypeMapper);
	}

	@Bean
	public PayloadDecoderService<C8yUplink> payloadDecoderService(PayloadMappingService payloadMappingService) {
		return new PayloadDecoderService<>(payloadMappingService, new MessageIdReader());
	}

    @Bean
    public DeviceTypeMapper deviceTypeMapper() {
        return new DeviceTypeMapper(new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false));
    }
}
