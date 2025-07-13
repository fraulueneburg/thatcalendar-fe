export const calArr = [
	{ _id: 'c1', calname: 'client work', color: '#465BB3', colorBg: '#131627' },
	{ _id: 'c2', calname: 'personal projects', color: '#56EFDB', colorBg: '#061E2F' },
	{ _id: 'c3', calname: 'daily stuff', color: '#B14382', colorBg: '#1B0E15' },
]

export const tasksArr = [
	{
		_id: 't1',
		summary: 'exchange header image',
		description: 'some description',
		dtStart: '20250714T090000Z',
		dtEnd: '20250714T100000Z',
		calendar: 'c1',
		subCalendar: 'DreamClient Inc.',
		travelTime: 'PT30M',
		travelReturnTime: 'PT1H30M',
	},
	{
		_id: 't2',
		summary: 'refine task component',
		description: 'some description',
		dtStart: '20250714T131500Z',
		dtEnd: '20250714T160000Z',
		calendar: 'c2',
		subCalendar: 'Calendar App',
		travelTime: 'PT30M',
		travelReturnTime: '0',
	},
	{
		_id: 't3',
		summary: 'buy groceries',
		description: 'some description',
		dtStart: '20250712T090000Z',
		dtEnd: '20250712T100000Z',
		calendar: 'c3',
		subCalendar: 'chore',
	},
]
