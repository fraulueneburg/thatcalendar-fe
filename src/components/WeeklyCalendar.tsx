import { useState } from 'react'
import { endOfWeek, format, getISOWeek, startOfWeek, subDays, subWeeks } from 'date-fns'
import Task from './Task'

import { calArr, tasksArr } from '../data/dummydata'

export default function WeeklyCalendar() {
	const [offset, setOffset] = useState(0)

	const weekdaysArrUS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const weekdaysArrEU = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const weekStartsOnMonday = true
	const weekdaysArr = weekStartsOnMonday ? weekdaysArrEU : weekdaysArrUS
	const timePeriodInDays = 7

	const today = new Date()
	const weekdayNumToday = weekStartsOnMonday ? subDays(new Date(today), 1).getDay() : today.getDay()
	const yearToday = today.getFullYear()

	const refDate = subDays(new Date(today), offset * timePeriodInDays * -1)
	const startDay = startOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const endDay = endOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const startMonth = format(new Date(startDay), 'MMM')
	const endMonth = format(new Date(endDay), 'MMM')
	const startYear = startDay.getFullYear()
	const endYear = endDay.getFullYear()
	const isSameMonth = startMonth === endMonth
	const isTwoYears = startMonth === 'Dec' && endMonth === 'Jan'
	const hideIfCurrYear = (year: number) => {
		return year === yearToday ? null : <span className="year"> {year}</span>
	}

	const periodHeadline = isSameMonth ? (
		<>
			{startMonth}
			{hideIfCurrYear(startYear)}
		</>
	) : isTwoYears ? (
		<>
			{startMonth}
			{hideIfCurrYear(startYear)}/{endMonth}
			{hideIfCurrYear(endYear)}
		</>
	) : (
		<>
			{startMonth}/{endMonth}
			{hideIfCurrYear(endYear)}
		</>
	)

	const ISOweekNum = getISOWeek(subWeeks(new Date(today), offset * -1))

	return (
		<>
			<header className="page-header">
				<h1>{periodHeadline}</h1>
				<nav>
					<button onClick={() => setOffset((prev) => prev - 1)}>prev</button>
					<button onClick={() => setOffset(0)} disabled={offset === 0}>
						today
					</button>
					<button onClick={() => setOffset((prev) => prev + 1)}>next</button>
				</nav>
			</header>

			<div className="week">
				<h2>
					<span className="sr-only">Week </span>
					{ISOweekNum}
				</h2>
				{weekdaysArr.map((dayName, index) => {
					const dayDate = subDays(new Date(today), weekdayNumToday - index + timePeriodInDays * offset * -1)
					const dayNum = dayDate.getDate()
					const isToday = offset === 0 && weekdayNumToday === index
					const isWeekend = ['Sat', 'Sun'].includes(dayName)
					const classes = `day${isToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`

					return (
						<div className={classes} key={`${offset}-${index}`}>
							<div className="header">
								<h3>
									{dayName} {dayNum}
								</h3>
								<button aria-label="add new task">+</button>
							</div>
							<div className="content">
								{tasksArr.map((task) => (
									<Task data={task} key={task._id} />
								))}
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}
