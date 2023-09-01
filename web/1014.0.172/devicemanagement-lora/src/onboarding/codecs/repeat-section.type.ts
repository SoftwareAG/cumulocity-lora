import { Component } from "@angular/core";
import { FieldArrayType } from "@ngx-formly/core";

@Component({
  selector: "formly-repeat-section",
  template: `
    <div *ngFor="let f of field.fieldGroup; let i = index" class="row">
      <formly-field class="col" [field]="f"></formly-field>
      <div class="col-sm-2" *ngIf="field.fieldGroup.length > to.minOccur">
        <button class="btn btn-danger" type="button" (click)="remove(i)">
          {{ to.removeText }}
        </button>
      </div>
    </div>
    <div
      style="margin:30px 0;"
      *ngIf="field.fieldGroup && field.fieldGroup.length < to.maxOccur"
    >
      <button class="btn btn-primary" type="button" (click)="add()">
        {{ to.addText }}
      </button>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
