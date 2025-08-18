import { format, toZonedTime } from 'date-fns-tz'
import { userTimeZone } from '../../data/user-settings'

const toUserTimeZone = (utcDateString: string | Date): string => {
	const utcDate = typeof utcDateString === 'string' ? new Date(utcDateString) : utcDateString
	return format(toZonedTime(utcDate, userTimeZone), "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: userTimeZone })
}

export { toUserTimeZone }
