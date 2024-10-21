export function isEmpty(value: any[] | Record<string, any>): boolean {
  if (Array.isArray(value)) return value.length === 0;

  return Object.keys(value).length === 0;
}

export function isNotEmpty(value: any[] | Record<string, any>): boolean {
  return !isEmpty(value);
}
