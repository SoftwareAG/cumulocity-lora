package lora.github;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Asset {
    private Integer id;
    private String name;
    private Integer size;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("published_at")
    private Instant publishedAt;
    @JsonProperty("browser_download_url")
    private String browserDownloadUrl;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getSize() {
        return size;
    }
    public void setSize(Integer size) {
        this.size = size;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    public Instant getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }
    public String getBrowserDownloadUrl() {
        return browserDownloadUrl;
    }
    public void setBrowserDownloadUrl(String browserDownloadUrl) {
        this.browserDownloadUrl = browserDownloadUrl;
    }
}
