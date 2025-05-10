import { useState } from 'react'
import { endOfWeek, format, getISOWeek, startOfWeek, subDays, subWeeks } from 'date-fns'

export default function WeeklyCalendar() {
	const [offset, setOffset] = useState(0)

	const weekdaysArrUS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const weekdaysArrEU = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const weekStartsOnMonday = true
	const weekdaysArr = weekStartsOnMonday ? weekdaysArrEU : weekdaysArrUS
	const timePeriodInDays = 7

	const today = new Date()
	const currWeekdayNum = weekStartsOnMonday ? subDays(new Date(today), 1).getDay() : today.getDay()

	const refDate = subDays(new Date(today), offset * timePeriodInDays * -1)
	const firstDayOfWeek = startOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const lastDayOfWeek = endOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const firstMonth = format(new Date(firstDayOfWeek), 'MMM')
	const lastMonth = format(new Date(lastDayOfWeek), 'MMM')

	const writtenMonthName = firstMonth === lastMonth ? `${firstMonth}` : `${firstMonth}/${lastMonth}`
	const ISOweekNum = getISOWeek(subWeeks(new Date(today), offset * -1))

	return (
		<>
			<h1>{writtenMonthName}</h1>
			<button onClick={() => setOffset((prev) => prev - 1)}>prev</button>
			<button onClick={() => setOffset(0)} disabled={offset === 0}>
				today
			</button>
			<button onClick={() => setOffset((prev) => prev + 1)}>next</button>

			<h2>{ISOweekNum}</h2>

			<div className="week">
				{weekdaysArr.map((dayName, index) => {
					const dayDate = subDays(new Date(today), currWeekdayNum - index + timePeriodInDays * offset * -1)
					const dayNum = dayDate.getDate()
					const isToday = offset === 0 && currWeekdayNum === index
					const isWeekend = dayName === 'Sat' || dayName === 'Sun'
					const classes = `day${isToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`

					return (
						<div className={classes} key={`${offset}-${index}`}>
							<h3>
								{dayName} {dayNum}
							</h3>
						</div>
					)
				})}
			</div>
		</>
	)
}
