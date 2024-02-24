import { Component } from "@angular/core";
import { LnsService } from "../service/LnsService";
import { FetchClient, IManagedObject } from "@c8y/client";

@Component({
  selector: "simulator",
  templateUrl: "./simulator.component.html",
})
export class SimulatorComponent {
  payload: string;
  constructor(
    public lnsService: LnsService,
    private fetchClient: FetchClient
  ) {}
  editorOptions = {
    theme: "vs-dark",
    language: "json",
    onMonacoLoad: () => {
      console.log("In monaco onload");
    },
  };
  async loadPayload(
    instance: string,
    devEUI: string | null,
    fport: number | null,
    devicePayload: string | null
  ) {
    if (instance) {
      console.log(devEUI);
      console.log(fport);
      console.log(devicePayload);
      let lnsInstance: IManagedObject = this.lnsService.instanceMap[instance];
      this.payload = await (
        await this.fetchClient.fetch(
          "service/lora-ns-" + lnsInstance.lnsType + "/simulatePayload",
          {
            params: Object.fromEntries(
              Object.entries({
                deveui: devEUI,
                port: fport,
                payload: devicePayload,
              }).filter(([_, v]) => v != null)
            ),
          }
        )
      ).text();
    }
  }
  sendPayload(instance: string) {
    let lnsInstance: IManagedObject = this.lnsService.instanceMap[instance];
    this.fetchClient.fetch(
      "service/lora-ns-" + lnsInstance.lnsType + "/" + instance + "/uplink",
      {
        method: "POST",
        body: this.payload,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
