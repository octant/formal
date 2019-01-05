import { get } from "./object-path";

const person = {
  firstName: "Michael",
  lastName: "Scott",
  vehicles: [
    { make: "Chrysler", model: "Sebring", year: "2004", color: "silver" }
  ],
  address: {
    street: "1725 Slough Avenue",
    city: "Scranton",
    state: "PA",
    country: "US"
  }
};

describe("get", () => {
  it("gets the value of a root property", () => {
    expect(get(person, "firstName")).toBe("Michael");
  });

  it("gets the value of a nested property", () => {
    expect(get(person, "address.city")).toBe("Scranton");
  });

  it("gets the value of property nested in an array", () => {
    expect(get(person, "vehicles.0.model")).toBe("Sebring");
  });
});
