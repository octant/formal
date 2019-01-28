export default class Schema {
  constructor(schema, parent, defs) {
    const { _name, _label, ..._schema } = schema;

    this._parent = parent;
    this._name = _name;
    this._label = _label;
    this._schema = _schema;
    this._subForms = {};
    this._lists = {};
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
    this._subForms[name] = new Schema(
      definition.definition,
      name,
      this._definitions
    );
  }

  _normalizeList(name, definition) {
    this._lists[name] = new Schema(
      definition.definition,
      `${name}.$`,
      this._definitions
    );
  }

  _normalizeDefinition(definition) {
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
        this._normalizeList(k, v);
      } else {
        this._definitions[
          `${this._parent ? this._parent + "." : ""}${k}`
        ] = this._normalizeDefinition(v);
      }
    });
  }

  name() {
    return this._name;
  }

  label() {
    return this._label;
  }

  form() {
    return Object.entries(this._schema).reduce((prev, [key, value]) => {
      if (value.type === "subform") {
        return { ...prev, [key]: this._subForms[key].form() };
      } else if (value.type === "list") {
        return { ...prev, [key]: [] };
      } else {
        return { ...prev, [key]: value.defaultValue };
      }
    }, {});
  }
}
