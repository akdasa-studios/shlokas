import { Capacitor } from '@capacitor/core'
import { CouchDB } from '@/services/persistence'
import { InitResult } from '../initialization'

/**
 * Initialize databases
 */
export async function initDatabases(): Promise<InitResult> {
  const config = {
    adapter: Capacitor.getPlatform() !== 'web' ? 'cordova-sqlite' : undefined,
    location: 'default'
  }

  return {
    verses: new CouchDB('verses', config),
    userData: new CouchDB('userData', config),
    userDataTutorial: new CouchDB('tutorial_userData', config)
  }
}