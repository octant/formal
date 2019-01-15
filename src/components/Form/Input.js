import React from "react";
// import { Machine } from "xstate";

// const inputMachine = Machine({
//   id: "input",
//   initial: "clean",
//   states: {
//     clean: {
//       on: {
//         TYPE: "dirty"
//       }
//     },
//     dirty: {
//       on: {
//         TYPE: "dirty",
//         RESET: "clean"
//       }
//     }
//   }
// });

export default function Input({ name, value, onChange, state }) {
  // const [dirty, setDirty] = useState(false);

  // function handleChange(e) {
  //   setDirty(true);
  //   if (onChange) onChange(e);
  // }

  return <input name={name} value={value} onChange={onChange} />;
}
