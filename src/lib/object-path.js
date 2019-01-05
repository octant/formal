export function get(object, path) {
  const obj = { ...object };
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    return accumulator[currentValue];
  }, obj);

  return pointer[key];
}

export function set(object, path, value) {
  const obj = { ...object };
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);

  pointer[key] = value;

  return obj;
}
