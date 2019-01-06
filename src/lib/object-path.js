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

export function remove(object, path) {
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

export function traverse(object, hooks, paths = []) {
  Object.entries(object).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      if (hooks.beforeObject)
        hooks.beforeObject([...paths, key].join("."), value);

      traverse(object[key], hooks, [...paths, key]);

      if (hooks.afterObject)
        hooks.afterObject([...paths, key].join("."), value);
    } else if (Object.prototype.toString.call(value) === "[object Array]") {
      if (hooks.beforeArray)
        hooks.beforeArray([...paths, key].join("."), value);

      value.forEach((item, i) => {
        if (hooks.beforeArrayItem)
          hooks.beforeArrayItem([...paths, key, i].join("."), item);

        traverse(item, hooks, [...paths, key, i]);

        if (hooks.afterArrayItem)
          hooks.afterArrayItem([...paths, key, i].join("."), item);
      });

      if (hooks.afterArray) hooks.afterArray([...paths, key].join("."), value);
    } else {
      hooks.keyValue([...paths, key].join("."), object[key]);
    }
  });
}
