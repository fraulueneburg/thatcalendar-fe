export const calArr = [
	{ _id: 'c1', calName: 'Client Work', color: '#465BB3', colorBg: '#131627', childCalendars: ['sc1'] },
	{ _id: 'c2', calName: 'Personal Projects', color: '#56EFDB', colorBg: '#061E2F', childCalendars: ['sc2'] },
	{ _id: 'c3', calName: 'Daily Stuff', color: '#B14382', colorBg: '#1B0E15', childCalendars: ['sc3'] },
]

export const tasksArr = [
	{
		_id: 't1',
		summary: 'exchange header image',
		description: 'some description',
		dtStart: '20250714T050500Z',
		dtEnd: '20250714T100000Z',
		calendarId: 'c1',
		subCalendarId: 'sc1',
		travelTime: 'PT30M',
		travelReturnTime: 'PT1H30M',
	},
	{
		_id: 't2',
		summary: 'refine task component',
		description: 'some description',
		dtStart: '20250714T131500Z',
		dtEnd: '20250714T160000Z',
		calendarId: 'c2',
		subCalendarId: 'sc2',
		travelTime: 'PT30M',
		travelReturnTime: '',
	},
	{
		_id: 't3',
		summary: 'buy groceries',
		description: 'some description',
		dtStart: '20250712T080000Z',
		dtEnd: '20250712T093000Z',
		calendarId: 'c3',
		subCalendarId: 'sc3',
		travelTime: '',
		travelReturnTime: '',
	},
	{
		_id: 't4',
		summary: 'finish header',
		description: 'some description',
		dtStart: '20250714T201500Z',
		dtEnd: '20250714T213000Z',
		calendarId: 'c2',
		subCalendarId: 'sc1',
		travelTime: '0',
		travelReturnTime: 'PT1H',
	},
]

export const subCalArr = [
	{ _id: 'sc1', name: 'DreamClient Inc.', parentCalendar: 'c1', tasks: ['t1'] },
	{ _id: 'sc2', name: 'Calendar App', parentCalendar: 'c2', tasks: ['t2', 't4'] },
	{ _id: 'sc3', name: 'Chore', parentCalendar: 'c3', tasks: ['t3'] },
	{ _id: 'sc2', name: 'sortOf', parentCalendar: 'c2', tasks: [] },
]
