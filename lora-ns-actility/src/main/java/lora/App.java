package lora;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import com.cumulocity.microservice.autoconfigure.MicroserviceApplication;

import lora.rest.LNSRestController;

@MicroserviceApplication
public class App {

	@Autowired
	LNSRestController restController;
	
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}