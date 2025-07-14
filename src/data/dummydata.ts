export const calArr = [
	{ _id: 'c1', calName: 'Client Work', color: '#465BB3', colorBg: '#131627' },
	{ _id: 'c2', calName: 'Personal Projects', color: '#56EFDB', colorBg: '#061E2F' },
	{ _id: 'c3', calName: 'Daily Stuff', color: '#B14382', colorBg: '#1B0E15' },
]

export const tasksArr = [
	{
		_id: 't1',
		summary: 'exchange header image',
		description: 'some description',
		dtStart: '20250714T050500Z',
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
		travelReturnTime: '',
	},
	{
		_id: 't3',
		summary: 'buy groceries',
		description: 'some description',
		dtStart: '20250712T080000Z',
		dtEnd: '20250712T093000Z',
		calendar: 'c3',
		subCalendar: 'chore',
	},
	{
		_id: 't4',
		summary: 'finish header',
		description: 'some description',
		dtStart: '20250714T201500Z',
		dtEnd: '20250714T213000Z',
		calendar: 'c2',
		subCalendar: 'Calendar App',
		travelTime: '0',
		travelReturnTime: 'PT1H',
	},
]

export const subCalArr = [
	{ _id: 'sc1', name: 'DreamClient Inc.', parentCalendar: 'c1', tasks: ['t1'] },
	{ _id: 'sc2', name: 'Calendar App', parentCalendar: 'c2', tasks: ['t2', 't4'] },
	{ _id: 'sc3', name: 'Chore', parentCalendar: 'c3', tasks: ['t3'] },
]
