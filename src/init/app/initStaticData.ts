
import { Application } from '@akdasa-studios/shlokas-core'
import { useLoadLibraryIntoMemory } from '@/app/library'
import { InitArgs } from '../initialization'


export async function initStaticData(
  { get }: InitArgs
) {
  await useLoadLibraryIntoMemory(
    get<Application>('app'),
    get('verses')
  ).sync()
}
