import { differenceInMinutes, parseISO } from 'date-fns'

export const calculateGridPosition = (
	globalStartHour: number,
	startDate: string,
	endDate: string,
	gridHeight: number,
	offsetY: number
) => {
	const sessionStartDate = parseISO(startDate)
	const sessionEndDate = parseISO(endDate)
	const startToday = new Date(parseISO(startDate).setHours(globalStartHour, 0, 0))

	const sessionDuration = Math.abs(differenceInMinutes(sessionEndDate, sessionStartDate))
	const minutesFromStartOfDay = differenceInMinutes(sessionStartDate, startToday)
	const pxPerMinute = gridHeight / 60

	const toPixels = (minutes: number) => minutes * pxPerMinute
	const top = toPixels(minutesFromStartOfDay) + offsetY
	const height = toPixels(sessionDuration)

	return { top, height }
}
