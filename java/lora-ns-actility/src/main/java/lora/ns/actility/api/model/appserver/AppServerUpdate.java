package lora.ns.actility.api.model.appserver;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lora.ns.actility.api.model.common.Domain;

public class AppServerUpdate {
    private List<AppServerCustomHttpHeadersInner> customHttpHeaders = new ArrayList<>();

    private List<AppServerHttpLorawanDestination> destinations = new ArrayList<>();

    private List<Domain> domains = new ArrayList<>();

    public AppServerUpdate customHttpHeaders(List<AppServerCustomHttpHeadersInner> customHttpHeaders) {

        this.customHttpHeaders = customHttpHeaders;
        return this;
    }

    public AppServerUpdate addCustomHttpHeadersItem(AppServerCustomHttpHeadersInner customHttpHeadersItem) {
        if (this.customHttpHeaders == null) {
            this.customHttpHeaders = new ArrayList<>();
        }
        this.customHttpHeaders.add(customHttpHeadersItem);
        return this;
    }

    /**
     * A list of HTTP headers to be added in HTTP requests sent to the application.
     * Accept, Host, User-Agent, Content-Length and Content-Type headers cannot be
     * customized. A given HTTP header name can be configured only once (case
     * insensitive). This field is not returned if the authenticated user has domain
     * restrictions but does not have &#x60;&lt;Subscription&gt;/a&#x60; access
     * right.
     * 
     * @return customHttpHeaders
     **/
    @javax.annotation.Nullable
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<AppServerCustomHttpHeadersInner> getCustomHttpHeaders() {
        return customHttpHeaders;
    }

    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setCustomHttpHeaders(List<AppServerCustomHttpHeadersInner> customHttpHeaders) {
        this.customHttpHeaders = customHttpHeaders;
    }

    public AppServerUpdate destinations(List<AppServerHttpLorawanDestination> destinations) {

        this.destinations = destinations;
        return this;
    }

    public AppServerUpdate addDestinationsItem(AppServerHttpLorawanDestination destinationsItem) {
        if (this.destinations == null) {
            this.destinations = new ArrayList<>();
        }
        this.destinations.add(destinationsItem);
        return this;
    }

    /**
     * Application Server destination
     * 
     * @return destinations
     **/
    @javax.annotation.Nullable
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<AppServerHttpLorawanDestination> getDestinations() {
        return destinations;
    }

    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
    public void setDestinations(List<AppServerHttpLorawanDestination> destinations) {
        this.destinations = destinations;
    }

    public AppServerUpdate domains(List<Domain> domains) {

        this.domains = domains;
        return this;
    }

    public AppServerUpdate addDomainsItem(Domain domainsItem) {
        if (this.domains == null) {
            this.domains = new ArrayList<>();
        }
        this.domains.add(domainsItem);
        return this;
    }

    /**
     * List of associated domains. The list cannot contain more than one domain for
     * a given group.
     * 
     * @return domains
     **/
    @javax.annotation.Nullable
    @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

    public List<Domain> getDomains() {
        return domains;
    }

}
