export type SessionType = {
	title: string
	description: string
	dtStart: string
	dtEnd: string
	calendarId: string
	parent: string
	travelTime: string
	travelReturnTime: string
}

export type SessionProps = {
	data: SessionType
}
