/**
* DevExtreme (viz/palette.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/


/** Gets the current palette's name. */
export function currentPalette(): string;

/** Changes the current palette for all data visualization widgets on the page. */
export function currentPalette(paletteName: string): void;

/** Returns a subset of palette colors. */
export function generateColors(palette: 'Bright' | 'Default' | 'Harmony Light' | 'Ocean' | 'Pastel' | 'Soft' | 'Soft Pastel' | 'Vintage' | 'Violet' | 'Carmine' | 'Dark Moon' | 'Dark Violet' | 'Green Mist' | 'Soft Blue' | 'Material' | 'Office' | Array<string>, count: number, options: { paletteExtensionMode?: 'alternate' | 'blend' | 'extrapolate', baseColorSet?: 'simpleSet' | 'indicatingSet' | 'gradientSet' }): Array<string>;

/** Gets the color sets of a predefined or registered palette. */
export function getPalette(paletteName: string): any;

/** Registers a new palette. */
export function registerPalette(paletteName: string, palette: any): void;