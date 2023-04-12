import { Language } from "@akdasa-studios/shlokas-core"

export function useEnv() {
  const MODE     = import.meta.env.MODE
  const PROTOCOL = import.meta.env.VITE_PROTOCOL
  const HOST     = import.meta.env.VITE_HOST

  function getContentUrl(fileName: string): string {
    return `${PROTOCOL}://${HOST}/content/${fileName}`
  }

  function getDatabaseUrl(database: string) {
    return `${PROTOCOL}://${HOST}/db/${database}`
  }

  function getAuthUrl() {
    return `${PROTOCOL}://${HOST}/auth`
  }

  function getMode() {
    return MODE
  }

  function isDevelopment() {
    return MODE === 'development'
  }

  function getHost() {
    return HOST
  }


  return { getContentUrl, getDatabaseUrl, getMode, isDevelopment, getAuthUrl, getHost }
}

export function getAvailableLanguages() {
  return [
    new Language('en', 'English'),
    new Language('ru', 'Русский'),
    new Language('uk', 'Українська мова')
    // new Language("rs", "Српски")
  ]
}