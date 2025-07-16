import { SessionProps } from './Session.types'
import TravelTime from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'
import { calArr, subCalArr } from '../data/dummydata'
import { MainCalendarType } from '../types/main-calendar'
import { getGridPosition } from '../utils/grid'
import { calculateDuration, convertToTime, stripLeadingZero } from '../utils/time'

export default function Session({ data }: SessionProps) {
	const { title, dtStart, dtEnd, calendarId, parent, travelTime, travelReturnTime } = data

	const mainCalendar: MainCalendarType | undefined = calArr.find((elem) => elem._id === calendarId)
	if (!mainCalendar) {
		throw new Error('Calendar not found')
	}
	const { title: calendarTitle, color, colorBg } = mainCalendar

	const subCalendar = subCalArr.find((elem) => elem._id === parent)
	if (!subCalendar) {
		throw new Error('Calendar not found')
	}

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
					<h4 className="title">{title}</h4>
					<small className="cal">
						<span className="sub-cal">{subCalendar.name}</span> <span className="main-cal">•&nbsp;{calendarTitle}</span>
					</small>
				</div>
				{isValidTravelTime(travelReturnTime) && <TravelTime time={travelReturnTime} isReturn={true} />}
			</section>
		</>
	)
}
