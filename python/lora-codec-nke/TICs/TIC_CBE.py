# -*- coding: utf-8 -*-
from ._TIC_Tools import *

###
#
# New method avoiding code duplication but more complex behind 
# Cf _TIC_Tools.py:
#   TIC_STDField, TIC_STDFieldRepeater, TIC_BatchType
# 
# [(<Fid>,<Batchable>,<Label>,<Type/SubCons>),...]
#
###

CBEFields = [
	( 0,	True,	"ADIR1",	Int16ub),
	( 1,	True,	"ADIR2",	Int16ub),
	( 2,	True,	"ADIR3",	Int16ub),
	( 3,	False,	"ADCO",		BytesToUTF8Class(CString())),
	( 4,	False,	"OPTARIF",	BytesToUTF8Class(CString())),
	( 5,	True,	"ISOUSC",	Int8ub),
	( 6,	True,	"BASE",		Int32ub),
	( 7,	True,	"HCHC",		Int32ub),
	
	( 8,	True,	"HCHP",		Int32ub),
	( 9,	True,	"EJPHN",	Int32ub),
	(10,	True,	"EJPHPM",	Int32ub),
	(11,	True,	"BBRHCJB",	Int32ub),
	(12,	True,	"BBRHPJB",	Int32ub),
	(13,	True,	"BBRHCJW",	Int32ub),
	(14,	True,	"BBRHPJW",	Int32ub),
	(15,	True,	"BBRHCJR",	Int32ub),
	
	(16,	True,	"BBRHPJR",	Int32ub),
	(17,	True,	"PEJP",		Int8ub),
	(18,	True,	"GAZ",		Int32ub),
	(19,	True,	"AUTRE",	Int32ub),
	(20,	False,	"PTEC",		BytesToUTF8Class(CString())),
	(21,	False,	"DEMAIN",	BytesToUTF8Class(CString())),
	(22,	True,	"IINST",	Int16ub),
	(23,	True,	"IINST1",	Int16ub),
	
	(24,	True,	"IINST2",	Int16ub),
	(25,	True,	"IINST3",	Int16ub),
	(26,	True,	"ADPS",		Int16ub),
	(27,	True,	"IMAX",		Int16ub),
	(28,	True,	"IMAX1",	Int16ub),
	(29,	True,	"IMAX2",	Int16ub),
	(30,	True,	"IMAX3",	Int16ub),
	(31,	True,	"PMAX",		Int32ub),
	
	(32,	True,	"PAPP",		Int32ub),
	(33,	False,	"HHPHC",	BytesToUTF8Class(String(1))),
	(34,	False,	"MOTDETAT",	BytesToUTF8Class(CString())),
	(35,	False,	"PPOT",		BytesToUTF8Class(CString())),
]	
		
TICDataCBEFromBitfields_New = TIC_STDFieldRepeater(36, TIC_STDField(CBEFields,FindFieldBitField))

TICDataBatchCBEFromFieldIndex_New = TIC_BatchType(FindFieldIndex,CBEFields)

###
#
# Former method below with definitions duplication duplication 
#
###

