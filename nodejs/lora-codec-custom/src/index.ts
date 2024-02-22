import {
  DeviceCodec,
  CodecApp,
  C8YData,
  DownlinkData,
  MicroserviceSubscriptionService,
  DeviceOperation,
} from "lora-codec-interface";
import { Client, IManagedObject } from "@c8y/client";
import { Request, Response, NextFunction } from "express";
import { CustomCodec } from "./CustomCodec";
import { ParamType } from "lora-codec-interface/dist/lora/codec/downlink/DeviceOperationElement";

class CustomDeviceCodec extends DeviceCodec {
  getId(): string {
    return "custom";
  }
  getName(): string {
    return "Custom";
  }
  getVersion(): string {
    return "1.0";
  }
  getModels(client: Client): Map<string, string> {
    let models: Map<string, string> = new Map<string, string>();
    this.customCodecs.get(client).forEach((c) => {
      models.set(c.name, c.name);
    });
    console.log(models);
    return models;
  }
  askDeviceConfig(devEui: string): DownlinkData {
    return { devEui: devEui, fport: 1, payload: "01" };
  }
  getAvailableOperations(
    client: Client,
    model: string
  ): Map<string, DeviceOperation> {
    let operations: Map<string, DeviceOperation> = new Map();
    this.customCodecs
      .get(client)
      .get(model)
      .operations.forEach((o) => {
        operations.set(o.id, o);
      });
    return operations;
  }
  protected _decode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    fport: number,
    time: Date,
    payload: string
  ): C8YData {
    return this.customCodecs
      .get(client)
      .get(model)
      .decode(mo, fport, time, payload);
  }
  protected _encode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    operation: string
  ): DownlinkData {
    return this.customCodecs.get(client).get(model).encode(mo, operation);
  }

  customCodecs: Map<Client, Map<string, CustomCodec>> = new Map<
    Client,
    Map<string, CustomCodec>
  >();

  constructor(serviceSubscriptionService: MicroserviceSubscriptionService) {
    super(serviceSubscriptionService);
    serviceSubscriptionService.on(
      "newMicroserviceSubscription",
      async (client: Client) => {
        if (!this.customCodecs.has(client)) {
          this.customCodecs.set(client, new Map<string, CustomCodec>());
        }
        (
          await client.inventory.list({
            type: "CustomCodec",
            pageSize: 1000,
            withTotalPages: true,
          })
        ).data.forEach((mo) => {
          this.customCodecs.get(client).set(mo.name, new CustomCodec(mo));
          if (!mo.operations) {
            mo.operations = new Array<DeviceOperation>();
          }
          if (mo.operations.size == 0) {
            mo.operations.push(<DeviceOperation>{
              id: "test",
              name: "Sample operation",
              elements: [
                {
                  id: "param1",
                  name: "Param 1",
                  type: ParamType.STRING,
                  value: null,
                },
                {
                  id: "param2",
                  name: "Param 2",
                  type: ParamType.INTEGER,
                  value: null,
                },
              ],
            });
          }
          this.customCodecs.get(client).get(mo.name).operations = mo.operations;
        });
      }
    );
  }
}

class CustomCodecApp extends CodecApp {
  constructor(
    codec: CustomDeviceCodec,
    subscriptionService: MicroserviceSubscriptionService
  ) {
    super(codec, subscriptionService);
    this.app.post(
      "/model",
      async (req: Request, res: Response, next: NextFunction) => {
        subscriptionService
          .getClient(req)
          .then(async (client) => {
            let mo: IManagedObject = (
              await client.inventory.create({
                type: "CustomCodec",
                name: req.body.name,
              })
            ).data;
            if (!codec.customCodecs.has(client)) {
              codec.customCodecs.set(client, new Map<string, CustomCodec>());
            }
            codec.customCodecs.get(client).set(mo.name, new CustomCodec(mo));
            res.json(mo);
          })
          .catch((e) => {
            res.json({ error: e.message });
            res.status(500);
          });
      }
    );
    this.app.delete(
      "/model/:name",
      async (req: Request, res: Response, next: NextFunction) => {
        subscriptionService
          .getClient(req)
          .then(async (client) => {
            // deleting by name will be deprecated
            console.log("Will delete codec identified by " + req.params.name);
            if (codec.customCodecs.get(client).get(req.params.name)) {
              console.log("Deleting by name");
              await client.inventory.delete(
                codec.customCodecs.get(client).get(req.params.name).id
              );
              codec.customCodecs.get(client).delete(req.params.name);
            } else {
              // Let's assume it's an mo id then
              console.log("Deleting by id");
              await client.inventory.delete(req.params.name);
              Array.from(codec.customCodecs.get(client).values())
                .filter((codec) => codec.id === req.params.name)
                .forEach((c) => {
                  console.log("Deleting " + c.name + " " + c.id);
                  codec.customCodecs.get(client).delete(c.name);
                });
            }
            res.json({ message: "deteted" });
            res.status(204);
          })
          .catch((e) => {
            res.json({ error: e.message });
            res.status(500);
          });
      }
    );
    this.app.post(
      "/model/decoder",
      async (req: Request, res: Response, next: NextFunction) => {
        subscriptionService
          .getClient(req)
          .then(async (client) => {
            let mo: IManagedObject = (
              await client.inventory.detail(req.body.id)
            ).data;
            codec.customCodecs.get(client).get(mo.name).decodeString =
              req.body.decodeString;
            res.json(
              await client.inventory.update({
                id: req.body.id,
                decodeString: req.body.decodeString,
              })
            );
          })
          .catch((e) => {
            res.json({ error: e.message });
            res.status(500);
          });
      }
    );
    this.app.post(
      "/model/encoder",
      async (req: Request, res: Response, next: NextFunction) => {
        subscriptionService
          .getClient(req)
          .then(async (client) => {
            let mo: IManagedObject = (
              await client.inventory.detail(req.body.id)
            ).data;
            codec.customCodecs.get(client).get(mo.name).encodeString =
              req.body.encodeString;
            res.json(
              await client.inventory.update({
                id: req.body.id,
                encodeString: req.body.encodeString,
              })
            );
          })
          .catch((e) => {
            res.json({ error: e.message });
            res.status(500);
          });
      }
    );
    this.app.post(
      "/model/operation",
      async (req: Request, res: Response, next: NextFunction) => {
        subscriptionService
          .getClient(req)
          .then(async (client) => {
            let mo: IManagedObject = (
              await client.inventory.detail(req.body.id)
            ).data;
            codec.customCodecs.get(client).get(mo.name).operations =
              req.body.operations;
            res.json(
              await client.inventory.update({
                id: mo.id,
                operations: req.body.operations,
              })
            );
          })
          .catch((e) => {
            res.json({ error: e.message });
            res.status(500);
          });
      }
    );
  }
}

let microserviceSubscriptionService: MicroserviceSubscriptionService =
  new MicroserviceSubscriptionService();

new CustomCodecApp(
  new CustomDeviceCodec(microserviceSubscriptionService),
  microserviceSubscriptionService
);
