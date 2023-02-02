
export default function intervalToText(t:any, interval: number): string {
  if (interval === 0) { return t('cards.schedule.inDays', { count: 0 }) }
  const days   = Math.floor(interval / 1440)
  const months = parseFloat((interval / 43200).toFixed(1))
  const years  = parseFloat((interval / 535600).toFixed(1))
  if      (days <= 31)  { return t('cards.schedule.inDays',{ count: days })}
  else if (days <= 365) { return t('cards.schedule.inMonths',{ count: months }) }
  else                  { return t('cards.schedule.inYears',{ count: years }) }
}