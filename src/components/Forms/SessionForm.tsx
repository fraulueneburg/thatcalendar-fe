import { Checkbox, Field, Fieldset } from '@ark-ui/react'
import { CheckIcon } from '@phosphor-icons/react'

import { dayStartHour, dayEndHour } from '../../data/user-settings'
import { convertToTime } from '../../utils/time'
import { categoryArr, tasksArr } from '../../data/dummydata'
import { useState } from 'react'

export default function SessionForm() {
	const [category, setCategory] = useState('empty')
	const filteredCategories = categoryArr.filter((elem) => !elem.parent)
	const filteredSubCategories = categoryArr.filter((elem) => elem.parent === category)

	return (
		<>
			<form>
				<h4>New Session</h4>
				<fieldset>
					<legend>Task</legend>
					<p>choose an existing task</p>
					<select required defaultValue="" onChange={(e) => setCategory(e.target.value)}>
						<option value="empty">Task</option>
						{tasksArr.map((elem) => (
							<option value={elem._id} key={elem._id}>
								{elem.title}
							</option>
						))}
					</select>

					<p>or create a new one</p>
					<input required type="text" />
				</fieldset>

				<Fieldset.Root>
					<Fieldset.Legend>Category</Fieldset.Legend>
					<select required defaultValue="" onChange={(e) => setCategory(e.target.value)}>
						<option value="empty">Category</option>
						{filteredCategories.map((elem) => (
							<option value={elem._id} key={elem._id}>
								{elem.title}
							</option>
						))}
					</select>
					<select required defaultValue="" disabled={category === 'empty'}>
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
						<label>
							<input type="checkbox" />
							all day
						</label>
					</p>
					<div className="grid field-time-slot">
						<p>
							<label htmlFor="slot-start-time">starts at</label>
							<input
								required
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
							<input required id="slot-end-time" type="time" name="slot-end-time" min={dayStartHour} max={dayEndHour} />
						</p>
					</div>
				</Fieldset.Root>

				<button type="button">add travel duration</button>

				<Fieldset.Root>
					<Fieldset.Legend>Travel duration</Fieldset.Legend>
					<div>
						<label htmlFor="appointment-time">travel time</label>
						<input required id="appointment-time" type="time" name="start-time" />
					</div>
					<div>
						<div>
							<label>
								<input type="checkbox" checked />
								same return time
							</label>
						</div>
						<label htmlFor="appointment-time">travel return time</label>
						<input required id="appointment-time" type="time" name="end-time" />
					</div>
				</Fieldset.Root>
				<button type="submit">create session</button>
			</form>
		</>
	)
}
