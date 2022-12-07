import { validateEmail, validatePersonalNumber, validateZipCode, validateText } from "../utils/validation";

// Email test
describe("Validate email", () => {
  test("Should return true when input email format is valid", () => {
    expect(validateEmail("example@gmail.com")).toBe(true);
  });
  test("Should throw an error as invalid email format", () => {
    expect(() => validateEmail("example@gmail")).toThrow("Invalid email");
  });

  test("Should throw an error when email is empty", () => {
    expect(() => validateEmail("")).toThrow("Email is required");
  });
});

// Personal number test
describe("Validate personal number", () => {
  test("Should return true when input person number is valid", () => {
    expect(validatePersonalNumber("550713-1405")).toBe(true);
  });

  test("Should throw an error as invalid person number", () => {
    expect(() => validatePersonalNumber("5507131405")).toThrow("Invalid person number");
  });

  test("Should throw an error when person number is empty", () => {
    expect(() => validatePersonalNumber("")).toThrow("Person number is required");
  });
});

// Zip test
describe("Validate zip code", () => {
  test("Should return true when input is string", () => {
    expect(validateZipCode("123 45")).toBe(true);
  });

  test("Should throw an error when zip is empty", () => {
    expect(() => validateZipCode("")).toThrow("Zip is required");
  });
});


// Others text validations
describe("Validate text", () => {
// .......
});
