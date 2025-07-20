import { SessionProps } from './Session.types'
import { CategoryType } from '../types/category'

import { categoryArr, tasksArr } from '../data/dummydata'

import { getGridPosition } from '../utils/grid/'
import { calculateDuration } from '../utils/duration/'
import { convertToTime, stripLeadingZero } from '../utils/time'

import TravelTime from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'
import { useDraggable } from '@dnd-kit/core'

export default function Session({ data }: SessionProps) {
	const { _id, dtStart, dtEnd, parent: sessionParent } = data
	const startTime = convertToTime(dtStart)
	const endTime = convertToTime(dtEnd)
	const duration = calculateDuration(dtStart, dtEnd)

	const task = tasksArr.find((elem) => elem._id === sessionParent)
	if (!task) throw Error('No task found')
	const { title: taskTitle, travelTime, travelReturnTime, parent: taskParentId } = task

	const subCategory = categoryArr.find((elem) => elem._id === taskParentId)
	if (!subCategory) throw new Error('SubCategory not found')
	const { title: subCatTitle, parent: subCatParentId } = subCategory

	const category: CategoryType | undefined = categoryArr.find((elem) => elem._id === subCatParentId)
	if (!category) throw new Error('Category not found')
	const { title: catTitle, color, colorBg } = category

	const isValidTravelTime = (time: string) => time && time !== '0'

	const globalGridSize = 45
	const globalOffsetY = 128
	const globalStartHour = 7

	const gridPos = getGridPosition(globalStartHour, dtStart, dtEnd, globalGridSize, globalOffsetY)

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: _id,
	})
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined

	return (
		<>
			<section
				id={_id}
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				className="session"
				style={{ backgroundColor: colorBg, color: color, top: gridPos.top, height: gridPos.height, ...style }}>
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
						<span className="sub-cal">{subCatTitle}</span> <span className="main-cal">•&nbsp;{catTitle}</span>
					</small>
				</div>
				{isValidTravelTime(travelReturnTime) && <TravelTime time={travelReturnTime} isReturn={true} />}
			</section>
		</>
	)
}
