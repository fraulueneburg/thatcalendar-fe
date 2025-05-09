import { useState } from 'react'
import { addDays, format, getISOWeek, subDays, subWeeks } from 'date-fns'

export default function WeeklyCalendar() {
	const today = new Date()
	const [offset, setOffset] = useState(0)

	const weekdaysArrUS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const weekdaysArrEU = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const weekStartsOnMonday = true
	const weekdaysArr = weekStartsOnMonday ? weekdaysArrEU : weekdaysArrUS
	const timePeriodInDays = 7

	const ISOweekNum = getISOWeek(subWeeks(new Date(today), offset * -1))

	const currWeekdayNum = weekStartsOnMonday ? subDays(new Date(today), 1).getDay() : today.getDay()
	const currDay = today.getDate()
	const currMonth = today.getMonth()
	const currYear = today.getFullYear()
	const currDayName = format(new Date(today), 'ccc')

	const currMonthName = format(new Date(today), 'MMM')

	return (
		<>
			<h1>{currMonthName}</h1>
			<button onClick={() => setOffset((prev) => prev - 1)}>prev</button>
			<button onClick={() => setOffset(0)} disabled={offset === 0}>
				today
			</button>
			<button onClick={() => setOffset((prev) => prev + 1)}>next</button>

			<h2>{ISOweekNum}</h2>

			<div className="week">
				{weekdaysArr.map((dayName, index) => {
					const dayDate = addDays(new Date(today), currWeekdayNum - index + offset * timePeriodInDays)
					const dayNum = dayDate.getDate()
					const isToday = offset === 0 && currWeekdayNum === index
					const classes = `day ${isToday ? ' today' : ''}`

					return (
						<>
							<div className={classes} key={dayName}>
								<h3>
									{dayName} {dayNum}
								</h3>
							</div>
						</>
					)
				})}
			</div>
		</>
	)
}
