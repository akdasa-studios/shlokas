export const PROTOCOL  = process.env.NODE_ENV === 'development' ? 'http' : 'https'
export const HOST      = process.env.NODE_ENV === 'development' ? 'localhost' : 'shlokas.app'
export const AUTH_HOST = process.env.NODE_ENV === 'development' ? `http://${HOST}/auth` : `https://${HOST}/auth`

export function getContentUrl(fileName: string): string {
  return `${PROTOCOL}://${HOST}/content/${fileName}`
}