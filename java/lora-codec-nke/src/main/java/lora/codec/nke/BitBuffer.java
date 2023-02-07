package lora.codec.nke;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BitBuffer {
    static final int ST_UNDEF = 0;
    static final int ST_BL = 1;
    static final int ST_U4 = 2;
    static final int ST_I4 = 3;
    static final int ST_U8 = 4;
    static final int ST_I8 = 5;
    static final int ST_U16 = 6;
    static final int ST_I16 = 7;
    static final int ST_U24 = 8;
    static final int ST_I24 = 9;
    static final int ST_U32 = 10;
    static final int ST_I32 = 11;
    static final int ST_FL = 12;

    static final int[] ST = new int[] {0, 1, 4, 4, 8, 8, 16, 16, 24, 24, 32, 32, 32};

	private final Logger logger = LoggerFactory.getLogger(getClass());

    private static class HuffNode {
        int sz;
        int lbl;

        public HuffNode(int sz, int lbl) {
            this.sz = sz;
            this.lbl = lbl;
        }
    }

    static final HuffNode[][] HUFF = new HuffNode[][] {
            { new HuffNode(2, 0x000), new HuffNode(2, 0x001), new HuffNode(2, 0x003), new HuffNode(3, 0x005),
                    new HuffNode(4, 0x009), new HuffNode(5, 0x011), new HuffNode(6, 0x021), new HuffNode(7, 0x041),
                    new HuffNode(8, 0x081), new HuffNode(10, 0x200), new HuffNode(11, 0x402), new HuffNode(11, 0x403),
                    new HuffNode(11, 0x404), new HuffNode(11, 0x405), new HuffNode(11, 0x406),
                    new HuffNode(11, 0x407) },
            { new HuffNode(7, 0x06f), new HuffNode(5, 0x01a), new HuffNode(4, 0x00c), new HuffNode(3, 0x003),
                    new HuffNode(3, 0x007), new HuffNode(2, 0x002), new HuffNode(2, 0x000), new HuffNode(3, 0x002),
                    new HuffNode(6, 0x036), new HuffNode(9, 0x1bb), new HuffNode(9, 0x1b9), new HuffNode(10, 0x375),
                    new HuffNode(10, 0x374), new HuffNode(10, 0x370), new HuffNode(11, 0x6e3),
                    new HuffNode(11, 0x6e2) },
            { new HuffNode(4, 0x009), new HuffNode(3, 0x005), new HuffNode(2, 0x000), new HuffNode(2, 0x001),
                    new HuffNode(2, 0x003), new HuffNode(5, 0x011), new HuffNode(6, 0x021), new HuffNode(7, 0x041),
                    new HuffNode(8, 0x081), new HuffNode(10, 0x200), new HuffNode(11, 0x402), new HuffNode(11, 0x403),
                    new HuffNode(11, 0x404), new HuffNode(11, 0x405), new HuffNode(11, 0x406),
                    new HuffNode(11, 0x407) } };

    private byte[] byteArray;
    private int index = 0;

    public BitBuffer(byte[] byteArray) {
        this.byteArray = byteArray;
    }

    private double trunc(double x) {
        if (x > 0) {
            return Math.floor(x);
        }
        return Math.ceil(x);
    }

    private int bitsBuf2HuffPattern(int nb_bits) throws Exception {
        int sourceBitStart = index;
        int sz = nb_bits - 1;
        if (byteArray.length * 8 < sourceBitStart + nb_bits) {
            throw new Exception("Verify that dest buf is large enough");
        }
        int bittoread = 0;
        int pattern = 0;
        while (nb_bits > 0) {
            if (((byteArray[sourceBitStart >> 3] & 0xff) & (1 << (sourceBitStart & 0x07))) != 0) {
                pattern |= 1 << (sz - bittoread);
            }
            nb_bits--;
            bittoread++;
            sourceBitStart++;
        }
        return pattern;
    }

    public int getNextSample(int sampleType) throws Exception {
        return getNextSample(sampleType, ST[sampleType]);
    }

    public int getNextSample(int sampleType, int nbBitsInput) throws Exception {
        int nbBits = nbBitsInput;
        int sourceBitStart = this.index;
        this.index += nbBits;
        if (sampleType == ST_FL && nbBits != 32) {
            throw new Exception("Mauvais sampletype");
        }

        int u32 = 0;
        //int nbytes = (int) trunc(((double) nbBits - 1.0) / 8.0) + 1;
        int nbytes = ((nbBits - 1) >> 3) + 1;
        int nbitsfrombyte = nbBits % 8;
        if (nbitsfrombyte == 0 && nbytes > 0) {
            nbitsfrombyte = 8;
        }

        while (nbytes > 0) {
            int bittoread = 0;
            while (nbitsfrombyte > 0) {
                int idx = sourceBitStart >> 3;
                if (((this.byteArray[idx] & 0xff) & (1 << (sourceBitStart & 0x07))) != 0) {
                    u32 |= 1 << ((nbytes - 1) * 8 + bittoread);
                }
                nbitsfrombyte--;
                bittoread++;
                sourceBitStart += 1;
            }
            nbytes--;
            nbitsfrombyte = 8;
        }
        // Propagate the sign bit if 1
        if ((sampleType == ST_I4 || sampleType == ST_I24) && ((u32 & (1 << (nbBits - 1))) != 0)) {
            for (int i = nbBits; i < 32; i++) {
                u32 |= 1 << i;
                nbBits++;
            }
        }
        logger.info("Got sample {}", u32);
        return u32;
    }

    public int getNextBifromHi(int huff_coding) throws Exception {
        for (int i = 2; i < 12; i++) {
            int lhuff = bitsBuf2HuffPattern(i);
            for (int j = 0; j < HUFF[huff_coding].length; j++) {
                if (HUFF[huff_coding][j].sz == i && lhuff == HUFF[huff_coding][j].lbl) {
                    this.index += i;
                    return j;
                }
            }
        }
        throw new Exception("Bi not found in HUFF table");
    }
}
