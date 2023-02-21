# -*- coding: utf-8 -*-
from construct import *
from WTC_CodecTools import *
import sys
		
##### TIC Attribute ID #####################################
# Specific for TIC attribute: <Intance u8><Attribute ID u8>
TICAttributeID = IfStrStartWithElse(FindClusterID,"TIC_ICE",
	Enum (Int8ub,
		General = 0x00,
		ICEp    = 0x01,
		ICEpm1  = 0x02
	),
	Enum (Int8ub,
		General = 0x00
	)
)

OptionalTICAttributeInstance = Embedded (
	IfStrStartWithElse(FindClusterID,"TIC_",
		Struct (
			"Instance" / Int8ub
		),
		Pass
	)
)

##### TIC Descriptor header #####################################
class TICDescHeaderSizeAdapter(Adapter):
	# make specific EndPoint Encoding/Decoding
	def _encode(self, obj, context):
		assert ((obj >= 0) and (obj < 32))
		return ( 8 if (obj == 0) else obj )

	def _decode(self, obj, context):
		return ( 8 if (obj == 0) else obj )

TICDescHeaderSize = TICDescHeaderSizeAdapter(BitsInteger(5))

TICDescHeader = BitStruct(
	"Obsolete"     / Enum(Bit, Yes = 1 , No = 0),
	"Report"       / Enum(Bit, Standard = 0 , Decale = 1),
	"PresentField" / Enum(Bit, DescVarIndexes = 1 , DescVarBitfield = 0),
	"Size"         / TICDescHeaderSize,
)	

