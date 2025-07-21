export const categoryArr = [
	{ _id: 'c1', title: 'Client Work', color: '#465BB3', colorBg: '#131627', children: ['sc1'] },
	{ _id: 'c2', title: 'Personal Projects', color: '#56EFDB', colorBg: '#061E2F', children: ['sc2', 'sc4'] },
	{ _id: 'c3', title: 'Daily Stuff', color: '#B14382', colorBg: '#1B0E15', children: ['sc3'] },

	{ _id: 'sc1', title: 'DreamClient Inc.', parent: 'c1' },
	{ _id: 'sc2', title: 'Calendar App', parent: 'c2' },
	{ _id: 'sc3', title: 'Chore', parent: 'c3' },
	{ _id: 'sc4', title: 'sortOf', parent: 'c2' },
]

export const categoryIndex: Record<string, string[]> = {
	c1: ['sc1'],
	c2: ['sc2', 'sc4'],
	c3: ['sc3'],
}

export const tasksArr = [
	{
		_id: 't1',
		parent: 'sc1',
		title: 'exchange header image',
		description: 'some description',
		dtStart: '20250723T050500Z',
		dtEnd: '20250723T100000Z',
		calendarId: 'c1',
		travelTime: 'PT30M',
		travelReturnTime: 'PT1H30M',
	},
	{
		_id: 't2',
		parent: 'sc2',
		title: 'refine session component',
		description: 'some description',
		dtStart: '20250723T131500Z',
		dtEnd: '20250723T160000Z',
		calendarId: 'c2',
		travelTime: 'PT30M',
		travelReturnTime: '',
	},
	{
		_id: 't3',
		parent: 'sc3',
		title: 'buy groceries',
		description: 'some description',
		dtStart: '20250725T080000Z',
		dtEnd: '20250725T093000Z',
		calendarId: 'c3',
		travelTime: '',
		travelReturnTime: '',
	},
	{
		_id: 't4',
		parent: 'sc1',
		title: 'finish header',
		description: 'some description',
		dtStart: '20250723T201500Z',
		dtEnd: '20250723T213000Z',
		calendarId: 'c2',
		travelTime: '0',
		travelReturnTime: 'PT1H',
	},
]

export const sessionsArr = [
	{
		_id: 's1',
		parent: 't1',
		dtStart: '20250723T050500Z',
		dtEnd: '20250723T100000Z',
		calendarId: 'c1',
	},
	{
		_id: 's2',
		parent: 't2',
		dtStart: '20250723T131500Z',
		dtEnd: '20250723T160000Z',
		calendarId: 'c2',
	},
	{
		_id: 's3',
		parent: 't3',
		dtStart: '20250725T080000Z',
		dtEnd: '20250725T093000Z',
		calendarId: 'c3',
	},
	{
		_id: 's4',
		parent: 't1',
		dtStart: '20250722T201500Z',
		dtEnd: '20250722T213000Z',
		calendarId: 'c2',
	},
]

export const sessionIndex: Record<string, string[]> = {
	'20250723': ['s1', 's2'],
	'20250725': ['s3'],
	'20250722': ['s4'],
}
