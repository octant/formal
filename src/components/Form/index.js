import React, { useState } from "react";

import Schema from "./lib/schema2";
import Form from "./Form";

export default function Formula(props) {
  const [schema] = useState(new Schema(props.form));

  return <Form {...props} schema={schema} />;
}
