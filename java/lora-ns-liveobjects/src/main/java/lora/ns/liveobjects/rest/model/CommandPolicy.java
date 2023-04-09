package lora.ns.liveobjects.rest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class CommandPolicy {
    Integer ackTimeoutInSeconds;
    Integer expirationInSeconds;
    Integer attempts;
    String ackMode = "NETWORK";
}
