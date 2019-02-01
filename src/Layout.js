import React from "react";
import FormalInput from "./components/Form/Input";

function SubFormTitle(props) {
  const { depth } = props;
  const { label } = props.definition;

  return React.createElement(`h${depth + 1}`, {}, label);
}

function SubFormListTitle(props) {
  const { depth } = props;
  const { label } = props.definition;

  return React.createElement(`h${depth + 1}`, {}, label);
}

function SubformList(props) {
  const { name, value: items } = props;
  const { handleInsert } = props.methods;

  return (
    <div>
      {items.map(item => item)}
      <button
        key={`add-${name}`}
        onClick={() => handleInsert(name, props.form)}
      >
        +
      </button>
    </div>
  );
}

function SubformListItem(props) {
  const { name, children: form, depth } = props;
  const label = props.definition.label;
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
  const { label, observe, type, validations } = props.definition;
  const { handleChange } = props.methods;

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <FormalInput
        name={name}
        type={type}
        value={value}
        observe={observe}
        validations={validations}
        onChange={handleChange}
      />
    </div>
  );
}

export default {
  input: Input,
  title: SubFormTitle,
  listTitle: SubFormListTitle,
  subformList: SubformList,
  subformListItem: SubformListItem,
  subform: SubForm
};
