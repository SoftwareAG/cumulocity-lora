package lora.github;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface GithubService {
    @GET("repos/SoftwareAG/cumulocity-lora/releases")
    Call<List<Release>> getReleases();
}
