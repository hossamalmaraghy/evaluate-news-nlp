// Import the function to test
import { checkForName } from '../src/client/js/nameChecker';

// Mock the alert function before the tests
beforeAll(() => {
  global.alert = jest.fn();
});

describe("Testing the name checking functionality", () => {
  test("Testing the checkForName() function to be defined", () => {
    expect(checkForName).toBeDefined();
  });

  test("Testing checkForName() with a valid name", () => {
    const result = checkForName("Hossam");
    // Assuming the function returns true for valid names
    expect(result).toBe(true);
  });

  test("Testing checkForName() with an invalid name", () => {
    const result = checkForName("12345");
    // Assuming the function returns false for invalid names
    expect(result).toBe(false);
    expect(global.alert).toHaveBeenCalledWith("Enter a valid captain name");
  });
});
