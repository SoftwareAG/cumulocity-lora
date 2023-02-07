package lora.ns.gateway;

import java.math.BigDecimal;

import c8y.ConnectionState;
import lora.codec.uplink.C8YData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gateway {
    private String gwEUI;
    private String serial;
    private String name;
    private BigDecimal lat;
    private BigDecimal lng;
    private String type;
    private ConnectionState status;
    private C8YData data;
}