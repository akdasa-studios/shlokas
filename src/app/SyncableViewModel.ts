import { repositories } from "@/application";
import { Verse, VerseStatus } from "@akdasa-studios/shlokas-core";
import { Aggregate, AnyIdentity, Repository } from '@akdasa-studios/framework';

export class SyncableViewModel<TType extends Aggregate<AnyIdentity>> {
  private _object: TType;
  constructor(object: TType) {
    this._object = object;
  }
  get object(): TType { return this._object; }
  sync() {
    console.log("sync " + this._object.id.value);
    const repository: Repository<TType> = this.getRepository();
    this._object = repository.get(this._object.id).value;
  }
  private getRepository(): Repository<TType> {
    if (this._object instanceof VerseStatus) {
      return repositories.verseStatuses as unknown as Repository<TType>;
    }
    if (this._object instanceof Verse) {
      return repositories.verses as unknown as Repository<TType>;
    }
    throw Error("Unknown Object Type");
  }
}