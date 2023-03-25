

export function useEnv() {
  const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  const PROTOCOL       = IS_DEVELOPMENT ? 'http' : 'https'
  const HOST           = IS_DEVELOPMENT ? 'localhost' : 'shlokas.app'
  // const AUTH_HOST      = IS_DEVELOPMENT ? `http://${HOST}/auth` : `https://${HOST}/auth`

  function getContentUrl(fileName: string): string {
    return `${PROTOCOL}://${HOST}/content/${fileName}`
  }

  function getDatabaseUrl(database: string) {
    return `${PROTOCOL}://${HOST}/db/${database}`
  }

  return { getContentUrl, getDatabaseUrl }
}