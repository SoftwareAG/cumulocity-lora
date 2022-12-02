package lora.ns.liveobjects.rest.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class LoraNetworkFilter {
    public static enum MessageType {
        UNCONFIRMED_DATA_UP, CONFIRMED_DATA_UP, UNCONFIRMED_DATA_DOWN, CONFIRMED_DATA_DOWN, JOIN_REQUEST, JOIN_ACCEPT;
    }

    List<MessageType> messageTypes = new ArrayList<>();
}
