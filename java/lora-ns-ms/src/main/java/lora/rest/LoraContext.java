package lora.rest;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lora.ns.connector.LNSConnector;

@Data
@RequiredArgsConstructor
public class LoraContext {
    private LNSConnector connector;
    private ManagedObjectRepresentation device;
}
