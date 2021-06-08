package lora.codec.nke;

import java.util.ArrayList;
import java.util.List;

public class NKEBatch {
    private List<C8YDataType> dataTypes = new ArrayList<>();
    private int tagsz;
    private BatchRecord.Arg[] args;

    public int getTagsz() {
        return tagsz;
    }

    public BatchRecord.Arg[] getArgs() {
        return args;
    }

    public NKEBatch(int tagsz, BatchRecord.Arg[] args) {
        this.tagsz = tagsz;
        this.args = args;
    }

    NKEBatch add(C8YDataType dataType) {
        this.dataTypes.add(dataType);
        return this;
    }

    C8YDataType get(Integer label) {
        return dataTypes.get(label);
    }

    boolean isLabelDefined(Integer label) {
        return dataTypes.get(label) != null;
    }
}
