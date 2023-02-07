package lora;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.rest.LNSRestController;

@RestController
public class OrbiwanRestController {

	@Autowired
	LNSRestController restController;

	@PostMapping(value = "/{lnsInstanceId}/rest/callback/payloads/ul", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> lnsUp(@RequestBody String event, @PathVariable String lnsInstanceId) {
		return restController.lnsUp(event, lnsInstanceId);
	}

	@PostMapping(value = "/{lnsInstanceId}/rest/callback/payloads/dl", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> lnsDown(@RequestBody String event, @PathVariable String lnsInstanceId) {
		return restController.lnsDown(event, lnsInstanceId);
	}
}
