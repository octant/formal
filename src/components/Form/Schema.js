export default class {
  constructor(schema) {
    this._schema = schema;
    this._definitions = {};

    this._traverseSchema();
  }

  _traverseSchema(schema = this._schema, path = []) {
    Object.entries(schema).forEach(([key, value]) => {
      switch (value.type) {
        case "object":
          this._definitions[[...path, key].join(".")] = value;
          this._traverseSchema(value.definition, [...path, key]);
          break;
        case "array":
          this._definitions[[...path, key].join(".")] = value;
          this._definitions[[...path, key, "$"].join(".")] = value;
          this._traverseSchema(value.definition, [...path, key, "$"]);
          break;
        default:
          this._definitions[[...path, key].join(".")] = value;
          break;
      }
    });
  }

  getForm(schema = this._schema) {
    const form = {};
    Object.entries(schema).forEach(([key, value]) => {
      switch (value.type) {
        case "object":
          form[key] = this.getForm(value.definition);
          break;
        case "array":
          form[key] = [];
          if (value.defaultValue) {
            for (let index = 0; index < value.defaultValue; index++) {
              form[key].push(this.getForm(value.definition));
            }
          }
          break;
        default:
          form[key] = value.defaultValue || "";
          break;
      }
    });
    return form;
  }

  getDefinition(definition) {
    const def = definition.replace(
      /(\.)[0-9]{1,}(\.?)/g,
      (a, b, c) => `${b}$${c}`
    );

    return this._definitions[def];
  }
}
