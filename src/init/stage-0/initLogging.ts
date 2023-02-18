import { LogRecord, Logs, LogTransport, LogLevel } from '@akdasa-studios/framework'


/**
 * Initialize logging system
 */
export async function initLogging() {
  Logs.register(new ConsoleLogTransport())
}


class ConsoleLogTransport implements LogTransport {
  log(record: LogRecord): void {
    if (record.level === LogLevel.DEBUG) {
      console.debug(record.context, record.message, JSON.stringify(record.data))
    } else if (record.level === LogLevel.INFO) {
      console.info(record.context, record.message, JSON.stringify(record.data))
    } else if (record.level === LogLevel.WARN) {
      console.warn(record.context, record.message, JSON.stringify(record.data))
    } else if (record.level === LogLevel.ERROR || record.level === LogLevel.FATAL) {
      console.error(record.context, record.message, JSON.stringify(record.data))
    }
  }
}