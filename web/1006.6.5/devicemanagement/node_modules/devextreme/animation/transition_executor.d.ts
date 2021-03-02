/**
* DevExtreme (animation/transition_executor.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    animationConfig
} from './fx';

/** The manager that performs several specified animations at a time. */
export default class TransitionExecutor {
    /**
     * @docid TransitionExecutorMethods.enter
     * @publicName enter(elements, animation)
     * @param1 elements:jQuery
     * @param2 animation:animationConfig|string
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    enter(elements: JQuery, animation: animationConfig | string): void;
    /**
     * @docid TransitionExecutorMethods.leave
     * @publicName leave(elements, animation)
     * @param1 elements:jQuery
     * @param2 animation:animationConfig|string
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    leave(elements: JQuery, animation: animationConfig | string): void;
    /**
     * @docid TransitionExecutorMethods.reset
     * @publicName reset()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    reset(): void;
    /**
     * @docid TransitionExecutorMethods.start
     * @publicName start()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    start(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid TransitionExecutorMethods.stop
     * @publicName stop()
     * @prevFileNamespace DevExpress.animation
     * @public
     */
    stop(): void;
}
