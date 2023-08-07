import moment from "moment";

export function formatToDate(date: Date) {
  return moment(date).format("YYYY-MM-DD")
}