package lora;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import com.cumulocity.microservice.autoconfigure.MicroserviceApplication;

import lora.rest.CodecRestController;

@MicroserviceApplication
public class App {

	@Autowired
	CodecRestController restController;

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}