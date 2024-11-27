export function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== 'number') {
    throw Error(`${value} is not a number`);
  }
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isEmptyObject(obj: object) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true
}

export function isDictionaryOfNumbers<K extends string | number | symbol>(
  dictionary: Record<K, string | number | null | undefined>,
): dictionary is Record<K, number | null | undefined> {
  for (const k in dictionary) {
    if (dictionary[k] === null || dictionary[k] === undefined) {
      continue;
    }

    if (typeof dictionary[k] !== 'number') {
      return false;
    }
  }
  return true;
}
