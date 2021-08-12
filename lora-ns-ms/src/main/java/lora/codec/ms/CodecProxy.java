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
	
	/**
	 *
	 */
	private static final String SERVICE_LORA_CODEC = "/service/lora-codec-";

	/**
	 *
	 */
	private static final String C8Y_BASEURL = "C8Y_BASEURL";

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private String id;
	private String name;
	private String version;

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
			headers.set(HttpHeaders.AUTHORIZATION, authentication);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Result<DownlinkData>> response = restTemplate.exchange(System.getenv(C8Y_BASEURL) +  SERVICE_LORA_CODEC + id + "/encode", HttpMethod.POST, new HttpEntity<Encode>(data, headers), new ParameterizedTypeReference<Result<DownlinkData>>(){});
			logger.info("Answer of encoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
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
			headers.set(HttpHeaders.AUTHORIZATION, authentication);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<Result<String>> response = restTemplate.exchange(System.getenv(C8Y_BASEURL) + SERVICE_LORA_CODEC + id + "/decode", HttpMethod.POST, new HttpEntity<Decode>(data, headers), new ParameterizedTypeReference<Result<String>>(){});
			result = response.getBody();
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), result != null ? result.getResponse() : "");
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
		}
		return result;
	}
	
	public Map<String, DeviceOperationParam> getAvailableOperations(String model) {
		Map<String, DeviceOperationParam> result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.AUTHORIZATION, authentication);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			String url = System.getenv(C8Y_BASEURL) + SERVICE_LORA_CODEC + id + "/operations/" + model;
			logger.info("Will get list of operations from URL {}", url);
			ResponseEntity<Map<String, DeviceOperationParam>> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<Map<String, DeviceOperationParam>>(){});
			logger.info("Answer of decoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}
}
