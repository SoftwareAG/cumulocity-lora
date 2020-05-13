package lora;

import java.util.List;
import java.util.Properties;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.ns.objenious.Instance;
import lora.ns.objenious.rest.Group;

@RestController
public class ObjeniousRestController {

	@PostMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<Group> getGroups(@RequestBody Properties properties) {
		return new Instance(properties).getGroups();
	}
}
