package lora.codec.lansitec;

import java.util.List;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.springframework.stereotype.Component;

//@Component
public class NearestBeaconAlgo extends Algo {

    @Override
    public Beacon getPosition(ManagedObjectRepresentation tracker, List<Beacon> beacons) {
        Beacon beacon = null;
        for (Beacon newBeacon : beacons) {
            if (beacon != null) {
                if (beacon.getMajor().equals(newBeacon.getMajor()) && beacon.getMinor().equals(newBeacon.getMinor()) || newBeacon.getRssi() > beacon.getRssi()) {
                    beacon = newBeacon;
                }
            } else {
                beacon = newBeacon;
            }

        }
        return beacon;
    }

    @Override
    public String getId() {
        return "nearest";
    }

    @Override
    public String getLabel() {
        return "Nearest beacon";
    }
    
}
