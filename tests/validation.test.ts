import {
  validateEmail,
  validatePersonalNumber,
  validateZipCode,
  validateText,
} from "../utils/validation";

// example of valid req.body
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

// **************** test of validator functions ************************************************
// Email unit test
describe("Validate email", () => {
  test("Should return true when input email format is valid", () => {
    expect(validateEmail("email", "example@gmail.com")).toBeTruthy();
  });
  test("Should throw an error as invalid email format", () => {
    expect(validateEmail("email", "example@gmail")).toBeFalsy();
  });
});

// Personal number unit test
describe("Validate personal number", () => {
  test("Should return true when input person number is valid", () => {
    expect(
      validatePersonalNumber("personalnumber", "550713-1405")
    ).toBeTruthy();
  });

  test("Should throw an error as invalid person number", () => {
    expect(validatePersonalNumber("personalnumber", "550713-405")).toBeFalsy();
  });
});

// Zip code unit test
describe("Validate zip code", () => {
  test("Should return true when input is string", () => {
    expect(validateZipCode("zipCode", "123 45")).toBeTruthy();
  });

  test("Should throw an error when zip is empty", () => {
    expect(validateZipCode("zipCode", "123 5")).toBeFalsy();
  });
});

// **************** Full test of user input (req.body) ************************************************
describe("Itegrated validations of client data", () => {
  test("Should return true when input is fully valid", () => {
    expect(validateText(validClientData)).toStrictEqual([]);
  });

  // When key/keys are missing
  test("Should return array of error/errors object when key is missing", () => {
    expect(
      validateText({
        // firstname is missing
        lastname: "Andersson",
        email: "anna.andersson@gmail.com",
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        //zip code is missing
        city: "Stockholm",
        country: "Sweden",
      })
    ).toStrictEqual([
      { error: "firstname is missing" },
      { error: "zipCode is missing" },
    ]);
  });

  // when all keys are present, but value/values are empty
  test("Should return array of error object when value is empty", () => {
    expect(
      validateText({
        firstname: "Anna",
        lastname: "", // lastname is empty
        email: "", // email is empty
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        zipCode: "111 22",
        city: "Stockholm",
        country: "Sweden",
      })
    ).toStrictEqual([
      { error: "lastname must not be empty" },
      { error: "email must not be empty" },
    ]);
  });

  // when values are invalid
  test("Should return array of error/errors object when value is not valid", () => {
    expect(
      validateText({
        firstname: "Anna",
        lastname: "Andersson",
        email: "anna.andersson@gmail", // invalid email
        personalnumber: "55071-1405", // invalid personal number
        address: "Utvecklargatan 12",
        zipCode: "111 2", // invalid zip code
        city: "Stockholm",
        country: "Sweden",
      })
    ).toStrictEqual([
      { error: "email is not valid" },
      { error: "personal number is not valid" },
      { error: "zip code is not valid" },
    ]);
  });
});

// when errors mixed errors in emphasized test are caught
test("Should return array of error/errors object when key is missing / value is empty / value is not valid", () => {
  expect(
    validateText({
      firstname: "Anna",
      // lastname is missing
      email: "anna.andersson@gmail", // invalid email
      personalnumber: "55071-1405", // invalid personal number
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "", //city is empty
      country: "Sweden",
    })
  ).toStrictEqual([
    { error: "lastname is missing" },
    { error: "email is not valid" },
    { error: "personal number is not valid" },
    { error: "city must not be empty" },
  ]);
});
