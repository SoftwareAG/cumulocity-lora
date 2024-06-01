package lora.ns.actility.api;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.actility.api.model.basestation.Bs;
import lora.ns.actility.api.model.basestation.BsProfiles;
import lora.ns.actility.api.model.basestation.Bss;

public interface BaseStationApi {
    @RequestLine("GET /partners/mine/bss?pageIndex={pageIndex}")
    @Headers({ "Accept: application/json", })
    Bss getBaseStations(@Param("pageIndex") Integer pageIndex);

    @RequestLine("GET /partners/mine/bss/{bsUid}")
    @Headers({ "Accept: application/json", })
    Bs getBaseStation(@Param("bsUid") String bsUid);

    @RequestLine("POST /partners/mine/bss")
    @Headers({ "Accept: application/json", "Content-Type: application/json" })
    Bs createBaseStation(Bs baseStation);

    @RequestLine("DELETE /partners/mine/bss/{bsUid}")
    @Headers({ "Accept: application/json", })
    void deleteBaseStation(@Param("bsUid") String bsUid);

    @RequestLine("GET /partners/mine/bsProfiles?pageIndex={pageIndex}")
    @Headers({ "Accept: application/json", })
    BsProfiles getBaseStationProfiles(@Param("pageIndex") Integer pageIndex);
}
