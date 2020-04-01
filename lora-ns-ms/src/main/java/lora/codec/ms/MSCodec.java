package lora.codec.ms;

import java.util.List;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.C8YData;
import lora.codec.Decode;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;
import lora.codec.Encode;

public class MSCodec extends DeviceCodec {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private String id, name, version;

	private String authentication;

	public MSCodec(String id, String name, String version) {
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

	@Override
	public DownlinkData encode(Encode data) {
		DownlinkData result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			result = restTemplate.exchange(System.getenv("C8Y_BASEURL") +  "/service/lora-codec-" + id + "/encode", HttpMethod.POST, new HttpEntity<Encode>(data, headers), DownlinkData.class).getBody();
		} catch(HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		}
		return result;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}

	@Override
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

	@Override
	public C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getModels() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		// TODO Auto-generated method stub
		return null;
	}

}
