export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  return async () => {
    const { url, headers } = {
      url: process.env.NEXT_PUBLIC_API_PATH as string,
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || "Error…")
    }

    return json.data
  }
}
