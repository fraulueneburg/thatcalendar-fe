export type SessionType = {
	_id: string
	dtStartUtc: string
	dtEndUtc: string
	parent: string
}

export type SessionProps = {
	data: SessionType
}
