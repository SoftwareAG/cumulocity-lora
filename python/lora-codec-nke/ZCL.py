# -*- coding: utf-8 -*-
from construct import *
from ZCL_FRAME import *
from WTC_CodecTools import *
from TICs import *


# Min and Max Field or more generaly Minutes or Seconds delay U16
MinOrSecU16 = BitStruct(
    "Unit" / Enum(Bit, Minutes=1, Seconds=0),
    "Value" / BitsInteger(15)
)

#### Status #####################################################
Status = Enum(Int8ub,
              OK=0x00,
              MalformedCommand=0x80,
              UnsupportedClusterCommand=0x81,
              UnsupportedGeneralCommand=0x82,
              UnsupportedAttribute=0x86,
              InvalidField=0x87,
              InvalidValue=0x88,
              InsufficientSpace=0x89,
              UnreportableAttribute=0x8c,
              BadPort=0x8d,
              FrameToShort=0x8e,
              FrameToLong=0x8f,
              UnsupportedType=0x90,
              BadMode=0x91,
              BaUnsuportedSlot=0x92,
              BadEvent=0x93,
              NotAvailableAction=0x94,
              UnsupportedOccurence=0x95,
              ReadOnly=0x96,
              BatchReportNotConfigured=0xc1,
              BatchReportNoFreeSlot=0xc2,
              BatchReportInvalidTag=0xc3,
              BatchReportDuplicateTagLabel=0xc4,
              BatchReportLabelOutOfRange=0xc5,
              BatchReportNoChange=0xc6,
              default=Pass
              )

#### DataType ###################################################
DataType = Enum(Int8ub,
                Boolean=0x10,
                General8=0x08,
                General16=0x09,
                General24=0x0A,
                General32=0x0B,
                General40=0x0C,
                General48=0x0d,
                Bitmap8=0x18,
                Bitmap16=0x19,
                UInt8=0x20,
                UInt16=0x21,
                UInt24=0x22,
                UInt32=0x23,
                Int8=0x28,
                Int16=0x29,
                Int32=0x2B,
                UInt8Enum=0x30,
                SinglePrecision=0x39,
                CharString=0x42,
                ByteString=0x41,
                LongByteString=0x43,
                StructOrderedSequence=0x4C,
                default=Pass
                )


#### Concentration specific ###################################################
_ConcentrationUnit_ = Enum(Int8ub,
                           UNIT_UNDEF=0xFF,
                           UNIT_PP10=0x01,
                           UNIT_PP100=0x02,
                           UNIT_PP1000=0x03,
                           UNIT_PPM=0x06,
                           UNIT_PPB=0x09,
                           UNIT_PPT=0x0C,
                           UNIT_PPQ=0x0F,
                           UNIT_0_500=0x80,
                           default=Error
                           )

_ConcentrationClassification_ = Enum(Int8ub,
                                     EXCELENT=0x00,
                                     GOOD=0x01,
                                     AVERAGE=0x02,
                                     BAD=0x03,
                                     VERY_BAD=0x04,
                                     UNHEALTHY=0x05,
                                     UNDEF=0xff,
                                     default=Error
                                     )

_ConcentrationCalibrationSource_ = Enum(Int8ub,
                                        UNDEF=0x00,
                                        ABC=0x01,
                                        DOWNLINK=0x02,
                                        MANUAL=0x03,
                                        ACTION=0x04,
                                        default=Error
                                        )


_ConcentrationCalibrationType_ = Enum(Int8ub,
                                      UNDEF=0x00,
                                      ACTUAL=0x01,
                                      ACTUAL_REPORTED=0x02,

                                      FRESH_AIR=0x03
                                      )

_ConcentrationCalibrationStatus_ = Enum(Int8ub,
                                        UNDEF=0x00,
                                        OK=0x01,
                                        FAILED=0x02
                                        )

_ClassificationLevelsStruct_ = Struct(
    "TopOf_EXCELENT" / Int16ub,
    "TopOf_GOOD" / Int16ub,
    "TopOf_AVERAGE" / Int16ub,
    "TopOf_BAD" / Int16ub,
    "TopOf_VERY_BAD" / Int16ub
    # Above is UNHEALTHY
)

_CalibrationStatusStruct_ = Struct(
    "TimeStampStart" / Int32ub,
    "TimeStampEnd" / Int32ub,
    "Source" / _ConcentrationCalibrationSource_,
    "Type" / _ConcentrationCalibrationType_,
    "NbTries" / Int8ub,
    "Status" / _ConcentrationCalibrationStatus_,
    "OffSet" / Int16sb,
    "StartValue" / Int16ub,
    "EndValue" / Int16ub
)


################# XYZAcceleration specific ######################
_XYZAccStatsType_ = Switch(FindFieldIndex, {
    0: Int16ub,
    1: Int16ub,
    2: Int16ub,
    3: Int16ub,
    4: Int16ub,
    5: Int16ub,
    6: Int16ub,
    7: Int16ub,
    8: Int16ub,
    9: Int16ub
})

_XYZAccStatsStruct_ = Struct(
    "NbAcq" / Int16ub,
    "MinMean" / Int16ub,
    "MinMax" / Int16ub,
    "MinDt" / Int16ub,
    "MeanMean" / Int16ub,
    "MeanMax" / Int16ub,
    "MeanDt" / Int16ub,
    "MaxMean" / Int16ub,
    "MaxMax" / Int16ub,
    "MaxDt" / Int16ub
)

_XYZAccLastType_ = Switch(FindFieldIndex, {
    0: Int32ub,
    1: Int16ub,
    2: Int16ub,
    3: Int16ub,
    4: Int16ub,
    5: Int16ub,
    6: Int16ub,
    7: Int16ub,
    8: Int16ub,
    9: Int16ub
})

