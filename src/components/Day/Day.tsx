import './day.scss'
import { useDataContext } from '../../context/Data.context'

import { hoursArr } from '../../data/user-settings'

import { format, isToday } from 'date-fns'
import { useDroppable } from '@dnd-kit/core'

import { Session } from '../Session'
import { SessionForm } from '../Forms'
import { PlusIcon as IconAdd } from '@phosphor-icons/react'
import { Popover } from '../Popover/Popover'

type DayType = {
	dayDate: Date
	dayName: string
}

type DayProps = {
	data: DayType
}

export function Day({ data }: DayProps) {
	const { sessionData, setSessionData } = useDataContext()

	const sessionsArr = sessionData.data
	const sessionIndex = sessionData.index

	const { dayDate, dayName } = data

	const dayNum = dayDate.getDate()
	const isItToday = isToday(dayDate)
	const isWeekend = ['Sat', 'Sun'].includes(dayName)
	const classes = `day${isItToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`
	const writtenDate = `${isItToday ? 'today, ' : ''}${format(dayDate, 'EEEE, MMMM do, yyyy')}`

	const sessionStartDay = format(dayDate, 'yyyyMMdd')
	const sessionIdsSet = new Set(sessionIndex[sessionStartDay] ?? [])
	const filteredSessions = sessionsArr.filter((session) => sessionIdsSet.has(session._id))

	const { setNodeRef } = useDroppable({ id: sessionStartDay })

	return (
		<article className={classes} ref={setNodeRef} id={sessionStartDay}>
			<header>
				<h3 aria-label={writtenDate}>
					<span className="day-name">{dayName}</span>
					<span className="day-num">{dayNum}</span>
					<span className="day-total-time">00:00 h</span>
				</h3>
				<Popover trigger={<IconAdd weight="bold" />} triggerLabel={`add session`}>
					<SessionForm day={dayDate} />
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
