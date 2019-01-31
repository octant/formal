import React from "react";
import FormalInput from "./components/Input";

function SubFormTitle(props) {
  const { depth } = props;
  const { label } = props.definition;

  return React.createElement(`h${depth + 1}`, {}, label);
}

function SubFormListTitle(props) {
  const { depth } = props;
  // const { label } = props.definition || "????";
  // console.log(props);
  const label = "????";

  return React.createElement(`h${depth + 1}`, {}, label);
}

function SubformList(props) {
  const { name, value: items } = props;
  const { handleInsert, getForm } = props.methods;
  // const { definition } = props.definition;

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
  // const { itemLabel: label } = props.definition;
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
  const { name, value, errors } = props;
  const { label, type } = props.definition;
  const { handleChange, handleValidation } = props.methods;

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <FormalInput
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        errors={errors}
        validate={handleValidation}
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
