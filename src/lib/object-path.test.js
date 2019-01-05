import { get, set, push } from "./object-path";

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

describe("set", () => {
  it("does not modify the original object", () => {
    const homer = set(person, "firstName", "Homer");

    expect(homer).not.toBe(person);
    expect(homer.firstName).toBe("Homer");
  });

  it("sets an existing root property", () => {
    const homer = set(person, "firstName", "Homer");

    expect(homer.firstName).toBe("Homer");
  });

  it("sets a new root property", () => {
    const homer = set(person, "age", 39);

    expect(homer.age).toBe(39);
  });

  it("sets an existing nested property", () => {
    const homer = set(person, "address.street", "742 Evergreen Terrace");

    expect(homer.address.street).toBe("742 Evergreen Terrace");
  });

  it("sets a new nested property", () => {
    const homer = set(
      person,
      "employer.name",
      "Springfield Nuclear Power Plant"
    );

    expect(homer.employer.name).toBe("Springfield Nuclear Power Plant");
  });

  it("sets properties nested inside arrays", () => {
    const homer = set(person, "vehicles.0.model", "Canyonero");

    expect(homer.vehicles[0].model).toBe("Canyonero");
  });
});

describe("push", () => {
  const helpdesk = {
    ext: 2349,
    tickets: [
      {
        id: 1,
        subject: "Form is broken in IE",
        body: "Can't submit form.",
        related: ["#18271"]
      }
    ]
  };

  const newTicket = {
    id: 2,
    subject: "Help!!!",
    body: ""
  };

  it("should not modify the original", () => {
    push(helpdesk, "tickets", { ...newTicket });

    expect(helpdesk.tickets.length).toBe(1);
  });

  it("push a value into an existing array", () => {
    const withNewTicket = push(helpdesk, "tickets", { ...newTicket });

    expect(withNewTicket.tickets.length).toBe(2);
    expect(withNewTicket.tickets[1].id).toBe(2);
  });

  it("push a value into a nested array", () => {
    const addRelated = push(helpdesk, "tickets.0.related", "#13211");

    expect(addRelated.tickets[0].related.length).toBe(2);
    expect(addRelated.tickets[0].related[1]).toBe("#13211");
  });

  it("throws TypeError if path is not an array", () => {
    function throwTypeError() {
      push(helpdesk, "ext", { ...newTicket });
    }

    expect(throwTypeError).toThrow();
  });
});
