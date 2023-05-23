import { LogRecord, Logs, LogTransport, LogLevel } from '@akdasa-studios/framework'


/**
 * Initialize logging system
 */
export async function initLogging() {
  Logs.register(new ConsoleLogTransport())
}


class ConsoleLogTransport implements LogTransport {
  log(record: LogRecord): void {

    if (record.type === 'log') {
      const context = `[${record.context}]`
      const data = record.data
      const styles = {
        context: 'color: #9E9E9E; font-weight: bold',
      }

      if (record.level === LogLevel.DEBUG) {
        console.debug('%c' + context, styles.context, record.message, data)
      } else if (record.level === LogLevel.INFO) {
        console.info('%c' + context, record.message, data)
      } else if (record.level === LogLevel.WARN) {
        console.warn('%c' + context, record.message, data)
      } else if (record.level === LogLevel.ERROR || record.level === LogLevel.FATAL) {
        console.error('%c' + context, record.message, data)
      }
    } else if (record.type === 'start-group') {
      console.group(record.label)
    } else if (record.type === 'end-group') {
      console.groupEnd()
    }
  }
}