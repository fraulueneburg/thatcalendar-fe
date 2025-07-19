import { SessionProps } from './Session.types'
import { CategoryType } from '../types/category'

import { catArr, tasksArr } from '../data/dummydata'

import { getGridPosition } from '../utils/grid/'
import { calculateDuration } from '../utils/duration/'
import { convertToTime, stripLeadingZero } from '../utils/time'

import TravelTime from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'

export default function Session({ data }: SessionProps) {
	const { dtStart, dtEnd, parent: sessionParent } = data

	const task = tasksArr.find((elem) => elem._id === sessionParent)
	if (!task) throw Error('No task found')
	const { title: taskTitle, travelTime, travelReturnTime, parent: taskParentId } = task

	const subCategory = catArr.find((elem) => elem._id === taskParentId)
	if (!subCategory) throw new Error('Sub Calendar not found')
	const { title: subCatTitle, parent: subCatParentId } = subCategory

	const category: CategoryType | undefined = catArr.find((elem) => elem._id === subCatParentId)
	if (!category) throw new Error('Calendar not found')
	const { title: calTitle, color, colorBg } = category

	const startTime = convertToTime(dtStart)
	const endTime = convertToTime(dtEnd)
	const duration = calculateDuration(dtStart, dtEnd)

	const isValidTravelTime = (time: string) => time && time !== '0'

	const globalGridSize = 45
	const globalOffsetY = 128
	const globalStartHour = 7

	const gridPos = getGridPosition(globalStartHour, dtStart, dtEnd, globalGridSize, globalOffsetY)

	return (
		<>
			<section
				className="session"
				style={{ backgroundColor: colorBg, color: color, top: gridPos.top, height: gridPos.height }}>
				{isValidTravelTime(travelTime) ? <TravelTime time={travelTime} /> : null}
				<div className="content">
					<small className="time">
						<span className="hours">
							<time dateTime={startTime}>{stripLeadingZero(startTime)}</time>
							<span className="sr-only">
								&thinsp;–&thinsp;<time dateTime={endTime}>{stripLeadingZero(endTime)}</time>
							</span>
						</span>
						<span className="duration">
							<IconDuration aria-label="duration" />
							<time dateTime={duration}>{stripLeadingZero(duration)}</time> <span className="sr-only">hours</span>
						</span>
					</small>
					<h4 className="title">{taskTitle}</h4>
					<small className="cal">
						<span className="sub-cal">{subCatTitle}</span> <span className="main-cal">•&nbsp;{calTitle}</span>
					</small>
				</div>
				{isValidTravelTime(travelReturnTime) && <TravelTime time={travelReturnTime} isReturn={true} />}
			</section>
		</>
	)
}
