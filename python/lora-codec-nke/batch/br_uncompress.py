#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""br_uncompress implementation in Python."""

import batch.constants as constants
from collections import namedtuple
import struct
from datetime import datetime
import sys
from argparse import ArgumentParser
from decimal import Decimal
import json
import ctypes


# Tag object representation
Tag = namedtuple("Tag", "size lbl")


class Printer:
    def __init__(self, muted=True):
        self._muted = muted

    def print(self, message, end="\n"):
        if not self._muted:
            print(message, end=end)

    def mute(self):
        self._muted = True

    def unmute(self):
        self._muted = False


P = Printer()


class SzError(Exception):
    pass


class Buffer:
    """Represent the byte array buffer that is read to extract the data"""

    def __init__(self, byte_array):
        self.index = 0
        self.array = byte_array

    def next_sample(self, sample_type, nb_bits):
        """Extact the next sample from the data."""

        src_bit_start = self.index
        self.index += nb_bits
        if sample_type == constants.ST_FL and nb_bits != 32:
            raise Exception(f"Mauvais sample type ({sample_type})")
        u32 = 0
        nbytes = int((nb_bits - 1) / 8) + 1
        nbitsfrombyte = nb_bits % 8
        if nbitsfrombyte == 0 and nbytes > 0:
            nbitsfrombyte = 8

        while nbytes > 0:
            bit_to_read = 0
            while nbitsfrombyte > 0:
                idx = src_bit_start >> 3
                if self.array[idx] & (1 << (src_bit_start & 0x07)):
                    u32 |= 1 << ((nbytes - 1) * 8 + bit_to_read)
                nbitsfrombyte -= 1
                bit_to_read += 1
                src_bit_start += 1
            nbytes -= 1
            nbitsfrombyte = 8

        if sample_type in (constants.ST_I4, constants.ST_I8, constants.ST_I16, constants.ST_I24) and u32 & (
            1 << (nb_bits - 1)
        ):
            for i in range(nb_bits, 64):
                u32 |= 1 << i
                nb_bits += 1

        if sample_type in (constants.ST_I4, constants.ST_I8, constants.ST_I16, constants.ST_I24, constants.ST_I32) and u32 & (
            1 << (nb_bits - 1)
        ):
            return ctypes.c_longlong(u32).value
        return u32

    def next_bi_from_hi(self, huff_coding):
        """Extract the next bi from the data"""
        for i in range(2, 12):
            lhuff = self._bits_buf2HuffPattern(i)
            for j in range(constants.NB_HUFF_ELEMENT):
                if (
                    constants.huff[huff_coding][j]["sz"] == i
                    and lhuff == constants.huff[huff_coding][j]["lbl"]
                ):
                    self.index += i
                    # sz, bi
                    return (i, j)
        self.index += 0
        raise SzError

    def _bits_buf2HuffPattern(self, nb_bits):
        """Convert bits to huff pattern"""
        src_bit_start = self.index
        sz = nb_bits - 1
        if len(self.array) * 8 < src_bit_start + nb_bits:
            raise Exception(
                f"Verify that dest buf is large enough ( {len(self.array)}, {src_bit_start}, {nb_bits})")
        bittoread = 0
        pattern = 0
        while nb_bits > 0:
            if self.array[src_bit_start >> 3] & (1 << (src_bit_start & 0x07)):
                pattern |= 1 << (sz - bittoread)
            nb_bits -= 1
            bittoread += 1
            src_bit_start += 1
        return pattern


class Flag:
    """Represent the flag written at the beginning of the data."""

    def __init__(self, flag_as_int):
        bin_str = f"{flag_as_int:08b}"
        self.cts = int(bin_str[-2], 2)
        self.no_sample = int(bin_str[-3], 2)
        self.batch_req = int(bin_str[-4], 2)
        self.nb_of_type_measure = int(bin_str[:4], 2)


class Serie:
    """Represent a data serie"""

    def __init__(self):
        self.coding_type = 0
        self.coding_table = 0
        self.compress_sample_nb = 0
        self.resolution = None
        self.uncompress_samples = []


class Measure:
    """Represent a sample measure, with timestamp and data"""

    def __init__(self, timestamp):
        self.data_relative_timestamp = timestamp
        self.data = MeasuredData()


