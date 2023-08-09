export function fetcher<T>(url: string) {
  return fetch(url).then((r) => r.json() as Promise<T>)
}
