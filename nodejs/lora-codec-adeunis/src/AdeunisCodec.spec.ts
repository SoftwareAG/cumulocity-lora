import { C8YData, MicroserviceSubscriptionService } from "lora-codec-interface";
import { AdeunisCodec } from "./AdeunisCodec";
import { IManagedObject } from "@c8y/client";

class TestCodec extends AdeunisCodec {
  testDecode(model: string, payload: string): C8YData {
    let mo: Partial<IManagedObject> = { id: "test" };
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
    console.log(c8yData);
    expect(c8yData.measurements.length).toBe(20);
  });
  test("Test analog", () => {
    let codec: TestCodec = new TestCodec(null);
    let c8yData: C8YData = codec.testDecode("analog", "42500110000002100000");
    console.log(c8yData);
    expect(c8yData.measurements.length).toBe(2);
  });
});
