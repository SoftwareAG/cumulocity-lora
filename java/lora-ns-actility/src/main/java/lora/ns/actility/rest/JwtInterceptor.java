package lora.ns.actility.rest;

import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import feign.RequestInterceptor;
import feign.RequestTemplate;

public abstract class JwtInterceptor implements RequestInterceptor {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private String jwt;
    protected String clientId;
    protected String clientSecret;

    protected JwtInterceptor(String clientId, String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    protected abstract String getToken();

    @Override
    public void apply(RequestTemplate template) {
        DecodedJWT decodedJwt = null;
        if (jwt != null) {
            try {
                decodedJwt = JWT.decode(jwt);
            } catch (Exception e) {
                e.printStackTrace();
                logger.error("Couldn't parse JWT", e);
            }
        }

        if (decodedJwt == null || decodedJwt.getExpiresAt().before(Calendar.getInstance().getTime())) {
            jwt = getToken();
        }

        template.header("Authorization", "Bearer " + jwt).header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .header("Accept", MediaType.APPLICATION_JSON_VALUE);
    }
}
