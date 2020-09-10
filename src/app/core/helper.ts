export function isGuid(value): boolean {
  if (value[0] === '{') {
    value = value.substring(1, value.length - 1);
  }
  if (value === '00000000-0000-0000-0000-000000000000') {
    return false;
  }
  const regex = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
  return regex.test(value);
}