_XYZAccLastStruct_ = Struct(
    "NbTriggedAcq" / Int32ub,
    "Mean_X" / Int16ub,
    "Max_X" / Int16ub,
    "Dt_X" / Int16ub,
    "Mean_Y" / Int16ub,
    "Max_Y" / Int16ub,
    "Dt_Y" / Int16ub,
    "Mean_Z" / Int16ub,
    "Max_Z" / Int16ub,
    "Dt_Z" / Int16ub
)

_XYZAccParamsStruct_ = Struct(
    "WaitFreq" / Int16ub,
    "AcqFreq" / Int16ub,
    "NewWaitDelay" / MinOrSecU16,
    "MaxAcqDuration" / Int16ub,
    "Threshold_X" / Int16ub,
    "Threshold_Y" / Int16ub,
    "Threshold_Z" / Int16ub,
    "OverThrshDt" / Int16ub,
    "UnderThrshDt" / Int16ub,
    "Range" / Int16ub,
    "FilterSmoothCoef" / Int8ub,
    "FilterGainCoef" / Int8ub,
    Embedded("WorkingModes" / BitStruct(
        "WM_SignalEachAcq" / Enum(Bit, Yes=1, No=0),
        "WM_Reserved" / BitsInteger(4),
        "WM_RstAftStdRpt_X" / Enum(Bit, Yes=1, No=0),
        "WM_RstAftStdRpt_Y" / Enum(Bit, Yes=1, No=0),
        "WM_RstAftStdRpt_Z" / Enum(Bit, Yes=1, No=0)
    ))
)

###############################################################
DataBatch = Switch(
    FindClusterID, {
        "SimpleMetering": 	Switch(
            FindAttributeID, {
                "CurrentMetering":  Switch(this.FieldIndex, {
                    0: Int24sb,
                    1: Int24sb,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub
                })
            }, default=Pass
        ),
        "PowerQuality": 	Switch(
            FindAttributeID, {
                "CurrentValues":  Switch(this.FieldIndex, {
                    0: Int16ub,
                    1: Int16ub,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub,
                    5: Int16ub,
                    6: Int16ub,
                    7: Int16ub,
                    8: Int16ub,
                    9: Int16ub,
                    10: Int16ub,
                    11: Int16ub
                })
            }, default=Pass
        ),
        "Occupancy":	Switch(
            FindAttributeID, {
                "Occupancy": Flag
            }, default=Pass
        ),
        "Temperature": Switch(
            FindAttributeID, {
                "MeasuredValue":  Int16sb
            }, default=Pass
        ),
        "Pressure": Switch(
            FindAttributeID, {
                "MeasuredValue":  Int16sb
            }, default=Pass
        ),
        "Illuminance": Switch(
            FindAttributeID, {
                "MeasuredValue":  Int16ub
            }, default=Pass
        ),
        "DifferentialPressure": Switch(
            FindAttributeID, {
                "MeasuredValue":  Int16sb,
                "MinMeasuredValue":  Int16sb,
                "MaxMeasuredValue":  Int16sb,
                "MeanMeasuredValueSinceLastReportAttribute":  Int16sb,
                "MinimalMeasuredValueSinceLastReportAttribute":  Int16sb,
                "MaximalMeasuredValueSinceLastReportAttribute":  Int16sb,
            }, default=Pass
        ),
        "RelativeHumidity": Switch(
            FindAttributeID, {
                "MeasuredValue":  Int16ub
            }, default=Pass
        ),
        "AnalogInput": Switch(
            FindAttributeID, {
                "PresentValue":  Float32b
            }, default=Pass
        ),
        "BinaryInput": Switch(
            FindAttributeID, {
                "PresentValue": Flag,
                "Count":  Int32ub
            }, default=Pass
        ),
        # "MultiStateOutput" : Switch(
        # FindAttributeID,{
        # "PresentValue" : Unsigned 8 bits integer
        # }
        # ),
        "Configuration": Switch(
            FindAttributeID, {
                "NodePowerDescriptor":  Switch(FindFieldIndex, {
                    0: Int16ub,
                    1: Int16ub,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub,
                    5: Int16ub,
                    6: Int16ub,
                })
            }, default=Pass
        ),
        # "VolumeMeter" : Switch(
        # FindAttributeID,{
        # "Volume" : signed int l32
        # }
        # ),
        "EnergyPowerMetering": Switch(
            FindAttributeID, {
                "PresentValues":  Int32ub
            }, default=Pass
        ),
        "EnergyPowerMultiMetering": Switch(
            FindAttributeID, {
                "EnergyPresentValues":  Int32sb,
                "PowerPresentValues":  Int32sb
            }, default=Pass
        ),
        "VoltageCurrentMetering": Switch(
            FindAttributeID, {
                "PresentValues":  Int16ub
            }, default=Pass
        ),
        "VoltageCurrentMultiMetering": Switch(
            FindAttributeID, {
                "PresentValues":  Int16sb
            }, default=Pass
        ),
        "Concentration":	Switch(
            FindAttributeID, {
                "MeasuredValue":     Int16ub,
                "MeasuredValueMean": Int16ub,
                "MeasuredValueMin":  Int16ub,
                "MeasuredValueMax":  Int16ub,
                "Classification":    Int8ub,
                "CalibrationStatus":    Switch(this.FieldIndex, {
                    0: Int32ub,
                    1: Int32ub,
                    2: Int8ub,
                    3: Int8ub,
                    4: Int8ub,
                    5: Int8ub,
                    6: Int16sb,
                    7: Int16ub,
                    8: Int16ub
                })
            }, default=Pass
        ),
        "TIC_CBE": TICDataBatchCBEFromFieldIndex,
        "TIC_STD": TICDataBatchSTDFromFieldIndex,
        "TIC_PMEPMI": TICDataBatchPMEPMIFromFieldIndex,
        "TIC_ICE": Switch(FindAttributeID, {
            "General": TICDataBatchICEGeneralFromFieldIndex,
            "ICEp": TICDataBatchICEpxFromFieldIndex,
            "ICEpm1": TICDataBatchICEpxFromFieldIndex
        }),
        "XYZAcceleration": 	Switch(
            FindAttributeID, {
                "Stats_X": _XYZAccStatsType_,
                "Stats_Y": _XYZAccStatsType_,
                "Stats_Z": _XYZAccStatsType_,
                "Last": _XYZAccLastType_
            }, default=Pass
        )
    }, default=Pass
)


