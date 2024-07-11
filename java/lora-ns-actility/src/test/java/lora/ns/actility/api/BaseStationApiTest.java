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

	@Test
	void test_receive_basestation_with_connectiontype() throws JsonMappingException, JsonProcessingException {
		var briefs = """
						{
							"briefs": [
								{
									"name": "Gateway Test Lille",
									"model": {
										"commercialName": "Blue Conduit V1.5",
										"ID": "MULT/MTAC.2",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/3"
									},
									"lrrID": "10000002",
									"lrrUUID": "000800-21586584",
									"state": "ACTIVE",
									"stateSince": 1706889547818,
									"cnxState": "DISC",
									"cnxStateSince": 1717427652725,
									"healthState": "BACKHAUL_CNX_ERROR",
									"version": "2.6.72",
									"lastReboot": 1716543143568,
									"power": {
										"status": null,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1717425251200,
											"lc": "LC5",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												1,
												1,
												0,
												1,
												3,
												0,
												2,
												2
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1717418350395,
											"lc": "LC1",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0
											]
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
												"state": null,
												"txAvgRate": 1088,
												"rxAvgRate": 1243,
												"avgRoundTrip": 12,
												"ip": "10.199.229.188",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 6,
									"alarmCount": 3,
									"alarm6": 1,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 0,
									"alarm2": 0,
									"alarm1": 2,
									"lat": null,
									"lon": null,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDT-0.1",
											"os_version=4.9.87",
											"hal_version=4.1.3_1",
											"custom_build_version=2.6.72-mtac_refresh_v1.5",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.1_20220714",
											"lrr_version=2.6.72",
											"fpga_version=31",
											"firmware_version=5.3.31",
											"sn_version=21586584",
											"sku_version=MTCDT-L4E1-246L"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1717427652725,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": null,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 0,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 66,
									"ram": 14,
									"href": "/thingpark/wireless/rest/partners/1/bss/4",
									"creationDate": 1706889547818,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1714751866952
									},
									"mfs": [
										{
											"name": "/",
											"used": 69
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": [
										{
											"name": "MM&SW",
											"group": {
												"name": "MM&SW"
											}
										}
									],
									"appServers": []
								},
								{
									"name": "klk-030507",
									"model": {
										"commercialName": "Wirnet iFemtocell V1.0",
										"ID": "KERL/NANO.1",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/2"
									},
									"lrrID": "1000000D",
									"lrrUUID": "7076FF-7076FF02056B",
									"state": "ACTIVE",
									"stateSince": 1709150743363,
									"cnxState": "CNX",
									"cnxStateSince": 1720604642270,
									"healthState": "ACTIVE",
									"version": "2.6.27_6",
									"lastReboot": 1720600251775,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1720682809814,
											"lc": "LC4",
											"ant": "A1"
										},
										"history": {
											"val": [
												2,
												0,
												0,
												2,
												0,
												0,
												0,
												1,
												1,
												1
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1720679783606,
											"lc": "LC253",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												1,
												0,
												0,
												0,
												0
											]
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
												"state": 0,
												"txAvgRate": 1005,
												"rxAvgRate": 1470,
												"avgRoundTrip": 12,
												"ip": "10.199.229.186",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 1,
									"alarmCount": 2,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 0,
									"alarm2": 0,
									"alarm1": 2,
									"lat": 48.703213,
									"lon": 6.124409,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=3903",
											"os_version=4.14.9-klk",
											"hal_version=5.0.1-klk9",
											"custom_build_version=2.6.27_6-wirmana",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.1_20230802",
											"lrr_version=2.6.27_6",
											"fpga_version=31",
											"firmware_version=4.3.3_20200803132042",
											"sn_version=BEc030507",
											"sku_version=unidentified"
										]
									},
									"vendor": {
										"name": "Kerlink",
										"commercialName": "Kerlink",
										"commercialDescription": "Supplier of Internet of Things infrastructures deployments.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/1"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682859553,
									"gpsReceiverConfig": "ABSENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 0,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 1,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 47,
									"ram": 40,
									"href": "/thingpark/wireless/rest/partners/1/bss/37",
									"creationDate": 1709150743363,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1715025018224
									},
									"mfs": [
										{
											"name": "/user",
											"used": 1
										},
										{
											"name": "/tmp",
											"used": 1
										},
										{
											"name": "/.update",
											"used": 35
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 3.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": null,
									"appServers": []
								},
								{
									"name": "mtcdt_ip67",
									"model": {
										"commercialName": "Conduit Outdoor IP67 V1.5",
										"ID": "MULT/MTAC.6",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/25"
									},
									"lrrID": "1000000F",
									"lrrUUID": "000800-22905301",
									"state": "ACTIVE",
									"stateSince": 1711013971432,
									"cnxState": "CNX",
									"cnxStateSince": 1720606760790,
									"healthState": "ACTIVE",
									"version": "2.8.43",
									"lastReboot": 1720606742048,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1720682187340,
											"lc": "LC6",
											"ant": "A1"
										},
										"history": {
											"val": [
												2,
												0,
												0,
												1,
												0,
												0,
												0,
												0,
												2,
												0
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1720682911372,
											"lc": "LC3",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												1,
												0,
												0,
												0,
												0
											]
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
												"state": 0,
												"txAvgRate": 950,
												"rxAvgRate": 1282,
												"avgRoundTrip": 6,
												"ip": "10.28.69.59",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 3,
									"alarmCount": 4,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 1,
									"alarm2": 0,
									"alarm1": 3,
									"lat": null,
									"lon": null,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDTIP-0.0",
											"os_version=4.9.87",
											"hal_version=4.1.3_1",
											"custom_build_version=2.8.43-mtcdt_ip67",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.1_20220714",
											"lrr_version=2.8.43",
											"fpga_version=31",
											"firmware_version=5.3.31",
											"sn_version=22905301",
											"sku_version=MTCDTIP-L4E1-266A"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682770796,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 1,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 0,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 88,
									"ram": 14,
									"href": "/thingpark/wireless/rest/partners/1/bss/43",
									"creationDate": 1711013971432,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1714767361273
									},
									"mfs": [
										{
											"name": "/",
											"used": 73
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": null,
									"appServers": []
								},
								{
									"name": "mtcdt-001782",
									"model": {
										"commercialName": "Blue Conduit V1.5",
										"ID": "MULT/MTAC.2",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/3"
									},
									"lrrID": "10000013",
									"lrrUUID": "000800-21586586",
									"state": "ACTIVE",
									"stateSince": 1714053601836,
									"cnxState": "CNX",
									"cnxStateSince": 1720604544186,
									"healthState": "ACTIVE",
									"version": "2.6.72",
									"lastReboot": 1720526866964,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1720682910370,
											"lc": "LC3",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												2,
												0,
												0,
												0,
												0
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1720666584494,
											"lc": "LC253",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												1,
												0,
												0,
												0,
												0,
												0,
												0,
												0
											]
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
												"state": 0,
												"txAvgRate": 1025,
												"rxAvgRate": 1183,
												"avgRoundTrip": 10,
												"ip": "10.199.229.166",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 1,
									"alarmCount": 4,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 0,
									"alarm2": 0,
									"alarm1": 4,
									"lat": 48.714214,
									"lon": 6.17993,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDT-0.1",
											"os_version=4.9.87",
											"hal_version=4.1.3_1",
											"custom_build_version=2.6.72-mtac_refresh_v1.5",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.1_20220714",
											"lrr_version=2.6.72",
											"fpga_version=31",
											"firmware_version=5.3.31",
											"sn_version=21586586",
											"sku_version=MTCDT-L4E1-246L"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682864599,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 1,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 1,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 71,
									"ram": 14,
									"href": "/thingpark/wireless/rest/partners/1/bss/53",
									"creationDate": 1714053601836,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1714981771398
									},
									"mfs": [
										{
											"name": "/",
											"used": 67
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": null,
									"appServers": []
								},
								{
									"name": "IP67 16 canaux - Lille 1",
									"model": {
										"commercialName": "Conduit Outdoor IP67 V1.5",
										"ID": "MULT/MTAC.6",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/25"
									},
									"lrrID": "10000017",
									"lrrUUID": "000800-22849761",
									"state": "ACTIVE",
									"stateSince": 1717676219272,
									"cnxState": "CNX",
									"cnxStateSince": 1720681348496,
									"healthState": "ACTIVE",
									"version": "2.8.44",
									"lastReboot": 1720600798126,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1720682839397,
											"lc": "LC3",
											"ant": "A1"
										},
										"history": {
											"val": [
												2,
												2,
												1,
												1,
												1,
												3,
												3,
												3,
												4,
												5
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1720682557064,
											"lc": "LC253",
											"ant": "A1"
										},
										"history": {
											"val": [
												3,
												4,
												1,
												3,
												2,
												2,
												4,
												6,
												3,
												0
											]
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
												"state": 0,
												"txAvgRate": 1250,
												"rxAvgRate": 1336,
												"avgRoundTrip": 15,
												"ip": "10.199.229.171",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 1,
									"alarmCount": 5,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 0,
									"alarm2": 0,
									"alarm1": 5,
									"lat": null,
									"lon": null,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDTIP-0.1",
											"os_version=5.4.199",
											"hal_version=",
											"custom_build_version=2.8.44-mtac_r3",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.0_20240529",
											"lrr_version=2.8.44",
											"fpga_version=NO_FPGA",
											"firmware_version=6.3.0",
											"sn_version=22849761",
											"sku_version=MTCDTIP-L4G1-266A"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682800490,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 1,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 0,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 108,
									"ram": 20,
									"href": "/thingpark/wireless/rest/partners/1/bss/64",
									"creationDate": 1717676219272,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1720600366317
									},
									"mfs": [
										{
											"name": "/",
											"used": 9
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": [
										{
											"name": "MM&SW",
											"group": {
												"name": "MM&SW"
											}
										}
									],
									"appServers": []
								},
								{
									"name": "IP67 16 canaux - Lille 2",
									"model": {
										"commercialName": "Conduit Outdoor IP67 V1.5",
										"ID": "MULT/MTAC.6",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/25"
									},
									"lrrID": "10000018",
									"lrrUUID": "000800-22849762",
									"state": "ACTIVE",
									"stateSince": 1717676240755,
									"cnxState": "CNX",
									"cnxStateSince": 1720665522482,
									"healthState": "ACTIVE",
									"version": "2.8.44",
									"lastReboot": 1720599398779,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1720682832590,
											"lc": "LC2",
											"ant": "A1"
										},
										"history": {
											"val": [
												2,
												4,
												6,
												5,
												5,
												5,
												3,
												5,
												4,
												7
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1720681771236,
											"lc": "LC253",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												1,
												3,
												2,
												0,
												0,
												0
											]
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
												"state": 0,
												"txAvgRate": 1149,
												"rxAvgRate": 1297,
												"avgRoundTrip": 23,
												"ip": "10.199.229.178",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 1,
									"alarmCount": 4,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 0,
									"alarm2": 0,
									"alarm1": 4,
									"lat": null,
									"lon": null,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDTIP-0.1",
											"os_version=5.4.199",
											"hal_version=",
											"custom_build_version=2.8.44-mtac_r3",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.0_20240529",
											"lrr_version=2.8.44",
											"fpga_version=NO_FPGA",
											"firmware_version=6.3.0",
											"sn_version=22849762",
											"sku_version=MTCDTIP-L4G1-266A"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682834061,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 1,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 0,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 109,
									"ram": 20,
									"href": "/thingpark/wireless/rest/partners/1/bss/67",
									"creationDate": 1717676240755,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1717676240755
									},
									"mfs": [
										{
											"name": "/",
											"used": 9
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": [
										{
											"name": "MM&SW",
											"group": {
												"name": "MM&SW"
											}
										}
									],
									"appServers": []
								},
								{
									"name": "IP67 16 canaux - Penly",
									"model": {
										"commercialName": "Conduit Outdoor IP67 V1.5",
										"ID": "MULT/MTAC.6",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationProfile/25"
									},
									"lrrID": "10000019",
									"lrrUUID": "000800-22842013",
									"state": "ACTIVE",
									"stateSince": 1717678812389,
									"cnxState": "CNX",
									"cnxStateSince": 1720604661332,
									"healthState": "ACTIVE",
									"version": "2.8.44",
									"lastReboot": 1720601655894,
									"power": {
										"status": 5,
										"batteryLevel": null
									},
									"upFrame": {
										"last": {
											"date": 1718795188793,
											"lc": "LC5",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0
											]
										},
										"minRC": {
											"rc": null,
											"lc": null,
											"ant": null
										}
									},
									"dwFrame": {
										"last": {
											"date": 1718649783783,
											"lc": "LC253",
											"ant": "A1"
										},
										"history": {
											"val": [
												1,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0,
												0
											]
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
												"state": 0,
												"txAvgRate": 893,
												"rxAvgRate": 1492,
												"avgRoundTrip": 7,
												"ip": "10.27.83.94",
												"connectionType": null,
												"iccid": null,
												"imei": null,
												"imsi": null,
												"networkOperator": null,
												"rscp": null,
												"rsrp": null,
												"rssi": null,
												"ssid": null,
												"ecIo": null,
												"rsrq": null,
												"sinr": null
											}
										]
									},
									"alarmLevel": 3,
									"alarmCount": 4,
									"alarm6": 0,
									"alarm5": 0,
									"alarm4": 0,
									"alarm3": 1,
									"alarm2": 0,
									"alarm1": 3,
									"lat": null,
									"lon": null,
									"alt": null,
									"customs": {
										"version": [
											"hardware_version=MTCDTIP-0.1",
											"os_version=5.4.199",
											"hal_version=",
											"custom_build_version=2.8.44-mtac_r3",
											"configuration_version=default",
											"custom1_version=",
											"custom2_version=",
											"custom3_version=bs_image_v1.0_20240529",
											"lrr_version=2.8.44",
											"fpga_version=NO_FPGA",
											"firmware_version=6.3.0",
											"sn_version=22842013",
											"sku_version=MTCDTIP-L4G1-266A"
										]
									},
									"vendor": {
										"name": "Multitech",
										"commercialName": "Multitech",
										"commercialDescription": "IoT Supplier that designs, develops and manufactures communications equipment for the industrial Internet of Things.",
										"logo": "/thingpark/wireless/rest/resources/files/logo/baseStationVendor/2"
									},
									"rfRegionID": "EU868_8channels.1",
									"lastReport": 1720682780953,
									"gpsReceiverConfig": "PRESENT",
									"gpsSync": 0,
									"timeSync": 1,
									"allowClassB": true,
									"classBState": 1,
									"activateBeaconTransmission": false,
									"activateRX2Optimization": 1,
									"ismBand": "eu868",
									"customerAdminData": null,
									"locationType": 0,
									"rfHardwareConfig": "S1_A1_B1",
									"cpu": 93,
									"ram": 20,
									"href": "/thingpark/wireless/rest/partners/1/bss/70",
									"creationDate": 1717678812389,
									"bsSecurity": {
										"type": "IPSEC_X509",
										"expirationDate": 2490424996000,
										"generationDate": 1717678812389
									},
									"mfs": [
										{
											"name": "/",
											"used": 9
										}
									],
									"beacons": {
										"totalRequested": null,
										"totalSent": null,
										"lastDeliveryCause": "00",
										"lastDeliveryFailedCause": null,
										"lastDeliveryFailedCauseDate": null
									},
									"ant": [
										{
											"cableLoss": 0.0,
											"gain": 0.0
										}
									],
									"tags": null,
									"domains": null,
									"appServers": []
								}
							],
							"more": false,
							"count": 7,
							"now": 1720682929866
						}						""";
		var bss = objectMapper.readValue(briefs, Bss.class);
	}
}
