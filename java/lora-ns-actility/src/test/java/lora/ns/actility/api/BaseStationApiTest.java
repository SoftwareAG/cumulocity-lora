package lora.ns.actility.api;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lora.ns.actility.api.model.basestation.BsBriefInt.TypeEnum;
import lora.ns.actility.api.model.basestation.Bss;

@ExtendWith(MockitoExtension.class)
class BaseStationApiTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    BaseStationApi baseStationApi;

    @Test
    void test_receive_basetation_with_ethernet_type() throws JsonMappingException, JsonProcessingException {
        String bssJson = """
                        {
                        	"briefs": [
                        		{
                        			"name": "FR_PARIS_DF_R&D_4",
                        			"model": {
                        				"commercialName": "Blue Conduit V1.5 with GPS",
                        				"ID": "MULT/MTAC.3",
                        				"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/4775"
                        			},
                        			"lrrID": "10003F42",
                        			"power": {
                        				"status": null,
                        				"batteryLevel": null
                        			},
                        			"upFrame": {
                        				"last": {
                        					"date": 1679984083404,
                        					"lc": "LC2",
                        					"ant": "A1"
                        				},
                        				"history": {},
                        				"minRC": {
                        					"rc": null,
                        					"lc": null,
                        					"ant": null
                        				}
                        			},
                        			"dwFrame": {
                        				"last": {
                        					"date": 1679945625851,
                        					"lc": "LC8",
                        					"ant": "A1"
                        				},
                        				"minRC": {
                        					"rc": null,
                        					"lc": null,
                        					"ant": null
                        				}
                        			},
                        			"ints": {
                        				"int": [
                        					{
                        						"name": "eth0",
                        						"type": "ETHERNET",
                        						"state": null
                        					}
                        				]
                        			}
                        		}
                        	]
                        }""";
        var bss = objectMapper.readValue(bssJson, Bss.class);
        when(baseStationApi.getBaseStations(1)).thenReturn(bss);
        var result = baseStationApi.getBaseStations(1);
        assertThat(result.getBriefs()).hasSize(1);
        assertThat(result.getBriefs().get(0).getInts().getInt()).hasSize(1);
        assertThat(result.getBriefs().get(0).getInts().getInt().get(0).getType()).isEqualTo(TypeEnum.ETHERNET);
    }
}