class MeasuredData:
    """Represent measured data,with value and label"""

    def __init__(self):
        self.value = None
        self.label = None


class UncompressedData:
    """Uncompressed data, used as output for the program"""

    def __init__(self):
        self.batch_counter = 0
        self.batch_relative_timestamp = 0
        self.series = [Serie() for i in range(constants.NUMBER_OF_SERIES)]


def main():
    """Called when invoking from command line"""
    args = parse_args()
    '''input_data = sys.stdin.buffer.read()'''
    """type(input_data)"""
    new_input = None
    commands = split_commands(args.command)
    if args.verbose:
        P.unmute()
    if args.inputframe:
        input_data = args.inputframe
        type(input_data)
    if args.ascii:
       # '''new_input = input_data .decode("ascii")'''
        new_input = input_data
    else:
        new_input = "".join([f"{c:02x}" for c in input_data])
    if args.timestamp:
        # date = date.isoformat(timespec='milliseconds')
        print(json.dumps(uncompress(args.tagsz, commands,
              new_input, args.timestamp), indent=4))
    else:
        date = datetime.now().strftime("%y-%m-%dT%H:%M:%S.%f")
        date = datetime.now().isoformat(timespec='milliseconds')
        print(json.dumps(uncompress(args.tagsz, commands, new_input, date), indent=4))
    # date = date.isoformat(timespec='microseconds')
    # date = '2018-11-05T10:35:09.685Z'
    #


def parse_args():
    """Parse command line arguments"""

    doc = """Python implementation of br_uncompress. It takes the compressed data as an ascii hex string from stdin and decode it regarding provided command.

    Allow following usages:
      py br_uncompress.py -a 3 2,1.0,12 -if $10$27$00$80$03$93$20$18$00$80$10$81$83$07$0d$45$85$10$05
    or
      py br_uncompress.py -a 3 2,10,9 1,10,7 4,30,10 3,10,4 5,10,6 6,1,4 -if 404780800a5800000442ca8a4048fd395c817e21cb9a40028fd5379de3768b4f816e75a6e376006e2d800066"""

    p = ArgumentParser(description=doc)
    p.add_argument("tagsz", type=int)
    p.add_argument(
        "command",
        nargs="*",
        help='In form of "taglbl,resol,sampletype" "..." or "taglbl,resol,sampletype,taglbl" ',
    )
    p.add_argument(
        "-if",
        "--inputframe",
        help="input Frame data",
    )
    p.add_argument(
        "-a",
        "--ascii",
        action="store_true",
        help="Input buf must be considered as ascii hexa bytes either than usual raw bytes: 'hhhhhh...' or 'hh hh hh...' or '$HH$HH$HH...'",
    )
    p.add_argument(
        "-t",
        "--timestamp",
        help="Timestamp of the measure in iso format like 2018-11-05T10:35:09.685Z",
    )
    p.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Print details of the process on standard output",
    )
    return p.parse_args()


def split_commands(commands):
    """Split command arguments into an arg_list obect to be passed to uncompress
    function"""
    out = []
    for c in commands:
        splitted = c.split(",")
        if len(splitted) == 4:
            out.append(
                {
                    "taglbl": int(splitted[0]),
                    "resol": float(splitted[1]),
                    "sampletype": int(splitted[2]),
                    "lblname": splitted[3],
                }
            )
        elif len(splitted) == 3:
            out.append(
                {
                    "taglbl": int(splitted[0]),
                    "resol": float(splitted[1]),
                    "sampletype": int(splitted[2]),
                }
            )
        else:
            raise Exception(f"Incomplete command: {c}")
    return out


