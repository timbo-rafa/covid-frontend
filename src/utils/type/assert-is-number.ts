export function assertIsNumber(value : any) : asserts value is number {
  if (typeof value !== 'number') {
    throw Error(`${value} is not a number`)
  }
}