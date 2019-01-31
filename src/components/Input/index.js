import React, { useEffect, useState } from "react";

const Input = props => {
  const { type, name, value, onChange, validate, errors } = props;
  const [initialValue] = useState(value);
  const [dirty, setDirty] = useState(false);

  useEffect(
    () => {
      validate(name, value);
      if (initialValue !== value) setDirty(true);
    },
    [value]
  );

  return (
    <>
      <input
        style={{ border: dirty ? "1px solid red" : "" }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div>
        <span>{errors ? errors[0] : ""}</span>
      </div>
    </>
  );
};

export default Input;
