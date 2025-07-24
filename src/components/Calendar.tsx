import { useState } from 'react'
import { endOfWeek, format, getISOWeek, startOfWeek, subDays, subWeeks } from 'date-fns'

import { hoursArr, weekStartsOnMonday } from '../data/user-settings'

import PeriodHeadline from './PeriodHeadline'
import Day from './Day'
import { CaretLeftIcon as IconPrev, CaretRightIcon as IconNext } from '@phosphor-icons/react'
import { DndContext } from '@dnd-kit/core'
import { createCustomSnapModifier } from '../utils/dndkit'

export default function Calendar() {
	const [offsetDays, setOffsetDays] = useState(0)

	const today = new Date()
	const weekdaysArrUS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const weekdaysArrEU = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const weekdaysArr = weekStartsOnMonday ? weekdaysArrEU : weekdaysArrUS
	const weekdayNumToday = weekStartsOnMonday ? subDays(new Date(today), 1).getDay() : today.getDay()
	const timePeriodInDays = 7

	const refDate = subDays(new Date(today), offsetDays * timePeriodInDays * -1)
	const startDay = startOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const endDay = endOfWeek(new Date(refDate), { weekStartsOn: weekStartsOnMonday ? 1 : 0 })
	const ISOweekNum = getISOWeek(subWeeks(new Date(today), offsetDays * -1))

	const globalGridSize = 45
	const gridHeight5min = globalGridSize / 12
	const gridColumnWidth = 168
	const snapToGridModifier = createCustomSnapModifier(gridColumnWidth, gridHeight5min)

	return (
		<>
			<header>
				<h1>
					<PeriodHeadline today={today} startDay={startDay} endDay={endDay} />
				</h1>
				<h2>week {ISOweekNum}</h2>
				<nav>
					<button
						type="button"
						className="btn-round"
						onClick={() => setOffsetDays((prev) => prev - 1)}
						aria-label="previous week">
						<IconPrev />
					</button>
					<button type="button" onClick={() => setOffsetDays(0)} disabled={offsetDays === 0} aria-label="current week">
						today
					</button>
					<button
						type="button"
						className="btn-round"
						onClick={() => setOffsetDays((prev) => prev + 1)}
						aria-label="next week">
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
				<DndContext modifiers={[snapToGridModifier]}>
					{weekdaysArr.map((dayName, index) => {
						const dayDate = subDays(new Date(today), weekdayNumToday - index + timePeriodInDays * offsetDays * -1)
						const id = format(dayDate, 'yyyyMMdd')
						return <Day key={id} data={{ dayDate, dayName }} />
					})}
				</DndContext>
			</div>
		</>
	)
}
