package lora.codec.downlink;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeviceOperation {
	private String id;
	private String name;
	private Map<String, DeviceOperationElement> elements = new HashMap<>();

	public DeviceOperation() {
	}

	public DeviceOperation(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public DeviceOperation(String id, String name, List<DeviceOperationElement> elements) {
		super();
		this.id = id;
		this.name = name;
		for (DeviceOperationElement element : elements) {
			this.elements.put(element.getId(), element);
		}
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

	public Collection<DeviceOperationElement> getElements() {
		return elements.values();
	}

	public DeviceOperationElement getElement(String id) {
		return elements.get(id);
	}

	public void setElements(List<DeviceOperationElement> elements) {
		for (DeviceOperationElement element : elements) {
			this.elements.put(element.getId(), element);
		}
	}

	public DeviceOperation addElement(DeviceOperationElement element) {
		this.elements.put(element.getId(), element);
		return this;
	}

	@Override
	public String toString() {
		return "DeviceOperation [\n\tid=" + id + ",\n\tname=" + name + ",\n\telements=" + elements + "\n]";
	}
}