#### Endpoint ###################################################
class EndPointAdapter(Adapter):
    # make specific EndPoint Encoding/Decoding

    def _encode(self, obj, context):
        assert ((obj >= 0) and (obj < 32))
        return (((obj & 0x07) << 4) | 0x08 | ((obj & 0x18) >> 3))

    def _decode(self, obj, context):
        # we work only on 7 bits
        return (((obj & 0x70) >> 4) | ((obj & 0x03) << 3))


EndPoint = EndPointAdapter(BitsInteger(7))

# Frame Ctrl
FrameCtrl = Embedded(BitStruct(
    "EndPoint" / EndPoint,
    "Report" / Enum(Bit, Standard=1, Batch=0),
))


#### Command ID #################################################
CommandID = Enum(Int8ub,
                 ReadAttribute=0x00,
                 ReadAttributeResponse=0x01,
                 WriteAttribute=0x02,
                 WriteAttributeResponse=0x04,
                 WriteAttributeNoResponse=0x05,
                 ConfigureReporting=0x06,
                 ConfigureReportingResponse=0x07,
                 ReadReportingConfiguration=0x08,
                 ReadReportingConfigurationResponse=0x09,
                 ReportAttributes=0x0A,
                 ReportAttributesAlarm=0x8A,
                 ClusterSpecificCommand=0x50,
                 default=Pass
                 )

#### Cluster ID #################################################
# TODO: PowerQuality      = 0x8052
ClusterID = Enum(Int16ub,
                 Basic=0x0000,
                 OnOff=0x0006,
                 SimpleMetering=0x0052,
                 PowerQuality=0x8052,
                 Occupancy=0x0406,
                 Temperature=0x0402,
                 Pressure=0x0403,
                 RelativeHumidity=0x0405,
                 AnalogInput=0x000C,
                 BinaryInput=0x000F,
                 Illuminance=0x0400,
                 MultiStateOutput=0x0013,
                 Configuration=0x0050,
                 VolumeMeter=0x8002,
                 SensO=0x8003,
                 LoRaWAN=0x8004,
                 MultiBinaryInput=0x8005,
                 SerialInterface=0x8006,
                 SerialMasterSlave=0x8007,
                 DifferentialPressure=0x8008,
                 MultiMasterSlave=0x8009,
                 EnergyPowerMultiMetering=0x8010,
                 TIC_ICE=0x0053,
                 TIC_CBE=0x0054,
                 TIC_CJE=0x0055,
                 TIC_STD=0x0056,
                 TIC_PMEPMI=0x0057,
                 EnergyPowerMetering=0x800A,
                 VoltageCurrentMetering=0x800B,
                 Concentration=0x800C,
                 VoltageCurrentMultiMetering=0x800D,
                 XYZAcceleration=0x800F,
                 default="_UNKNOWN_"
                 )


