import React, { createContext, useReducer } from "react";

let ErrorContext = createContext();

let initialState = {};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "add":
      return { ...state, [action.name]: action.messages };
    case "remove":
      let { [action.name]: self, ...rest } = state;
      return { ...rest };
    default:
      return { ...state };
  }
};

function ErrorContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <ErrorContext.Provider value={value}>
      {props.children}
    </ErrorContext.Provider>
  );
}

let ErrorContextConsumer = ErrorContext.Consumer;

export { ErrorContext, ErrorContextProvider, ErrorContextConsumer };
