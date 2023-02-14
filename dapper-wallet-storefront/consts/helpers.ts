import isNaN from "lodash/isNaN"

export function convertNumber(data: string | number, defaultValue = 0): number {
  if (typeof data === "number") {
    return isNaN(data) ? defaultValue : data
  } else if (typeof +data === "number") {
    return isNaN(+data) ? defaultValue : +data
  } else {
    return defaultValue
  }
}
