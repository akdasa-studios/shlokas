import { Aggregate, AnyIdentity, Repository, Query } from '@akdasa-studios/framework'
import { Verse, VerseStatus } from "@akdasa-studios/shlokas-core"
import { ref, Ref } from 'vue'
import { application } from "@/app/Application"

export abstract class ViewModel {
  sync(): void { /* to be implemented */ }
}

export class DomainViewModel<TType extends Aggregate<AnyIdentity>> implements ViewModel
{
  private _object: TType
  private _ref: Ref<TType>
  private _query: Query<TType> | undefined

  constructor(object: TType, query?: Query<TType>) {
    this._ref = ref(object) as Ref<TType>
    this._object = object
    this._query = query
  }

  get object() { return this._object }
  get ref() { return this._ref }

  async sync() {
    // console.log("sync " + this._object.id.value, this._object)

    const repository: Repository<TType> = this.getRepository()

    if (this._query) {
      const queryResult =  (await repository.find(this._query)).value
      this._object = queryResult[0]
    } else {
      if (this._object.id.value === "00000000-0000-0000-0000-000000000000") {
        return // this object is not meant to be saved
      }

      this._object = (await repository.get(this._object.id)).value
    }
    this._ref.value = this._object
  }

  private getRepository(): Repository<TType> {
    if (this._object instanceof VerseStatus) {
      return application.repositories.verseStatuses as unknown as Repository<TType>
    }
    if (this._object instanceof Verse) {
      return application.repositories.verses as unknown as Repository<TType>
    }
    throw Error("Unknown Object Type")
  }
}
