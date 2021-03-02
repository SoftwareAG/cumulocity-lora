/**
* DevExtreme (animation/presets.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device
} from '../core/devices';

import {
    animationConfig
} from './fx';

/** A repository of animations. */
export default class animationPresets {
    /**
     * @docid animationPresetsMethods.applyChanges
     * @publicName applyChanges()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    applyChanges(): void;
    /**
     * @docid animationPresetsMethods.clear
     * @publicName clear()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    clear(): void;
    /**
     * @docid animationPresetsMethods.clear
     * @publicName clear(name)
     * @param1 name:string
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    clear(name: string): void;
    /**
     * @docid animationPresetsMethods.getPreset
     * @publicName getPreset(name)
     * @param1 name:string
     * @return any
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    getPreset(name: string): any;
    /**
     * @docid animationPresetsMethods.registerDefaultPresets
     * @publicName registerDefaultPresets()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    registerDefaultPresets(): void;
    /**
     * @docid animationPresetsMethods.registerPreset
     * @publicName registerPreset(name, config)
     * @param1 name:string
     * @param2 config:object
     * @param2_field1 animation:animationConfig
     * @param2_field2 device:Device
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    registerPreset(name: string, config: { animation?: animationConfig, device?: Device }): void;
    /**
     * @docid animationPresetsMethods.resetToDefaults
     * @publicName resetToDefaults()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    resetToDefaults(): void;
}
