package lora;

import java.util.List;
import java.util.Properties;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.ns.kerlink.KerlinkConnector;
import lora.ns.kerlink.dto.ClusterDto;

@RestController
public class KerlinkRestController {

	@PostMapping(value = "/clusters", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<ClusterDto> getClusters(@RequestBody Properties properties) {
		return new KerlinkConnector(properties).getClusters();
	}

}
