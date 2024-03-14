import { Component } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-wrapper-panel",
  template: `
    <fieldset class="c8y-fieldset schema-form-fieldset">
      <legend *ngIf="to.label">{{ to.label }}</legend>
      <p *ngIf="to.description">{{ to.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </fieldset>
  `,
})
export class PanelWrapperComponent extends FieldWrapper {}
