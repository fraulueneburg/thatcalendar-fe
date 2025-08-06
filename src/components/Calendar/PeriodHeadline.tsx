import { format } from 'date-fns'

export type PeriodHeadlineProps = {
	today: Date
	startDay: Date
	endDay: Date
}

export function PeriodHeadline({ today, startDay, endDay }: PeriodHeadlineProps) {
	const yearToday = today.getFullYear()
	const startMonth = format(new Date(startDay), 'MMM')
	const endMonth = format(new Date(endDay), 'MMM')
	const startYear = startDay.getFullYear()
	const endYear = endDay.getFullYear()

	const isSameMonth = startMonth === endMonth
	const isTwoYears = startMonth === 'Dec' && endMonth === 'Jan'
	const hideIfCurrYear = (year: number) => {
		return year === yearToday ? null : <span className="year"> {year}</span>
	}

	return (
		<>
			{isSameMonth ? (
				<>
					{startMonth}
					{hideIfCurrYear(startYear)}
				</>
			) : isTwoYears ? (
				<>
					{startMonth}
					{hideIfCurrYear(startYear)}/{endMonth}
					{hideIfCurrYear(endYear)}
				</>
			) : (
				<>
					{startMonth}/{endMonth}
					{hideIfCurrYear(endYear)}
				</>
			)}
		</>
	)
}
