import { NgxMonacoEditorConfig } from "ngx-monaco-editor-v2";

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: "/apps/sag-ps-iot-pkg-lora-package/assets", // configure base path for monaco editor default: './assets'
  //defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => {
    let monaco = (window as any).monaco;
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
  class IManagedObject {
    id: string;
    name: string;
  }
  let device: IManagedObject;
  let payload: string;
  let time: Date;
  let fport: number;
  class C8YData {
    morToUpdate?: IManagedObject;
    addMeasurement(mor: IManagedObject, fragment: string, series: string, unit: string, value: number, time: Date): void;
    addMeasurements(mor: IManagedObject, fragment: string, serieses: string[], units: string[], values: number[], time: Date): void;
    addEvent(mor: IManagedObject, eventType: string, eventText: string, properties: {}, dateTime: Date): void;
    addAlarm(mor: IManagedObject, alarmType: string, alarmText: string, severity: Severity, dateTime: Date): void;
    clearAlarm(alarmType: string): void;
  }
  class DownlinkData {
    fport: number;
    payload: string;
  }
  `);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`// Buffer class
  type BufferEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex";
  interface Buffer extends Uint8Array {
      write(string: string, offset?: number, length?: number, encoding?: string): number;
      toString(encoding?: string, start?: number, end?: number): string;
      toJSON(): { type: 'Buffer', data: any[] };
      equals(otherBuffer: Uint8Array): boolean;
      compare(otherBuffer: Uint8Array, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): number;
      copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
      slice(start?: number, end?: number): Buffer;
      writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
      writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
      writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
      writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
      readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
      readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
      readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
      readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
      readUInt8(offset: number, noAssert?: boolean): number;
      readUInt16LE(offset: number, noAssert?: boolean): number;
      readUInt16BE(offset: number, noAssert?: boolean): number;
      readUInt32LE(offset: number, noAssert?: boolean): number;
      readUInt32BE(offset: number, noAssert?: boolean): number;
      readInt8(offset: number, noAssert?: boolean): number;
      readInt16LE(offset: number, noAssert?: boolean): number;
      readInt16BE(offset: number, noAssert?: boolean): number;
      readInt32LE(offset: number, noAssert?: boolean): number;
      readInt32BE(offset: number, noAssert?: boolean): number;
      readFloatLE(offset: number, noAssert?: boolean): number;
      readFloatBE(offset: number, noAssert?: boolean): number;
      readDoubleLE(offset: number, noAssert?: boolean): number;
      readDoubleBE(offset: number, noAssert?: boolean): number;
      swap16(): Buffer;
      swap32(): Buffer;
      swap64(): Buffer;
      writeUInt8(value: number, offset: number, noAssert?: boolean): number;
      writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
      writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
      writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
      writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
      writeInt8(value: number, offset: number, noAssert?: boolean): number;
      writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
      writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
      writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
      writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
      writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
      writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
      writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
      writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
      fill(value: any, offset?: number, end?: number): this;
      indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: string): number;
      lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: string): number;
      entries(): IterableIterator<[number, number]>;
      includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean;
      keys(): IterableIterator<number>;
      values(): IterableIterator<number>;
  }
  
  /**
   * Raw data is stored in instances of the Buffer class.
   * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
   * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
   */
  declare var Buffer: {
      /**
       * Allocates a new buffer containing the given {str}.
       *
       * @param str String to store in buffer.
       * @param encoding encoding to use, optional.  Default is 'utf8'
       * @deprecated since v10.0.0 - Use \`Buffer.from(string[, encoding])\` instead.
       */
      new(str: string, encoding?: string): Buffer;
      /**
       * Allocates a new buffer of {size} octets.
       *
       * @param size count of octets to allocate.
       * @deprecated since v10.0.0 - Use \`Buffer.alloc()\` instead (also see \`Buffer.allocUnsafe()\`).
       */
      new(size: number): Buffer;
      /**
       * Allocates a new buffer containing the given {array} of octets.
       *
       * @param array The octets to store.
       * @deprecated since v10.0.0 - Use \`Buffer.from(array)\` instead.
       */
      new(array: Uint8Array): Buffer;
      /**
       * Produces a Buffer backed by the same allocated memory as
       * the given {ArrayBuffer}.
       *
       *
       * @param arrayBuffer The ArrayBuffer with which to share memory.
       * @deprecated since v10.0.0 - Use \`Buffer.from(arrayBuffer[, byteOffset[, length]])\` instead.
       */
      new(arrayBuffer: ArrayBuffer): Buffer;
      /**
       * Allocates a new buffer containing the given {array} of octets.
       *
       * @param array The octets to store.
       * @deprecated since v10.0.0 - Use \`Buffer.from(array)\` instead.
       */
      new(array: any[]): Buffer;
      /**
       * Copies the passed {buffer} data onto a new {Buffer} instance.
       *
       * @param buffer The buffer to copy.
       * @deprecated since v10.0.0 - Use \`Buffer.from(buffer)\` instead.
       */
      new(buffer: Buffer): Buffer;
      prototype: Buffer;
      /**
       * When passed a reference to the .buffer property of a TypedArray instance,
       * the newly created Buffer will share the same allocated memory as the TypedArray.
       * The optional {byteOffset} and {length} arguments specify a memory range
       * within the {arrayBuffer} that will be shared by the Buffer.
       *
       * @param arrayBuffer The .buffer property of a TypedArray or a new ArrayBuffer()
       */
      from(arrayBuffer: ArrayBuffer, byteOffset?: number, length?: number): Buffer;
      /**
       * Creates a new Buffer using the passed {data}
       * @param data data to create a new Buffer
       */
      from(data: any[] | string | ArrayBuffer | Uint8Array /*| TypedArray*/): Buffer;
      /**
       * Creates a new Buffer containing the given JavaScript string {str}.
       * If provided, the {encoding} parameter identifies the character encoding.
       * If not provided, {encoding} defaults to 'utf8'.
       */
      from(str: string, encoding?: string): Buffer;
      /**
       * Returns true if {obj} is a Buffer
       *
       * @param obj object to test.
       */
      isBuffer(obj: any): obj is Buffer;
      /**
       * Returns true if {encoding} is a valid encoding argument.
       * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
       *
       * @param encoding string to test.
       */
      isEncoding(encoding: string): boolean | undefined;
      /**
       * Gives the actual byte length of a string. encoding defaults to 'utf8'.
       * This is not the same as String.prototype.length since that returns the number of characters in a string.
       *
       * @param string string to test. (TypedArray is also allowed, but it is only available starting ES2017)
       * @param encoding encoding used to evaluate (defaults to 'utf8')
       */
      byteLength(string: string | Buffer | DataView | ArrayBuffer, encoding?: string): number;
      /**
       * Returns a buffer which is the result of concatenating all the buffers in the list together.
       *
       * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
       * If the list has exactly one item, then the first item of the list is returned.
       * If the list has more than one item, then a new Buffer is created.
       *
       * @param list An array of Buffer objects to concatenate
       * @param totalLength Total length of the buffers when concatenated.
       *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
       */
      concat(list: Uint8Array[], totalLength?: number): Buffer;
      /**
       * The same as buf1.compare(buf2).
       */
      compare(buf1: Uint8Array, buf2: Uint8Array): number;
      /**
       * Allocates a new buffer of {size} octets.
       *
       * @param size count of octets to allocate.
       * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
       *    If parameter is omitted, buffer will be filled with zeros.
       * @param encoding encoding used for call to buf.fill while initalizing
       */
      alloc(size: number, fill?: string | Buffer | number, encoding?: string): Buffer;
      /**
       * Allocates a new buffer of {size} octets, leaving memory not initialized, so the contents
       * of the newly created Buffer are unknown and may contain sensitive data.
       *
       * @param size count of octets to allocate
       */
      allocUnsafe(size: number): Buffer;
      /**
       * Allocates a new non-pooled buffer of {size} octets, leaving memory not initialized, so the contents
       * of the newly created Buffer are unknown and may contain sensitive data.
       *
       * @param size count of octets to allocate
       */
      allocUnsafeSlow(size: number): Buffer;
      /**
       * This is the number of bytes used to determine the size of pre-allocated, internal Buffer instances used for pooling. This value may be modified.
       */
      poolSize: number;
  };
  `);
  },
};
