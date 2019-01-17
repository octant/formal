import React, { useEffect, useState } from "react";

const Input = props => {
  const { type, name, value, onChange } = props;
  const [initialValue] = useState(value);
  const [dirty, setDirty] = useState(false);

  useEffect(
    () => {
      if (initialValue !== value) setDirty(true);

      // console.log(`${name} rendering`);
    },
    [value]
  );

  return (
    <input
      style={{ border: dirty ? "1px solid red" : "" }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
