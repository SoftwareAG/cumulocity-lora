import { IManagedObject } from "@c8y/client";
import { C8YData, DownlinkData, DeviceOperation } from "lora-codec-interface";
import { NodeVM, VMScript } from 'vm2';

export class CustomCodec {
    vm: NodeVM;
    name: string;
    id: string;
    decodeScript: VMScript;
    encodeScript: VMScript;
    operations: Array<DeviceOperation>;

    constructor(mo: IManagedObject) {
        this.name = mo.name;
        this.id = mo.id;
        console.log("Adding new custom codec with name " + mo.name);
        try {
            this.vm = new NodeVM({
                eval: false,
                require: { external: ['lora-codec-interface'] , import: ['lora-codec-interface'] },
            });
        } catch(e) {
            console.error("Can't create new VM.", e);
        }
        if (mo.decodeString) {
            console.log("Found a decode script: " + mo.decodeString);
            this.decodeString = mo.decodeString;
        }
        if (mo.encodeString) {
            console.log("Found an encode script: " + mo.encodeString);
            this.encodeString = mo.encodeString;
        }
        if (mo.operations) {
            console.log("Found operations: " + mo.operations);
            this.operations = mo.operations;
        }
    }

    public set decodeString(newDecodeString: string) {
        console.log("Compiling script...");
        try {
            this.decodeScript = new VMScript("const { C8YData } = require('lora-codec-interface');module.exports = function(device, fport, time, payload) { " + newDecodeString + " }").compile();
        } catch(e) {
            console.error(e);
        }
        console.log(this.decodeScript.code);
    }

    public set encodeString(newEncodeString: string) {
        console.log("Compiling script...");
        try {
            this.encodeScript = new VMScript("const { DownlinkData } = require('lora-codec-interface');module.exports = function(device, operation) { " + newEncodeString + " }").compile();
        } catch(e) {
            console.error(e);
        }
        console.log(this.decodeScript.code);
    }

    public decode(device: IManagedObject, fport: number, time: Date, payload: string): C8YData {
        console.log("Calling decoding script...");
        console.log(this.vm.run(this.decodeScript));
        return this.vm.run(this.decodeScript)(device, fport, time, payload);
    }

    public encode(device: IManagedObject, operation: string): DownlinkData {
        console.log("Calling encoding script...");
        console.log(this.vm.run(this.encodeScript));
        let operationJson: any = JSON.parse(operation);
        return this.vm.run(this.encodeScript)(device, operationJson);
    }
}