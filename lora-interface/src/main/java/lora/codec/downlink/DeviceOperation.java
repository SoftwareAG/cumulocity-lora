package lora.codec.downlink;

import java.util.ArrayList;
import java.util.List;

public class DeviceOperation {
	private String id;
	private String name;
	private List<DeviceOperationElement> elements = new ArrayList<>();
	public DeviceOperation() {}
	public DeviceOperation(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public DeviceOperation(String id, String name, List<DeviceOperationElement> elements) {
		super();
		this.id = id;
		this.name = name;
		this.elements = elements;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<DeviceOperationElement> getElements() {
		return elements;
	}
	public void setElements(List<DeviceOperationElement> elements) {
		this.elements = elements;
	}
	public DeviceOperation addElement(DeviceOperationElement element) {
		this.elements.add(element);
		return this;
	}
}