def uncompress(tagsz, arg_list, hex_string, batch_absolute_timestamp=None):
    """Uncompress function

    :param tagsz: Tag size
    :param arg_list: list of dicts containing command data. Keys are taglbl, resol, sampletype and optionally lblname
    :param hex_string: compressed data represented as an ascii hexadecimal string
    :param batch_absolute_timestamp: timestamp of the measure in iso format used to calculate data absolute timestamp
    """
    # Remark: it's a direct translation of the C fonction and could be
    # refactored. Associated unit tests provide a decent harness to do so.
    out = UncompressedData()
    array = hex_to_array(hex_string)
    data_buffer = Buffer(array)

    flag = Flag(data_buffer.next_sample(constants.ST_U8, 8))

    P.print(f"nb_of_type_measure: {flag.nb_of_type_measure}")
    P.print(f"batch requested: {flag.batch_req}")
    P.print(f"no sample: {flag.no_sample}")
    P.print(f"cts: {flag.cts}")

    counter = data_buffer.next_sample(constants.ST_U8, 3)
    P.print(f"cnt: {counter}")
    out.batch_counter = counter

    ltemp2 = data_buffer.next_sample(constants.ST_U8, 1)

    abs_timestamp = last_timestamp = 0
    index_of_the_first_sample = 0
    for i in range(flag.nb_of_type_measure):
        tag = Tag(size=tagsz, lbl=data_buffer.next_sample(
            constants.ST_U8, tagsz))
        P.print(f"tag lbl: {tag.lbl}")
        ii = find_index_of_lbl(arg_list, tag.lbl)
        P.print(f" tag: {tag.lbl} index {ii}", end="")
        if i == 0:
            index_of_the_first_sample = ii
            timestamp = data_buffer.next_sample(
                constants.ST_U8, bm_st_sz(constants.ST_U32)
            )
            abs_timestamp = timestamp
            out.series[ii].uncompress_samples.append(Measure(timestamp))
            P.print(f"  timestamp {timestamp}", end="")
        else:
            sz, bi = data_buffer.next_bi_from_hi(1)
            P.print(f" bi {bi}, sz {sz}", end="")
            if not sz:
                raise Exception("Wrong sz from szbi")
            t = 0
            if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
                if bi > 0:
                    t = data_buffer.next_sample(constants.ST_U32, bi)
                    P.print(f" raw: {t}", end="")
                    t += abs_timestamp + 2 ** bi - 1
                else:
                    t = abs_timestamp
            else:
                t = data_buffer.next_sample(
                    constants.ST_U32, bm_st_sz(constants.ST_U32)
                )
            out.series[ii].uncompress_samples.append(Measure(t))
            abs_timestamp = t
            P.print(f"  timestamp: {abs_timestamp}", end="")
        last_timestamp = abs_timestamp

        # Measure
        v = data_buffer.next_sample(
            arg_list[ii]["sampletype"], bm_st_sz(arg_list[ii]["sampletype"])
        )

        if arg_list[ii]["sampletype"] == constants.ST_FL:
            out.series[ii].uncompress_samples[0].data.value = to_float(v)
        else:
            out.series[ii].uncompress_samples[0].data.value = v
        out.series[ii].uncompress_samples[0].data.label = tag.lbl
        P.print(
            f" Measure {out.series[ii].uncompress_samples[0].data.value}", end="")

        if not flag.no_sample:
            out.series[ii].coding_type = data_buffer.next_sample(
                constants.ST_U8, 2)
            out.series[ii].coding_table = data_buffer.next_sample(
                constants.ST_U8, 2)
            P.print(
                f" Coding type {out.series[ii].coding_type}, Coding table {out.series[ii].coding_table}"
            )

    if not flag.no_sample:
        if flag.cts:
            P.print("common time stamp")
            # number of sample
            nb_sample_to_parse = data_buffer.next_sample(constants.ST_U8, 8)
            P.print(f" number of sample: {nb_sample_to_parse}")

            # TimeStamp Coding
            ltimestamp_coding = data_buffer.next_sample(constants.ST_U8, 2)
            P.print(f" TimeStamp Coding(0-A/1-B/2-C): {ltimestamp_coding}")
            timestamp_common = []
            for i in range(nb_sample_to_parse):
                sz, bi = data_buffer.next_bi_from_hi(ltimestamp_coding)
                if not sz:
                    raise Exception("sz")
                P.print("")
                P.print(f"bi: {bi} sz: {sz}")
                if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
                    if i == 0:
                        timestamp_common.append(
                            out.series[index_of_the_first_sample]
                            .uncompress_samples[0]
                            .data_relative_timestamp
                        )
                    else:
                        if bi > 0:
                            raw = data_buffer.next_sample(constants.ST_U32, bi)
                            P.print(f"  raw {raw}", end="")
                            timestamp_common.append(
                                raw + timestamp_common[i - 1] + 2 ** bi - 1
                            )
                        else:
                            timestamp_common.append(timestamp_common[i - 1])
                else:
                    timestamp_common.append(
                        data_buffer.next_sample(
                            constants.ST_U32, bm_st_sz(constants.ST_U32)
                        )
                    )
                last_timestamp = timestamp_common[i]
                P.print(f" timestamp: {last_timestamp}", end="")

            for j in range(flag.nb_of_type_measure):
                first_null_delta_value = 1
                tag = Tag(
                    size=tagsz, lbl=data_buffer.next_sample(
                        constants.ST_U8, tagsz)
                )
                P.print("")
                P.print(f" tag: {tag.lbl}", end="")
                ii = find_index_of_lbl(arg_list, tag.lbl)
                P.print(f" index: {ii}", end="")
                for i in range(0, nb_sample_to_parse):
                    # available bit
                    available = data_buffer.next_sample(constants.ST_U8, 1)
                    P.print(f"\n{i}. available {available}")
                    if available:
                        P.print(
                            f"coding table: {out.series[ii].coding_table}", end="")
                        # Delta value
                        sz, bi = data_buffer.next_bi_from_hi(
                            out.series[ii].coding_table
                        )
                        P.print(f"\nWrong sz ? : {sz}")
                        if not sz:
                            raise Exception("Wrong sz")
                        P.print(f" bi: {bi} sz: {sz}", end="")
                        current_measure = Measure(0)
                        if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
                            if bi > 0:
                                current_measure.data.value = data_buffer.next_sample(
                                    constants.ST_U16, bi
                                )
                                P.print(
                                    f" RawValue: {current_measure.data.value}", end=""
                                )
                                if out.series[ii].coding_type == 0:
                                    # ADLC
                                    if current_measure.data.value >= 2 ** (bi - 1):
                                        current_measure.data.value *= arg_list[ii][
                                            "resol"
                                        ]
                                        current_measure.data.value += (
                                            out.series[ii]
                                            .uncompress_samples[-1]
                                            .data.value
                                        )
                                    else:
                                        current_measure.data.value += 1 - 2 ** bi
                                        current_measure.data.value *= arg_list[ii][
                                            "resol"
                                        ]
                                        current_measure.data.value += (
                                            out.series[ii]
                                            .uncompress_samples[-1]
                                            .data.value
                                        )
                                elif out.series[ii].coding_type == 1:
                                    # Positive
                                    current_measure.data.value += 2 ** bi - 1
                                    current_measure.data.value *= arg_list[ii]["resol"]
                                    current_measure.data.value += (
                                        out.series[ii].uncompress_samples[-1].data.value
                                    )
                                else:
                                    # Negative
                                    current_measure.data.value += 2 ** bi - 1
                                    current_measure.data.value *= arg_list[ii]["resol"]
                                    current_measure.data.value = (
                                        out.series[ii].uncompress_samples[-1].data.value
                                        - current_measure.data.value
                                    )
                                P.print(
                                    f"  Value: {current_measure.data.value}", end=""
                                )
                            else:  # bi <= 0
                                if first_null_delta_value:
                                    first_null_delta_value = 0
                                    continue
                                else:
                                    current_measure.data.value = (
                                        out.series[ii].uncompress_samples[-1].data.value
                                    )
                                    P.print(
                                        f"  Value: {current_measure.data.value}", end=""
                                    )
                        else:  # bi > constants.BR_HUFF_MAX_INDEX_TABLE
                            current_measure.data.value = data_buffer.next_sample(
                                arg_list[ii]["sampletype"],
                                bm_st_sz(arg_list[ii]["sampletype"]),
                            )
                            P.print(f"Complete: {current_measure.data.value}")
                        current_measure.data_relative_timestamp = timestamp_common[i]
                        P.print(
                            f" TimeStamp: {current_measure.data_relative_timestamp}"
                        )
                        out.series[ii].uncompress_samples.append(
                            current_measure)
        else:
            P.print("separate time stamp")
            for i in range(flag.nb_of_type_measure):
                tag = Tag(
                    size=tagsz, lbl=data_buffer.next_sample(
                        constants.ST_U8, tagsz)
                )
                ii = find_index_of_lbl(arg_list, tag.lbl)
                compress_samples_nb = data_buffer.next_sample(
                    constants.ST_U8, 8)
                P.print(
                    f" tag: {tag.lbl} index {ii} number of sample {compress_samples_nb}"
                )
                # 528
                if compress_samples_nb:
                    ltimestamp_coding = data_buffer.next_sample(
                        constants.ST_U8, 2)
                    P.print(f" TimeStamp Coding: {ltimestamp_coding}")
                    for j in range(compress_samples_nb):
                        current_measure = Measure(0)
                        sz, bi = data_buffer.next_bi_from_hi(ltimestamp_coding)
                        if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
                            if bi > 0:
                                t = data_buffer.next_sample(
                                    constants.ST_U32, bi)
                                P.print(
                                    f"  j: {j} bi: {bi} sz: {sz} Huffindex {t}", end=""
                                )
                                current_measure.data_relative_timestamp = (
                                    t
                                    + out.series[ii]
                                    .uncompress_samples[-1]
                                    .data_relative_timestamp
                                    + 2 ** bi
                                    - 1
                                )
                            else:
                                current_measure.data_relative_timestamp = (
                                    out.series[ii]
                                    .uncompress_samples[-1]
                                    .data_relative_timestamp
                                )
                            P.print(
                                f" timestamp {current_measure.data_relative_timestamp}"
                            )
                        else:  # bi > BR_HUFF_MAX_INDEX_TABLE
                            current_measure.data_relative_timestamp = data_buffer.next_sample(
                                constants.ST_U32, bm_st_sz(constants.ST_U32)
                            )

                        if current_measure.data_relative_timestamp > last_timestamp:
                            last_timestamp = current_measure.data_relative_timestamp
                        sz, bi = data_buffer.next_bi_from_hi(
                            out.series[ii].coding_table
                        )
                        if not sz:
                            raise Exception("sz")
                        P.print(f" bi: {bi} sz: {sz}", end="")
                        if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
                            if bi > 0:
                                current_measure.data.value = data_buffer.next_sample(
                                    constants.ST_U16, bi
                                )
                                if out.series[ii].coding_type == 0:
                                    # ADLC
                                    if current_measure.data.value >= 2 ** (bi - 1):
                                        current_measure.data.value *= arg_list[ii][
                                            "resol"
                                        ]
                                        current_measure.data.value += (
                                            out.series[ii]
                                            .uncompress_samples[-1]
                                            .data.value
                                        )
                                    else:
                                        current_measure.data.value += 1 - 2 ** bi
                                        current_measure.data.value *= arg_list[ii][
                                            "resol"
                                        ]
                                        current_measure.data.value += (
                                            out.series[ii]
                                            .uncompress_samples[-1]
                                            .data.value
                                        )
                                elif out.series[ii].coding_type == 1:
                                    # Positive
                                    current_measure.data.value += 2 ** bi - 1
                                    current_measure.data.value *= arg_list[ii]["resol"]
                                    current_measure.data.value += (
                                        out.series[ii].uncompress_samples[-1].data.value
                                    )
                                else:
                                    # Negative
                                    current_measure.data.value += 2 ** bi - 1
                                    current_measure.data.value *= arg_list[ii]["resol"]
                                    current_measure.data.value = (
                                        out.series[ii].uncompress_samples[-1].data.value
                                        - current_measure.data.value
                                    )
                                P.print(
                                    f"  Value: {current_measure.data.value}")
                            else:  # bi <= 0
                                current_measure.data.value = (
                                    out.series[ii].uncompress_samples[-1].data.value
                                )
                                P.print(
                                    f"  Value: {current_measure.data.value}")
                        else:  # bi > BR_HUFF_MAX_INDEX_TABLE
                            current_measure.data.value = data_buffer.next_sample(
                                arg_list[ii]["sampletype"],
                                bm_st_sz(arg_list[ii]["sampletype"]),
                            )
                            P.print(f"  Complete {current_measure.value}")
                        out.series[ii].uncompress_samples.append(
                            current_measure)
    P.print("\nTimestamp of the sending")
    global_timestamp = 0
    if not last_timestamp:
        global_timestamp = data_buffer.next_sample(
            constants.ST_U32, bm_st_sz(constants.ST_U32)
        )
    else:
        sz, bi = data_buffer.next_bi_from_hi(1)
        P.print(f"bi: {bi} sz: {sz}", end="")
        if not sz:
            raise Exception("sz")
        if bi <= constants.BR_HUFF_MAX_INDEX_TABLE:
            if bi > 0:
                global_timestamp = data_buffer.next_sample(
                    constants.ST_U32, bi)
                P.print(f" raw: {global_timestamp}", end="")
                global_timestamp += last_timestamp + 2 ** bi - 1
            else:
                global_timestamp = last_timestamp
        else:
            global_timestamp = data_buffer.next_sample(
                constants.ST_U32, bm_st_sz(constants.ST_U32)
            )
        P.print(f" timestamp: {global_timestamp}")
        out.batch_relative_timestamp = global_timestamp

    P.print("\nUNCOMPRESS SERIE")
    P.print(f"cnt: {out.batch_counter}")
    P.print(f"{out.batch_relative_timestamp}")
    for ind, s in enumerate(out.series):
        for sample in s.uncompress_samples:
            P.print(
                f"{sample.data_relative_timestamp} {arg_list[ind]['taglbl']} {sample.data.value} {arg_list[ind].get('lblname', '')}"
            )
        if s.uncompress_samples:
            P.print("")
    return format_expected_uncompress_result(out, arg_list, batch_absolute_timestamp)


