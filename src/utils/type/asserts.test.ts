import { isDefined, isDictionaryOfNumbers, isEmptyObject } from './asserts';

describe('isDefined', () => {
  test('should return true for defined values', () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined('test')).toBe(true);
    expect(isDefined(true)).toBe(true);
    expect(isDefined({})).toBe(true);
  });

  test('should return false for null or undefined values', () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});

describe('isDictionaryOfNumbers', () => {
  test('should return true for a dictionary of only numbers', () => {
    const dictionary = {
      a: 1,
      b: 2,
      c: 3,
    };
    expect(isDictionaryOfNumbers(dictionary)).toBe(true);
  });

  test('should return false for a dictionary with non-number values', () => {
    const dictionary = {
      a: 1,
      b: 'two',
      c: 3,
    };
    expect(isDictionaryOfNumbers(dictionary)).toBe(false);
  });

  test('should return true for a dictionary with null values', () => {
    const dictionary = {
      a: 1,
      b: null,
      c: 3,
    };
    expect(isDictionaryOfNumbers(dictionary)).toBe(true);
  });

  test('should return true for a dictionary with undefined values', () => {
    const dictionary = {
      a: 1,
      b: undefined,
      c: 3,
    };
    expect(isDictionaryOfNumbers(dictionary)).toBe(true);
  });
});

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    expect(isEmptyObject({})).toBe(true);
  });
  it('should return false for an object with properties', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });
});
