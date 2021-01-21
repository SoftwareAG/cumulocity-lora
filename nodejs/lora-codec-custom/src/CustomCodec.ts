import { IManagedObject } from "@c8y/client";
import { C8YData, DownlinkData } from "c8y-codec-interface";
import { NodeVM, VMScript } from 'vm2';

export class CustomCodec {
    vm: NodeVM;
    name: string;
    id: string;
    decodeScript: VMScript;
    encodeScripts: Map<string, VMScript> = new Map<string, VMScript>();

    constructor(mo: IManagedObject) {
        this.name = mo.name;
        this.id = mo.id;
        console.log("Adding new custom codec with name " + mo.name);
        try {
            this.vm = new NodeVM({
                eval: false,
                require: { external: ['c8y-codec-interface'] , import: ['c8y-codec-interface'] },
            });
        } catch(e) {
            console.error("Can't create new VM.", e);
        }
        if (mo.decodeString) {
            console.log("Found a decode script: " + mo.decodeString);
            this.decodeString = mo.decodeString;
        }
        if (mo.encodeStrings) {
            console.log("Found an encode script: " + mo.decodeString);
            mo.encodeStrings.forEach((encodeString: string, operation: string) => {
                this.addEncodeString(operation, encodeString);
            })
        }
    }

    public set decodeString(newDecodeString: string) {
        console.log("Compiling script...");
        try {
            this.decodeScript = new VMScript("const { C8YData } = require('c8y-codec-interface');module.exports = function(device, fport, time, payload) { " + newDecodeString + " }").compile();
        } catch(e) {
            console.error(e);
        }
        console.log(this.decodeScript.code);
    }

    public addEncodeString(operation:string, encodeString: string) {
        this.encodeScripts.set(operation, new VMScript("const { DownlinkData } = require('c8y-codec-interface');module.exports = function(device, operation) { " + encodeString + " }").compile());
    }

    public decode(device: IManagedObject, fport: number, time: Date, payload: string): C8YData {
        console.log("Calling decoding script...");
        console.log(this.vm.run(this.decodeScript));
        return this.vm.run(this.decodeScript)(device, fport, time, payload);
    }

    public encode(device: IManagedObject, operation: string): DownlinkData {
        let operationJson: any = JSON.parse(operation);
        let command: string = Object.keys(operationJson)[0];
        console.log(`Will call command ${command} with parameters ${operation}`);
        return this.vm.run(this.encodeScripts.get(command))(device, operationJson);
    }
}