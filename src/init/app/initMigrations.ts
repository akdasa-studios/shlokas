import { Storage } from '@ionic/storage'
import { Logger } from '@akdasa-studios/framework'
import { InitArgs } from '../initialization'

const logger = new Logger('migrations')

const migrations = {
  1: require('../migrations/001-save-bundled-verses'),
}

export async function initMigrations(args: InitArgs) {
  const deviceStorage = args.get<Storage>('deviceStorage')
  const lastMigration = await deviceStorage.get('lastMigration') || 0

  const migrationsToRun = Object.entries(migrations).filter(([key]) => parseInt(key) > lastMigration)
  for (const [migrationId, migrate] of migrationsToRun) {
    logger.debug(`Running migration ${migrationId}`)
    await migrate.default(args)
    await deviceStorage.set('lastMigration', migrationId)
  }
}
