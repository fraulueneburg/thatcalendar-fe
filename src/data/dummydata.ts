export const calArr = [
	{ _id: 'c1', title: 'Client Work', color: '#465BB3', colorBg: '#131627', childCalendars: ['sc1'] },
	{ _id: 'c2', title: 'Personal Projects', color: '#56EFDB', colorBg: '#061E2F', childCalendars: ['sc2'] },
	{ _id: 'c3', title: 'Daily Stuff', color: '#B14382', colorBg: '#1B0E15', childCalendars: ['sc3'] },
]

export const sessionsArr = [
	{
		_id: 't1',
		parent: 'sc1',
		title: 'exchange header image',
		description: 'some description',
		dtStart: '20250714T050500Z',
		dtEnd: '20250714T100000Z',
		calendarId: 'c1',
		travelTime: 'PT30M',
		travelReturnTime: 'PT1H30M',
	},
	{
		_id: 't2',
		parent: 'sc2',
		title: 'refine session component',
		description: 'some description',
		dtStart: '20250714T131500Z',
		dtEnd: '20250714T160000Z',
		calendarId: 'c2',
		travelTime: 'PT30M',
		travelReturnTime: '',
	},
	{
		_id: 't3',
		parent: 'sc3',
		title: 'buy groceries',
		description: 'some description',
		dtStart: '20250712T080000Z',
		dtEnd: '20250712T093000Z',
		calendarId: 'c3',
		travelTime: '',
		travelReturnTime: '',
	},
	{
		_id: 't4',
		parent: 'sc1',
		title: 'finish header',
		description: 'some description',
		dtStart: '20250714T201500Z',
		dtEnd: '20250714T213000Z',
		calendarId: 'c2',
		travelTime: '0',
		travelReturnTime: 'PT1H',
	},
]

export const subCalArr = [
	{ _id: 'sc1', name: 'DreamClient Inc.', parent: 'c1', sessions: ['t1'] },
	{ _id: 'sc2', name: 'Calendar App', parent: 'c2', sessions: ['t2', 't4'] },
	{ _id: 'sc3', name: 'Chore', parent: 'c3', sessions: ['t3'] },
	{ _id: 'sc2', name: 'sortOf', parent: 'c2', sessions: [] },
]
