import { format, subDays } from 'date-fns'
import { useState } from 'react'
import { PlusIcon as IconAdd } from '@phosphor-icons/react'
import { sessionsArr } from '../data/dummydata'
import { hoursArr, weekStartsOnMonday } from '../data/user-settings'
import Session from './Session'
import { Popover } from './Popover'
import TimeslotForm from './Forms/TimeslotForm'

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

	const [formOpen, setFormOpen] = useState(false)

	return (
		<article className={classes}>
			<header>
				<h3 aria-label={writtenDate}>
					<span className="day-name">{dayName}</span> <span className="day-num">{dayNum}</span>
				</h3>
				<Popover trigger={<IconAdd />} triggerLabel={`add session on ${writtenDate}`}>
					<TimeslotForm />
				</Popover>
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
}
