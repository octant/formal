import validator from "./";

describe("validator", () => {
  const validate = validator("m");

  const testFailure = jest.fn(() => false);
  const testSuccess = jest.fn(() => true);

  const tests = [
    { test: testSuccess, message: "You shouldn't see this" },
    { test: testFailure, message: "You should see this" }
  ];

  it("should run every test", () => {
    const errors = validate(tests);

    expect(errors.length).toBe(1);
    expect(testFailure.mock.calls.length).toBe(1);
    expect(testSuccess.mock.calls.length).toBe(1);
  });

  it("should return a list of error messages", () => {
    const errors = validate(tests);

    expect(errors.length).toBe(1);
    expect(errors[0]).toBe("You should see this");
  });
});
