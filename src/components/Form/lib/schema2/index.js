export default class {
  constructor(schema, parent = "", meth) {
    const { _name, _label, ..._schema } = schema;

    this._name = _name;
    this._label = _label;
    this._schema = _schema;
    this._definitions = {};

    this.traverser = meth ? meth : this._traverseSchema;
    this.traverser();
    console.log(this._definitions);
  }

  _ensurePresent(object, values = {}) {
    return Object.entries(values).reduce((prev, [key, value]) => {
      return object[key] !== undefined
        ? { ...prev, [key]: object[key] }
        : { ...prev, [key]: value };
    }, object);
  }

  _normalize({ definition, ...rest }) {
    return this._ensurePresent(rest, {
      defaultValue: "",
      display: true,
      required: false,
      validations: []
    });
  }

  _traverseSchema() {
    Object.entries(this._schema).forEach(([k, v]) => {
      this._definitions[k] = this._normalize(v);
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
      return { ...prev, [key]: value.defaultValue };
    }, {});
  }
}
