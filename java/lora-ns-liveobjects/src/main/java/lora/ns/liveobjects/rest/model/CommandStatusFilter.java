package lora.ns.liveobjects.rest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class CommandStatusFilter {
    String[] status = new String[] { "EXPIRED", "ERROR", "PROCESSED", "CANCELED" };
}
