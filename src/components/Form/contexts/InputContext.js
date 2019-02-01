import React, { createContext, useReducer } from "react";

let InputContext = createContext();

let initialState = {};

let reducer = (inputs, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "set":
      return { ...inputs, [action.name]: action.value };
    default:
      return { ...inputs };
  }
};

function InputContextProvider(props) {
  let [inputs, inputDispatcher] = useReducer(reducer, initialState);
  let value = { inputs, inputDispatcher };

  return (
    <InputContext.Provider value={value}>
      {props.children}
    </InputContext.Provider>
  );
}

let InputContextConsumer = InputContext.Consumer;

export { InputContext, InputContextProvider, InputContextConsumer };
