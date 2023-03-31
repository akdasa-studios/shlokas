import { Logger } from '@akdasa-studios/framework'


export function useLogger(topic: string) {
  const logger = new Logger(topic)

  function debug(message: string, ...args: any[]) {
    logger.debug(message, ...args)
  }

  return { debug }
}