import { RouterModule } from "@angular/router";
import { DeviceOperation } from "../onboarding/codecs/DeviceOperation"
import { DeviceOperationElement, ParamType } from "../onboarding/codecs/DeviceOperationElement"
import { DevicesComponent } from "./devices.component";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { APP_BASE_HREF } from "@angular/common";
import { CoreModule, RouterModule as c8yRouterModule } from "@c8y/ngx-components";


describe('display operation fields', () => {
    let op: DeviceOperation = {
        id: "myop",
        name: "My op",
        elements: [
            DeviceOperationElement.string("elem1", "Elem 1")
        ]
    };

    let component: DevicesComponent;
    let fixture: ComponentFixture<DevicesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                c8yRouterModule.forRoot(),
                CoreModule.forRoot(),
            ],
            declarations: [DevicesComponent],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create formly field config', () => {
        let fields = component.getFieldFromElement(op.elements[0]);
        expect(fields.props).toBeDefined();
        expect(fields.key).toEqual("elem1");
        expect(fields.props.label).toEqual("Elem 1");
    })
})