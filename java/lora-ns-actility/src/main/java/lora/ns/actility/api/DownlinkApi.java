package lora.ns.actility.api;

import java.time.OffsetDateTime;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface DownlinkApi {

  /**
   * Send a downlink payload to a LoRaWAN® device or a multicast group Send a
   * downlink payload to a LoRaWAN® device or a multicast group
   * 
   * @param devEUI                  Target device IEEE EUI64 in hexadecimal format
   *                                (representing 8 octets) (required)
   * @param fport                   Target port (in decimal format). This query
   *                                parameter is needed only if the Application
   *                                Server provides a payload. (optional)
   * @param payload                 Hexadecimal payload. The hexadecimal payload
   *                                will be encrypted by the LRC cluster if the
   *                                FCntDn parameter is absent, and if the LRC has
   *                                been configured with an AppSKey for the
   *                                specified LoRaWAN® port. Otherwise the payload
   *                                must be encrypted by the Application Server
   *                                according to the LoRaWAN® specification, and
   *                                the FCntDn parameter must be present. The
   *                                Application Server encryption uses the
   *                                downlink counter, which is why the FCntDn
   *                                query parameter is required in this case. The
   *                                payload can be omitted when
   *                                FlushDownlinkQueue&#x3D;1: in this case no
   *                                downlink payload is inserted in the AS
   *                                downlink queue of the device after the purge.
   *                                (optional)
   * @param fcntDn                  The LoRaWAN® Downlink Counter value is used to
   *                                encrypt the payload. This query parameter is
   *                                needed only if the Application Server provides
   *                                an encrypted payload. If present, FCntDn will
   *                                be copied in the LoRaWAN® header field FCnt,
   *                                and the encrypted payload will be copied as-is
   *                                to the LoRaWAN® downlink frame by the LRC.
   *                                Only applicable to LoRaWAN® 1.0. (optional)
   * @param afCntDn                 The LoRaWAN® Applicative Downlink Counter
   *                                value is used to encrypt the payload. This
   *                                query parameter is needed only if the
   *                                Application Server provides an encrypted
   *                                payload. If present, AFCntDn will be copied in
   *                                the LoRaWAN® header field FCnt, and the
   *                                encrypted payload will be copied as-is to the
   *                                LoRaWAN® downlink frame by the LRC. Only
   *                                applicable to LoRaWAN® 1.1. (optional)
   * @param confirmed               A value of Confirmed&#x3D;0 requests
   *                                transmission of an UNCONFIRMED downlink frame.
   *                                A value of Confirmed&#x3D;1 requests
   *                                transmission of a CONFIRMED downlink frame.
   *                                Default value is Confirmed&#x3D;0
   *                                (UNCONFIRMED). Support of CONFIRMED downlink
   *                                frame transmission is subject to Connectivity
   *                                plan feature flag ackedDownlinkFrame. If the
   *                                Confirmed flag is set on the HTTP POST and the
   *                                device is associated with a Connectivity plan
   *                                where the ackedDownlinkFrame feature flag is
   *                                set, the downlink packet is processed.
   *                                Otherwise the processing is aborted, and a
   *                                specific error code is returned to the AS in
   *                                the HTTP response. The Network Server never
   *                                tries to re-send a CONFIRMED downlink if the
   *                                device acknowledgment is not received. This is
   *                                up to the Application Server to decide what to
   *                                do when a DL acknowledgment has not been
   *                                successfully received, e.g. either resend the
   *                                same frame, send another follow-up frame with
   *                                updated payload, or don&#39;t send anything.
   *                                When targeting a multicast device, only
   *                                UNCONFIRMED downlink frame is supported.
   *                                (optional, default to 0)
   * @param flushDownlinkQueue      Empties the device AS downlink queue of the
   *                                device (Boolean). When this parameter is set
   *                                to FlushDownlinkQueue&#x3D;1, the AS requests
   *                                the LRC to purge the AS downlink queue of the
   *                                device. If a payload is provided, it is
   *                                inserted in the AS downlink queue of the
   *                                device after the purge. (optional, default to
   *                                0)
   * @param validityTime            Associates the AS downlink payload with an
   *                                expiration date (ISO 8601 timestamp or
   *                                Duration in seconds) in the device AS downlink
   *                                queue. If the AS downlink payload has not yet
   *                                been sent to the device, the AS downlink
   *                                payload will be discarded by the LRC when the
   *                                expiration date is reached. (optional)
   * @param AS_ID                   Application Server ID, as provisioned in the
   *                                AS Profile. AS_ID is mandatory if the
   *                                Application server authentication has been
   *                                activated in the AS Profile. In this case, the
   *                                LRC will check that the Application Server is
   *                                authorized to send downlink command to the
   *                                device. (optional)
   * @param time                    ISO 8601 time of the request. Time is
   *                                mandatory when the Application server
   *                                authentication has been activated in the AS
   *                                Profile. In this case the LRC will verify the
   *                                time deviation between the generation and the
   *                                reception of the request. The deviation must
   *                                be lower than Max Time Deviation defined in
   *                                the AS Profile. Note: In the URL of the HTTP
   *                                request, use %2B ASCII code for the +
   *                                character and the %3A ASCII code for the :
   *                                character. (optional)
   * @param token                   Security token to sign the downlink frame.
   *                                Token is mandatory when the Application server
   *                                authentication has been activated in the AS
   *                                Profile. (optional)
   * @param correlationID           64 bits ID used to correlate the downlink
   *                                frame with the associated downlink frame sent
   *                                report or multicast summary reports. When this
   *                                parameter is provided, it is sent back in the
   *                                associated downlink frame sent report for
   *                                unicast downlink frame or in the associated
   *                                multicast summary reports for multicast
   *                                downlink frame. (optional)
   * @param retryIneligibleGateways When set to 1 or not provided, non eligible
   *                                gateways (GPS out of sync for Class B, gateway
   *                                down for Class B/C…) are retried during each
   *                                retransmission attempt. When set to 0, non
   *                                eligible gateways are excluded at the
   *                                beginning of the multicast campaign and not
   *                                retried during each retransmission attempt.
   *                                This parameter is only applicable to multicast
   *                                downlink transmission. (optional, default to
   *                                1)
   */
  @RequestLine("POST /v2/downlink?DevEUI={devEUI}&FPort={fport}&Payload={payload}&FCntDn={fcntDn}&AFCntDn={afCntDn}&Confirmed={confirmed}&FlushDownlinkQueue={flushDownlinkQueue}&ValidityTime={validityTime}&AS_ID={AS_ID}&Time={time}&Token={token}&CorrelationID={correlationID}&RetryIneligibleGateways={retryIneligibleGateways}")
  @Headers({ "Accept: application/json", })
  void v2DownlinkPost(@Param("devEUI") String devEUI, @Param("fport") Integer fport, @Param("payload") String payload,
          @Param("fcntDn") Integer fcntDn, @Param("afCntDn") Integer afCntDn, @Param("confirmed") Integer confirmed,
          @Param("flushDownlinkQueue") Integer flushDownlinkQueue, @Param("validityTime") Integer validityTime,
          @Param("AS_ID") String AS_ID, @Param("time") OffsetDateTime time, @Param("token") String token,
          @Param("correlationID") String correlationID,
          @Param("retryIneligibleGateways") Integer retryIneligibleGateways);
}
