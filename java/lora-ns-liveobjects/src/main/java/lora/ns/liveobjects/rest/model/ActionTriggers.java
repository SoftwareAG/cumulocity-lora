package lora.ns.liveobjects.rest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class ActionTriggers {
    private LoraNetworkTrigger loraNetwork;
    private CommandStatusTrigger commandStatus;
    private DataMessageTrigger dataMessage;
}
