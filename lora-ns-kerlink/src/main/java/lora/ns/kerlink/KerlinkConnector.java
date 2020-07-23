package lora.ns.kerlink;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lora.codec.DownlinkData;
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.kerlink.dto.ClusterDto;
import lora.ns.kerlink.dto.CustomerDto;
import lora.ns.kerlink.dto.EndDeviceDto;
import lora.ns.kerlink.dto.JwtDto;
import lora.ns.kerlink.dto.PaginatedDto;
import lora.ns.kerlink.dto.PushConfigurationDto;
import lora.ns.kerlink.dto.PushConfigurationDto.PushConfigurationMSgDetailLevel;
import lora.ns.kerlink.dto.PushConfigurationDto.PushConfigurationType;
import lora.ns.kerlink.dto.PushConfigurationHeaderDto;
import lora.ns.kerlink.dto.UserDto;

public class KerlinkConnector extends LNSAbstractConnector {
	
	private static final String CLUSTER_ID = "clusterId";
	private static final String PASSWORD = "password";
	private static final String USERNAME = "username";
	private static final String BASE_URL = "baseUrl";
	private JwtDto jwt = null;
	private Integer customerId = null;
	private String clusterId;
	private String username;
	private String password;
	private String baseUrl;
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public KerlinkConnector(Properties properties) {
		super(properties);
	}
	
