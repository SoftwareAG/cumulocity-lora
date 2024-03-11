package lora.ns.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cumulocity.model.event.CumulocitySeverities;

import feign.FeignException.FeignClientException;
import lombok.RequiredArgsConstructor;
import lora.rest.LoraContextService;

@RestControllerAdvice
@RequiredArgsConstructor
public class LoraExceptionHandler {

    private final LoraContextService loraContextService;

    @ExceptionHandler(LoraException.class)
    private ResponseEntity<LoraError> processLoraException(LoraException e) {
        if (e.getCause() instanceof FeignClientException fe) {
            return processFeignException(fe);
        }
        loraContextService.error(e.getMessage(), e);
        loraContextService.sendAlarm(e.getClass().getSimpleName(), e.getMessage(), CumulocitySeverities.CRITICAL);
        StringWriter detailedMessage = new StringWriter();
        e.printStackTrace(new PrintWriter(detailedMessage));
        return new ResponseEntity<>(new LoraError(e.getMessage(), detailedMessage.toString()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(FeignClientException.class)
    ResponseEntity<LoraError> processFeignException(FeignClientException e) {
        loraContextService.error(e.getMessage(), e);
        loraContextService.sendAlarm(e.getClass().getSimpleName(), e.getMessage(), CumulocitySeverities.CRITICAL);
        StringWriter detailedMessage = new StringWriter();
        e.printStackTrace(new PrintWriter(detailedMessage));
        return new ResponseEntity<>(new LoraError(e.getMessage(), detailedMessage.toString()),
                HttpStatus.resolve(e.status()));
    }
}
