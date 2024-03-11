package lora.codec.ms;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.UnknownContentTypeException;

import lombok.extern.slf4j.Slf4j;
import lora.codec.Result;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.Decode;
import lora.common.Component;

@Slf4j
public class CodecProxy implements Component {

	/**
	 *
	 */
	private static final String SERVICE_LORA_CODEC = "/service/lora-codec-";

	private static final String C8Y_BASEURL = "C8Y_BASEURL";

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
			ResponseEntity<Result<DownlinkData>> response = restTemplate.exchange(
					System.getenv(C8Y_BASEURL) + SERVICE_LORA_CODEC + id + "/encode", HttpMethod.POST,
					new HttpEntity<Encode>(data, headers), new ParameterizedTypeReference<Result<DownlinkData>>() {
					});
			log.info("Answer of encoder is {} with content {}", response.getStatusCode(), response.getBody());
			result = response.getBody();
		} catch (RestClientResponseException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
		} catch (UnknownContentTypeException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
		} catch (ResourceAccessException e) {
			e.printStackTrace();
			result = new Result<>(false, e.getMessage(), null);
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
			ResponseEntity<Result<String>> response = restTemplate.exchange(
					System.getenv(C8Y_BASEURL) + SERVICE_LORA_CODEC + id + "/decode", HttpMethod.POST,
					new HttpEntity<Decode>(data, headers), new ParameterizedTypeReference<Result<String>>() {
					});
			result = response.getBody();
			log.info("Answer of decoder is {} with content {}", response.getStatusCode(),
					result != null ? result.getResponse() : "");
		} catch (RestClientResponseException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
		} catch (UnknownContentTypeException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
			result = new Result<>(false, e.getResponseBodyAsString(), null);
		} catch (ResourceAccessException e) {
			e.printStackTrace();
			result = new Result<>(false, e.getMessage(), null);
		}
		return result;
	}

	public Map<String, DeviceOperationElement> getAvailableOperations(String model) {
		Map<String, DeviceOperationElement> result = new HashMap<>();
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.AUTHORIZATION, authentication);
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			String url = System.getenv(C8Y_BASEURL) + SERVICE_LORA_CODEC + id + "/operations/" + model;
			log.info("Will get list of operations from URL {}", url);
			ResponseEntity<Map<String, DeviceOperationElement>> response = restTemplate.exchange(url, HttpMethod.GET,
					new HttpEntity<String>("", headers),
					new ParameterizedTypeReference<Map<String, DeviceOperationElement>>() {
					});
			result = response.getBody();
		} catch (RestClientResponseException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
		} catch (UnknownContentTypeException e) {
			e.printStackTrace();
			log.error(e.getResponseBodyAsString());
		} catch (ResourceAccessException e) {
			e.printStackTrace();
		}
		return result;
	}
}
