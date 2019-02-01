export default class Schema {
  constructor(schema, parent, subs, defs) {
    const { _name, _label, ..._schema } = schema;

    this._parent = parent;
    this._name = _name;
    this._label = _label;
    this._schema = _schema;
    this._subForms = subs ? subs : {};
    this._definitions = defs ? defs : {};

    this._traverseSchema();
  }

  _ensurePresent(object, values = {}) {
    return Object.entries(values).reduce((prev, [key, value]) => {
      return object[key] !== undefined
        ? { ...prev, [key]: object[key] }
        : { ...prev, [key]: value };
    }, object);
  }

  _normalizeSubForm(name, definition) {
    const n = `${this._parent ? this._parent + "." : ""}${name}`;

    this._subForms[n] = new Schema(
      definition.definition,
      `${this._parent ? this._parent + "." : ""}${name}`,
      this._subForms,
      this._definitions
    );
  }

  _normalizeSubFormList(name, definition) {
    const n = `${this._parent ? this._parent + "." : ""}${name}`;

    this._subForms[n] = new Schema(
      {
        ...definition.definition,
        _label: definition.label
      },
      `${this._parent ? this._parent + "." : ""}${name}`, // I think I can fix these parents
      this._subForms,
      this._definitions
    );

    this._subForms[`${n}.$`] = new Schema(
      definition.definition,
      `${this._parent ? this._parent + "." : ""}${name}.$`,
      this._subForms,
      this._definitions
    );
  }

  _normalizeDefinition(definition, k) {
    return this._ensurePresent(definition, {
      defaultValue: "",
      display: true,
      required: false,
      validations: []
    });
  }

  _traverseSchema() {
    Object.entries(this._schema).forEach(([k, v]) => {
      if (v.type === "subform") {
        this._normalizeSubForm(k, v);
      } else if (v.type === "list") {
        this._normalizeSubFormList(k, v);
      } else {
        this._definitions[
          `${this._parent ? this._parent + "." : ""}${k}`
        ] = this._normalizeDefinition(v, k);
      }
    });
  }

  definition() {
    return {
      type: "schema",
      name: this.name(),
      label: this.label()
    };
  }

  definitions() {
    return this._definitions;
  }
  name() {
    return this._name;
  }

  label() {
    return this._label;
  }

  getForm() {
    return Object.entries(this._schema).reduce((prev, [key, value]) => {
      if (value.type === "subform") {
        return {
          ...prev,
          [key]: this._subForms[
            `${this._parent ? this._parent + "." : ""}${key}`
          ].getForm()
        };
      } else if (value.type === "list") {
        return {
          ...prev,
          [key]: [
            this._subForms[
              `${this._parent ? this._parent + "." : ""}${key}.$`
            ].getForm()
          ]
        };
      } else {
        return {
          ...prev,
          [key]: this._definitions[
            `${this._parent ? this._parent + "." : ""}${key}`
          ].defaultValue
        };
      }
    }, {});
  }

  getDefinition(name) {
    const def = name.replace(/(\.)[0-9]{1,}(\.?)/g, (a, b, c) => `${b}$${c}`);

    return this._definitions[def];
  }

  getSubForm(name) {
    const def = name.replace(/(\.)[0-9]{1,}(\.?)/g, (a, b, c) => `${b}$${c}`);

    return this._subForms[def];
  }
}
