import {
  CodecApp,
  MicroserviceSubscriptionService,
} from "lora-codec-interface";
import { AdeunisCodec } from "./AdeunisCodec";

let microserviceSubscriptionService: MicroserviceSubscriptionService =
  new MicroserviceSubscriptionService();

new CodecApp(
  new AdeunisCodec(microserviceSubscriptionService),
  microserviceSubscriptionService
);
