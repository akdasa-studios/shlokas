import { Result } from '@akdasa-studios/framework'


export interface ObjectMapper<TSourceType, TDestionationType> {
  map(from: TSourceType): Result<TDestionationType, string>
}