#### Attributes ID/Type (per cluster) ##############################
AttributeID = Switch(
    FindClusterID, {
        "Basic": Enum(Int16ub,
                      FirmwareVersion=0x0002,
                      KernelVersion=0x0003,
                      Manufacturer=0x0004,
                      ModelIdentifier=0x0005,
                      DateCode=0x0006,
                      LocationDescription=0x0010,
                      ApplicationName=0x8001,
                      default="_UNKNOWN_"
                      ),
        "OnOff": Enum(Int16ub,
                      State=0x0000,
                      default="_UNKNOWN_"
                      ),
        "SimpleMetering": Enum(Int16ub,
                               CurrentMetering=0x0000,
                               CurrentCalibration=0x8000,
                               default="_UNKNOWN_"
                               ),
        "PowerQuality": Enum(Int16ub,
                             CurrentValues=0x0000,
                             SagCycleThreshold=0x0001,
                             SagVoltageThreshold=0x0002,
                             OverVoltageThreshold=0x0003,
                             default="_UNKNOWN_"
                             ),
        "Occupancy": Enum(Int16ub,
                          Occupancy=0x0000,
                          OccupancyType=0x0001,
                          OccupiedToUnoccupiedDelay=0x0010,
                          UnoccupiedToOccupiedDelay=0x0011,
                          default="_UNKNOWN_"
                          ),
        "Temperature": Enum(Int16ub,
                            MeasuredValue=0x0000,
                            MinMeasuredValue=0x0001,
                            MaxMeasuredValue=0x0002,
                            default="_UNKNOWN_"
                            ),
        "Pressure": Enum(Int16ub,
                         MeasuredValue=0x0000,
                         MinMeasuredValue=0x0001,
                         MaxMeasuredValue=0x0002,
                         default="_UNKNOWN_"
                         ),
        "DifferentialPressure": Enum(Int16ub,
                                     MeasuredValue=0x0000,
                                     MinMeasuredValue=0x0001,
                                     MaxMeasuredValue=0x0002,
                                     MeasurementPeriodAttribute=0x0003,
                                     SamplePerMeasurementAttribute=0x0004,
                                     SamplePerConfirmationMeasurementAttribute=0x0005,
                                     SamplePeriodeAttribute=0x0006,
                                     MeanMeasuredValueSinceLastReportAttribute=0x0100,
                                     MinimalMeasuredValueSinceLastReportAttribute=0x0101,
                                     MaximalMeasuredValueSinceLastReportAttribute=0x0102,
                                     default="_UNKNOWN_"
                                     ),
        "RelativeHumidity": Enum(Int16ub,
                                 MeasuredValue=0x0000,
                                 MinMeasuredValue=0x0001,
                                 MaxMeasuredValue=0x0002,
                                 default="_UNKNOWN_"
                                 ),
        "AnalogInput": Enum(Int16ub,
                            PresentValue=0x0055,
                            ApplicationType=0x0100,
                            PowerDuration=0x8003,
                            default="_UNKNOWN_"
                            ),
        "BinaryInput": Enum(Int16ub,
                            PresentValue=0x0055,
                            Polarity=0x0054,
                            ApplicationType=0x0100,
                            EdgeSelection=0x0400,
                            DebouncePeriod=0x0401,
                            Count=0x0402,
                            default="_UNKNOWN_"
                            ),
        "Illuminance": Enum(Int16ub,
                            MeasuredValue=0x0000,
                            MinMeasuredValue=0x0101,
                            MaxMeasuredValue=0x0102,
                            default="_UNKNOWN_"
                            ),
        "MultiStateOutput": Enum(Int16ub,
                                 PresentValue=0x0055,
                                 NumberOfStates=0x004A,
                                 ApplicationType=0x0100,
                                 default="_UNKNOWN_"
                                 ),
        "Configuration": Enum(Int16ub,
                              Descriptor=0x0004,
                              ConfigurationMode=0x0005,
                              NodePowerDescriptor=0x0006,
                              Action0=0xff00,
                              Action1=0xff01,
                              Action2=0xff02,
                              Action3=0xff03,
                              Action4=0xff04,
                              Action5=0xff05,
                              Action6=0xff06,
                              Action7=0xff07,
                              Action8=0xff08,
                              Action9=0xff09,
                              default="_UNKNOWN_"
                              ),
        "VolumeMeter": Enum(Int16ub,
                            Volume=0x0000,
                            VolumeDisplayMode=0x0001,
                            MinFlow=0x0002,
                            MaxFlow=0x0003,
                            FlowDisplayMode=0x0004,
                            default="_UNKNOWN_"
                            ),
        "SensO": Enum(Int16ub,
                      Status=0x0000,
                      CountDownThresholds=0x0001,
                      InstallationRotation=0x0002,
                      VolumeRotation=0x0003,
                      TemperatureMeterFreeze=0x0004,
                      TemperatureMinTxOff=0x0005,
                      ParametersLeakFlow=0x0006,
                      default="_UNKNOWN_"
                      ),
        "LoRaWAN": Enum(Int16ub,
                        MessageType=0x0000,
                        NumberOfRetryIfConfirmed=0x0001,
                        ReAssociationParameters=0x0002,
                        DataRateParameters=0x0003,
                        ABPDevAddr=0x0004,
                        OTAAppEUI=0x0005,
                        default="_UNKNOWN_"
                        ),
        "MultiBinaryInput": Enum(Int16ub,
                                 PresentValues=0x0000,
                                 default="_UNKNOWN_"
                                 ),
        "SerialInterface": Enum(Int16ub,
                                Speed=0x0000,
                                DataBits=0x0001,
                                Parity=0x0002,
                                StopBits=0x0003,
                                default="_UNKNOWN_"
                                ),
        "SerialMasterSlave": Enum(Int16ub,
                                  Request=0x0000,
                                  Answer=0x0001,
                                  ApplicationType=0x0002,
                                  default="_UNKNOWN_"
                                  ),
        "MultiMasterSlave": Enum(Int16ub,
                                 PresentValue=0x0000,
                                 HeaderOption=0x0001,
                                 default="_UNKNOWN_"
                                 ),
        "TIC_ICE":    TICAttributeID,
        "TIC_CBE":    TICAttributeID,
        "TIC_CJE":    TICAttributeID,
        "TIC_STD":    TICAttributeID,
        "TIC_PMEPMI": TICAttributeID,
        "EnergyPowerMetering": Enum(Int16ub,
                                    PresentValues=0x0000,
                                    MeanPowerDelay=0x0001,
                                    EnergiesUnit=0x0002,
                                    default="_UNKNOWN_"
                                    ),
        "EnergyPowerMultiMetering": Enum(Int16sb,
                                         EnergyPresentValues=0x0000,
                                         PowerPresentValues=0x0001,
                                         MeanPowerDelay=0x0002,
                                         EnergiesUnit=0x0003,
                                         default="_UNKNOWN_"
                                         ),
        "VoltageCurrentMetering": Enum(Int16ub,
                                       PresentValues=0x0000,
                                       default="_UNKNOWN_"
                                       ),
        "VoltageCurrentMultiMetering": Enum(Int16sb,
                                            PresentValues=0x0000,
                                            default="_UNKNOWN_"
                                            ),
        "Concentration": Enum(Int16ub,
                              MeasuredValue=0x0000,
                              MeasuredValueMean=0x0100,
                              MeasuredValueMin=0x0101,
                              MeasuredValueMax=0x0102,
                              Classification=0x0001,
                              LastCalibrationStatus=0x8000,
                              Unit=0x8004,
                              MinNormalLevel=0x8008,
                              CalibrationPeriodDays=0x8009,
                              CalibrationActive=0x800A,
                              ClassificationLevels=0x8010,
                              OversamplingAverageNbPoints=0x8011,
                              HMIDisplayPeriodSeconds=0x8020,
                              HMIBuzzerPeriodSeconds=0x8031,
                              HMIBuzzerPausePeriodMinutes=0x8032,
                              HMIBuzzerClassifictionThresholdHigh=0x8033,
                              HMIBuzzerClassifictionThresholdLow=0x8034,
                              default="_UNKNOWN_"
                              ),
        "XYZAcceleration": Enum(Int16ub,
                                Last=0x0000,
                                Stats_X=0x0001,
                                Stats_Y=0x0002,
                                Stats_Z=0x0003,
                                Params=0x8000,
                                default="_UNKNOWN_"
                                )
    }, default="Bytes" / BytesTostrHexClass(Bytes(2))
)


################# ModBus ######################

ModBusAnswer = Struct(
    "SlaveID" / Int8ub,
    "FcntID" / Int8ub,
    "DataSize" / Int8ub,
    "Data" / BytesTostrHexClass(Bytes(this.DataSize))
)

