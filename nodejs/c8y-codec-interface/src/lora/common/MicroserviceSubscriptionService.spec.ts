import { FetchClient, IFetchResponse } from "@c8y/client";
import { MicroserviceSubscriptionService } from "./MicroserviceSubscriptionService";

describe("Test microservice subscription service", () => {
  test("Test getting no users", async () => {
    process.env.C8Y_BASEURL = "https://fake";
    jest.spyOn(FetchClient.prototype, "fetch").mockImplementation(async () => {
      let response: IFetchResponse = {
        status: 200,
        headers: new Headers(),
        arrayBuffer: null,
        json: async () => {
          return {};
        },
        text: null,
        ok: true,
        redirected: true,
        statusText: "",
        type: null,
        url: "",
        body: null,
        clone: null,
        bodyUsed: true,
        blob: null,
        formData: null,
      };
      return response;
    });
    let service = new MicroserviceSubscriptionService(true);
    await service.getUsers();
    expect(service.getClients().size).toBe(0);
  });
  test("Test getting one user", async () => {
    process.env.C8Y_BASEURL = "https://fake";
    jest.spyOn(FetchClient.prototype, "fetch").mockImplementation(async () => {
      let response: IFetchResponse = {
        status: 200,
        headers: new Headers(),
        arrayBuffer: null,
        json: async () => {
          return {
            users: [
              {
                name: "user",
                password: "mypassword",
                tenant: "fake-tenant",
              },
            ],
          };
        },
        text: null,
        ok: true,
        redirected: true,
        statusText: "",
        type: null,
        url: "",
        body: null,
        clone: null,
        bodyUsed: true,
        blob: null,
        formData: null,
      };
      return response;
    });
    let service = new MicroserviceSubscriptionService(true);
    await service.getUsers();
    expect(service.getClients().size).toBe(1);
    expect(service.getClients().get("fake-tenant")).toBeDefined();
  });
});
