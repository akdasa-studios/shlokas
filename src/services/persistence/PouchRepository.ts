import { Aggregate, AnyIdentity, Expression, Identity, Operators, Predicate, Query, QueryBuilder, Repository, Result } from '@akdasa-studios/framework'
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDBAdapterSqlLite from 'pouchdb-adapter-cordova-sqlite'
import { deepMerge } from './deepMerge'
import { ObjectMapper } from './ObjectMapper'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchdbFind)
PouchDB.plugin(PouchDBAdapterSqlLite)

export class CouchDB {
  private _db: PouchDB.Database

  constructor(dbName: string) {
    this._db = new PouchDB(dbName, {
      adapter: 'cordova-sqlite',
      revs_limit: 1,
      auto_compaction: true,
      location: 'default',
      // iosDatabaseLocation: 'default',
    })
  }

  async sync(to: string) {
    console.log("syncing to", to)
    await this._db.sync(to)
  }

  async deleteAll() {
    const docs = await this._db.allDocs()
    docs.rows.forEach(y => {
      this._db.remove(y.id, y.value.rev)
    })
  }

  get db(): PouchDB.Database { return this ._db }
}

export class PouchRepository<
  TAggregate extends Aggregate<AnyIdentity>
> implements Repository<TAggregate> {

  private _db: CouchDB
  private _collectionName: string
  private _serializer: ObjectMapper<TAggregate, unknown>
  private _deserializer: ObjectMapper<unknown, TAggregate>

  constructor(
    db: CouchDB,
    collectionName: string,
    serializer: ObjectMapper<TAggregate, unknown>,
    deserializer: ObjectMapper<unknown, TAggregate>
  ) {
    this._db = db
    this._collectionName = collectionName
    this._serializer = serializer
    this._deserializer = deserializer
  }

  async all(): Promise<Result<readonly TAggregate[]>> {
    const allDocs = await this.find(
      new QueryBuilder<TAggregate>()
        // @ts-ignore
        .eq("@type", this._collectionName) // @ts-ignore
    ) // .allDocs({ include_docs: true })
    // const mappedDoc = allDocs.value.map(x => this._deserializer.map(x.doc).value)
    return Result.ok(allDocs.value)
  }

  async save(entity: TAggregate): Promise<Result<void, string>> {
    const serializedDoc = this._serializer.map(entity).value
    await this._db.db.upsert(
      entity.id.value,
      (_) => {
        // @ts-ignore
        serializedDoc._rev = _?._rev // TODO: neeed?
        return serializedDoc as any
      }
    )
    return Result.ok()
  }

  async get(id: TAggregate['id']): Promise<Result<TAggregate, string>> {
    try {
      const document = await this._db.db.get(id.value)
      return Result.ok(this._deserializer.map(document).value)
    } catch {
      return Result.fail("404?")
    }
  }

  async exists(id: TAggregate['id']): Promise<boolean> {
    const document = await this.get(id)
    return document.isSuccess
  }

  async find(query: Query<TAggregate>): Promise<Result<TAggregate[], string>> {
    const convertedQuery = new QueryConverter().convert(query)
    convertedQuery.selector["@type"] = this._collectionName
    const items = await this._db.db.find(convertedQuery)
    const objs = items.docs.map(x => this._deserializer.map(x).value)
    return Result.ok(objs)
  }

  async delete(id: TAggregate['id']): Promise<Result<void, string>> {
    try {
      const doc = await this._db.db.get(id.value)
      await this._db.db.remove(doc)
    } catch(e) { console.log('CANT DELETE', e, this._collectionName) }
    return Result.ok()
  }
}

class QueryConverter {
  private operatorsMap: { [name: string]: string } = {
    [Operators.Equal]: '$eq',
    [Operators.GreaterThan]: '$gt',
    [Operators.GreaterThanOrEqual]: '$gte',
    [Operators.LessThan]: '$lt',
    [Operators.LessThanOrEqual]: '$lte',
    [Operators.In]: '$in',
  }

  convert(query: Query<any>): any {
    return {
      "selector": this._visit(query)
    }
  }

  _visit(query: Query<any>): any {
    if (query instanceof Predicate) {
      return {
        [query.field]: {
          [this.operatorsMap[query.operator]] : this.getValue(query.value)
        }
      }
    } else if (query instanceof Expression) {
      return deepMerge(
        {},
        ...query.query.map(x => this._visit(x))
      )
    }
  }

  getValue(object: unknown) {
    if (object instanceof Identity) {
      return object.value
    } else if (object instanceof Array<AnyIdentity>) {
      return object.map(x => x.value)
    }
    return object
  }
}