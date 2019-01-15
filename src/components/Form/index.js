import React, { useState } from "react";

import Schema from "./lib/schema";
import { push, removeIndex, set } from "./lib/object/object-path";

export default function Formula(props) {
  const { schema: definition, values, layout, onSubmit, children } = props;
  const schema = new Schema(definition);
  const [form, updateForm] = useState({ ...schema.getForm(), ...values });

  function handleChange(e) {
    updateForm(set(form, e.target.name, e.target.value));
  }

  function handleClear(key) {
    updateForm(schema.getForm());
  }

  function handleInsert(key, definition) {
    updateForm(push(form, key, definition));
  }

  function handleRemoveIndex(key) {
    updateForm(removeIndex(form, key));
  }

  function handleReset(key) {
    updateForm({ ...schema.getForm(), ...values });
  }

  function createElement(key, value, layout, children) {
    return React.createElement(
      layout,
      {
        key,
        name: key,
        value,
        definition: schema.getDefinition(key),
        methods: {
          handleChange,
          handleInsert,
          handleRemoveIndex,
          getForm: schema.getForm
        }
      },
      children
    );
  }

  function handleSubmit() {
    onSubmit(form);
  }

  function applyLayout(object = form, d = 0, paths = []) {
    const entries = [];

    Object.entries(object).forEach(([key, value], i) => {
      const name = [...paths, key].join(".");

      if (Object.prototype.toString.call(value) === "[object Object]") {
        entries[i] = [
          createElement(key, value, layout.title),
          ...applyLayout(value, d + 1, [...paths, key])
        ];
        entries.push(createElement(name, entries.pop(), layout.subform));
      } else if (Object.prototype.toString.call(value) === "[object Array]") {
        entries.push([
          createElement(name, value, layout.title),
          ...value.map((x, j) => {
            return createElement(
              [name, j].join("."),
              value,
              layout.subformListItem,
              applyLayout(x, d + 1, [...paths, key, j])
            );
          })
        ]);

        entries.push(createElement(name, entries.pop(), layout.subformList));
      } else {
        entries.push(createElement(name, value, layout.input));
      }
    });

    return entries;
  }

  return children({
    layout: applyLayout(),
    methods: {
      clear: handleClear,
      reset: handleReset,
      submit: handleSubmit
    },
    state: { form }
  });
}
