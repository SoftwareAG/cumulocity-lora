package lora;

import java.util.List;
import java.util.Properties;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.ns.ttn.TTNConnector;
import ttn.lorawan.v3.ApplicationOuterClass.Application;

@RestController
public class TTNRestController {
	@PostMapping(value = "/applications", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Application> getApplications(@RequestBody Properties properties) {
		TTNConnector connector = new TTNConnector(properties);
		return connector.getApplications();
	}
}
