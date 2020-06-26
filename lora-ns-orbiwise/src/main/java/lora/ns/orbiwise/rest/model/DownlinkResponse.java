package lora.ns.orbiwise.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DownlinkResponse {
    private Integer id;          // unique ID to query payload later
    private String data;         // *Optional the payload data sent)
    private int fcnt;         // the usedFCNT
    private int port;          // the used port
    private int transmissionStatus; // see definition below
    private String session_id;        // session ID when packet was created

    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public int getFcnt() {
		return fcnt;
	}
	public void setFcnt(int fcnt) {
		this.fcnt = fcnt;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public int getTransmissionStatus() {
		return transmissionStatus;
	}
	public void setTransmissionStatus(int transmissionStatus) {
		this.transmissionStatus = transmissionStatus;
	}
	public String getSession_id() {
		return session_id;
	}
	public void setSession_id(String session_id) {
		this.session_id = session_id;
	}
}
