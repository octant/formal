export const vehicle = {
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

export const address = {
  street: {
    type: "text",
    label: "Street",
    defaultValue: ""
  },
  city: {
    type: "text",
    label: "City",
    defaultValue: ""
  },
  state: {
    type: "text",
    label: "State",
    defaultValue: ""
  },
  country: {
    type: "text",
    label: "Country",
    defaultValue: ""
  }
};

export const person = {
  firstName: {
    type: "text",
    label: "First Name",
    validations: [{ test: value => value === "M", message: "Must be an 'M'" }]
  },
  lastName: { type: "text", label: "Last Name" },
  age: { type: "number", label: "Age" },
  vehicles: {
    type: "array",
    label: "Vehicles",
    itemLabel: "Vehicle",
    defaultValue: 1,
    definition: vehicle
  },
  address: {
    type: "object",
    label: "Address",
    definition: address
  }
};

export default {
  ...person,
  spouse: { type: "object", label: "Spouse", definition: person }
};
