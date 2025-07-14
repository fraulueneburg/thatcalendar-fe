import { differenceInMinutes, parseISO } from 'date-fns'

export const calculateGridPosition = (
	globalStartHour: number,
	startDate: string,
	endDate: string,
	gridHeight: number,
	offsetY: number
) => {
	const taskStartDate = parseISO(startDate)
	const taskEndDate = parseISO(endDate)
	const startToday = new Date(parseISO(startDate).setHours(globalStartHour, 0, 0))

	const taskDuration = Math.abs(differenceInMinutes(taskEndDate, taskStartDate))
	const minutesFromStartOfDay = differenceInMinutes(taskStartDate, startToday)
	const pxPerMinute = gridHeight / 60

	const toPixels = (minutes: number) => minutes * pxPerMinute
	const top = toPixels(minutesFromStartOfDay) + offsetY
	const height = toPixels(taskDuration)

	return { top, height }
}
