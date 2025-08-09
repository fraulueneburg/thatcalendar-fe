export type CategoryType = {
	_id: string
	title: string
	parent?: string
	color?: string
	colorBg?: string
	children?: string[]
	isArchived?: boolean
}
