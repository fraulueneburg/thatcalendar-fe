import { Checkbox, Field, Fieldset, NumberInput } from '@ark-ui/react'
import { CheckIcon } from '@phosphor-icons/react'

import { dayStartHour, dayEndHour } from '../../data/user-settings'
import { convertToTime } from '../../utils/time'

export default function TimeslotForm() {
	return (
		<>
			<form>
				<strong>Time Slot Form</strong>

				<Field.Root>
					<Field.Label>Title</Field.Label>
					<Field.Input />
					<Field.ErrorText>Error Info</Field.ErrorText>
				</Field.Root>

				<Fieldset.Root>
					<Fieldset.Legend>Time</Fieldset.Legend>
					<Fieldset.ErrorText>Fieldset Error Text</Fieldset.ErrorText>
					<p>
						<label htmlFor="slot-start-time">starts at</label>
						<input
							id="slot-start-time"
							type="time"
							name="slot-start-time"
							min={convertToTime(dayStartHour)}
							max={convertToTime(dayEndHour)}
						/>
						<span className="validity"></span>
					</p>
					<p>
						<label htmlFor="slot-end-time">ends at</label>
						<input id="slot-end-time" type="time" name="slot-end-time" min={dayStartHour} max={dayEndHour} />
					</p>
				</Fieldset.Root>
				<Fieldset.Root>
					<Fieldset.Legend>Travel duration</Fieldset.Legend>
					<p>
						<label htmlFor="appointment-time">travel time</label>
						<input id="appointment-time" type="time" name="start-time" value="00:00" />
					</p>
					<p>
						<Checkbox.Root>
							<Checkbox.Control>
								<Checkbox.Indicator>
									<CheckIcon />
								</Checkbox.Indicator>
							</Checkbox.Control>
							<Checkbox.Label>same return time</Checkbox.Label>
							<Checkbox.HiddenInput />
						</Checkbox.Root>
						<label htmlFor="appointment-time">travel return time</label>
						<input id="appointment-time" type="time" name="end-time" value="15:30" />
					</p>
				</Fieldset.Root>
			</form>
		</>
	)
}
