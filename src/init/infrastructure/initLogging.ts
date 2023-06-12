import { LogRecord, Logs, LogTransport, LogLevel } from '@akdasa-studios/framework'
import { useEnv } from '@/app/shared'


/**
 * Initialize logging system
 */
export async function initLogging() {
  const env = useEnv()
  Logs.register(new ConsoleLogTransport(
    env.getMode() === 'dev',
    env.getMode() !== 'dev'
  ))
}


class ConsoleLogTransport implements LogTransport {
  constructor(
    private readonly useColors = true,
    private readonly stringifyData = true
  ) { }

  log(record: LogRecord): void {
    if (record.type === 'log') {
      this.put(record.level, record.context, record.message, record.data)
    } else if (record.type === 'start-group') {
      console.group(record.label)
    } else if (record.type === 'end-group') {
      console.groupEnd()
    }
  }

  put(
    level: LogLevel,
    context: string,
    message: string,
    data: any
  ) {
    const method = {
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
      [LogLevel.ERROR]: console.error,
      [LogLevel.FATAL]: console.error,
    }[level]
    const dataToLog = this.stringifyData ? JSON.stringify(data) : data


    if (!this.useColors) {
      if (data) {
        method(context, message, dataToLog)
      } else {
        method(context, message)
      }
    } else {
      const styles = {
        context: 'color: #9E9E9E; font-weight: bold',
      }
      if (data) {
        method('%c' + `[${context}]`, styles.context, message, dataToLog)
      } else {
        method('%c' + `[${context}]`, styles.context, message)
      }
    }
  }
}