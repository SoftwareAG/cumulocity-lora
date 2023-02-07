package lora.codec.lansitec;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NavigableMap;
import java.util.TreeMap;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.Param;
import com.cumulocity.sdk.client.QueryParam;
import com.cumulocity.sdk.client.measurement.MeasurementCollection;
import com.cumulocity.sdk.client.measurement.MeasurementFilter;
import com.cumulocity.sdk.client.measurement.PagedMeasurementCollectionRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MaxRSSIBeaconAlgo extends Algo {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    QueryParam revertParam = new QueryParam(new Param() {
		@Override
		public String getName() {
			return "revert";
		}
	}, "true");

    @Override
    public Beacon getPosition(ManagedObjectRepresentation tracker, List<Beacon> beacons) {
        Beacon beacon = null;
        ObjectMapper mapper = new ObjectMapper();
        NavigableMap<DateTime, List<Beacon>> beaconMatrix = new TreeMap<>();
        beaconMatrix.put(DateTime.now(), beacons);
        for (Beacon newBeacon : beacons) {
            String type = newBeacon.getMajor() + "-" + newBeacon.getMinor();
            MeasurementFilter filter = new MeasurementFilter().byFromDate(DateTime.now().minusDays(1).toDate()).bySource(tracker.getId()).byValueFragmentType(type);
            MeasurementCollection col = measurementApi.getMeasurementsByFilter(filter);
            PagedMeasurementCollectionRepresentation pagedMeasurementCollectionRepresentation = col.get(2, revertParam);
            if (pagedMeasurementCollectionRepresentation.getMeasurements().size() == 0) {
                // First time we see that beacon, might be some noise
                logger.info("First time we see beacon {} - {}. Ignore it.", newBeacon.getMajor(), newBeacon.getMinor());
                beacons.remove(newBeacon);
            }
            for (MeasurementRepresentation m : pagedMeasurementCollectionRepresentation) {
                try {
                    JsonNode rootNode = mapper.readTree(m.toJSON());
                    int rssi = rootNode.get(m.getType()).get("rssi").get("value").decimalValue().intValue();
                    logger.info("Reading RSSI {} for beacon {} - {}", rssi, newBeacon.getMajor(), newBeacon.getMinor());
                    /*if (rssi > newBeacon.getRssi()) {
                        newBeacon.setRssi(rssi);
                    }*/
                    if (!beaconMatrix.containsKey(m.getDateTime())) {
                        beaconMatrix.put(m.getDateTime(), new ArrayList<>());
                    }
                    beaconMatrix.get(m.getDateTime()).add(new Beacon(newBeacon.getMajor(), newBeacon.getMinor(), rssi));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            logger.info("Highest RSSI for beacon {} - {} is {}", newBeacon.getMajor(), newBeacon.getMinor(), newBeacon.getRssi());
        }

        beaconMatrix = beaconMatrix.descendingMap();
        // Let's get the beacon with highest RSSI in the last 3 timestamps
        List<Beacon> currentLine = null;
        Iterator<List<Beacon>> lines = beaconMatrix.values().iterator();
        for (int i = 0;i<3;i++) {
            currentLine = lines.next();
            for (Beacon newBeacon : currentLine) {
                if (beacon != null) {
                    if (newBeacon.getRssi() > beacon.getRssi()) {
                        beacon = newBeacon;
                    }
                } else {
                    beacon = newBeacon;
                }
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
