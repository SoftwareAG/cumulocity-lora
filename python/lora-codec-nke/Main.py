#! /usr/bin/env python3
# -*- coding: utf-8 -*-

from Decoding_Functions import *
import argparse

# HUBO post processing (uncomment to test)
# from Modbus_Tools import *


def doDecode(frame, model):
    print(Decoding_JSON(frame, model))


parser = argparse.ArgumentParser(description="NKE Watteco DECODER")
parser.add_argument("-m", "--mode", default='d', const='d', nargs='?', choices=[
                    'd', 'e'], help='Select the mode : [d=decode e=encode] default is "d" ; encode needs json input')

parser.add_argument("-if", "--inputframe", default='-', const='-', nargs='?',
                    help='select the frame input : [- = std input; "hexstring";  ] default is "-" ')

parser.add_argument("-model", "--model")

args = parser.parse_args()


if args.mode == 'd':
    print(doDecode(args.inputframe, args.model))

elif args.mode == 'e':
    for frame in sys.stdin:
        frame = frame.rstrip()
        Encoding_JSON(frame)
