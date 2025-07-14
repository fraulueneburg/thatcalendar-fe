import { differenceInMinutes, parse } from 'date-fns'

export const calculateDuration = (start: string, end: string) => {
	const format = "yyyyMMdd'T'HHmmssX"
	const date1 = parse(start, format, new Date())
	const date2 = parse(end, format, new Date())

	const totalMinutes = differenceInMinutes(date2, date1)
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	return `${hours}:${String(minutes).padStart(2, '0')}`
}
