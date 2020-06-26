package lora;

import java.util.List;
import java.util.Properties;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.ns.loriot.LoriotConnector;

@RestController
public class LoriotRestController {

	@PostMapping(value = "/apps", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<lora.ns.loriot.rest.model.App> getApps(@RequestBody Properties properties) {
		return new LoriotConnector(properties).getApps();
	}
}
