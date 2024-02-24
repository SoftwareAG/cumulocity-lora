export class DeviceProvisioning {
  name: string;
  devEUI: string;
  appEUI: string;
  appKey: string;
  codec: string;
  model: string;
  type: string;
  useGatewayPosition: boolean;
  lat?: number;
  lng?: number;
}
