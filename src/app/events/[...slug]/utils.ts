export function parseSlug(slug: string[]): { year: number; month: number } {
  const [yearValue, monthValue] = slug

  const yearNumb = +yearValue
  const monthNumb = +monthValue
  return { year: yearNumb, month: monthNumb }
}
