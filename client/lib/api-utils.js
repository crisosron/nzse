export const hasRequiredProperties = (requiredProperties, object) => {
  const actualProperties = Object.keys(object);
  return requiredProperties.every((requiredProperty) => actualProperties.includes(requiredProperty));
};
