package lora;

import java.util.Collection;

import com.cumulocity.microservice.autoconfigure.MicroserviceApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.GetMapping;

import lora.codec.lansitec.Algo;
import lora.codec.lansitec.LansitecCodec;
import lora.rest.CodecRestController;

@MicroserviceApplication
public class App {

	@Autowired
	CodecRestController restController;

	@Autowired
	LansitecCodec codec;

	@GetMapping
	public Collection<Algo> getAlgos() {
		return codec.getAlgos();
	}

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}