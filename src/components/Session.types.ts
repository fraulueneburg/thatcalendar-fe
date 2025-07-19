export type SessionType = {
	_id: string
	dtStart: string
	dtEnd: string
	calendarId: string
	parent: string
}

export type SessionProps = {
	data: SessionType
}
