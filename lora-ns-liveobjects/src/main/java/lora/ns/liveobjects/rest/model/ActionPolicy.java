package lora.ns.liveobjects.rest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class ActionPolicy {
    String id;
    String name;
    Boolean enabled = true;
    ActionTriggers triggers;
    Actions actions;
}
