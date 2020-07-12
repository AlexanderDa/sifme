import { zonedTimeToUtc } from 'date-fns-tz'

export function currentDate(): string {
    const utcDate = zonedTimeToUtc(new Date(), 'America/Guayaquil')
    return utcDate.toISOString()
}
