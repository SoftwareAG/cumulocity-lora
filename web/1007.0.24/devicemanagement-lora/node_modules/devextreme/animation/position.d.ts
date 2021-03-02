/**
* DevExtreme (animation/position.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface positionConfig {
    /**
     * @docid positionConfig.at
     * @type Enums.PositionAlignment|object
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    at?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | { x?: 'center' | 'left' | 'right', y?: 'bottom' | 'center' | 'top' };
    /**
     * @docid positionConfig.boundary
     * @type string|Node|jQuery|window
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    boundary?: string | Element | JQuery | Window;
    /**
     * @docid positionConfig.boundaryOffset
     * @type string|object
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    boundaryOffset?: string | { x?: number, y?: number };
    /**
     * @docid positionConfig.collision
     * @type Enums.PositionResolveCollisionXY|object
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    collision?: 'fit' | 'fit flip' | 'fit flipfit' | 'fit none' | 'flip' | 'flip fit' | 'flip none' | 'flipfit' | 'flipfit fit' | 'flipfit none' | 'none' | 'none fit' | 'none flip' | 'none flipfit' | { x?: 'fit' | 'flip' | 'flipfit' | 'none', y?: 'fit' | 'flip' | 'flipfit' | 'none' };
    /**
     * @docid positionConfig.my
     * @type Enums.PositionAlignment|object
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    my?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | { x?: 'center' | 'left' | 'right', y?: 'bottom' | 'center' | 'top' };
    /**
     * @docid positionConfig.of
     * @type string|Node|jQuery|window
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    of?: string | Element | JQuery | Window;
    /**
     * @docid positionConfig.offset
     * @type string|object
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    offset?: string | { x?: number, y?: number };
}
