package lora.ns.liveobjects.rest.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class ActionPolicy {
    @JsonInclude(Include.NON_NULL)
    String id;
    String name;
    Boolean enabled = true;
    ActionTriggers triggers;
    Actions actions;
}
