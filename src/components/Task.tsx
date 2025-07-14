import { TaskProps } from './Task.types'
import { parse, format, differenceInMinutes } from 'date-fns'
import TravelTime from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'
import { calArr } from '../data/dummydata'
import { MainCalendarType } from '../types/main-calendar'
import { calculateGridPosition } from '../utils/calculateGridPosition'
import { calculateDuration } from '../utils/calculateDuration'

export default function Task({ data }: TaskProps) {
	const { summary, dtStart, dtEnd, calendar, subCalendar, travelTime, travelReturnTime } = data

	const mainCalendar: MainCalendarType | undefined = calArr.find((elem) => elem._id === calendar)
	if (!mainCalendar) {
		throw new Error('Calendar not found')
	}
	const { calName, color, colorBg } = mainCalendar

	const convertToTime = (date: string) => {
		const parsedDate = parse(date, "yyyyMMdd'T'HHmmssX", new Date())
		return format(parsedDate, 'HH.mm')
	}

	const startTime = convertToTime(dtStart)
	const endTime = convertToTime(dtEnd)
	const duration = calculateDuration(dtStart, dtEnd)

	const isValidTravelTime = (time: string) => time && time !== '0'

	const globalGridSize = 45
	const globalOffsetY = 128
	const globalStartHour = 7

	console.log(summary)
	const gridPos = calculateGridPosition(globalStartHour, dtStart, dtEnd, globalGridSize, globalOffsetY)

	return (
		<>
			<section className="task" style={{ backgroundColor: colorBg, color: color, top: gridPos.top, height: gridPos.height }}>
				{isValidTravelTime(travelTime) ? <TravelTime time={travelTime} /> : null}
				<div className="content">
					<small className="time">
						<span className="hours">
							<time>{startTime}</time>
							<span className="sr-only">
								&thinsp;–&thinsp;<time>{endTime}</time>
							</span>
						</span>
						<span className="duration">
							<IconDuration aria-label="duration" />
							{duration} <span className="sr-only">hours</span>
						</span>
					</small>
					<h4 className="title">{summary}</h4>
					<small className="cal">
						<span className="sub-cal">{subCalendar}</span> <span className="main-cal">•&nbsp;{calName}</span>
					</small>
				</div>
				{isValidTravelTime(travelReturnTime) && <TravelTime time={travelReturnTime} isReturn={true} />}
			</section>
		</>
	)
}
