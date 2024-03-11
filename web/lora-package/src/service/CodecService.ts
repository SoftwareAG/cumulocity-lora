import { Injectable } from "@angular/core";
import { IFetchResponse, IManagedObject, InventoryService } from "@c8y/client";
import { AlertService } from "@c8y/ngx-components";
import { FetchClient } from "@c8y/ngx-components/api";
import { Decode } from "./Decode";
import { Encode } from "./Encode";

@Injectable({
  providedIn: "root",
})
export class CodecService {
  codecs: IManagedObject[];
  codecMap: {};

  private codecsFilter: object = {
    type: "Device Codec",
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 100,
  };

  constructor(
    private client: FetchClient,
    private inventory: InventoryService,
    private alertService: AlertService
  ) {
    this.loadCodecs();
  }

  async loadCodecs() {
    const { data, res, paging } = await this.inventory.list(this.codecsFilter);
    this.codecs = data;
    this.codecMap = {};
    data.forEach(
      (codec) =>
        (this.codecMap[codec.lora_codec_DeviceCodecRepresentation.id] =
          codec.lora_codec_DeviceCodecRepresentation)
    );
  }

  private async getJson(response: IFetchResponse) {
    console.log(response);
    if (response.ok) {
      return await response.json();
    } else {
      let error = await response.json();
      this.alertService.danger(error.message, error.detailedMessage);
    }
  }

  async decode(codec: string, decode: Decode) {
    const response = await this.client.fetch(
      "service/lora-codec-" + codec + "/decode",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decode),
      }
    );
    return this.getJson(response);
  }

  async encode(codec: string, encode: Encode) {
    const response = await this.client.fetch(
      "service/lora-codec-" + codec + "/encode",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encode),
      }
    );
    return this.getJson(response);
  }

  async getModels(codec: string) {
    const response = await this.client.fetch(
      "service/lora-codec-" + codec + "/models"
    );
    return this.getJson(response);
  }

  async getOperations(codec: string, model: string) {
    const response = await this.client.fetch(
      "service/lora-codec-" + codec + "/operations/" + model
    );
    return this.getJson(response);
  }
}
