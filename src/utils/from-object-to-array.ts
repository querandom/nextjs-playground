export function fromObjectToArray<T>(data: { [key: string]: T }) {
  const transformedData = []
  for (let key in data) {
    transformedData.push(data[key])
  }
  return transformedData
}
