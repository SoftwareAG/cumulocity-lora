from datetime import datetime
from c8y_ms_sdk.sdk import ManagedObject
from typing import List
from dataclasses import dataclass
from dataclasses_json import dataclass_json


class C8YData:
    measurements = []
    events = []
    alarms = []
    alarms_to_clear: List[str] = []
    mor_to_update: ManagedObject | None = None


@dataclass_json
@dataclass
class Decode:
    deveui: str
    fPort: int
    payload: str
    updateTime: int
    model: str
