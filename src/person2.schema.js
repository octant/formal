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

export const person = {
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
    label: "vehicles",
    min: 0,
    max: 3,
    definition: vehicle
  }
};

export default {
  ...person,
  spouse: { type: "subform", definition: person }
};
