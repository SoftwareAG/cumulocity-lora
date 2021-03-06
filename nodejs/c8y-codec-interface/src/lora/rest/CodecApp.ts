import express, { Request, Response, NextFunction } from "express";
import { DeviceCodec, Decode, Encode, MicroserviceSubscriptionService } from "../..";

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
    
    this.app.get("/models", (req: Request, res: Response, next: NextFunction) => {
      res.json(codec.getModels(subscriptionService.getClient(req)));
    })
    
    this.app.get("/operations/:model", (req: Request, res: Response, next: NextFunction) => {
      res.json(Array.from(codec.getAvailableOperations(subscriptionService.getClient(req), req.params.model)).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {}));
    })
    this.app.listen(this.PORT, () => console.log(`Now listening on port ${this.PORT}!`));
  }
}
