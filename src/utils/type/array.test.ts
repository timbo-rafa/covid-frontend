import { groupBy } from './array';

const sampleData = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
  { name: 'Eve', age: 35 }
];

describe('groupBy', () => {
  test('should handle empty data', () => {
    const result = groupBy([], 'age');

    expect(result).toEqual({});
  });

  test('should group data by age', () => {
    const result = groupBy(sampleData, 'age');

    expect(result).toEqual({
      25: [
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 25 }
      ],
      30: [
        { name: 'Bob', age: 30 },
        { name: 'David', age: 30 }
      ],
      35: [
        { name: 'Eve', age: 35 }
      ]
    });
  });

  test('should group data by name', () => {
    const result = groupBy(sampleData, 'name');

    expect(result).toEqual({
      'Alice': [{ name: 'Alice', age: 25 }],
      'Bob': [{ name: 'Bob', age: 30 }],
      'Charlie': [{ name: 'Charlie', age: 25 }],
      'David': [{ name: 'David', age: 30 }],
      'Eve': [{ name: 'Eve', age: 35 }]
    });
  });

  test('should handle data with undefined column values', () => {
    const incompleteData = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: undefined },
      { name: 'Charlie', age: 25 },
      { name: 'David', age: undefined },
      { name: 'Eve', age: 35 }
    ];
    const result = groupBy(incompleteData, 'age');

    expect(result).toEqual({
      25: [
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 25 }
      ],
      35: [
        { name: 'Eve', age: 35 }
      ]
    });
  });
});
