import EventEmitter2 from 'eventemitter2'
import { useLogger } from './useLogger'


const emitter = new EventEmitter2()


export function useEmitter() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger = useLogger('emitter')


  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  function emit(event: string, ...args: any[]) {
    logger.debug(`Emitting ${event}`)
    emitter.emit(event, ...args)
  }

  function on(event: string, listener: (...args: any[]) => void) {
    logger.debug(`Registering listener for ${event}`)
    emitter.on(event, listener)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { emit, on }
}