def format_expected_uncompress_result(
    out: UncompressedData, arg_list, batch_absolute_timestamp
):
    """Translate uncompress output into the expected dict structure"""
    output = {
        "batch_counter": out.batch_counter,
        "batch_relative_timestamp": out.batch_relative_timestamp,
    }
    if batch_absolute_timestamp:
        output["batch_absolute_timestamp"] = batch_absolute_timestamp
    dataset = []
    for index, serie in enumerate(out.series):
        for sample in serie.uncompress_samples:
            measure = {
                "data_relative_timestamp": sample.data_relative_timestamp,
                "data": {
                    "value": sample.data.value,
                    "label": arg_list[index]["taglbl"],
                },
            }
            if "lblname" in arg_list[index]:
                measure["data"]["label_name"] = arg_list[index]["lblname"]
            dataset.append(measure)
            if batch_absolute_timestamp:
                measure["data_absolute_timestamp"] = compute_data_absolute_timestamp(
                    batch_absolute_timestamp,
                    out.batch_relative_timestamp,
                    sample.data_relative_timestamp,
                )

    output["dataset"] = dataset
    return output


def compute_data_absolute_timestamp(bat: str, brt: int, drt: int):
    """Compute data absolute timestamp from batch absolute timestamp, batch relative timestamp and data relative timestamp. Teturn the TS in ISO Format.

    :param bat: Batch Absolute Timestamp in ISO format
    :param brt: Batch Relative Timestamp as int
    :param drt: Data Relative Timestamp as int
    """
    d, t = bat.rstrip("Z").split("T")
    Y, M, D = [int(x) for x in d.split("-")]
    h, m, s = t.split(":")
    ss, ms = s.split(".")
    from_ts = datetime(Y, M, D, int(h), int(m), int(ss), int(ms) * 1000)
    return (
        datetime.fromtimestamp(from_ts.timestamp() - (brt - drt)).isoformat(
            timespec="milliseconds"
        )
        + "Z"
    )


def is_hex(c: str):
    """Tel if a character is an hexadecimal char."""
    try:
        _ = int(c, 16)
        return True
    except ValueError:
        return False


def hex_to_array(hex_string):
    """Convert an hexadecimal string to a list of intergers"""
    filtered = [c for c in hex_string if is_hex(c)]
    out = []

    i = 0
    while i < len(filtered):
        out.append(int(filtered[i] + filtered[i + 1], 16))
        i += 2
    return out


def find_index_of_lbl(arg_list, label):
    """Find index of label in arg_list"""
    for i, value in enumerate(arg_list):
        if value["taglbl"] == label:
            return i
    else:
        raise Exception("Cannot find index in arg_list")


def bm_st_sz(st):
    if st > constants.ST_I24:
        return 32
    if st > constants.ST_I16:
        return 24
    if st > constants.ST_I8:
        return 16
    if st > constants.ST_I4:
        return 8
    if st > constants.ST_BL:
        return 4
    if st > constants.ST_UNDEF:
        return 1
    return 0


def to_float(number):
    """Convert 4 bytes into the associated float representation"""
    return struct.unpack(">f", number.to_bytes(4, "big"))[0]


if __name__ == "__main__":
    main()
