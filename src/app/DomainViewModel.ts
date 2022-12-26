import { Aggregate, AnyIdentity, Repository } from '@akdasa-studios/framework'
import { Verse, VerseStatus } from "@akdasa-studios/shlokas-core"
import { ref, Ref } from 'vue'
import { repositories } from "@/application"

export abstract class ViewModel {
  sync(): void { /* to be implemented */ }
}

export class DomainViewModel<TType extends Aggregate<AnyIdentity>> implements ViewModel
{
  public _object: TType
  public $: Ref<TType>

  constructor(object: TType) {
    this.$ = ref(object) as Ref<TType>
    this._object = object
  }

  sync() {
    const repository: Repository<TType> = this.getRepository()
    this._object = repository.get(this._object.id).value
    console.log("sync " + this._object.id.value, this._object)
    this.$.value = this._object
    console.log(this.$.value)
  }

  private getRepository(): Repository<TType> {
    if (this._object instanceof VerseStatus) {
      return repositories.verseStatuses as unknown as Repository<TType>
    }
    if (this._object instanceof Verse) {
      return repositories.verses as unknown as Repository<TType>
    }
    console.log("Unknown Object Type", this._object)
    throw Error("Unknown Object Type")
  }
}
