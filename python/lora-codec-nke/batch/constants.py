#!/usr/bin/env python
# -*- coding: utf-8 -*-

models = {
    "50-70-053": {"tagsz": 2,
                  "args": [{"taglbl": 0, "resol": 10, "sampletype": 7, "lblname": "Temperature"},
                           {"taglbl": 1, "resol": 100,
                               "sampletype": 6, "lblname": "Humidity"},
                           {"taglbl": 2, "resol": 1,
                               "sampletype": 6, "lblname": "Battery"},
                           {"taglbl": 3, "resol": 1, "sampletype": 1, "lblname": "OpenCase"}]}
}

ST_UNDEF = 0
ST_BL = 1
ST_U4 = 2
ST_I4 = 3
ST_U8 = 4
ST_I8 = 5
ST_U16 = 6
ST_I16 = 7
ST_U24 = 8
ST_I24 = 9
ST_U32 = 10
ST_I32 = 11
ST_FL = 12

BR_HUFF_MAX_INDEX_TABLE = 14
NB_HUFF_ELEMENT = 16
NUMBER_OF_SERIES = 16

huff = [
    [
        {"sz": 2, "lbl": 0x000},
        {"sz": 2, "lbl": 0x001},
        {"sz": 2, "lbl": 0x003},
        {"sz": 3, "lbl": 0x005},
        {"sz": 4, "lbl": 0x009},
        {"sz": 5, "lbl": 0x011},
        {"sz": 6, "lbl": 0x021},
        {"sz": 7, "lbl": 0x041},
        {"sz": 8, "lbl": 0x081},
        {"sz": 10, "lbl": 0x200},
        {"sz": 11, "lbl": 0x402},
        {"sz": 11, "lbl": 0x403},
        {"sz": 11, "lbl": 0x404},
        {"sz": 11, "lbl": 0x405},
        {"sz": 11, "lbl": 0x406},
        {"sz": 11, "lbl": 0x407},
    ],
    [
        {"sz": 7, "lbl": 0x06f},
        {"sz": 5, "lbl": 0x01a},
        {"sz": 4, "lbl": 0x00c},
        {"sz": 3, "lbl": 0x003},
        {"sz": 3, "lbl": 0x007},
        {"sz": 2, "lbl": 0x002},
        {"sz": 2, "lbl": 0x000},
        {"sz": 3, "lbl": 0x002},
        {"sz": 6, "lbl": 0x036},
        {"sz": 9, "lbl": 0x1bb},
        {"sz": 9, "lbl": 0x1b9},
        {"sz": 10, "lbl": 0x375},
        {"sz": 10, "lbl": 0x374},
        {"sz": 10, "lbl": 0x370},
        {"sz": 11, "lbl": 0x6e3},
        {"sz": 11, "lbl": 0x6e2},
    ],
    [
        {"sz": 4, "lbl": 0x009},
        {"sz": 3, "lbl": 0x005},
        {"sz": 2, "lbl": 0x000},
        {"sz": 2, "lbl": 0x001},
        {"sz": 2, "lbl": 0x003},
        {"sz": 5, "lbl": 0x011},
        {"sz": 6, "lbl": 0x021},
        {"sz": 7, "lbl": 0x041},
        {"sz": 8, "lbl": 0x081},
        {"sz": 10, "lbl": 0x200},
        {"sz": 11, "lbl": 0x402},
        {"sz": 11, "lbl": 0x403},
        {"sz": 11, "lbl": 0x404},
        {"sz": 11, "lbl": 0x405},
        {"sz": 11, "lbl": 0x406},
        {"sz": 11, "lbl": 0x407},
    ],
]
