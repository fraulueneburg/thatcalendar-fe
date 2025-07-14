import { calArr } from '../data/dummydata'
import { parse, format, differenceInMinutes } from 'date-fns'
import TravelTime from './TravelTime'
import { TimerIcon as IconDuration } from '@phosphor-icons/react'

export default function Task(props) {
	const { summary, description, dtStart, dtEnd, calendar, subCalendar, travelTime, travelReturnTime } = props.data

	const mainCalendar = calArr.find((elem) => elem._id === calendar)
	const { calname, color, colorBg } = mainCalendar

	const calculateDuration = (start, end) => {
		const format = "yyyyMMdd'T'HHmmssX"
		const date1 = parse(start, format, new Date())
		const date2 = parse(end, format, new Date())

		const totalMinutes = differenceInMinutes(date2, date1)
		const hours = Math.floor(totalMinutes / 60)
		const minutes = totalMinutes % 60

		return `${hours}:${String(minutes).padStart(2, '0')}`
	}

	const convertToTime = (date) => {
		const parsedDate = parse(date, "yyyyMMdd'T'HHmmssX", new Date())
		return format(parsedDate, 'HH.mm')
	}

	const startTime = convertToTime(dtStart)
	const endTime = convertToTime(dtEnd)

	const duration = calculateDuration(dtStart, dtEnd)

	return (
		<>
			<section className="task" style={{ backgroundColor: colorBg, color: color }}>
				{travelTime && <TravelTime time={travelTime} />}
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
						<span className="sub-cal">{subCalendar}</span> <span className="main-cal">•&nbsp;{calname}</span>
					</small>
				</div>
				{travelTime && travelReturnTime != 0 && <TravelTime time={travelReturnTime || travelTime} isReturn={true} />}
			</section>
		</>
	)
}
