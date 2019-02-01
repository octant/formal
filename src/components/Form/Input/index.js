import React, { useEffect, useState, useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import { InputContext } from "../contexts/InputContext";
import validate from "../lib/validator";

const Input = props => {
  const { type, name, observe, value, onChange, validations } = props;
  const { errors, dispatch } = useContext(ErrorContext);
  const { inputs, inputDispatcher } = useContext(InputContext);
  const [initialValue] = useState(value);
  const [observedValue] = useState(inputs[observe]);
  const [dirty, setDirty] = useState(false);

  const add = messages => dispatch({ type: "add", name, messages });
  const remove = () => dispatch({ type: "remove", name });
  const set = () => inputDispatcher({ type: "set", name, value });

  useEffect(
    () => {
      set();
      if (initialValue !== value) setDirty(true);

      if (value !== "" || dirty || inputs[observe] !== observedValue) {
        const messages = validate([value, inputs[observe]], validations);
        if (messages.length > 0) {
          add(messages);
        } else {
          remove(name);
        }
      }
    },
    [value, inputs[observe]]
  );

  return (
    <>
      <input
        style={{ border: dirty ? "1px solid red" : "" }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div>
        <span>{errors[name] ? errors[name][0] : ""}</span>
      </div>
    </>
  );
};

export default Input;
