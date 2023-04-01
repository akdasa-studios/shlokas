import { Capacitor } from '@capacitor/core'
import { CouchDB } from '@/services/persistence'
import { InitResult } from '../initialization'

/**
 * Initialize databases
 */
export async function initDatabases(): Promise<InitResult> {
  const adapter = Capacitor.getPlatform() == 'ios' ? 'cordova-sqlite' : undefined
  return {
    verses: new CouchDB('verses', adapter),
    userData: new CouchDB('userData', adapter),
    userDataTutorial: new CouchDB('tutorial:userData', adapter)
  }
}