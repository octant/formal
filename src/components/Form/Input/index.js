import React, { useEffect, useState, useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import validate from "../lib/validator";

const Input = props => {
  const { type, name, value, onChange, validations } = props;
  const { state, dispatch } = useContext(ErrorContext);
  const [initialValue] = useState(value);
  const [dirty, setDirty] = useState(false);

  const add = messages => dispatch({ type: "add", name, messages });
  const remove = () => dispatch({ type: "remove", name });

  useEffect(
    () => {
      if (initialValue !== value) setDirty(true);

      if (value !== "" || dirty) {
        const messages = validate(value, validations);
        if (messages.length > 0) {
          add(messages);
        } else {
          remove(name);
        }
      }
    },
    [value]
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
        <span>{state[name] ? state[name][0] : ""}</span>
      </div>
    </>
  );
};

export default Input;
