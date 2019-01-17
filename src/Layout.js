import React from "react";
import FormalInput from "./components/Input";

function SubFormTitle(props) {
  const { depth } = props;
  const { label } = props.definition;

  return React.createElement(`h${depth + 1}`, {}, label);
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
  const { name, children: form, depth } = props;
  const { itemLabel: label } = props.definition;
  const { handleRemoveIndex } = props.methods;

  return (
    <div>
      {React.createElement(`h${depth + 2}`, {}, label)}
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
      <FormalInput
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
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
