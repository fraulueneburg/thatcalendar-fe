import { differenceInMinutes, parse } from 'date-fns'

const DATE_FORMAT = "yyyyMMdd'T'HHmmssX"

const calculateDuration = (start: string, end: string): string => {
	const date1 = parse(start, DATE_FORMAT, new Date())
	const date2 = parse(end, DATE_FORMAT, new Date())
	const hasInvalidDate = isNaN(date1.getTime()) || isNaN(date2.getTime())

	if (hasInvalidDate) throw new Error('Invalid date input')

	const totalMinutes = differenceInMinutes(date2, date1)
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export { calculateDuration }