	public KerlinkConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}
	
	private void login() {
		RestTemplate restTemplate = new RestTemplate();
		String request = String.format("{\"login\":\"%s\", \"password\":\"%s\"}", username, password);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		jwt = restTemplate.postForObject(baseUrl + "/login", new HttpEntity<String>(request, headers), JwtDto.class);
		logger.info("Received token: {} {}", jwt.getTokenType(), jwt.getToken());
		headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
//		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(properties.getProperty("baseUrl") + "/users")
//		        .queryParam("search", "{\"operand\":\"login\",\"operation\":\"EQ\",\"values\":[\"" + properties.getProperty("username") + "\"]}");
//		logger.info("Will call GET {}", builder.toUriString());
//		ResponseEntity<PaginatedDto<UserDto>> users = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<UserDto>>(){});
		ResponseEntity<PaginatedDto<UserDto>> users = restTemplate.exchange(baseUrl + "/users", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<UserDto>>(){});
		if (users.getStatusCode() == HttpStatus.OK) {
			for (UserDto user: users.getBody().getList()) {
				logger.info("Testing user {}", user.getLogin());
				if (user.getLogin().equals(username)) {
					customerId = user.getCustomer().getId();
					logger.info("Customer Id: {}", customerId);
				}
			}
			//customerId = users.getBody().getList().iterator().next().getCustomer().getId();
		}
	}

	public List<EndDevice> getDevices() {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		List<EndDevice> endDevices = new ArrayList<>();
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		PaginatedDto<EndDeviceDto> endDevicesDto = restTemplate.exchange(baseUrl + "/endDevices", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<EndDeviceDto>>(){}).getBody();
		for (EndDeviceDto endDeviceDto : endDevicesDto.getList()) {
			endDevices.add(new EndDevice(endDeviceDto.getDevEui(), endDeviceDto.getName(), endDeviceDto.getClassType()));
		}
		return endDevices;
	}
	
	@Override
	public String sendDownlink(DownlinkData operation) {
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
		headers.setContentType(MediaType.APPLICATION_JSON);
		List<MediaType> mediaTypes = new ArrayList<MediaType>();
		mediaTypes.add(MediaType.APPLICATION_JSON);
		headers.setAccept(mediaTypes);
		RestTemplate restTemplate = new RestTemplate();
		try {
			logger.info("Will send data to {}", baseUrl + "/dataDown");
			result = restTemplate.exchange(baseUrl + "/dataDown", HttpMethod.POST, new HttpEntity<String>(request, headers), String.class).getHeaders().getLocation().getPath();
			result = result.substring(result.lastIndexOf('/') + 1);
			logger.info("Operation id: {}", result);
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		logger.info("Will get device info on URL: {}", baseUrl + "/endDevices/" + devEui);
		EndDeviceDto endDeviceDto = restTemplate.exchange(baseUrl + "/endDevices/" + devEui, HttpMethod.GET, new HttpEntity<String>("", headers), EndDeviceDto.class).getBody();
		return Optional.of(new EndDevice(devEui, endDeviceDto.getName(), endDeviceDto.getClassType()));
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected void init() {
		this.clusterId = properties.getProperty(CLUSTER_ID);
		this.baseUrl = properties.getProperty(BASE_URL);
		this.username = properties.getProperty(USERNAME);
		this.password = properties.getProperty(PASSWORD);
		logger.info("baseUrl: {}", baseUrl);
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		String routingName = tenant + "-" + this.getId();
		PushConfigurationDto currentPushConfigurationDto = null;
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		PaginatedDto<PushConfigurationDto> pushConfigurationDtos = restTemplate.exchange(baseUrl + "/pushConfigurations", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<PushConfigurationDto>>(){}).getBody();
		for (PushConfigurationDto pushConfigurationDto : pushConfigurationDtos.getList()) {
			if (pushConfigurationDto.getName().equals(routingName)) {
				currentPushConfigurationDto = pushConfigurationDto;
			}
		}
		Integer configId = null;
//		if (currentPushConfigurationDto != null) {
//			configId = currentPushConfigurationDto.getId();
//			logger.info("Found existing push configuration {} with id {} and will update it.", currentPushConfigurationDto.getName(), currentPushConfigurationDto.getId());
//			currentPushConfigurationDto.setUrl(url);
//			currentPushConfigurationDto.setUser(tenant+"/"+login);
//			currentPushConfigurationDto.setPassword(password);
//			currentPushConfigurationDto.setHttpDataDownEventRoute("/downlink");
//			currentPushConfigurationDto.setHttpDataUpRoute("/uplink");
//			headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//			List<MediaType> mediaTypes = new ArrayList<MediaType>();
//			mediaTypes.add(MediaType.APPLICATION_JSON);
//			headers.setAccept(mediaTypes);
//			ObjectMapper mapper = new ObjectMapper();
//			MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
//			try {
//				String dto = mapper.writeValueAsString(currentPushConfigurationDto);
//				logger.info("dto = {}", dto);
//				map.add("dto", dto);
//			} catch (JsonProcessingException e) {
//				e.printStackTrace();
//			}
//			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
//			ResponseEntity<String> result = restTemplate.exchange(properties.getProperty("baseUrl") + "/pushConfigurations/" + currentPushConfigurationDto.getId(), HttpMethod.POST, request, String.class);
//			if (result.getStatusCode() != HttpStatus.NO_CONTENT) {
//				logger.error("Something was wrong while updating the push config: {}", result.getBody());
//				configId = null;
//			}
		if (currentPushConfigurationDto == null) {
			currentPushConfigurationDto = new PushConfigurationDto(new CustomerDto(customerId), routingName, PushConfigurationType.HTTP, PushConfigurationMSgDetailLevel.NETWORK, new PushConfigurationHeaderDto[] {new PushConfigurationHeaderDto("Content-Type", "application/json")}, "/downlink", "/uplink", url, tenant+"/"+login, password);
			logger.info("Will create a new push configuration: {}", currentPushConfigurationDto.toString());
			headers.setContentType(MediaType.MULTIPART_FORM_DATA);
			List<MediaType> mediaTypes = new ArrayList<MediaType>();
			mediaTypes.add(MediaType.APPLICATION_JSON);
			headers.setAccept(mediaTypes);
			ObjectMapper mapper = new ObjectMapper();
			MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
			try {
				String dto = mapper.writeValueAsString(currentPushConfigurationDto);
				logger.info("dto = {}", dto);
				map.add("dto", dto);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
			ResponseEntity<String> result = restTemplate.exchange(baseUrl + "/pushConfigurations", HttpMethod.POST, request, String.class);
			if (result.getStatusCode() == HttpStatus.CREATED) {
				String[] tokens = result.getHeaders().getLocation().getPath().split("/");
				configId = Integer.parseInt(tokens[tokens.length-1]);
			} else {
				logger.error("Something was wrong while creating the push config: {}", result.getBody());
			}
		}
		if (configId != null) {
			headers = new HttpHeaders();
			headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
			ClusterDto cluster = restTemplate.exchange(baseUrl + "/clusters/" + clusterId, HttpMethod.GET, new HttpEntity<String>("", headers), ClusterDto.class).getBody();
			cluster.setPushConfiguration(currentPushConfigurationDto);
			cluster.setGeolocEnabled(true);
			cluster.setHexa(true);
			cluster.setPushEnabled(true);
			headers.setContentType(MediaType.APPLICATION_JSON);
			ResponseEntity<String> response = restTemplate.exchange(baseUrl + "/clusters/" + clusterId, HttpMethod.PATCH, new HttpEntity<ClusterDto>(cluster, headers), String.class);
			if (response.getStatusCode() != HttpStatus.NO_CONTENT) {
				logger.error("Something was wrong while updating the cluster: {}", response.getBody());
			}
		}
	}

	@Override
	public void removeRoutings() {
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		PaginatedDto<PushConfigurationDto> pushConfigurationDtos = restTemplate.exchange(baseUrl + "/pushConfigurations", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<PushConfigurationDto>>(){}).getBody();
		for (PushConfigurationDto pushConfigurationDto : pushConfigurationDtos.getList()) {
			if (pushConfigurationDto.getName().equals(this.getId())) {
				restTemplate.exchange(baseUrl + "/pushConfigurations/" + pushConfigurationDto.getId(), HttpMethod.DELETE, new HttpEntity<String>("", headers), String.class);
			}
		}
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		// TODO Auto-generated method stub
		return false;
	}

	public List<ClusterDto> getClusters() {
		List<ClusterDto> result = new ArrayList<ClusterDto>();
		if (jwt == null || jwt.isExpired()) {
			login();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt.getTokenType() + " " + jwt.getToken());
		RestTemplate restTemplate = new RestTemplate();
		PaginatedDto<ClusterDto> clusterDtos = restTemplate.exchange(baseUrl + "/clusters", HttpMethod.GET, new HttpEntity<String>("", headers), new ParameterizedTypeReference<PaginatedDto<ClusterDto>>(){}).getBody();
		for (ClusterDto clusterDto : clusterDtos.getList()) {
			result.add(clusterDto);
		}
		
		return result;
	}
}
