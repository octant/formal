import React from "react";

function SubFormTitle(props) {
  const { label } = props.definition;

  return <h3>{label}</h3>;
}

function SubformList(props) {
  const { name, value: items } = props;
  const { handleInsert, getForm } = props.methods;
  const { definition } = props.definition;

  return (
    <div>
      {items.map(item => item)}
      <button
        key={`add-${name}`}
        onClick={() => handleInsert(name, getForm(definition))}
      >
        +
      </button>
    </div>
  );
}

function SubformListItem(props) {
  const { name, children: form } = props;
  const { itemLabel: label } = props.definition;
  const { handleRemoveIndex } = props.methods;

  return (
    <div>
      <h3>{label}</h3>
      {form}
      <button onClick={() => handleRemoveIndex(name)}>-</button>
    </div>
  );
}

function SubForm(props) {
  const { value: items } = props;

  return <div>{items.map(item => item)}</div>;
}

function Input(props) {
  const { name, value } = props;
  const { label, type } = props.definition;
  const { handleChange } = props.methods;

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input name={name} type={type} value={value} onChange={handleChange} />
    </div>
  );
}

export default {
  input: Input,
  title: SubFormTitle,
  subformList: SubformList,
  subformListItem: SubformListItem,
  subform: SubForm
};
