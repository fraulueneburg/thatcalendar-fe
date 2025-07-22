import { useState } from 'react'
import { dayStartHour } from '../../data/user-settings'

export default function SettingsForm() {
	const [dayStartTime, setDayStartTime] = useState('7:00')
	const [dayEndTime, setDayEndTime] = useState('0:00')

	const handleChange = (event) => {
		console.log(event.target.value)
	}

	return (
		<>
			<h2>User Settings</h2>
			<form>
				<div className="grid">
					<p>
						<label>
							Day starts at
							<input
								required
								id="slot-start-time"
								type="time"
								name="slot-start-time"
								max={dayEndTime}
								onChange={handleChange}
								step="3600"
							/>
						</label>
					</p>
					<p>
						<label>
							Day ends at
							<input required id="slot-start-time" type="time" name="slot-start-time" min={dayStartTime} step="3600" />
						</label>
					</p>
				</div>
				<p>
					<label>
						week start on
						<select>
							<option>Monday</option>
							<option>Sunday</option>
						</select>
					</label>
				</p>
				<button type="submit">save settings</button>
			</form>
		</>
	)
}
