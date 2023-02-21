# -*- coding: utf-8 -*-

# Pour passer de TICDataXXXFromBitfields @ TICDataBatchXXXFromFieldIndex
# Expressions régulière notepad++ 
# Find   : TICDataSelectorIfBit\( ([0-9]*), Struct\("([^\"]*)"\/([^\)]*).*
# Replace: \1 : \3, # \2

from ._TIC_Tools import *
from ._TIC_Types import *

TICDataSTDFromBitfields = Struct(
	TICDataSelectorIfBit( 0, Struct("ADSC"/BytesToUTF8Class(CString())) ),
	TICDataSelectorIfBit( 1, Struct("VTIC"/Int8ub) ),
	TICDataSelectorIfBit( 2, Struct("DATE"/TYPE_SDMYhms) ),
	TICDataSelectorIfBit( 3, Struct("NGTF"/TYPE_STD_E_CONTRAT) ),
	TICDataSelectorIfBit( 4, Struct("LTARF"/TYPE_STD_E_PT) ),
	TICDataSelectorIfBit( 5, Struct("EAST"/Int32ub) ),
	TICDataSelectorIfBit( 6, Struct("EASF01"/Int32ub) ),
	TICDataSelectorIfBit( 7, Struct("EASF02"/Int32ub) ),

	TICDataSelectorIfBit( 8, Struct("EASF03"/Int32ub) ),
	TICDataSelectorIfBit( 9, Struct("EASF04"/Int32ub) ),
	TICDataSelectorIfBit( 10, Struct("EASF05"/Int32ub) ),
	TICDataSelectorIfBit( 11, Struct("EASF06"/Int32ub) ),
	TICDataSelectorIfBit( 12, Struct("EASF07"/Int32ub) ),
	TICDataSelectorIfBit( 13, Struct("EASF08"/Int32ub) ),
	TICDataSelectorIfBit( 14, Struct("EASF09"/Int32ub) ),
	TICDataSelectorIfBit( 15, Struct("EASF10"/Int32ub) ),

	TICDataSelectorIfBit( 16, Struct("EASD01"/Int32ub) ),
	TICDataSelectorIfBit( 17, Struct("EASD02"/Int32ub) ),
	TICDataSelectorIfBit( 18, Struct("EASD03"/Int32ub) ),
	TICDataSelectorIfBit( 19, Struct("EASD04"/Int32ub) ),
	TICDataSelectorIfBit( 20, Struct("EAIT"/Int32ub) ),
	TICDataSelectorIfBit( 21, Struct("ERQ1"/Int32ub) ),
	TICDataSelectorIfBit( 22, Struct("ERQ2"/Int32ub) ),
	TICDataSelectorIfBit( 23, Struct("ERQ3"/Int32ub) ),

	TICDataSelectorIfBit( 24, Struct("ERQ4"/Int32ub) ),
	TICDataSelectorIfBit( 25, Struct("IRMS1"/Int16ub) ),
	TICDataSelectorIfBit( 26, Struct("IRMS2"/Int16ub) ),
	TICDataSelectorIfBit( 27, Struct("IRMS3"/Int16ub) ),
	TICDataSelectorIfBit( 28, Struct("URMS1"/Int16ub) ),
	TICDataSelectorIfBit( 29, Struct("URMS2"/Int16ub) ),
	TICDataSelectorIfBit( 30, Struct("URMS3"/Int16ub) ),
	TICDataSelectorIfBit( 31, Struct("PREF"/Int8ub) ),

	TICDataSelectorIfBit( 32, Struct("PCOUP"/Int8ub) ),
	TICDataSelectorIfBit( 33, Struct("SINSTS"/Int24ub) ),
	TICDataSelectorIfBit( 34, Struct("SINSTS1"/Int24ub) ),
	TICDataSelectorIfBit( 35, Struct("SINSTS2"/Int24ub) ),
	TICDataSelectorIfBit( 36, Struct("SINSTS3"/Int24ub) ),
	TICDataSelectorIfBit( 37, Struct("SMAXN"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 38, Struct("SMAXN1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 39, Struct("SMAXN2"/TYPE_SDMYhmsU24) ),
	
	TICDataSelectorIfBit( 40, Struct("SMAXN3"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 41, Struct("SMAXN_1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 42, Struct("SMAXN1-1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 43, Struct("SMAXN2-1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 44, Struct("SMAXN3-1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 45, Struct("SINSTI"/Int24ub) ),
	TICDataSelectorIfBit( 46, Struct("SMAXIN"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 47, Struct("SMAXIN-1"/TYPE_SDMYhmsU24) ),

	TICDataSelectorIfBit( 48, Struct("CCASN"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 49, Struct("CCASN-1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 50, Struct("CCAIN"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 51, Struct("CCAIN-1"/TYPE_SDMYhmsU24) ),
	TICDataSelectorIfBit( 52, Struct("UMOY1"/TYPE_SDMYhmsU16) ),
	TICDataSelectorIfBit( 53, Struct("UMOY2"/TYPE_SDMYhmsU16) ),
	TICDataSelectorIfBit( 54, Struct("UMOY3"/TYPE_SDMYhmsU16) ),
	TICDataSelectorIfBit( 55, Struct("STGE"/TYPE_U32xbe) ),

	TICDataSelectorIfBit( 56, Struct("DPM1"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 57, Struct("FPM1"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 58, Struct("DPM2"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 59, Struct("FPM2"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 60, Struct("DPM3"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 61, Struct("FPM3"/TYPE_SDMYhmsU8) ),
	TICDataSelectorIfBit( 62, Struct("MSG1"/BytesToUTF8Class(CString())) ),
	TICDataSelectorIfBit( 63, Struct("MSG2"/BytesToUTF8Class(CString())) ),

	TICDataSelectorIfBit( 64, Struct("PRM"/BytesToUTF8Class(CString())) ),
	TICDataSelectorIfBit( 65, Struct("RELAIS"/TYPE_bf8d) ),
	TICDataSelectorIfBit( 66, Struct("NTARF"/Int8ub) ),
	TICDataSelectorIfBit( 67, Struct("NJOURF"/Int8ub) ),
	TICDataSelectorIfBit( 68, Struct("NJOURFp1"/Int8ub) ),
	TICDataSelectorIfBit( 69, Struct('PJOURFp1'/TYPE_11hhmmSSSS) ),
	TICDataSelectorIfBit( 70, Struct("PPOINTE"/TYPE_11hhmmSSSS) )
)

# NOTE: For Batch only scalar/numeric values are accepeted
TICDataBatchSTDFromFieldIndex = Switch( FindFieldIndex, 
	{
		#0 : BytesToUTF8Class(CString()), # ADSC
		1 : Int8ub, # VTIC
		#2 : TYPE_SDMYhms, # DATE
		#3 : TYPE_E_CONTRAT, # NGTF
		4 : TYPE_E_PT, # LTARF
		5 : Int32ub, # EAST
		6 : Int32ub, # EASF01
		7 : Int32ub, # EASF02

		8 : Int32ub, # EASF03
		9 : Int32ub, # EASF04
		10 : Int32ub, # EASF05
		11 : Int32ub, # EASF06
		12 : Int32ub, # EASF07
		13 : Int32ub, # EASF08
		14 : Int32ub, # EASF09
		15 : Int32ub, # EASF10

		16 : Int32ub, # EASD01
		17 : Int32ub, # EASD02
		18 : Int32ub, # EASD03
		19 : Int32ub, # EASD04
		20 : Int32ub, # EAIT
		21 : Int32ub, # ERQ1
		22 : Int32ub, # ERQ2
		23 : Int32ub, # ERQ3

		24 : Int32ub, # ERQ4
		25 : Int16ub, # IRMS1
		26 : Int16ub, # IRMS2
		27 : Int16ub, # IRMS3
		28 : Int16ub, # URMS1
		29 : Int16ub, # URMS2
		30 : Int16ub, # URMS3
		31 : Int8ub, # PREF

		32 : Int8ub, # PCOUP
		33 : Int24ub, # SINSTS
		34 : Int24ub, # SINSTS1
		35 : Int24ub, # SINSTS2
		36 : Int24ub, # SINSTS3
		#37 : TYPE_SDMYhmsU24, # SMAXN
		#38 : TYPE_SDMYhmsU24, # SMAXN1
		#39 : TYPE_SDMYhmsU24, # SMAXN2
		#
		#40 : TYPE_SDMYhmsU24, # SMAXN3
		#41 : TYPE_SDMYhmsU24, # SMAXN_1
		#42 : TYPE_SDMYhmsU24, # SMAXN1-1
		#43 : TYPE_SDMYhmsU24, # SMAXN2-1
		#44 : TYPE_SDMYhmsU24, # SMAXN3-1
		45 : Int24ub, # SINSTI
		#46 : TYPE_SDMYhmsU24, # SMAXIN
		#47 : TYPE_SDMYhmsU24, # SMAXIN-1
		#
		#48 : TYPE_SDMYhmsU24, # CCASN
		#49 : TYPE_SDMYhmsU24, # CCASN-1
		#50 : TYPE_SDMYhmsU24, # CCAIN
		#51 : TYPE_SDMYhmsU24, # CCAIN-1
		#52 : TYPE_SDMYhmsU16, # UMOY1
		#53 : TYPE_SDMYhmsU16, # UMOY2
		#54 : TYPE_SDMYhmsU16, # UMOY3
		#55 : TYPE_U32xbe, # STGE

		#56 : TYPE_SDMYhmsU8, # DPM1
		#57 : TYPE_SDMYhmsU8, # FPM1
		#58 : TYPE_SDMYhmsU8, # DPM2
		#59 : TYPE_SDMYhmsU8, # FPM2
		#60 : TYPE_SDMYhmsU8, # DPM3
		#61 : TYPE_SDMYhmsU8, # FPM3
		#62 : BytesToUTF8Class(CString()), # MSG1
		#63 : BytesToUTF8Class(CString()), # MSG2
		
		#64 : BytesToUTF8Class(CString(, # PRM
		#65 : TYPE_bf8d, # RELAIS
		66 : Int8ub, # NTARF
		67 : Int8ub, # NJOURF
		68 : Int8ub, # NJOURFp1
		#69 : TYPE_11hhmmSSSS, # PJOURFp1
		#70 : TYPE_11hhmmSSSS, # PPOINTE
		
	}, default = TICUnbatchableFieldError()
)


