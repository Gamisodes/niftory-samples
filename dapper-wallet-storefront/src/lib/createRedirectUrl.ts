export function createRedirectUrl(url: string) {
  return typeof window !== "undefined" ? `${window?.location?.origin ?? ""}${url}` : ""
}
