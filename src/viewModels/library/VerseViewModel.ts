import { Verse } from "@akdasa-studios/shlokas-core"

export class VerseViewModel {
  public verseId = ""
  public number = ""
  public translation = ""
  public text: string[] = []

  static create(verse: Verse): VerseViewModel {
    const vm = new VerseViewModel()
    vm.verseId = verse.id.value
    vm.number = verse.number.toString()
    vm.translation = verse.translation.text
    vm.text = verse.text.lines
    return vm
  }

  static empty(): VerseViewModel {
    return new VerseViewModel()
  }
}
