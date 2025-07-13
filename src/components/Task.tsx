import { toDate } from 'date-fns'

import { parse, format } from 'date-fns'

export default function Task(props) {
	const { summary, description, dtStart, dtEnd } = props.data

	const convertTime = (date) => {
		const parsedDate = parse(date, "yyyyMMdd'T'HHmmssX", new Date())
		return format(parsedDate, 'HH.mm')
	}

	const startTime = convertTime(dtStart)
	const endTime = convertTime(dtEnd)

	return (
		<>
			<div className="task">
				<small>
					{startTime}&thinsp;–&thinsp;{endTime}
				</small>
				<h4>{summary}</h4>
				<p>{description}</p>
			</div>
		</>
	)
}
