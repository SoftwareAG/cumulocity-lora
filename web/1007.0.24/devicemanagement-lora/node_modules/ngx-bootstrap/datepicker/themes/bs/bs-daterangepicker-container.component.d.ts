import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { Subscription } from 'rxjs';
export declare class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent implements OnInit, OnDestroy {
    private _actions;
    private _config;
    private _store;
    private _element;
    private _positionService;
    value: Date[];
    valueChange: EventEmitter<Date[]>;
    animationState: string;
    _rangeStack: Date[];
    _subs: Subscription[];
    constructor(_effects: BsDatepickerEffects, _actions: BsDatepickerActions, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _positionService: PositioningService);
    ngOnInit(): void;
    readonly isTopPosition: boolean;
    positionServiceEnable(): void;
    daySelectHandler(day: DayViewModel): void;
    ngOnDestroy(): void;
}
