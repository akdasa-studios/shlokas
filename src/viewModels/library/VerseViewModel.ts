import { Text, Translation, Verse, VerseBuilder, VerseNumber } from "@akdasa-studios/shlokas-core";
import { markRaw } from 'vue';

export class VerseViewModel {
  constructor(public readonly obj: Verse) {
    this.obj = markRaw(obj)
  }

  get verseId() { return this.obj.id.value }
  get number() { return this.obj.number.toString() }
  get translation() { return this.obj.translation.text }
  get text() { return this.obj.text.lines }

  static get empty() {
    const dummyVerse= new VerseBuilder()
      .withNumber(new VerseNumber('????'))
      .withText(new Text(['????']))
      .withTranslation(new Translation('????'))
      .build().value
    return new VerseViewModel(dummyVerse)
  }
}