package lora.ns.actility.api.model.device;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonValue;

import lora.ns.actility.api.model.common.Domain;
import lora.ns.actility.api.model.common.OccContext;

/**
 * Device
 */
@JsonPropertyOrder({ Device.JSON_PROPERTY_E_U_I, Device.JSON_PROPERTY_ADMIN_LAT, Device.JSON_PROPERTY_ADMIN_LON,
        Device.JSON_PROPERTY_SUSPENSION, Device.JSON_PROPERTY_ALARM004, Device.JSON_PROPERTY_ALARM1,
        Device.JSON_PROPERTY_ALARM2, Device.JSON_PROPERTY_ALARM3, Device.JSON_PROPERTY_ALARM4,
        Device.JSON_PROPERTY_ALARM5, Device.JSON_PROPERTY_ALARM6, Device.JSON_PROPERTY_CONNECTIVITY,
        Device.JSON_PROPERTY_CREATION_DATE, Device.JSON_PROPERTY_CUSTOMER_ADMIN_DATA, Device.JSON_PROPERTY_DOMAINS,
        Device.JSON_PROPERTY_DRIVER_METADATA, Device.JSON_PROPERTY_EXCHANGE_KEY_VERSION,
        Device.JSON_PROPERTY_FIRST_UP_TIMESTAMP, Device.JSON_PROPERTY_HEALTH_STATE,
        Device.JSON_PROPERTY_HISTORY_DW_DAILY, Device.JSON_PROPERTY_HISTORY_UP_DAILY,
        Device.JSON_PROPERTY_LAST_DW_TIMESTAMP, Device.JSON_PROPERTY_LAST_UP_TIMESTAMP,
        Device.JSON_PROPERTY_LOCATION_TYPE, Device.JSON_PROPERTY_MARKER_I_D, Device.JSON_PROPERTY_MOTION_INDICATOR,
        Device.JSON_PROPERTY_NAME, Device.JSON_PROPERTY_NETWORK_SUBSCRIPTION, Device.JSON_PROPERTY_NOW,
        Device.JSON_PROPERTY_NW_ADDRESS, Device.JSON_PROPERTY_OCC_CONTEXT, Device.JSON_PROPERTY_VENDOR,
        Device.JSON_PROPERTY_LR_RS, Device.JSON_PROPERTY_LAST_GEO_RADIUS, Device.JSON_PROPERTY_LAST_GEO_TIMESTAMP,
        Device.JSON_PROPERTY_ACTIVATION, Device.JSON_PROPERTY_APP_E_U_I, Device.JSON_PROPERTY_APP_KEY,
        Device.JSON_PROPERTY_APP_KEY_ENCRYPTION_MODE, Device.JSON_PROPERTY_APP_KEYS, Device.JSON_PROPERTY_APP_SERVERS,
        Device.JSON_PROPERTY_AVG_R_S_S_I, Device.JSON_PROPERTY_AVG_S_N_R, Device.JSON_PROPERTY_CLASS_B_STATE,
        Device.JSON_PROPERTY_CURRENT_CLASS, Device.JSON_PROPERTY_DEBUG, Device.JSON_PROPERTY_HSM_APP_KEY_VERSION,
        Device.JSON_PROPERTY_HSM_NWK_KEY_VERSION, Device.JSON_PROPERTY_JOIN_SERVER,
        Device.JSON_PROPERTY_LAST_BAT_CHANGE_BY, Device.JSON_PROPERTY_LAST_BAT_CHANGED,
        Device.JSON_PROPERTY_LAST_BAT_LEVEL, Device.JSON_PROPERTY_LAST_BAT_LEVEL_TIMESTAMP,
        Device.JSON_PROPERTY_LAST_GEO_LAT, Device.JSON_PROPERTY_LAST_GEO_LON, Device.JSON_PROPERTY_LAST_INSTANT_P_E_R,
        Device.JSON_PROPERTY_LAST_MEAN_P_E_R, Device.JSON_PROPERTY_LAST_R_S_S_I, Device.JSON_PROPERTY_LAST_S_F,
        Device.JSON_PROPERTY_LAST_S_N_R, Device.JSON_PROPERTY_LAST_E_S_P, Device.JSON_PROPERTY_AVG_E_S_P,
        Device.JSON_PROPERTY_LAST_NB_TRANS, Device.JSON_PROPERTY_LAST_TX_POWER, Device.JSON_PROPERTY_MODEL,
        Device.JSON_PROPERTY_NW_KEY, Device.JSON_PROPERTY_NWK_KEY, Device.JSON_PROPERTY_NWK_S_ENC_KEY,
        Device.JSON_PROPERTY_OWNER_TOKEN, Device.JSON_PROPERTY_PAYLOAD_ENCRYPTION,
        Device.JSON_PROPERTY_PING_SLOT_PERIOD, Device.JSON_PROPERTY_S_NWK_S_INT_KEY,
        Device.JSON_PROPERTY_VERIFICATION_CODE, Device.JSON_PROPERTY_IMSI, Device.JSON_PROPERTY_KI,
        Device.JSON_PROPERTY_LAST_CELL_I_D, Device.JSON_PROPERTY_LAST_CELL_M_C_C_M_N_C,
        Device.JSON_PROPERTY_LAST_CELL_TRACKING_AREA_NUMBER, Device.JSON_PROPERTY_LAST_R_A_T,
        Device.JSON_PROPERTY_LAST_SERVING_NETWORK_M_C_C_M_N_C, Device.JSON_PROPERTY_LAST_MICROFLOW_TIMESTAMP,
        Device.JSON_PROPERTY_HISTORY_MICROFLOW_DAILY })

public class Device {
    public static final String JSON_PROPERTY_E_U_I = "EUI";
    private String EUI;

    public static final String JSON_PROPERTY_ADMIN_LAT = "adminLat";
    private Float adminLat;

    public static final String JSON_PROPERTY_ADMIN_LON = "adminLon";
    private Float adminLon;

    /**
     * Device suspension state: - NONE: The device is associated with a network
     * subscription and allowed to transmit and receive packets. -
     * SUBSCRIBER_SUSPENDED: The device has been suspended by the subscriber, all
     * its packets are ignored by the network server. The device may still be
     * associated with a network subscription. When removing the network
     * subscription from a device, the suspension state is automatically set to
     * SUBSCRIBER_SUSPENDED. When associating a suspended device with a network
     * subscription, the suspension state is automatically set to NONE.
     */
    public enum SuspensionEnum {
        NONE("NONE"),

        SUBSCRIBER_SUSPENDED("SUBSCRIBER_SUSPENDED");

        private String value;

        SuspensionEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static SuspensionEnum fromValue(String value) {
            for (SuspensionEnum b : SuspensionEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }

    public static final String JSON_PROPERTY_SUSPENSION = "suspension";
    private SuspensionEnum suspension;

    public static final String JSON_PROPERTY_ALARM004 = "alarm004";
    private String alarm004;

    public static final String JSON_PROPERTY_ALARM1 = "alarm1";
    private Integer alarm1;

    public static final String JSON_PROPERTY_ALARM2 = "alarm2";
    private Integer alarm2;

    public static final String JSON_PROPERTY_ALARM3 = "alarm3";
    private Integer alarm3;

    public static final String JSON_PROPERTY_ALARM4 = "alarm4";
    private Integer alarm4;

    public static final String JSON_PROPERTY_ALARM5 = "alarm5";
    private Integer alarm5;

    public static final String JSON_PROPERTY_ALARM6 = "alarm6";
    private Integer alarm6;

    /**
     * Device connectivity Enumerate: - &#x60;LORAWAN&#x60;: LoRaWAN connectivity -
     * &#x60;CELLULAR&#x60;: Cellular connectivity &#x60;CELLULAR&#x60; is only
     * applicable to **ThingPark Wireless** if the cellular connectivity is enabled
     * by the Operator.
     */
    public enum ConnectivityEnum {
        LORAWAN("LORAWAN"),

        CELLULAR("CELLULAR");

        private String value;

        ConnectivityEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static ConnectivityEnum fromValue(String value) {
            for (ConnectivityEnum b : ConnectivityEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }

    public static final String JSON_PROPERTY_CONNECTIVITY = "connectivity";
    protected ConnectivityEnum connectivity = ConnectivityEnum.LORAWAN;

    public static final String JSON_PROPERTY_CREATION_DATE = "creationDate";
    private Long creationDate;

    public static final String JSON_PROPERTY_CUSTOMER_ADMIN_DATA = "customerAdminData";
    private String customerAdminData;

    public static final String JSON_PROPERTY_DOMAINS = "domains";
    private List<Domain> domains = new ArrayList<>();

    public static final String JSON_PROPERTY_DRIVER_METADATA = "driverMetadata";
    private Object driverMetadata;

    public static final String JSON_PROPERTY_EXCHANGE_KEY_VERSION = "exchangeKeyVersion";
    private String exchangeKeyVersion;

    public static final String JSON_PROPERTY_FIRST_UP_TIMESTAMP = "firstUpTimestamp";
    private Long firstUpTimestamp;

    public static final String JSON_PROPERTY_HEALTH_STATE = "healthState";
    private DeviceHealthState healthState;

    public static final String JSON_PROPERTY_HISTORY_DW_DAILY = "historyDwDaily";
    private Object historyDwDaily;

    public static final String JSON_PROPERTY_HISTORY_UP_DAILY = "historyUpDaily";
    private Object historyUpDaily;

    public static final String JSON_PROPERTY_LAST_DW_TIMESTAMP = "lastDwTimestamp";
    private Long lastDwTimestamp;

    public static final String JSON_PROPERTY_LAST_UP_TIMESTAMP = "lastUpTimestamp";
    private Long lastUpTimestamp;

    public static final String JSON_PROPERTY_LOCATION_TYPE = "locationType";
    private Integer locationType;

    public static final String JSON_PROPERTY_MARKER_I_D = "markerID";
    private Integer markerID;

    /**
     * Motion indicator of the device: - NEAR_STATIC - WALKING_SPEED - BIKE_SPEED -
     * VEHICLE_SPEED - RANDOM When not set, the motion indicator of the device
     * profile is used.
     */
    public enum MotionIndicatorEnum {
        NEAR_STATIC("NEAR_STATIC"),

        WALKING_SPEED("WALKING_SPEED"),

        BIKE_SPEED("BIKE_SPEED"),

        VEHICLE_SPEED("VEHICLE_SPEED"),

        RANDOM("RANDOM");

        private String value;

        MotionIndicatorEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static MotionIndicatorEnum fromValue(String value) {
            for (MotionIndicatorEnum b : MotionIndicatorEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }

    public static final String JSON_PROPERTY_MOTION_INDICATOR = "motionIndicator";
    private MotionIndicatorEnum motionIndicator;

    public static final String JSON_PROPERTY_NAME = "name";
    private String name;

    public static final String JSON_PROPERTY_NETWORK_SUBSCRIPTION = "networkSubscription";
    private Object networkSubscription;

    public static final String JSON_PROPERTY_NOW = "now";
    private Long now;

    public static final String JSON_PROPERTY_NW_ADDRESS = "nwAddress";
    private String nwAddress;

    public static final String JSON_PROPERTY_OCC_CONTEXT = "occContext";
    private OccContext occContext;

    public static final String JSON_PROPERTY_VENDOR = "vendor";
    private Object vendor;

    public static final String JSON_PROPERTY_LR_RS = "LRRs";
    private List<DeviceLorawanLRR> lrRs = new ArrayList<>();

    public static final String JSON_PROPERTY_LAST_GEO_RADIUS = "LastGeoRadius";
    private Integer lastGeoRadius;

    public static final String JSON_PROPERTY_LAST_GEO_TIMESTAMP = "LastGeoTimestamp";
    private Long lastGeoTimestamp;

    /**
     * Type of activation associated to the device: - ABP: Activation By
     * Personalization - OTAA: Over The Air Activation **ABP**: Supported type MAC:
     * WattecoMAC_3.1, WattecoMAC_3.2 and LoRaMAC **OTAA**: Supported type MAC:
     * WattecoMAC_3.2 and LoRaMAC
     */
    public enum ActivationEnum {
        ABP("ABP"),

        OTAA("OTAA");

        private String value;

        ActivationEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static ActivationEnum fromValue(String value) {
            for (ActivationEnum b : ActivationEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }

    public static final String JSON_PROPERTY_ACTIVATION = "activation";
    private ActivationEnum activation;

    public static final String JSON_PROPERTY_APP_E_U_I = "appEUI";
    private String appEUI;

    public static final String JSON_PROPERTY_APP_KEY = "appKey";
    private String appKey;

    public static final String JSON_PROPERTY_APP_KEY_ENCRYPTION_MODE = "appKeyEncryptionMode";
    private String appKeyEncryptionMode = "LRC_CLUSTER_KEY";

    public static final String JSON_PROPERTY_APP_KEYS = "appKeys";
    private String appKeys;

    public static final String JSON_PROPERTY_APP_SERVERS = "appServers";
    private List<DeviceLorawanAppServer> appServers = new ArrayList<>();

    public static final String JSON_PROPERTY_AVG_R_S_S_I = "avgRSSI";
    private Float avgRSSI;

    public static final String JSON_PROPERTY_AVG_S_N_R = "avgSNR";
    private Float avgSNR;

    public static final String JSON_PROPERTY_CLASS_B_STATE = "classBState";
    private Integer classBState;

    /**
     * LoRaWAN class currently used by the Device
     */
    public enum CurrentClassEnum {
        A("A"),

        B("B"),

        C("C");

        private String value;

        CurrentClassEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static CurrentClassEnum fromValue(String value) {
            for (CurrentClassEnum b : CurrentClassEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }

    public static final String JSON_PROPERTY_CURRENT_CLASS = "currentClass";
    private CurrentClassEnum currentClass;

    public static final String JSON_PROPERTY_DEBUG = "debug";
    private DeviceLorawanDebug debug;

    public static final String JSON_PROPERTY_HSM_APP_KEY_VERSION = "hsmAppKeyVersion";
    private String hsmAppKeyVersion;

    public static final String JSON_PROPERTY_HSM_NWK_KEY_VERSION = "hsmNwkKeyVersion";
    private String hsmNwkKeyVersion;

    public static final String JSON_PROPERTY_JOIN_SERVER = "joinServer";
    private DeviceLorawanJoinServer joinServer;

    public static final String JSON_PROPERTY_LAST_BAT_CHANGE_BY = "lastBatChangeBy";
    private Long lastBatChangeBy;

    public static final String JSON_PROPERTY_LAST_BAT_CHANGED = "lastBatChanged";
    private Long lastBatChanged;

    public static final String JSON_PROPERTY_LAST_BAT_LEVEL = "lastBatLevel";
    private Integer lastBatLevel;

    public static final String JSON_PROPERTY_LAST_BAT_LEVEL_TIMESTAMP = "lastBatLevelTimestamp";
    private Long lastBatLevelTimestamp;

    public static final String JSON_PROPERTY_LAST_GEO_LAT = "lastGeoLat";
    private Float lastGeoLat;

    public static final String JSON_PROPERTY_LAST_GEO_LON = "lastGeoLon";
    private Float lastGeoLon;

    public static final String JSON_PROPERTY_LAST_INSTANT_P_E_R = "lastInstantPER";
    private Float lastInstantPER;

    public static final String JSON_PROPERTY_LAST_MEAN_P_E_R = "lastMeanPER";
    private Float lastMeanPER;

    public static final String JSON_PROPERTY_LAST_R_S_S_I = "lastRSSI";
    private Float lastRSSI;

    public static final String JSON_PROPERTY_LAST_S_F = "lastSF";
    private Integer lastSF;

    public static final String JSON_PROPERTY_LAST_S_N_R = "lastSNR";
    private Float lastSNR;

    public static final String JSON_PROPERTY_LAST_E_S_P = "lastESP";
    private Float lastESP;

    public static final String JSON_PROPERTY_AVG_E_S_P = "avgESP";
    private Float avgESP;

    public static final String JSON_PROPERTY_LAST_NB_TRANS = "lastNbTrans";
    private BigDecimal lastNbTrans;

    public static final String JSON_PROPERTY_LAST_TX_POWER = "lastTxPower";
    private Float lastTxPower;

    public static final String JSON_PROPERTY_MODEL = "model";
    private DeviceModel model;

    public static final String JSON_PROPERTY_NW_KEY = "nwKey";
    private String nwKey;

    public static final String JSON_PROPERTY_NWK_KEY = "nwkKey";
    private String nwkKey;

    public static final String JSON_PROPERTY_NWK_S_ENC_KEY = "nwkSEncKey";
    private String nwkSEncKey;

    public static final String JSON_PROPERTY_OWNER_TOKEN = "ownerToken";
    private String ownerToken;

    public static final String JSON_PROPERTY_PAYLOAD_ENCRYPTION = "payloadEncryption";
    private Boolean payloadEncryption;

    public static final String JSON_PROPERTY_PING_SLOT_PERIOD = "pingSlotPeriod";
    private Integer pingSlotPeriod;

    public static final String JSON_PROPERTY_S_NWK_S_INT_KEY = "sNwkSIntKey";
    private String sNwkSIntKey;

    public static final String JSON_PROPERTY_VERIFICATION_CODE = "verificationCode";
    private String verificationCode;

    public static final String JSON_PROPERTY_IMSI = "imsi";
    private String imsi;

    public static final String JSON_PROPERTY_KI = "ki";
    private String ki;

    public static final String JSON_PROPERTY_LAST_CELL_I_D = "lastCellID";
    private String lastCellID;

    public static final String JSON_PROPERTY_LAST_CELL_M_C_C_M_N_C = "lastCellMCCMNC";
    private String lastCellMCCMNC;

    public static final String JSON_PROPERTY_LAST_CELL_TRACKING_AREA_NUMBER = "lastCellTrackingAreaNumber";
    private String lastCellTrackingAreaNumber;

    public static final String JSON_PROPERTY_LAST_R_A_T = "lastRAT";
    private String lastRAT;

    public static final String JSON_PROPERTY_LAST_SERVING_NETWORK_M_C_C_M_N_C = "lastServingNetworkMCCMNC";
    private String lastServingNetworkMCCMNC;

    public static final String JSON_PROPERTY_LAST_MICROFLOW_TIMESTAMP = "lastMicroflowTimestamp";
    private Long lastMicroflowTimestamp;

    public static final String JSON_PROPERTY_HISTORY_MICROFLOW_DAILY = "historyMicroflowDaily";
    private DeviceCellularHistoryMicroflowDaily historyMicroflowDaily;

    public Device() {
    }

    @JsonCreator
    public Device(@JsonProperty(JSON_PROPERTY_ALARM1) Integer alarm1,
                    @JsonProperty(JSON_PROPERTY_ALARM2) Integer alarm2,
                    @JsonProperty(JSON_PROPERTY_ALARM3) Integer alarm3,
                    @JsonProperty(JSON_PROPERTY_ALARM4) Integer alarm4,
                    @JsonProperty(JSON_PROPERTY_ALARM5) Integer alarm5,
                    @JsonProperty(JSON_PROPERTY_ALARM6) Integer alarm6,
                    @JsonProperty(JSON_PROPERTY_CREATION_DATE) Long creationDate,
                    @JsonProperty(JSON_PROPERTY_FIRST_UP_TIMESTAMP) Long firstUpTimestamp,
                    @JsonProperty(JSON_PROPERTY_HISTORY_DW_DAILY) Object historyDwDaily,
                    @JsonProperty(JSON_PROPERTY_HISTORY_UP_DAILY) Object historyUpDaily,
                    @JsonProperty(JSON_PROPERTY_LAST_DW_TIMESTAMP) Long lastDwTimestamp,
                    @JsonProperty(JSON_PROPERTY_LAST_UP_TIMESTAMP) Long lastUpTimestamp,
                    @JsonProperty(JSON_PROPERTY_NOW) Long now, @JsonProperty(JSON_PROPERTY_VENDOR) Object vendor,
                    @JsonProperty(JSON_PROPERTY_LAST_GEO_RADIUS) Integer lastGeoRadius,
                    @JsonProperty(JSON_PROPERTY_LAST_GEO_TIMESTAMP) Long lastGeoTimestamp,
                    @JsonProperty(JSON_PROPERTY_AVG_R_S_S_I) Float avgRSSI,
                    @JsonProperty(JSON_PROPERTY_AVG_S_N_R) Float avgSNR,
                    @JsonProperty(JSON_PROPERTY_CLASS_B_STATE) Integer classBState,
                    @JsonProperty(JSON_PROPERTY_CURRENT_CLASS) CurrentClassEnum currentClass,
                    @JsonProperty(JSON_PROPERTY_LAST_BAT_CHANGE_BY) Long lastBatChangeBy,
                    @JsonProperty(JSON_PROPERTY_LAST_BAT_CHANGED) Long lastBatChanged,
                    @JsonProperty(JSON_PROPERTY_LAST_BAT_LEVEL) Integer lastBatLevel,
                    @JsonProperty(JSON_PROPERTY_LAST_BAT_LEVEL_TIMESTAMP) Long lastBatLevelTimestamp,
                    @JsonProperty(JSON_PROPERTY_LAST_GEO_LAT) Float lastGeoLat,
                    @JsonProperty(JSON_PROPERTY_LAST_GEO_LON) Float lastGeoLon,
                    @JsonProperty(JSON_PROPERTY_LAST_INSTANT_P_E_R) Float lastInstantPER,
                    @JsonProperty(JSON_PROPERTY_LAST_MEAN_P_E_R) Float lastMeanPER,
                    @JsonProperty(JSON_PROPERTY_LAST_R_S_S_I) Float lastRSSI,
                    @JsonProperty(JSON_PROPERTY_LAST_S_F) Integer lastSF,
                    @JsonProperty(JSON_PROPERTY_LAST_S_N_R) Float lastSNR,
                    @JsonProperty(JSON_PROPERTY_LAST_E_S_P) Float lastESP,
                    @JsonProperty(JSON_PROPERTY_AVG_E_S_P) Float avgESP,
                    @JsonProperty(JSON_PROPERTY_LAST_NB_TRANS) BigDecimal lastNbTrans,
                    @JsonProperty(JSON_PROPERTY_LAST_TX_POWER) Float lastTxPower,
                    @JsonProperty(JSON_PROPERTY_PAYLOAD_ENCRYPTION) Boolean payloadEncryption,
                    @JsonProperty(JSON_PROPERTY_PING_SLOT_PERIOD) Integer pingSlotPeriod,
                    @JsonProperty(JSON_PROPERTY_LAST_CELL_I_D) String lastCellID,
                    @JsonProperty(JSON_PROPERTY_LAST_CELL_M_C_C_M_N_C) String lastCellMCCMNC,
                    @JsonProperty(JSON_PROPERTY_LAST_CELL_TRACKING_AREA_NUMBER) String lastCellTrackingAreaNumber,
                    @JsonProperty(JSON_PROPERTY_LAST_R_A_T) String lastRAT,
                    @JsonProperty(JSON_PROPERTY_LAST_SERVING_NETWORK_M_C_C_M_N_C) String lastServingNetworkMCCMNC,
                    @JsonProperty(JSON_PROPERTY_LAST_MICROFLOW_TIMESTAMP) Long lastMicroflowTimestamp) {
        this();
        this.alarm1 = alarm1;
        this.alarm2 = alarm2;
        this.alarm3 = alarm3;
        this.alarm4 = alarm4;
        this.alarm5 = alarm5;
        this.alarm6 = alarm6;
        this.creationDate = creationDate;
        this.firstUpTimestamp = firstUpTimestamp;
        this.historyDwDaily = historyDwDaily;
        this.historyUpDaily = historyUpDaily;
        this.lastDwTimestamp = lastDwTimestamp;
        this.lastUpTimestamp = lastUpTimestamp;
        this.now = now;
        this.vendor = vendor;
        this.lastGeoRadius = lastGeoRadius;
        this.lastGeoTimestamp = lastGeoTimestamp;
        this.avgRSSI = avgRSSI;
        this.avgSNR = avgSNR;
        this.classBState = classBState;
        this.currentClass = currentClass;
        this.lastBatChangeBy = lastBatChangeBy;
        this.lastBatChanged = lastBatChanged;
        this.lastBatLevel = lastBatLevel;
        this.lastBatLevelTimestamp = lastBatLevelTimestamp;
        this.lastGeoLat = lastGeoLat;
        this.lastGeoLon = lastGeoLon;
        this.lastInstantPER = lastInstantPER;
        this.lastMeanPER = lastMeanPER;
        this.lastRSSI = lastRSSI;
        this.lastSF = lastSF;
        this.lastSNR = lastSNR;
        this.lastESP = lastESP;
        this.avgESP = avgESP;
        this.lastNbTrans = lastNbTrans;
        this.lastTxPower = lastTxPower;
        this.payloadEncryption = payloadEncryption;
        this.pingSlotPeriod = pingSlotPeriod;
        this.lastCellID = lastCellID;
        this.lastCellMCCMNC = lastCellMCCMNC;
        this.lastCellTrackingAreaNumber = lastCellTrackingAreaNumber;
        this.lastRAT = lastRAT;
        this.lastServingNetworkMCCMNC = lastServingNetworkMCCMNC;
        this.lastMicroflowTimestamp = lastMicroflowTimestamp;
    }

    public Device EUI(String EUI) {

        this.EUI = EUI;
        return this;
    }

    /**
     * **LoRaWAN device** DevEUI (16 hexadecimal characters / case insensitive but
     * always converted in upper case by the server) **Cellular device** IMEI
     * terminal identifier (15 or 14 digits for the creation / always 14 digits when
     * the device is retrieved) NOTE: The Luhn checksum is validate by TWA when the
     * creation is done with 15 digits. After validation the Control digits is
     * stripped (i.e. not store in TWA).
     * 
     * @return EUI
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_E_U_I)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getEUI() {
        return EUI;
    }

    @JsonProperty(JSON_PROPERTY_E_U_I)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setEUI(String EUI) {
        this.EUI = EUI;
    }

    public Device adminLat(Float adminLat) {

        this.adminLat = adminLat;
        return this;
    }

    /**
     * Manually defined LAT When provided at the creation, the manual location is
     * automatically activated, otherwise the network location is activated by
     * default.
     * 
     * @return adminLat
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_ADMIN_LAT)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getAdminLat() {
        return adminLat;
    }

    @JsonProperty(JSON_PROPERTY_ADMIN_LAT)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAdminLat(Float adminLat) {
        this.adminLat = adminLat;
    }

    public Device adminLon(Float adminLon) {

        this.adminLon = adminLon;
        return this;
    }

    /**
     * Manually defined LON When provided at the creation, the manual location is
     * automatically activated, otherwise the network location is activated by
     * default.
     * 
     * @return adminLon
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_ADMIN_LON)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getAdminLon() {
        return adminLon;
    }

    @JsonProperty(JSON_PROPERTY_ADMIN_LON)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAdminLon(Float adminLon) {
        this.adminLon = adminLon;
    }

    public Device suspension(SuspensionEnum suspension) {

        this.suspension = suspension;
        return this;
    }

    /**
     * Device suspension state: - NONE: The device is associated with a network
     * subscription and allowed to transmit and receive packets. -
     * SUBSCRIBER_SUSPENDED: The device has been suspended by the subscriber, all
     * its packets are ignored by the network server. The device may still be
     * associated with a network subscription. When removing the network
     * subscription from a device, the suspension state is automatically set to
     * SUBSCRIBER_SUSPENDED. When associating a suspended device with a network
     * subscription, the suspension state is automatically set to NONE.
     * 
     * @return suspension
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_SUSPENSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public SuspensionEnum getSuspension() {
        return suspension;
    }

    @JsonProperty(JSON_PROPERTY_SUSPENSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setSuspension(SuspensionEnum suspension) {
        this.suspension = suspension;
    }

    public Device alarm004(String alarm004) {

        this.alarm004 = alarm004;
        return this;
    }

    /**
     * Two thresholds can be configured for the alarm 004 (no uplink activity) in an
     * XML document: - The root XML element is &#x60;alarm004&#x60; - The enclosed
     * &#x60;threshold1&#x60; self-closing XML element configures the first
     * threshold of the alarm - The enclosed &#x60;threshold2&#x60; self-closing XML
     * element configures the second threshold of the alarm - For each threshold XML
     * element the following attributes are available: - &#x60;status&#x60;:
     * &#x60;ENABLE&#x60; or &#x60;DISABLE&#x60; this threshold - &#x60;level&#x60;:
     * severity (2-6) of the alarm for this threshold - &#x60;duration&#x60;:
     * inactivity period (RFC 3339 duration between &#x60;PT1H&#x60; and
     * &#x60;P30D&#x60;) after which the alarm is triggered for this threshold - The
     * following constraints must be satisfied: - &#x60;threshold2@status&#x60; can
     * be set to &#x60;ENABLE&#x60; only if &#x60;threshold1@status&#x60; is
     * &#x60;ENABLE&#x60; - &#x60;threshold1@level&#x60; must be lower than
     * &#x60;threshold2@level&#x60; - &#x60;threshold1@duration&#x60; must be lower
     * than &#x60;threshold2@duration&#x60;
     * 
     * @return alarm004
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_ALARM004)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getAlarm004() {
        return alarm004;
    }

    @JsonProperty(JSON_PROPERTY_ALARM004)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAlarm004(String alarm004) {
        this.alarm004 = alarm004;
    }

    /**
     * Number of CLEARED alarms not ACKED
     * 
     * @return alarm1
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM1)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm1() {
        return alarm1;
    }

    /**
     * Number of INDETERMINATE alarms not ACKED
     * 
     * @return alarm2
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM2)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm2() {
        return alarm2;
    }

    /**
     * Number of WARNING alarms not ACKED
     * 
     * @return alarm3
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM3)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm3() {
        return alarm3;
    }

    /**
     * Number of MINOR alarms not ACKED
     * 
     * @return alarm4
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM4)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm4() {
        return alarm4;
    }

    /**
     * Number of MAJOR alarms not ACKED
     * 
     * @return alarm5
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM5)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm5() {
        return alarm5;
    }

    /**
     * Number of CRITICAL alarms not ACKED
     * 
     * @return alarm6
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_ALARM6)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getAlarm6() {
        return alarm6;
    }

    public Device connectivity(ConnectivityEnum connectivity) {

        this.connectivity = connectivity;
        return this;
    }

    /**
     * Device connectivity Enumerate: - &#x60;LORAWAN&#x60;: LoRaWAN connectivity -
     * &#x60;CELLULAR&#x60;: Cellular connectivity &#x60;CELLULAR&#x60; is only
     * applicable to **ThingPark Wireless** if the cellular connectivity is enabled
     * by the Operator.
     * 
     * @return connectivity
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_CONNECTIVITY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public ConnectivityEnum getConnectivity() {
        return connectivity;
    }

    @JsonProperty(JSON_PROPERTY_CONNECTIVITY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setConnectivity(ConnectivityEnum connectivity) {
        this.connectivity = connectivity;
    }

    /**
     * Epoch time in milliseconds when the device was created
     * 
     * @return creationDate
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_CREATION_DATE)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Long getCreationDate() {
        return creationDate;
    }

    public Device customerAdminData(String customerAdminData) {

        this.customerAdminData = customerAdminData;
        return this;
    }

    /**
     * Free administrative data associated to the device (e.g. floor number,
     * building, address...).
     * 
     * @return customerAdminData
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_CUSTOMER_ADMIN_DATA)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getCustomerAdminData() {
        return customerAdminData;
    }

    @JsonProperty(JSON_PROPERTY_CUSTOMER_ADMIN_DATA)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setCustomerAdminData(String customerAdminData) {
        this.customerAdminData = customerAdminData;
    }

    public Device domains(List<Domain> domains) {

        this.domains = domains;
        return this;
    }

    public Device addDomainsItem(Domain domainsItem) {
        if (this.domains == null) {
            this.domains = new ArrayList<>();
        }
        this.domains.add(domainsItem);
        return this;
    }

    /**
     * List of associated domains. The list cannot contain more than one domain for
     * a given group.
     * 
     * @return domains
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_DOMAINS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<Domain> getDomains() {
        return domains;
    }

    @JsonProperty(JSON_PROPERTY_DOMAINS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setDomains(List<Domain> domains) {
        this.domains = domains;
    }

    public Device driverMetadata(Object driverMetadata) {

        this.driverMetadata = driverMetadata;
        return this;
    }

    /**
     * ThingPark X metadata
     * 
     * @return driverMetadata
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_DRIVER_METADATA)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Object getDriverMetadata() {
        return driverMetadata;
    }

    @JsonProperty(JSON_PROPERTY_DRIVER_METADATA)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setDriverMetadata(Object driverMetadata) {
        this.driverMetadata = driverMetadata;
    }

    public Device exchangeKeyVersion(String exchangeKeyVersion) {

        this.exchangeKeyVersion = exchangeKeyVersion;
        return this;
    }

    /**
     * **LoRaWAN device (OTAA)** If the device is associated with an HSM group: -
     * HSM Exchange Key (RSA) version used to encrypt AppKey/NwkKey Else: - TWA
     * Exchange Key (RSA) version used to encrypt AppKey/NwkKey **Cellular device**
     * TWA Exchange Key (RSA) version used to encrypt Ki
     * 
     * @return exchangeKeyVersion
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_EXCHANGE_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getExchangeKeyVersion() {
        return exchangeKeyVersion;
    }

    @JsonProperty(JSON_PROPERTY_EXCHANGE_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setExchangeKeyVersion(String exchangeKeyVersion) {
        this.exchangeKeyVersion = exchangeKeyVersion;
    }

    /**
     * First contact timestamp with the ThingPark Infrastructure, epoch time in
     * milliseconds.
     * 
     * @return firstUpTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_FIRST_UP_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getFirstUpTimestamp() {
        return firstUpTimestamp;
    }

    public Device healthState(DeviceHealthState healthState) {

        this.healthState = healthState;
        return this;
    }

    /**
     * Get healthState
     * 
     * @return healthState
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_HEALTH_STATE)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public DeviceHealthState getHealthState() {
        return healthState;
    }

    @JsonProperty(JSON_PROPERTY_HEALTH_STATE)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    public void setHealthState(DeviceHealthState healthState) {
        this.healthState = healthState;
    }

    /**
     * Get historyDwDaily
     * 
     * @return historyDwDaily
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_HISTORY_DW_DAILY)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Object getHistoryDwDaily() {
        return historyDwDaily;
    }

    /**
     * Get historyUpDaily
     * 
     * @return historyUpDaily
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_HISTORY_UP_DAILY)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Object getHistoryUpDaily() {
        return historyUpDaily;
    }

    /**
     * Timestamp of the last downlink frame, epoch time in milliseconds
     * 
     * @return lastDwTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_DW_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastDwTimestamp() {
        return lastDwTimestamp;
    }

    /**
     * Timestamp of the last uplink frame, epoch time in milliseconds
     * 
     * @return lastUpTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_UP_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastUpTimestamp() {
        return lastUpTimestamp;
    }

    public Device locationType(Integer locationType) {

        this.locationType = locationType;
        return this;
    }

    /**
     * Type of location currently activated (Manual:0 or Network:1)
     * 
     * @return locationType
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LOCATION_TYPE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getLocationType() {
        return locationType;
    }

    @JsonProperty(JSON_PROPERTY_LOCATION_TYPE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setLocationType(Integer locationType) {
        this.locationType = locationType;
    }

    public Device markerID(Integer markerID) {

        this.markerID = markerID;
        return this;
    }

    /**
     * Google map marker ID. The default maker will be used when no marker are
     * specified at the creation.
     * 
     * @return markerID
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_MARKER_I_D)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getMarkerID() {
        return markerID;
    }

    @JsonProperty(JSON_PROPERTY_MARKER_I_D)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setMarkerID(Integer markerID) {
        this.markerID = markerID;
    }

    public Device motionIndicator(MotionIndicatorEnum motionIndicator) {

        this.motionIndicator = motionIndicator;
        return this;
    }

    /**
     * Motion indicator of the device: - NEAR_STATIC - WALKING_SPEED - BIKE_SPEED -
     * VEHICLE_SPEED - RANDOM When not set, the motion indicator of the device
     * profile is used.
     * 
     * @return motionIndicator
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_MOTION_INDICATOR)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public MotionIndicatorEnum getMotionIndicator() {
        return motionIndicator;
    }

    @JsonProperty(JSON_PROPERTY_MOTION_INDICATOR)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setMotionIndicator(MotionIndicatorEnum motionIndicator) {
        this.motionIndicator = motionIndicator;
    }

    public Device name(String name) {

        this.name = name;
        return this;
    }

    /**
     * The name is generated when not provided at the creation.
     * 
     * @return name
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NAME)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getName() {
        return name;
    }

    @JsonProperty(JSON_PROPERTY_NAME)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setName(String name) {
        this.name = name;
    }

    public Device networkSubscription(Object networkSubscription) {

        this.networkSubscription = networkSubscription;
        return this;
    }

    /**
     * Network subscription associated with the device The network subscription must
     * be compatible with the AS routing profile associated with the device (if any)
     * On device creation or update, the selection of the network subscription
     * depends on &#x60;networkSubscriptionsHandlingMode&#x60; query parameter: -
     * &#x60;BASIC&#x60;: the network subscription is selected based on its
     * &#x60;nwGeolocalization&#x60; and &#x60;prAllowed&#x60; values. If
     * &#x60;nwGeolocalization&#x60; and &#x60;prAllowed&#x60; are not provided, the
     * network subscription with &#x60;nwGeolocalization&#x60; and
     * &#x60;prAllowed&#x60; set to false is selected. If several network
     * subscriptions match, the network subscription with the oldest subscription
     * date is selected. Only applicable to ThingPark Enterprise. -
     * &#x60;ADVANCED&#x60;: the network subscription is selected based on its
     * &#x60;ID&#x60; value. If no &#x60;ID&#x60; is provided, the device is not
     * associated with a network subscription and automatically suspended: all its
     * packets are ignored by the network server. On device creation, the network
     * subscription is always selected as described above. On device update, the
     * network subscription is selected as described above only if the
     * &#x60;networkSubscription&#x60; property is provided. Otherwise the current
     * network subscription is kept. **Access right: Not available for update with**
     * LPWA_MGR::WRITE_NODE
     * 
     * @return networkSubscription
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NETWORK_SUBSCRIPTION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Object getNetworkSubscription() {
        return networkSubscription;
    }

    @JsonProperty(JSON_PROPERTY_NETWORK_SUBSCRIPTION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setNetworkSubscription(Object networkSubscription) {
        this.networkSubscription = networkSubscription;
    }

    /**
     * Current time of the server, epoch time in milliseconds
     * 
     * @return now
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_NOW)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Long getNow() {
        return now;
    }

    public Device nwAddress(String nwAddress) {

        this.nwAddress = nwAddress;
        return this;
    }

    /**
     * **LoRaWAN device** DevAddr (8 hexadecimal characters / case insensitive but
     * always converted in upper case by the server) Mandatory for ABP / Optional
     * for OTAA **Cellular device** Device IP address (Forbidden on Create)
     * 
     * @return nwAddress
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NW_ADDRESS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getNwAddress() {
        return nwAddress;
    }

    @JsonProperty(JSON_PROPERTY_NW_ADDRESS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setNwAddress(String nwAddress) {
        this.nwAddress = nwAddress;
    }

    public Device occContext(OccContext occContext) {

        this.occContext = occContext;
        return this;
    }

    /**
     * Get occContext
     * 
     * @return occContext
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_OCC_CONTEXT)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public OccContext getOccContext() {
        return occContext;
    }

    @JsonProperty(JSON_PROPERTY_OCC_CONTEXT)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setOccContext(OccContext occContext) {
        this.occContext = occContext;
    }

    /**
     * Get vendor
     * 
     * @return vendor
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_VENDOR)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Object getVendor() {
        return vendor;
    }

    public Device lrRs(List<DeviceLorawanLRR> lrRs) {

        this.lrRs = lrRs;
        return this;
    }

    public Device addLrRsItem(DeviceLorawanLRR lrRsItem) {
        if (this.lrRs == null) {
            this.lrRs = new ArrayList<>();
        }
        this.lrRs.add(lrRsItem);
        return this;
    }

    /**
     * Get lrRs
     * 
     * @return lrRs
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LR_RS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<DeviceLorawanLRR> getLrRs() {
        return lrRs;
    }

    @JsonProperty(JSON_PROPERTY_LR_RS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setLrRs(List<DeviceLorawanLRR> lrRs) {
        this.lrRs = lrRs;
    }

    /**
     * Get lastGeoRadius
     * 
     * @return lastGeoRadius
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_GEO_RADIUS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getLastGeoRadius() {
        return lastGeoRadius;
    }

    /**
     * Get lastGeoTimestamp
     * 
     * @return lastGeoTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_GEO_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastGeoTimestamp() {
        return lastGeoTimestamp;
    }

    public Device activation(ActivationEnum activation) {

        this.activation = activation;
        return this;
    }

    /**
     * Type of activation associated to the device: - ABP: Activation By
     * Personalization - OTAA: Over The Air Activation **ABP**: Supported type MAC:
     * WattecoMAC_3.1, WattecoMAC_3.2 and LoRaMAC **OTAA**: Supported type MAC:
     * WattecoMAC_3.2 and LoRaMAC
     * 
     * @return activation
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_ACTIVATION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public ActivationEnum getActivation() {
        return activation;
    }

    @JsonProperty(JSON_PROPERTY_ACTIVATION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setActivation(ActivationEnum activation) {
        this.activation = activation;
    }

    public Device appEUI(String appEUI) {

        this.appEUI = appEUI;
        return this;
    }

    /**
     * LoRaWAN JoinEUI/AppEUI (16 hexadecimal characters / case insensitive but
     * always converted in upper case by the server) Only applicable to OTAA
     * Devices. Mandatory if external Join Server is used, optional otherwise.
     * 
     * @return appEUI
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_APP_E_U_I)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getAppEUI() {
        return appEUI;
    }

    @JsonProperty(JSON_PROPERTY_APP_E_U_I)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAppEUI(String appEUI) {
        this.appEUI = appEUI;
    }

    public Device appKey(String appKey) {

        this.appKey = appKey;
        return this;
    }

    /**
     * LoRaWAN AppKey (OTAA) Supported encoding modes: - Clear text (hexadecimal
     * encoding) - Encrypted with HSM Application Key (AES) version specified in
     * hsmAppKeyVersion attribute (hexadecimal encoding) - Encrypted with Exchange
     * Key (RSA) version specified in exchangeKeyVersion attribute (base64 encoding)
     * **ABP**: FORBIDDEN **OTAA**: Local Join Server is used when provided,
     * External Join Server is used otherwise. Join Server mode is set at device
     * creation and cannot be updated.
     * 
     * @return appKey
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_APP_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getAppKey() {
        return appKey;
    }

    @JsonProperty(JSON_PROPERTY_APP_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public Device appKeyEncryptionMode(String appKeyEncryptionMode) {

        this.appKeyEncryptionMode = appKeyEncryptionMode;
        return this;
    }

    /**
     * Mode used to encrypt the AppKey: LRC_CLUSTER_KEY or HSM_APP_KEY **ABP**:
     * FORBIDDEN **OTAA**: OPTIONAL if Local Join Server is used (default value is
     * LRC_CLUSTER_KEY), FORBIDDEN otherwise This property must no longer be used:
     * it is useless and ignored.
     * 
     * @return appKeyEncryptionMode
     * @deprecated
     **/
    @Deprecated
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_APP_KEY_ENCRYPTION_MODE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getAppKeyEncryptionMode() {
        return appKeyEncryptionMode;
    }

    @JsonProperty(JSON_PROPERTY_APP_KEY_ENCRYPTION_MODE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAppKeyEncryptionMode(String appKeyEncryptionMode) {
        this.appKeyEncryptionMode = appKeyEncryptionMode;
    }

    public Device appKeys(String appKeys) {

        this.appKeys = appKeys;
        return this;
    }

    /**
     * LoRaWAN AppSKey (ABP) XML document - AppSKey \&quot;Port\&quot; attribute:
     * LoRaWAN ports - A port (e.g. \&quot;1\&quot;) - A list of ports (e.g.
     * \&quot;1,2,3\&quot;) - A range of ports (e.g. \&quot;10-20\&quot;) -
     * Otherwise ports (\&quot;*\&quot; wildcard) - AppSKey value: 32 hexadecimal
     * digits **ABP**: OPTIONAL Optional when the type MAC is set to LoRaMAC (port 1
     * to 255) or WattecoMAC_3.2 (only port 6). Not used otherwise. **OTAA**:
     * FORBIDDEN
     * 
     * @return appKeys
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_APP_KEYS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getAppKeys() {
        return appKeys;
    }

    @JsonProperty(JSON_PROPERTY_APP_KEYS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAppKeys(String appKeys) {
        this.appKeys = appKeys;
    }

    public Device appServers(List<DeviceLorawanAppServer> appServers) {

        this.appServers = appServers;
        return this;
    }

    public Device addAppServersItem(DeviceLorawanAppServer appServersItem) {
        if (this.appServers == null) {
            this.appServers = new ArrayList<>();
        }
        this.appServers.add(appServersItem);
        return this;
    }

    /**
     * The Application Servers list must be compatible with the network subscription
     * if any **Access right**: Not available for update with
     * &#x60;LPWA_MGR::WRITE_NODE&#x60; This attribute is FORBIDDEN if the Device is
     * associated with an AS Routing Profile If the authenticated user has domain
     * restrictions, only the following application servers can be associated with a
     * device: - Application servers not associated with any domain - Application
     * servers associated with domains and matching the domain restrictions
     * 
     * @return appServers
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_APP_SERVERS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<DeviceLorawanAppServer> getAppServers() {
        return appServers;
    }

    @JsonProperty(JSON_PROPERTY_APP_SERVERS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setAppServers(List<DeviceLorawanAppServer> appServers) {
        this.appServers = appServers;
    }

    /**
     * Average RSSI
     * 
     * @return avgRSSI
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_AVG_R_S_S_I)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Float getAvgRSSI() {
        return avgRSSI;
    }

    /**
     * Average SNR
     * 
     * @return avgSNR
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_AVG_S_N_R)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Float getAvgSNR() {
        return avgSNR;
    }

    /**
     * Class B state: Active (1), Inactive (0) Inactive (0) is returned if model
     * type is NOT class B
     * 
     * @return classBState
     **/
    @javax.annotation.Nonnull
    @JsonProperty(JSON_PROPERTY_CLASS_B_STATE)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)

    public Integer getClassBState() {
        return classBState;
    }

    /**
     * LoRaWAN class currently used by the Device
     * 
     * @return currentClass
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_CURRENT_CLASS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public CurrentClassEnum getCurrentClass() {
        return currentClass;
    }

    public Device debug(DeviceLorawanDebug debug) {

        this.debug = debug;
        return this;
    }

    /**
     * Get debug
     * 
     * @return debug
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_DEBUG)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public DeviceLorawanDebug getDebug() {
        return debug;
    }

    @JsonProperty(JSON_PROPERTY_DEBUG)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setDebug(DeviceLorawanDebug debug) {
        this.debug = debug;
    }

    public Device hsmAppKeyVersion(String hsmAppKeyVersion) {

        this.hsmAppKeyVersion = hsmAppKeyVersion;
        return this;
    }

    /**
     * HSM Application Key version used to encrypt AppKey **ABP**: FORBIDDEN
     * **OTAA**: OPTIONAL
     * 
     * @return hsmAppKeyVersion
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_HSM_APP_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getHsmAppKeyVersion() {
        return hsmAppKeyVersion;
    }

    @JsonProperty(JSON_PROPERTY_HSM_APP_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setHsmAppKeyVersion(String hsmAppKeyVersion) {
        this.hsmAppKeyVersion = hsmAppKeyVersion;
    }

    public Device hsmNwkKeyVersion(String hsmNwkKeyVersion) {

        this.hsmNwkKeyVersion = hsmNwkKeyVersion;
        return this;
    }

    /**
     * HSM Network Key version used to encrypt NwkKey **ABP**: FORBIDDEN **OTAA**:
     * OPTIONAL
     * 
     * @return hsmNwkKeyVersion
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_HSM_NWK_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getHsmNwkKeyVersion() {
        return hsmNwkKeyVersion;
    }

    @JsonProperty(JSON_PROPERTY_HSM_NWK_KEY_VERSION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setHsmNwkKeyVersion(String hsmNwkKeyVersion) {
        this.hsmNwkKeyVersion = hsmNwkKeyVersion;
    }

    public Device joinServer(DeviceLorawanJoinServer joinServer) {

        this.joinServer = joinServer;
        return this;
    }

    /**
     * Get joinServer
     * 
     * @return joinServer
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_JOIN_SERVER)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public DeviceLorawanJoinServer getJoinServer() {
        return joinServer;
    }

    @JsonProperty(JSON_PROPERTY_JOIN_SERVER)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setJoinServer(DeviceLorawanJoinServer joinServer) {
        this.joinServer = joinServer;
    }

    /**
     * Last estimated replacement date for the battery, epoch time in milliseconds
     * 
     * @return lastBatChangeBy
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_BAT_CHANGE_BY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastBatChangeBy() {
        return lastBatChangeBy;
    }

    /**
     * Last battery replacement date, epoch time in milliseconds
     * 
     * @return lastBatChanged
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_BAT_CHANGED)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastBatChanged() {
        return lastBatChanged;
    }

    /**
     * Battery level: - 0: External power source - 1..254: 1&#x3D;min / 254 &#x3D;
     * max - 255: Not able to measure the level.
     * 
     * @return lastBatLevel
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_BAT_LEVEL)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getLastBatLevel() {
        return lastBatLevel;
    }

    /**
     * Get lastBatLevelTimestamp
     * 
     * @return lastBatLevelTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_BAT_LEVEL_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastBatLevelTimestamp() {
        return lastBatLevelTimestamp;
    }

    /**
     * Network location, location radius and location timestamp
     * 
     * @return lastGeoLat
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_GEO_LAT)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastGeoLat() {
        return lastGeoLat;
    }

    /**
     * Network location, location radius and location timestamp
     * 
     * @return lastGeoLon
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_GEO_LON)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastGeoLon() {
        return lastGeoLon;
    }

    /**
     * Last instantaneous PER (Packet Error Rate) without consideration for LRRs.
     * The instantaneous PER is computed over the 2 last distinct uplink frames as
     * follows: - InstantPER &#x3D; 1 – [ 2 / (FCntUp(N) - FCntUp(N-1) + 1)], where:
     * - FCntUp(N) is the FCntUp of the last uplink frame - FCntUp(N-1) is the
     * FCntUp of the previous uplink frame (excluding repetitions) - Example: If the
     * two last received uplink frames have FCntUp 33 and 36, then InstantPER &#x3D;
     * 1 - [2/(36-33+1)] &#x3D; 0.5 &#x3D; 50% (because frames 34 &amp; 35 were
     * missing, so 4 frames expected but only 2 frames received). - A device
     * reset/rejoin resets the InstantPER to 0 minimum: 0
     * 
     * @return lastInstantPER
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_INSTANT_P_E_R)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastInstantPER() {
        return lastInstantPER;
    }

    /**
     * Last mean PER (Packet Error Rate) without consideration for LRRs. The mean
     * PER is computed over the full history of last distinct uplink frames as
     * follows: - MeanPER &#x3D; 1 - [Distinct_Pkts / (FCntUP(N) - FCntUP(M) + 1)],
     * where: - Distinct_Pkts is the number of distinct uplink frames stored in the
     * last uplink frames history (containing up to 50 uplink frames) - FCntUp(N) is
     * the FCntUp of the newest uplink frame in the last uplink frames history -
     * FCntUp(M) is the FCntUp of the oldest uplink frame in the last uplink frames
     * history - A device reset/rejoin resets the MeanPER to 0 minimum: 0
     * 
     * @return lastMeanPER
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_MEAN_P_E_R)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastMeanPER() {
        return lastMeanPER;
    }

    /**
     * Get lastRSSI
     * 
     * @return lastRSSI
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_R_S_S_I)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastRSSI() {
        return lastRSSI;
    }

    /**
     * Get lastSF
     * 
     * @return lastSF
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_S_F)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getLastSF() {
        return lastSF;
    }

    /**
     * Get lastSNR
     * 
     * @return lastSNR
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_S_N_R)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastSNR() {
        return lastSNR;
    }

    /**
     * Last ESP
     * 
     * @return lastESP
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_E_S_P)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastESP() {
        return lastESP;
    }

    /**
     * Average ESP
     * 
     * @return avgESP
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_AVG_E_S_P)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getAvgESP() {
        return avgESP;
    }

    /**
     * Last number of transmissions
     * 
     * @return lastNbTrans
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_NB_TRANS)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public BigDecimal getLastNbTrans() {
        return lastNbTrans;
    }

    /**
     * Last TX Power in dBm
     * 
     * @return lastTxPower
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_TX_POWER)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Float getLastTxPower() {
        return lastTxPower;
    }

    public Device model(DeviceModel model) {

        this.model = model;
        return this;
    }

    /**
     * Get model
     * 
     * @return model
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_MODEL)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public DeviceModel getModel() {
        return model;
    }

    @JsonProperty(JSON_PROPERTY_MODEL)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setModel(DeviceModel model) {
        this.model = model;
    }

    public Device nwKey(String nwKey) {

        this.nwKey = nwKey;
        return this;
    }

    /**
     * LoRaWAN FNwkSIntKey/NwkSKey (ABP) **ABP**: OPTIONAL Mandatory when the type
     * MAC is set to LoRaMAC or WattecoMAC_3.2 Not used otherwise. **OTAA**:
     * FORBIDDEN
     * 
     * @return nwKey
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NW_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getNwKey() {
        return nwKey;
    }

    @JsonProperty(JSON_PROPERTY_NW_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setNwKey(String nwKey) {
        this.nwKey = nwKey;
    }

    public Device nwkKey(String nwkKey) {

        this.nwkKey = nwkKey;
        return this;
    }

    /**
     * LoRaWAN NwkKey (OTAA) Supported encoding modes: - Clear text (hexadecimal
     * encoding) - Encrypted with HSM Network Key (AES) version specified in
     * hsmNwkKeyVersion attribute (hexadecimal encoding) - Encrypted with Exchange
     * Key (RSA) version specified in exchangeKeyVersion attribute (base64 encoding)
     * **ABP**: FORBIDDEN **OTAA**: MANDATORY if LoRaWAN version is 1.1 and Local
     * Join Server is used, FORBIDDEN otherwise
     * 
     * @return nwkKey
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NWK_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getNwkKey() {
        return nwkKey;
    }

    @JsonProperty(JSON_PROPERTY_NWK_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setNwkKey(String nwkKey) {
        this.nwkKey = nwkKey;
    }

    public Device nwkSEncKey(String nwkSEncKey) {

        this.nwkSEncKey = nwkSEncKey;
        return this;
    }

    /**
     * LoRaWAN NwkSEncKey (ABP) **ABP**: OPTIONAL Mandatory when the type MAC is set
     * to LoRaMAC or WattecoMAC_3.2 and LoRaWAN version is 1.1, Not used otherwise.
     * **OTAA**: FORBIDDEN
     * 
     * @return nwkSEncKey
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_NWK_S_ENC_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getNwkSEncKey() {
        return nwkSEncKey;
    }

    @JsonProperty(JSON_PROPERTY_NWK_S_ENC_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setNwkSEncKey(String nwkSEncKey) {
        this.nwkSEncKey = nwkSEncKey;
    }

    public Device ownerToken(String ownerToken) {

        this.ownerToken = ownerToken;
        return this;
    }

    /**
     * Owner token proving the ownership of the device **ABP**: FORBIDDEN **OTAA**:
     * OPTIONAL if External Join Server is used, FORBIDDEN otherwise
     * 
     * @return ownerToken
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_OWNER_TOKEN)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getOwnerToken() {
        return ownerToken;
    }

    @JsonProperty(JSON_PROPERTY_OWNER_TOKEN)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setOwnerToken(String ownerToken) {
        this.ownerToken = ownerToken;
    }

    /**
     * TRUE when payloads are reported encrypted to Application Servers
     * 
     * @return payloadEncryption
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_PAYLOAD_ENCRYPTION)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Boolean getPayloadEncryption() {
        return payloadEncryption;
    }

    /**
     * Class B ping-slot period in seconds
     * 
     * @return pingSlotPeriod
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_PING_SLOT_PERIOD)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Integer getPingSlotPeriod() {
        return pingSlotPeriod;
    }

    public Device sNwkSIntKey(String sNwkSIntKey) {

        this.sNwkSIntKey = sNwkSIntKey;
        return this;
    }

    /**
     * LoRaWAN SNwkSIntKey (ABP) **ABP**: OPTIONAL Mandatory when the type MAC is
     * set to LoRaMAC or WattecoMAC_3.2 and LoRaWAN version is 1.1, Not used
     * otherwise. **OTAA**: FORBIDDEN
     * 
     * @return sNwkSIntKey
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_S_NWK_S_INT_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getsNwkSIntKey() {
        return sNwkSIntKey;
    }

    @JsonProperty(JSON_PROPERTY_S_NWK_S_INT_KEY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setsNwkSIntKey(String sNwkSIntKey) {
        this.sNwkSIntKey = sNwkSIntKey;
    }

    public Device verificationCode(String verificationCode) {

        this.verificationCode = verificationCode;
        return this;
    }

    /**
     * Verification code associated to the DevAddr/DevEUI pair (ABP device) or
     * DevEUI (OTAA device) when the ADM validation code has been activated.
     * 
     * @return verificationCode
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_VERIFICATION_CODE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getVerificationCode() {
        return verificationCode;
    }

    @JsonProperty(JSON_PROPERTY_VERIFICATION_CODE)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Device imsi(String imsi) {

        this.imsi = imsi;
        return this;
    }

    /**
     * IMSI of the SIM card (10-15 digits) Forbidden if HSS provisioning is not
     * activated in operator settings
     * 
     * @return imsi
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_IMSI)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getImsi() {
        return imsi;
    }

    @JsonProperty(JSON_PROPERTY_IMSI)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setImsi(String imsi) {
        this.imsi = imsi;
    }

    public Device ki(String ki) {

        this.ki = ki;
        return this;
    }

    /**
     * Secret key of the SIM card Supported encoding modes: - Clear text
     * (hexadecimal encoding) - Encrypted with Exchange Key (RSA) version specified
     * in exchangeKeyVersion attribute (base64 encoding) Forbidden if HSS
     * provisioning is not activated in operator settings
     * 
     * @return ki
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_KI)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getKi() {
        return ki;
    }

    @JsonProperty(JSON_PROPERTY_KI)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setKi(String ki) {
        this.ki = ki;
    }

    /**
     * Last Cell ID
     * 
     * @return lastCellID
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_CELL_I_D)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getLastCellID() {
        return lastCellID;
    }

    /**
     * Last Cell MCC/MNC
     * 
     * @return lastCellMCCMNC
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_CELL_M_C_C_M_N_C)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getLastCellMCCMNC() {
        return lastCellMCCMNC;
    }

    /**
     * Last Cell Tracking Area Number
     * 
     * @return lastCellTrackingAreaNumber
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_CELL_TRACKING_AREA_NUMBER)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getLastCellTrackingAreaNumber() {
        return lastCellTrackingAreaNumber;
    }

    /**
     * Last Radio Access Type
     * 
     * @return lastRAT
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_R_A_T)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getLastRAT() {
        return lastRAT;
    }

    /**
     * Last Serving Network MCC/MNC
     * 
     * @return lastServingNetworkMCCMNC
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_SERVING_NETWORK_M_C_C_M_N_C)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public String getLastServingNetworkMCCMNC() {
        return lastServingNetworkMCCMNC;
    }

    /**
     * Timestamp of the last microflow event, epoch time in milliseconds
     * 
     * @return lastMicroflowTimestamp
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_LAST_MICROFLOW_TIMESTAMP)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public Long getLastMicroflowTimestamp() {
        return lastMicroflowTimestamp;
    }

    public Device historyMicroflowDaily(DeviceCellularHistoryMicroflowDaily historyMicroflowDaily) {

        this.historyMicroflowDaily = historyMicroflowDaily;
        return this;
    }

    /**
     * Get historyMicroflowDaily
     * 
     * @return historyMicroflowDaily
     **/
    @javax.annotation.Nullable
    @JsonProperty(JSON_PROPERTY_HISTORY_MICROFLOW_DAILY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public DeviceCellularHistoryMicroflowDaily getHistoryMicroflowDaily() {
        return historyMicroflowDaily;
    }

    @JsonProperty(JSON_PROPERTY_HISTORY_MICROFLOW_DAILY)
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setHistoryMicroflowDaily(DeviceCellularHistoryMicroflowDaily historyMicroflowDaily) {
        this.historyMicroflowDaily = historyMicroflowDaily;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Device device = (Device) o;
        return Objects.equals(this.EUI, device.EUI) && Objects.equals(this.adminLat, device.adminLat)
                        && Objects.equals(this.adminLon, device.adminLon)
                        && Objects.equals(this.suspension, device.suspension)
                        && Objects.equals(this.alarm004, device.alarm004) && Objects.equals(this.alarm1, device.alarm1)
                        && Objects.equals(this.alarm2, device.alarm2) && Objects.equals(this.alarm3, device.alarm3)
                        && Objects.equals(this.alarm4, device.alarm4) && Objects.equals(this.alarm5, device.alarm5)
                        && Objects.equals(this.alarm6, device.alarm6)
                        && Objects.equals(this.connectivity, device.connectivity)
                        && Objects.equals(this.creationDate, device.creationDate)
                        && Objects.equals(this.customerAdminData, device.customerAdminData)
                        && Objects.equals(this.domains, device.domains)
                        && Objects.equals(this.driverMetadata, device.driverMetadata)
                        && Objects.equals(this.exchangeKeyVersion, device.exchangeKeyVersion)
                        && Objects.equals(this.firstUpTimestamp, device.firstUpTimestamp)
                        && Objects.equals(this.healthState, device.healthState)
                        && Objects.equals(this.historyDwDaily, device.historyDwDaily)
                        && Objects.equals(this.historyUpDaily, device.historyUpDaily)
                        && Objects.equals(this.lastDwTimestamp, device.lastDwTimestamp)
                        && Objects.equals(this.lastUpTimestamp, device.lastUpTimestamp)
                        && Objects.equals(this.locationType, device.locationType)
                        && Objects.equals(this.markerID, device.markerID)
                        && Objects.equals(this.motionIndicator, device.motionIndicator)
                        && Objects.equals(this.name, device.name)
                        && Objects.equals(this.networkSubscription, device.networkSubscription)
                        && Objects.equals(this.now, device.now) && Objects.equals(this.nwAddress, device.nwAddress)
                        && Objects.equals(this.occContext, device.occContext)
                        && Objects.equals(this.vendor, device.vendor) && Objects.equals(this.lrRs, device.lrRs)
                        && Objects.equals(this.lastGeoRadius, device.lastGeoRadius)
                        && Objects.equals(this.lastGeoTimestamp, device.lastGeoTimestamp)
                        && Objects.equals(this.activation, device.activation)
                        && Objects.equals(this.appEUI, device.appEUI) && Objects.equals(this.appKey, device.appKey)
                        && Objects.equals(this.appKeyEncryptionMode, device.appKeyEncryptionMode)
                        && Objects.equals(this.appKeys, device.appKeys)
                        && Objects.equals(this.appServers, device.appServers)
                        && Objects.equals(this.avgRSSI, device.avgRSSI) && Objects.equals(this.avgSNR, device.avgSNR)
                        && Objects.equals(this.classBState, device.classBState)
                        && Objects.equals(this.currentClass, device.currentClass)
                        && Objects.equals(this.debug, device.debug)
                        && Objects.equals(this.hsmAppKeyVersion, device.hsmAppKeyVersion)
                        && Objects.equals(this.hsmNwkKeyVersion, device.hsmNwkKeyVersion)
                        && Objects.equals(this.joinServer, device.joinServer)
                        && Objects.equals(this.lastBatChangeBy, device.lastBatChangeBy)
                        && Objects.equals(this.lastBatChanged, device.lastBatChanged)
                        && Objects.equals(this.lastBatLevel, device.lastBatLevel)
                        && Objects.equals(this.lastBatLevelTimestamp, device.lastBatLevelTimestamp)
                        && Objects.equals(this.lastGeoLat, device.lastGeoLat)
                        && Objects.equals(this.lastGeoLon, device.lastGeoLon)
                        && Objects.equals(this.lastInstantPER, device.lastInstantPER)
                        && Objects.equals(this.lastMeanPER, device.lastMeanPER)
                        && Objects.equals(this.lastRSSI, device.lastRSSI) && Objects.equals(this.lastSF, device.lastSF)
                        && Objects.equals(this.lastSNR, device.lastSNR) && Objects.equals(this.lastESP, device.lastESP)
                        && Objects.equals(this.avgESP, device.avgESP)
                        && Objects.equals(this.lastNbTrans, device.lastNbTrans)
                        && Objects.equals(this.lastTxPower, device.lastTxPower)
                        && Objects.equals(this.model, device.model) && Objects.equals(this.nwKey, device.nwKey)
                        && Objects.equals(this.nwkKey, device.nwkKey)
                        && Objects.equals(this.nwkSEncKey, device.nwkSEncKey)
                        && Objects.equals(this.ownerToken, device.ownerToken)
                        && Objects.equals(this.payloadEncryption, device.payloadEncryption)
                        && Objects.equals(this.pingSlotPeriod, device.pingSlotPeriod)
                        && Objects.equals(this.sNwkSIntKey, device.sNwkSIntKey)
                        && Objects.equals(this.verificationCode, device.verificationCode)
                        && Objects.equals(this.imsi, device.imsi) && Objects.equals(this.ki, device.ki)
                        && Objects.equals(this.lastCellID, device.lastCellID)
                        && Objects.equals(this.lastCellMCCMNC, device.lastCellMCCMNC)
                        && Objects.equals(this.lastCellTrackingAreaNumber, device.lastCellTrackingAreaNumber)
                        && Objects.equals(this.lastRAT, device.lastRAT)
                        && Objects.equals(this.lastServingNetworkMCCMNC, device.lastServingNetworkMCCMNC)
                        && Objects.equals(this.lastMicroflowTimestamp, device.lastMicroflowTimestamp)
                        && Objects.equals(this.historyMicroflowDaily, device.historyMicroflowDaily);
    }

    @Override
    public int hashCode() {
        return Objects.hash(EUI, adminLat, adminLon, suspension, alarm004, alarm1, alarm2, alarm3, alarm4, alarm5,
                        alarm6, connectivity, creationDate, customerAdminData, domains, driverMetadata,
                        exchangeKeyVersion, firstUpTimestamp, healthState, historyDwDaily, historyUpDaily,
                        lastDwTimestamp, lastUpTimestamp, locationType, markerID, motionIndicator, name,
                        networkSubscription, now, nwAddress, occContext, vendor, lrRs, lastGeoRadius, lastGeoTimestamp,
                        activation, appEUI, appKey, appKeyEncryptionMode, appKeys, appServers, avgRSSI, avgSNR,
                        classBState, currentClass, debug, hsmAppKeyVersion, hsmNwkKeyVersion, joinServer,
                        lastBatChangeBy, lastBatChanged, lastBatLevel, lastBatLevelTimestamp, lastGeoLat, lastGeoLon,
                        lastInstantPER, lastMeanPER, lastRSSI, lastSF, lastSNR, lastESP, avgESP, lastNbTrans,
                        lastTxPower, model, nwKey, nwkKey, nwkSEncKey, ownerToken, payloadEncryption, pingSlotPeriod,
                        sNwkSIntKey, verificationCode, imsi, ki, lastCellID, lastCellMCCMNC, lastCellTrackingAreaNumber,
                        lastRAT, lastServingNetworkMCCMNC, lastMicroflowTimestamp, historyMicroflowDaily);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Device {\n");
        sb.append("    EUI: ").append(toIndentedString(EUI)).append("\n");
        sb.append("    adminLat: ").append(toIndentedString(adminLat)).append("\n");
        sb.append("    adminLon: ").append(toIndentedString(adminLon)).append("\n");
        sb.append("    suspension: ").append(toIndentedString(suspension)).append("\n");
        sb.append("    alarm004: ").append(toIndentedString(alarm004)).append("\n");
        sb.append("    alarm1: ").append(toIndentedString(alarm1)).append("\n");
        sb.append("    alarm2: ").append(toIndentedString(alarm2)).append("\n");
        sb.append("    alarm3: ").append(toIndentedString(alarm3)).append("\n");
        sb.append("    alarm4: ").append(toIndentedString(alarm4)).append("\n");
        sb.append("    alarm5: ").append(toIndentedString(alarm5)).append("\n");
        sb.append("    alarm6: ").append(toIndentedString(alarm6)).append("\n");
        sb.append("    connectivity: ").append(toIndentedString(connectivity)).append("\n");
        sb.append("    creationDate: ").append(toIndentedString(creationDate)).append("\n");
        sb.append("    customerAdminData: ").append(toIndentedString(customerAdminData)).append("\n");
        sb.append("    domains: ").append(toIndentedString(domains)).append("\n");
        sb.append("    driverMetadata: ").append(toIndentedString(driverMetadata)).append("\n");
        sb.append("    exchangeKeyVersion: ").append(toIndentedString(exchangeKeyVersion)).append("\n");
        sb.append("    firstUpTimestamp: ").append(toIndentedString(firstUpTimestamp)).append("\n");
        sb.append("    healthState: ").append(toIndentedString(healthState)).append("\n");
        sb.append("    historyDwDaily: ").append(toIndentedString(historyDwDaily)).append("\n");
        sb.append("    historyUpDaily: ").append(toIndentedString(historyUpDaily)).append("\n");
        sb.append("    lastDwTimestamp: ").append(toIndentedString(lastDwTimestamp)).append("\n");
        sb.append("    lastUpTimestamp: ").append(toIndentedString(lastUpTimestamp)).append("\n");
        sb.append("    locationType: ").append(toIndentedString(locationType)).append("\n");
        sb.append("    markerID: ").append(toIndentedString(markerID)).append("\n");
        sb.append("    motionIndicator: ").append(toIndentedString(motionIndicator)).append("\n");
        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    networkSubscription: ").append(toIndentedString(networkSubscription)).append("\n");
        sb.append("    now: ").append(toIndentedString(now)).append("\n");
        sb.append("    nwAddress: ").append(toIndentedString(nwAddress)).append("\n");
        sb.append("    occContext: ").append(toIndentedString(occContext)).append("\n");
        sb.append("    vendor: ").append(toIndentedString(vendor)).append("\n");
        sb.append("    lrRs: ").append(toIndentedString(lrRs)).append("\n");
        sb.append("    lastGeoRadius: ").append(toIndentedString(lastGeoRadius)).append("\n");
        sb.append("    lastGeoTimestamp: ").append(toIndentedString(lastGeoTimestamp)).append("\n");
        sb.append("    activation: ").append(toIndentedString(activation)).append("\n");
        sb.append("    appEUI: ").append(toIndentedString(appEUI)).append("\n");
        sb.append("    appKey: ").append(toIndentedString(appKey)).append("\n");
        sb.append("    appKeyEncryptionMode: ").append(toIndentedString(appKeyEncryptionMode)).append("\n");
        sb.append("    appKeys: ").append(toIndentedString(appKeys)).append("\n");
        sb.append("    appServers: ").append(toIndentedString(appServers)).append("\n");
        sb.append("    avgRSSI: ").append(toIndentedString(avgRSSI)).append("\n");
        sb.append("    avgSNR: ").append(toIndentedString(avgSNR)).append("\n");
        sb.append("    classBState: ").append(toIndentedString(classBState)).append("\n");
        sb.append("    currentClass: ").append(toIndentedString(currentClass)).append("\n");
        sb.append("    debug: ").append(toIndentedString(debug)).append("\n");
        sb.append("    hsmAppKeyVersion: ").append(toIndentedString(hsmAppKeyVersion)).append("\n");
        sb.append("    hsmNwkKeyVersion: ").append(toIndentedString(hsmNwkKeyVersion)).append("\n");
        sb.append("    joinServer: ").append(toIndentedString(joinServer)).append("\n");
        sb.append("    lastBatChangeBy: ").append(toIndentedString(lastBatChangeBy)).append("\n");
        sb.append("    lastBatChanged: ").append(toIndentedString(lastBatChanged)).append("\n");
        sb.append("    lastBatLevel: ").append(toIndentedString(lastBatLevel)).append("\n");
        sb.append("    lastBatLevelTimestamp: ").append(toIndentedString(lastBatLevelTimestamp)).append("\n");
        sb.append("    lastGeoLat: ").append(toIndentedString(lastGeoLat)).append("\n");
        sb.append("    lastGeoLon: ").append(toIndentedString(lastGeoLon)).append("\n");
        sb.append("    lastInstantPER: ").append(toIndentedString(lastInstantPER)).append("\n");
        sb.append("    lastMeanPER: ").append(toIndentedString(lastMeanPER)).append("\n");
        sb.append("    lastRSSI: ").append(toIndentedString(lastRSSI)).append("\n");
        sb.append("    lastSF: ").append(toIndentedString(lastSF)).append("\n");
        sb.append("    lastSNR: ").append(toIndentedString(lastSNR)).append("\n");
        sb.append("    lastESP: ").append(toIndentedString(lastESP)).append("\n");
        sb.append("    avgESP: ").append(toIndentedString(avgESP)).append("\n");
        sb.append("    lastNbTrans: ").append(toIndentedString(lastNbTrans)).append("\n");
        sb.append("    lastTxPower: ").append(toIndentedString(lastTxPower)).append("\n");
        sb.append("    model: ").append(toIndentedString(model)).append("\n");
        sb.append("    nwKey: ").append(toIndentedString(nwKey)).append("\n");
        sb.append("    nwkKey: ").append(toIndentedString(nwkKey)).append("\n");
        sb.append("    nwkSEncKey: ").append(toIndentedString(nwkSEncKey)).append("\n");
        sb.append("    ownerToken: ").append(toIndentedString(ownerToken)).append("\n");
        sb.append("    payloadEncryption: ").append(toIndentedString(payloadEncryption)).append("\n");
        sb.append("    pingSlotPeriod: ").append(toIndentedString(pingSlotPeriod)).append("\n");
        sb.append("    sNwkSIntKey: ").append(toIndentedString(sNwkSIntKey)).append("\n");
        sb.append("    verificationCode: ").append(toIndentedString(verificationCode)).append("\n");
        sb.append("    imsi: ").append(toIndentedString(imsi)).append("\n");
        sb.append("    ki: ").append(toIndentedString(ki)).append("\n");
        sb.append("    lastCellID: ").append(toIndentedString(lastCellID)).append("\n");
        sb.append("    lastCellMCCMNC: ").append(toIndentedString(lastCellMCCMNC)).append("\n");
        sb.append("    lastCellTrackingAreaNumber: ").append(toIndentedString(lastCellTrackingAreaNumber)).append("\n");
        sb.append("    lastRAT: ").append(toIndentedString(lastRAT)).append("\n");
        sb.append("    lastServingNetworkMCCMNC: ").append(toIndentedString(lastServingNetworkMCCMNC)).append("\n");
        sb.append("    lastMicroflowTimestamp: ").append(toIndentedString(lastMicroflowTimestamp)).append("\n");
        sb.append("    historyMicroflowDaily: ").append(toIndentedString(historyMicroflowDaily)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }

}
