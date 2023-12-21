import { Aggregate, AnyIdentity, Expression, Identity, Operators, Predicate, Query, QueryBuilder, Repository, LogicalOperators, Logger, ResultSet, QueryOptions } from '@akdasa-studios/framework'
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDBAdapterSqlLite from 'pouchdb-adapter-cordova-sqlite'
import { deepMerge } from './deepMerge'
import { ObjectMapper } from './ObjectMapper'

const log = new Logger('db')

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchdbFind)
PouchDB.plugin(PouchDBAdapterSqlLite)


export interface CouchDBConfig {
  adapter?: string,
  token?: string
  location?: string
}

export class CouchDB {
  private _db: PouchDB.Database
  private _name: string
  private _config: CouchDBConfig

  constructor(name: string, config: CouchDBConfig) {
    this._name = name
    this._config = config
    this._db = this.creaateDatabase()
  }

  async sync(to: string) {
    await this._db.sync(to)
  }

  async replicateFrom(from: string) {
    return await this._db.replicate.from(from)
  }

  async destroy() {
    await this._db.destroy()
    this._db = this.creaateDatabase()
  }

  get db(): PouchDB.Database { return this._db }

  private creaateDatabase() {
    log.debug(`Creating database ${this._name}`)
    return new PouchDB(this._name, {
      ...this._config,
      fetch: (url, opts) => {
        // @ts-ignore
        opts.headers.set('Authorization', 'Bearer ' + this._config.token)
        return PouchDB.fetch(url, opts)
      }
    })
  }
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

  async all(): Promise<ResultSet<TAggregate>> {
    log.debug(`[${this._collectionName}] all`)
    return await this.find(
      new QueryBuilder<TAggregate>()
        // @ts-ignore
        .eq('@type', this._collectionName)
    )
  }

  async save(entity: TAggregate): Promise<void> {
    log.debug(`[${this._collectionName}] save`, entity)
    const serializedDoc = this._serializer.map(entity)
    await this._db.db.upsert(
      entity.id.value,
      () => { return serializedDoc as any }
    )
  }

  async get(id: TAggregate['id']): Promise<TAggregate> {
    log.debug(`[${this._collectionName}] get`, id)
    try {
      const document = await this._db.db.get(id.value)
      return this._deserializer.map(document)
    } catch {
      throw new Error('404')
    }
  }

  async exists(id: TAggregate['id']): Promise<boolean> {
    log.debug(`[${this._collectionName}] exists`, id)
    const document = await this.get(id)
    return document !== undefined
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions
  ): Promise<ResultSet<TAggregate>> {
    log.debug(`[${this._collectionName}] find`, query)
    const convertedQuery = {
      selector: {
        '$and': [
          ...[new QueryConverter().convert(query)],
          { '@type': this._collectionName }
        ]
      },
      limit: options?.limit,
      skip: options?.skip,
      // bookmark: options?.bookmark,
    }
    const items = await this._db.db.find(convertedQuery)

    return new ResultSet(
      items.docs.map(x => this._deserializer.map(x)),
      { start: options?.skip || 0, count: items.docs.length }
    )
  }

  async delete(id: TAggregate['id']): Promise<void> {
    log.debug(`[${this._collectionName}] delete`, id)
    try {
      const doc = await this._db.db.get(id.value, { latest: true })
      await this._db.db.remove(doc)
    } catch (e) { console.log('CANT DELETE', e, this._collectionName) }
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
    [Operators.Contains]: '$regex'
  }

  convert(query: Query<any>): any {
    return this._visit(query)
  }

  _visit(query: Query<any>): any {
    if (query instanceof Predicate) {
      // if (query.field === 'language') { return {} }
      // if (query.field === 'number.value') { return { 'number': { '$regex': new RegExp(query.value as string) } } }
      // if (query.field === 'text.lines') { return {} }
      // if (query.field === 'translation.text') { return {} }

      if (query.operator === Operators.Equal && query.value === undefined) {
        return { [query.field]: { '$exists': false } }
      }

      // emulate contains with regex
      let value = this.getValue(query.value)
      if (query.operator === Operators.Contains) {
        value = new RegExp(value)
      }

      // return query
      return {
        [query.field]: { [this.operatorsMap[query.operator]]: value }
      }
    } else if (query instanceof Expression) {
      if (query.operator === LogicalOperators.Or) {
        return { '$or': [...query.query.map(x => this._visit(x))] }
      }
      if (query.operator === LogicalOperators.Not) {
        return { '$not': deepMerge({}, ...query.query.map(x => this._visit(x))) }
      }
      if (query.operator === LogicalOperators.And) {
        return { '$and': [...query.query.map(x => this._visit(x))] }
      }

      return deepMerge(
        {},
        ...query.query.map(x => this._visit(x))
      )
    }
  }

  getValue(object: unknown) {
    if (object instanceof Identity) {
      return object.value
    } else if (object instanceof Array) {
      return object.map(x => x.value)
    } else if (object instanceof Date) {
      return object.getTime()
    }
    return object
  }
}