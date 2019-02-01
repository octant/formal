import React, { useState } from "react";
import { ErrorContextProvider } from "./contexts/ErrorContext";

import Schema from "./lib/schema";
import Form from "./Form";

export default function Formula(props) {
  const [schema] = useState(new Schema(props.form));

  return (
    <ErrorContextProvider>
      <Form {...props} schema={schema} />
    </ErrorContextProvider>
  );
}
