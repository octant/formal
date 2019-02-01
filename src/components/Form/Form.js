import React, { useState } from "react";

import { push, removeIndex, set } from "./lib/object/object-path";

export default function Formula(props) {
  const { schema, values, layout, onSubmit, children } = props;

  const [form, updateForm] = useState({ ...schema.getForm(), ...values });

  function handleChange(e) {
    updateForm(set(form, e.target.name, e.target.value));
  }

  function handleClear() {
    updateForm(schema.getForm());
  }

  function handleInsert(key, definition) {
    updateForm(push(form, key, definition));
  }

  function handleInsert2(key, definition) {
    updateForm(push(form, key, definition));
  }

  function handleRemoveIndex(key) {
    updateForm(removeIndex(form, key));
  }

  function handleReset() {
    updateForm({ ...schema.getForm(), ...values });
  }

  function createElement(key, value, layout, depth, children) {
    return React.createElement(
      layout,
      {
        key: `${key}`,
        name: key,
        value,
        definition: schema.getSubForm(key).definition(),
        form: schema.getSubForm(key).getForm(),
        methods: {
          handleChange,
          handleInsert,
          handleInsert2,
          handleRemoveIndex,
          getForm: schema.getSubForm
        },
        depth
      },
      children
    );
  }

  function createInput(key, value, layout, depth, children) {
    return React.createElement(
      layout,
      {
        key,
        name: key,
        value,
        definition: schema.getDefinition(key),
        definitions: schema.definitions(),
        methods: {
          handleChange,
          handleInsert,
          handleRemoveIndex,
          getForm: schema.getForm
        },
        depth
      },
      children
    );
  }

  function handleSubmit() {
    onSubmit(form);
  }

  function applyLayout(object = form, d = 1, paths = []) {
    const entries = [];

    Object.entries(object).forEach(([key, value], i) => {
      const name = [...paths, key].join(".");

      if (Object.prototype.toString.call(value) === "[object Object]") {
        entries[i] = [
          createElement(key, value, layout.title, d),
          ...applyLayout(value, d + 1, [...paths, key])
        ];
        entries.push(createElement(name, entries.pop(), layout.subform, d));
      } else if (Object.prototype.toString.call(value) === "[object Array]") {
        entries.push([
          createElement(name, value, layout.listTitle, d),
          ...value.map((x, j) => {
            return createElement(
              [name, j].join("."),
              value,
              layout.subformListItem,
              d,
              applyLayout(x, d + 1, [...paths, key, j])
            );
          })
        ]);
        entries.push(createElement(name, entries.pop(), layout.subformList), d);
      } else {
        entries.push(createInput(name, value, layout.input, d));
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
