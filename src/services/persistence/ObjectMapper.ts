
export interface ObjectMapper<TSourceType, TDestionationType> {
  map(from: TSourceType): TDestionationType
}