DescModbusHeader = BitStruct(
    "SequenceNb" / BitsInteger(8),
    "FrameNb" / BitsInteger(3),
    "LastFrameNb" / BitsInteger(3),
    "EndPointBitField" / BitsInteger(10)
)

ModbusFieldList = Struct(
    "DescModbusHeader" / DescModbusHeader,
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0001 ==
             0x0001)), Struct("EndPoint_0" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0002 ==
             0x0002)), Struct("EndPoint_1" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0004 ==
             0x0004)), Struct("EndPoint_2" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0008 ==
             0x0008)), Struct("EndPoint_3" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0010 ==
             0x0010)), Struct("EndPoint_4" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0020 ==
             0x0020)), Struct("EndPoint_5" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0040 ==
             0x0040)), Struct("EndPoint_6" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0080 ==
             0x0080)), Struct("EndPoint_7" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0100 ==
             0x0100)), Struct("EndPoint_8" / ModBusAnswer))),
    Embedded(If(((this.DescModbusHeader.EndPointBitField & 0x0200 ==
             0x0200)), Struct("EndPoint_9" / ModBusAnswer))),
)
##########################################


#### TIC Specific ########################
# _TICdata_ Must always be associated (prepend) by a TICDataSelector Struct
_TICData_ = Switch(FindClusterID, {
    "TIC_CBE": TICDataCBEFromBitfields,
    "TIC_STD": TICDataSTDFromBitfields,
    "TIC_PMEPMI": TICDataPMEPMIFromBitfields,
    "TIC_ICE": Switch(FindAttributeID, {
        "General": TICDataICEGeneralFromBitfields,
        "ICEp": TICDataICEpFromBitfields,
        "ICEpm1": TICDataICEp1FromBitfields
    })
}, default=Error)

TICCFGReportData = Struct(
    "TICReportSelector" / TICFieldsSelector,
    "TICDataSelector" / TICFieldsSelector,
    Embedded("TICCriteriaFields" / _TICData_)
)

TICData = Struct(
    "TICDataSelector" / TICFieldsSelector,
    Embedded("TICDataFields" / _TICData_)
)


##########################################


