import { DeviceCodec, CodecApp, C8YData, DownlinkData, MicroserviceSubscriptionService, DeviceOperation } from 'c8y-codec-interface';
import { Client, IManagedObject } from '@c8y/client';
import { Request, Response, NextFunction } from "express";
import { CustomCodec } from './CustomCodec';

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
        this.customCodecs.get(client).forEach(c => {models.set(c.name, c.name)});
        return models;
    }
    askDeviceConfig(devEui: string): DownlinkData {
        return {devEui: devEui, fport: 1, payload: "01"};
    }
    getAvailableOperations(client: Client, model: string): Map<string, DeviceOperation> {
        return this.operations.get(client).get(model);
    }
    protected _decode(client: Client, mo: IManagedObject, model: string, fport: number, time: Date, payload: string): C8YData {
        return this.customCodecs.get(client).get(model).decode(mo, fport, time, payload);
    }
    protected _encode(client: Client, mo: IManagedObject, model: string, operation: string): DownlinkData {
        return this.customCodecs.get(client).get(model).encode(mo, operation);
    }

    customCodecs: Map<Client, Map<string, CustomCodec>> = new Map<Client, Map<string, CustomCodec>>();
    operations: Map<Client, Map<string, Map<string, DeviceOperation>>> = new Map<Client, Map<string, Map<string, DeviceOperation>>>();

    constructor(serviceSubscriptionService: MicroserviceSubscriptionService) {
        super(serviceSubscriptionService);
        serviceSubscriptionService.on('newMicroserviceSubscription', async (client: Client) => {
            if (!this.customCodecs.has(client)) {
                this.customCodecs.set(client, new Map<string, CustomCodec>());
            }
            if (!this.operations.has(client)) {
                this.operations.set(client, new Map<string, Map<string, DeviceOperation>>());
            }
            (await client.inventory.list({type: 'CustomCodec'})).data.forEach(mo => {
                this.customCodecs.get(client).set(mo.name, new CustomCodec(mo));
                this.operations.get(client).set(mo.name, mo.operations);
            })
        });
    }
}

class CustomCodecApp extends CodecApp {
    constructor(codec: CustomDeviceCodec, subscriptionService: MicroserviceSubscriptionService) {
        super(codec, subscriptionService);
        this.app.post("/model", async (req: Request, res: Response, next: NextFunction) => {
            let client: Client = subscriptionService.getClient(req);
            let mo: IManagedObject = (await client.inventory.create({type: 'CustomCodec', name: req.body.name})).data;
            if (!codec.customCodecs.has(client)) {
                codec.customCodecs.set(client, new Map<string, CustomCodec>());
            }
            codec.customCodecs.get(client).set(mo.name, new CustomCodec(mo));
            res.json(mo);
        });
        this.app.delete("/model/:name", async (req: Request, res: Response, next: NextFunction) => {
            let client: Client = subscriptionService.getClient(req);
            await client.inventory.delete(codec.customCodecs.get(client).get(req.params.name).id);
            codec.customCodecs.get(client).delete(req.params.name);
            res.json({message: 'deteted'});
            res.status(204);
        });
        this.app.post("/model/decoder", async (req: Request, res: Response, next: NextFunction) => {
            let client: Client = subscriptionService.getClient(req);
            let mo: IManagedObject = (await client.inventory.detail(req.body.id)).data;
            codec.customCodecs.get(client).get(mo.name).decodeString = req.body.decodeString;
            res.json(await client.inventory.update({id: req.body.id, decodeString: req.body.decodeString}));
        });
        this.app.post("/model/operation", async (req: Request, res: Response, next: NextFunction) => {
            let client: Client = subscriptionService.getClient(req);
            let mo: IManagedObject = (await client.inventory.detail(req.body.id)).data;
            codec.operations.get(client).get(mo.name).set(req.body.operationName, req.body.operation);
            let operations: Map<string, DeviceOperation> = mo.operations || new Map<string, DeviceOperation>();
            let encodeStrings : Map<string, string> = mo.encodeStrings || new Map<string, string>();
            operations.set(req.body.operationName, req.body.operation);
            encodeStrings.set(req.body.operationName, req.body.encodeString);
            codec.customCodecs.get(client).get(mo.name).addEncodeString(req.body.operation, req.body.encodeString);
            res.json(await client.inventory.update({id: mo.id, operations: operations, encodeStrings: encodeStrings}));
        });
    }
}

let microserviceSubscriptionService: MicroserviceSubscriptionService = new MicroserviceSubscriptionService();

new CustomCodecApp(new CustomDeviceCodec(microserviceSubscriptionService), microserviceSubscriptionService);