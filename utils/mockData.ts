// POST/contact tests data
export const mockValidContctIn = {
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};

export const mockInvalidContactIn = {
  //  firstname missing
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-14", // invalid personalnumber
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};

// Nock response (tests data)
export const nockResponseData = [
  {
    name: "Stockholm",
    latitude: 59.3251172,
    longitude: 18.0710935,
    country: "SE",
  },
];

// GET/contact tests data
export const mockAllContact = [
  {
    id: "639c7f60216bf54f2956e6f0",
    firstname: "Anna",
    lastname: "Andersson",
    email: "anna.andersson@gmail.com",
    personalnumber: "550713-1405",
    address: "Utvecklargatan 12",
    zipCode: "111 22",
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3251172,
    lng: 18.0710935
  },
  {
    id: "639ceceb875dc4af609dd18e",
    firstname: "Lisa",
    lastname: "Andersson",
    email: "lisa.andersson@gmail.com",
    personalnumber: "980715-1605",
    address: "Utvecklargatan 12",
    zipCode: "111 22",
    city: "Gothenburg",
    country: "Sweden",
    lat:  57.7072326,
    lng: 11.9670171
  },
];

// GET/contact/:id tests data
export const mockContctByIdData = {
  id: "639774eff665a1529732c4f0",
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
  lat: 59.3251172,
  lng: 18.0710935,
};