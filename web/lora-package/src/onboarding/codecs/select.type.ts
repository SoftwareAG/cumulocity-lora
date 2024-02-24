import { Component } from "@angular/core";
import { FieldType, FormlyFieldConfig } from "@ngx-formly/core";

@Component({
  selector: "formly-select-type",
  template: `
    <c8y-wrapper-form-field>
      <div class="form-group">
        <div class="c8y-select-wrapper">
          <label [for]="field.key">{{ field.templateOptions?.label }}</label>
          <select
            class="form-control"
            [formControl]="formControl"
            [formlyAttributes]="field"
          >
            <option
              *ngFor="let o of field.templateOptions?.options"
              [value]="o.value"
            >
              {{ o.label }}
            </option>
          </select>
        </div>
      </div>
    </c8y-wrapper-form-field>
  `,
})
export class SelectTypeComponent extends FieldType<FormlyFieldConfig> {}
