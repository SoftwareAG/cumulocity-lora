package lora.ns.gateway;

import java.math.BigDecimal;
import java.util.Properties;

import c8y.ConnectionState;
import lombok.Data;

@Data
public class GatewayProvisioning {
    private String gwEUI;
    private String name;
    private String serial;
    private BigDecimal lat;
    private BigDecimal lng;
    private String type;
    private ConnectionState status;
    private Properties additionalProperties;
}
