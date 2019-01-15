import React from "react";
import "./App.css";

import schema from "./person.schema";
import Layout from "./components/Form/Layout";
import FormWrapper from "./components/Form";

export default function App() {
  return (
    <div className="App">
      <FormWrapper
        schema={schema}
        layout={Layout}
        values={{
          firstName: "Michael",
          vehicles: [{ make: "Ford", model: "", year: "", color: "" }]
        }}
        onSubmit={form => console.log(form)}
      >
        {(inputs, methods) => (
          <>
            <h2>Personal Information</h2>
            {inputs}
            <button onClick={methods.submit}>submit</button>
            <button onClick={methods.reset}>reset</button>
          </>
        )}
      </FormWrapper>
    </div>
  );
}
