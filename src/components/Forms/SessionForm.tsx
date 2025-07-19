import { Checkbox, Field, Fieldset } from '@ark-ui/react'
import { CheckIcon } from '@phosphor-icons/react'

import { dayStartHour, dayEndHour } from '../../data/user-settings'
import { convertToTime } from '../../utils/time'
import { calArr, tasksArr } from '../../data/dummydata'
import { useState } from 'react'

export default function SessionForm() {
	const [category, setCategory] = useState('empty')
	const filteredSubCategories = calArr.filter((elem) => elem.parent === category)

	return (
		<>
			<form>
				<h4>New Session</h4>
				<fieldset>
					<legend>Task</legend>
					<p>choose an existing task</p>
					<select defaultValue="" onChange={(e) => setCategory(e.target.value)}>
						<option value="empty">Task</option>
						{tasksArr.map((elem) => (
							<option value={elem._id} key={elem._id}>
								{elem.title}
							</option>
						))}
					</select>

					<p>or create a new one</p>
					<input type="text" />
				</fieldset>

				<Fieldset.Root>
					<Fieldset.Legend>Category</Fieldset.Legend>
					<select defaultValue="" onChange={(e) => setCategory(e.target.value)}>
						<option value="empty">Category</option>
						{calArr.map((elem) => (
							<option value={elem._id} key={elem._id}>
								{elem.title}
							</option>
						))}
					</select>
					<select defaultValue="" disabled={category === 'empty'}>
						<option value="empty">Project</option>
						{filteredSubCategories.map((elem) => (
							<option value={elem._id} key={elem._id}>
								{elem.title}
							</option>
						))}
					</select>
				</Fieldset.Root>

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
					<div>
						<label htmlFor="appointment-time">travel time</label>
						<input id="appointment-time" type="time" name="start-time" />
					</div>
					<div>
						<div>
							<Checkbox.Root>
								<Checkbox.Control>
									<Checkbox.Indicator>
										<CheckIcon />
									</Checkbox.Indicator>
								</Checkbox.Control>
								<Checkbox.Label>same return time</Checkbox.Label>
								<Checkbox.HiddenInput />
							</Checkbox.Root>
						</div>
						<label htmlFor="appointment-time">travel return time</label>
						<input id="appointment-time" type="time" name="end-time" />
					</div>
				</Fieldset.Root>
				<button type="submit">create session</button>
			</form>
		</>
	)
}
