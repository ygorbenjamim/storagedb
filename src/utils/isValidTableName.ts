export function isValidTableName(name: string) {
  var regex = /[\W\s]/;
  return !regex.test(name);
}
