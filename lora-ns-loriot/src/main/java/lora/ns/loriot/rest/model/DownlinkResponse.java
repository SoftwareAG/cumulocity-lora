package lora.ns.loriot.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DownlinkResponse {
	private String seqdn;

	public String getSeqdn() {
		return seqdn;
	}

	public void setSeqdn(String seqdn) {
		this.seqdn = seqdn;
	}
}
