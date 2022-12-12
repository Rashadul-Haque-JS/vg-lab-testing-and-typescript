import { default as request } from "supertest";
import nock from "nock";

const makeApp = (x,y,z) // Will import app when created

const createContact = jest.fn();
const getContactById = jest.fn();
const getAllContacts = jest.fn();

const app = makeApp({ createContact, getContactById, getAllContacts });
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
    .reply(200,{
      latitude: 59.3251172,
      longitude: 18.0710935
    });
});

beforeEach(() => {
  createContact.mockReset();
  createContact.mockResolvedValue(validClientData);

  getContactById.mockResolvedValue({
    startTime: "2022-06-01 10:30",
    durationInSeconds: 360,
    activityType: "running",
  });
});

afterEach(() => {
  getAllContacts.mockResolvedValue([
    {
        firstname: "Anna",
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
        lastname: "Nilsson",
        email: "lisa.nilsson@gmail.com",
        personalnumber: "580718-1709",
        address: "old town 36",
        zipCode: "333 33",
        city: "London",
        country: "England",
    },
    {
        firstname: "Foo",
        lastname: "Bar",
        email: "foo.bar@gmail.com",
        personalnumber: "850716-4407",
        address: "new town 18",
        zipCode: "444 44",
        city: "Paris",
        country: "France",
    },
  ]);
});