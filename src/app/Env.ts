export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const PROTOCOL       = IS_DEVELOPMENT ? 'http' : 'https'
export const HOST           = IS_DEVELOPMENT ? 'localhost' : 'shlokas.app'
export const AUTH_HOST      = IS_DEVELOPMENT ? `http://${HOST}/auth` : `https://${HOST}/auth`

export function getContentUrl(fileName: string): string {
  return `${PROTOCOL}://${HOST}/content/${fileName}`
}

export function getDatabaseUrl(database: string) {
  return `${PROTOCOL}://${HOST}/db/${database}`
}