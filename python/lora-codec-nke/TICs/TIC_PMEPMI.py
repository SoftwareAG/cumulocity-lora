# -*- coding: utf-8 -*-

# Pour passer de TICDataXXXFromBitfields @ TICDataBatchXXXFromFieldIndex
# Expressions régulière notepad++ 
# Find   : TICDataSelectorIfBit\( ([0-9]*), Struct\("([^\"]*)"\/([^\)]*).*
# Replace: \1 : \3, # \2

from ._TIC_Tools import *
from ._TIC_Types import *

TICDataPMEPMIFromBitfields = Struct(
	TICDataSelectorIfBit( 0, Struct("TRAME"/TYPE_E_DIV) ),
	TICDataSelectorIfBit( 1, Struct("ADS"/Prefixed(Int8ub,BytesTostrHexClass(Bytes(6))))),
	TICDataSelectorIfBit( 2, Struct("MESURES1"/TYPE_E_CONTRAT) ),
	TICDataSelectorIfBit( 3, Struct("DATE"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 4, Struct("EA_s"/Int24ub) ),
	TICDataSelectorIfBit( 5, Struct("ERp_s"/Int24ub) ),
	TICDataSelectorIfBit( 6, Struct("ERm_s"/Int24ub) ),
	TICDataSelectorIfBit( 7, Struct("EAPP_s"/Int24ub) ),

	TICDataSelectorIfBit( 8, Struct("EA_i"/Int24ub) ),
	TICDataSelectorIfBit( 9, Struct("ERp_i"/Int24ub) ),
	TICDataSelectorIfBit( 10, Struct("ERm_i"/Int24ub) ),
	TICDataSelectorIfBit( 11, Struct("EAPP_i"/Int24ub) ),
	TICDataSelectorIfBit( 12, Struct("PTCOUR1"/TYPE_E_PT) ),
	TICDataSelectorIfBit( 13, Struct("TARIFDYN"/TYPE_E_DIV) ),
	TICDataSelectorIfBit( 14, Struct("ETATDYN1"/TYPE_E_PT) ),
	TICDataSelectorIfBit( 15, Struct("PREAVIS1"/TYPE_E_PT) ),

	TICDataSelectorIfBit( 16, Struct("TDYN1CD"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 17, Struct("TDYN1CF"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 18, Struct("TDYN1FD"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 19, Struct("TDYN1FF"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 20, Struct("MODE"/TYPE_E_DIV) ),
	TICDataSelectorIfBit( 21, Struct("CONFIG"/TYPE_E_DIV) ),
	TICDataSelectorIfBit( 22, Struct("DATEPA1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 23, Struct("PA1_s"/Int16ub) ),

	TICDataSelectorIfBit( 24, Struct("PA1_i"/Int16ub) ),
	TICDataSelectorIfBit( 25, Struct("DATEPA2"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 26, Struct("PA2_s"/Int16ub) ),
	TICDataSelectorIfBit( 27, Struct("PA2_i"/Int16ub) ),
	TICDataSelectorIfBit( 28, Struct("DATEPA3"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 29, Struct("PA3_s"/Int16ub) ),
	TICDataSelectorIfBit( 30, Struct("PA3_i"/Int16ub) ),
	TICDataSelectorIfBit( 31, Struct("DATEPA4"/TYPE_tsDMYhms) ),

	TICDataSelectorIfBit( 32, Struct("PA4_s"/Int16ub) ),
	TICDataSelectorIfBit( 33, Struct("PA4_i"/Int16ub) ),
	TICDataSelectorIfBit( 34, Struct("DATEPA5"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 35, Struct("PA5_s"/Int16ub) ),
	TICDataSelectorIfBit( 36, Struct("PA5_i"/Int16ub) ),
	TICDataSelectorIfBit( 37, Struct("DATEPA6"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 38, Struct("PA6_s"/Int16ub) ),
	TICDataSelectorIfBit( 39, Struct("PA6_i"/Int16ub) ),
	
	TICDataSelectorIfBit( 40, Struct("DebP"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 41, Struct("EAP_s"/Int24ub) ),
	TICDataSelectorIfBit( 42, Struct("EAP_i"/Int24ub) ),
	TICDataSelectorIfBit( 43, Struct("ERpP_s"/Int24ub) ),
	TICDataSelectorIfBit( 44, Struct("ERmP_s"/Int24ub) ),
	TICDataSelectorIfBit( 45, Struct("ERpP_i"/Int24ub) ),
	TICDataSelectorIfBit( 46, Struct("ERmP_i"/Int24ub) ),
	TICDataSelectorIfBit( 47, Struct("DebPm1"/TYPE_tsDMYhms) ),

	TICDataSelectorIfBit( 48, Struct("FinPm1"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 49, Struct("EaPm1_s"/Int24ub) ),
	TICDataSelectorIfBit( 50, Struct("EaPm1_i"/Int24ub) ),
	TICDataSelectorIfBit( 51, Struct("ERpPm1_s"/Int24ub) ),
	TICDataSelectorIfBit( 52, Struct("ERmPm1_s"/Int24ub) ),
	TICDataSelectorIfBit( 53, Struct("ERpPm1_i"/Int24ub) ),
	TICDataSelectorIfBit( 54, Struct("ERmPm1_i"/Int24ub) ),
	TICDataSelectorIfBit( 55, Struct("PS"/TYPE_U24_E_DIV) ),

	TICDataSelectorIfBit( 56, Struct("PREAVIS"/TYPE_E_DIV) ),
	TICDataSelectorIfBit( 57, Struct("PA1MN"/Int16ub) ),
	TICDataSelectorIfBit( 58, Struct("PMAX_s"/TYPE_U24_E_DIV) ),
	TICDataSelectorIfBit( 59, Struct("PMAX_i"/TYPE_U24_E_DIV) ),
	TICDataSelectorIfBit( 60, Struct("TGPHI_s"/Float32b) ),
	TICDataSelectorIfBit( 61, Struct("TGPHI_i"/Float32b) ),
	TICDataSelectorIfBit( 62, Struct("MESURES2"/TYPE_E_CONTRAT) ),
	TICDataSelectorIfBit( 63, Struct("PTCOUR2"/TYPE_E_PT) ),

	TICDataSelectorIfBit( 64, Struct("ETATDYN2"/TYPE_E_PT) ),
	TICDataSelectorIfBit( 65, Struct("PREAVIS2"/TYPE_E_PT) ),
	TICDataSelectorIfBit( 66, Struct("TDYN2CD"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 67, Struct("TDYN2CF"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 68, Struct("TDYN2FD"/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 69, Struct('TDYN2FF'/TYPE_tsDMYhms_E_PT) ),
	TICDataSelectorIfBit( 70, Struct("DebP_2"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 71, Struct("EaP_s2"/Int24ub) ),
	
	TICDataSelectorIfBit( 72, Struct("DebPm1_2"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 73, Struct("FinPm1_2"/TYPE_tsDMYhms) ),
	TICDataSelectorIfBit( 74, Struct("EaPm1_s2"/Int24ub) ),
	TICDataSelectorIfBit( 75, Struct("_DDEPMES1_"/Int24ub) )
	
)

# NOTE: For Batch only scalar/numeric values are accepeted
TICDataBatchPMEPMIFromFieldIndex = Switch( FindFieldIndex, 
	{
		#0 : TYPE_E_DIV, # TRAME
		#1 : Prefixed(Int8ub,BytesTostrHexClass(Bytes(6))), # ADS
		#2 : TYPE_E_CONTRAT, # MESURES1
		#3 : TYPE_DMYhms, # DATE
		4 : Int24ub, # EA_s
		5 : Int24ub, # ERp_s
		6 : Int24ub, # ERm_s
		7 : Int24ub, # EAPP_s

		8 : Int24ub, # EA_i
		9 : Int24ub, # ERp_i
		10 : Int24ub, # ERm_i
		11 : Int24ub, # EAPP_i
		#12 : TYPE_E_PT, # PTCOUR1
		#13 : TYPE_E_DIV, # TARIFDYN
		#14 : TYPE_E_PT, # ETATDYN1
		#15 : TYPE_E_PT, # PREAVIS1
		
		#16 : TYPE_tsDMYhms_E_PT, # TDYN1CD
		#17 : TYPE_tsDMYhms_E_PT, # TDYN1CF
		#18 : TYPE_tsDMYhms_E_PT, # TDYN1FD
		#19 : TYPE_tsDMYhms_E_PT, # TDYN1FF
		#20 : TYPE_E_DIV, # MODE
		#21 : TYPE_E_DIV, # CONFIG
		#22 : TYPE_DMYhms, # DATEPA1
		23 : Int16ub, # PA1_s

		24 : Int16ub, # PA1_i
		25 : TYPE_tsDMYhms, # DATEPA2
		26 : Int16ub, # PA2_s
		27 : Int16ub, # PA2_i
		28 : TYPE_tsDMYhms, # DATEPA3
		29 : Int16ub, # PA3_s
		30 : Int16ub, # PA3_i
		31 : TYPE_tsDMYhms, # DATEPA4

		32 : Int16ub, # PA4_s
		33 : Int16ub, # PA4_i
		34 : TYPE_tsDMYhms, # DATEPA5
		35 : Int16ub, # PA5_s
		36 : Int16ub, # PA5_i
		37 : TYPE_tsDMYhms, # DATEPA6
		38 : Int16ub, # PA6_s
		39 : Int16ub, # PA6_i
		
		40 : TYPE_tsDMYhms, # DebP
		41 : Int24ub, # EAP_s
		42 : Int24ub, # EAP_i
		43 : Int24ub, # ERpP_s
		44 : Int24ub, # ERmP_s
		45 : Int24ub, # ERpP_i
		46 : Int24ub, # ERmP_i
		47 : TYPE_tsDMYhms, # DebPm1

		48 : TYPE_tsDMYhms, # FinPm1
		49 : Int24ub, # EaPm1_s
		50 : Int24ub, # EaPm1_i
		51 : Int24ub, # ERpPm1_s
		52 : Int24ub, # ERmPm1_s
		53 : Int24ub, # ERpPm1_i
		54 : Int24ub, # ERmPm1_i
		55 : TYPE_U24_E_DIV, # PS

		#56 : TYPE_E_DIV, # PREAVIS
		57 : Int16ub, # PA1MN
		#58 : TYPE_U24_E_DIV, # PMAX_s
		#59 : TYPE_U24_E_DIV, # PMAX_i
		60 : Float32b, # TGPHI_s
		61 : Float32b, # TGPHI_i
		#62 : TYPE_E_CONTRAT, # MESURES2
		#63 : TYPE_E_PT, # PTCOUR2
		
		#64 : TYPE_E_PT, # ETATDYN2
		#65 : TYPE_E_PT, # PREAVIS2
		#66 : TYPE_tsDMYhms_E_PT, # TDYN2CD
		#67 : TYPE_tsDMYhms_E_PT, # TDYN2CF
		#68 : TYPE_tsDMYhms_E_PT, # TDYN2FD
		#69 : TYPE_tsDMYhms_E_PT, # TDYN2FF
		#70 : TYPE_DMYhms, # DebP_2
		71 : Int24ub, # EaP_s2
		
		#72 : TYPE_tsDMYhms, # DebPm1_2
		#73 : TYPE_tsDMYhms, # FinPm1_2
		74 : Int24ub, # EaPm1_s2
		75 : Int24ub # _DDEPMES1_
		
	}, default = TICUnbatchableFieldError()
)