#### Data (According to Attribute Type) ##############################
Data = Switch(
    FindAttributeType, {
        "Boolean": Flag,
        "General8": Byte,
        "General16": Bytes(2),
        "General24": Bytes(3),
        "General32": Bytes(4),
        "General40": Bytes(4),
        "General48":
        Switch(FindAttributeID, {
            "FirmwareVersion": Struct(
                "Major" / Int8ub,
                "Minor" / Int8ub,
                "Revision" / Int8ub,
                "Build" / Int24ub,
            )
        },	default="Bytes" / BytesTostrHex),

        "Bitmap8": BitStruct("b7" / BitsInteger(1), "b6" / BitsInteger(1), "b5" / BitsInteger(1), "b4" / BitsInteger(1), "b3" / BitsInteger(1), "b2" / BitsInteger(1), "b1" / BitsInteger(1), "b0" / BitsInteger(1)),
        "Bitmap16": BitStruct("b15" / BitsInteger(1), "b14" / BitsInteger(1), "b13" / BitsInteger(1), "b12" / BitsInteger(1), "b11" / BitsInteger(1), "b10" / BitsInteger(1), "b9" / BitsInteger(1), "b8" / BitsInteger(1), "b7" / BitsInteger(1), "b6" / BitsInteger(1), "b5" / BitsInteger(1), "b4" / BitsInteger(1), "b3" / BitsInteger(1), "b2" / BitsInteger(1), "b1" / BitsInteger(1), "b0" / BitsInteger(1)),
        "UInt8":
        Switch(FindClusterID, {
            "Concentration": Switch(FindAttributeID, {
                "Unit": _ConcentrationUnit_,
                "Classification": _ConcentrationClassification_
            }, default=Int8ub)
        }, default=Int8ub),
        "UInt16": Int16ub,
        "UInt24": Int24ub,
        "UInt32": Int32ub,
        "Int8": Int8sb,
        "Int16": Int16sb,
        "Int32": Int32sb,
        "UInt8Enum": Int8ub,
        "SinglePrecision": Float32b,
        "CharString":
        Struct(
            "Count" / Int8ub,
            "String" / BytesTostrHexClass(Bytes(this.Count))
        ),
        "ByteString": Prefixed(Int8ub,
                               IfStrStartWithElse(FindClusterID, "TIC_",
                                                  Switch(FindCommandID, {
                                                      "ConfigureReporting": TICCFGReportData,
                                                      "ReadReportingConfigurationResponse": TICCFGReportData
                                                  }, default=TICData),

                                                  Switch(
                                                      FindAttributeID, {
                                                          "CurrentMetering": Struct(
                                                              "ActiveEnergy" / Int24sb,
                                                              "ReactiveEnergy" / Int24sb,
                                                              "NbMinutes" / Int16ub,
                                                              "ActivePower" / Int16sb,
                                                              "ReactivePower" / Int16sb,
                                                          ),
                                                          "CurrentValues": Struct(
                                                              "Freq" / Int16ub,
                                                              "FreqMin" / Int16ub,
                                                              "FreqMax" / Int16ub,
                                                              "Vrms" / Int16ub,
                                                              "VrmsMin" / Int16ub,
                                                              "VrmsMax" / Int16ub,
                                                              "Vpeak" / Int16ub,
                                                              "VpeakMin" / Int16ub,
                                                              "VpeakMax" / Int16ub,
                                                              "OverVoltageNumber" / Int16ub,
                                                              "SagNumber" / Int16ub,
                                                              "BrownoutNumber" / Int16ub,


                                                          ),
                                                          "NodePowerDescriptor": Struct(
                                                              "CurrentPowerMode" /
                                                              Enum(
                                                                  Int8ub, ONWhenIdle=0, PeriodicallyON=1, ONOnUserEvent=2, Other=3),
                                                              "AvailablePowerSourceBitField" / Int8ub,
                                                              Embedded(If(((this.AvailablePowerSourceBitField & 0x01 == 0x01)), Struct(
                                                                  "ConstantVoltage" / Int16ub))),
                                                              Embedded(If(((this.AvailablePowerSourceBitField & 0x02 == 0x02)), Struct(
                                                                  "RechargeableBatteryVoltage" / Int16ub))),
                                                              Embedded(If(((this.AvailablePowerSourceBitField & 0x04 == 0x04)), Struct(
                                                                  "DisposableBatteryVoltage" / Int16ub))),
                                                              Embedded(If(((this.AvailablePowerSourceBitField & 0x08 == 0x08)), Struct(
                                                                  "SolarHarvestingVoltage" / Int16ub))),
                                                              Embedded(If(((this.AvailablePowerSourceBitField & 0x10 == 0x10)), Struct(
                                                                  "TicHarvestingVoltage" / Int16ub))),
                                                              "CurrentPowerSource" /
                                                              Enum(Int8ub, No=0, Constant=1, RechargeableBattery=2,
                                                                   DisposableBattery=4, SolarHarvesting=8, TicHarvesting=16)
                                                          ),
                                                      },
                                                      default=Switch(
                                                          FindClusterID, {
                                                              "EnergyPowerMetering": Struct(
                                                                  "PositiveActiveEnergy" / Int32ub,
                                                                  "NegativeActiveEnergy" / Int32ub,
                                                                  "PositiveReActiveEnergy" / Int32ub,
                                                                  "NegativeReActiveEnergy" / Int32ub,
                                                                  "PositiveActivePower" / Int32ub,
                                                                  "NegativeActivePower" / Int32ub,
                                                                  "PositiveReActivePower" / Int32ub,
                                                                  "NegativeReActivePower" / Int32ub
                                                              ),

                                                              "EnergyPowerMultiMetering": Switch(FindAttributeID, {
                                                                  "EnergyPresentValues":
                                                                  Struct(
                                                                      "ActiveEnergyPhaseA" / Int32sb,
                                                                      "ReActiveEnergyPhaseA" / Int32sb,
                                                                      "ActiveEnergyPhaseB" / Int32sb,
                                                                      "ReActiveEnergyPhaseB" / Int32sb,
                                                                      "ActiveEnergyPhaseC" / Int32sb,
                                                                      "ReActiveEnergyPhaseC" / Int32sb,
                                                                      "ActiveEnergyPhaseABC" / Int32sb,
                                                                      "ReActiveEnergyPhaseABC" / Int32sb
                                                                  ),
                                                                  "PowerPresentValues":
                                                                  Struct(
                                                                      "ActivePowerPhaseA" / Int32sb,
                                                                      "ReActivePowerPhaseA" / Int32sb,
                                                                      "ActivePowerPhaseB" / Int32sb,
                                                                      "ReActivePowerPhaseB" / Int32sb,
                                                                      "ActivePowerPhaseC" / Int32sb,
                                                                      "ReActivePowerPhaseC" / Int32sb,
                                                                      "ActivePowerPhaseABC" / Int32sb,
                                                                      "ReActivePowerPhaseABC" / Int32sb
                                                                  )
                                                              }, default=Struct(
                                                                  "Bytes" / BytesTostrHex
                                                              )
                                                              ),

                                                              "VoltageCurrentMetering": Struct(
                                                                  "Vrms" / Int16ub,
                                                                  "Irms" / Int16ub,
                                                                  "Angle" / Int16ub
                                                              ),

                                                              "VoltageCurrentMultiMetering": Struct(
                                                                  "VrmsA" / Int16sb,
                                                                  "IrmsA" / Int16sb,
                                                                  "AngleA" / Int16sb,
                                                                  "VrmsB" / Int16sb,
                                                                  "IrmsB" / Int16sb,
                                                                  "AngleB" / Int16sb,
                                                                  "VrmsC" / Int16sb,
                                                                  "IrmsC" / Int16sb,
                                                                  "AngleC" / Int16sb
                                                              ),

                                                              "MultiMasterSlave": Switch(FindCommandID, {
                                                                  "ReportAttributes":
                                                                  Struct(
                                                                      "ModbusFieldList" / ModbusFieldList
                                                                  ),
                                                                  "ReportAttributesAlarm":
                                                                  Struct(
                                                                      "ModbusFieldList" / ModbusFieldList
                                                                  )
                                                              }, default=Struct(
                                                                  "Bytes" / BytesTostrHex
                                                              )
                                                              ),

                                                              "SerialMasterSlave": Switch(FindCommandID, {
                                                                  "ReportAttributes":
                                                                  Struct(
                                                                      "ModBusAnswer" / ModBusAnswer
                                                                  ),
                                                                  "ReportAttributesAlarm":
                                                                  Struct(
                                                                      "ModBusAnswer" / ModBusAnswer
                                                                  )
                                                              }, default=Struct(
                                                                  "Bytes" / BytesTostrHex
                                                              )
                                                              ),
                                                              "XYZAcceleration": Switch(FindAttributeID, {
                                                                  "Stats_X": _XYZAccStatsStruct_,
                                                                  "Stats_Y": _XYZAccStatsStruct_,
                                                                  "Stats_Z": _XYZAccStatsStruct_,
                                                                  "Last": _XYZAccLastStruct_,
                                                                  "Params": _XYZAccParamsStruct_
                                                              }, default=Error
                                                              ),
                                                              "Concentration": Switch(FindAttributeID, {
                                                                  "ClassificationLevels": _ClassificationLevelsStruct_,
                                                                  "LastCalibrationStatus": _CalibrationStatusStruct_
                                                              }, default=Error
                                                              )
                                                          },
                                                          default=Struct(
                                                              "Bytes" / BytesTostrHex
                                                          )
                                                      )
                                                  )
                                                  )
                               ),
        "LongByteString": Prefixed(Int16ub, Struct(
            "Bytes" / BytesTostrHex
        )),
        "StructOrderedSequence": BytesTostrHex
    }, default="Bytes" / BytesTostrHex
)

