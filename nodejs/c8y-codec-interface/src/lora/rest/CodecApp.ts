import { Client } from "@c8y/client";
import express, { Request, Response, NextFunction } from "express";
import { DeviceCodec, Decode, Encode, MicroserviceSubscriptionService } from "../..";
import { DeviceOperation } from "../codec/DeviceOperation";
import { Result } from "../codec/Result";

export class CodecApp {
  app: express.Application = express();
  PORT = process.env.PORT || 80;

  constructor(codec: DeviceCodec, subscriptionService: MicroserviceSubscriptionService) {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.post("/decode", async (req: Request, res: Response, next: NextFunction) => {
      let decode: Decode = req.body;
      subscriptionService.getClient(req).then(async client => {
        res.json(await codec.decode(client, decode));
      }).catch(e => {
        res.json({success: false, message: e.message, response: null});
      })
    })

    this.app.post("/encode", async (req: Request, res: Response, next: NextFunction) => {
      let encode: Encode = req.body;
      subscriptionService.getClient(req).then(async client => {
        res.json(await codec.encode(client, encode));
      }).catch(e => {
        res.json({success: false, message: e.message, response: null});
      })
    })

    this.app.get("/models", async (req: Request, res: Response, next: NextFunction) => {
      subscriptionService.getClient(req).then(async client => {
        let models: Map<string, string> = codec.getModels(client);
        let jsonObject = {};
        models.forEach((value, key) => {
          jsonObject[key] = value
        });
        res.json(jsonObject);
      }).catch(e => {
        res.json({success: false, message: e.message, response: null});
      })
    })

    this.app.get("/operations/:model", async (req: Request, res: Response, next: NextFunction) => {
      subscriptionService.getClient(req).then(async client => {
        let operations: Map<string, DeviceOperation> = codec.getAvailableOperations(client, req.params.model);
        let jsonObject = {};
        if (!operations) {
          operations = new Map<string, DeviceOperation>();
        }
        operations.forEach((value, key) => {
          jsonObject[key] = value
        });
        res.json(jsonObject);
      }).catch(e => {
        res.json({success: false, message: e.message, response: null});
      })
    })
    this.app.listen(this.PORT, () => console.log(`Now listening on port ${this.PORT}!`));
  }
}
