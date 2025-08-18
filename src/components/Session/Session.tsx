import './session.scss'
import { useRef, useState } from 'react'
import { SessionProps, CategoryType, SessionType } from '../../types'

import { globalGridSize, globalOffsetY, globalStartHour, gridHeight15min, userTimeZone } from '../../data/user-settings'
import { useDataContext } from '../../context/Data.context'

import { getGridPosition } from '../../utils/grid'
import { calculateDuration } from '../../utils/duration'
import { convertToTime, shiftTimeByMinutes, stripLeadingZero } from '../../utils/time'
import { toUserTimeZone } from '../../utils/timezones'

import { useDndMonitor, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import { ResizeHandle } from './ResizeHandle'
import { TravelTime } from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'
import { set } from 'date-fns'

export function Session({ data }: SessionProps) {
	const { _id, dtStartUtc, dtEndUtc, parent: sessionParent } = data

	const { categoryData, taskData, sessionData, setSessionData } = useDataContext()
	const categoryArr = categoryData.data
	const tasksArr = taskData

	const dtStart = toUserTimeZone(dtStartUtc)
	const dtEnd = toUserTimeZone(dtEndUtc)

	const [startTime, setStartTime] = useState(convertToTime(dtStart))
	const [endTime, setEndTime] = useState(convertToTime(dtEnd))
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

	const gridPos = getGridPosition(globalStartHour, dtStart, dtEnd, globalGridSize, globalOffsetY)
	const yPosRef = useRef<number>(0)

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: _id,
	})
	const style = {
		transform: CSS.Translate.toString(transform),
	}

	useDndMonitor({
		onDragStart(event) {
			if (event.active.id !== _id) return
			yPosRef.current = 0
		},
		onDragMove(event) {
			if (event.active.id !== _id) return
			if (event.delta.x === 0 && event.delta.y === 0) return

			const currentPosY = event.delta.y
			const lastPosY = yPosRef.current
			const currentDistanceY = Math.abs(currentPosY - lastPosY)

			if (currentPosY < lastPosY) {
				setStartTime(shiftTimeByMinutes(startTime, -15 * (currentDistanceY / gridHeight15min)))
				setEndTime(shiftTimeByMinutes(endTime, -15 * (currentDistanceY / gridHeight15min)))
			} else if (currentPosY > lastPosY) {
				setStartTime(shiftTimeByMinutes(startTime, 15 * (currentDistanceY / gridHeight15min)))
				setEndTime(shiftTimeByMinutes(endTime, 15 * (currentDistanceY / gridHeight15min)))
			}

			yPosRef.current = currentPosY
		},
		onDragEnd(event) {
			if (event.active.id !== _id) return
			if (event.delta.x === 0 && event.delta.y === 0) return

			const [startHour, startMinute] = startTime.split(':').map(Number)
			const [endHour, endMinute] = endTime.split(':').map(Number)

			const newDtStartUtc = set(dtStart, { hours: startHour, minutes: startMinute }).toISOString()
			const newDtEndUtc = set(dtEnd, { hours: endHour, minutes: endMinute }).toISOString()

			const updatedSessionsArr = sessionData.data.map((elem: SessionType) =>
				elem._id === _id ? { ...elem, dtStartUtc: newDtStartUtc, dtEndUtc: newDtEndUtc } : elem
			)

			setSessionData({ ...sessionData, data: updatedSessionsArr })
		},
	})

	return (
		<>
			<section
				id={_id}
				className="session"
				style={{ backgroundColor: colorBg, color: color, top: gridPos.top, height: gridPos.height, ...style }}>
				<ResizeHandle />
				<div className="content">
					{travelTime && isValidTravelTime(travelTime) ? <TravelTime time={travelTime} /> : null}
					<div className="text" ref={setNodeRef} {...listeners} {...attributes}>
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
					{travelReturnTime && isValidTravelTime(travelReturnTime) && <TravelTime time={travelReturnTime} isReturn={true} />}
				</div>
				<ResizeHandle />
			</section>
		</>
	)
}
