import { CouchDB } from '@/services/persistence'
import { InitArgs } from '../initialization'

import ru from './data/verses.ru.json'
import en from './data/verses.en.json'
import uk from './data/verses.uk.json'


export default async function migrate(args: InitArgs) {
  const db: CouchDB = args.get<CouchDB>('verses')

  await db.db.bulkDocs(ru)
  await db.db.bulkDocs(en)
  await db.db.bulkDocs(uk)
}