import { App } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'

export interface InitArgs {
  shlokas: Application
  vue: App
  get: <T>(name: string) => T
}

export interface InitResult {
  [name:string]: unknown
}