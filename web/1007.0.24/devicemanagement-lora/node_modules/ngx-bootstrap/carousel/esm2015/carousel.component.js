/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-file-line-count
/***
 * pause (not yet supported) (?string='hover') - event group name which pauses
 * the cycling of the carousel, if hover pauses on mouseenter and resumes on
 * mouseleave keyboard (not yet supported) (?boolean=true) - if false
 * carousel will not react to keyboard events
 * note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a
 * current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be
 * "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { isBs3, LinkedList } from 'ngx-bootstrap/utils';
import { CarouselConfig } from './carousel.config';
import { findLastIndex, chunkByNumber } from './utils';
/** @enum {number} */
const Direction = {
    UNKNOWN: 0,
    NEXT: 1,
    PREV: 2,
};
export { Direction };
Direction[Direction.UNKNOWN] = 'UNKNOWN';
Direction[Direction.NEXT] = 'NEXT';
Direction[Direction.PREV] = 'PREV';
/**
 * Base element to create carousel
 */
export class CarouselComponent {
    /**
     * @param {?} config
     * @param {?} ngZone
     */
    constructor(config, ngZone) {
        this.ngZone = ngZone;
        /* If `true` - carousel indicators indicate slides chunks
             works ONLY if singleSlideOffset = FALSE */
        this.indicatorsByChunk = false;
        /* If value more then 1 — carousel works in multilist mode */
        this.itemsPerSlide = 1;
        /* If `true` — carousel shifts by one element. By default carousel shifts by number
             of visible elements (itemsPerSlide field) */
        this.singleSlideOffset = false;
        /**
         * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
         */
        this.activeSlideChange = new EventEmitter(false);
        /**
         * Will be emitted when active slides has been changed in multilist mode
         */
        this.slideRangeChange = new EventEmitter();
        /* Index to start display slides from it */
        this.startFromIndex = 0;
        this._slides = new LinkedList();
        this._currentVisibleSlidesIndex = 0;
        this.destroyed = false;
        this.getActive = (/**
         * @param {?} slide
         * @return {?}
         */
        (slide) => slide.active);
        this.makeSlidesConsistent = (/**
         * @param {?} slides
         * @return {?}
         */
        (slides) => {
            slides.forEach((/**
             * @param {?} slide
             * @param {?} index
             * @return {?}
             */
            (slide, index) => slide.item.order = index));
        });
        Object.assign(this, config);
    }
    /**
     * Index of currently displayed slide(started for 0)
     * @param {?} index
     * @return {?}
     */
    set activeSlide(index) {
        if (this.multilist) {
            return;
        }
        if (this._slides.length && index !== this._currentActiveSlide) {
            this._select(index);
        }
    }
    /**
     * @return {?}
     */
    get activeSlide() {
        return this._currentActiveSlide;
    }
    /**
     * Delay of item cycling in milliseconds. If false, carousel won't cycle
     * automatically.
     * @return {?}
     */
    get interval() {
        return this._interval;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this._interval = value;
        this.restartTimer();
    }
    /**
     * @return {?}
     */
    get slides() {
        return this._slides.toArray();
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.singleSlideOffset) {
                this.indicatorsByChunk = false;
            }
            if (this.multilist) {
                this._chunkedSlides = chunkByNumber(this.mapSlidesAndIndexes(), this.itemsPerSlide);
                this.selectInitialSlides();
            }
        }), 0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed = true;
    }
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    addSlide(slide) {
        this._slides.add(slide);
        if (this.multilist && this._slides.length <= this.itemsPerSlide) {
            slide.active = true;
        }
        if (!this.multilist && this._slides.length === 1) {
            this._currentActiveSlide = undefined;
            this.activeSlide = 0;
            this.play();
        }
        if (this.multilist && this._slides.length > this.itemsPerSlide) {
            this.play();
        }
    }
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    removeSlide(slide) {
        /** @type {?} */
        const remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            /** @type {?} */
            let nextSlideIndex = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._select(nextSlideIndex);
            }), 0);
        }
        else {
            this._slides.remove(remIndex);
            /** @type {?} */
            const currentSlideIndex = this.getCurrentSlideIndex();
            setTimeout((/**
             * @return {?}
             */
            () => {
                // after removing, need to actualize index of current active slide
                this._currentActiveSlide = currentSlideIndex;
                this.activeSlideChange.emit(this._currentActiveSlide);
            }), 0);
        }
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    nextSlideFromInterval(force = false) {
        this.move(Direction.NEXT, force);
    }
    /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    nextSlide(force = false) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        this.move(Direction.NEXT, force);
    }
    /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    previousSlide(force = false) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        this.move(Direction.PREV, force);
    }
    /**
     * @return {?}
     */
    getFirstVisibleIndex() {
        return this.slides.findIndex(this.getActive);
    }
    /**
     * @return {?}
     */
    getLastVisibleIndex() {
        return findLastIndex(this.slides, this.getActive);
    }
    /**
     * @param {?} direction
     * @param {?=} force
     * @return {?}
     */
    move(direction, force = false) {
        /** @type {?} */
        const firstVisibleIndex = this.getFirstVisibleIndex();
        /** @type {?} */
        const lastVisibleIndex = this.getLastVisibleIndex();
        if (this.noWrap) {
            if (direction === Direction.NEXT &&
                this.isLast(lastVisibleIndex) ||
                direction === Direction.PREV &&
                    firstVisibleIndex === 0) {
                return;
            }
        }
        if (!this.multilist) {
            this.activeSlide = this.findNextSlideIndex(direction, force);
        }
        else {
            this.moveMultilist(direction);
        }
    }
    /**
     * Swith slides by enter, space and arrows keys
     * \@internal
     * @param {?} event
     * @return {?}
     */
    keydownPress(event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 13 || event.key === 'Enter' || event.keyCode === 32 || event.key === 'Space') {
            this.nextSlide();
            event.preventDefault();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 37 || event.key === 'LeftArrow') {
            this.previousSlide();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 39 || event.key === 'RightArrow') {
            this.nextSlide();
            return;
        }
    }
    /**
     * Play on mouse leave
     * \@internal
     * @return {?}
     */
    onMouseLeave() {
        if (!this.pauseOnFocus) {
            this.play();
        }
    }
    /**
     * Play on mouse up
     * \@internal
     * @return {?}
     */
    onMouseUp() {
        if (!this.pauseOnFocus) {
            this.play();
        }
    }
    /**
     * When slides on focus autoplay is stopped(optional)
     * \@internal
     * @return {?}
     */
    pauseFocusIn() {
        if (this.pauseOnFocus) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }
    /**
     * When slides out of focus autoplay is started
     * \@internal
     * @return {?}
     */
    pauseFocusOut() {
        this.play();
    }
    /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    selectSlide(index) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        if (!this.multilist) {
            this.activeSlide = this.indicatorsByChunk ? index * this.itemsPerSlide : index;
        }
        else {
            this.selectSlideRange(this.indicatorsByChunk ? index * this.itemsPerSlide : index);
        }
    }
    /**
     * Starts a auto changing of slides
     * @return {?}
     */
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    }
    /**
     * Stops a auto changing of slides
     * @return {?}
     */
    pause() {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }
    /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    getCurrentSlideIndex() {
        return this._slides.findIndex(this.getActive);
    }
    /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    isLast(index) {
        return index + 1 >= this._slides.length;
    }
    /**
     * Defines, whether the specified index is first in collection
     * @param {?} index
     * @return {?}
     */
    isFirst(index) {
        return index === 0;
    }
    /**
     * @return {?}
     */
    indicatorsSlides() {
        return this.slides.filter((/**
         * @param {?} slide
         * @param {?} index
         * @return {?}
         */
        (slide, index) => !this.indicatorsByChunk || index % this.itemsPerSlide === 0));
    }
    /**
     * @private
     * @return {?}
     */
    selectInitialSlides() {
        /** @type {?} */
        const startIndex = this.startFromIndex <= this._slides.length
            ? this.startFromIndex
            : 0;
        this.hideSlides();
        if (this.singleSlideOffset) {
            this._slidesWithIndexes = this.mapSlidesAndIndexes();
            if (this._slides.length - startIndex < this.itemsPerSlide) {
                /** @type {?} */
                const slidesToAppend = this._slidesWithIndexes.slice(0, startIndex);
                this._slidesWithIndexes = [
                    ...this._slidesWithIndexes,
                    ...slidesToAppend
                ]
                    .slice(slidesToAppend.length)
                    .slice(0, this.itemsPerSlide);
            }
            else {
                this._slidesWithIndexes = this._slidesWithIndexes.slice(startIndex, startIndex + this.itemsPerSlide);
            }
            this._slidesWithIndexes.forEach((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.item.active = true));
            this.makeSlidesConsistent(this._slidesWithIndexes);
        }
        else {
            this.selectRangeByNestedIndex(startIndex);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    /**
     * Defines next slide index, depending of direction
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    findNextSlideIndex(direction, force) {
        /** @type {?} */
        let nextSlideIndex = 0;
        if (!force &&
            (this.isLast(this.activeSlide) &&
                direction !== Direction.PREV &&
                this.noWrap)) {
            return undefined;
        }
        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled
                // and need to going forward - select current slide, as a next
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled
                // and need to going backward - select current slide, as a next
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    }
    /**
     * @private
     * @return {?}
     */
    mapSlidesAndIndexes() {
        return this.slides
            .slice()
            .map((/**
         * @param {?} slide
         * @param {?} index
         * @return {?}
         */
        (slide, index) => {
            return {
                index,
                item: slide
            };
        }));
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    selectSlideRange(index) {
        if (this.isIndexInRange(index)) {
            return;
        }
        this.hideSlides();
        if (!this.singleSlideOffset) {
            this.selectRangeByNestedIndex(index);
        }
        else {
            /** @type {?} */
            const startIndex = this.isIndexOnTheEdges(index)
                ? index
                : index - this.itemsPerSlide + 1;
            /** @type {?} */
            const endIndex = this.isIndexOnTheEdges(index)
                ? index + this.itemsPerSlide
                : index + 1;
            this._slidesWithIndexes = this.mapSlidesAndIndexes().slice(startIndex, endIndex);
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this._slidesWithIndexes.forEach((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.item.active = true));
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    selectRangeByNestedIndex(index) {
        /** @type {?} */
        const selectedRange = this._chunkedSlides
            .map((/**
         * @param {?} slidesList
         * @param {?} i
         * @return {?}
         */
        (slidesList, i) => {
            return {
                index: i,
                list: slidesList
            };
        }))
            .find((/**
         * @param {?} slidesList
         * @return {?}
         */
        (slidesList) => {
            return slidesList.list.find((/**
             * @param {?} slide
             * @return {?}
             */
            slide => slide.index === index)) !== undefined;
        }));
        this._currentVisibleSlidesIndex = selectedRange.index;
        this._chunkedSlides[selectedRange.index].forEach((/**
         * @param {?} slide
         * @return {?}
         */
        (slide) => {
            slide.item.active = true;
        }));
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isIndexOnTheEdges(index) {
        return (index + 1 - this.itemsPerSlide <= 0 ||
            index + this.itemsPerSlide <= this._slides.length);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isIndexInRange(index) {
        if (this.singleSlideOffset) {
            /** @type {?} */
            const visibleIndexes = this._slidesWithIndexes.map((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.index));
            return visibleIndexes.indexOf(index) >= 0;
        }
        return (index <= this.getLastVisibleIndex() &&
            index >= this.getFirstVisibleIndex());
    }
    /**
     * @private
     * @return {?}
     */
    hideSlides() {
        this.slides.forEach((/**
         * @param {?} slide
         * @return {?}
         */
        (slide) => slide.active = false));
    }
    /**
     * @private
     * @return {?}
     */
    isVisibleSlideListLast() {
        return this._currentVisibleSlidesIndex === this._chunkedSlides.length - 1;
    }
    /**
     * @private
     * @return {?}
     */
    isVisibleSlideListFirst() {
        return this._currentVisibleSlidesIndex === 0;
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    moveSliderByOneItem(direction) {
        /** @type {?} */
        let firstVisibleIndex;
        /** @type {?} */
        let lastVisibleIndex;
        /** @type {?} */
        let indexToHide;
        /** @type {?} */
        let indexToShow;
        if (this.noWrap) {
            firstVisibleIndex = this.getFirstVisibleIndex();
            lastVisibleIndex = this.getLastVisibleIndex();
            indexToHide = direction === Direction.NEXT
                ? firstVisibleIndex
                : lastVisibleIndex;
            indexToShow = direction !== Direction.NEXT
                ? firstVisibleIndex - 1
                : !this.isLast(lastVisibleIndex)
                    ? lastVisibleIndex + 1 : 0;
            this._slides.get(indexToHide).active = false;
            this._slides.get(indexToShow).active = true;
            /** @type {?} */
            const slidesToReorder = this.mapSlidesAndIndexes().filter((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.item.active));
            this.makeSlidesConsistent(slidesToReorder);
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
        else {
            /** @type {?} */
            let displayedIndex;
            firstVisibleIndex = this._slidesWithIndexes[0].index;
            lastVisibleIndex = this._slidesWithIndexes[this._slidesWithIndexes.length - 1].index;
            if (direction === Direction.NEXT) {
                this._slidesWithIndexes.shift();
                displayedIndex = this.isLast(lastVisibleIndex)
                    ? 0
                    : lastVisibleIndex + 1;
                this._slidesWithIndexes.push({
                    index: displayedIndex,
                    item: this._slides.get(displayedIndex)
                });
            }
            else {
                this._slidesWithIndexes.pop();
                displayedIndex = this.isFirst(firstVisibleIndex)
                    ? this._slides.length - 1
                    : firstVisibleIndex - 1;
                this._slidesWithIndexes = [{
                        index: displayedIndex,
                        item: this._slides.get(displayedIndex)
                    }, ...this._slidesWithIndexes];
            }
            this.hideSlides();
            this._slidesWithIndexes.forEach((/**
             * @param {?} slide
             * @return {?}
             */
            slide => slide.item.active = true));
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this.slideRangeChange.emit(this._slidesWithIndexes.map((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.index)));
        }
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    moveMultilist(direction) {
        if (this.singleSlideOffset) {
            this.moveSliderByOneItem(direction);
        }
        else {
            this.hideSlides();
            if (this.noWrap) {
                this._currentVisibleSlidesIndex = direction === Direction.NEXT
                    ? this._currentVisibleSlidesIndex + 1
                    : this._currentVisibleSlidesIndex - 1;
            }
            else {
                if (direction === Direction.NEXT) {
                    this._currentVisibleSlidesIndex = this.isVisibleSlideListLast()
                        ? 0
                        : this._currentVisibleSlidesIndex + 1;
                }
                else {
                    this._currentVisibleSlidesIndex = this.isVisibleSlideListFirst()
                        ? this._chunkedSlides.length - 1
                        : this._currentVisibleSlidesIndex - 1;
                }
            }
            this._chunkedSlides[this._currentVisibleSlidesIndex].forEach((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.item.active = true));
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
    }
    /**
     * @private
     * @return {?}
     */
    getVisibleIndexes() {
        if (!this.singleSlideOffset) {
            return this._chunkedSlides[this._currentVisibleSlidesIndex]
                .map((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.index));
        }
        else {
            return this._slidesWithIndexes.map((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.index));
        }
    }
    /**
     * Sets a slide, which specified through index, as active
     * @private
     * @param {?} index
     * @return {?}
     */
    _select(index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        if (!this.multilist) {
            /** @type {?} */
            const currentSlide = this._slides.get(this._currentActiveSlide);
            if (currentSlide) {
                currentSlide.active = false;
            }
        }
        /** @type {?} */
        const nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    }
    /**
     * Starts loop of auto changing of slides
     * @private
     * @return {?}
     */
    restartTimer() {
        this.resetTimer();
        /** @type {?} */
        const interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                return setInterval((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const nInterval = +this.interval;
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (this.isPlaying &&
                            !isNaN(this.interval) &&
                            nInterval > 0 &&
                            this.slides.length) {
                            this.nextSlideFromInterval();
                        }
                        else {
                            this.pause();
                        }
                    }));
                }), interval);
            }));
        }
    }
    /**
     * @return {?}
     */
    get multilist() {
        return this.itemsPerSlide > 1;
    }
    /**
     * Stops loop of auto changing of slides
     * @private
     * @return {?}
     */
    resetTimer() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'carousel',
                template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"onMouseLeave()\" (mouseup)=\"onMouseUp()\" class=\"carousel slide\" (keydown)=\"keydownPress($event)\" (focusin)=\"pauseFocusIn()\" (focusout)=\"pauseFocusOut()\" tabindex=\"0\">\n  <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\">\n    <li *ngFor=\"let slidez of indicatorsSlides(); let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li>\n  </ol>\n  <div class=\"carousel-inner\" [ngStyle]=\"{'display': multilist ? 'flex' : 'block'}\"><ng-content></ng-content></div>\n  <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\"\n      tabindex=\"0\" role=\"button\">\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\" [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\"\n     tabindex=\"0\" role=\"button\">\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n"
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: CarouselConfig },
    { type: NgZone }
];
CarouselComponent.propDecorators = {
    noWrap: [{ type: Input }],
    noPause: [{ type: Input }],
    showIndicators: [{ type: Input }],
    pauseOnFocus: [{ type: Input }],
    indicatorsByChunk: [{ type: Input }],
    itemsPerSlide: [{ type: Input }],
    singleSlideOffset: [{ type: Input }],
    activeSlideChange: [{ type: Output }],
    slideRangeChange: [{ type: Output }],
    activeSlide: [{ type: Input }],
    startFromIndex: [{ type: Input }],
    interval: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.noWrap;
    /** @type {?} */
    CarouselComponent.prototype.noPause;
    /** @type {?} */
    CarouselComponent.prototype.showIndicators;
    /** @type {?} */
    CarouselComponent.prototype.pauseOnFocus;
    /** @type {?} */
    CarouselComponent.prototype.indicatorsByChunk;
    /** @type {?} */
    CarouselComponent.prototype.itemsPerSlide;
    /** @type {?} */
    CarouselComponent.prototype.singleSlideOffset;
    /**
     * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
     * @type {?}
     */
    CarouselComponent.prototype.activeSlideChange;
    /**
     * Will be emitted when active slides has been changed in multilist mode
     * @type {?}
     */
    CarouselComponent.prototype.slideRangeChange;
    /** @type {?} */
    CarouselComponent.prototype.startFromIndex;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.currentInterval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._currentActiveSlide;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._interval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._slides;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._chunkedSlides;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._slidesWithIndexes;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._currentVisibleSlidesIndex;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.isPlaying;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.destroyed;
    /** @type {?} */
    CarouselComponent.prototype.getActive;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.makeSlidesConsistent;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQzFELE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7SUFJckQsVUFBTztJQUNQLE9BQUk7SUFDSixPQUFJOzs7Ozs7Ozs7QUFVTixNQUFNLE9BQU8saUJBQWlCOzs7OztJQThFNUIsWUFBWSxNQUFzQixFQUFVLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFROzs7UUFuRWpELHNCQUFpQixHQUFHLEtBQUssQ0FBQzs7UUFFMUIsa0JBQWEsR0FBRyxDQUFDLENBQUM7OztRQUdsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFJbkMsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDOzs7O1FBSTFFLHFCQUFnQixHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDOztRQW1CeEUsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUF3QlQsWUFBTyxHQUErQixJQUFJLFVBQVUsRUFBa0IsQ0FBQztRQUd2RSwrQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFFL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQTBINUIsY0FBUzs7OztRQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztRQTRZNUMseUJBQW9C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LElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBL3JCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLHF4Q0FBd0M7YUFDekM7Ozs7WUFoQlEsY0FBYztZQUxXLE1BQU07OztxQkF3QnJDLEtBQUs7c0JBRUwsS0FBSzs2QkFFTCxLQUFLOzJCQUVMLEtBQUs7Z0NBR0wsS0FBSzs0QkFFTCxLQUFLO2dDQUdMLEtBQUs7Z0NBR0wsTUFBTTsrQkFJTixNQUFNOzBCQUlOLEtBQUs7NkJBZUwsS0FBSzt1QkFPTCxLQUFLOzs7O0lBL0NOLG1DQUF5Qjs7SUFFekIsb0NBQTBCOztJQUUxQiwyQ0FBaUM7O0lBRWpDLHlDQUErQjs7SUFHL0IsOENBQW1DOztJQUVuQywwQ0FBMkI7O0lBRzNCLDhDQUFtQzs7Ozs7SUFHbkMsOENBQzBFOzs7OztJQUcxRSw2Q0FDd0U7O0lBa0J4RSwyQ0FDbUI7Ozs7O0lBcUJuQiw0Q0FBK0I7Ozs7O0lBQy9CLGdEQUFzQzs7Ozs7SUFDdEMsc0NBQTRCOzs7OztJQUM1QixvQ0FBaUY7Ozs7O0lBQ2pGLDJDQUE2Qzs7Ozs7SUFDN0MsK0NBQStDOzs7OztJQUMvQyx1REFBeUM7Ozs7O0lBQ3pDLHNDQUE2Qjs7Ozs7SUFDN0Isc0NBQTRCOztJQTBINUIsc0NBQW9EOzs7OztJQTRZcEQsaURBRUM7Ozs7O0lBbGdCbUMsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudFxuLyoqKlxuICogcGF1c2UgKG5vdCB5ZXQgc3VwcG9ydGVkKSAoP3N0cmluZz0naG92ZXInKSAtIGV2ZW50IGdyb3VwIG5hbWUgd2hpY2ggcGF1c2VzXG4gKiB0aGUgY3ljbGluZyBvZiB0aGUgY2Fyb3VzZWwsIGlmIGhvdmVyIHBhdXNlcyBvbiBtb3VzZWVudGVyIGFuZCByZXN1bWVzIG9uXG4gKiBtb3VzZWxlYXZlIGtleWJvYXJkIChub3QgeWV0IHN1cHBvcnRlZCkgKD9ib29sZWFuPXRydWUpIC0gaWYgZmFsc2VcbiAqIGNhcm91c2VsIHdpbGwgbm90IHJlYWN0IHRvIGtleWJvYXJkIGV2ZW50c1xuICogbm90ZTogc3dpcGluZyBub3QgeWV0IHN1cHBvcnRlZFxuICovXG4vKioqKlxuICogUHJvYmxlbXM6XG4gKiAxKSBpZiB3ZSBzZXQgYW4gYWN0aXZlIHNsaWRlIHZpYSBtb2RlbCBjaGFuZ2VzLCAuYWN0aXZlIGNsYXNzIHJlbWFpbnMgb24gYVxuICogY3VycmVudCBzbGlkZS5cbiAqIDIpIGlmIHdlIGhhdmUgb25seSBvbmUgc2xpZGUsIHdlIHNob3VsZG4ndCBzaG93IHByZXYvbmV4dCBuYXYgYnV0dG9uc1xuICogMykgaWYgZmlyc3Qgb3IgbGFzdCBzbGlkZSBpcyBhY3RpdmUgYW5kIG5vV3JhcCBpcyB0cnVlLCB0aGVyZSBzaG91bGQgYmVcbiAqIFwiZGlzYWJsZWRcIiBjbGFzcyBvbiB0aGUgbmF2IGJ1dHRvbnMuXG4gKiA0KSBkZWZhdWx0IGludGVydmFsIHNob3VsZCBiZSBlcXVhbCA1MDAwXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0LCBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpc0JzMywgTGlua2VkTGlzdCB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbmZpZyB9IGZyb20gJy4vY2Fyb3VzZWwuY29uZmlnJztcbmltcG9ydCB7IGZpbmRMYXN0SW5kZXgsIGNodW5rQnlOdW1iZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFNsaWRlV2l0aEluZGV4LCBJbmRleGVkU2xpZGVMaXN0IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICBVTktOT1dOLFxuICBORVhULFxuICBQUkVWXG59XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IHRvIGNyZWF0ZSBjYXJvdXNlbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKiBJZiBgdHJ1ZWAg4oCUIGNhcm91c2VsIHdpbGwgbm90IGN5Y2xlIGNvbnRpbnVvdXNseSBhbmQgd2lsbCBoYXZlIGhhcmQgc3RvcHMgKHByZXZlbnQgbG9vcGluZykgKi9cbiAgQElucHV0KCkgbm9XcmFwOiBib29sZWFuO1xuICAvKiAgSWYgYHRydWVgIOKAlCB3aWxsIGRpc2FibGUgcGF1c2luZyBvbiBjYXJvdXNlbCBtb3VzZSBob3ZlciAqL1xuICBASW5wdXQoKSBub1BhdXNlOiBib29sZWFuO1xuICAvKiAgSWYgYHRydWVgIOKAlCBjYXJvdXNlbC1pbmRpY2F0b3JzIGFyZSB2aXNpYmxlICAqL1xuICBASW5wdXQoKSBzaG93SW5kaWNhdG9yczogYm9vbGVhbjtcbiAgLyogIElmIGB0cnVlYCAtIGF1dG9wbGF5IHdpbGwgYmUgc3RvcHBlZCBvbiBmb2N1cyAqL1xuICBASW5wdXQoKSBwYXVzZU9uRm9jdXM6IGJvb2xlYW47XG4gIC8qIElmIGB0cnVlYCAtIGNhcm91c2VsIGluZGljYXRvcnMgaW5kaWNhdGUgc2xpZGVzIGNodW5rc1xuICAgICB3b3JrcyBPTkxZIGlmIHNpbmdsZVNsaWRlT2Zmc2V0ID0gRkFMU0UgKi9cbiAgQElucHV0KCkgaW5kaWNhdG9yc0J5Q2h1bmsgPSBmYWxzZTtcbiAgLyogSWYgdmFsdWUgbW9yZSB0aGVuIDEg4oCUIGNhcm91c2VsIHdvcmtzIGluIG11bHRpbGlzdCBtb2RlICovXG4gIEBJbnB1dCgpIGl0ZW1zUGVyU2xpZGUgPSAxO1xuICAvKiBJZiBgdHJ1ZWAg4oCUIGNhcm91c2VsIHNoaWZ0cyBieSBvbmUgZWxlbWVudC4gQnkgZGVmYXVsdCBjYXJvdXNlbCBzaGlmdHMgYnkgbnVtYmVyXG4gICAgIG9mIHZpc2libGUgZWxlbWVudHMgKGl0ZW1zUGVyU2xpZGUgZmllbGQpICovXG4gIEBJbnB1dCgpIHNpbmdsZVNsaWRlT2Zmc2V0ID0gZmFsc2U7XG5cbiAgLyoqIFdpbGwgYmUgZW1pdHRlZCB3aGVuIGFjdGl2ZSBzbGlkZSBoYXMgYmVlbiBjaGFuZ2VkLiBQYXJ0IG9mIHR3by13YXktYmluZGFibGUgWyhhY3RpdmVTbGlkZSldIHByb3BlcnR5ICovXG4gIEBPdXRwdXQoKVxuICBhY3RpdmVTbGlkZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGVzIGhhcyBiZWVuIGNoYW5nZWQgaW4gbXVsdGlsaXN0IG1vZGUgKi9cbiAgQE91dHB1dCgpXG4gIHNsaWRlUmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcltdPigpO1xuXG4gIC8qKiBJbmRleCBvZiBjdXJyZW50bHkgZGlzcGxheWVkIHNsaWRlKHN0YXJ0ZWQgZm9yIDApICovXG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmVTbGlkZShpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMubXVsdGlsaXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZTtcbiAgfVxuXG4gIC8qIEluZGV4IHRvIHN0YXJ0IGRpc3BsYXkgc2xpZGVzIGZyb20gaXQgKi9cbiAgQElucHV0KClcbiAgc3RhcnRGcm9tSW5kZXggPSAwO1xuXG4gIC8qKlxuICAgKiBEZWxheSBvZiBpdGVtIGN5Y2xpbmcgaW4gbWlsbGlzZWNvbmRzLiBJZiBmYWxzZSwgY2Fyb3VzZWwgd29uJ3QgY3ljbGVcbiAgICogYXV0b21hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgZ2V0IHNsaWRlcygpOiBTbGlkZUNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJvdGVjdGVkIGN1cnJlbnRJbnRlcnZhbDogYW55O1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRBY3RpdmVTbGlkZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgX2ludGVydmFsOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfc2xpZGVzOiBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PiA9IG5ldyBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PigpO1xuICBwcm90ZWN0ZWQgX2NodW5rZWRTbGlkZXM6IFNsaWRlV2l0aEluZGV4W11bXTtcbiAgcHJvdGVjdGVkIF9zbGlkZXNXaXRoSW5kZXhlczogU2xpZGVXaXRoSW5kZXhbXTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID0gMDtcbiAgcHJvdGVjdGVkIGlzUGxheWluZzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIGdldCBpc0JzNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzQnMzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IENhcm91c2VsQ29uZmlnLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JzQnlDaHVuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubXVsdGlsaXN0KSB7XG4gICAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXMgPSBjaHVua0J5TnVtYmVyKFxuICAgICAgICAgIHRoaXMubWFwU2xpZGVzQW5kSW5kZXhlcygpLFxuICAgICAgICAgIHRoaXMuaXRlbXNQZXJTbGlkZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlbGVjdEluaXRpYWxTbGlkZXMoKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG5ldyBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBmaXJzdCBpbiBjb2xsZWN0aW9uIC0gc2V0IGl0IGFzIGFjdGl2ZVxuICAgKiBhbmQgc3RhcnRzIGF1dG8gY2hhbmdpbmdcbiAgICogQHBhcmFtIHNsaWRlXG4gICAqL1xuICBhZGRTbGlkZShzbGlkZTogU2xpZGVDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9zbGlkZXMuYWRkKHNsaWRlKTtcblxuICAgIGlmICh0aGlzLm11bHRpbGlzdCAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoIDw9IHRoaXMuaXRlbXNQZXJTbGlkZSkge1xuICAgICAgc2xpZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0ICYmIHRoaXMuX3NsaWRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSAwO1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubXVsdGlsaXN0ICYmIHRoaXMuX3NsaWRlcy5sZW5ndGggPiB0aGlzLml0ZW1zUGVyU2xpZGUpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHNwZWNpZmllZCBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBhY3RpdmUgLSB3aWxsIHJvbGwgdG8gYW5vdGhlclxuICAgKiBzbGlkZVxuICAgKiBAcGFyYW0gc2xpZGVcbiAgICovXG4gIHJlbW92ZVNsaWRlKHNsaWRlOiBTbGlkZUNvbXBvbmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHJlbUluZGV4ID0gdGhpcy5fc2xpZGVzLmluZGV4T2Yoc2xpZGUpO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9PT0gcmVtSW5kZXgpIHtcbiAgICAgIC8vIHJlbW92aW5nIG9mIGFjdGl2ZSBzbGlkZVxuICAgICAgbGV0IG5leHRTbGlkZUluZGV4OiBudW1iZXIgPSB2b2lkIDA7XG4gICAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBzbGlkZSBsYXN0IC0gd2lsbCByb2xsIHRvIGZpcnN0IHNsaWRlLCBpZiBub1dyYXAgZmxhZyBpc1xuICAgICAgICAvLyBGQUxTRSBvciB0byBwcmV2aW91cywgaWYgbm9XcmFwIGlzIFRSVUUgaW4gY2FzZSwgaWYgdGhpcyBzbGlkZSBpblxuICAgICAgICAvLyBtaWRkbGUgb2YgY29sbGVjdGlvbiwgaW5kZXggb2YgbmV4dCBzbGlkZSBpcyBzYW1lIHRvIHJlbW92ZWRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhdGhpcy5pc0xhc3QocmVtSW5kZXgpXG4gICAgICAgICAgPyByZW1JbmRleFxuICAgICAgICAgIDogdGhpcy5ub1dyYXAgPyByZW1JbmRleCAtIDEgOiAwO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XG5cbiAgICAgIC8vIHByZXZlbnRzIGV4Y2VwdGlvbiB3aXRoIGNoYW5naW5nIHNvbWUgdmFsdWUgYWZ0ZXIgY2hlY2tpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZWxlY3QobmV4dFNsaWRlSW5kZXgpO1xuICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NsaWRlcy5yZW1vdmUocmVtSW5kZXgpO1xuICAgICAgY29uc3QgY3VycmVudFNsaWRlSW5kZXggPSB0aGlzLmdldEN1cnJlbnRTbGlkZUluZGV4KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gYWZ0ZXIgcmVtb3ZpbmcsIG5lZWQgdG8gYWN0dWFsaXplIGluZGV4IG9mIGN1cnJlbnQgYWN0aXZlIHNsaWRlXG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRTbGlkZUluZGV4O1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIG5leHRTbGlkZUZyb21JbnRlcnZhbChmb3JjZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5tb3ZlKERpcmVjdGlvbi5ORVhULCBmb3JjZSk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbGluZyB0byBuZXh0IHNsaWRlXG4gICAqIEBwYXJhbSBmb3JjZToge2Jvb2xlYW59IGlmIHRydWUgLSB3aWxsIGlnbm9yZSBub1dyYXAgZmxhZ1xuICAgKi9cbiAgbmV4dFNsaWRlKGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgfVxuICAgIHRoaXMubW92ZShEaXJlY3Rpb24uTkVYVCwgZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gcHJldmlvdXMgc2xpZGVcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgdHJ1ZSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnXG4gICAqL1xuICBwcmV2aW91c1NsaWRlKGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgfVxuICAgIHRoaXMubW92ZShEaXJlY3Rpb24uUFJFViwgZm9yY2UpO1xuICB9XG5cbiAgZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMuZmluZEluZGV4KHRoaXMuZ2V0QWN0aXZlKTtcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZmluZExhc3RJbmRleCh0aGlzLnNsaWRlcywgdGhpcy5nZXRBY3RpdmUpO1xuICB9XG5cbiAgZ2V0QWN0aXZlID0gKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlO1xuXG4gIG1vdmUoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUluZGV4KCk7XG5cbiAgICBpZiAodGhpcy5ub1dyYXApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCAmJlxuICAgICAgICB0aGlzLmlzTGFzdChsYXN0VmlzaWJsZUluZGV4KSB8fFxuICAgICAgICBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWICYmXG4gICAgICAgIGZpcnN0VmlzaWJsZUluZGV4ID09PSAwXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aWxpc3QpIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlTXVsdGlsaXN0KGRpcmVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRoIHNsaWRlcyBieSBlbnRlciwgc3BhY2UgYW5kIGFycm93cyBrZXlzXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAga2V5ZG93blByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXkgPT09ICdTcGFjZScpIHtcbiAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleSA9PT0gJ0xlZnRBcnJvdycpIHtcbiAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleSA9PT0gJ1JpZ2h0QXJyb3cnKSB7XG4gICAgICB0aGlzLm5leHRTbGlkZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXkgb24gbW91c2UgbGVhdmVcbiAgICogQGludGVybmFsXG4gICAqL1xuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBhdXNlT25Gb2N1cykge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXkgb24gbW91c2UgdXBcbiAgICogQGludGVybmFsXG4gICAqL1xuICBvbk1vdXNlVXAoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBhdXNlT25Gb2N1cykge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gc2xpZGVzIG9uIGZvY3VzIGF1dG9wbGF5IGlzIHN0b3BwZWQob3B0aW9uYWwpXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcGF1c2VGb2N1c0luKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhdXNlT25Gb2N1cykge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVzZXRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHNsaWRlcyBvdXQgb2YgZm9jdXMgYXV0b3BsYXkgaXMgc3RhcnRlZFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHBhdXNlRm9jdXNPdXQoKTogdm9pZCB7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbGluZyB0byBzcGVjaWZpZWQgc2xpZGVcbiAgICogQHBhcmFtIGluZGV4OiB7bnVtYmVyfSBpbmRleCBvZiBzbGlkZSwgd2hpY2ggbXVzdCBiZSBzaG93blxuICAgKi9cbiAgc2VsZWN0U2xpZGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUGxheWluZykge1xuICAgICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0KSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5pbmRpY2F0b3JzQnlDaHVuayA/IGluZGV4ICogdGhpcy5pdGVtc1BlclNsaWRlIDogaW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0U2xpZGVSYW5nZSh0aGlzLmluZGljYXRvcnNCeUNodW5rID8gaW5kZXggKiB0aGlzLml0ZW1zUGVyU2xpZGUgOiBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIGEgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcbiAgICovXG4gIHBhdXNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ub1BhdXNlKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCByZXR1cm5zIGluZGV4IG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgc2xpZGVcbiAgICovXG4gIGdldEN1cnJlbnRTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlcy5maW5kSW5kZXgodGhpcy5nZXRBY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMsIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBpbmRleCBpcyBsYXN0IGluIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBpc0xhc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCArIDEgPj0gdGhpcy5fc2xpZGVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzLCB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgZmlyc3QgaW4gY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIGlzRmlyc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA9PT0gMDtcbiAgfVxuXG4gIGluZGljYXRvcnNTbGlkZXMoKTogU2xpZGVDb21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbHRlcihcbiAgICAgIChzbGlkZTogU2xpZGVDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+ICF0aGlzLmluZGljYXRvcnNCeUNodW5rIHx8IGluZGV4ICUgdGhpcy5pdGVtc1BlclNsaWRlID09PSAwXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0SW5pdGlhbFNsaWRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5zdGFydEZyb21JbmRleCA8PSB0aGlzLl9zbGlkZXMubGVuZ3RoXG4gICAgICA/IHRoaXMuc3RhcnRGcm9tSW5kZXhcbiAgICAgIDogMDtcblxuICAgIHRoaXMuaGlkZVNsaWRlcygpO1xuXG4gICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoIC0gc3RhcnRJbmRleCA8IHRoaXMuaXRlbXNQZXJTbGlkZSkge1xuICAgICAgICBjb25zdCBzbGlkZXNUb0FwcGVuZCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzICA9IFtcbiAgICAgICAgICAuLi50aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyxcbiAgICAgICAgICAuLi5zbGlkZXNUb0FwcGVuZFxuICAgICAgICBdXG4gICAgICAgICAgLnNsaWNlKHNsaWRlc1RvQXBwZW5kLmxlbmd0aClcbiAgICAgICAgICAuc2xpY2UoMCwgdGhpcy5pdGVtc1BlclNsaWRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuc2xpY2UoXG4gICAgICAgICAgc3RhcnRJbmRleCxcbiAgICAgICAgICBzdGFydEluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlKTtcbiAgICAgIHRoaXMubWFrZVNsaWRlc0NvbnNpc3RlbnQodGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFJhbmdlQnlOZXN0ZWRJbmRleChzdGFydEluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgbmV4dCBzbGlkZSBpbmRleCwgZGVwZW5kaW5nIG9mIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gZGlyZWN0aW9uOiBEaXJlY3Rpb24oVU5LTk9XTnxQUkVWfE5FWFQpXG4gICAqIEBwYXJhbSBmb3JjZToge2Jvb2xlYW59IGlmIFRSVUUgLSB3aWxsIGlnbm9yZSBub1dyYXAgZmxhZywgZWxzZSB3aWxsXG4gICAqICAgcmV0dXJuIHVuZGVmaW5lZCBpZiBuZXh0IHNsaWRlIHJlcXVpcmUgd3JhcHBpbmdcbiAgICovXG4gIHByaXZhdGUgZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbjogRGlyZWN0aW9uLCBmb3JjZTogYm9vbGVhbik6IG51bWJlciB7XG4gICAgbGV0IG5leHRTbGlkZUluZGV4ID0gMDtcblxuICAgIGlmIChcbiAgICAgICFmb3JjZSAmJlxuICAgICAgKHRoaXMuaXNMYXN0KHRoaXMuYWN0aXZlU2xpZGUpICYmXG4gICAgICAgIGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLlBSRVYgJiZcbiAgICAgICAgdGhpcy5ub1dyYXApXG4gICAgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIERpcmVjdGlvbi5ORVhUOlxuICAgICAgICAvLyBpZiB0aGlzIGlzIGxhc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAvLyBhbmQgbmVlZCB0byBnb2luZyBmb3J3YXJkIC0gc2VsZWN0IGN1cnJlbnQgc2xpZGUsIGFzIGEgbmV4dFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9ICF0aGlzLmlzTGFzdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgKyAxXG4gICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgOiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGlyZWN0aW9uLlBSRVY6XG4gICAgICAgIC8vIGlmIHRoaXMgaXMgZmlyc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAvLyBhbmQgbmVlZCB0byBnb2luZyBiYWNrd2FyZCAtIHNlbGVjdCBjdXJyZW50IHNsaWRlLCBhcyBhIG5leHRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA+IDBcbiAgICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlIC0gMVxuICAgICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXBcbiAgICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVcbiAgICAgICAgICAgICAgOiB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGlyZWN0aW9uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBTbGlkZXNBbmRJbmRleGVzKCk6IFNsaWRlV2l0aEluZGV4W10ge1xuICAgIHJldHVybiB0aGlzLnNsaWRlc1xuICAgICAgLnNsaWNlKClcbiAgICAgIC5tYXAoKHNsaWRlOiBTbGlkZUNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGl0ZW06IHNsaWRlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBzZWxlY3RTbGlkZVJhbmdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luZGV4SW5SYW5nZShpbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgIGlmICghdGhpcy5zaW5nbGVTbGlkZU9mZnNldCkge1xuICAgICAgdGhpcy5zZWxlY3RSYW5nZUJ5TmVzdGVkSW5kZXgoaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5pc0luZGV4T25UaGVFZGdlcyhpbmRleClcbiAgICAgICAgPyBpbmRleFxuICAgICAgICA6IGluZGV4IC0gdGhpcy5pdGVtc1BlclNsaWRlICsgMTtcblxuICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLmlzSW5kZXhPblRoZUVkZ2VzKGluZGV4KVxuICAgICAgICA/IGluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlXG4gICAgICAgIDogaW5kZXggKyAxO1xuXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyA9IHRoaXMubWFwU2xpZGVzQW5kSW5kZXhlcygpLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgIHRoaXMubWFrZVNsaWRlc0NvbnNpc3RlbnQodGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMpO1xuXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQodGhpcy5nZXRWaXNpYmxlSW5kZXhlcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZFJhbmdlID0gdGhpcy5fY2h1bmtlZFNsaWRlc1xuICAgICAgLm1hcCgoc2xpZGVzTGlzdCwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgbGlzdDogc2xpZGVzTGlzdFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maW5kKFxuICAgICAgICAoc2xpZGVzTGlzdDogSW5kZXhlZFNsaWRlTGlzdCkgPT4ge1xuICAgICAgICAgIHJldHVybiBzbGlkZXNMaXN0Lmxpc3QuZmluZChzbGlkZSA9PiBzbGlkZS5pbmRleCA9PT0gaW5kZXgpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID0gc2VsZWN0ZWRSYW5nZS5pbmRleDtcblxuICAgIHRoaXMuX2NodW5rZWRTbGlkZXNbc2VsZWN0ZWRSYW5nZS5pbmRleF0uZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiB7XG4gICAgICBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5kZXhPblRoZUVkZ2VzKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgaW5kZXggKyAxIC0gdGhpcy5pdGVtc1BlclNsaWRlIDw9IDAgfHxcbiAgICAgIGluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlIDw9IHRoaXMuX3NsaWRlcy5sZW5ndGhcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luZGV4SW5SYW5nZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIGNvbnN0IHZpc2libGVJbmRleGVzID0gdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMubWFwKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLmluZGV4KTtcblxuICAgICAgcmV0dXJuIHZpc2libGVJbmRleGVzLmluZGV4T2YoaW5kZXgpID49IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIGluZGV4IDw9IHRoaXMuZ2V0TGFzdFZpc2libGVJbmRleCgpICYmXG4gICAgICBpbmRleCA+PSB0aGlzLmdldEZpcnN0VmlzaWJsZUluZGV4KClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlU2xpZGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlID0gZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGVTbGlkZUxpc3RMYXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID09PSB0aGlzLl9jaHVua2VkU2xpZGVzLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZVNsaWRlTGlzdEZpcnN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID09PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlU2xpZGVyQnlPbmVJdGVtKGRpcmVjdGlvbjogRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgbGV0IGZpcnN0VmlzaWJsZUluZGV4OiBudW1iZXI7XG4gICAgbGV0IGxhc3RWaXNpYmxlSW5kZXg6IG51bWJlcjtcbiAgICBsZXQgaW5kZXhUb0hpZGU6IG51bWJlcjtcbiAgICBsZXQgaW5kZXhUb1Nob3c6IG51bWJlcjtcblxuICAgIGlmICh0aGlzLm5vV3JhcCkge1xuICAgICAgZmlyc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldEZpcnN0VmlzaWJsZUluZGV4KCk7XG4gICAgICBsYXN0VmlzaWJsZUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUluZGV4KCk7XG5cbiAgICAgIGluZGV4VG9IaWRlID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVFxuICAgICAgICA/IGZpcnN0VmlzaWJsZUluZGV4XG4gICAgICAgIDogbGFzdFZpc2libGVJbmRleDtcblxuICAgICAgaW5kZXhUb1Nob3cgPSBkaXJlY3Rpb24gIT09IERpcmVjdGlvbi5ORVhUXG4gICAgICAgID8gZmlyc3RWaXNpYmxlSW5kZXggLSAxXG4gICAgICAgIDogIXRoaXMuaXNMYXN0KGxhc3RWaXNpYmxlSW5kZXgpXG4gICAgICAgICAgPyBsYXN0VmlzaWJsZUluZGV4ICsgMSA6IDA7XG5cbiAgICAgIHRoaXMuX3NsaWRlcy5nZXQoaW5kZXhUb0hpZGUpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2xpZGVzLmdldChpbmRleFRvU2hvdykuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgY29uc3Qgc2xpZGVzVG9SZW9yZGVyID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCkuZmlsdGVyKFxuICAgICAgICAoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZVxuICAgICAgKTtcblxuICAgICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudChzbGlkZXNUb1Jlb3JkZXIpO1xuXG4gICAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGlzcGxheWVkSW5kZXg6IG51bWJlcjtcblxuICAgICAgZmlyc3RWaXNpYmxlSW5kZXggPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlc1swXS5pbmRleDtcbiAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlc1t0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5sZW5ndGggLSAxXS5pbmRleDtcblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuc2hpZnQoKTtcblxuICAgICAgICBkaXNwbGF5ZWRJbmRleCA9IHRoaXMuaXNMYXN0KGxhc3RWaXNpYmxlSW5kZXgpXG4gICAgICAgICAgPyAwXG4gICAgICAgICAgOiBsYXN0VmlzaWJsZUluZGV4ICsgMTtcblxuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5wdXNoKHtcbiAgICAgICAgICBpbmRleDogZGlzcGxheWVkSW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5fc2xpZGVzLmdldChkaXNwbGF5ZWRJbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5wb3AoKTtcbiAgICAgICAgZGlzcGxheWVkSW5kZXggPSB0aGlzLmlzRmlyc3QoZmlyc3RWaXNpYmxlSW5kZXgpXG4gICAgICAgICAgPyB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMVxuICAgICAgICAgIDogZmlyc3RWaXNpYmxlSW5kZXggLSAxO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gW3tcbiAgICAgICAgICBpbmRleDogZGlzcGxheWVkSW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5fc2xpZGVzLmdldChkaXNwbGF5ZWRJbmRleClcbiAgICAgICAgfSwgLi4udGhpcy5fc2xpZGVzV2l0aEluZGV4ZXNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xuXG4gICAgICB0aGlzLm1ha2VTbGlkZXNDb25zaXN0ZW50KHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzKTtcblxuICAgICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQoXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYWtlU2xpZGVzQ29uc2lzdGVudCA9IChzbGlkZXM6IFNsaWRlV2l0aEluZGV4W10pOiB2b2lkID0+IHtcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4LCBpbmRleDogbnVtYmVyKSA9PiBzbGlkZS5pdGVtLm9yZGVyID0gaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlTXVsdGlsaXN0KGRpcmVjdGlvbjogRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIHRoaXMubW92ZVNsaWRlckJ5T25lSXRlbShkaXJlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgICAgaWYgKHRoaXMubm9XcmFwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ICsgMVxuICAgICAgICAgIDogdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSB0aGlzLmlzVmlzaWJsZVNsaWRlTGlzdExhc3QoKVxuICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICA6IHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSB0aGlzLmlzVmlzaWJsZVNsaWRlTGlzdEZpcnN0KClcbiAgICAgICAgICAgID8gdGhpcy5fY2h1bmtlZFNsaWRlcy5sZW5ndGggLSAxXG4gICAgICAgICAgICA6IHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggLSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXNbdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleF0uZm9yRWFjaChcbiAgICAgICAgKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmlzaWJsZUluZGV4ZXMoKTogbnVtYmVyW10ge1xuICAgIGlmICghdGhpcy5zaW5nbGVTbGlkZU9mZnNldCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NodW5rZWRTbGlkZXNbdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleF1cbiAgICAgICAgLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5tYXAoKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc2xpZGUsIHdoaWNoIHNwZWNpZmllZCB0aHJvdWdoIGluZGV4LCBhcyBhY3RpdmVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aWxpc3QpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICAgIGlmIChjdXJyZW50U2xpZGUpIHtcbiAgICAgICAgY3VycmVudFNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQoaW5kZXgpO1xuICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgbmV4dFNsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSByZXN0YXJ0VGltZXIoKSB7XG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nICYmXG4gICAgICAgICAgICAgICFpc05hTih0aGlzLmludGVydmFsKSAmJlxuICAgICAgICAgICAgICBuSW50ZXJ2YWwgPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmxlbmd0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlRnJvbUludGVydmFsKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtdWx0aWxpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXNQZXJTbGlkZSA+IDE7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSByZXNldFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmN1cnJlbnRJbnRlcnZhbCk7XG4gICAgICB0aGlzLmN1cnJlbnRJbnRlcnZhbCA9IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==