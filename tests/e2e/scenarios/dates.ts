export function nextDays(days: number) {
  const result = new Date()
  result.setDate(result.getDate()+days)
  return result
}