package lora.codec.acsswitch;

import java.util.HashMap;
import java.util.Map;

import io.kaitai.struct.KaitaiStream;
import io.kaitai.struct.KaitaiStruct;

public class AcsSwitch extends KaitaiStruct {
    public enum EventEnum {
        INTERNAL_REED(0),
        EXTERNAL_REED(1),
        MEMS(3),
        EXTERNAL_MOTION_SENSOR(4),
        TOF(5),
        TEMPERATURE_SENSOR(255);

        private final long id;
        EventEnum(long id) { this.id = id; }
        public long id() { return id; }
        private static final Map<Long, EventEnum> byId = new HashMap<Long, EventEnum>(6);
        static {
            for (EventEnum e : EventEnum.values())
                byId.put(e.id(), e);
        }
        public static EventEnum byId(long id) { return byId.get(id); }
    }

    public enum StateEnum {
        INACTIVE(0),
        ACTIVE(1);

        private final long id;
        StateEnum(long id) { this.id = id; }
        public long id() { return id; }
        private static final Map<Long, StateEnum> byId = new HashMap<Long, StateEnum>(2);
        static {
            for (StateEnum e : StateEnum.values())
                byId.put(e.id(), e);
        }
        public static StateEnum byId(long id) { return byId.get(id); }
    }

    public AcsSwitch(KaitaiStream _io) {
        super(_io);
        this._root = this;
        _read();
    }

    public AcsSwitch(KaitaiStream _io, KaitaiStruct _parent) {
        super(_io);
        this._parent = _parent;
        this._root = this;
        _read();
    }

    public AcsSwitch(KaitaiStream _io, KaitaiStruct _parent, AcsSwitch _root) {
        super(_io);
        this._parent = _parent;
        this._root = _root;
        _read();
    }
    private void _read() {
        this.header = this._io.readU1();
        switch (header()) {
        case 66: {
            this.body = new PresenceV1(this._io, this, _root);
            break;
        }
        case 98: {
            this.body = new PresenceV2(this._io, this, _root);
            break;
        }
        }
    }
    public static class PresenceV1 extends KaitaiStruct {
        public PresenceV1(KaitaiStream _io) {
            super(_io);
            _read();
        }

        public PresenceV1(KaitaiStream _io, AcsSwitch _parent) {
            super(_io);
            this._parent = _parent;
            _read();
        }

        public PresenceV1(KaitaiStream _io, AcsSwitch _parent, AcsSwitch _root) {
            super(_io);
            this._parent = _parent;
            this._root = _root;
            _read();
        }
        private void _read() {
            this.timestamp = this._io.readU4be();
            this.eventSource = AcsSwitch.EventEnum.byId(this._io.readU1());
            this.state = AcsSwitch.StateEnum.byId(this._io.readU1());
            this.activeCounter = this._io.readU4be();
            this.inactiveCounter = this._io.readU4be();
            this.activityPercentage = this._io.readU1();
            this.temperatureRaw = this._io.readU2be();
        }
        private Double temperature;
        public Double temperature() {
            if (this.temperature != null)
                return this.temperature;
            double _tmp = (double) ((temperatureRaw() / 256.0));
            this.temperature = _tmp;
            return this.temperature;
        }
        private Integer battery;
        public Integer battery() {
            if (this.battery != null)
                return this.battery;
            int _tmp = (int) ((100 - activityPercentage()));
            this.battery = _tmp;
            return this.battery;
        }
        private long timestamp;
        private EventEnum eventSource;
        private StateEnum state;
        private long activeCounter;
        private long inactiveCounter;
        private int activityPercentage;
        private int temperatureRaw;
        private AcsSwitch _root;
        private AcsSwitch _parent;
        public long timestamp() { return timestamp; }
        public EventEnum eventSource() { return eventSource; }
        public StateEnum state() { return state; }
        public long activeCounter() { return activeCounter; }
        public long inactiveCounter() { return inactiveCounter; }
        public int activityPercentage() { return activityPercentage; }
        public int temperatureRaw() { return temperatureRaw; }
        public AcsSwitch _root() { return _root; }
        public AcsSwitch _parent() { return _parent; }
    }
    public static class PresenceV2 extends KaitaiStruct {
        public PresenceV2(KaitaiStream _io) {
            super(_io);
            _read();
        }

        public PresenceV2(KaitaiStream _io, AcsSwitch _parent) {
            super(_io);
            this._parent = _parent;
            _read();
        }

        public PresenceV2(KaitaiStream _io, AcsSwitch _parent, AcsSwitch _root) {
            super(_io);
            this._parent = _parent;
            this._root = _root;
            _read();
        }
        private void _read() {
            this.timestamp = this._io.readU4be();
            this.eventSource = AcsSwitch.EventEnum.byId(this._io.readU1());
            this.sourceConfiguration = this._io.readU1();
            this.state = AcsSwitch.StateEnum.byId(this._io.readU1());
            this.activeCounter = this._io.readU4be();
            this.inactiveCounter = this._io.readU4be();
            this.activityPercentage = this._io.readU1();
            this.temperatureRaw = this._io.readU2be();
        }
        private Double temperature;
        public Double temperature() {
            if (this.temperature != null)
                return this.temperature;
            double _tmp = (double) ((temperatureRaw() / 256.0));
            this.temperature = _tmp;
            return this.temperature;
        }
        private Integer battery;
        public Integer battery() {
            if (this.battery != null)
                return this.battery;
            int _tmp = (int) ((100 - activityPercentage()));
            this.battery = _tmp;
            return this.battery;
        }
        private long timestamp;
        private EventEnum eventSource;
        private int sourceConfiguration;
        private StateEnum state;
        private long activeCounter;
        private long inactiveCounter;
        private int activityPercentage;
        private int temperatureRaw;
        private AcsSwitch _root;
        private AcsSwitch _parent;
        public long timestamp() { return timestamp; }
        public EventEnum eventSource() { return eventSource; }
        public int sourceConfiguration() { return sourceConfiguration; }
        public StateEnum state() { return state; }
        public long activeCounter() { return activeCounter; }
        public long inactiveCounter() { return inactiveCounter; }
        public int activityPercentage() { return activityPercentage; }
        public int temperatureRaw() { return temperatureRaw; }
        public AcsSwitch _root() { return _root; }
        public AcsSwitch _parent() { return _parent; }
    }
    private int header;
    private KaitaiStruct body;
    private AcsSwitch _root;
    private KaitaiStruct _parent;
    public int header() { return header; }
    public KaitaiStruct body() { return body; }
    public AcsSwitch _root() { return _root; }
    public KaitaiStruct _parent() { return _parent; }
}
