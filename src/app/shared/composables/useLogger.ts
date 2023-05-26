import { Logger } from '@akdasa-studios/framework'


export function useLogger(topic: string) {
  const logger = new Logger(topic)

  function debug(message: string, ...args: any[]) {
    logger.debug(message, ...args)
  }

  function error(message: string, ...args: any[]) {
    logger.error(message, ...args)
  }

  function startGroup(message: string) {
    logger.startGroup(message)
  }

  function endGroup() {
    logger.endGroup()
  }

  return { debug, error, startGroup, endGroup }
}