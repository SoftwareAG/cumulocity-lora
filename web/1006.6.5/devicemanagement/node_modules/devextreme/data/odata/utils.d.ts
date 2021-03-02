/**
* DevExtreme (data/odata/utils.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** The EdmLiteral is an object for working with primitive data types from the OData's Abstract Type System that are not supported in JavaScript. */
export class EdmLiteral {
    constructor(value: string);
    /**
     * @docid EdmLiteralMethods.valueOf
     * @publicName valueOf()
     * @return string
     * @prevFileNamespace DevExpress.data
     * @public
     */
    valueOf(): string;
}

/** Contains built-in OData type converters (for String, Int32, Int64, Boolean, Single, Decimal, and Guid) and allows you to register a custom type converter. */
export var keyConverters: any;
