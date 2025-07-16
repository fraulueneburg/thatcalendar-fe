import { useState } from 'react'
import { endOfWeek, format, getISOWeek, startOfWeek, subDays, subWeeks } from 'date-fns'
import { PlusIcon as IconAdd, CaretLeftIcon as IconPrev, CaretRightIcon as IconNext } from '@phosphor-icons/react'
import Session from './Session'
import Header from './Header'

import { sessionsArr } from '../data/dummydata'

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

	const dayStartHour = 7
	const dayEndHour = 24
	const hoursRange = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i)
	const hoursArr = ['all day', ...hoursRange(dayStartHour, dayEndHour)]

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
			<Header />
			<main>
				<header>
					<h1>{periodHeadline}</h1>
					<h2>week {ISOweekNum}</h2>
					<nav>
						<button
							type="button"
							className="btn-round"
							onClick={() => setOffset((prev) => prev - 1)}
							aria-label="previous week">
							<IconPrev />
						</button>
						<button type="button" onClick={() => setOffset(0)} disabled={offset === 0} aria-label="current week">
							today
						</button>
						<button type="button" className="btn-round" onClick={() => setOffset((prev) => prev + 1)} aria-label="next week">
							<IconNext />
						</button>
					</nav>
				</header>
				<div className="week">
					<aside className="hours-range" aria-hidden="true">
						{hoursArr.map((hour, index) => (
							<div key={`range-${index}`}>
								{hour}
								{index === 0 ? '' : ':00'}
							</div>
						))}
					</aside>
					{weekdaysArr.map((dayName, index) => {
						const dayDate = subDays(new Date(today), weekdayNumToday - index + timePeriodInDays * offset * -1)
						const dayNum = dayDate.getDate()
						const isToday = offset === 0 && weekdayNumToday === index
						const isWeekend = ['Sat', 'Sun'].includes(dayName)
						const classes = `day${isToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`
						const writtenDate = `${isToday ? 'today, ' : ''}${format(dayDate, 'EEEE, MMMM do, yyyy')}`

						return (
							<article className={classes} key={`${offset}-${index}`}>
								<header>
									<h3 aria-label={writtenDate}>
										<span className="day-name">{dayName}</span> <span className="day-num">{dayNum}</span>
									</h3>
									<button type="button" className="btn-round" aria-label={`add session on ${writtenDate}`}>
										<IconAdd />
									</button>
								</header>
								<div className="content">
									{sessionsArr.map((session) => (
										<Session data={session} key={session._id} />
									))}
									{hoursArr.map((_, index, arr) => (
										<div className="line" style={{ bottom: (835 / arr.length) * index + 41 }} key={`line-${index}`}></div>
									))}
								</div>
							</article>
						)
					})}
				</div>
			</main>
		</>
	)
}
