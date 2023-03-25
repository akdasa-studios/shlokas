import { CouchDB } from '@/services/persistence'
import { InitArgs } from '../initialization'

import versesBundled from './data/verses.bundled.json'


export default async function migrate(args: InitArgs) {
  const db: CouchDB = args.get<CouchDB>('verses')
  await db.db.bulkDocs(versesBundled)
}