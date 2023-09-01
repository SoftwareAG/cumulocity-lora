import { Component } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-wrapper-panel",
  template: `
    <fieldset>
      <div class="legend form-block center">{{ to.label }}</div>
      <ng-container #fieldComponent></ng-container>
    </fieldset>
  `,
})
export class PanelWrapperComponent extends FieldWrapper {}
