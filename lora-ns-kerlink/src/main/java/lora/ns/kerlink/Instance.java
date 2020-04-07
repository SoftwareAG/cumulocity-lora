package lora.ns.kerlink;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.operation.OperationRepresentation;

import lora.codec.DownlinkData;
import lora.ns.ALNSInstance;
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.LNSInstanceRepresentation;
import lora.ns.kerlink.dto.EndDeviceDto;
import lora.ns.kerlink.dto.JwtDto;
import lora.ns.kerlink.dto.PaginatedDto;

public class Instance extends ALNSInstance {
	
	private JwtDto jwt = null;
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public Instance(String id, String baseUrl, String username, String password) {
		super(id);
		properties.setProperty("baseUrl", baseUrl);
		properties.setProperty("username", username);
		properties.setProperty("password", password);
		setProperties(properties);
	}
	
	public Instance(LNSInstanceRepresentation instance) {
		super(instance);
	}
	
	private void login() {
		RestTemplate restTemplate = new RestTemplate();
		String request = String.format("{\"login\":\"%s\", \"password\":\"%s\"}", properties.getProperty("username"), properties.getProperty("password"));
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		jwt = restTemplate.postForObject(properties.getProperty("baseUrl") + "/login", new HttpEntity<String>(request, headers), JwtDto.class);
	}

	public List<EndDevice> getDevices() {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		List<EndDevice> endDevices = new ArrayList<>();
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		PaginatedDto<EndDeviceDto> endDevicesDto = restTemplate.exchange(properties.getProperty("baseUrl") + "/endDevices", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<EndDeviceDto>>(){}).getBody();
		for (EndDeviceDto endDeviceDto : endDevicesDto.getList()) {
			endDevices.add(new EndDevice(endDeviceDto.getDevEui(), endDeviceDto.getName(), endDeviceDto.getClassType(), endDeviceDto.getDevAddr(), endDeviceDto.getCluster().getName()));
		}
		return endDevices;
	}
	
	@Override
	public String processOperation(DownlinkData operation, OperationRepresentation c8yOperation) {
		String result = null;
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		String request = String.format("{\n" + 
				"	\"endDevice\": {\n" + 
				"		\"devEui\": \"%s\"\n" + 
				"	},\n" + 
				"	\"fPort\": %d,\n" + 
				"	\"payload\": \"%s\",\n" + 
				"	\"confirmed\": false,\n" + 
				"	\"contentType\": \"HEXA\"\n" + 
				"}", operation.getDevEui(), operation.getFport(), operation.getPayload());
		logger.info("Request: {}", request);
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
		RestTemplate restTemplate = new RestTemplate();
		try {
			result = restTemplate.exchange(properties.getProperty("baseUrl") + "/dataDown", HttpMethod.POST, new HttpEntity<String>(request, headers), String.class).getHeaders().getLocation().getPath();
			result = result.substring(result.lastIndexOf('/') + 1);
			logger.info("Operation id: {}", result);
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}

	@Override
	public EndDevice getDevice(String devEui) {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		EndDeviceDto endDeviceDto = restTemplate.exchange(properties.getProperty("baseUrl") + "/endDevices/" + devEui, HttpMethod.GET, new HttpEntity<String>("", headers), EndDeviceDto.class).getBody();
		return new EndDevice(devEui, endDeviceDto.getName(), endDeviceDto.getClassType(), endDeviceDto.getDevAddr(), endDeviceDto.getCluster().getName());
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected void init() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeRoutings() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		// TODO Auto-generated method stub
		return false;
	}
}
