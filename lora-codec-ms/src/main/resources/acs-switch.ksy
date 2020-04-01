meta:
  id: acs_witch
  endian: be
  license: CC0-1.0
seq:
  - id: header
    type: u1
  - id: body
    type:
      switch-on: header
      cases:
        0x42: presence_v1
        #0x62: presence_v2
        #0x40: alarm_v1
        #0x41: alarm_still_active_v1
        #0x60: alarm_v2
        #0x61: alarm_still_active_v2
types:
  presence_v1:
    seq:
      - id: timestamp
        type: u4
      - id: event_source
        type: u1
        enum: event_enum
      - id: state
        type: u1
        enum: state_enum
      - id: active_counter
        type: u4
      - id: inactive_counter
        type: u4
      - id: activity_percentage
        type: u1
      - id: temperature_raw
        type: u2
    instances:
      temperature:
        value: temperature_raw / 256.0
      battery:
        value: 100 - activity_percentage
enums:
  event_enum:
    0x00: internal_reed
    0x01: external_reed
    0x03: mems
    0x04: external_motion_sensor
    0x05: tof
    0xFF: temperature_sensor
  state_enum:
    0x00: inactive
    0x01: active