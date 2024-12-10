export function formatToDate(date: Date) {
  return Intl.DateTimeFormat().format(date);
}
