# -*- coding: utf-8 -*-
from ._TIC_Tools import *
from datetime import datetime
from datetime import timedelta
from io import BytesIO, StringIO


def _read_stream2(stream, length):
	# if not isinstance(length, int):
	#	 raise TypeError("expected length to be int")
	if length < 0:
		raise ValueError("length must be >= 0", length)
	data = stream.read(length)
	if len(data) != length:
		raise FieldError("could not read enough bytes, expected %d, found %d" % (length, len(data)))
	return data

def _write_stream2(stream, length, data):
	# if not isinstance(data, bytes):
	#	 raise TypeError("expected data to be a bytes")
	if length < 0:
		raise ValueError("length must be >= 0", length)
	if len(data) != length:
		raise FieldError("could not write bytes, expected %d, found %d" % (length, len(data)))
	written = stream.write(data)
	if written is not None and written != length:
		raise FieldError("could not write bytes, written %d, should %d" % (written, length))

class TICEnum(Construct):
	r"""
	Parses the length(bit8 = 1)/or Enum field (bit 8 = 0). 
	If Enum field Then set the subcon according to Enum Array passed in parameters
	If Length field, parse a string of (legnth filed)&0x7F size

	.. seealso:: The prefixed class from whom this is inspired

	:param EnumArray: an array containing enum strings

	Example::

		>>> TICEnum(_E_CONTRAT_STRINGS).parse(b"\x85AZERT?????")
		b'AZERT'

		>>> TICEnum(_E_CONTRAT_STRINGS).parse(b"\x05??????????")
		b'HTA_5'

	"""
	__slots__ = ["name","enum_strings"]
	def __init__(self, enum_strings):
		super(TICEnum, self).__init__()
		self.enum_strings = enum_strings
	def _parse(self, stream, context, path):
		length = _read_stream2(stream, 1)[0]
		revision = GetValueFromKeyLookUP(context, 'rev')
		revision = int(revision) if (revision != '') else 0
		# print(revision)
		if (length & 0x80):
			length &= 0x7F
			return (_read_stream2(stream, length).decode())
		else: 
			if (revision >= 4852) and ( revision <= 5339):
				length = length + 1
			if (length < len(self.enum_strings)):
				return (self.enum_strings[length])
			else:
				raise ExplicitError("Not a valid Enum : %d (0x%02x)" % (length,length))
	def _build(self, obj, stream, context, path):
		# obj should be a string
		b = bytearray()
		revision = GetValueFromKeyLookUP(context, 'rev')
		revision = int(revision) if (revision != '') else 0
		# print(revision)
		try:
			index = self.enum_strings.index(obj)
			if (revision >= 4852) and ( revision <= 5339):
				index = index - 1
			b.append(index)
			_write_stream2(stream, 1, b)
		except ValueError:
			length = len(obj)
			b.append(length | 0x80)
			b.extend(obj.encode())
			_write_stream2(stream, length + 1, b)
		return obj
	def _sizeof(self, context, path):
		raise SizeofError("TICEnum: cannot calculate size")

##############################################################################
# BEWARE : Following enums MUST match those from TIC  sensor embedded parser #
##############################################################################
_E_CONTRAT_STRINGS = [
 "_Err", "_AnyChange", "_Empty",
 "BT 4 SUP36", "BT 5 SUP36", "HTA 5     ", "HTA 8     ",
 "TJ EJP    ", "TJ EJP-HH ", "TJ EJP-PM ", "TJ EJP-SD ", "TJ LU     ",
 "TJ LU-CH  ", "TJ LU-P   ", "TJ LU-PH  ", "TJ LU-SD  ", "TJ MU     ",
 "TV A5 BASE", "TV A8 BASE"]

_E_PT_STRINGS = [
 "_Err","_AnyChange","_Empty",
 " ? ",
 "000", "HC", "HCD", "HCE", "HCH", "HH", "HH ", "HP", "HP ",
 "HPD", "HPE","HPH", "JA", "JA ",  "P","P  ", "PM",   "PM ", "XXX"]

