# -*- coding: utf-8 -*-

# Pour passer de TICDataXXXFromBitfields @ TICDataBatchXXXFromFieldIndex
# Expressions régulière notepad++ 
# Find   : TICDataSelectorIfBit\( ([0-9]*), Struct\("([^\"]*)"\/([^\)]*).*
# Replace: \1 : \3, # \2

from ._TIC_Tools import *
from ._TIC_Types import *

''' Test for more "autodefined format" (cf _TIC_Tools.py)
TICDataSelectorIfBitTest( 0, "CONTRAT", BytesToUTF8Class(CString())),
TICDataSelectorIfBitTest( 1, "DATECOUR", TYPE_DMYhms),
TICDataSelectorIfBitTest( 2, "DATE", TYPE_DMYhms),
TICDataSelectorIfBitTest( 3, "EA", Int24ub),
'''
TICDataICEGeneralFromBitfields = Struct(

	TICDataSelectorIfBit( 0, Struct("CONTRAT"/BytesToUTF8Class(CString())) ),
	TICDataSelectorIfBit( 1, Struct("DATECOUR"/TYPE_DMYhms)),
	TICDataSelectorIfBit( 2, Struct("DATE"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 3, Struct("EA"/Int24ub) ),
	TICDataSelectorIfBit( 4, Struct("ERP"/Int24ub) ),
	TICDataSelectorIfBit( 5, Struct("PTCOUR"/BytesToUTF8Class(CString() )) ),
	TICDataSelectorIfBit( 6, Struct("PREAVIS"/BytesToUTF8Class(CString() )) ),
	TICDataSelectorIfBit( 7, Struct("MODE"/Computed("CONTROLE") )),

	TICDataSelectorIfBit( 8, Struct("DATEPA1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 9, Struct("PA1"/Int16ub) ),
	TICDataSelectorIfBit( 10, Struct("DATEPA2"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 11, Struct("PA2"/Int16ub) ),
	TICDataSelectorIfBit( 12, Struct("DATEPA3"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 13, Struct("PA3"/Int16ub) ),
	TICDataSelectorIfBit( 14, Struct("DATEPA4"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 15, Struct("PA4"/Int16ub) ),

	TICDataSelectorIfBit( 16, Struct("DATEPA5"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 17, Struct("PA5"/Int16ub) ),
	TICDataSelectorIfBit( 18, Struct("DATEPA6"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 19, Struct("PA6"/Int16ub) ),
	TICDataSelectorIfBit( 20, Struct("*P*"/Pass) ),
	TICDataSelectorIfBit( 21, Struct("KDC"/Int8ub) ),
	TICDataSelectorIfBit( 22, Struct("KDCD"/Int8ub) ),
	TICDataSelectorIfBit( 23, Struct("TGPHI"/Int32ub) ),

	TICDataSelectorIfBit( 24, Struct("PSP"/Int16ub) ),
	TICDataSelectorIfBit( 25, Struct("PSPM"/Int16ub) ),
	TICDataSelectorIfBit( 26, Struct("PSHPH"/Int16ub) ),
	TICDataSelectorIfBit( 27, Struct("PSHPD"/Int16ub) ),
	TICDataSelectorIfBit( 28, Struct("PSHCH"/Int16ub) ),
	TICDataSelectorIfBit( 29, Struct("PSHCD"/Int16ub) ),
	TICDataSelectorIfBit( 30, Struct("PSHPE"/Int16ub) ),
	TICDataSelectorIfBit( 31, Struct("PSHCE"/Int16ub) ),

	TICDataSelectorIfBit( 32, Struct("PSJA"/Int16ub) ),
	TICDataSelectorIfBit( 33, Struct("PSHH"/Int16ub) ),
	TICDataSelectorIfBit( 34, Struct("PSHD"/Int16ub) ),
	TICDataSelectorIfBit( 35, Struct("PSHM"/Int16ub) ),
	TICDataSelectorIfBit( 36, Struct("PSDSM"/Int16ub) ),
	TICDataSelectorIfBit( 37, Struct("PSSCM"/Int16ub) ),
	TICDataSelectorIfBit( 38, Struct("MODE"/Computed("CONTROLE")) ),
	TICDataSelectorIfBit( 39, Struct("PA1MN"/Int16ub) ),
	
	TICDataSelectorIfBit( 40, Struct("PA10MN"/Int16ub) ),
	TICDataSelectorIfBit( 41, Struct("PREA1MN"/Int16sb) ),
	TICDataSelectorIfBit( 42, Struct("PREA10MN"/Int16sb) ),
	TICDataSelectorIfBit( 43, Struct("TGPHI"/Int32ub) ),
	TICDataSelectorIfBit( 44, Struct("U10MN"/Int16ub) )
)

# NOTE: For Batch only scalar/numeric values are accepeted
TICDataBatchICEGeneralFromFieldIndex = Switch( FindFieldIndex, 
	{
		#0 : BytesToUTF8Class(CString()), # CONTRAT
		#1 : TYPE_DMYhms, # DATECOUR
		#2 : TYPE_DMYhms, # DATE
		3 : Int24ub, # EA
		4 : Int24ub, # ERP
		#5 : BytesToUTF8Class(CString(, # PTCOUR
		#6 : BytesToUTF8Class(CString(, # PREAVIS
		#7 : Computed("CONTROLE", # MODE

		#8 : TYPE_DMYhms, # DATEPA1
		9 : Int16ub, # PA1
		#10 : TYPE_DMYhms, # DATEPA2
		11 : Int16ub, # PA2
		#12 : TYPE_DMYhms, # DATEPA3
		13 : Int16ub, # PA3
		#14 : TYPE_DMYhms, # DATEPA4
		15 : Int16ub, # PA4

		#16 : TYPE_DMYhms, # DATEPA5
		17 : Int16ub, # PA5
		#18 : TYPE_DMYhms, # DATEPA6
		19 : Int16ub, # PA6
		#20 : Pass, # *P*
		21 : Int8ub, # KDC
		22 : Int8ub, # KDCD
		23 : Int32ub, # TGPHI

		24 : Int16ub, # PSP
		25 : Int16ub, # PSPM
		26 : Int16ub, # PSHPH
		27 : Int16ub, # PSHPD
		28 : Int16ub, # PSHCH
		29 : Int16ub, # PSHCD
		30 : Int16ub, # PSHPE
		31 : Int16ub, # PSHCE

		32 : Int16ub, # PSJA
		33 : Int16ub, # PSHH
		34 : Int16ub, # PSHD
		35 : Int16ub, # PSHM
		36 : Int16ub, # PSDSM
		37 : Int16ub, # PSSCM
		#38 : Computed("CONTROLE", # MODE
		39 : Int16ub, # PA1MN
		
		40 : Int16ub, # PA10MN
		41 : Int16sb, # PREA1MN
		42 : Int16sb, # PREA10MN
		43 : Int32ub, # TGPHI
		44 : Int16ub, # U10MN
		
	}, default = TICUnbatchableFieldError()
)


TICDataICEpFromBitfields = Struct(
	TICDataSelectorIfBit( 0, Struct("DEBUTp"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 1, Struct("FINp"/TYPE_DMYhms)),
	TICDataSelectorIfBit( 2, Struct("CAFp"/Int16ub) ),
	TICDataSelectorIfBit( 3, Struct("DATE_EAp"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 4, Struct("EApP"/Int24ub) ),
	TICDataSelectorIfBit( 5, Struct("EApPM"/Int24ub) ),
	TICDataSelectorIfBit( 6, Struct("EApHCE"/Int24ub) ),
	TICDataSelectorIfBit( 7, Struct("EApHCH"/Int24ub) ),

	TICDataSelectorIfBit( 8, Struct("EApHH"/Int24ub) ),
	TICDataSelectorIfBit( 9, Struct("EApHCD"/Int24ub) ),
	TICDataSelectorIfBit( 10, Struct("EApHD"/Int24ub) ),
	TICDataSelectorIfBit( 11, Struct("EApJA"/Int24ub) ),
	TICDataSelectorIfBit( 12, Struct("EApHPE"/Int24ub) ),
	TICDataSelectorIfBit( 13, Struct("EApHPH"/Int24ub) ),
	TICDataSelectorIfBit( 14, Struct("EApHPD"/Int24ub) ),
	TICDataSelectorIfBit( 15, Struct("EApSCM"/Int24ub) ),

	TICDataSelectorIfBit( 16, Struct("EApHM"/Int24ub) ),
	TICDataSelectorIfBit( 17, Struct("EApDSM"/Int24ub) ),
	TICDataSelectorIfBit( 18, Struct("DATE_ERPp"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 19, Struct("ERPpP"/Int24ub) ),
	TICDataSelectorIfBit( 20, Struct("ERPpPM"/Int24ub) ),
	TICDataSelectorIfBit( 21, Struct("ERPpHCE"/Int24ub) ),
	TICDataSelectorIfBit( 22, Struct("ERPpHCH"/Int24ub) ),
	TICDataSelectorIfBit( 23, Struct("ERPpHH"/Int24ub) ),

	TICDataSelectorIfBit( 24, Struct("ERPpHCD"/Int24ub) ),
	TICDataSelectorIfBit( 25, Struct("ERPpHD"/Int24ub) ),
	TICDataSelectorIfBit( 26, Struct("ERPpJA"/Int24ub) ),
	TICDataSelectorIfBit( 27, Struct("ERPpHPE"/Int24ub) ),
	TICDataSelectorIfBit( 28, Struct("ERPpHPH"/Int24ub) ),
	TICDataSelectorIfBit( 29, Struct("ERPpHPD"/Int24ub) ),
	TICDataSelectorIfBit( 30, Struct("ERPpSCM"/Int24ub) ),
	TICDataSelectorIfBit( 31, Struct("ERPpHM"/Int24ub) ),

	TICDataSelectorIfBit( 32, Struct("ERPpDSM"/Int24ub) ),
	TICDataSelectorIfBit( 33, Struct("DATE_ERNp"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 34, Struct("ERNpP"/Int24ub) ),
	TICDataSelectorIfBit( 35, Struct("ERNpPM"/Int24ub) ),
	TICDataSelectorIfBit( 36, Struct("ERNpHCE"/Int24ub) ),
	TICDataSelectorIfBit( 37, Struct("ERNpHCH"/Int24ub) ),
	TICDataSelectorIfBit( 38, Struct("ERNpHH"/Int24ub) ),
	TICDataSelectorIfBit( 39, Struct("ERNpHCD"/Int24ub) ),
	
	TICDataSelectorIfBit( 40, Struct("ERNpHD"/Int24ub) ),
	TICDataSelectorIfBit( 41, Struct("ERNpJA"/Int24ub) ),
	TICDataSelectorIfBit( 42, Struct("ERNpHPE"/Int24ub) ),
	TICDataSelectorIfBit( 43, Struct("ERNpHPH"/Int24ub) ),
	TICDataSelectorIfBit( 44, Struct("ERNpHPD"/Int24ub) ),
	TICDataSelectorIfBit( 45, Struct("ERNpSCM"/Int24ub) ),
	TICDataSelectorIfBit( 46, Struct("ERNpHM"/Int24ub) ),
	
	TICDataSelectorIfBit( 47, Struct("ERNpDSM"/Int24ub) )
)

TICDataICEp1FromBitfields = Struct(
	TICDataSelectorIfBit( 0, Struct("DEBUTp1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 1, Struct("FINp1"/TYPE_DMYhms)),
	TICDataSelectorIfBit( 2, Struct("CAFp1"/Int16ub) ),
	TICDataSelectorIfBit( 3, Struct("DATE_EAp1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 4, Struct("EAp1P"/Int24ub) ),
	TICDataSelectorIfBit( 5, Struct("EAp1PM"/Int24ub) ),
	TICDataSelectorIfBit( 6, Struct("EAp1HCE"/Int24ub) ),
	TICDataSelectorIfBit( 7, Struct("EAp1HCH"/Int24ub) ),

	TICDataSelectorIfBit( 8, Struct("EAp1HH"/Int24ub) ),
	TICDataSelectorIfBit( 9, Struct("EAp1HCD"/Int24ub) ),
	TICDataSelectorIfBit( 10, Struct("EAp1HD"/Int24ub) ),
	TICDataSelectorIfBit( 11, Struct("EAp1JA"/Int24ub) ),
	TICDataSelectorIfBit( 12, Struct("EAp1HPE"/Int24ub) ),
	TICDataSelectorIfBit( 13, Struct("EAp1HPH"/Int24ub) ),
	TICDataSelectorIfBit( 14, Struct("EAp1HPD"/Int24ub) ),
	TICDataSelectorIfBit( 15, Struct("EAp1SCM"/Int24ub) ),

	TICDataSelectorIfBit( 16, Struct("EAp1HM"/Int24ub) ),
	TICDataSelectorIfBit( 17, Struct("EAp1DSM"/Int24ub) ),
	TICDataSelectorIfBit( 18, Struct("DATE_ERPp1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 19, Struct("ERPp1P"/Int24ub) ),
	TICDataSelectorIfBit( 20, Struct("ERPp1PM"/Int24ub) ),
	TICDataSelectorIfBit( 21, Struct("ERPp1HCE"/Int24ub) ),
	TICDataSelectorIfBit( 22, Struct("ERPp1HCH"/Int24ub) ),
	TICDataSelectorIfBit( 23, Struct("ERPp1HH"/Int24ub) ),

	TICDataSelectorIfBit( 24, Struct("ERPp1HCD"/Int24ub) ),
	TICDataSelectorIfBit( 25, Struct("ERPp1HD"/Int24ub) ),
	TICDataSelectorIfBit( 26, Struct("ERPp1JA"/Int24ub) ),
	TICDataSelectorIfBit( 27, Struct("ERPp1HPE"/Int24ub) ),
	TICDataSelectorIfBit( 28, Struct("ERPp1HPH"/Int24ub) ),
	TICDataSelectorIfBit( 29, Struct("ERPp1HPD"/Int24ub) ),
	TICDataSelectorIfBit( 30, Struct("ERPp1SCM"/Int24ub) ),
	TICDataSelectorIfBit( 31, Struct("ERPp1HM"/Int24ub) ),

	TICDataSelectorIfBit( 32, Struct("ERPp1DSM"/Int24ub) ),
	TICDataSelectorIfBit( 33, Struct("DATE_ERNp1"/TYPE_DMYhms) ),
	TICDataSelectorIfBit( 34, Struct("ERNp1P"/Int24ub) ),
	TICDataSelectorIfBit( 35, Struct("ERNp1PM"/Int24ub) ),
	TICDataSelectorIfBit( 36, Struct("ERNp1HCE"/Int24ub) ),
	TICDataSelectorIfBit( 37, Struct("ERNp1HCH"/Int24ub) ),
	TICDataSelectorIfBit( 38, Struct("ERNp1HH"/Int24ub) ),
	TICDataSelectorIfBit( 39, Struct("ERNp1HCD"/Int24ub) ),
	
	TICDataSelectorIfBit( 40, Struct("ERNp1HD"/Int24ub) ),
	TICDataSelectorIfBit( 41, Struct("ERNp1JA"/Int24ub) ),
	TICDataSelectorIfBit( 42, Struct("ERNp1HPE"/Int24ub) ),
	TICDataSelectorIfBit( 43, Struct("ERNp1HPH"/Int24ub) ),
	TICDataSelectorIfBit( 44, Struct("ERNp1HPD"/Int24ub) ),
	TICDataSelectorIfBit( 45, Struct("ERNp1SCM"/Int24ub) ),
	TICDataSelectorIfBit( 46, Struct("ERNp1HM"/Int24ub) ),
	
	TICDataSelectorIfBit( 47, Struct("ERNp1DSM"/Int24ub) )
)

# NOTE: For Batch only scalar/numeric values are accepeted
TICDataBatchICEpxFromFieldIndex = Switch( FindFieldIndex, 
	{
		#0 : TYPE_DMYhms, # DEBUTpx
		#1 : TYPE_DMYhms, # FINpx
		2 : Int16ub, # CAFpx
		#3 : TYPE_DMYhms, # DATE_EApx
		4 : Int24ub, # EApxP
		5 : Int24ub, # EApxPM
		6 : Int24ub, # EApxHCE
		7 : Int24ub, # EApxHCH

		8 : Int24ub, # EApxHH
		9 : Int24ub, # EApxHCD
		10 : Int24ub, # EApxHD
		11 : Int24ub, # EApxJA
		12 : Int24ub, # EApxHPE
		13 : Int24ub, # EApxHPH
		14 : Int24ub, # EApxHPD
		15 : Int24ub, # EApxSCM

		16 : Int24ub, # EApxHM
		17 : Int24ub, # EApxDSM
		#18 : TYPE_DMYhms, # DATE_ERPpx
		19 : Int24ub, # ERPpxP
		20 : Int24ub, # ERPpxPM
		21 : Int24ub, # ERPpxHCE
		22 : Int24ub, # ERPpxHCH
		23 : Int24ub, # ERPpxHH

		24 : Int24ub, # ERPpxHCD
		25 : Int24ub, # ERPpxHD
		26 : Int24ub, # ERPpxJA
		27 : Int24ub, # ERPpxHPE
		28 : Int24ub, # ERPpxHPH
		29 : Int24ub, # ERPpxHPD
		30 : Int24ub, # ERPpxSCM
		31 : Int24ub, # ERPpxHM

		32 : Int24ub, # ERPpxDSM
		#33 : TYPE_DMYhms, # DATE_ERNpx
		34 : Int24ub, # ERNpxP
		35 : Int24ub, # ERNpxPM
		36 : Int24ub, # ERNpxHCE
		37 : Int24ub, # ERNpxHCH
		38 : Int24ub, # ERNpxHH
		39 : Int24ub, # ERNpxHCD
		
		40 : Int24ub, # ERNpxHD
		41 : Int24ub, # ERNpxJA
		42 : Int24ub, # ERNpxHPE
		43 : Int24ub, # ERNpxHPH
		44 : Int24ub, # ERNpxHPD
		45 : Int24ub, # ERNpxSCM
		46 : Int24ub, # ERNpxHM
		
		47 : Int24ub, # ERNpxDSM
		
	}, default = TICUnbatchableFieldError()
)
