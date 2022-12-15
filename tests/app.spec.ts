import { default as request } from "supertest";
import nock from "nock";
import makeApp from "../app";

const createContact = jest.fn(); //Test done
const getContactById = jest.fn(); //Will be tested
const getAllContacts = jest.fn(); // Will be tested

const app = makeApp({ createContact });
const validClientData = {
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};

// Nock mockning functions start
const ninjas = nock("https://api.api-ninjas.com");
beforeAll(() => {
  ninjas
    .get(
      `/v1/geocoding?city=${validClientData.city}&country=${validClientData.country}`
    )
    .times(1)
    .reply(201, {
      latitude: 59.3251172,
      longitude: 18.0710935,
    });
});

beforeEach(() => {
  createContact.mockReset();
  createContact.mockResolvedValue(validClientData);

 
});

// *******************create contact********************************************************
describe("POST/contact", () => {
  it("should return 201 status code when posting client with valid data", async () => {
    const response = await request(app).post("/contact").send(validClientData);
    expect(response.statusCode).toBe(201);
  });

  it("should return content-type = json", async () => {
    const response = await request(app).post("/contact");

    expect(response.headers["content-type"].indexOf("json") > -1).toBeTruthy();
  });

  it("should return 400 status code if invalid post data is sent", async () => {
    const response = await request(app).post("/contact").send({
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    expect(response.statusCode).toBe(400);
  });
});
