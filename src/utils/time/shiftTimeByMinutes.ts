import { parse, format, addMinutes } from 'date-fns'

const shiftTimeByMinutes = (timeStr: string, minutes: number) => {
	const parsedTime = parse(timeStr, 'HH:mm', new Date())
	const newTime = addMinutes(parsedTime, minutes)
	return format(newTime, 'HH:mm')
}
export { shiftTimeByMinutes }
