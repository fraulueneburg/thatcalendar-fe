export type ChecklistItemType = {
	_id: string
	value: string
	isDone: boolean
}

export type TaskType = {
	_id: string
	parent: string
	title: string
	description?: string
	checklist?: ChecklistItemType[]
	isDone?: boolean
	travelTime?: string
	travelReturnTime?: string
}
