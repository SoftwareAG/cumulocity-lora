package lora.codec.ms;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lora.codec.C8YData;
import lora.codec.Decode;
import lora.codec.DeviceOperationParam;
import lora.codec.DownlinkData;
import lora.codec.Encode;
import lora.common.Component;

public class CodecProxy implements Component {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private String id, name, version;

	private String authentication;

	public CodecProxy(String id, String name, String version) {
		super();
		this.id = id;
		this.name = name;
		this.version = version;
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public String getVersion() {
		return version;
	}

	public DownlinkData encode(Encode data) {
		DownlinkData result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<DownlinkData> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") +  "/service/lora-codec-" + id + "/encode", HttpMethod.POST, new HttpEntity<Encode>(data, headers), DownlinkData.class);
			logger.info("Answer of encoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}

	public void decode(Decode data) {
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<C8YData> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/service/lora-codec-" + id + "/decode", HttpMethod.POST, new HttpEntity<Decode>(data, headers), C8YData.class);
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), response.getBody());
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
	}
	
	public Map<String, DeviceOperationParam> getAvailableOperations(String model) {
		Map<String, DeviceOperationParam> result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Map> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/service/lora-codec-" + id + "/operations/" + model, HttpMethod.GET, new HttpEntity<String>("", headers), Map.class);
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}
}
