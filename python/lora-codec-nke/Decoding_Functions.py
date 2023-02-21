# -*- coding: utf-8 -*-

import json
from ZCL_FRAME import *
from ZCL import *
import datetime
from binascii import hexlify, unhexlify
from batch.br_uncompress import uncompress
from batch.constants import models


version = 'NKE_Frame_Codec_v_1.0.svn5087'


# -- coding/decoding in JSON


def Decoding_JSON(trame, model):
    d = {}
    d['version'] = version
    d['TimeStamp'] = datetime.datetime.now()

# Extract eventual parameters from end of input hexstring
    (trame, args) = processHexMsgAndArgsString(trame)
# print(args)

    isBatch = FrameCtrl.parse(unhexlify(trame))["Report"] == "Batch"
    if isBatch:
        decodedResult = uncompress(
            models[model]["tagsz"], models[model]["args"], trame)
    else:
        decodedResult = STDFrame.parse(unhexlify(trame), args)

    return decodedResult


def Encoding_JSON(trame):
    trame = bytearray(STDFrame.build(json.loads(trame)))
    if (trame[1] == 6 and (trame[4]) & 1 != 0 and trame[4] != 255):
        trame[4] = ((len(trame)-7) << 1) + 1
    print(hexlify(trame))
