import { Application } from '@akdasa-studios/shlokas-core'

export interface InitArgs {
  app: Application
  get: <T>(name: string) => T
}

export interface InitStageResult {
  inject?: { [name:string]: any }
}