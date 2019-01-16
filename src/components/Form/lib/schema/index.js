export default class {
  constructor(schema) {
    this._schema = schema;
    this._definitions = {};

    this._traverseSchema();
  }

  _ensurePresent(object, values = {}) {
    let missing = {};

    Object.entries(values).forEach(([key, value]) => {
      missing = object[key] ? missing : { ...missing, [key]: value };
    });

    return { ...object, ...missing };
  }

  _normalizeDefinition(key, definition) {
    // ensure optional schema options have a default value

    this._definitions[key] = this._ensurePresent(definition, {
      display: true,
      required: false,
      validations: []
    });
  }

  _traverseSchema(schema = this._schema, path = []) {
    Object.entries(schema).forEach(([key, value]) => {
      switch (value.type) {
        case "object":
          this._normalizeDefinition([...path, key].join("."), value);
          this._traverseSchema(value.definition, [...path, key]);
          break;
        case "array":
          this._normalizeDefinition([...path, key].join("."), value);
          this._normalizeDefinition([...path, key, "$"].join("."), value);
          this._traverseSchema(value.definition, [...path, key, "$"]);
          break;
        default:
          this._normalizeDefinition([...path, key].join("."), value);
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
