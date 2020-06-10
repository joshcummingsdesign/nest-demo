/**
 * Get all the keys that are of type string from an enum.
 */
export const getEnumKeys = <E extends object>(e: E) =>
  Object.keys(e).filter((k: any) => isNaN(k)) as (keyof E)[];
