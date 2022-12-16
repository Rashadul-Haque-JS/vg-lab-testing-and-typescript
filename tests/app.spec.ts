import { default as request } from "supertest";
import nock from "nock";
import makeApp from "../app";

const createContact = jest.fn(); //Test done
const getContactById = jest.fn(); //Will be tested
const getAllContact = jest.fn(); //Will be tested
const app = makeApp({ createContact, getAllContact });
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
  createContact.mockResolvedValue(validClientData);
});

afterEach(() => {
  getAllContact.mockResolvedValue([
    {
      firstname: "Anna",
      lastname: "Andersson",
      email: "eric.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    },
    {
      firstname: "Erik",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    },
    {
      firstname: "Lisa",
      lastname: "Andersson",
      email: "lisa.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    },
  ]);
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

// *******************Get contact by id ********************************************************
/*Will fix later */

// *******************Get contact all contacs ********************************************************
describe("GET /contact", () => {
  it("should return 200 status code when getting all contact", async () => {
    const response = await request(app).get("/contact");
    expect(response.statusCode).toBe(200);
  });

  it("should return data  when getting all contact", async () => {
    const response = await request(app).get("/contact");
    expect(response.body).toStrictEqual([
      {
        firstname: "Anna",
        lastname: "Andersson",
        email: "eric.andersson@gmail.com",
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        zipCode: "111 22",
        city: "Stockholm",
        country: "Sweden",
      },
      {
        firstname: "Erik",
        lastname: "Andersson",
        email: "anna.andersson@gmail.com",
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        zipCode: "111 22",
        city: "Stockholm",
        country: "Sweden",
      },
      {
        firstname: "Lisa",
        lastname: "Andersson",
        email: "lisa.andersson@gmail.com",
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        zipCode: "111 22",
        city: "Stockholm",
        country: "Sweden",
      },
    ]);
  });

  it("should return 404 when id does not exist ", async () => {
    getAllContact.mockResolvedValue([]);
    const response = await request(app).get("/contact");
    console.log(response.body); // it should be an empty object
    expect(response.statusCode).toBe(404);
  });
});
