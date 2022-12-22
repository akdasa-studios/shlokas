export function testId(...parts: string[]): string {
  return parts.map(x => x.toLowerCase()).join('-')
}
