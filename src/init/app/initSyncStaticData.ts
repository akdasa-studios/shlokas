
import { Logger } from '@akdasa-studios/framework'
import { getDatabaseUrl } from '@/app/Env'
import { CouchDB } from '../../services/persistence/PouchRepository'
import { InitArgs } from '../initialization'

export async function initSyncStaticData(
  { get }: InitArgs
) {
  // TODO: not run it everytime
  const logger = new Logger('init')

  try {
    const db: CouchDB = get('verses')
    const res = await db.replicateFrom(getDatabaseUrl('shlokas'))
    console.log(res)
  } catch (err) {
    logger.error('Failed to sync static data', err)
  }
}