_E_DIV_STRINGS = [
 "_Err","_AnyChange","_Empty",
 "  ACTIF","ACTIF","CONSO","CONTROLE","DEP","INACTIF","PROD","TEST","kVA","kW"]
 
_E_STD_PT_STRINGS = [
 "_Err","_AnyChange","_Empty",
 " ? ",
 "000", "HC", "HCD", "HCE", "HCH", "HH", "HH ", "HP", "HP ",
 "HPD", "HPE","HPH", "JA", "JA ",  "P","P  ", "PM",   "PM ", "XXX",
 "INDEX NON CONSO","BASE","HEURE CREUSE","HEURE PLEINE","HEURE NORMALE","HEURE POINTE",
 "HC BLEU","BUHC","HP BLEU","BUHP","HC BLANC","BCHC","HP BLANC","BCHP", "HC ROUGE","RHC","HP ROUGE","RHP",
 "HEURE WEEK-END"]

_E_STD_CONTRAT_STRINGS = [
 "_Err","_AnyChange","_Empty",
 "BT 4 SUP36", "BT 5 SUP36", "HTA 5     ", "HTA 8     ",
 "TJ EJP    ", "TJ EJP-HH ", "TJ EJP-PM ", "TJ EJP-SD ", "TJ LU     ",
 "TJ LU-CH  ", "TJ LU-P   ", "TJ LU-PH  ", "TJ LU-SD  ", "TJ MU     ",
 "TV A5 BASE", "TV A8 BASE",
 "BASE","H PLEINE-CREUSE","HPHC","HC","HC et Week-End","EJP","PRODUCTEUR"]
 
##########################################################################
# BEWARE : Above enums MUST match those from TIC  sensor embedded parser #
##########################################################################

TYPE_E_CONTRAT     = TICEnum(_E_CONTRAT_STRINGS)
TYPE_E_PT          = TICEnum(_E_PT_STRINGS)
TYPE_E_DIV         = TICEnum(_E_DIV_STRINGS)
TYPE_STD_E_CONTRAT = TICEnum(_E_STD_CONTRAT_STRINGS)
TYPE_STD_E_PT      = TICEnum(_E_STD_PT_STRINGS)


# ADAPTER: "SYYMMDDHHMMSS" ==> 7 bytes
class SDMYhmsToUTF8Class(Adapter):
	def _encode(self, obj, context):
		res = obj[0] + ''.join([chr(int(obj[i:i+2])) for i in range(1, len(obj), 2)])   
		return res.encode()
		
	def _decode(self, obj, context):
		res="%c%02d%02d%02d%02d%02d%02d" % (obj[0],obj[1],obj[2],obj[3],obj[4],obj[5],obj[6])
		return res

TYPE_SDMYhms = SDMYhmsToUTF8Class(Bytes(7)) 


# ADAPTER: "JJ/MM/AA HH:MM:SS" ==> 6 bytes
class DMYhmsToUTF8Class(Adapter):
	def _encode(self, obj, context):
		res = ''.join([chr(int(obj[i:i+2])) for i in range(0, len(obj), 3)])	
		return res.encode()
		
	def _decode(self, obj, context):
		res="%02d/%02d/%02d %02d:%02d:%02d" % (obj[0],obj[1],obj[2],obj[3],obj[4],obj[5])
		return res

TYPE_DMYhms = DMYhmsToUTF8Class(Bytes(6))


TYPE_SDMYhmsU24 = Struct(
	"Date" / TYPE_SDMYhms,
	"Value" / Int24ub
)
TYPE_SDMYhmsU16 = Struct(
	"Date" / TYPE_SDMYhms,
	"Value" / Int16ub
)
TYPE_SDMYhmsU8 = Struct(
	"Date" / TYPE_SDMYhms,
	"Value" / Int8ub
) 


