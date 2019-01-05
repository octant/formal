export function get(object, path) {
  const obj = { ...object };
  const pList = path.split(".");
  const key = pList.pop();

  const pointer = pList.reduce((accumulator, currentValue) => {
    return accumulator[currentValue];
  }, obj);

  return pointer[key];
}
