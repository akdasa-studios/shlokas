import mitt from 'mitt'
import { Events } from '@/app/Events'
import { InitStageResult } from '../initialization'


/**
 * Initialize event bus
 */
export async function initEmitter(): Promise<InitStageResult> {
  return { 'emitter': mitt<Events>() }
}
