import React, { useState } from "react";

import Schema from "./lib/schema";
import Form from "./Form";

export default function Formula(props) {
  const [schema] = useState(new Schema(props.form));

  return <Form {...props} schema={schema} />;
}