# Timestamp date conversions: 
#   "JJ/MM/AA hh:mm:ss" ==> nb seconds since 01/01/2000
def _StrDateToTimestamp(strDate):
	myDateRef = datetime.strptime('01/01/00 00:00:00', '%d/%m/%y %H:%M:%S')
	myDate = datetime.strptime(strDate, '%d/%m/%y %H:%M:%S')
	return int((myDate - myDateRef).total_seconds())	
#   nb seconds since 01/01/2000 ==> "JJ/MM/AA hh:mm:ss"
def _TimestampToStrDate(u32Seconds):
	myDate = datetime.strptime('01/01/00 00:00:00', '%d/%m/%y %H:%M:%S')
	myDate += timedelta(seconds=u32Seconds)
	return myDate.strftime('%d/%m/%y %H:%M:%S')


# ADAPTER: "JJ/MM/AA HH:MM:SS" <==> Timestamp (U32)
class DMYhmsToTimeStampClass(Adapter):
	def _encode(self, obj, context):
		return _StrDateToTimestamp(obj)
		
	def _decode(self, obj, context):
		return _TimestampToStrDate(obj)
		
TYPE_tsDMYhms = DMYhmsToTimeStampClass(Int32ub)

TYPE_tsDMYhms_E_PT = Struct (
	"Date" / TYPE_tsDMYhms,
	"PT" / TYPE_E_PT,
)


TYPE_U32xbe = BytesTostrHexClass(Bytes(4))

TYPE_bf8d = Int8ub


class hhmmSSSSClass(Adapter):
	#   hhmmSSSS <=> b'xxxx'
	def _encode(self, obj, context):
		res = bytearray(b'')
		if (obj[0:1] == 'N'):
			res.append(255)
		else: 
			res.append(int(obj[0:2]))
			res.append(int(obj[2:4]))
			res = res + bytearray.fromhex(obj[4:8])
		return res
				
	def _decode(self, obj, context):
		res = ""
		if (obj[0] == 0xFF):
			res += "NONUTILE"
		else:
			res += "%02d%02d%02x%02x" % (obj[0],obj[1],obj[2],obj[3])
		return res

TYPE_hhmmSSSS = Struct (
	"FirstByte" / Peek(Int8ub),
	"Value" / IfThenElse (this.FirstByte == 255,
		hhmmSSSSClass(Bytes(1)),
		hhmmSSSSClass(Bytes(4))
	)
)

TYPE_11hhmmSSSS = TYPE_hhmmSSSS[11]

'''

# Below solution DOES NOT WORK TWICE. ONLY ONCE IF end of stream !!! (cause of GreedyByte)

class _11hhmmSSSSClass_(Adapter):
	# 11 fois 
	#   hhmmSSSS <=> b'xxxx'
	#   ou
	#   NONUTILE <=> b'\xFF'
	
	def _encode(self, obj, context):
		i = 0
		res = bytearray(b'')
		for j in range(0,11):
			if (obj[i:i+1] == 'N'):
				res.append(255)
			else: 
				res.append(int(obj[i:i+2]))
				res.append(int(obj[i+2:i+4]))
				res = res + bytearray.fromhex(obj[i+4:i+8])
			i = i + 9
		return res
		
	def _decode(self, obj, context):
		i = 0
		res = ""
		for j in range(0,11):
			if (obj[i] == 0xFF):
				res += "NONUTILE"
				i = i + 1
			else:
				res += "%02d%02d%02x%02x" % (obj[i],obj[i+1],obj[i+2],obj[i+3])
				i = i + 4
			if (j < 10):
				res += ' '
		return res

TYPE_11hhmmSSSS = _11hhmmSSSSClass(GreedyBytes)
'''

TYPE_U24_E_DIV = Struct (
	"Value" / Int24ub,
	"DIV"   / TYPE_E_DIV,
)