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
  const obj = JSON.parse(JSON.stringify(object));
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);

  pointer[key] = value;

  return obj;
}

export function removeKey(object, path) {
  const obj = JSON.parse(JSON.stringify(object));
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    return accumulator[currentValue];
  }, obj);

  delete pointer[key];

  return obj;
}

export function push(object, path, value) {
  const obj = JSON.parse(JSON.stringify(object));
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    return accumulator[currentValue];
  }, obj);

  if (!Array.isArray(pointer[key]))
    throw new TypeError("path must be an Array");

  pointer[key] = [...pointer[key], value];

  return obj;
}

export function removeIndex(object, path) {
  const obj = JSON.parse(JSON.stringify(object));
  const pList = path.split(".");
  const index = parseInt(pList.pop());
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    return accumulator[currentValue];
  }, obj);

  if (!Array.isArray(pointer[key]))
    throw new TypeError("path must be an Array");

  pointer[key] = [
    ...pointer[key].slice(0, index),
    ...pointer[key].slice(index + 1)
  ];

  return obj;
}
