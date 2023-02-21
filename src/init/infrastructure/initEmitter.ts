import { EventEmitter2 } from 'eventemitter2'
import { InitResult } from '../initialization'


/**
 * Initialize event bus
 */
export async function initEmitter(): Promise<InitResult> {
  return { 'emitter': new EventEmitter2() }
}