#### TagValue ##############################

TagValue = BitStruct(
    "TagLabel" / BitsInteger(5),
    "TagSize" / BitsInteger(3)
)

########################################################
###### Cause CAUSE #####################################
########################################################


# Since New configuration possible only 6 bit available for <Size>.
# The <RP> byte structure is: <New(1|0)><BatchSize><Batch(1)>
# The Adapter must become:
# 0 0 1 2 3 4 5 6 ==> 0 0 6 5 4 3 2 1
class BatchSizeAdapter(Adapter):
    # revert the size in configure batch cause we swapped it

    def _encode(self, obj, context):
        return ((obj & 0x20) >> 5 | (obj & 0x10) >> 3 | (obj & 0x08) >> 1 | (obj & 0x04) << 1 | (obj & 0x02) << 3 | (obj & 0x01) << 5)

    def _decode(self, obj, context):
        return ((obj & 0x20) >> 5 | (obj & 0x10) >> 3 | (obj & 0x08) >> 1 | (obj & 0x04) << 1 | (obj & 0x02) << 3 | (obj & 0x01) << 5)


BatchSize = BatchSizeAdapter(BitsInteger(6))

# DataBatch
# OldZCL: <EP>0x06<CID><RPBatch >   <AID> [<FID><MinRpt><MaxRpt><Val><Res><Tag>]*
ifBatch = Struct(
    "FieldIndex" / Int8ub,
    "MinReport" / MinOrSecU16,
    "MaxReport" / MinOrSecU16,
    "Delta" / DataBatch,
    "Resolution" / DataBatch,
    "TagValue" / TagValue
)

ReportParameters = BitsSwapped(BitStruct(
    "Batch" / Enum(Bit, Yes=1, No=0),
    Embedded(
        IfThenElse(this.Batch == "Yes",
                   Struct(
                       "Size" / BatchSize,
                       "New" / Enum(Bit, Yes=1, No=0)
                   ),
                   Struct(
                       "NoHeaderPort" / Enum(Bit, Yes=1, No=0),
                       "Secured" / Enum(Bit, Yes=1, No=0),
                       "SecuredIfAlarm" / Enum(Bit, Yes=1, No=0),
                       "CauseRequest" /
                       Enum(BitsInteger(2), No=0, Long=1, Short=2),
                       "Reserved" / Bit,
                       "New" / Enum(Bit, Yes=1, No=0)
                   )
                   )
    )
)
)

CriteriaSlotDescriptor = BitStruct(
    "Alarm" / Enum(Bit, Yes=1, No=0),
    "OnExceed" / Enum(Bit, Yes=1, No=0),
    "OnFall" / Enum(Bit, Yes=1, No=0),
    "Mode" / Enum(BitsInteger(2), Unused=0, Delta=1,
                  Threshold=2, ThresholdWithActions=3),
    "CriterionIndex" / BitsInteger(3)
)
Occurence = BitStruct(
    "ExtendedOccurences" / Enum(Bit, No=0, Yes=1),
    Embedded(
        Switch(this.ExtendedOccurences, {
            "No": Struct("Occurences" / BitsInteger(7)),
            "Yes": Struct(
                "Reserved" / BitsInteger(7),
                "OccurencesHigh" / BitsInteger(16),
                "OccurencesLow" / BitsInteger(16),
            ),
        })
    )
)

######### DECODAGE CAUSE REPORT ###############

DataCause = Switch(
    FindAttributeType, {
        "Boolean": Flag,
        "General8": Byte,
        "General16": Bytes(2),
        "General24": Bytes(3),
        "General32": Bytes(4),
        "General40": Bytes(4),
        "General48": Bytes(4),
        "Bitmap8": BitStruct("b7" / BitsInteger(1), "b6" / BitsInteger(1), "b5" / BitsInteger(1), "b4" / BitsInteger(1), "b3" / BitsInteger(1), "b2" / BitsInteger(1), "b1" / BitsInteger(1), "b0" / BitsInteger(1)),
        "Bitmap16": BitStruct("b15" / BitsInteger(1), "b14" / BitsInteger(1), "b13" / BitsInteger(1), "b12" / BitsInteger(1), "b11" / BitsInteger(1), "b10" / BitsInteger(1), "b9" / BitsInteger(1), "b8" / BitsInteger(1), "b7" / BitsInteger(1), "b6" / BitsInteger(1), "b5" / BitsInteger(1), "b4" / BitsInteger(1), "b3" / BitsInteger(1), "b2" / BitsInteger(1), "b1" / BitsInteger(1), "b0" / BitsInteger(1)),
        "UInt8": Int8ub,
        "UInt16": Int16ub,
        "UInt32": Int32ub,
        "Int8": Int8sb,
        "Int16": Int16sb,
        "Int32": Int32sb,
        "UInt8Enum": Int8ub,
        "SinglePrecision": Float32b,

        "ByteString": Switch(
            FindAttributeID, {
                "CurrentMetering":
                Switch(FindFieldIndex, {
                    0: Int24sb,
                    1: Int24sb,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub
                }),

                "PowerQuality":
                Switch(FindFieldIndex, {
                    0: Int16ub,
                    1: Int16ub,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub,
                    5: Int16ub,
                    6: Int16ub,
                    7: Int16ub,
                    8: Int16ub,
                    9: Int16ub,
                    10: Int16ub,
                    11: Int16ub
                }),

                "NodePowerDescriptor":
                Switch(FindFieldIndex, {
                    0: Int8ub,
                    1: Int8ub,
                    2: Int16ub,
                    3: Int16ub,
                    4: Int16ub,
                    5: Int16ub,
                    6: Int16ub,
                }),
            },
            default=Switch(
                FindClusterID, {
                    "EnergyPowerMetering": Int32ub,
                    "EnergyPowerMultiMetering": Int32sb,
                    "VoltageCurrentMetering": Int16ub,
                    "VoltageCurrentMultiMetering": Int16sb,
                    "XYZAcceleration": Switch(
                        FindAttributeID, {
                            "Stats_X": _XYZAccStatsType_,
                            "Stats_Y": _XYZAccStatsType_,
                            "Stats_Z": _XYZAccStatsType_,
                            "Last": _XYZAccLastType_
                        }, default=Error
                    )
                }
            )
        )
    }, default="Bytes" / BytesTostrHex
)

