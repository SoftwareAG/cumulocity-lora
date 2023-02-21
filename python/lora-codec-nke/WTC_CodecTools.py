# -*- coding: utf-8 -*-
from construct import *
import base64
import binascii

# patch Construct 2.8.12 ========================================================

# patch 'Sequence' access : form 2.7 to 3.9 collections.Sequence THEN from 3.10 collections.abc.sequence
# Beware This is a basic patch as Sequence very few used in construct... maybe no functionnal for other usages
import collections
import sys
if sys.version_info >= (3,10):
	collections.Sequence = collections.abc.Sequence

# patch update method from Container Class 
def _patchFor_Container_update(self, seqordict, **kw):
	if isinstance(seqordict, dict):
		for k, v in seqordict.items():
			"""
			PEG Issue: https://github.com/construct/construct/issues/956
			- Loosing initial context (like args = {'rev': '5339'}, passed from first "format.build(obj, args)")
			- Using construct-2.8.12 ...  ;O|
			- This happens on build not on parse 
			- This happens on embeded subconst (Ok we should not use that ;O( ... 
				but really to many dependent things to upgrade on 2.10 without embeded)
			- When it happens, debugging the upper '_' member, seems to point on itself (circular reference). 
				Consequently, its initial context (args) is lost

			Code snippet that make the failing job:
				from construct import *

				FrameCtrl = Struct(	"EndPoint" / Byte )
				STDFrameBuildFail = Struct(
					"FrameCtrl" / Embedded(FrameCtrl),
					"Value" / Computed(2*this._.var)
				)

				Args = dict(var=67)

				# Works:
				theObj=STDFrameBuildFail.parse(b'\x11\x02',Args)
				print(theObj)

				# FAILS because of embeded. won't fail if not present
				theBytes=STDFrameBuildFail.build(theObj,Args)
				print(theBytes)

			Palliative that seems to work:
			The single line below has been changed to avoid circular reference creation : 
			self[k] = v
			"""
			if not(isinstance(v, Container) and k == '_' and self == v):
				self[k] = v
	else:
		for k, v in seqordict:
			self[k] = v
	dict.update(self, kw)
Container.update = _patchFor_Container_update
#=============================================================================

# For debug ...
class PrintContext(Construct):
	def _parse(self, stream, context, path):
		print(context)

"""
	DEBUG: Use Probe(xxx), between subconst
	Exemple:
		Struct(
			"Count" / Int16ub, 
			"Bytes" / BytesTostrHexClass(GreedyBytes),
			Probe(this)
		),
		Probe(this)
	
"""

##### Purge Dict/Container from None values #########
def dictPurgeNoneValues(purged):
	if (isinstance(purged,dict) ):
		for k in list(purged):
			if purged[k] == None:
				del purged[k]
				# print(str(k)+"..DELETED")
			else:
				dictPurgeNoneValues(purged[k])
				
	elif (isinstance(purged,list) ):
		filter(lambda x: x!=None, purged)
		for k,item in enumerate(purged):
			dictPurgeNoneValues(purged[k])
			
	else:
		return purged

##### Bytes/Strings conversion Tools #####################################

class BytesTostrBase64Class(Adapter):
	# make specific EndPoint Encoding/Decoding
	
	def _encode(self, obj, context):
		obj_str = base64.standard_b64decode(obj)
		return obj_str
		
	def _decode(self, obj, context):
		obj_b64 = base64.standard_b64encode(obj).decode()
		return obj_b64
		
BytesTostrBase64 = BytesTostrBase64Class(GreedyBytes)
		
class BytesTostrHexClass(Adapter):
	# make specific EndPoint Encoding/Decoding
	
	def _encode(self, obj, context):
		obj_str = bytearray.fromhex(obj)
		return obj_str
		
	def _decode(self, obj, context):
		obj_hex = binascii.hexlify(obj).decode()
		return obj_hex
 
BytesTostrHex = BytesTostrHexClass(GreedyBytes)
		
class BytesToUTF8Class(Adapter):
	# make specific EndPoint Encoding/Decoding
	
	def _encode(self, obj, context):
		return obj.encode()
		
	def _decode(self, obj, context):
		return obj.decode()
 
