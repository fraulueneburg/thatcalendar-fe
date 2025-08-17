import { getHoursRange } from '../utils/time'

const globalStartHour = 7
const globalEndHour = 0
const weekStartsOnMonday = true

const globalGridSize = 45
const gridHeight15min = globalGridSize / 4
const globalOffsetY = 128

const hoursArr = ['all day', ...getHoursRange(globalStartHour, globalEndHour)]
const userTimeZone = 'Europe/Berlin'

export {
	globalStartHour,
	globalEndHour,
	weekStartsOnMonday,
	globalGridSize,
	gridHeight15min,
	globalOffsetY,
	hoursArr,
	userTimeZone,
}
