package lora.ns.generic;

import lombok.Data;

@Data
public class UplinkEvent {
    private String deveui;
    private String payload;
    private Long time;
    private int fport;
}
