from enum import Enum
from typing import Any, List
from dataclasses import dataclass, field
from dataclasses_json import dataclass_json, Undefined


@dataclass_json
@dataclass
class Encode:
    devEui: str
    operation: str
    model: str


@dataclass_json
@dataclass
class DownlinkData:
    devEui: str
    fport: int
    payload: str


class ParamType(str, Enum):
    STRING = "STRING"
    INTEGER = "INTEGER"
    FLOAT = "FLOAT"
    BOOL = "BOOL"
    DATE = "DATE"
    ENUM = "ENUM"
    GROUP = "GROUP"


@dataclass_json
@dataclass
class DeviceOperationElement:
    id: str
    name: str
    type: ParamType
    value: Any = None
    dependsOnParamId: str = None
    dependsOnParamValue: str = None
    elements: List['DeviceOperationElement'] = field(default_factory=list)
    repeatable: bool = False
    minOccur: int = 1
    maxOccur: int = 1
    dependsOnParam: bool = False


@dataclass_json
@dataclass
class DeviceOperation:
    id: str
    name: str
    elements: List[DeviceOperationElement] = field(default_factory=list)
