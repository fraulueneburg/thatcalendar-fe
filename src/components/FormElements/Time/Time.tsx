import './time.scss'
import { useId, useState } from 'react'

type TimeProps = {
	title: string
	isDuration?: boolean
	defaultHour?: string
	defaultMinute?: string
}

export function Time({ title, isDuration = false, defaultHour, defaultMinute }: TimeProps) {
	const componentId = useId()
	const hoursId = `${componentId}hour`
	const minutesId = `${componentId}minute`

	const fallBackHour = defaultHour ?? (isDuration ? '0' : '')
	const fallBackMinute = defaultMinute ?? (isDuration ? '00' : '')
	const [hour, setHour] = useState(fallBackHour)
	const [minute, setMinute] = useState(fallBackMinute)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, updateValue: (val: string) => void) => {
		const { maxLength, value } = event.currentTarget
		if (value.length > maxLength) return
		updateValue(value)
	}

	const handleBlur = (
		event: React.FocusEvent<HTMLInputElement>,
		updateValue: (val: string) => void,
		fallBackValue: string
	) => {
		const { min, max, value } = event.currentTarget
		const isMinuteField = max === '59'
		const hasInvalid = +value > +max || +value < +min || Number.isNaN(+value)

		if (value === '') return
		if (isMinuteField && hasInvalid && hour === '') {
			updateValue('')
			return
		}
		if (isMinuteField && hasInvalid && +hour >= 0) {
			updateValue('00')
			return
		}
		if (+value < 10) {
			updateValue(value.padStart(2, '0'))
			return
		}
		if (!isDuration && (+value < +min || +value > +max)) updateValue(fallBackValue)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, updateValue: (val: string) => void) => {
		const { min, max, value, valueAsNumber } = event.currentTarget
		const { key } = event
		const isMinuteField = max === '59'

		if (isMinuteField && event.shiftKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
			event.preventDefault()

			const stepSize = 5
			const threshold = +max - stepSize + 1

			if (key === 'ArrowUp') {
				const roundedVal = valueAsNumber + stepSize - (valueAsNumber % stepSize)
				updateValue(valueAsNumber >= threshold ? min : String(roundedVal))
			}

			if (key === 'ArrowDown') {
				const roundedVal =
					valueAsNumber % stepSize === 0 ? valueAsNumber - stepSize : valueAsNumber - (valueAsNumber % stepSize)
				updateValue(valueAsNumber <= 0 ? String(threshold) : String(roundedVal))
			}

			return
		}

		if (key === 'ArrowUp' && value === max) {
			event.preventDefault()
			updateValue(min)
		}

		if (key === 'ArrowDown' && value === min) {
			event.preventDefault()
			updateValue(max)
		}
	}

	return (
		<>
			<fieldset>
				<legend>{title}</legend>
				<div className="field-group">
					<div className="field">
						<label htmlFor={hoursId} className="sr-only">
							{isDuration ? 'hours' : 'hour'}
						</label>
						<input
							id={hoursId}
							className="time-field hour"
							type="number"
							inputMode="numeric"
							min={0}
							max={23}
							maxLength={2}
							onChange={(event) => handleChange(event, setHour)}
							onBlur={(event) => handleBlur(event, setHour, fallBackHour)}
							onKeyDown={(event) => handleKeyDown(event, setHour)}
							value={hour}
						/>
					</div>
					<span className="field-separator" aria-hidden="true">
						{isDuration ? 'h' : ':'}
					</span>
					<div className="field">
						<label htmlFor={minutesId} className="sr-only">
							{isDuration ? 'minutes' : 'minute'}
						</label>
						<input
							id={minutesId}
							className="time-field minute"
							type="number"
							inputMode="numeric"
							min={0}
							max={59}
							maxLength={2}
							onChange={(event) => handleChange(event, setMinute)}
							onBlur={(event) => handleBlur(event, setMinute, fallBackMinute)}
							onKeyDown={(event) => handleKeyDown(event, setMinute)}
							value={minute}
						/>
					</div>
					{isDuration && (
						<span className="field-separator" aria-hidden="true">
							min
						</span>
					)}
				</div>
			</fieldset>
		</>
	)
}
