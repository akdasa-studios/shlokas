import { Aggregate, AnyIdentity, Repository } from '@akdasa-studios/framework'
import { Verse, VerseStatus } from "@akdasa-studios/shlokas-core"
import { ref, Ref } from 'vue'
import { repositories } from "@/application"

export abstract class ViewModel {
  sync(): void { /* to be implemented */ }
}

export class DomainViewModel<TType extends Aggregate<AnyIdentity>> implements ViewModel
{
  private _object: TType
  private _ref: Ref<TType>

  constructor(object: TType) {
    this._ref = ref(object) as Ref<TType>
    this._object = object
  }

  get object() { return this._object }
  get ref() { return this._ref }

  async sync() {
    const repository: Repository<TType> = this.getRepository()
    this._object = (await repository.get(this._object.id)).value
    console.log("sync " + this._object.id.value, this._object)
    this._ref.value = this._object
  }

  private getRepository(): Repository<TType> {
    if (this._object instanceof VerseStatus) {
      return repositories.verseStatuses as unknown as Repository<TType>
    }
    if (this._object instanceof Verse) {
      return repositories.verses as unknown as Repository<TType>
    }
    throw Error("Unknown Object Type")
  }
}
