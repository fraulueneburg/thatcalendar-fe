import { getHoursRange } from '../utils/time'

const dayStartHour = 7
const dayEndHour = 0
const weekStartsOnMonday = true

const hoursArr = ['all day', ...getHoursRange(dayStartHour, dayEndHour)]

const userTimeZone = 'Europe/Berlin'

export { dayStartHour, dayEndHour, weekStartsOnMonday, hoursArr, userTimeZone }