BytesTostrHex = BytesTostrHexClass(GreedyBytes)

		
""" 
def rootDictFind(key, myDict):
	for k in myDict:
		print("find2 search : k=%s" % (k))
		if k == key:
			print("find2 Found : k=%s, v=%s" % (k,str(myDict[k])) )
			return myDict[k]
	return None
"""

##### Value search from searchKey (this keyfunc object can be used in Switch (or if)
# IMPORTANT NOTE:
# - Find only a key "name" not a "key path". 
#   TODO: Make it capable of searching path to key: "key1.key2.searchKey"
#   Implies to modify also : fullDictFind
#
def fullDictFind(key, myDict):
	if isinstance(myDict,dict) or isinstance(myDict,list):
		for k in myDict:
			if k[:1] != '_': # Do not search all internal objects alone : _obj,_root etc ... Note: This._root is searched)
				#print("find current key: %s (%s)" % (k,type(myDict)))
				v = myDict[k]
				if ((k == key) and (v is not None)): # Do not accept None values as it may figure that the container attribute is "zombie"
					yield v
				elif isinstance(v, dict):
					for result in fullDictFind(key, v):
						yield result
				elif isinstance(v, list):
					for d in v:
						#print ("=== %s (%s)" % (d,type(d)))
						for result in fullDictFind(key, d):
							yield result

def GetValueFromKeyLookUP(context, searchKey): 
	# This order forces to find closest instance of searched key
	intoList = [this, this._,this._._,this._._._, this._._._._, this._._._._._, this._._._._._._, this._._._._._._._, this._._._._._._._._, this._root]
	foundValue = ""
	for item in intoList:
		try:
			# print("Looking for key '%s' in '%s'" % (searchKey,item))
			container = item(context)
			foundValues = list(fullDictFind(searchKey, container))
			if (len(foundValues) != 0): # Value of FIRST item found returned !!
				foundValue = foundValues[0] 
				# print("Found : '%s' in '%s'" % (foundValue, item))
				break
				
		except KeyError:
			next
	
	return(foundValue)
	

def processHexMsgAndArgsString(hexAndArgsStr):
	# Process input hexadecimal string with name parameters as suffix ZCL.Parse(binMsg,args):
	# "110000500004;param=1,otherparam=toto" 
	
	#Convert ByteArray to string if needed (For exeample, in cases where data is comming from sockets)
	if (isinstance(hexAndArgsStr, (bytes, bytearray))):
		hexAndArgsStr = bytes(hexAndArgsStr).decode()
		
	args={}
	try:
		inputs = hexAndArgsStr.split(';')
		hexMsgInP = inputs[0].strip()
		args={}
		if (len(inputs) > 1):
			if (len(inputs[1].strip()) > 0):
				# Créé un dictionnaire d'argument nommés en supprimant les banc autour des "," ou "="
				args = dict([x.strip() for x in e.split('=')] for e in inputs[1].split(','))
	except Exception as e:
		print("{\"ParametersOrDecodingError\":{\n  \"DtaToProcess\": \"" + hexAndArgsStr + "\", \n  \"Exception\":\"" + str(e) + "\"}}")
		print (
			"Args error: " + hexAndArgsStr + "\n"
			"  Expected Args format : <HexFramePayload>[;lll=vvv[,lll=vvv]*] "
		)
		raise 
		# print (" " )
		# print (e)
	return (hexMsgInP,args)

##### Typicall searched ZCL objects
def FindClusterID(context):
	return(GetValueFromKeyLookUP(context, "ClusterID"))

def FindCommandID(context): 
	return(GetValueFromKeyLookUP(context, "CommandID"))

def FindAttributeID(context): 
	return(GetValueFromKeyLookUP(context, "AttributeID"))

def FindAttributeType(context): 
	return(GetValueFromKeyLookUP(context, "AttributeType"))

def FindFieldIndex(context): 
	return(GetValueFromKeyLookUP(context, "FieldIndex"))

def FindCauseRequest(context): 
	return(GetValueFromKeyLookUP(context, "CauseRequest"))

def FindMode(context): 
	return(GetValueFromKeyLookUP(context, "Mode"))
	
