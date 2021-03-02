/**
* DevExtreme (utils.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Compiles a getter function from a getter expression. */
export function compileGetter(expr: string | Array<string>): Function;

/** Compiles a setter function from a setter expression. */
export function compileSetter(expr: string | Array<string>): Function;
