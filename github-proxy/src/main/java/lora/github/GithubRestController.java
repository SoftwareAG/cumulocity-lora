package lora.github;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
import com.cumulocity.microservice.subscription.repository.application.ApplicationApi;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.rest.representation.application.ApplicationRepresentation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.c8y.ApplicationBinaryService;
import okhttp3.Interceptor;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import okio.BufferedSink;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@RestController
public class GithubRestController {
    private final Logger logger = LoggerFactory.getLogger(GithubRestController.class);

    protected MicroserviceSubscriptionsService subscriptionsService;

    private ApplicationApi applicationApi;

    private GithubService githubService;
    private ApplicationBinaryService applicationBinaryService;

    @Autowired
    public GithubRestController(MicroserviceSubscriptionsService subscriptionsService, ApplicationApi applicationApi) {
        this();
        this.subscriptionsService = subscriptionsService;
        this.applicationApi = applicationApi;
    }

    @GetMapping(value = "/releases", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Release> getReleases() {
        List<Release> result = new ArrayList<>();
        try {
            Response<List<Release>> response = githubService.getReleases().execute();
            if (response.isSuccessful()) {
                result = response.body();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @PostMapping(value = "/microservice", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String publishMicroservice(@RequestBody Asset asset) {
        String result = "KO";
        String name = asset.getName().replace(".zip", "");
        logger.info("Application name is: {}", name);
        Optional<ApplicationRepresentation> app = applicationApi.getByName(name);
        ApplicationRepresentation application = null;
        if (!app.isPresent()) {
            logger.info("Application doesn't exist and will be created.");
            application = new ApplicationRepresentation();
            application.setName(name);
            application.setKey(name + "-key");
            application.setType(ApplicationRepresentation.MICROSERVICE);
            application = applicationApi.create(application);
        } else {
            application = app.get();
            logger.info("Application exists and will be updated: {}", application.getId());
        }

        okhttp3.RequestBody body = new okhttp3.RequestBody() {

            @Override
            public okhttp3.MediaType contentType() {
                return okhttp3.MediaType.parse("application/zip");
            }

            @Override
            public void writeTo(BufferedSink sink) throws IOException {
                URL url = new URL(asset.getBrowserDownloadUrl());
                try(InputStream is = url.openStream()) {
                    is.transferTo(sink.outputStream());
                }
            }

        };

        try {

            MultipartBody.Part file = MultipartBody.Part.createFormData("file", name, body);
            Response<ResponseBody> response = applicationBinaryService
                    .uploadApplicationAttachment(application.getId(), file).execute();
            if (response.isSuccessful()) {
                logger.info("New microservice upload was successful");
                result = "OK";
            } else {
                logger.error("An error occurred while uploading the microservice: {} {} {}", response.code(),
                        response.message(), response.errorBody().string());
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        return result;
    }

    class AuthenticationInterceptor implements Interceptor {

        private String getCredentials() {
            String result = null;
            Optional<MicroserviceCredentials> credentials = subscriptionsService
                    .getCredentials(subscriptionsService.getTenant());
            if (credentials.isPresent()) {
                result = credentials.get().toCumulocityCredentials().getAuthenticationString();
            }
            return result;
        }

        @Override
        public okhttp3.Response intercept(Chain chain) throws IOException {
            Request request = chain.request();

            request = request.newBuilder().header("Authorization", getCredentials()).build();

            return chain.proceed(request);
        }
    }

    public GithubRestController() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        githubService = new Retrofit.Builder().baseUrl("https://api.github.com/")
                .addConverterFactory(JacksonConverterFactory.create(objectMapper)).build().create(GithubService.class);

        OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new AuthenticationInterceptor())
                .readTimeout(120, TimeUnit.SECONDS).writeTimeout(120, TimeUnit.SECONDS).build();

        applicationBinaryService = new Retrofit.Builder().client(okHttpClient).baseUrl(System.getenv("C8Y_BASEURL"))
                .addConverterFactory(JacksonConverterFactory.create(objectMapper)).build()
                .create(ApplicationBinaryService.class);
    }
}