TICDataCBEFromBitfields = Struct(
	TICDataSelectorIfBit( 0, Struct("ADIR1"/Int16ub) ),
	TICDataSelectorIfBit( 1, Struct("ADIR2"/Int16ub) ),
	TICDataSelectorIfBit( 2, Struct("ADIR3"/Int16ub) ),
	TICDataSelectorIfBit( 3, Struct("ADCO"/BytesToUTF8Class(CString() ))),
	TICDataSelectorIfBit( 4, Struct("OPTARIF"/BytesToUTF8Class(CString()) )),
	TICDataSelectorIfBit( 5, Struct("ISOUSC"/Int8ub) ),
	TICDataSelectorIfBit( 6, Struct("BASE"/Int32ub) ),
	TICDataSelectorIfBit( 7, Struct("HCHC"/Int32ub) ),
	
	TICDataSelectorIfBit( 8,  Struct("HCHP"/Int32ub) ),
	TICDataSelectorIfBit( 9,  Struct("EJPHN"/Int32ub) ),
	TICDataSelectorIfBit( 10, Struct("EJPHPM"/Int32ub) ),
	TICDataSelectorIfBit( 11, Struct("BBRHCJB"/Int32ub) ),
	TICDataSelectorIfBit( 12, Struct("BBRHPJB"/Int32ub) ),
	TICDataSelectorIfBit( 13, Struct("BBRHCJW"/Int32ub) ),
	TICDataSelectorIfBit( 14, Struct("BBRHPJW"/Int32ub) ),
	TICDataSelectorIfBit( 15, Struct("BBRHCJR"/Int32ub) ),
	
	TICDataSelectorIfBit( 16, Struct("BBRHPJR"/Int32ub) ),
	TICDataSelectorIfBit( 17, Struct("PEJP"/Int8ub) ),
	TICDataSelectorIfBit( 18, Struct("GAZ"/Int32ub) ),
	TICDataSelectorIfBit( 19, Struct("AUTRE"/Int32ub) ),
	TICDataSelectorIfBit( 20, Struct("PTEC"/BytesToUTF8Class(CString()) )),
	TICDataSelectorIfBit( 21, Struct("DEMAIN"/BytesToUTF8Class(CString()) )),
	TICDataSelectorIfBit( 22, Struct("IINST"/Int16ub) ),
	TICDataSelectorIfBit( 23, Struct("IINST1"/Int16ub) ),
	
	TICDataSelectorIfBit( 24, Struct("IINST2"/Int16ub) ),
	TICDataSelectorIfBit( 25, Struct("IINST3"/Int16ub) ),
	TICDataSelectorIfBit( 26, Struct("ADPS"/Int16ub) ),
	TICDataSelectorIfBit( 27, Struct("IMAX"/Int16ub) ),
	TICDataSelectorIfBit( 28, Struct("IMAX1"/Int16ub) ),
	TICDataSelectorIfBit( 29, Struct("IMAX2"/Int16ub) ),
	TICDataSelectorIfBit( 30, Struct("IMAX3"/Int16ub) ),
	TICDataSelectorIfBit( 31, Struct("PMAX"/Int32ub) ),
	
	TICDataSelectorIfBit( 32, Struct("PAPP"/Int32ub) ),
	TICDataSelectorIfBit( 33, Struct("HHPHC"/BytesToUTF8Class(String(1))) ),
	TICDataSelectorIfBit( 34, Struct("MOTDETAT"/BytesToUTF8Class(CString())) ),
	TICDataSelectorIfBit( 35, Struct("PPOT"/BytesToUTF8Class(CString()) ))
)		

# NOTE: For Batch only scalar/numeric values are accepeted
TICDataBatchCBEFromFieldIndex = Switch( FindFieldIndex, 
	{
		0 : Int16ub, # ADIR1
		1 : Int16ub, # ADIR2
		2 : Int16ub, # ADIR3
		#3 : BytesToUTF8Class(CString()), # ADCO
		#4 : BytesToUTF8Class(CString()), # OPTARIF
		5 : Int8ub, # ISOUSC
		6 : Int32ub, # BASE
		7 : Int32ub, # HCHC
		
		8 : Int32ub, # HCHP
		9 : Int32ub, # EJPHN
		10 : Int32ub, # EJPHPM
		11 : Int32ub, # BBRHCJB
		12 : Int32ub, # BBRHPJB
		13 : Int32ub, # BBRHCJW
		14 : Int32ub, # BBRHPJW
		15 : Int32ub, # BBRHCJR
		
		16 : Int32ub, # BBRHPJR
		17 : Int8ub, # PEJP
		18 : Int32ub, # GAZ
		19 : Int32ub, # AUTRE
		#20 : BytesToUTF8Class(CString()), # PTEC
		#21 : BytesToUTF8Class(CString()), # DEMAIN
		22 : Int16ub, # IINST
		23 : Int16ub, # IINST1
		
		24 : Int16ub, # IINST2
		25 : Int16ub, # IINST3
		26 : Int16ub, # ADPS
		27 : Int16ub, # IMAX
		28 : Int16ub, # IMAX1
		29 : Int16ub, # IMAX2
		30 : Int16ub, # IMAX3
		31 : Int32ub, # PMAX
		
		32 : Int32ub, # PAPP
		#33 : BytesToUTF8Class(String(1)), # HHPHC
		#34 : BytesToUTF8Class(CString()), # MOTDETAT
		#35 : BytesToUTF8Class(CString()), # PPOT
		
	}, default = TICUnbatchableFieldError()
)

