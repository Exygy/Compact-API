/**
 *
 * @param obj the object to search through
 * @param path a . seperated string denoting the path to traverse
 * @description allows us to traverse a complex object along a path S
 * @returns the value at the end of <path> in <obj>
 */
export function deepFind(obj: Record<string, any>, path: string) {
  const paths = path.split('.');
  let current = obj;
  for (const currPath of paths) {
    if (current[currPath] === undefined) {
      return undefined;
    }
    current = current[currPath];
  }
  return current;
}
