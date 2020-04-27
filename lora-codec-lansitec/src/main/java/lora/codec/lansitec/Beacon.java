package lora.codec.lansitec;

public class Beacon {
	private String major;
	private String minor;
	private int rssi;
	public Beacon() {}
	public Beacon(String major, String minor, int rssi) {
		super();
		this.major = major;
		this.minor = minor;
		this.rssi = rssi;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getMinor() {
		return minor;
	}
	public void setMinor(String minor) {
		this.minor = minor;
	}
	public int getRssi() {
		return rssi;
	}
	public void setRssi(int rssi) {
		this.rssi = rssi;
	}
}
