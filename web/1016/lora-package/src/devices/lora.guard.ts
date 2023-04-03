import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoraGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const contextData = route.data.contextData || route.parent.data.contextData;
    return (
      contextData.type === "c8y_LoRaDevice" ||
      contextData.lora_ns_device_LoRaDevice != undefined
    );
  }
}
