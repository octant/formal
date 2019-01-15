export default value => validations => {
  const errors = validations.filter(({ test }) => !test(value));

  return errors.map(({ message }) => message);
};
