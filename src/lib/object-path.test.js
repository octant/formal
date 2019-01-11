import {
  get,
  removeKey,
  removeIndex,
  set,
  push,
  traverse
} from "./object-path";

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
    const homer = set(person, "address.state", "IL");

    expect(homer).not.toBe(person);
    expect(homer.address.state).toBe("IL");
    expect(person.address.state).toBe("PA");
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

describe("traverse - key/value", () => {
  it("should call a function for every key value pair", () => {
    const cb = jest.fn();

    traverse(person, { keyValue: cb });

    expect(cb.mock.calls.length).toBe(10);
  });

  it("should pass a string path and value for each property", () => {
    const keyValueList = [];
    const cb = (key, value) => (keyValueList[key] = value);

    traverse(person, { keyValue: cb });

    expect(Object.keys(keyValueList).length).toBe(10);
    expect(keyValueList["vehicles.0.year"]).toBe("2004");
  });
});

describe("traverse - array", () => {
  it("should call a function before each array", () => {
    const cbKeyValue = jest.fn();
    const cbBeforeArray = jest.fn();

    traverse(person, { keyValue: cbKeyValue, beforeArray: cbBeforeArray });

    expect(cbBeforeArray.mock.calls.length).toBe(1);
  });

  it("should call a function after each array", () => {
    const cbKeyValue = jest.fn();
    const cbAfterArray = jest.fn();

    traverse(person, { keyValue: cbKeyValue, afterArray: cbAfterArray });

    expect(cbAfterArray.mock.calls.length).toBe(1);
  });

  it("should call a function before each array item", () => {
    const cbKeyValue = jest.fn();
    const cbBeforeArray = jest.fn();

    traverse(person, { keyValue: cbKeyValue, beforeArrayItem: cbBeforeArray });

    expect(cbBeforeArray.mock.calls.length).toBe(1);
  });

  it("should call a function after each array item", () => {
    const cbKeyValue = jest.fn();
    const cbAfterArray = jest.fn();

    traverse(person, { keyValue: cbKeyValue, afterArrayItem: cbAfterArray });

    expect(cbAfterArray.mock.calls.length).toBe(1);
  });

  it("should call a function before each array object", () => {
    const cbKeyValue = jest.fn();
    const cbBeforeObject = jest.fn();

    traverse(person, { keyValue: cbKeyValue, beforeObject: cbBeforeObject });

    expect(cbBeforeObject.mock.calls.length).toBe(1);
  });

  it("should call a function after each object", () => {
    const cbKeyValue = jest.fn();
    const cbAfterObject = jest.fn();

    traverse(person, { keyValue: cbKeyValue, afterObject: cbAfterObject });

    expect(cbAfterObject.mock.calls.length).toBe(1);
  });
});

describe("removeKey", () => {
  it("removes a root key", () => {
    const withRemove = removeKey(person, "firstName");
    expect(withRemove.firstName).toBe(undefined);
    expect(withRemove.lastName).toBe("Scott");
  });

  it("removes a nested key", () => {
    const withRemove = removeKey(person, "address.city");
    expect(withRemove.address.city).toBe(undefined);
    expect(withRemove.address.state).toBe("PA");
  });

  it("removes key nested in an array", () => {
    const withRemove = removeKey(person, "vehicles.0.model");
    expect(withRemove.vehicles[0].model).toBe(undefined);
    expect(withRemove.vehicles[0].make).toBe("Chrysler");
  });
});

describe("removeIndex", () => {
  const ticket = {
    requester: "dschrute@dundermifflin.com",
    subject: "Corporate espionage?",
    body:
      "I found a strange cable connected to my computer. Can you take a look?",
    reply: {
      to: ["dschrute@dundermifflin.com"],
      cc: ["mscott@dundermifflin.com", "jhalpert@dundermifflin.com"]
    },
    related: ["128219", "192818", "574822"]
  };

  it("should not mutate the original object", () => {
    const withRemove = removeIndex(ticket, "reply.to", 0);
    expect(withRemove.reply.to.length).toBe(0);
    expect(ticket.reply.to.length).toBe(1);
  });

  it("removes an item from an array", () => {
    const withRemove = removeIndex(ticket, "reply.cc", 1);
    expect(withRemove.reply.cc.length).toBe(1);
  });

  it("throws TypeError if path is not an array", () => {
    function throwTypeError() {
      removeIndex(ticket, "body", 0);
    }

    expect(throwTypeError).toThrow();
  });
});
