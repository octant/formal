import Schema from "./";

export const vehicle = {
  _name: "vehicle",
  _label: "Vehicle",
  make: {
    type: "text",
    label: "Make",
    defaultValue: "Honda"
  },
  model: {
    type: "text",
    label: "Model"
  },
  year: {
    type: "text",
    label: "Year"
  },
  color: {
    type: "text",
    label: "Color"
  }
};

export const phone = {
  _name: "phone",
  _label: "Phone",
  number: {
    type: "text",
    label: "Phone #"
  },
  type: {
    type: "text",
    label: "Type"
  }
};

const person = {
  _name: "person",
  _label: "Person",
  firstName: {
    type: "text",
    label: "First Name"
  },
  lastName: {
    type: "text",
    label: "Last Name"
  },
  age: {
    type: "number",
    label: "Age"
  },
  phone: {
    type: "subform",
    definition: phone
  },
  vehicles: {
    type: "list",
    min: 0,
    max: 3,
    definition: vehicle
  }
};

/**
 * {
 *  firstName: "",
 *  lastName: "",
 *  age: "",
 *  phone: {
 *    number: "",
 *    type: ""
 *  },
 *  vehicles: [{
 *    make: "",
 *    model: ""
 *    year: "",
 *    color: ""
 *  }]
 * }
 */

const vehicleSchema = new Schema(vehicle);
const personSchema = new Schema(person);
describe("Schema", () => {
  it("should be an object", () => {
    expect(typeof vehicleSchema).toBe("object");
  });
  it("should have a name", () => {
    expect(vehicleSchema.name()).toBe("vehicle");
  });
  it("should have a label", () => {
    expect(vehicleSchema.label()).toBe("Vehicle");
  });
  it("should produce an object with keys and default values", () => {
    const vehicleForm = vehicleSchema.form();
    expect(Object.keys(vehicleForm).length).toBe(4);
    expect(vehicleForm.make).toBe("Honda");
  });

  it("should allow subschemas", () => {
    const personForm = personSchema.form();

    expect(Object.keys(personForm).length).toBe(5);
    expect(personForm.vehicles).toEqual([]);
    expect(Object.keys(personSchema._subForms).length).toBe(1);
    expect(Object.keys(personSchema._lists).length).toBe(1);
  });
});
