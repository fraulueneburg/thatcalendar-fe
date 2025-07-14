export type TaskType = {
	summary: string
	description: string
	dtStart: string
	dtEnd: string
	calendar: string
	subCalendar: string
	travelTime: string
	travelReturnTime: string
}

export type TaskProps = {
	data: TaskType
}
