import React, { useContext } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import validate from "./lib/validator";

const FormalInput = props => WrappedComponent => {
  const { errors, dispatch } = useContext(ErrorContext);
  return <div />;
};

export default FormalInput;
