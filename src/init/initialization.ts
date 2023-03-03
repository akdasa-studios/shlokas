export interface InitArgs {
  get: <T>(name: string) => T
}

export interface InitResult {
  [name:string]: unknown
}