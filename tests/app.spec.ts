import { default as request } from "supertest";
import nock from "nock";
import {
  mockAllContact,
  mockValidContctData,
  mockInvalidContData,
} from "../utils/mockData";

import makeApp from "../app";

const createContact = jest.fn(); //Test done
const getAllContact = jest.fn(); //Test done

const app = makeApp({ createContact, getAllContact });

// Nock mockning functions start
beforeAll(() => {
  nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=London&country=England")
    .times(1)
    .reply(200, {
      latitude: 51.5073219,
      longitude: -0.1276474,
    });
});

beforeEach(() => {
  createContact.mockReset();
  createContact.mockResolvedValue(mockValidContctData);
});

afterEach(() => {
  getAllContact.mockResolvedValue(mockAllContact);
});

// *******************create contact********************************************************
describe("POST/contact", () => {
  it("should return 201 status code when posting client with valid data", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockValidContctData);
    expect(response.statusCode).toBe(201);
  });
  it("should return content-type = json", async () => {
    const response = await request(app).post("/contact");
    expect(response.headers["content-type"].indexOf("json") > -1).toBeTruthy();
  });
  it("should return 400 status code if invalid post data is sent", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockInvalidContData);
    expect(response.statusCode).toBe(400);
  });

  it("should return errors if invalid post data is sent", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockInvalidContData);
    expect(response.body).toStrictEqual([
      { error: "firstname is missing" },
      { error: "personal number is not valid" },
    ]);
  });

  it("should return 201 status code when posting client with valid data", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockValidContctData);
    expect({ code: response.statusCode, body: response.body }).toEqual({
      code: 201,
      body: "no content",
    });
  });
});

// *******************Get contact all contacs ********************************************************
describe("GET /contact", () => {
  it("should return 200 status code when getting all contact", async () => {
    const response = await request(app).get("/contact");
    expect(response.statusCode).toBe(200);
  });

  it("should return data  when getting all contact", async () => {
    const response = await request(app).get("/contact");
    expect(response.body).toStrictEqual(mockAllContact);
  });

  it("should return 404 when id does not exist ", async () => {
    getAllContact.mockResolvedValue([]);
    const response = await request(app).get("/contact");
    console.log(response.body); // it should be an empty object
    expect(response.statusCode).toBe(404);
  });
});
