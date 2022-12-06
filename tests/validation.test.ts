// Validate functions (are yet to create) will be imported
// ......

// Email test
describe("Validate email", () => {
    test("Should return true when input email format is valid", () => {
      expect(validateEmail("example@gmail.com")).toBe(true);
    });
    test("Should throw an error as invalid email format", () => {
      expect(validateEmail("example@gmail")).toThrow('Invalid email format');
    });

    test("Should throw an error when email is empty", () => {
        expect(validateEmail('')).toThrow('Email is required');
      });
  });

  // Personal number test
describe("Validate personal number", () => {
    test("Should return true when input person number is valid", () => {
      expect(validatePnr("550713-1405")).toBe(true);
    });

    // wrong format
    test("Should throw an error as invalid person number", () => {
      expect(validatePnr("5507131405")).toThrow('Invalid person number');
    });

    // Wrong length
    test("Should throw an error as invalid person number", () => {
        expect(validatePnr("550713145")).toThrow('Invalid person number');
      });

    test("Should throw an error when person number is empty", () => {
        expect(validatePnr('')).toThrow('Person number is required');
      });
  });
  
// Zip test
  describe("Validate zip", () => {
    test("Should return true when input is string", () => {
      expect(validateZip("12345")).toBe(true);
    });

    test("Should throw an error when no is not string", () => {
        expect(validateZip(12345)).toBe('Zip is not a string');
      });

      test("Should throw an error when zip is empty", () => {
        expect(validateZip('')).toBe('zip is rquired');
      });
  });