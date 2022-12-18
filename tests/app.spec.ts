import { default as request } from "supertest";
import nock from "nock";
import {
  mockAllContact,
  mockValidContctIn,
  mockInvalidContactIn,
  nockResponseData,
  mockContctByIdData,
} from "../utils/mockData";

import makeApp from "../app";

const createContact = jest.fn(); //Test done
const getAllContact = jest.fn(); //Test done
const getContactById = jest.fn(); //Test in progress

const app = makeApp({ createContact, getAllContact, getContactById });

// Nock mockning functions start

beforeEach(() => {
  createContact.mockReset();
  createContact.mockResolvedValue(mockValidContctIn);
  getContactById.mockResolvedValue(mockValidContctIn);
});

afterEach(() => {
  getAllContact.mockResolvedValue(mockAllContact);
});

// *******************create contact********************************************************
describe("POST/contact", () => {
  it("should return 201 status code when posting client with valid data", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockValidContctIn);
    expect(response.statusCode).toBe(201);
  });
  it("should return content-type = json", async () => {
    const response = await request(app).post("/contact");
    expect(response.headers["content-type"].indexOf("json") > -1).toBeTruthy();
  });
  it("should return 400 status code if invalid post data is sent", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockInvalidContactIn);
    expect(response.statusCode).toBe(400);
  });

  it("should return errors if invalid post data is sent", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockInvalidContactIn);
    expect(response.body).toStrictEqual([
      { error: "firstname is missing" },
      { error: "personal number is not valid" },
    ]);
  });

  it("should return 201 status code when posting client with valid data", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockValidContctIn);
    expect({ code: response.statusCode, body: response.body }).toEqual({
      code: 201,
      body: "no content",
    });
  });
});

// *******************Get contact all contacs ********************************************************
describe("GET /contact", () => {
  jest.setTimeout(20000);
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
    expect(response.statusCode).toBe(404);
  });
});

// *******************Get contact by id ********************************************************
describe("GET/contact/:id", () => {
  beforeEach(() => {
    nock("https://api.api-ninjas.com")
      .get(`/v1/geocoding?city=Stockholm&country=Sweden`)
      .times(1)
      .reply(200, nockResponseData);
  });

  it("should return 200 when contact with valid id does exist ", async () => {
    const response = await request(app).get(
      "/contact/639774eff665a1529732c4f0"
    );
    expect(response.statusCode).toBe(200);
  });
  it("should return combined data (contact and geocodes) with correct value", async () => {
    const response = await request(app).get(
      "/contact/639774eff665a1529732c4f0"
    );
    response.body = { id: "639774eff665a1529732c4f0", ...response.body };
    expect(response.body).toStrictEqual(mockContctByIdData);
  });

  it("should return 400 when id does not exist or invalid", async () => {
    const response = await request(app).get("/contact/invalid");
    expect(response.statusCode).toBe(400);
  });

  it("should return 404 when contact does not exist with query id", async () => {
    const response = await request(app).get(
      "/contact/639774eff665a1529732c4f9"
    );
    expect(response.statusCode).toBe(404);
  });
});