import mitt from 'mitt'
import { Events } from '@/app/Events'
import { InitResult } from '../initialization'


/**
 * Initialize event bus
 */
export async function initEmitter(): Promise<InitResult> {
  return { 'emitter': mitt<Events>() }
}
