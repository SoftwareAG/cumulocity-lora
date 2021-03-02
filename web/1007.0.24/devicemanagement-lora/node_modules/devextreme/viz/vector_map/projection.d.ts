/**
* DevExtreme (viz/vector_map/projection.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface VectorMapProjectionConfig {
    /**
     * @docid VectorMapProjectionConfig.aspectRatio
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    aspectRatio?: number;
    /**
     * @docid VectorMapProjectionConfig.from
     * @type function
     * @type_function_param1 coordinates:Array<number>
     * @type_function_return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    from?: ((coordinates: Array<number>) => Array<number>);
    /**
     * @docid VectorMapProjectionConfig.to
     * @type function
     * @type_function_param1 coordinates:Array<number>
     * @type_function_return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    to?: ((coordinates: Array<number>) => Array<number>);
}

type Projection = (data: VectorMapProjectionConfig) => any;

type ProjectionMethods = {
    /**
     * @docid viz.map.projectionmethods.add
     * @publicName add(name, projection)
     * @param1 name:string
     * @param2 projection:VectorMapProjectionConfig|object
     * @namespace DevExpress.viz.map.projection
     * @static
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    add(name: string, projection: VectorMapProjectionConfig | any): void;

    /**
     * @docid viz.map.projectionmethods.get
     * @publicName get(name)
     * @param1 name:Enums.VectorMapProjection|string
     * @return object
     * @namespace DevExpress.viz.map.projection
     * @static
     * @hidden
     * @prevFileNamespace DevExpress.viz
     */
    get(name: 'equirectangular' | 'lambert' | 'mercator' | 'miller' | string): any;
}

/** Warning! This type is used for internal purposes. Do not import it directly. */
/** Creates a new projection. */
export const projection: Projection & ProjectionMethods;

