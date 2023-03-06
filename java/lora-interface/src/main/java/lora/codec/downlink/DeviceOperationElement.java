package lora.codec.downlink;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeviceOperationElement {
    private String id;
    private String name;
    private ParamType type;
    private Object value;
    private Map<String, DeviceOperationElement> elements = new HashMap<>();
    private Boolean repeatable = false;
    private Integer minOccur = 1;
    private Integer maxOccur = 1;
    private Boolean dependsOnParam = false;
    private String dependsOnParamId;
    private String dependsOnParamValue;
    private Boolean required = true;

    public enum ParamType {
        STRING, INTEGER, FLOAT, BOOL, DATE, ENUM, SEPARATOR, GROUP, ARRAY;
    }

    public DeviceOperationElement() {
    }

    public DeviceOperationElement(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public DeviceOperationElement(String id, String name, ParamType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DeviceOperationElement id(String id) {
        this.id = id;
        return this;
    }

    public DeviceOperationElement name(String name) {
        this.name = name;
        return this;
    }

    public ParamType getType() {
        return type;
    }

    public void setType(ParamType type) {
        this.type = type;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Collection<DeviceOperationElement> getElements() {
        return elements.values();
    }

    public void setElements(List<DeviceOperationElement> elements) {
        for (DeviceOperationElement element : elements) {
            this.elements.put(element.getId(), element);
        }
    }

    public DeviceOperationElement getElement(String id) {
        return elements.get(id);
    }

    public Boolean getRepeatable() {
        return repeatable;
    }

    public void setRepeatable(Boolean repeatable) {
        this.repeatable = repeatable;
    }

    public Integer getMinOccur() {
        return minOccur;
    }

    public void setMinOccur(Integer minOccur) {
        this.minOccur = minOccur;
    }

    public Integer getMaxOccur() {
        return maxOccur;
    }

    public void setMaxOccur(Integer maxOccur) {
        this.maxOccur = maxOccur;
    }

    public Boolean getDependsOnParam() {
        return dependsOnParam;
    }

    public void setDependsOnParam(Boolean dependsOnParam) {
        this.dependsOnParam = dependsOnParam;
    }

    public String getDependsOnParamId() {
        return dependsOnParamId;
    }

    public void setDependsOnParamId(String dependsOnParamId) {
        this.dependsOnParamId = dependsOnParamId;
    }

    public String getDependsOnParamValue() {
        return dependsOnParamValue;
    }

    public void setDependsOnParamValue(String dependsOnParamValue) {
        this.dependsOnParamValue = dependsOnParamValue;
    }

    public Boolean isRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public DeviceOperationElement type(ParamType type) {
        this.type = type;
        return this;
    }

    public DeviceOperationElement addElement(DeviceOperationElement element) {
        this.elements.put(element.getId(), element);
        return this;
    }

    @Override
    public String toString() {
        return "DeviceOperationElement [\n\tid=" + id + ",\n\tname=" + name + ",\n\ttype=" + type + ",\n\tvalue="
                + value
                + ",\n\telements=" + elements + ",\n\trepeatable=" + repeatable + ",\n\tminOccur=" + minOccur
                + ",\n\tmaxOccur="
                + maxOccur + ",\n\tdependsOnParam=" + dependsOnParam + ",\n\tdependsOnParamId=" + dependsOnParamId
                + ",\n\tdependsOnParamValue=" + dependsOnParamValue + ",\n\trequired=" + required + "\n]";
    }
}
