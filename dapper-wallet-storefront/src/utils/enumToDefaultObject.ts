
export function enumToDefaultObject<T = {}>(obj: {[key: string]: string}, defaultValue: any = []) {
  return Object.values(obj).reduce<T>((accum, item: string) => ({ ...accum, [item]: defaultValue }), {} as T)
}
