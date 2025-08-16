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
		calendarId: 'c1',
		travelTime: 'PT30M',
		travelReturnTime: 'PT1H30M',
	},
	{
		_id: 't2',
		parent: 'sc2',
		title: 'refine session component',
		description: 'some description',
		calendarId: 'c2',
		travelTime: 'PT30M',
		travelReturnTime: '',
	},
	{
		_id: 't3',
		parent: 'sc3',
		title: 'buy groceries',
		description: 'some description',
		calendarId: 'c3',
		travelTime: '',
		travelReturnTime: '',
	},
	{
		_id: 't4',
		parent: 'sc1',
		title: 'finish header',
		description: 'some description',
		calendarId: 'c2',
		travelTime: '0',
		travelReturnTime: 'PT1H',
	},
]

export const sessionsArr = [
	{
		_id: 's1',
		parent: 't1',
		dtStartUtc: '2025-08-07T05:05:00.00Z',
		dtEndUtc: '2025-08-07T10:00:00.00Z',
		calendarId: 'c1',
	},
	{
		_id: 's2',
		parent: 't2',
		dtStartUtc: '2025-08-07T13:15:00.00Z',
		dtEndUtc: '2025-08-07T16:00:00.00Z',
		calendarId: 'c2',
	},
	{
		_id: 's3',
		parent: 't3',
		dtStartUtc: '2025-08-05T08:00:00.00Z',
		dtEndUtc: '2025-08-05T09:30:00.00Z',
		calendarId: 'c3',
	},
	{
		_id: 's4',
		parent: 't1',
		dtStartUtc: '2025-08-04T18:15:00.00Z',
		dtEndUtc: '2025-08-04T20:30:00.00Z',
		calendarId: 'c2',
	},
]

export const sessionIndex: Record<string, string[]> = {
	'20250807': ['s1', 's2'],
	'20250805': ['s3'],
	'20250804': ['s4'],
}
