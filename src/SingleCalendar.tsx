export default function SingleCalendar(props) {
	let cal = props.cal.VCALENDAR[0]

	const color = cal['X-APPLE-CALENDAR-COLOR']
	const name = cal['X-WR-CALNAME']

	return (
		<>
			<h1 style={{ color: color }}>{name}</h1>
			<ul>
				{cal ? (
					cal.VEVENT.map((e) => {
						const { UID, SUMMARY } = e

						return (
							<li key={e.UID}>
								<small>{e.UID}</small>
								<br />
								<strong>{e.SUMMARY}</strong>
							</li>
						)
					})
				) : (
					<>Error loading calendar</>
				)}
			</ul>
		</>
	)
}
