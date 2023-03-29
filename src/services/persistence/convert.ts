export function date(date: Date | undefined): number | undefined {
  if (date === undefined) { return undefined }
  return date.setHours(0,0,0,0)
}

export function dateAndTime(date: Date | undefined): number | undefined {
  if (date === undefined) { return undefined }
  return date.getTime()
}