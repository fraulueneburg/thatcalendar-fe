export type TaskType = {
	summary: string
	description: string
	dtStart: string
	dtEnd: string
	calendarId: string
	subCalendarId: string
	travelTime: string
	travelReturnTime: string
}

export type TaskProps = {
	data: TaskType
}
