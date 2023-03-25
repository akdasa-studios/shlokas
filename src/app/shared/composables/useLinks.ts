export function go(name: string, params?: any) {
  if (!params) {
    return { name }
  } else {
    return { name, params: { ...params }}
  }
}
