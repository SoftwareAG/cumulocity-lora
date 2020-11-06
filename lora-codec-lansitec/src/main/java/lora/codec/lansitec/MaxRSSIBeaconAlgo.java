package lora.codec.lansitec;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.measurement.MeasurementCollection;
import com.cumulocity.sdk.client.measurement.MeasurementFilter;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MaxRSSIBeaconAlgo extends Algo {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public Beacon getPosition(ManagedObjectRepresentation tracker, List<Beacon> beacons) {
        Beacon beacon = null;
        ObjectMapper mapper = new ObjectMapper();
        for (Beacon newBeacon : beacons) {
            MeasurementFilter filter = new MeasurementFilter();
            String type = newBeacon.getMajor() + "-" + newBeacon.getMinor();
            filter.byFromDate(DateTime.now().minusDays(1).toDate()).bySource(tracker.getId()).byValueFragmentType(type);
            MeasurementCollection col = measurementApi.getMeasurementsByFilter(filter);
            for (MeasurementRepresentation m : col.get(3)) {
                try {
                    JsonNode rootNode = mapper.readTree(m.toJSON());
                    int rssi = rootNode.get(m.getType()).get("rssi").get("value").decimalValue().intValue();
                    logger.info("Reading RSSI {} for beacon {} - {}", rssi, newBeacon.getMajor(), newBeacon.getMinor());
                    if (rssi > newBeacon.getRssi()) {
                        newBeacon.setRssi(rssi);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
             }
            logger.info("Highest RSSI for beacon {} - {} is {}", newBeacon.getMajor(), newBeacon.getMinor(), newBeacon.getRssi());
        }

        for (Beacon newBeacon : beacons) {
            if (beacon != null) {
                if (newBeacon.getRssi() > beacon.getRssi()) {
                    beacon = newBeacon;
                }
            } else {
                beacon = newBeacon;
            }

        }
        logger.info("New beacon is {} - {} with RSSI {}", beacon.getMajor(), beacon.getMinor(), beacon.getRssi());
        return beacon;
    }

    @Override
    public String getId() {
        return "maxrssi";
    }

    @Override
    public String getLabel() {
        return "Max RSSI from last 3";
    }
    
}
