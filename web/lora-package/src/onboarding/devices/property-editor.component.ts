import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DeviceAdditionalProperty } from "src/service/DeviceAdditionalProperty";

@Component({
  templateUrl: "./property-editor.component.html",
  selector: "property-editor",
})
export class PropertyEditorComponent {
  @Input() property: DeviceAdditionalProperty;
  @Input() inputValue: string = "";
  @Input() displayLabel: boolean = true;

  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  change() {
    this.inputValueChange.emit(this.inputValue);
  }
}
