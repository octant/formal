import React, { createContext, useReducer } from "react";

let ErrorContext = createContext();

let initialState = {};

let reducer = (errors, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "add":
      return { ...errors, [action.name]: action.messages };
    case "remove":
      let { [action.name]: self, ...rest } = errors;
      return { ...rest };
    default:
      return { ...errors };
  }
};

function ErrorContextProvider(props) {
  let [errors, dispatch] = useReducer(reducer, initialState);
  let value = { errors, dispatch };

  return (
    <ErrorContext.Provider value={value}>
      {props.children}
    </ErrorContext.Provider>
  );
}

let ErrorContextConsumer = ErrorContext.Consumer;

export { ErrorContext, ErrorContextProvider, ErrorContextConsumer };
