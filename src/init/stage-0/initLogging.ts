import { LogRecord, Logs, LogTransport } from '@akdasa-studios/framework'


class ConsoleLogTransport implements LogTransport {
  log(record: LogRecord): void {
    console.log(record.context, record.message, JSON.stringify(record.data))
  }
}

/**
 * Initialize logging system
 */
export async function initLogging() {
  Logs.register(new ConsoleLogTransport())
}
