import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { DeviceCodec, Decode, Encode, MicroserviceSubscriptionService } from "../..";

export class CodecApp {
  app: express.Application = express();
  PORT = process.env.PORT || 80;

  constructor(codec: DeviceCodec, subscriptionService: MicroserviceSubscriptionService) {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.post("/decode", async (req: Request, res: Response, next: express.NextFunction) => {
      let decode: Decode = req.body;
      res.json(await codec.decode(subscriptionService.getClient(req), decode));
    })
    
    this.app.post("/encode", async (req: Request, res: Response, next: express.NextFunction) => {
      let encode: Encode = req.body;
      res.json(await codec.encode(subscriptionService.getClient(req), encode));
    })
    
    this.app.get("/models", (req: Request, res: Response, next: express.NextFunction) => {
      res.json(codec.getModels());
    })
    
    this.app.get("/operations/:model", (req: Request, res: Response, next: express.NextFunction) => {
      res.json(Array.from(codec.getAvailableOperations(req.params.model)).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {}));
    })
    this.app.listen(this.PORT, () => console.log(`Now listening on port ${this.PORT}!`));
  }
}
