import React from "react";
import "./App.css";

import form from "./person.schema";
import Layout from "./Layout";
import FormWrapper from "./components/Form";

export default function App() {
  return (
    <div className="App">
      <FormWrapper
        form={form}
        layout={Layout}
        values={{
          firstName: "Michael",
          vehicles: [{ make: "Ford", model: "", year: "", color: "" }]
        }}
        onSubmit={form => console.log(form)}
      >
        {({ layout, methods }) => (
          <>
            <h1>Personal Information</h1>
            {layout}
            <button onClick={methods.submit}>submit</button>
            <button onClick={methods.reset}>reset</button>
            <button onClick={methods.clear}>clear</button>
          </>
        )}
      </FormWrapper>
    </div>
  );
}