# Optional FieldIndex used in Cause and Cause configuration
OptionalFieldIndex = Embedded(
    IfValueInListElse(FindAttributeType,
                      ["CharString", "ByteString", "LongByteString", "StructOrderedSequence"], Struct(
                          "FieldIndex" / Int8ub), Pass
                      )
)


# Optional FieldIndex used inbatch configuration
OptionalFieldIndexBatchConfig = Embedded(
    Switch(
        FindClusterID, {
            "SimpleMetering": 	IfValueInListElse(FindAttributeID, ["CurrentMetering"], Struct("FieldIndex" / Int8ub), Pass),
            "PowerQuality": 	IfValueInListElse(FindAttributeID, ["CurrentValues"], Struct("FieldIndex" / Int8ub), Pass),
            "Configuration": 	IfValueInListElse(FindAttributeID, ["NodePowerDescriptor"], Struct("FieldIndex" / Int8ub), Pass),
            "EnergyPowerMetering": 	IfValueInListElse(FindAttributeID, ["PresentValues"], Struct("FieldIndex" / Int8ub), Pass),
            "EnergyPowerMultiMetering": 	IfValueInListElse(FindAttributeID, ["PresentValues"], Struct("FieldIndex" / Int8ub), Pass),
            "VoltageCurrentMetering": 	IfValueInListElse(FindAttributeID, ["PresentValues"], Struct("FieldIndex" / Int8ub), Pass),
            "VoltageCurrentMultiMetering": IfValueInListElse(FindAttributeID, ["PresentValues"], Struct("FieldIndex" / Int8ub), Pass),
            "TIC_CBE": 	IfValueInListElse(FindAttributeID, ["General"], Struct("FieldIndex" / Int8ub), Pass),
            "TIC_STD": 	IfValueInListElse(FindAttributeID, ["General"], Struct("FieldIndex" / Int8ub), Pass),
            "TIC_PMEPMI": 	IfValueInListElse(FindAttributeID, ["General"], Struct("FieldIndex" / Int8ub), Pass),
            "TIC_ICE": 	IfValueInListElse(FindAttributeID, ["General", "ICEp", "ICEpm1"], Struct("FieldIndex" / Int8ub), Pass),
            "XYZAcceleration": 	IfValueInListElse(FindAttributeID, ["Stats_X", "Stats_Y", "Stats_Z", "Last"], Struct("FieldIndex" / Int8ub), Pass)
        }, default=Pass
    )
)

# decodage Cause dans report
Cause = Struct(
    "CriteriaSlotDescriptor" / CriteriaSlotDescriptor,

    Embedded(
        If((this._.ReportParameters.CauseRequest == "Long"),
            Struct(
            OptionalFieldIndex,
            "Value" / DataCause,
            "Gap" / DataCause,
            "Occurence" / Occurence
        )
        )
    )
)

# decodage Rp + Cause dans report
CauseRP = Struct(
    "ReportParameters" / ReportParameters,
    # repeat until EOF by parsing with argument file
    "SlotDescriptors" / GreedyRange(Cause),
)


################# DECODAGE CAUSE CONFIGURATION ####################

ActDesc = BitStruct(
    "SendingOfreport" / Enum(Bit, Yes=0, No=1),
    "Size" / BitsInteger(7),
)

Action = Struct(
    "AoD" / Enum(Byte, Action=0, Delay=1, Sendbatch=2, SendReport=3),
    Embedded(If((this.AoD == "Action"), Struct("Index" / Byte))),
    Embedded(If((this.AoD == "Delay"), Struct("Delay" / MinOrSecU16))),
)


Actions = Struct(
    "ActDesc" / ActDesc,
    "Action" / Byte[this.ActDesc.Size],
    # "Action" / Action[this.ActDesc.Size/2],
    # "Action" / RepeatUntil(lambda obj,lst,ctx: , Action),

)

# decodage Cause dans Configuration
CauseConfiguration = Struct(
    "CriteriaSlotDescriptor" / CriteriaSlotDescriptor,
    OptionalFieldIndex,
    Embedded(If(1, Struct("Value"/DataCause))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode !=
             "Delta", Struct("Gap" / DataCause))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode !=
             "Delta", Struct("Occurence" / Occurence))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode == "ThresholdWithActions",
                Struct("Actions" / Actions)
                )),
)


# Encodage Slot Batch
SlotConfigurationBatch = Struct(
    "CriteriaSlotDescriptor" / CriteriaSlotDescriptor,
    Embedded(If(1, Struct("Value"/DataBatch))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode !=
             "Delta", Struct("Gap" / DataBatch))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode !=
             "Delta", Struct("Occurence" / Occurence))),
    Embedded(If(this.CriteriaSlotDescriptor.Mode ==
             "ThresholdWithActions", Error))
)


# DataBatchNew
# NewZCL: <EP>0x06<CID><RPBatchNew ><AID>[[<FID>]<MinRpt><MaxRpt><nbSlots>{<CSD><Val>[<Gap><Occ>]}+<Res><Tag>]+
ifBatchNew = Struct(
    "FieldIndex" / OptionalFieldIndexBatchConfig,
    "MinReport" / MinOrSecU16,
    "MaxReport" / MinOrSecU16,
    "NbSlots" / Int8ub,
    "Slots" / Array(this.NbSlots, SlotConfigurationBatch),
    "Resolution" / DataBatch,
    "TagValue" / TagValue
)
