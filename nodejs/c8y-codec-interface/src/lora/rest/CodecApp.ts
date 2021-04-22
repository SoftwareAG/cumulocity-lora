import express, { Request, Response, NextFunction } from "express";
import { DeviceCodec, Decode, Encode, MicroserviceSubscriptionService } from "../..";
import { DeviceOperation } from "../codec/DeviceOperation";

export class CodecApp {
  app: express.Application = express();
  PORT = process.env.PORT || 80;

  constructor(codec: DeviceCodec, subscriptionService: MicroserviceSubscriptionService) {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.post("/decode", async (req: Request, res: Response, next: NextFunction) => {
      let decode: Decode = req.body;
      res.json(await codec.decode(subscriptionService.getClient(req), decode));
    })

    this.app.post("/encode", async (req: Request, res: Response, next: NextFunction) => {
      let encode: Encode = req.body;
      res.json(await codec.encode(subscriptionService.getClient(req), encode));
    })

    this.app.get("/models", async (req: Request, res: Response, next: NextFunction) => {
      let models: Map<string, string> = codec.getModels(subscriptionService.getClient(req));
      let jsonObject = {};
      models.forEach((value, key) => {
        jsonObject[key] = value
      });
      res.json(jsonObject);
    })

    this.app.get("/operations/:model", async (req: Request, res: Response, next: NextFunction) => {
      let operations: Map<string, DeviceOperation> = codec.getAvailableOperations(subscriptionService.getClient(req), req.params.model);
      let jsonObject = {};
      if (!operations) {
        operations = new Map<string, DeviceOperation>();
      }
      operations.forEach((value, key) => {
        jsonObject[key] = value
      });
      res.json(operations);
    })
    this.app.listen(this.PORT, () => console.log(`Now listening on port ${this.PORT}!`));
  }
}
