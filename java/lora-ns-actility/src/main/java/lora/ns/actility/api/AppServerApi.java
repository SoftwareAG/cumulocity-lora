package lora.ns.actility.api;

import feign.Param;
import feign.RequestLine;
import lora.ns.actility.api.model.appserver.AppServer;
import lora.ns.actility.api.model.appserver.AppServers;

public interface AppServerApi {
    @RequestLine("GET /subscriptions/mine/appServers?name={name}")
    AppServers getAppServersByName(@Param("name") String name);

    @RequestLine("GET /subscriptions/mine/appServers/{appServerUID}")
    AppServer getAppServer(@Param("appServerUID") String appServerUID);

    @RequestLine("POST /subscriptions/mine/appServers")
    AppServer createAppServer(AppServer appServer);

    @RequestLine("PUT /subscriptions/mine/appServers/{appServerUID}")
    AppServer updateAppServer(@Param("appServerUID") String appServerUID, AppServer appServer);
}
