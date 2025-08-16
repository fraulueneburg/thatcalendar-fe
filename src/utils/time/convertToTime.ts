import { parse, format } from 'date-fns'

const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSX"

const timeFromHourNumber = (hour: number): string => {
	if (!Number.isInteger(hour)) throw new Error('No decimals allowed.')
	if (hour < 0 || hour > 23) throw new Error('Only numbers 0-23 allowed')
	return format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')
}

const timeFromString = (input: string): string => {
	const parsedDate = parse(input, DATE_FORMAT, new Date())
	if (isNaN(parsedDate.getTime())) throw new Error(`Unsupported input type: ${typeof input}`)
	return format(parsedDate, 'HH:mm')
}

const convertToTime = (input: string | number): string => {
	if (typeof input === 'number') return timeFromHourNumber(input)
	if (typeof input === 'string') return timeFromString(input)
	throw new Error('Input must be a string or a whole number (0–23).')
}

export { convertToTime }
