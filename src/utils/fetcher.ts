export function fetcher<T>(url: string, opts?: RequestInit) {
  return fetch(url, opts).then((r) => r.json() as Promise<T>)
}
