import React, { useContext, useEffect, useState } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import validate from "./lib/validator";

const FormalInput = props => WrappedComponent => {
  const { name, value, validations } = props;
  const { errors, dispatch } = useContext(ErrorContext);

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

  return <WrappedComponent {...{ ...props, ...errors }} />;
};

export default FormalInput;
