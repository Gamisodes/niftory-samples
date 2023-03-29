/**
Converts any value to a boolean.
@param anyValue The value to convert.
@returns true if the value is truthy and not equal to false, no, 0, null, or undefined. Otherwise, returns false.
*/
export const anyToBoolean = (anyValue: unknown): anyValue is boolean => {
  switch (String(anyValue)?.toLowerCase()?.trim()) {
    case "true":
    case "yes":
    case "1":
      return true

    case "false":
    case "no":
    case "0":
    case "null":
    case "undefined":
      return false

    default:
      return !!JSON.parse(anyValue as string)
  }
}
