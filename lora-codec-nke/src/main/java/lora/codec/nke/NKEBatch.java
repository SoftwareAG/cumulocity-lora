package lora.codec.nke;

import java.util.ArrayList;
import java.util.List;

public class NKEBatch {
    private List<C8YDataType> dataTypes = new ArrayList<>();
    private String attributes;

    public NKEBatch(String attributes) {
        this.attributes = attributes;
    }

    public String getAttributes() {
        return this.attributes;
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
