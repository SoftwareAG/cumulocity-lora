package lora.codec.ms;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lora.codec.Decode;
import lora.codec.DeviceOperationParam;
import lora.codec.DownlinkData;
import lora.codec.Encode;
import lora.codec.Result;
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

	public Result<DownlinkData> encode(Encode data) {
		Result<DownlinkData> result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Result<DownlinkData>> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") +  "/service/lora-codec-" + id + "/encode", HttpMethod.POST, new HttpEntity<Encode>(data, headers), new ParameterizedTypeReference<Result<DownlinkData>>(){});
			logger.info("Answer of encoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
			result = new Result<DownlinkData>(false, e.getResponseBodyAsString(), null);
		}
		return result;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}

	public Result<String> decode(Decode data) {
		Result<String> result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Result<String>> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/service/lora-codec-" + id + "/decode", HttpMethod.POST, new HttpEntity<Decode>(data, headers), new ParameterizedTypeReference<Result<String>>(){});
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), response.getBody().getResponse());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
			result = new Result<String>(false, e.getResponseBodyAsString(), null);
		}
		return result;
	}
	
	public Map<String, DeviceOperationParam> getAvailableOperations(String model) {
		Map<String, DeviceOperationParam> result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Map<String, DeviceOperationParam>> response = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/service/lora-codec-" + id + "/operations/" + model, HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<Map<String, DeviceOperationParam>>(){});
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}
}
