import { format, subDays } from 'date-fns'

import { sessionsArr, sessionIndex } from '../data/dummydata'
import { hoursArr, weekStartsOnMonday } from '../data/user-settings'

import Session from './Session'
import SessionForm from './Forms/SessionForm'
import { PlusIcon as IconAdd } from '@phosphor-icons/react'
import { Popover } from './Popover'

type DayType = {
	dayName: string
	index: number
	offsetDays: number
	today: Date
	timePeriodInDays: number
}

type DayProps = {
	data: DayType
}

export default function Day({ data }: DayProps) {
	const { dayName, index, offsetDays, today, timePeriodInDays } = data

	const weekdayNumToday = weekStartsOnMonday ? subDays(new Date(today), 1).getDay() : today.getDay()
	const dayDate = subDays(new Date(today), weekdayNumToday - index + timePeriodInDays * offsetDays * -1)
	const dayNum = dayDate.getDate()
	const isToday = offsetDays === 0 && weekdayNumToday === index
	const isWeekend = ['Sat', 'Sun'].includes(dayName)
	const classes = `day${isToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`
	const writtenDate = `${isToday ? 'today, ' : ''}${format(dayDate, 'EEEE, MMMM do, yyyy')}`

	const sessionTargetDay = format(dayDate, 'yyyyMMdd')
	const sessionIdsSet = new Set(sessionIndex[sessionTargetDay] ?? [])
	const filteredSessions = sessionsArr.filter((session) => sessionIdsSet.has(session._id))

	return (
		<article className={classes}>
			<header>
				<h3 aria-label={writtenDate}>
					<span className="day-name">{dayName}</span> <span className="day-num">{dayNum}</span>
				</h3>
				<Popover trigger={<IconAdd />} triggerLabel={`add session`}>
					<SessionForm />
				</Popover>
			</header>
			<div className="content">
				{filteredSessions.map((session) => (
					<Session data={session} key={session._id} />
				))}
				{hoursArr.map((_, index, arr) => (
					<div className="line" style={{ bottom: (835 / arr.length) * index + 41 }} key={`line-${index}`}></div>
				))}
			</div>
		</article>
	)
}
