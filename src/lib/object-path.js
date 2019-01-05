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

export function push(object, path, value) {
  const obj = { ...object };
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

export function traverse(object, callback, paths = []) {
  Object.entries(object).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      return traverse(object[key], callback, [...paths, key]);
    } else if (Object.prototype.toString.call(value) === "[object Array]") {
      value.map((item, i) => traverse(item, callback, [...paths, key, i]));
    } else {
      callback([...paths, key].join("."), object[key]);
    }
  });
}
