import React, { useState } from "react";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { InputContextProvider } from "./contexts/InputContext";

import Schema from "./lib/schema";
import Form from "./Form";

export default function Formula(props) {
  const [schema] = useState(new Schema(props.form));

  return (
    <InputContextProvider>
      <ErrorContextProvider>
        <Form {...props} schema={schema} />
      </ErrorContextProvider>
    </InputContextProvider>
  );
}