def FindFieldReportParameters(context): 
	return(GetValueFromKeyLookUP(context, "ReportParameters"))
	
def FindFieldReportParameters_New(context): 
	#toto = GetValueFromKeyLookUP(context, "ReportParameters")
	#sys.stdout.write("++++++++++++++++++++++++++++++++")
	#sys.stdout.write("++++++++++++++++++++++++++++++++ %s" % toto)
	return(GetValueFromKeyLookUP(context, "New"))
	
def FindFieldIsBatch(context): 
	return(GetValueFromKeyLookUP(context, "IsBatch"))
	
def FindFieldBitField(context): 
	return(GetValueFromKeyLookUP(context, "BitField"))


def IfValueInListElse(predicate, valueslist, thensubcon, elsesubcon):
    return Switch(
        lambda ctx: (predicate(ctx) if callable(predicate) else predicate) in valueslist,
        {
            True : thensubcon,
            False : elsesubcon,
        },
    )

def IfStrStartWithElse(predicate, startStr, thensubcon, elsesubcon):
    return Switch(
        lambda ctx: (predicate(ctx) if callable(predicate) else predicate)[:len(startStr)] == startStr,
        {
            True : thensubcon,
            False : elsesubcon,
        },
    )


class WTC_RepeatForNBytesOfStream(Subconstruct):
	r"""
	An array that repeats until the required number of bytes ar read. 

	:param nb bytes: Number of byte to read
	:param subcon: the subcon used to parse and build each element
	
	Usefull to read and verify an unknwon number of subcons that should be in number of  bytes
	A bit lik greedyRange, but limited to number of bytes.

	Example:

		>>> RepeatForNBytesOfStream(5, Byte).parse(b"\x01\x02\x03\x04\x05\x06")
		b'\x01\x02\x03\x04\x05'
		>>> RepeatForNBytesOfStream(4, Bytes(2)).parse(b"\x01\x02\x03\x04\x05\x06")
		b'\x01\x02\x03\x04'
	"""
	def __init__(self, nbBytes, subcon):
		super(WTC_RepeatForNBytesOfStream, self).__init__(subcon)
		self.nbBytes = nbBytes
	def _parse(self, stream, context, path):
		nbBytes = self.nbBytes(context) if callable(self.nbBytes) else self.nbBytes
		self.startByteIdx=stream.tell()
		
		# Verify if enough Bytes are available
		data = stream.read(nbBytes) 
		stream.seek(self.startByteIdx,0) # Back to initial position
		if len(data) != nbBytes:
			raise RangeError("Could not read enough bytes, expected %d, found %d" % (nbBytes, len(data)))

		obj = []
		while True:
			try:
				subobj = self.subcon._parse(stream, context, path)
			except ConstructError:
				raise 
			
			curByteIdx=stream.tell()
			#print("Parse: %s-%s, %s ? %s " % (self.startByteIdx,curByteIdx,(curByteIdx - self.startByteIdx),nbBytes))
			if (curByteIdx - self.startByteIdx == nbBytes) :
				obj.append(subobj)
				return ListContainer(obj)
			elif (curByteIdx - self.startByteIdx < nbBytes):
				obj.append(subobj)
			else :
				raise RangeError("Nb bytes (%d) not coherent with subcons list parsing" % nbBytes)
			
	def _build(self, obj, stream, context, path):
		nbBytes = self.nbBytes(context) if callable(self.nbBytes) else self.nbBytes
		self.startByteIdx=stream.tell()
		
		for i, subobj in enumerate(obj):
			try:
				self.subcon._build(subobj, stream, context, path)
				curByteIdx=stream.tell()
			except ConstructError:
				raise
			
			# print("Build: %4-%s, %s ? %s " % (self.startByteIdx,curByteIdx,(curByteIdx - self.startByteIdx),nbBytes))
			if (curByteIdx - self.startByteIdx == nbBytes) :
				break
			elif (curByteIdx - self.startByteIdx > nbBytes):
				raise RangeError("Nb bytes (%d) not coherent with subcons list building" % nbBytes)
					
	def _sizeof(self, context, path):
		raise SizeofError("cannot calculate size")
