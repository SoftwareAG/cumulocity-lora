# -*- coding: utf-8 -*-
from ZCL import *

#from BATCH_FRAME import *

#if New configure report
DataNew = Struct(
	Embedded (If ((this._._.ReportParameters.New == "Yes") & (this._._.ReportParameters.NoHeaderPort == "Yes"),Struct("Port" / Byte))),
	Embedded (If ((this._._.ReportParameters.New == "Yes") , Struct("Cause" / GreedyRange(CauseConfiguration))))
)

ReportConfiguration = Struct(
	"ReportParameters" / ReportParameters,
	OptionalTICAttributeInstance,
	"AttributeID" / AttributeID,
	Embedded(IfThenElse(this.ReportParameters.Batch == "Yes",
		Struct(
			Embedded( IfThenElse(this._.ReportParameters.New == "Yes",
				Struct (
					"Batches" / GreedyRange(ifBatchNew),
					#Below will detect error of batch constitution (remaining bytes after end of Batch fields parsing
					Terminated
				),
				Struct (
					"Batches" / GreedyRange(ifBatch),
					#Below will detect error of batch constitution (remaining bytes after end of Batch fields parsing
					Terminated
				)
			))
		),						
		Struct(
			"AttributeType" / DataType,
			"MinReport" / MinOrSecU16,
			"MaxReport" / MinOrSecU16,
			#if New configure report
			Embedded ( 	IfThenElse ( 	((this.AttributeType == "CharString") |
						(this.AttributeType  == "ByteString") |
						(this.AttributeType  == "LongByteString") |
						(this.AttributeType  == "StructOrderedSequence")) & (this._.ReportParameters.New == "Yes"),
					Prefixed(Int8ub, DataNew),
					DataNew
				)
			),
			Embedded(If ((this._.ReportParameters.New == "No") ,Struct ("Data"/Data)))
		)
	))
)

#### FULL Standard frame description ####################e####
STDFrame = Struct(
	"FrameCtrl" / FrameCtrl,
	"CommandID" / CommandID,
	"ClusterID" / ClusterID,
	#Report
	Embedded ( 
		If ( ((this.CommandID == "ReportAttributesAlarm") |(this.CommandID == "ReportAttributes")),
			Struct(
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID,
				"AttributeType" / DataType,
				"Data" / Data,
				"Cause" / GreedyRange(CauseRP)
			)
		)
	),
	#configure reporting
	Embedded ( 
		If (this.CommandID == "ConfigureReporting" ,
			ReportConfiguration
		)
	),
	#configure reporting response
	Embedded ( 
		If ( ((this.CommandID == "ConfigureReportingResponse")),
			Struct(		
				"Status" / Status,
				"ReportParameters" / ReportParameters,
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID
			)
		)
	),
	#Read reporting Configuration
	Embedded ( 
		If ( (this.CommandID == "ReadReportingConfiguration"),
			Struct(	
				"ReportParameters" / ReportParameters,
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID
			)
		)
	),
	#Read reporting Configuration response
	Embedded ( 
		If ( ((this.CommandID == "ReadReportingConfigurationResponse")),
			Struct(	
				"Status" / Status,
				Embedded(IfThenElse(this.Status == "OK",
					ReportConfiguration,
					Struct(
						"ReportParameters" / ReportParameters,
						OptionalTICAttributeInstance,
						"AttributeID" / AttributeID
					)
				))
			)
		)
	),
	#Read Attribut request
	Embedded ( 
		If ( ((this.CommandID == "ReadAttribute")),
			Struct(		
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID,
			)
		)
	),
	#Read Attribut response
	Embedded ( 
		If ( ((this.CommandID == "ReadAttributeResponse")),
			Struct(	
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID,
				"Status" / Status,
				Embedded(IfThenElse(this.Status == "OK",
					Struct(
						"AttributeType" / DataType,
						"Data" / Data
					),
					Pass,
				))
			)
		)
	),
	#Write Attribut (with response)
	Embedded ( 
		If ( ((this.CommandID == "WriteAttribute")),
			Struct(	
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID,
				"AttributeType" / DataType,
				"Data" / Data
			)
		)
	),
	#Write Attribut response
	Embedded ( 
		If ( ((this.CommandID == "WriteAttributeResponse")),
			Struct(	
				"Status" / Status,
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID
			)
		)
	),
	#Write Attribut no response
	Embedded ( 
		If ( ((this.CommandID == "WriteAttributeNoResponse")),
			Struct(	
				OptionalTICAttributeInstance,
				"AttributeID" / AttributeID,
				"AttributeType" / DataType,
				"Data" / Data
			)
		)
	),
	#Cluster Specific Command
	Embedded ( 
		If ( ((this.CommandID == "ClusterSpecificCommand")),
			Struct(		
				"Data" / GreedyRange(Byte)
			)
		)
	)
)