def _TICDescIndexesToBitsfield(InByteArray):
	# format input : list of int (indexes)
	# format output : array of bytes with bits set in position of indexes
	
	# return an empty bytearray if list is empty
	if not InByteArray: return bytearray()

	result = bytearray((max(InByteArray) // 8) + 1)
	
	for val in InByteArray:
		result[(val // 8)] |= 1 << (val % 8)
	return result[::-1]
	
def _TICDescBitsfieldToIndexes(InByteArray):
	# format input : array of bytes with bits set in position of indexes
	# format output : list of int (indexes)
	result = bytearray()
	numByte = 0;
	for val in InByteArray[::-1]:
		for numBit in range(8):
			if (val & (1<<numBit)):
				result.append((numByte * 8) + numBit)
		numByte = numByte + 1
	return result

def _ByteArrayTo01String(InByteArray):
	# format input : array of bytes with bits set in position of indexes
	# format output : list of int (indexes)
	result = ""
	numByte = 0;
	for val in InByteArray:
		for numBit in range(8):
			result = result + ("1" if (val & (1<<numBit)) else "0")
		numByte = numByte + 1
	return result
	
def _01StringToByteArray(InO1String):
	# format input : array of bytes with bits set in position of indexes
	# format output : list of int (indexes)
	result = bytearray()
	numByte = 0; numBit=0;
	for car in InO1String:
		if (numBit == 0) :
			result.append(0)
		if (car == "1") :
			result[numByte] |= 1 << numBit
		numBit = numBit + 1
		if (numBit == 8):
			numBit = 0
			numByte = numByte + 1
			
	return result	
		
class TICDescBitsFieldAdapter(Adapter):
	# Revert bitfield to process in growing order from b0 to bn
	def _encode(self, obj, context):
		return ( (_01StringToByteArray(obj))[::-1] )

	def _decode(self, obj, context):
		return ( _ByteArrayTo01String(obj[::-1]) )
		
				
class TICDescIndexesAdapter(Adapter):
	# Revert bitfield to process in growing order from b0 to bn
	def _encode(self, obj, context):
		
		res = _TICDescBitsfieldToIndexes((_01StringToByteArray(obj))[::-1])
		return ( res )

	def _decode(self, obj, context):
		res = _TICDescIndexesToBitsfield(obj)
		return ( _ByteArrayTo01String(res[::-1]) )
 

##### TIC Fields and Selector #####################################	
TICFieldsSelector = Struct(
	"DescHeader" / TICDescHeader,
	Embedded( IfThenElse (this.DescHeader.PresentField == "DescVarBitfield", 
			Struct("BitField" / TICDescBitsFieldAdapter(Bytes(this._.DescHeader.Size - 1))),
			Struct("BitField" / TICDescIndexesAdapter(Bytes(this._.DescHeader.Size - 1)))
	))
 )

#_TICdata_ Must always be associated (prepend) by a TICDataSelector Struct 
# Notice that the lamda verify that :
# - bit is set to "1"
# - if tested bit not over number of char String bitfield Index
def _isSelectedBit(ctx, BitNum):
	print("====>")
	if ( BitNum >= len(ctx._.TICDataSelector.BitField) ): return False
	if (ctx._.TICDataSelector.BitField[BitNum] == "1"): return  True
	else: return False
	
def TICDataSelectorIfBit(BitNum, thensubcon):
	return Embedded( 
		Switch(
			lambda 
				ctx: (ctx._.TICDataSelector.BitField[BitNum] == "1")  \
				if ( BitNum < len(ctx._.TICDataSelector.BitField) ) \
				else False,
			{
			   True : thensubcon,
			}, default = Pass
		)
	)
	
''' Test for more "autodefined format" (cf TIC_ICE.py)
def TICDataSelectorIfBitTest(BitNum, Name, Type):
	return Embedded( Switch(
		lambda 
			ctx: (ctx._.TICDataSelector.BitField[BitNum] == "1")  \
			if ( BitNum < len(ctx._.TICDataSelector.BitField) ) \
			else False,
		{
		   True : Struct(('ID_%03d' % BitNum) / Struct("Name"/Computed(Name), "Type" /Computed(str(Type)), "Value"/Type)),
		}, default = Pass
	))
'''
 
# COULD define many explicit errors to get construct errors more explicits ;O)) !

class TICUnbatchableFieldError(Construct):
	def __init__(self):
		super(self.__class__, self).__init__()
		self.flagbuildnone = True
	def _parse(self, stream, context, path):
		raise ExplicitError("%s : field %d not batchable !" % (FindClusterID(context), FindFieldIndex(context)))
	def _build(self, obj, stream, context, path):
		raise ExplicitError("%s : field %d not batchable !" % (FindClusterID(context), FindFieldIndex(context)))


#############################################################################
#
# Following are experimental based on array of Tuple of TIC field definition
# [(<Fid>,<Batchable>,<Label>,<Type/SubCons>
#
# ==>  TIC STD Field constructor 
#      Repeater for TIC field constructor
#
# ==>  Type Finder based on Field index
#   
#
#############################################################################

class TIC_STDField(Construct):

	__slots__ = ["subcons","TICFieldDescArray","BitField"]
	def __init__(self, TICFieldDescArray, BitField):
		super(TIC_STDField, self).__init__()
		self.TICFieldDescArray = TICFieldDescArray
		self.BitField = BitField
	
	def _parse(self, stream, context, path):
		if hasattr(context,"_FieldIndex_"):	context._FieldIndex_ += 1
		else: context._FieldIndex_ = 0
		#print("A: Context._ = %s" % context._)
		bf = self.BitField(context)
		if ( context._FieldIndex_ >= len(bf) ): return Pass._parse(stream, context, path)
		if (bf[context._FieldIndex_] == "0"): return  Pass._parse(stream, context, path)
		# print("A: _FieldIndex_ = %d" % context._FieldIndex_)
		key = self.TICFieldDescArray[context._FieldIndex_][2]
		obj = self.TICFieldDescArray[context._FieldIndex_][3]._parse(stream, context, path)
		return (key,obj) 
				
	def _build(self, obj, stream, context, path):
		if hasattr(context,"_FieldIndex_"):	context._FieldIndex_ += 1
		else: context._FieldIndex_ = 0
		bf = self.BitField(context)
		if ( context._FieldIndex_ >= len(bf) ): return Pass._build(stream,None, context, path)
		if (bf[context._FieldIndex_] == "0"): return  Pass._build(stream,None, context, path)
		#print("B: _FieldIndex_ = %d" % context._FieldIndex_)
		key = self.TICFieldDescArray[context._FieldIndex_][2]
		self.TICFieldDescArray[context._FieldIndex_][3]._build(obj[key], stream, context, path)
		
	def _sizeof(self, context, path):
		raise SizeofError("size calculaton maybe impossible")



class TIC_STDFieldRepeater(Construct):
	__slots__ = ["nb","subcon"]
	
	def __init__(self, nb, subcon):
		super(TIC_STDFieldRepeater, self).__init__()
		self.subcon = subcon
		self.nb = nb
		
	def _parse(self, stream, context, path):
		nb = self.nb(context) if callable(self.nb) else self.nb
		if not 0 <=nb <= sys.maxsize:
			raise RangeError("unsane nb %s " % nb)
		obj = Container()
		context = Container(_ = context)
		for i in range(0,nb):
			try:
				sc = self.subcon
				subobj = sc._parse(stream, context, path)
				if subobj is not None:
					obj[subobj[0]] = subobj[1]
					context[subobj[0]] = subobj[1]
			except StopIteration:
				break
		return obj
		
	def _build(self, obj, stream, context, path):
		nb = self.nb(context) if callable(self.nb) else self.nb
		if not 0 <=nb <= sys.maxsize:
			raise RangeError("unsane nb %s " % nb)
		context = Container(_ = context)
		context.update(obj)
		for i in range(0,nb):
			try:
				sc = self.subcon
				buildret = sc._build(obj, stream, context, path)
			except StopIteration:
				break
		return context
	def _sizeof(self, context, path):
		raise SizeofError("size calculaton maybe impossible")

class TIC_BatchType(Construct):
	__slots__ = ["subcons", "fifunc","TICFieldDescArray"]
	def __init__(self, fifunc, TICFieldDescArray):
		super(TIC_BatchType, self).__init__()
		self.fifunc = fifunc
		self.TICFieldDescArray = TICFieldDescArray

	def _parse(self, stream, context, path):
		FieldIndex = self.fifunc(context) if callable(self.fifunc) else self.fifunc
		if not 0 <= FieldIndex < len(self.TICFieldDescArray):
			raise RangeError("unsane FieldIndex %s " % FieldIndex)
		if not self.TICFieldDescArray[FieldIndex][1]:
			raise ExplicitError("%s : field %d not batchable !" % (FindClusterID(context), FindFieldIndex(context)))
		obj = self.TICFieldDescArray[FieldIndex][3]._parse(stream, context, path)
		return obj

	def _build(self, obj, stream, context, path):
		FieldIndex = self.fifunc(context) if callable(self.fifunc) else self.fifunc
		if not 0 <= FieldIndex < len(self.TICFieldDescArray): 
			raise RangeError("unsane FieldIndex %s " % FieldIndex)
		if not self.TICFieldDescArray[FieldIndex][1]:
			raise ExplicitError("%s : field %d not batchable !" % (FindClusterID(context), FindFieldIndex(context)))
		self.TICFieldDescArray[FieldIndex][3]._build(obj, stream, context, path)

	def _sizeof(self, context, path):
		try:
			FieldIndex = self.fifunc(context) if callable(self.fifunc) else self.fifunc
			if not 0 <= FieldIndex < len(self.TICFieldDescArray): 
				raise RangeError("unsane FieldIndex %s " % nb)
			if not self.TICFieldDescArray[FieldIndex][1]:
				raise ExplicitError("%s : field %d not batchable !" % (FindClusterID(context), FindFieldIndex(context)))
			sc = self.TICFieldDescArray[FieldIndex][3]
			return sc._sizeof(context, path)
		except (KeyError, AttributeError):
			raise SizeofError("cannot calculate size, index not found")
