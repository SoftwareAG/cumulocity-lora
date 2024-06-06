import { IManagedObject } from "@c8y/client";
import { C8YData } from "lora-codec-interface";
import { AdeunisCodec } from "./AdeunisCodec";

class TestCodec extends AdeunisCodec {
  testDecode(model: string, payload: string): C8YData {
    let mo: Partial<IManagedObject> = {
      id: "test",
      samplingPeriod: { value: 10, unit: "s" },
    };
    return this._decode(null, mo, model, 1, new Date(), payload);
  }
}

describe("Test Adeunis Codec", () => {
  /*let testComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExampleModule]
      });
      testComponent = TestBed.createComponent(TestComponent);
    });*/

  test("Test pulse with historic data", () => {
    let codec: TestCodec = new TestCodec(null);
    let c8yData: C8YData = codec.testDecode(
      "pulse",
      "4820000000010000000200000100020003000400050006000700080009000A000B000C000D000E000F00100011001200130014"
    );
    console.dir(c8yData, { depth: null });
    expect(c8yData.measurements).toHaveLength(20);
  });
  test("Test analog", () => {
    let codec: TestCodec = new TestCodec(null);
    let c8yData: C8YData = codec.testDecode("analog", "42500110000002100000");
    console.dir(c8yData, { depth: null });
    expect(c8yData.measurements).toHaveLength(2);
  });
  test("Test Pulse 4 with historic data", () => {
    let codec: TestCodec = new TestCodec(null);
    let c8yData: C8YData = codec.testDecode(
      "pulse4",
      "5A8400000127000100020003000414ABA3E9"
    );
    console.dir(c8yData, { depth: null });
    expect(c8yData.measurements.length).toBe(5);
  });
  test("Test pulse data", () => {
    let codec: TestCodec = new TestCodec(null);
    let c8yData: C8YData = codec.testDecode("pulse", "46000000000000026C9B");
    console.dir(c8yData, { depth: null });
    expect(c8yData.measurements).toHaveLength(2);
    expect(c8yData.measurements[0].type).toBe("Channel A");
    expect(c8yData.measurements[1].type).toBe("Channel B");
  });
});
